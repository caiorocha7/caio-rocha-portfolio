import type { AnchorHTMLAttributes, ReactNode } from 'react';

interface ExternalLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'target' | 'rel'
> {
  href: string;
  children: ReactNode;
  /** Texto lido por leitores de tela informando que o link abre nova aba. */
  newTabLabel: string;
}

/** Link externo seguro: nova aba com rel="noopener noreferrer" e aviso acessível. */
export function ExternalLink({ href, children, newTabLabel, ...props }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only"> {newTabLabel}</span>
    </a>
  );
}
