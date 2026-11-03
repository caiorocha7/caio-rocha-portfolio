import type { ReactNode } from 'react';

export function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto max-w-5xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Seção da home com âncora, número e título. */
export function Section({
  id,
  index,
  title,
  lead,
  children,
}: {
  id: string;
  index: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="reveal py-16 sm:py-24">
      <Container>
        <div className="mb-10 max-w-2xl">
          <p className="font-mono text-xs tracking-widest text-accent-700 uppercase dark:text-accent-400">
            {index}
          </p>
          <h2
            id={`${id}-title`}
            className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50"
          >
            {title}
          </h2>
          {lead && <p className="mt-3 text-zinc-600 dark:text-zinc-400">{lead}</p>}
        </div>
        {children}
      </Container>
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 font-mono text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
      {children}
    </li>
  );
}

export function TagList({ items, label }: { items: string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </ul>
  );
}

const buttonBase =
  'inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors';

export const buttonStyles = {
  primary: `${buttonBase} bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200`,
  secondary: `${buttonBase} border border-zinc-300 text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:bg-zinc-900`,
  link: 'inline-flex items-center gap-1.5 text-sm font-medium text-accent-700 underline-offset-4 hover:underline dark:text-accent-400',
};
