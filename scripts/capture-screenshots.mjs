// Captura screenshots do próprio portfólio (documentação e inspeção visual).
// Uso: com o site servido (pnpm start), rode: node scripts/capture-screenshots.mjs
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const BASE = process.env.SITE_URL ?? 'http://localhost:4321/caio-rocha-portfolio';
const OUT = resolve(import.meta.dirname, '../docs/screenshots');
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const shots = [
  { name: 'home-pt-light', path: '/pt/', viewport: { width: 1440, height: 900 }, scheme: 'light' },
  { name: 'home-en-dark', path: '/en/', viewport: { width: 1440, height: 900 }, scheme: 'dark' },
  {
    name: 'projects-section',
    path: '/pt/#projects',
    viewport: { width: 1440, height: 1100 },
    scheme: 'light',
  },
  {
    name: 'project-docpilot',
    path: '/pt/projects/docpilot-ai/',
    viewport: { width: 1440, height: 900 },
    scheme: 'light',
    full: true,
  },
  {
    name: 'home-experience',
    path: '/pt/#experience',
    viewport: { width: 1440, height: 1200 },
    scheme: 'light',
  },
  {
    name: 'crmundi-pt',
    path: '/pt/experience/crmundi/',
    viewport: { width: 1440, height: 900 },
    scheme: 'light',
    full: true,
  },
  {
    name: 'crmundi-en-dark',
    path: '/en/experience/crmundi/#domains',
    viewport: { width: 1440, height: 1000 },
    scheme: 'dark',
  },
  {
    name: 'experience-pt',
    path: '/pt/experience/',
    viewport: { width: 1440, height: 900 },
    scheme: 'light',
    full: true,
  },
  {
    name: 'mobile-crmundi',
    path: '/pt/experience/crmundi/',
    viewport: { width: 390, height: 844 },
    scheme: 'light',
  },
  { name: 'mobile-home', path: '/pt/', viewport: { width: 390, height: 844 }, scheme: 'light' },
  {
    name: 'mobile-project-dark',
    path: '/en/projects/connecthub/',
    viewport: { width: 390, height: 844 },
    scheme: 'dark',
  },
];

for (const s of shots) {
  const page = await browser.newPage({ viewport: s.viewport, colorScheme: s.scheme });
  await page.goto(`${BASE}${s.path}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/${s.name}.png`, fullPage: !!s.full });
  await page.close();
}

// Imagem Open Graph (1200x630) a partir do hero
const og = await browser.newPage({ viewport: { width: 1200, height: 630 }, colorScheme: 'light' });
await og.goto(`${BASE}/pt/`, { waitUntil: 'networkidle' });
await og.waitForTimeout(500);
await og.screenshot({ path: resolve(import.meta.dirname, '../public/og.png') });

await browser.close();
console.log(`Screenshots em ${OUT}`);
