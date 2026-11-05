import { expect, test, type Page } from '@playwright/test';

const BASE = '/caio-rocha-portfolio';

function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
  page.on('pageerror', (err) => errors.push(err.message));
  return errors;
}

test('home: Sobre vem antes da experiência, que vem antes dos projetos', async ({ page }) => {
  await page.goto('pt/');
  const order = await page.locator('main section[id]').evaluateAll((els) => els.map((e) => e.id));
  expect(order).toEqual(['about', 'experience', 'projects', 'stack', 'contact']);
  await expect(page.locator('section#featured')).toHaveCount(0);

  const exp = page.locator('section#experience');
  await expect(
    exp.getByRole('heading', { level: 2, name: 'Experiência profissional' }),
  ).toBeVisible();
  await expect(exp.getByRole('heading', { level: 3, name: /MetaMundi/ })).toBeVisible();
  await expect(
    exp.getByRole('heading', { level: 3, name: /Secretaria Municipal de Educação de Teresina/ }),
  ).toBeVisible();
  await expect(exp.getByText('Plataforma SaaS para gestão de agências de viagens')).toBeVisible();
  await expect(exp.getByRole('link', { name: 'Ver experiência completa' })).toHaveAttribute(
    'href',
    `${BASE}/pt/experience/#metamundi`,
  );
  await expect(exp.getByRole('link', { name: 'Explorar estudo de caso CRMundi' })).toHaveAttribute(
    'href',
    `${BASE}/pt/experience/crmundi/`,
  );
  // sem diagrama de arquitetura nem cards gigantes na home
  await expect(page.locator('main svg[role="img"]')).toHaveCount(0);
});

test('menu superior: Início, Sobre, Experiência, Projetos, Tecnologias e Contato', async ({
  page,
}) => {
  await page.goto('pt/projects/routeops/');
  const nav = page.getByRole('navigation', { name: 'Navegação principal' }).first();
  await expect(nav.getByRole('link')).toHaveText([
    'Início',
    'Sobre',
    'Experiência',
    'Projetos',
    'Tecnologias',
    'Contato',
  ]);
  await nav.getByRole('link', { name: 'Experiência' }).click();
  await expect(page).toHaveURL(new RegExp(`${BASE}/pt/experience/$`));
  await expect(
    page.getByRole('heading', { level: 1, name: 'Experiência profissional' }),
  ).toBeVisible();
});

for (const locale of ['pt', 'en'] as const) {
  test(`página de experiência completa em ${locale}`, async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto(`${locale}/experience/`);
    await expect(page.locator('html')).toHaveAttribute('lang', locale === 'pt' ? 'pt-BR' : 'en');
    await expect(page.getByRole('heading', { level: 2, name: 'MetaMundi' })).toBeVisible();
    await expect(
      page.getByRole('heading', {
        level: 2,
        name:
          locale === 'pt'
            ? 'Secretaria Municipal de Educação de Teresina'
            : 'Teresina Municipal Department of Education',
      }),
    ).toBeVisible();
    // 8 áreas, cada uma levando ao domínio correspondente do estudo de caso
    const areas = page.locator(`a[href*="/experience/crmundi/#domain-"]`);
    await expect(areas).toHaveCount(8);
    await areas.nth(2).click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/experience/crmundi/#domain-finance$`));
    expect(errors).toEqual([]);
  });
}

for (const [locale, headings] of [
  [
    'pt',
    [
      'Resumo executivo',
      'Meu papel e evolução no produto',
      'Principais áreas de contribuição',
      'Problemas complexos resolvidos',
      'Decisões de engenharia',
      'Tecnologias utilizadas',
      'Impacto funcional comprovável',
      'Limites de atribuição e confidencialidade',
    ],
  ],
  [
    'en',
    [
      'Executive summary',
      'My role and growth in the product',
      'Main contribution areas',
      'Complex problems solved',
      'Engineering decisions',
      'Technologies used',
      'Verifiable functional impact',
      'Attribution and confidentiality limits',
    ],
  ],
] as const) {
  test(`estudo de caso CRMundi organizado por domínio em ${locale}`, async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto(`${locale}/experience/crmundi/`);
    await expect(
      page.getByRole('heading', { level: 1, name: 'CRMundi & ChatMundi' }),
    ).toBeVisible();
    for (const h of headings) {
      await expect(page.getByRole('heading', { level: 2, name: h })).toBeVisible();
    }
    // escopo verificado: contagens de escopo, nunca de commits
    await expect(
      page.getByRole('heading', {
        level: 3,
        name: locale === 'pt' ? 'Escopo verificado' : 'Verified scope',
      }),
    ).toBeVisible();
    await expect(page.getByText('polling → WebSocket')).toBeVisible();
    // ChatMundi apresentado como solução integrada, não como mera atualização do Chatwoot
    await page.locator('#domain-chatmundi summary').click();
    await expect(
      page
        .locator('#domain-chatmundi')
        .getByText(locale === 'pt' ? 'Implementação do ChatMundi' : 'Building ChatMundi'),
    ).toBeVisible();
    await expect(page.locator('main')).not.toContainText(/commits? (feitos|authored)|\d+ commits/i);
    // 8 domínios expansíveis, fechados por padrão
    const domains = page.locator('details[id^="domain-"]');
    await expect(domains).toHaveCount(8);
    const finance = page.locator('#domain-finance');
    await expect(finance).not.toHaveAttribute('open', '');
    await finance.locator('summary').click();
    await expect(finance).toHaveAttribute('open', '');
    await expect(
      finance.getByText(locale === 'pt' ? 'Faturamento corporativo' : 'Corporate billing'),
    ).toBeVisible();
    // status não integrados ficam explícitos
    await page.locator('#domain-sales summary').click();
    await expect(
      page
        .locator('#domain-sales')
        .getByText(locale === 'pt' ? 'Em branch, não integrado' : 'In a branch, not merged'),
    ).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test('domínios podem ser abertos pelo teclado', async ({ page }) => {
  await page.goto('pt/experience/crmundi/');
  const summary = page.locator('#domain-ai summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#domain-ai')).toHaveAttribute('open', '');
});

test('nenhuma topologia, ambiente, repositório privado ou captura corporativa é publicada', async ({
  page,
}) => {
  for (const path of [
    'pt/',
    'en/',
    'pt/experience/',
    'en/experience/',
    'pt/experience/crmundi/',
    'en/experience/crmundi/',
  ]) {
    await page.goto(path);
    const hrefs = await page
      .locator('a[href]')
      .evaluateAll((els) => els.map((e) => e.getAttribute('href') ?? ''));
    expect(
      // só links externos; a âncora interna #metamundi é da própria página de experiência
      hrefs.filter((h) => /^https?:\/\//.test(h) && /crmundi|gitlab|metamundi/i.test(h)),
      path,
    ).toEqual([]);
    const html = await page.content();
    // nomes internos de serviços, ambiente e credencial de teste não aparecem
    expect(html, path).not.toMatch(
      /dev\.crmundi|chat-dev|teste@gmail|chat-mundi|pdf-lambda|backend-jobs/i,
    );
    await expect(page.locator('main svg[role="img"]'), path).toHaveCount(0);
  }
  await page.goto('pt/experience/crmundi/');
  await expect(page.locator('main img')).toHaveCount(0);
});

for (const [locale, role, focus] of [
  ['pt', 'Engenheiro de Software', 'Full Stack | Backend | Integrações | IA Aplicada'],
  ['en', 'Software Engineer', 'Full Stack | Backend | Integrations | Applied AI'],
] as const) {
  test(`hero com posicionamento amplo e sem contagem de meses em ${locale}`, async ({ page }) => {
    await page.goto(`${locale}/`);
    const hero = page.locator('main > section').first();
    await expect(hero.getByText(role, { exact: true })).toBeVisible();
    await expect(hero.getByText(focus, { exact: true })).toBeVisible();
    for (const path of [`${locale}/`, `${locale}/experience/`, `${locale}/experience/crmundi/`]) {
      await page.goto(path);
      await expect(page.locator('main'), path).not.toContainText(
        /\d+\s*(meses|months)|1 ano e 4|months of experience/i,
      );
    }
  });
}

for (const [locale, title, groups, work, personal] of [
  [
    'pt',
    'Competências técnicas',
    [
      'Backend e dados',
      'Frontend e integrações',
      'IA aplicada e ferramentas',
      'Cloud, qualidade e segurança',
    ],
    'Profissional',
    'Projetos próprios',
  ],
  [
    'en',
    'Technical skills',
    [
      'Backend and data',
      'Frontend and integrations',
      'Applied AI and tools',
      'Cloud, quality and security',
    ],
    'Professional',
    'Own projects',
  ],
] as const) {
  test(`competências em 4 grupos, separando uso profissional e projetos próprios em ${locale}`, async ({
    page,
  }) => {
    await page.goto(`${locale}/`);
    const section = page.locator('section#stack');
    await expect(section.getByRole('heading', { level: 2, name: title })).toBeVisible();
    await expect(section.locator('dt')).toHaveText([...groups]);
    await expect(section.getByText(`${work}:`)).toHaveCount(4);
    await expect(section.getByText(`${personal}:`)).toHaveCount(4);
    // Claude Code aparece como ferramenta, não como tecnologia profissional da MetaMundi
    await expect(section.getByText(/Claude Code/)).toHaveCount(1);
    await expect(page.locator('section#experience')).not.toContainText('Claude Code');
  });
}

test('troca de idioma mantém as páginas de experiência', async ({ page }) => {
  await page.goto('pt/experience/');
  await page.getByRole('link', { name: 'Ver em inglês' }).click();
  await expect(page).toHaveURL(new RegExp(`${BASE}/en/experience/$`));
  await page.goto('pt/experience/crmundi/');
  await page.getByRole('link', { name: 'Ver em inglês' }).click();
  await expect(page).toHaveURL(new RegExp(`${BASE}/en/experience/crmundi/$`));
});
