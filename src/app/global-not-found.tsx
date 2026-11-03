import type { Metadata } from 'next';
import Link from 'next/link';
import { themeScript } from '@/components/ThemeToggle';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Página não encontrada · Page not found',
  robots: { index: false },
};

/** 404 global (URLs fora de /pt e /en), bilíngue por não conhecer o idioma do visitante. */
export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen items-center justify-center px-6 font-sans">
        <main className="max-w-md text-center">
          <p className="font-mono text-sm text-accent-700 dark:text-accent-400">404</p>
          <h1 className="mt-3 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Página não encontrada
          </h1>
          <p className="mt-1 text-zinc-500" lang="en">
            Page not found
          </p>
          <div className="mt-8 flex justify-center gap-6 text-sm font-medium">
            <Link
              href="/pt/"
              className="text-accent-700 underline-offset-4 hover:underline dark:text-accent-400"
            >
              Ir para o início
            </Link>
            <Link
              href="/en/"
              lang="en"
              className="text-accent-700 underline-offset-4 hover:underline dark:text-accent-400"
            >
              Go to home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
