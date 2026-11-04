import type { Locale } from '@/lib/i18n';

type Kind = 'created' | 'evolved' | 'external';

interface Node {
  id: string;
  x: number;
  y: number;
  title: string;
  sub: Record<Locale, string>;
  kind: Kind;
}

const W = 180;
const H = 64;

/** Visão conceitual original (não reproduz configurações ou nomes internos). */
const NODES: Node[] = [
  {
    id: 'user',
    x: 20,
    y: 30,
    title: 'Agência',
    sub: { pt: 'navegador', en: 'browser' },
    kind: 'external',
  },
  {
    id: 'fe',
    x: 20,
    y: 210,
    title: 'Frontend Angular',
    sub: { pt: 'CRMundi · PrimeNG', en: 'CRMundi · PrimeNG' },
    kind: 'evolved',
  },
  {
    id: 'sched',
    x: 20,
    y: 390,
    title: 'EventBridge',
    sub: { pt: 'tarefas agendadas', en: 'scheduled jobs' },
    kind: 'evolved',
  },
  {
    id: 'api',
    x: 260,
    y: 210,
    title: 'API FastAPI',
    sub: { pt: 'CRMundi · SQLAlchemy', en: 'CRMundi · SQLAlchemy' },
    kind: 'evolved',
  },
  {
    id: 'db',
    x: 260,
    y: 390,
    title: 'MySQL',
    sub: { pt: 'isolamento por tenant', en: 'per-tenant isolation' },
    kind: 'external',
  },
  {
    id: 'chat',
    x: 500,
    y: 120,
    title: 'chat-mundi',
    sub: { pt: 'microsserviço FastAPI', en: 'FastAPI microservice' },
    kind: 'created',
  },
  {
    id: 'llm',
    x: 500,
    y: 300,
    title: 'Provedor de LLM',
    sub: { pt: 'Gerente Mundi', en: 'Gerente Mundi' },
    kind: 'external',
  },
  {
    id: 'pdf',
    x: 500,
    y: 410,
    title: 'AWS Lambda + S3',
    sub: { pt: 'geração de PDF', en: 'PDF generation' },
    kind: 'created',
  },
  {
    id: 'cw',
    x: 740,
    y: 30,
    title: 'ChatMundi',
    sub: { pt: 'fork Chatwoot · Rails', en: 'Chatwoot fork · Rails' },
    kind: 'evolved',
  },
  {
    id: 'evo',
    x: 740,
    y: 210,
    title: 'Evolution API',
    sub: { pt: 'gateway WhatsApp', en: 'WhatsApp gateway' },
    kind: 'external',
  },
  {
    id: 'wa',
    x: 740,
    y: 390,
    title: 'WhatsApp',
    sub: { pt: 'clientes da agência', en: 'agency customers' },
    kind: 'external',
  },
];

const EDGES: { d: string; label: Record<Locale, string>; lx: number; ly: number }[] = [
  { d: 'M110,94 L110,210', label: { pt: 'HTTPS', en: 'HTTPS' }, lx: 118, ly: 156 },
  { d: 'M200,242 L260,242', label: { pt: 'REST', en: 'REST' }, lx: 212, ly: 236 },
  {
    d: 'M200,222 L230,222 L230,152 L500,152',
    label: { pt: 'HTTP · WebSocket', en: 'HTTP · WebSocket' },
    lx: 240,
    ly: 146,
  },
  {
    d: 'M200,422 L230,422 L230,262 L260,262',
    label: { pt: 'ticks', en: 'ticks' },
    lx: 236,
    ly: 345,
  },
  { d: 'M350,274 L350,390', label: { pt: 'transações', en: 'transactions' }, lx: 358, ly: 336 },
  {
    d: 'M740,52 L400,52 L400,210',
    label: { pt: 'SSO JWT RS256/JWKS · webhooks', en: 'SSO JWT RS256/JWKS · webhooks' },
    lx: 480,
    ly: 46,
  },
  { d: 'M680,140 L710,140 L710,62 L740,62', label: { pt: 'API', en: 'API' }, lx: 716, ly: 104 },
  { d: 'M680,164 L710,164 L710,242 L740,242', label: { pt: 'API', en: 'API' }, lx: 716, ly: 206 },
  { d: 'M830,274 L830,390', label: { pt: 'mensagens', en: 'messages' }, lx: 838, ly: 336 },
  {
    d: 'M440,236 L465,236 L465,332 L500,332',
    label: { pt: 'intenção', en: 'intent' },
    lx: 471,
    ly: 290,
  },
  {
    d: 'M440,262 L450,262 L450,442 L500,442',
    label: { pt: 'payload', en: 'payload' },
    lx: 456,
    ly: 400,
  },
];

const NODE_STYLE: Record<Kind, string> = {
  created: 'fill-accent-50 stroke-accent-600 dark:fill-accent-800/30 dark:stroke-accent-400',
  evolved: 'fill-white stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-500',
  external:
    'fill-zinc-50 stroke-zinc-300 [stroke-dasharray:5_4] dark:fill-zinc-950 dark:stroke-zinc-700',
};

export const DIAGRAM_LEGEND: Record<Locale, Record<Kind, string>> = {
  pt: {
    created: 'Criado por mim',
    evolved: 'Evoluído por mim',
    external: 'Serviço externo ou base existente',
  },
  en: {
    created: 'Created by me',
    evolved: 'Extended by me',
    external: 'External service or existing base',
  },
};

export function SystemDiagram({ locale, title }: { locale: Locale; title: string }) {
  const nodeTitle = (n: Node) =>
    n.id === 'llm' && locale === 'en'
      ? 'LLM provider'
      : n.id === 'user' && locale === 'en'
        ? 'Agency'
        : n.title;
  return (
    <figure className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="overflow-x-auto p-4">
        <svg
          viewBox="0 0 940 490"
          role="img"
          aria-labelledby="system-diagram-title system-diagram-desc"
          className="mx-auto h-auto w-full min-w-[680px] max-w-4xl"
        >
          <title id="system-diagram-title">{title}</title>
          <desc id="system-diagram-desc">
            {NODES.map((n) => `${nodeTitle(n)} (${n.sub[locale]})`).join('; ')}
          </desc>
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" className="fill-zinc-400 dark:fill-zinc-500" />
            </marker>
          </defs>
          {EDGES.map((e) => (
            <g key={e.d}>
              <path
                d={e.d}
                fill="none"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
                className="stroke-zinc-400 dark:stroke-zinc-500"
              />
              <text
                x={e.lx}
                y={e.ly}
                className="fill-zinc-500 font-mono text-[11px] dark:fill-zinc-400"
              >
                {e.label[locale]}
              </text>
            </g>
          ))}
          {NODES.map((n) => (
            <g key={n.id}>
              <rect
                x={n.x}
                y={n.y}
                width={W}
                height={H}
                rx="10"
                strokeWidth="1.5"
                className={NODE_STYLE[n.kind]}
              />
              <text
                x={n.x + W / 2}
                y={n.y + 27}
                textAnchor="middle"
                className="fill-zinc-900 text-[14px] font-semibold dark:fill-zinc-50"
              >
                {nodeTitle(n)}
              </text>
              <text
                x={n.x + W / 2}
                y={n.y + 46}
                textAnchor="middle"
                className="fill-zinc-500 text-[11px] dark:fill-zinc-400"
              >
                {n.sub[locale]}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="flex flex-wrap gap-x-6 gap-y-2 border-t border-zinc-200 px-4 py-3 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
        {(Object.keys(NODE_STYLE) as Kind[]).map((k) => (
          <span key={k} className="inline-flex items-center gap-2">
            <svg width="22" height="12" aria-hidden="true">
              <rect
                x="1"
                y="1"
                width="20"
                height="10"
                rx="3"
                strokeWidth="1.5"
                className={NODE_STYLE[k]}
              />
            </svg>
            {DIAGRAM_LEGEND[locale][k]}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
