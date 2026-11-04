import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowIcon, ArrowLeftIcon } from '@/components/icons';
import { BlockCards, Bullets, PageSection, Paragraphs } from '@/components/PageSection';
import { StatusBadge } from '@/components/StatusBadge';
import { Container, TagList, buttonStyles } from '@/components/ui';
import { crmundi, type ContributionStatus } from '@/data/crmundi';
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
  const title = `${crmundi.title}: ${crmundi.subtitle[locale]}`;
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

const STATUS_ORDER: ContributionStatus[] = ['integrated', 'collaboration', 'develop', 'branch'];

export default async function CrmundiPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.caseStudy;
  const c = crmundi;

  const toc = [
    ['executive', t.executive],
    ['evolution', t.evolution],
    ['domains', t.domains],
    ['problems', t.problems],
    ['decisions', t.decisions],
    ['tech', t.tech],
    ['impact', t.impact],
    ['attribution', t.attribution],
  ] as const;

  return (
    <article className="reveal">
      <Container className="pt-10 pb-16 sm:pt-14">
        <Link href={localePath(locale, 'experience')} className={buttonStyles.link}>
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

        <nav aria-label={t.executive} className="mt-10">
          <ol className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
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
          <PageSection id="executive" title={t.executive}>
            <Paragraphs items={c.executive[locale]} />
            <h3 className="mt-8 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {t.scope}
            </h3>
            <dl className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {c.scope.map((s) => (
                <div
                  key={s.label.en}
                  className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
                >
                  <dt className="sr-only">{s.label[locale]}</dt>
                  <dd>
                    <span className="block font-mono text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                      {s.value}
                    </span>
                    <span className="mt-1 block text-sm text-zinc-600 dark:text-zinc-400">
                      {s.label[locale]}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-zinc-500">{c.scopeNote[locale]}</p>
          </PageSection>

          <PageSection id="evolution" title={t.evolution}>
            <ol className="relative space-y-5 border-l border-zinc-200 pl-6 dark:border-zinc-800">
              {c.evolution.map((step) => (
                <li key={step.title.en} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 -left-[29px] size-2.5 rounded-full border-2 border-white bg-accent-600 dark:border-zinc-950"
                  />
                  <p className="font-mono text-xs text-zinc-500">{step.title[locale]}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {step.body[locale]}
                  </p>
                </li>
              ))}
            </ol>
          </PageSection>

          <PageSection id="domains" title={t.domains}>
            <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">{t.domainsLead}</p>
            <ul aria-label={t.statusLegend} className="mb-5 flex flex-wrap gap-2">
              {STATUS_ORDER.map((s) => (
                <li key={s}>
                  <StatusBadge status={s} label={t.status[s]} />
                </li>
              ))}
            </ul>
            <div className="space-y-3">
              {c.domains.map((domain) => (
                <details
                  key={domain.id}
                  id={`domain-${domain.id}`}
                  className="group scroll-mt-24 rounded-xl border border-zinc-200 open:bg-zinc-50/60 dark:border-zinc-800 dark:open:bg-zinc-900/40"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-xl p-5 [&::-webkit-details-marker]:hidden">
                    <span>
                      <span className="block font-semibold text-zinc-900 dark:text-zinc-50">
                        {domain.title[locale]}
                      </span>
                      <span className="mt-1 block text-sm text-zinc-600 dark:text-zinc-400">
                        {domain.problem[locale]}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-3 text-xs text-zinc-500">
                      <span className="hidden sm:inline">
                        {domain.items.length} {t.contributions}
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-mono text-base text-zinc-400 transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </span>
                  </summary>
                  <ul className="grid gap-3 px-5 pb-5 sm:grid-cols-2">
                    {domain.items.map((item) => (
                      <li
                        key={item.title.en}
                        className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <p className="font-medium text-zinc-900 dark:text-zinc-100">
                            {item.title[locale]}
                          </p>
                          <StatusBadge status={item.status} label={t.status[item.status]} />
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {item.body[locale]}
                        </p>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </PageSection>

          <PageSection id="problems" title={t.problems}>
            <BlockCards items={c.problems} locale={locale} />
          </PageSection>

          <PageSection id="decisions" title={t.decisions}>
            <BlockCards items={c.decisions} locale={locale} columns={3} />
          </PageSection>

          <PageSection id="tech" title={t.tech}>
            <dl className="grid gap-5 sm:grid-cols-2">
              {(Object.keys(c.techGroups) as (keyof typeof c.techGroups)[]).map((group) => (
                <div key={group}>
                  <dt className="mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {t.techGroups[group]}
                  </dt>
                  <dd>
                    <TagList items={c.techGroups[group]} label={t.techGroups[group]} />
                  </dd>
                </div>
              ))}
            </dl>
          </PageSection>

          <PageSection id="impact" title={t.impact}>
            <Bullets items={c.impact[locale]} />
            <p className="mt-4 text-sm text-zinc-500">{c.impactNote[locale]}</p>
          </PageSection>

          <PageSection id="attribution" title={t.attribution}>
            <Bullets items={c.attribution[locale]} />
          </PageSection>
        </div>

        <nav
          aria-label={t.personalProjects}
          className="mt-4 flex flex-col gap-4 border-t border-zinc-200 pt-10 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800"
        >
          <Link href={localePath(locale, 'experience')} className={buttonStyles.link}>
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
