import type { ReactNode } from 'react';
import type { Block } from '@/data/crmundi';
import type { Locale } from '@/lib/i18n';

/** Seção de página interna: rótulo à esquerda, conteúdo à direita. */
export function PageSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 border-t border-zinc-200 py-12 dark:border-zinc-800"
    >
      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        <h2
          id={`${id}-title`}
          className="font-mono text-xs tracking-widest text-accent-700 uppercase dark:text-accent-400"
        >
          {title}
        </h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

export function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
      {items.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
      {items.map((i) => (
        <li key={i} className="flex gap-2.5">
          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-600" />
          {i}
        </li>
      ))}
    </ul>
  );
}

export function BlockCards({
  items,
  locale,
  columns = 2,
}: {
  items: Block[];
  locale: Locale;
  columns?: 2 | 3;
}) {
  return (
    <ul
      className={`grid gap-3 ${columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'}`}
    >
      {items.map((b) => (
        <li key={b.title.en} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
          <p className="font-medium text-zinc-900 dark:text-zinc-100">{b.title[locale]}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {b.body[locale]}
          </p>
        </li>
      ))}
    </ul>
  );
}
