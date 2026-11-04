import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowIcon, ArrowLeftIcon } from '@/components/icons';
import { Bullets } from '@/components/PageSection';
import { Container, TagList, buttonStyles } from '@/components/ui';
import { crmundi } from '@/data/crmundi';
import { getDictionary } from '@/data/dictionary';
import { experience } from '@/data/experience';
import { isLocale, localePath, locales, ogLocale } from '@/lib/i18n';
import { absoluteUrl } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.experience.pageTitle,
    description: dict.experience.pageLead,
    alternates: {
      canonical: absoluteUrl(localePath(locale, 'experience')),
      languages: {
        'pt-BR': absoluteUrl(localePath('pt', 'experience')),
        en: absoluteUrl(localePath('en', 'experience')),
      },
    },
    openGraph: {
      type: 'profile',
      title: dict.experience.pageTitle,
      description: dict.experience.pageLead,
      locale: ogLocale[locale],
      url: absoluteUrl(localePath(locale, 'experience')),
      images: [{ url: absoluteUrl('/og.png'), width: 1200, height: 630, alt: dict.meta.title }],
    },
  };
}

export default async function ExperiencePage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.experience;
  const caseStudy = localePath(locale, 'experience/crmundi');

  return (
    <div className="reveal">
      <Container className="pt-10 pb-16 sm:pt-14">
        <Link href={localePath(locale)} className={buttonStyles.link}>
          <ArrowLeftIcon width={16} height={16} />
          {t.back}
        </Link>

        <header className="mt-8 max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-white">
            {t.pageTitle}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t.pageLead}
          </p>
        </header>

        <ol className="mt-12 space-y-16">
          {experience.map((job) => (
            <li key={job.id} id={job.id} className="scroll-mt-24">
              <article aria-labelledby={`${job.id}-title`}>
                <div className="grid gap-4 border-t border-zinc-200 pt-10 md:grid-cols-[220px_1fr] dark:border-zinc-800">
                  <div>
                    <p className="font-mono text-sm text-zinc-500">{job.period[locale]}</p>
                    <p className="mt-1 text-xs text-zinc-500">{job.context[locale]}</p>
                  </div>
                  <div className="min-w-0">
                    <h2
                      id={`${job.id}-title`}
                      className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
                    >
                      {job.company[locale]}
                    </h2>
                    <p className="mt-1 text-zinc-600 dark:text-zinc-400">{job.role[locale]}</p>

                    {job.product && (
                      <p className="mt-5 text-sm">
                        <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
                          {t.product}
                        </span>
                        <span className="mt-1 block text-lg font-semibold text-accent-700 dark:text-accent-400">
                          {job.product.name}
                        </span>
                        <span className="text-zinc-600 dark:text-zinc-400">
                          {job.product.tagline[locale]}
                        </span>
                      </p>
                    )}

                    {/* Experiências secundárias mostram só as atividades, sem repetir o resumo */}
                    {(job.primary || !job.highlights) && (
                      <p className="mt-4 max-w-3xl leading-relaxed text-zinc-700 dark:text-zinc-300">
                        {job.primary ? crmundi.executive[locale][1] : job.summary[locale]}
                      </p>
                    )}

                    {job.primary && (
                      <>
                        <h3 className="mt-8 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          {t.areas}
                        </h3>
                        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                          {crmundi.domains.map((d) => (
                            <li key={d.id}>
                              <Link
                                href={`${caseStudy}#domain-${d.id}`}
                                className="block h-full rounded-lg border border-zinc-200 p-4 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
                              >
                                <span className="block font-medium text-zinc-900 dark:text-zinc-100">
                                  {d.title[locale]}
                                </span>
                                <span className="mt-1 block text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                  {d.problem[locale]}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>

                        <h3 className="mt-8 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          {t.challenges}
                        </h3>
                        <div className="mt-3">
                          <Bullets items={crmundi.problems.map((p) => p.title[locale])} />
                        </div>
                      </>
                    )}

                    {!job.primary && job.highlights && (
                      <>
                        <h3 className="mt-6 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          {t.activities}
                        </h3>
                        <div className="mt-3">
                          <Bullets items={job.highlights[locale]} />
                        </div>
                      </>
                    )}

                    <h3 className="mt-8 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {t.tech}
                    </h3>
                    <div className="mt-3">
                      <TagList items={job.tech} label={t.tech} />
                    </div>

                    {job.caseStudy && (
                      <div className="mt-8">
                        <Link
                          href={localePath(locale, job.caseStudy)}
                          className={buttonStyles.primary}
                        >
                          {t.caseStudy}
                          <ArrowIcon width={16} height={16} />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </div>
  );
}
