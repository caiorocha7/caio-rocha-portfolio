export const locales = ['pt', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pt';

/** Conteúdo traduzido: cada texto existe nos dois idiomas. */
export type Localized<T = string> = Record<Locale, T>;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Caminho interno com prefixo de idioma (o basePath é aplicado pelo next/link). */
export function localePath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `/${locale}/${clean}/` : `/${locale}/`;
}

/** Troca o idioma de um pathname mantendo a página atual. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  const index = segments.findIndex((s) => isLocale(s));
  if (index === -1) return localePath(target);
  segments[index] = target;
  return `/${segments.slice(index).join('/')}/`;
}

export const htmlLang: Record<Locale, string> = { pt: 'pt-BR', en: 'en' };
export const ogLocale: Record<Locale, string> = { pt: 'pt_BR', en: 'en_US' };
