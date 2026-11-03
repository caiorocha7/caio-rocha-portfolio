/** Prefixo de caminho do site publicado (GitHub Pages de projeto usa /<repo>). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** URL pública canônica, sem barra final. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://caiorocha7.github.io/caio-rocha-portfolio'
).replace(/\/$/, '');

/** Prefixa arquivos de /public com o basePath (next/image e <a> não fazem isso sozinhos). */
export function asset(path: string): string {
  return `${basePath}${path.startsWith('/') ? path : `/${path}`}`;
}

/** URL absoluta de uma rota do site (sitemap, canonical, Open Graph). */
export function absoluteUrl(path = '/'): string {
  const site = new URL(siteUrl);
  return `${site.origin}${site.pathname.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
}
