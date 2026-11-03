'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Dictionary } from '@/data/dictionary';
import { localePath, type Locale } from '@/lib/i18n';
import { CloseIcon, MenuIcon } from './icons';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

const SECTIONS = ['about', 'experience', 'projects', 'stack', 'contact'] as const;

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const home = localePath(locale);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const links = SECTIONS.map((id) => ({ id, href: `${home}#${id}`, label: dict.nav[id] }));

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/85 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/85">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href={home}
          className="font-mono text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          caio<span className="text-accent-700 dark:text-accent-400">.</span>rocha
        </Link>

        <nav aria-label={dict.nav.primary} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.id}>
                <Link
                  href={l.href}
                  className="rounded-md px-3 py-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher
            locale={locale}
            label={dict.language.switchTo}
            short={dict.language.short}
          />
          <ThemeToggle labels={dict.theme} />
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-100 md:hidden dark:text-zinc-400 dark:hover:bg-zinc-800"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.nav.close : dict.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label={dict.nav.primary}
          className="border-t border-zinc-200 px-5 pb-4 md:hidden dark:border-zinc-800"
        >
          <ul className="flex flex-col pt-2">
            {links.map((l) => (
              <li key={l.id}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-3 text-base text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
