import { defineConfig, devices } from '@playwright/test';

const PORT = 4321;
const BASE_PATH = '/caio-rocha-portfolio';

/**
 * E2E contra o build estático de produção servido sob o mesmo basePath do GitHub Pages,
 * para validar caminhos de assets, links e redirecionamentos como no site publicado.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}${BASE_PATH}/`,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], locale: 'pt-BR' },
      testIgnore: /mobile.spec.ts/,
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'], locale: 'pt-BR' },
      testMatch: /mobile\.spec\.ts/,
    },
  ],
  webServer: {
    command: process.env.E2E_SKIP_BUILD
      ? 'node scripts/serve-static.mjs'
      : 'pnpm build && node scripts/serve-static.mjs',
    url: `http://localhost:${PORT}${BASE_PATH}/pt/`,
    timeout: 240_000,
    reuseExistingServer: false,
    env: { NEXT_PUBLIC_BASE_PATH: BASE_PATH, PORT: String(PORT) },
  },
});
