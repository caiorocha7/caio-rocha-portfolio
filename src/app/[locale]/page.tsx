import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink } from '@/components/ExternalLink';
import { ExperienceCard } from '@/components/ExperienceCard';
import { ArrowIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from '@/components/icons';
import { ProjectCard } from '@/components/ProjectCard';
import { Container, Section, buttonStyles } from '@/components/ui';
import { getDictionary } from '@/data/dictionary';
import { experience } from '@/data/experience';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { stack } from '@/data/stack';
import { isLocale, localePath } from '@/lib/i18n';
import { asset } from '@/lib/site';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      {/* HERO */}
      <section
        aria-labelledby="hero-title"
        className="reveal border-b border-zinc-200 dark:border-zinc-800"
      >
        <Container className="grid items-end gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_280px]">
          <div>
            <p className="inline-flex items-center gap-2 font-mono text-xs text-zinc-600 dark:text-zinc-400">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-accent-600 dark:bg-accent-400"
              />
              {dict.hero.eyebrow}
            </p>
            <h1
              id="hero-title"
              className="mt-6 text-5xl font-semibold tracking-tight text-zinc-950 sm:text-7xl dark:text-white"
            >
              {profile.name}
            </h1>
            <p className="mt-4 text-xl text-zinc-800 sm:text-2xl dark:text-zinc-200">
              {profile.role[locale]}
            </p>
            <p className="mt-1 font-mono text-sm text-accent-700 sm:text-base dark:text-accent-400">
              {profile.focus[locale]}
            </p>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {profile.intro[locale]}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href={localePath(locale, 'experience')} className={buttonStyles.primary}>
                {dict.hero.experience}
                <ArrowIcon width={16} height={16} />
              </Link>
              <a href="#projects" className={buttonStyles.secondary}>
                {dict.hero.projects}
              </a>
              <ExternalLink
                href={profile.github}
                newTabLabel={dict.external}
                className={buttonStyles.secondary}
              >
                <GitHubIcon width={16} height={16} />
                GitHub
              </ExternalLink>
              <ExternalLink
                href={profile.linkedin}
                newTabLabel={dict.external}
                className={buttonStyles.secondary}
              >
                <LinkedInIcon width={16} height={16} />
                LinkedIn
              </ExternalLink>
              {profile.resume && (
                <a href={asset(profile.resume)} download className={buttonStyles.secondary}>
                  <DownloadIcon width={16} height={16} />
                  {dict.hero.resume}
                </a>
              )}
            </div>
          </div>
          <aside aria-label={dict.hero.summary} className="hidden lg:block">
            <dl className="space-y-5 border-l border-zinc-200 pl-6 text-sm dark:border-zinc-800">
              {(
                [
                  [dict.hero.based, dict.hero.basedValue],
                  [dict.hero.education, dict.hero.educationValue],
                  [dict.hero.recent, dict.hero.recentValue],
                ] as const
              ).map(([term, value]) => (
                <div key={term}>
                  <dt className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
                    {term}
                  </dt>
                  <dd className="mt-1 text-zinc-800 dark:text-zinc-200">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </Container>
      </section>

      {/* SOBRE */}
      <Section id="about" index="01" title={dict.sections.about}>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            {profile.about[locale].map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
                {dict.sections.strengths}
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-zinc-800 dark:text-zinc-200">
                {profile.strengths[locale].map((s) => (
                  <li key={s} className="border-b border-zinc-100 pb-2 dark:border-zinc-900">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
                {dict.sections.education}
              </h3>
              <ul className="mt-3 space-y-3 text-sm">
                {profile.education.map((e) => (
                  <li key={e.degree.pt}>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">
                      {e.degree[locale]}
                    </p>
                    <p className="text-zinc-500">
                      {e.school} · {e.period}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* EXPERIÊNCIA PROFISSIONAL */}
      <Section
        id="experience"
        index="02"
        title={dict.sections.experience}
        lead={dict.sections.experienceLead}
      >
        <div className="space-y-4">
          {experience.map((job) => (
            <ExperienceCard key={job.id} job={job} locale={locale} dict={dict} />
          ))}
        </div>
      </Section>

      {/* PROJETOS */}
      <Section
        id="projects"
        index="03"
        title={dict.sections.projects}
        lead={dict.sections.projectsLead}
      >
        <div className="space-y-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
              dict={dict}
              index={i}
            />
          ))}
        </div>
      </Section>

      {/* STACK */}
      <Section id="stack" index="04" title={dict.sections.stack} lead={dict.sections.stackLead}>
        <dl className="grid gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3 dark:border-zinc-800 dark:bg-zinc-800">
          {stack.map((group) => (
            <div key={group.category.en} className="bg-white p-6 dark:bg-zinc-950">
              <dt className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
                {group.category[locale]}
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
                {group.items.join(' · ')}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* CONTATO */}
      <Section
        id="contact"
        index="05"
        title={dict.sections.contact}
        lead={dict.sections.contactLead}
      >
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
          <ul className="space-y-3">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-lg font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
              >
                <MailIcon />
                {profile.email}
              </a>
            </li>
            <li>
              <ExternalLink
                href={profile.linkedin}
                newTabLabel={dict.external}
                className="flex items-center gap-3 text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
              >
                <LinkedInIcon />
                linkedin.com/in/caioroch
              </ExternalLink>
            </li>
            <li>
              <ExternalLink
                href={profile.github}
                newTabLabel={dict.external}
                className="flex items-center gap-3 text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
              >
                <GitHubIcon />
                github.com/caiorocha7
              </ExternalLink>
            </li>
          </ul>
          <dl className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <dt className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
                {dict.contact.location}
              </dt>
              <dd className="mt-1 text-zinc-800 dark:text-zinc-200">{profile.location[locale]}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
                {dict.contact.availability}
              </dt>
              <dd className="mt-1 text-zinc-800 dark:text-zinc-200">{dict.contact.remote}</dd>
            </div>
          </dl>
        </div>
      </Section>
    </>
  );
}
