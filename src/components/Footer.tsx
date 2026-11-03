import type { Dictionary } from '@/data/dictionary';
import { profile } from '@/data/profile';
import { ExternalLink } from './ExternalLink';

const SOURCE = 'https://github.com/caiorocha7/caio-rocha-portfolio';

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-8 dark:text-zinc-500">
        <p>
          © {new Date().getFullYear()} {profile.fullName}
        </p>
        <p>
          {dict.footer.built}{' '}
          <ExternalLink
            href={SOURCE}
            newTabLabel={dict.external}
            className="underline decoration-zinc-300 underline-offset-4 hover:text-zinc-800 dark:decoration-zinc-700 dark:hover:text-zinc-200"
          >
            {dict.footer.source}
          </ExternalLink>
        </p>
      </div>
    </footer>
  );
}
