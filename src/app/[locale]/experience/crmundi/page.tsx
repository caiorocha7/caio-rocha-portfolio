import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { FlowSteps } from '@/components/FlowSteps';
import { ArrowIcon, ArrowLeftIcon } from '@/components/icons';
import { SystemDiagram } from '@/components/SystemDiagram';
import { Container, TagList, buttonStyles } from '@/components/ui';
import { crmundi, type Block as BlockItem } from '@/data/crmundi';
import { getDictionary } from '@/data/dictionary';
import { isLocale, localePath, locales, ogLocale } from '@/lib/i18n';
import { absoluteUrl } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Params = Promise<{ locale: string }>;
const PATH = 'experience/crmundi';

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = `${crmundi.title}: ${crmundi.identification[locale]}`;
  return {
    title,
    description: crmundi.summary[locale],
    alternates: {
      canonical: absoluteUrl(localePath(locale, PATH)),
      languages: {
        'pt-BR': absoluteUrl(localePath('pt', PATH)),
        en: absoluteUrl(localePath('en', PATH)),
      },
    },
    openGraph: {
      type: 'article',
      title,
      description: crmundi.summary[locale],
      locale: ogLocale[locale],
      url: absoluteUrl(localePath(locale, PATH)),
      images: [{ url: absoluteUrl('/og.png'), width: 1200, height: 630, alt: crmundi.title }],
    },
  };
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
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

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
      {items.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
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

function Cards({
  items,
  locale,
  columns = 2,
}: {
  items: BlockItem[];
  locale: 'pt' | 'en';
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

export default async function CrmundiPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.caseStudy;
  const c = crmundi;

  const toc = [
    ['overview', t.overview],
    ['problem', t.problem],
    ['role', t.role],
    ['modules', t.modules],
    ['chatmundi', t.chatmundi],
    ['microservice', t.microservice],
    ['ownership', t.ownership],
    ['gerente', t.gerente],
    ['finance', t.finance],
    ['architecture', t.architecture],
    ['security', t.security],
    ['challenges', t.challenges],
    ['tech', t.tech],
    ['evidence', t.evidence],
    ['attribution', t.attribution],
  ] as const;

  return (
    <article className="reveal">
      <Container className="pt-10 pb-16 sm:pt-14">
        <Link href={`${localePath(locale)}#featured`} className={buttonStyles.link}>
          <ArrowLeftIcon width={16} height={16} />
          {t.back}
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="font-mono text-xs text-zinc-500">{c.identification[locale]}</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">
            {c.title}
          </h1>
          <p className="mt-3 text-lg font-medium text-accent-700 dark:text-accent-400">
            {c.subtitle[locale]}
          </p>
          <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {c.summary[locale]}
          </p>
          <p className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            {c.ownershipNote[locale]}
          </p>
        </header>

        <nav aria-label={t.overview} className="mt-10">
          <ol className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {toc.map(([id, label], i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  <span className="font-mono text-xs text-zinc-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>{' '}
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10">
          <Section id="overview" title={t.overview}>
            <Paragraphs items={c.overview[locale]} />
          </Section>

          <Section id="problem" title={t.problem}>
            <Paragraphs items={c.businessProblem[locale]} />
          </Section>

          <Section id="role" title={t.role}>
            <Bullets items={c.role[locale]} />
          </Section>

          <Section id="modules" title={t.modules}>
            <Cards items={c.modules} locale={locale} columns={3} />
          </Section>

          <Section id="chatmundi" title={t.chatmundi}>
            <Cards items={c.chatmundi} locale={locale} />
          </Section>

          <Section id="microservice" title={t.microservice}>
            <p className="mb-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
              {c.microservice.intro[locale]}
            </p>
            <Bullets items={c.microservice.points[locale]} />
          </Section>

          <Section id="ownership" title={t.ownership}>
            <p className="mb-5 leading-relaxed text-zinc-700 dark:text-zinc-300">
              {c.ownership.intro[locale]}
            </p>
            <FlowSteps steps={c.ownership.steps} locale={locale} label={t.ownershipFlow} />
            <div className="mt-6">
              <Bullets items={c.ownership.points[locale]} />
            </div>
          </Section>

          <Section id="gerente" title={t.gerente}>
            <p className="mb-5 leading-relaxed text-zinc-700 dark:text-zinc-300">
              {c.gerente.intro[locale]}
            </p>
            <FlowSteps steps={c.gerente.steps} locale={locale} label={t.gerenteFlow} />
            <div className="mt-6">
              <Bullets items={c.gerente.points[locale]} />
            </div>
            <p className="mt-4 text-sm text-zinc-500">{c.gerente.scope[locale]}</p>
          </Section>

          <Section id="finance" title={t.finance}>
            <Cards items={c.finance} locale={locale} />
          </Section>

          <Section id="architecture" title={t.architecture}>
            <SystemDiagram locale={locale} title={dict.featured.diagram} />
            <p className="mt-3 text-sm text-zinc-500">{c.architecture[locale]}</p>
          </Section>

          <Section id="security" title={t.security}>
            <Bullets items={c.security[locale]} />
          </Section>

          <Section id="challenges" title={t.challenges}>
            <Cards items={c.challenges} locale={locale} />
          </Section>

          <Section id="tech" title={t.tech}>
            <dl className="grid gap-5 sm:grid-cols-2">
              {(Object.keys(c.tech) as (keyof typeof c.tech)[]).map((group) => (
                <div key={group}>
                  <dt className="mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {t.techGroups[group]}
                  </dt>
                  <dd>
                    <TagList items={c.tech[group]} label={t.techGroups[group]} />
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section id="evidence" title={t.evidence}>
            <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">{c.evidence[locale]}</p>
          </Section>

          <Section id="attribution" title={t.attribution}>
            <Bullets items={c.attribution[locale]} />
          </Section>
        </div>

        <nav
          aria-label={t.personalProjects}
          className="mt-4 flex flex-col gap-4 border-t border-zinc-200 pt-10 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800"
        >
          <Link href={`${localePath(locale)}#featured`} className={buttonStyles.link}>
            <ArrowLeftIcon width={16} height={16} />
            {t.back}
          </Link>
          <Link
            href={`${localePath(locale)}#projects`}
            className="group inline-flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50"
          >
            {t.personalProjects}
            <ArrowIcon className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </nav>
      </Container>
    </article>
  );
}
