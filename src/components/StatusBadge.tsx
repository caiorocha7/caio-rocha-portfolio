import type { ContributionStatus } from '@/data/crmundi';

const STYLES: Record<ContributionStatus, string> = {
  integrated: 'border-accent-600/30 text-accent-800 dark:border-accent-400/30 dark:text-accent-300',
  collaboration: 'border-zinc-300 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400',
  develop: 'border-amber-500/40 text-amber-800 dark:border-amber-400/40 dark:text-amber-300',
  branch: 'border-amber-500/40 text-amber-800 dark:border-amber-400/40 dark:text-amber-300',
};

/** Status de integração verificado de uma contribuição (texto sempre visível, sem depender só de cor). */
export function StatusBadge({ status, label }: { status: ContributionStatus; label: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 font-mono text-[11px] whitespace-nowrap ${STYLES[status]}`}
    >
      {label}
    </span>
  );
}
