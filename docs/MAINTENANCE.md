# Manutenção e deploy

## Onde fica cada conteúdo

| O que mudar | Arquivo |
|---|---|
| Nome, título, introdução, sobre, formação, links, currículo | `src/data/profile.ts` |
| Experiência profissional | `src/data/experience.ts` |
| Projetos (resumo, arquitetura, decisões, testes, limitações, capturas) | `src/data/projects.ts` |
| Stack por categoria | `src/data/stack.ts` |
| Textos da interface (menus, botões, títulos, SEO) | `src/data/dictionary.ts` |

Todo texto é um objeto `{ pt, en }`. O teste `src/test/content.test.ts` falha se algum idioma ficar vazio,
se as chaves dos dicionários divergirem, se uma captura referenciada não existir ou se o total de testes
exibido no card não bater com a soma das suítes.

## Atualizar números de testes

Os números vêm dos READMEs e do CI de cada repositório. Ao mudar, atualize `testsBadge` e `tests` em
`src/data/projects.ts` — o teste de conteúdo confere a soma.

## Atualizar capturas de tela

As capturas são **reais**, tiradas da aplicação em execução e versionadas em `docs/screenshots` de cada repositório.

1. Clone os repositórios ao lado deste (`../routeops-fullstack`, `../docpilot-ai`, `../connecthub-integrations`).
2. Atualize as capturas no próprio repositório do projeto.
3. Rode `pnpm images` — converte os PNGs selecionados em WebP (1600 px, qualidade 82) em `public/projects/<slug>/`.
4. Se adicionar ou remover arquivos, ajuste a lista em `scripts/optimize-images.mjs` e em `src/data/projects.ts`.

Screenshots do próprio portfólio (README e imagem Open Graph `public/og.png`): com o site servido (`pnpm start`),
rode `node scripts/capture-screenshots.mjs`.

## Currículo

O PDF fica em `public/resume/Caio_Rocha_Curriculo_2026.pdf` e é referenciado em `profile.resume`.
Para trocar, substitua o arquivo mantendo o nome (ou atualize o caminho). Para ocultar o botão, defina
`resume: null`. Atenção: o PDF publicado fica acessível a qualquer pessoa, incluindo dados de contato.

## Deploy

### GitHub Pages (configuração atual, gratuita)

O workflow `.github/workflows/ci.yml` roda a cada push na `main`: lint → typecheck → testes → build → E2E →
deploy. O deploy só acontece se tudo passar. Variáveis usadas no build:

| Variável | Valor atual | Uso |
|---|---|---|
| `NEXT_PUBLIC_BASE_PATH` | `/caio-rocha-portfolio` | Site servido em subdiretório |
| `NEXT_PUBLIC_SITE_URL` | `https://caiorocha7.github.io/caio-rocha-portfolio` | URLs absolutas (canonical, OG, sitemap) |

No repositório: *Settings → Pages → Source: GitHub Actions*.

### Domínio próprio, Vercel, Netlify ou Cloudflare Pages

O build é um site estático em `out/`. Para servir na raiz de um domínio:

```bash
NEXT_PUBLIC_BASE_PATH= NEXT_PUBLIC_SITE_URL=https://seu-dominio.com pnpm build
# publique a pasta out/
```

Em GitHub Pages com domínio próprio, adicione `public/CNAME` com o domínio e esvazie `NEXT_PUBLIC_BASE_PATH`
no workflow.

## Observações

- `robots.txt` só é lido por buscadores na raiz do domínio; em `github.io/<repo>` ele existe, mas o efetivo é o
  do domínio `github.io`. O sitemap pode ser enviado manualmente no Google Search Console.
- No Git Bash do Windows, variáveis que começam com `/` são convertidas em caminhos; use PowerShell para o build
  local com `NEXT_PUBLIC_BASE_PATH`.
