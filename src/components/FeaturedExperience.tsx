import Link from 'next/link';
import { crmundi } from '@/data/crmundi';
import type { Dictionary } from '@/data/dictionary';
import { localePath, type Locale } from '@/lib/i18n';
import { ArrowIcon } from './icons';
import { SystemDiagram } from './SystemDiagram';
import { TagList, buttonStyles } from './ui';

/** Destaque da home: principal experiência profissional (produto proprietário, sem links privados). */
export function FeaturedExperience({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const href = localePath(locale, 'experience/crmundi');
  return (
    <article
      aria-labelledby="featured-title"
      className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40"
    >
      <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col">
          <p className="font-mono text-xs text-zinc-500">{crmundi.identification[locale]}</p>
          <h3
            id="featured-title"
            className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-white"
          >
            {crmundi.title}
          </h3>
          <p className="mt-3 text-lg text-accent-700 dark:text-accent-400">
            {crmundi.subtitle[locale]}
          </p>
          <p className="mt-5 leading-relaxed text-zinc-600 dark:text-zinc-400">
            {crmundi.summary[locale]}
          </p>
          <div className="mt-6">
            <TagList items={crmundi.homeTech} label={dict.project.stack} />
          </div>
          <div className="mt-8">
            <Link href={href} className={buttonStyles.primary}>
              {dict.featured.cta}
              <ArrowIcon width={16} height={16} />
            </Link>
          </div>
          <p className="mt-4 text-xs text-zinc-500">{crmundi.ownershipNote[locale]}</p>
        </div>

        <ul className="grid content-start gap-4 sm:grid-cols-2">
          {crmundi.pillars.map((p) => (
            <li
              key={p.title.en}
              className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800"
            >
              <p className="font-semibold text-zinc-900 dark:text-zinc-50">{p.title[locale]}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {p.body[locale]}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-zinc-200 p-4 sm:p-6 dark:border-zinc-800">
        <SystemDiagram locale={locale} title={dict.featured.diagram} />
      </div>
    </article>
  );
}
