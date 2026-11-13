import { expect, test, type Page } from '@playwright/test';

const BASE = '/caio-rocha-portfolio';
const PROJECTS = [
  { slug: 'routeops', name: 'RouteOps', repo: 'https://github.com/caiorocha7/routeops-fullstack' },
  { slug: 'docpilot-ai', name: 'DocPilot AI', repo: 'https://github.com/caiorocha7/docpilot-ai' },
  {
    slug: 'connecthub',
    name: 'ConnectHub',
    repo: 'https://github.com/caiorocha7/connecthub-integrations',
  },
  { slug: 'orderflow', name: 'OrderFlow', repo: 'https://github.com/caiorocha7/orderflow-java' },
  { slug: 'subflow', name: 'SubFlow', repo: 'https://github.com/caiorocha7/subflow-rails' },
];

/** Falha o teste se a página emitir erros de console ou exceções. */
function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
  page.on('pageerror', (err) => errors.push(err.message));
  return errors;
}

async function expectImagesLoaded(page: Page) {
  const images = page.locator('main img');
  await images.first().waitFor();
  for (const img of await images.all()) {
    await img.scrollIntoViewIfNeeded();
    await expect
      .poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0))
      .toBe(true);
    expect(await img.getAttribute('alt')).toBeTruthy();
  }
}

test('raiz redireciona para o idioma do navegador', async ({ page }) => {
  await page.goto('./');
  await expect(page).toHaveURL(new RegExp(BASE + '/pt/$'));
});

test.describe('home', () => {
  for (const locale of ['pt', 'en'] as const) {
    test(`renderiza todas as seções em ${locale} sem erros de console`, async ({ page }) => {
      const errors = trackErrors(page);
      await page.goto(`${locale}/`);
      await expect(page.locator('html')).toHaveAttribute('lang', locale === 'pt' ? 'pt-BR' : 'en');
      await expect(page.getByRole('heading', { level: 1, name: 'Caio Rocha' })).toBeVisible();
      for (const id of ['about', 'experience', 'projects', 'stack', 'contact']) {
        await expect(page.locator(`section#${id} h2`)).toBeVisible();
      }
      for (const p of PROJECTS) {
        await expect(page.getByRole('heading', { level: 3, name: p.name })).toBeVisible();
      }
      await expectImagesLoaded(page);
      expect(errors).toEqual([]);
    });
  }

  test('links externos são seguros e apontam para os perfis corretos', async ({ page }) => {
    await page.goto('pt/');
    const external = page.locator('a[target="_blank"]');
    expect(await external.count()).toBeGreaterThan(5);
    for (const link of await external.all()) {
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
    await expect(page.locator('a[href="https://linkedin.com/in/caioroch"]').first()).toBeVisible();
    await expect(page.locator('a[href="https://github.com/caiorocha7"]').first()).toBeVisible();
    await expect(page.locator('a[href="mailto:caiovinicios82@gmail.com"]')).toBeVisible();
    for (const p of PROJECTS)
      await expect(page.locator(`a[href="${p.repo}"]`).first()).toBeAttached();
  });

  test('o site não oferece currículo para download', async ({ page, request }) => {
    for (const locale of ['pt', 'en']) {
      for (const path of [`${locale}/`, `${locale}/experience/`]) {
        await page.goto(path);
        await expect(page.getByRole('link', { name: /Currículo|Résumé/ })).toHaveCount(0);
        await expect(page.locator('a[href*="/resume/"]')).toHaveCount(0);
      }
    }
    for (const file of ['Caio_Rocha_CV.pdf', 'Caio_Rocha_Curriculo_2026.pdf']) {
      expect((await request.get(`${BASE}/resume/${file}`)).status(), file).toBe(404);
    }
  });

  test('todos os links internos respondem 200', async ({ page, request }) => {
    await page.goto('pt/');
    const hrefs = await page
      .locator(`a[href^="${BASE}/"]`)
      .evaluateAll((els) => [...new Set(els.map((e) => e.getAttribute('href')!.split('#')[0]))]);
    expect(hrefs.length).toBeGreaterThan(4);
    for (const href of hrefs) {
      expect((await request.get(href)).status(), href).toBe(200);
    }
  });

  test('teclado: o primeiro Tab foca o link "pular para o conteúdo"', async ({ page }) => {
    await page.goto('pt/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Pular para o conteúdo' });
    await expect(skip).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main$/);
  });

  test('tema escuro é aplicado e persiste entre páginas', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('pt/');
    await expect(page.locator('html')).not.toHaveClass(/dark/);
    await page.getByRole('button', { name: 'Ativar tema escuro' }).click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await page.goto('pt/projects/routeops/');
    await expect(page.locator('html')).toHaveClass(/dark/);
  });
});

test.describe('páginas de projeto', () => {
  for (const p of PROJECTS) {
    test(`${p.name}: estudo de caso completo em pt e en`, async ({ page }) => {
      const errors = trackErrors(page);
      await page.goto(`pt/projects/${p.slug}/`);
      await expect(page.getByRole('heading', { level: 1, name: p.name })).toBeVisible();
      for (const heading of [
        'Problema',
        'Tecnologias',
        'Arquitetura',
        'Funcionalidades principais',
        'Decisões técnicas',
        'Testes e qualidade',
        'Capturas de tela',
        'Limitações conhecidas',
      ]) {
        await expect(page.getByRole('heading', { level: 2, name: heading })).toBeVisible();
      }
      await expect(page.locator(`a[href="${p.repo}"]`).first()).toHaveAttribute(
        'rel',
        'noopener noreferrer',
      );
      await expectImagesLoaded(page);

      // troca de idioma mantém a página
      await page.getByRole('link', { name: 'Ver em inglês' }).click();
      await expect(page).toHaveURL(new RegExp(`${BASE}/en/projects/${p.slug}/$`));
      await expect(
        page.getByRole('heading', { level: 2, name: 'Known limitations' }),
      ).toBeVisible();
      expect(errors).toEqual([]);
    });
  }

  test('navegação do card até a página de detalhes e de volta', async ({ page }) => {
    await page.goto('pt/');
    await page.getByRole('link', { name: /Ver estudo de caso\s*:\s*ConnectHub/ }).click();
    await expect(page).toHaveURL(new RegExp(`${BASE}/pt/projects/connecthub/$`));
    await page.getByRole('link', { name: 'Todos os projetos' }).click();
    await expect(page).toHaveURL(new RegExp(`${BASE}/pt/#projects$`));
  });
});

test('SEO: metadata, Open Graph, sitemap e robots', async ({ page, request }) => {
  await page.goto('en/projects/docpilot-ai/');
  await expect(page).toHaveTitle(/DocPilot AI/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /RAG/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /^https:\/\//);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    /\/en\/projects\/docpilot-ai\/$/,
  );
  await expect(page.locator('link[rel="alternate"][hreflang="pt-BR"]')).toBeAttached();

  const sitemap = await (await request.get(`${BASE}/sitemap.xml`)).text();
  expect(sitemap.match(/<loc>/g)).toHaveLength(16);
  expect(sitemap).toContain('/en/projects/orderflow/');
  expect(sitemap).toContain('/pt/projects/subflow/');
  expect(sitemap).toContain('/pt/experience/');
  expect(sitemap).toContain('/en/experience/crmundi/');
  expect(sitemap).toContain('/pt/projects/connecthub/');
  const robots = await (await request.get(`${BASE}/robots.txt`)).text();
  expect(robots).toContain('Sitemap: https://');
  expect((await request.get(`${BASE}/og.png`)).status()).toBe(200);
});

test('URL inexistente mostra 404 bilíngue', async ({ page }) => {
  const res = await page.goto('pagina-que-nao-existe/');
  expect(res?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'Página não encontrada' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Go to home' })).toBeVisible();
});
