// Converte as capturas REAIS dos repositórios dos projetos em WebP otimizado para o site.
// Fonte: pasta docs/screenshots de cada repositório (clonados lado a lado em ../).
// Uso: pnpm images
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';

const ROOT = resolve(import.meta.dirname, '..');
const PROJECTS = resolve(ROOT, '..');

const SOURCES = {
  routeops: {
    repo: 'routeops-fullstack',
    files: ['dashboard', 'mapa', 'detalhe-entrega', 'entregas', 'relatorios', 'mobile-dashboard'],
  },
  'docpilot-ai': {
    repo: 'docpilot-ai',
    files: [
      '03-chat-citations',
      '04-document-citation-highlight',
      '05-extraction-review',
      '06-dashboard',
      '08-chat-dark',
      '09-mobile-dashboard',
    ],
  },
  connecthub: {
    repo: 'connecthub-integrations',
    files: [
      '02-dashboard',
      '07-transform-editor',
      '11-delivery-detail',
      '12-failures',
      '13-simulator',
      '16-mobile-dashboard',
    ],
  },
  orderflow: {
    repo: 'orderflow-java',
    files: [
      '02-dashboard',
      '05-order-retry',
      '06-order-dlt',
      '10-processing',
      '07-new-order',
      '11-mobile-dashboard',
    ],
  },
  subflow: {
    repo: 'subflow-rails',
    files: ['dashboard', 'assinaturas', 'cobrancas', 'assinatura-detalhe', 'login', 'dashboard-mobile'],
  },
};

for (const [slug, { repo, files }] of Object.entries(SOURCES)) {
  const outDir = resolve(ROOT, 'public/projects', slug);
  mkdirSync(outDir, { recursive: true });
  for (const name of files) {
    const input = resolve(PROJECTS, repo, 'docs/screenshots', `${name}.png`);
    if (!existsSync(input)) throw new Error(`Screenshot não encontrada: ${input}`);
    const output = resolve(outDir, `${name}.webp`);
    const info = await sharp(input)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(output);
    console.log(
      `${slug}/${name}.webp  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`,
    );
  }
}
