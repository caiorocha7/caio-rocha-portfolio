import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { localePath, locales } from '@/lib/i18n';
import { absoluteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', 'experience/crmundi', ...projects.map((p) => `projects/${p.slug}`)];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(localePath(locale, path)),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.8,
      alternates: {
        languages: {
          'pt-BR': absoluteUrl(localePath('pt', path)),
          en: absoluteUrl(localePath('en', path)),
        },
      },
    })),
  );
}
