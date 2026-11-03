import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { ExternalLink } from '@/components/ExternalLink';
import { ArrowIcon, ArrowLeftIcon, ExternalIcon, GitHubIcon } from '@/components/icons';
import { Container, TagList, buttonStyles } from '@/components/ui';
import { getDictionary } from '@/data/dictionary';
import { getProject, projects } from '@/data/projects';
import { isLocale, localePath, locales, ogLocale } from '@/lib/i18n';
import { absoluteUrl, asset } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) return {};
  const path = `projects/${slug}`;
  return {
    title: `${project.name}: ${project.tagline[locale]}`,
    description: project.summary[locale],
    alternates: {
      canonical: absoluteUrl(localePath(locale, path)),
      languages: {
        'pt-BR': absoluteUrl(localePath('pt', path)),
        en: absoluteUrl(localePath('en', path)),
      },
    },
    openGraph: {
      type: 'article',
      title: `${project.name}: ${project.tagline[locale]}`,
      description: project.summary[locale],
      locale: ogLocale[locale],
      url: absoluteUrl(localePath(locale, path)),
      images: [
        {
          url: absoluteUrl(project.screenshots[0].src),
          width: 1440,
          height: 900,
          alt: project.screenshots[0].alt[locale],
        },
      ],
    },
  };
}

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-zinc-200 py-12 dark:border-zinc-800">
      <div className="grid gap-6 md:grid-cols-[200px_1fr]">
        <h2
          id={id}
          className="font-mono text-xs tracking-widest text-accent-700 uppercase dark:text-accent-400"
        >
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) notFound();
  const dict = getDictionary(locale);
  const t = dict.project;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const [cover, ...gallery] = project.screenshots;

  return (
    <article className="reveal">
      <Container className="pt-10 pb-16 sm:pt-14">
        <Link href={`${localePath(locale)}#projects`} className={buttonStyles.link}>
          <ArrowLeftIcon width={16} height={16} />
          {t.back}
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="font-mono text-xs text-zinc-500">{project.testsBadge[locale]}</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">
            {project.name}
          </h1>
          <p className="mt-3 text-lg font-medium text-accent-700 dark:text-accent-400">
            {project.tagline[locale]}
          </p>
          <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {project.summary[locale]}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ExternalLink
              href={project.repo}
              newTabLabel={dict.external}
              className={buttonStyles.primary}
            >
              <GitHubIcon width={16} height={16} />
              {t.code}
            </ExternalLink>
            {project.demo && (
              <ExternalLink
                href={project.demo}
                newTabLabel={dict.external}
                className={buttonStyles.secondary}
              >
                <ExternalIcon width={16} height={16} />
                {t.demo}
              </ExternalLink>
            )}
          </div>
        </header>

        <figure className="mt-12 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
          <Image
            src={asset(cover.src)}
            alt={cover.alt[locale]}
            width={1440}
            height={900}
            priority
            sizes="(min-width: 1024px) 960px, 100vw"
            className="h-auto w-full"
          />
          <figcaption className="border-t border-zinc-200 px-4 py-2 text-xs text-zinc-500 dark:border-zinc-800">
            {cover.caption[locale]}
          </figcaption>
        </figure>

        <div className="mt-12">
          <Block id="problem" title={t.problem}>
            <div className="space-y-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
              {project.problem[locale].map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Block>

          <Block id="stack" title={t.stack}>
            <TagList items={project.stack} label={t.stack} />
          </Block>

          <Block id="architecture" title={t.architecture}>
            <ol className="grid gap-3 sm:grid-cols-2">
              {project.architecture.map((a, i) => (
                <li
                  key={a.layer.en}
                  className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
                >
                  <p className="font-mono text-xs text-zinc-500">
                    {String(i + 1).padStart(2, '0')} · {a.layer[locale]}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {a.detail[locale]}
                  </p>
                </li>
              ))}
            </ol>
          </Block>

          <Block id="features" title={t.features}>
            <ul className="grid gap-x-8 gap-y-2.5 text-sm text-zinc-700 sm:grid-cols-2 dark:text-zinc-300">
              {project.features[locale].map((f) => (
                <li key={f} className="flex gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-600"
                  />
                  {f}
                </li>
              ))}
            </ul>
          </Block>

          <Block id="decisions" title={t.decisions}>
            <dl className="space-y-6">
              {project.decisions.map((d) => (
                <div key={d.title.en}>
                  <dt className="font-medium text-zinc-900 dark:text-zinc-100">
                    {d.title[locale]}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {d.detail[locale]}
                  </dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block id="tests" title={t.tests}>
            <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-50 text-xs text-zinc-500 dark:bg-zinc-900">
                  <tr>
                    <th scope="col" className="px-4 py-2.5 font-medium">
                      {t.suite}
                    </th>
                    <th scope="col" className="px-4 py-2.5 font-medium">
                      {t.result}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {project.tests.map((s) => (
                    <tr key={s.name.en}>
                      <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                        {s.name[locale]}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-zinc-900 dark:text-zinc-100">
                        {s.result[locale]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              {project.testsNote[locale]}
            </p>
          </Block>

          <Block id="screenshots" title={t.screenshots}>
            <p className="mb-5 text-sm text-zinc-600 dark:text-zinc-400">{t.screenshotsNote}</p>
            <ul className="grid gap-5 sm:grid-cols-2">
              {gallery.map((s) => (
                <li key={s.src}>
                  <figure className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
                    <a
                      href={asset(s.src)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Image
                        src={asset(s.src)}
                        alt={s.alt[locale]}
                        width={s.mobile ? 390 : 1440}
                        height={s.mobile ? 844 : 900}
                        sizes="(min-width: 640px) 460px, 100vw"
                        className={
                          s.mobile
                            ? 'mx-auto h-[260px] w-auto sm:h-[230px] lg:h-[262px]'
                            : 'h-auto w-full'
                        }
                      />
                      <span className="sr-only">
                        {t.openImage} {dict.external}
                      </span>
                    </a>
                    <figcaption className="border-t border-zinc-200 px-3 py-2 text-xs text-zinc-500 dark:border-zinc-800">
                      {s.caption[locale]}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </Block>

          <Block id="limitations" title={t.limitations}>
            <ul className="space-y-2.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {project.limitations[locale].map((l) => (
                <li key={l} className="flex gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1 shrink-0 rounded-full bg-zinc-400"
                  />
                  {l}
                </li>
              ))}
            </ul>
          </Block>
        </div>

        <nav
          aria-label={t.next}
          className="mt-4 flex flex-col gap-4 border-t border-zinc-200 pt-10 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800"
        >
          <ExternalLink
            href={project.repo}
            newTabLabel={dict.external}
            className={buttonStyles.link}
          >
            <GitHubIcon width={16} height={16} />
            {t.code}
          </ExternalLink>
          <Link href={localePath(locale, `projects/${next.slug}`)} className="group text-right">
            <span className="block font-mono text-xs text-zinc-500">{t.next}</span>
            <span className="inline-flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {next.name}
              <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </nav>
      </Container>
    </article>
  );
}
