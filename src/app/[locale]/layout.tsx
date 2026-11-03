import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { themeScript } from '@/components/ThemeToggle';
import { getDictionary } from '@/data/dictionary';
import { profile } from '@/data/profile';
import { htmlLang, isLocale, locales, ogLocale } from '@/lib/i18n';
import { absoluteUrl, asset, siteUrl } from '@/lib/site';
import '@/styles/globals.css';

const sans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(`${siteUrl}/`),
    title: { default: dict.meta.title, template: `%s · ${profile.name}` },
    description: dict.meta.description,
    authors: [{ name: profile.fullName, url: profile.github }],
    creator: profile.fullName,
    alternates: {
      canonical: absoluteUrl(`/${locale}/`),
      languages: {
        'pt-BR': absoluteUrl('/pt/'),
        en: absoluteUrl('/en/'),
        'x-default': absoluteUrl('/pt/'),
      },
    },
    openGraph: {
      type: 'website',
      siteName: profile.name,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: ogLocale[locale],
      url: absoluteUrl(`/${locale}/`),
      images: [{ url: absoluteUrl('/og.png'), width: 1200, height: 630, alt: dict.meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
    },
    icons: { icon: asset('/favicon.svg') },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html
      lang={htmlLang[locale]}
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-zinc-900 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 dark:bg-zinc-50 dark:text-zinc-900"
        >
          {dict.nav.skip}
        </a>
        <Header locale={locale} dict={dict} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer dict={dict} />
      </body>
    </html>
  );
}
