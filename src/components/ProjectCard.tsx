import Image from 'next/image';
import Link from 'next/link';
import type { Dictionary } from '@/data/dictionary';
import type { Project } from '@/data/projects';
import { localePath, type Locale } from '@/lib/i18n';
import { asset } from '@/lib/site';
import { ExternalLink } from './ExternalLink';
import { ArrowIcon, GitHubIcon } from './icons';
import { TagList, buttonStyles } from './ui';

export function ProjectCard({
  project,
  locale,
  dict,
  index,
}: {
  project: Project;
  locale: Locale;
  dict: Dictionary;
  index: number;
}) {
  const cover = project.screenshots[0];
  const detail = localePath(locale, `projects/${project.slug}`);

  return (
    <article
      aria-labelledby={`project-${project.slug}`}
      className="group grid overflow-hidden rounded-xl border border-zinc-200 bg-white transition-colors hover:border-zinc-300 lg:grid-cols-[1.15fr_1fr] dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
    >
      <Link
        href={detail}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block aspect-[16/10] overflow-hidden border-b border-zinc-200 bg-zinc-100 lg:aspect-auto lg:border-r lg:border-b-0 dark:border-zinc-800 dark:bg-zinc-900"
      >
        <Image
          src={asset(cover.src)}
          alt={cover.alt[locale]}
          fill
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
          priority={index === 0}
        />
      </Link>

      <div className="flex flex-col gap-5 p-6 sm:p-8">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-zinc-500">
            <span>0{index + 1}</span>
            <span aria-hidden="true">·</span>
            <span>{project.testsBadge[locale]}</span>
          </div>
          <h3
            id={`project-${project.slug}`}
            className="mt-2 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            {project.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-accent-700 dark:text-accent-400">
            {project.tagline[locale]}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {project.summary[locale]}
          </p>
        </div>

        <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
          {project.highlights[locale].map((h) => (
            <li key={h} className="flex gap-2.5">
              <span
                aria-hidden="true"
                className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-600"
              />
              {h}
            </li>
          ))}
        </ul>

        <TagList items={project.stack} label={dict.project.stack} />

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
          <Link href={detail} className={buttonStyles.link}>
            {dict.project.details}
            <span className="sr-only">: {project.name}</span>
            <ArrowIcon width={16} height={16} />
          </Link>
          <ExternalLink
            href={project.repo}
            newTabLabel={dict.external}
            className={buttonStyles.link}
          >
            <GitHubIcon width={16} height={16} />
            {dict.project.code}
            <span className="sr-only">: {project.name}</span>
          </ExternalLink>
          {project.demo && (
            <ExternalLink
              href={project.demo}
              newTabLabel={dict.external}
              className={buttonStyles.link}
            >
              {dict.project.demo}
            </ExternalLink>
          )}
        </div>
      </div>
    </article>
  );
}
