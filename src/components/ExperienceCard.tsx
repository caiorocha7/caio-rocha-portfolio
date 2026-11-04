import Link from 'next/link';
import type { Dictionary } from '@/data/dictionary';
import type { Experience } from '@/data/experience';
import { localePath, type Locale } from '@/lib/i18n';
import { ArrowIcon } from './icons';
import { TagList, buttonStyles } from './ui';

/** Experiência na home: resumo objetivo, com o detalhamento nas páginas internas. */
export function ExperienceCard({
  job,
  locale,
  dict,
}: {
  job: Experience;
  locale: Locale;
  dict: Dictionary;
}) {
  const fullHref = `${localePath(locale, 'experience')}#${job.id}`;

  if (!job.primary) {
    return (
      <article
        aria-labelledby={`job-${job.id}`}
        className="grid gap-2 rounded-xl border border-zinc-200 px-6 py-5 md:grid-cols-[200px_1fr] dark:border-zinc-800"
      >
        <p className="font-mono text-sm text-zinc-500">{job.period[locale]}</p>
        <div>
          <h3 id={`job-${job.id}`} className="font-semibold text-zinc-900 dark:text-zinc-50">
            {job.role[locale]} <span className="text-zinc-400">·</span>{' '}
            <span className="font-normal text-zinc-600 dark:text-zinc-400">
              {job.company[locale]}
            </span>
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {job.summary[locale]}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article
      aria-labelledby={`job-${job.id}`}
      className="grid gap-4 rounded-xl border border-zinc-200 bg-white p-6 sm:p-8 md:grid-cols-[200px_1fr] dark:border-zinc-800 dark:bg-zinc-900/40"
    >
      <div>
        <p className="font-mono text-sm text-zinc-500">{job.period[locale]}</p>
        <p className="mt-1 text-xs text-zinc-500">{job.context[locale]}</p>
      </div>
      <div>
        <h3 id={`job-${job.id}`} className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {job.role[locale]} <span className="text-zinc-400">·</span>{' '}
          <span className="text-accent-700 dark:text-accent-400">{job.company[locale]}</span>
        </h3>
        {job.product && (
          <p className="mt-3 text-sm">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {job.product.name}
            </span>
            <span className="text-zinc-500"> · {job.product.tagline[locale]}</span>
          </p>
        )}
        <p className="mt-3 max-w-3xl leading-relaxed text-zinc-700 dark:text-zinc-300">
          {job.summary[locale]}
        </p>
        <div className="mt-4">
          <TagList items={job.tech} label={dict.experience.tech} />
        </div>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          <Link href={fullHref} className={buttonStyles.link}>
            {dict.experience.full}
            <ArrowIcon width={16} height={16} />
          </Link>
          {job.caseStudy && (
            <Link href={localePath(locale, job.caseStudy)} className={buttonStyles.link}>
              {dict.experience.caseStudy}
              <ArrowIcon width={16} height={16} />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
