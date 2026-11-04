import type { FlowStep } from '@/data/crmundi';
import type { Locale } from '@/lib/i18n';

/** Fluxo em etapas numeradas (diagrama conceitual em HTML, legível em qualquer tela). */
export function FlowSteps({
  steps,
  locale,
  label,
}: {
  steps: FlowStep[];
  locale: Locale;
  label: string;
}) {
  return (
    <ol
      aria-label={label}
      className="grid gap-3"
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${steps.length > 4 ? 150 : 180}px, 1fr))`,
      }}
    >
      {steps.map((s, i) => (
        <li
          key={s.label.en}
          className="relative rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/60"
        >
          <span className="font-mono text-xs text-accent-700 dark:text-accent-400">
            {String(i + 1).padStart(2, '0')}
          </span>
          <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {s.label[locale]}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            {s.detail[locale]}
          </p>
        </li>
      ))}
    </ol>
  );
}
