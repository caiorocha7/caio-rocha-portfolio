import { expect, test, type Page } from '@playwright/test';

const BASE = '/caio-rocha-portfolio';

function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
  page.on('pageerror', (err) => errors.push(err.message));
  return errors;
}

test('home destaca CRMundi & ChatMundi antes dos projetos pessoais', async ({ page }) => {
  await page.goto('pt/');
  const featured = page.locator('section#featured');
  await expect(
    featured.getByRole('heading', { level: 2, name: 'Principal experiência profissional' }),
  ).toBeVisible();
  await expect(
    featured.getByRole('heading', { level: 3, name: 'CRMundi & ChatMundi' }),
  ).toBeVisible();
  await expect(
    featured.getByText('Experiência profissional · MetaMundi · 2025 a 2026'),
  ).toBeVisible();
  await expect(featured.getByRole('img', { name: /Arquitetura conceitual/ })).toBeVisible();

  // ordem: destaque profissional vem antes dos projetos pessoais
  const order = await page.locator('main section[id]').evaluateAll((els) => els.map((e) => e.id));
  expect(order.indexOf('featured')).toBeLessThan(order.indexOf('projects'));
  await expect(page.locator('section#projects h2')).toHaveText('Projetos pessoais');

  // o hero leva ao estudo de caso
  await page.getByRole('link', { name: 'Experiência CRMundi' }).click();
  await expect(page).toHaveURL(new RegExp(`${BASE}/pt/experience/crmundi/$`));
});

for (const [locale, headings] of [
  [
    'pt',
    [
      'Visão geral do produto',
      'Problema de negócio',
      'Meu papel e responsabilidades',
      'CRMundi: principais módulos',
      'ChatMundi e integrações WhatsApp',
      'Microsserviço FastAPI',
      'Distribuição Round Robin e ownership',
      'Gerente Mundi e IA aplicada',
      'Financeiro, vendas e faturamento',
      'Arquitetura conceitual',
      'Segurança, testes e confiabilidade',
      'Principais desafios técnicos',
      'Tecnologias utilizadas',
      'Evidências visuais',
      'Limites de atribuição e confidencialidade',
    ],
  ],
  [
    'en',
    [
      'Product overview',
      'Business problem',
      'My role and responsibilities',
      'CRMundi: main modules',
      'ChatMundi and WhatsApp integrations',
      'FastAPI microservice',
      'Round Robin assignment and ownership',
      'Gerente Mundi and applied AI',
      'Finance, sales and billing',
      'Conceptual architecture',
      'Security, testing and reliability',
      'Key technical challenges',
      'Technologies used',
      'Visual evidence',
      'Attribution and confidentiality limits',
    ],
  ],
] as const) {
  test(`estudo de caso CRMundi completo em ${locale}`, async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto(`${locale}/experience/crmundi/`);
    await expect(page.locator('html')).toHaveAttribute('lang', locale === 'pt' ? 'pt-BR' : 'en');
    await expect(
      page.getByRole('heading', { level: 1, name: 'CRMundi & ChatMundi' }),
    ).toBeVisible();
    for (const h of headings) {
      await expect(page.getByRole('heading', { level: 2, name: h })).toBeVisible();
    }
    await expect(page.getByRole('img', { name: /CRMundi/ })).toBeVisible();
    await expect(page.getByRole('list', { name: /Gerente Mundi/ }).locator('li')).toHaveCount(5);
    expect(errors).toEqual([]);
  });
}

test('estudo de caso não expõe ambientes, repositórios privados nem capturas corporativas', async ({
  page,
}) => {
  for (const path of ['pt/experience/crmundi/', 'en/experience/crmundi/', 'pt/']) {
    await page.goto(path);
    const hrefs = await page
      .locator('a[href]')
      .evaluateAll((els) => els.map((e) => e.getAttribute('href') ?? ''));
    expect(
      hrefs.filter((h) => /crmundi\.com\.br|gitlab|metamundi/i.test(h)),
      path,
    ).toEqual([]);
    const html = await page.content();
    expect(html).not.toMatch(/dev\.crmundi|teste@gmail|chat-dev/i);
  }
  // nenhuma imagem raster no estudo de caso: só diagramas conceituais originais (SVG/HTML)
  await page.goto('pt/experience/crmundi/');
  await expect(page.locator('main img')).toHaveCount(0);
});

test('troca de idioma mantém o estudo de caso', async ({ page }) => {
  await page.goto('pt/experience/crmundi/');
  await page.getByRole('link', { name: 'Ver em inglês' }).click();
  await expect(page).toHaveURL(new RegExp(`${BASE}/en/experience/crmundi/$`));
  await expect(
    page.getByRole('heading', { level: 2, name: 'Attribution and confidentiality limits' }),
  ).toBeVisible();
});
