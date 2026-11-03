'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { switchLocalePath, type Locale } from '@/lib/i18n';
import { basePath } from '@/lib/site';

export function LanguageSwitcher({
  locale,
  label,
  short,
}: {
  locale: Locale;
  label: string;
  short: string;
}) {
  const target: Locale = locale === 'pt' ? 'en' : 'pt';
  const raw = usePathname() ?? `/${locale}/`;
  // usePathname já vem sem basePath; removemos por segurança caso venha prefixado
  const pathname = basePath && raw.startsWith(basePath) ? raw.slice(basePath.length) : raw;

  return (
    <Link
      href={switchLocalePath(pathname, target)}
      hrefLang={target === 'pt' ? 'pt-BR' : 'en'}
      aria-label={label}
      title={label}
      className="inline-flex h-9 items-center rounded-md px-2.5 font-mono text-xs font-semibold tracking-wider text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
    >
      {short}
    </Link>
  );
}
