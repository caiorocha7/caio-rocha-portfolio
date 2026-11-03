import type { Localized } from '@/lib/i18n';

export interface Screenshot {
  src: string;
  alt: Localized;
  caption: Localized;
  mobile?: boolean;
}

export interface TestSuite {
  name: Localized;
  result: Localized;
}

export interface Project {
  slug: 'routeops' | 'docpilot-ai' | 'connecthub';
  name: string;
  repo: string;
  /** Demonstração pública — apenas se existir. */
  demo?: string;
  tagline: Localized;
  summary: Localized;
  highlights: Localized<string[]>;
  stack: string[];
  testsBadge: Localized;
  problem: Localized<string[]>;
  architecture: { layer: Localized; detail: Localized }[];
  features: Localized<string[]>;
  decisions: { title: Localized; detail: Localized }[];
  tests: TestSuite[];
  testsNote: Localized;
  limitations: Localized<string[]>;
  screenshots: Screenshot[];
}

const shot = (
  slug: string,
  file: string,
  alt: Localized,
  caption: Localized,
  mobile = false,
): Screenshot => ({
  src: `/projects/${slug}/${file}.webp`,
  alt,
  caption,
  mobile,
});

export const projects: Project[] = [
  {
    slug: 'routeops',
    name: 'RouteOps',
    repo: 'https://github.com/caiorocha7/routeops-fullstack',
    tagline: {
      pt: 'Plataforma full stack de gestão logística',
      en: 'Full stack logistics management platform',
    },
    summary: {
      pt: 'Gestão de motoristas, veículos, entregas e ocorrências com regras de negócio no servidor, mapa com rastreamento simulado, dashboard operacional e relatórios em CSV.',
      en: 'Manages drivers, vehicles, deliveries and incidents with server-side business rules, a map with simulated tracking, an operations dashboard and CSV reports.',
    },
    highlights: {
      pt: [
        'Máquina de estados de entregas com histórico, perfis ADMIN/OPERATOR e bloqueio de conflitos de atribuição',
        'Mapa Leaflet com posições simuladas geradas e persistidas pelo backend',
        '76 testes: unitários, integração com PostgreSQL e E2E com Playwright',
      ],
      en: [
        'Delivery state machine with audit history, ADMIN/OPERATOR roles and assignment conflict checks',
        'Leaflet map with simulated positions generated and persisted by the backend',
        '76 tests: unit, PostgreSQL integration and Playwright E2E',
      ],
    },
    stack: [
      'React',
      'TypeScript',
      'NestJS',
      'Node.js',
      'Prisma',
      'PostgreSQL',
      'Tailwind CSS',
      'Leaflet',
      'Docker',
      'GitHub Actions',
      'Playwright',
    ],
    testsBadge: { pt: '76 testes', en: '76 tests' },
    problem: {
      pt: [
        'Operações de entrega costumam ficar espalhadas entre planilhas, mensagens e sistemas desconectados: é difícil saber quais entregas estão atrasadas, qual motorista está com qual veículo ou o que aconteceu com uma carga.',
        'O RouteOps centraliza esse fluxo em uma única interface. As regras — transições de status, disponibilidade de motoristas e veículos, cálculo de atraso — são aplicadas no servidor, e os indicadores usam exatamente as mesmas regras.',
      ],
      en: [
        'Delivery operations are often scattered across spreadsheets, chat messages and disconnected tools: it is hard to tell which deliveries are late, which driver has which vehicle or what happened to a shipment.',
        'RouteOps brings that workflow into a single interface. Business rules — status transitions, driver and vehicle availability, lateness — are enforced on the server, and every metric uses exactly the same rules.',
      ],
    },
    architecture: [
      {
        layer: { pt: 'Frontend', en: 'Frontend' },
        detail: {
          pt: 'React 19 + Vite, TanStack Query, React Hook Form + Zod, Tailwind CSS, React Leaflet e Recharts. A sessão nunca é exposta ao JavaScript.',
          en: 'React 19 + Vite, TanStack Query, React Hook Form + Zod, Tailwind CSS, React Leaflet and Recharts. The session is never exposed to JavaScript.',
        },
      },
      {
        layer: { pt: 'API', en: 'API' },
        detail: {
          pt: 'NestJS modular (auth, usuários, motoristas, veículos, entregas, rastreamento, ocorrências, dashboard, relatórios), guards globais de autenticação e perfil, DTOs validados e Swagger.',
          en: 'Modular NestJS (auth, users, drivers, vehicles, deliveries, tracking, incidents, dashboard, reports), global auth and role guards, validated DTOs and Swagger.',
        },
      },
      {
        layer: { pt: 'Dados', en: 'Data' },
        detail: {
          pt: 'PostgreSQL com Prisma, migrations versionadas, índices, chaves estrangeiras e CHECK constraints (ex.: entrega em rota exige motorista e veículo).',
          en: 'PostgreSQL with Prisma, versioned migrations, indexes, foreign keys and CHECK constraints (e.g. an in-transit delivery requires a driver and a vehicle).',
        },
      },
      {
        layer: { pt: 'Infraestrutura', en: 'Infrastructure' },
        detail: {
          pt: 'Docker Compose com health checks, nginx servindo a SPA e fazendo proxy de /api na mesma origem, e GitHub Actions com PostgreSQL de teste.',
          en: 'Docker Compose with health checks, nginx serving the SPA and proxying /api on the same origin, and GitHub Actions with a test PostgreSQL instance.',
        },
      },
    ],
    features: {
      pt: [
        'Login com JWT em cookie HttpOnly, revogação de sessões e rate limit',
        'CRUD de motoristas (CPF validado) e veículos (placa antiga e Mercosul)',
        'Ciclo de vida de entregas: atribuição, rota, atraso, conclusão e cancelamento',
        'Histórico de status com autor e registro/resolução de ocorrências',
        'Mapa com filtros por status, rotas e atualização automática',
        'Dashboard com KPIs e gráficos; relatórios por período com exportação CSV',
      ],
      en: [
        'JWT login in an HttpOnly cookie, session revocation and rate limiting',
        'Driver (validated CPF) and vehicle (legacy and Mercosur plates) management',
        'Delivery lifecycle: assignment, route, delay, completion and cancellation',
        'Status history with author, plus incident reporting and resolution',
        'Map with status filters, routes and automatic refresh',
        'Dashboard with KPIs and charts; period reports with CSV export',
      ],
    },
    decisions: [
      {
        title: { pt: 'Regras de domínio em funções puras', en: 'Domain rules as pure functions' },
        detail: {
          pt: 'Transições, permissões por perfil e cálculo de atraso ficam em um módulo sem dependência de framework, com equivalentes SQL usados pela listagem, pelo dashboard e pelos relatórios.',
          en: 'Transitions, role permissions and lateness live in a framework-free module, with SQL equivalents shared by the list view, dashboard and reports.',
        },
      },
      {
        title: { pt: 'Concorrência explícita', en: 'Explicit concurrency control' },
        detail: {
          pt: 'Atribuições e transições usam transações Serializable e bloqueio otimista por status + updatedAt; alterações concorrentes retornam 409 em vez de sobrescrever dados.',
          en: 'Assignments and transitions use Serializable transactions and optimistic locking on status + updatedAt; concurrent changes return 409 instead of overwriting data.',
        },
      },
      {
        title: { pt: 'Sessão em cookie HttpOnly', en: 'HttpOnly cookie session' },
        detail: {
          pt: 'Frontend e API na mesma origem; o usuário é revalidado a cada requisição, então desativação ou troca de senha revogam sessões imediatamente.',
          en: 'Frontend and API share the same origin; the user is revalidated on every request, so deactivation or a password change revokes sessions immediately.',
        },
      },
      {
        title: {
          pt: 'Simulação no servidor, não na tela',
          en: 'Server-side simulation, not a UI trick',
        },
        detail: {
          pt: 'Um serviço da API grava posições no banco ao longo de um percurso interpolado; o frontend apenas consulta via polling.',
          en: 'An API service writes positions to the database along an interpolated route; the frontend only polls for them.',
        },
      },
    ],
    tests: [
      {
        name: { pt: 'Unitários da API (Jest)', en: 'API unit tests (Jest)' },
        result: { pt: '35 aprovados', en: '35 passed' },
      },
      {
        name: {
          pt: 'Integração com PostgreSQL (Supertest)',
          en: 'PostgreSQL integration (Supertest)',
        },
        result: { pt: '21 aprovados', en: '21 passed' },
      },
      {
        name: {
          pt: 'Frontend (Vitest + Testing Library)',
          en: 'Frontend (Vitest + Testing Library)',
        },
        result: { pt: '17 aprovados', en: '17 passed' },
      },
      {
        name: { pt: 'E2E (Playwright, fluxo completo)', en: 'E2E (Playwright, full flow)' },
        result: { pt: '3 cenários aprovados', en: '3 scenarios passed' },
      },
    ],
    testsNote: {
      pt: 'O CI no GitHub Actions executa lint, typecheck, testes unitários, integração com PostgreSQL, build e Playwright a cada push.',
      en: 'GitHub Actions runs lint, typecheck, unit tests, PostgreSQL integration, build and Playwright on every push.',
    },
    limitations: {
      pt: [
        'O rastreamento é simulado: não há GPS real e o percurso não segue ruas.',
        'Sem refresh token: a sessão expira e o usuário faz login novamente.',
        'O timer da simulação é por processo; com várias instâncias da API, apenas uma deveria executá-lo.',
        'Endereços não são geocodificados.',
      ],
      en: [
        'Tracking is simulated: there is no real GPS and routes do not follow streets.',
        'No refresh token: the session expires and the user signs in again.',
        'The simulation timer runs per process; with multiple API instances only one should run it.',
        'Addresses are not geocoded.',
      ],
    },
    screenshots: [
      shot(
        'routeops',
        'dashboard',
        {
          pt: 'Dashboard do RouteOps com KPIs, gráfico de entregas por período e distribuição por status',
          en: 'RouteOps dashboard with KPIs, deliveries-over-time chart and status distribution',
        },
        { pt: 'Dashboard operacional', en: 'Operations dashboard' },
      ),
      shot(
        'routeops',
        'mapa',
        {
          pt: 'Mapa Leaflet com entregas coloridas por status em São Paulo e aviso de rastreamento simulado',
          en: 'Leaflet map with deliveries colored by status in São Paulo and a simulated-tracking notice',
        },
        { pt: 'Mapa com rastreamento simulado', en: 'Map with simulated tracking' },
      ),
      shot(
        'routeops',
        'detalhe-entrega',
        {
          pt: 'Detalhe de entrega em trânsito com rota no mapa, ações permitidas, ocorrências e histórico de status',
          en: 'In-transit delivery detail with route map, allowed actions, incidents and status history',
        },
        { pt: 'Detalhe da entrega', en: 'Delivery detail' },
      ),
      shot(
        'routeops',
        'entregas',
        {
          pt: 'Listagem de entregas com filtros por status, prioridade, motorista e período',
          en: 'Delivery list with filters for status, priority, driver and period',
        },
        { pt: 'Listagem com filtros', en: 'Filtered list' },
      ),
      shot(
        'routeops',
        'relatorios',
        {
          pt: 'Relatórios com indicadores do período, entregas por dia e desempenho por motorista',
          en: 'Reports with period metrics, deliveries per day and driver performance',
        },
        { pt: 'Relatórios e CSV', en: 'Reports and CSV' },
      ),
      shot(
        'routeops',
        'mobile-dashboard',
        {
          pt: 'Dashboard do RouteOps em tela de celular',
          en: 'RouteOps dashboard on a phone screen',
        },
        { pt: 'Layout responsivo', en: 'Responsive layout' },
        true,
      ),
    ],
  },
  {
    slug: 'docpilot-ai',
    name: 'DocPilot AI',
    repo: 'https://github.com/caiorocha7/docpilot-ai',
    tagline: {
      pt: 'IA para documentos com respostas rastreáveis',
      en: 'AI for documents with traceable answers',
    },
    summary: {
      pt: 'Upload e processamento assíncrono de documentos, chat com RAG em que cada afirmação aponta para o trecho que a sustenta, extração estruturada com revisão humana e avaliações quantitativas de IA.',
      en: 'Asynchronous document ingestion, a RAG chat where every claim points to the passage that supports it, structured extraction with human review and quantitative AI evaluations.',
    },
    highlights: {
      pt: [
        'Gate de evidência: afirmações sem suporte no trecho citado são removidas ou a resposta é recusada',
        'Defesas contra prompt injection e autorização antes da busca vetorial',
        '182 testes e avaliações com modelo real, com limitações documentadas',
      ],
      en: [
        'Evidence gate: claims not supported by the cited passage are dropped, or the answer is refused',
        'Prompt-injection defenses and authorization enforced before vector search',
        '182 tests plus evaluations against a real model, with documented limitations',
      ],
    },
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Python',
      'FastAPI',
      'SQLAlchemy',
      'PostgreSQL',
      'pgvector',
      'Redis',
      'Celery',
      'Ollama',
      'Docker',
      'GitHub Actions',
    ],
    testsBadge: { pt: '182 testes', en: '182 tests' },
    problem: {
      pt: [
        'Profissionais perdem tempo procurando informações em contratos, notas fiscais e relatórios, e ferramentas de “chat com PDF” costumam responder com confiança sem mostrar de onde a resposta veio.',
        'O DocPilot AI trata confiabilidade como requisito de engenharia: toda resposta traz citações verificáveis, cada campo extraído é marcado conforme a evidência e a qualidade é medida por um harness de avaliação.',
      ],
      en: [
        'Professionals waste time searching contracts, invoices and reports, and “chat with your PDF” tools often answer confidently without showing where the answer came from.',
        'DocPilot AI treats reliability as an engineering requirement: every answer carries verifiable citations, every extracted field is labeled by its evidence and quality is measured by an evaluation harness.',
      ],
    },
    architecture: [
      {
        layer: { pt: 'Frontend', en: 'Frontend' },
        detail: {
          pt: 'Next.js (App Router) com design system próprio, tema claro/escuro e fontes clicáveis que abrem o documento com o trecho destacado.',
          en: 'Next.js (App Router) with a custom design system, light/dark themes and clickable sources that open the document with the passage highlighted.',
        },
      },
      {
        layer: { pt: 'API', en: 'API' },
        detail: {
          pt: 'FastAPI fina (rotas, schemas, sessão, rate limit, auditoria) sobre um pacote de domínio compartilhado com o worker, sem regras duplicadas.',
          en: 'A thin FastAPI layer (routes, schemas, sessions, rate limiting, auditing) over a domain package shared with the worker, with no duplicated rules.',
        },
      },
      {
        layer: { pt: 'Processamento', en: 'Processing' },
        detail: {
          pt: 'Worker Celery + Redis: extração por página, chunking, embeddings e indexação no pgvector, com idempotência, retentativas com backoff e troca atômica do índice.',
          en: 'Celery + Redis worker: per-page extraction, chunking, embeddings and pgvector indexing, with idempotency, retries with backoff and atomic index swaps.',
        },
      },
      {
        layer: { pt: 'IA', en: 'AI' },
        detail: {
          pt: 'Ollama local para geração e embeddings, atrás de abstrações de provedor; PostgreSQL + pgvector com índice HNSW.',
          en: 'Local Ollama for generation and embeddings behind provider abstractions; PostgreSQL + pgvector with an HNSW index.',
        },
      },
    ],
    features: {
      pt: [
        'Upload de PDF, TXT e Markdown com validação por magic bytes',
        'Processamento assíncrono com status atualizado automaticamente',
        'Chat com documentos e citações ancoradas em página e trecho',
        'Recusa explícita quando não há evidência suficiente',
        'Extração estruturada por tipo de documento, com evidência por campo',
        'Revisão humana com aprovação, rejeição e trilha de auditoria',
      ],
      en: [
        'PDF, TXT and Markdown upload with magic-byte validation',
        'Asynchronous processing with live status updates',
        'Document chat with citations anchored to page and passage',
        'Explicit refusal when evidence is insufficient',
        'Structured extraction per document type, with per-field evidence',
        'Human review with approval, rejection and an audit trail',
      ],
    },
    decisions: [
      {
        title: {
          pt: 'Gate de evidência antes e depois do LLM',
          en: 'Evidence gate before and after the LLM',
        },
        detail: {
          pt: 'Sem trechos relevantes, a pergunta é recusada antes de chamar o modelo; depois, cada afirmação é verificada contra o trecho citado. A falsa resposta em perguntas sem resposta caiu de 62,5% para 0% no dataset de avaliação.',
          en: 'Without relevant passages the question is refused before calling the model; afterwards each claim is checked against the cited passage. False answers to unanswerable questions dropped from 62.5% to 0% on the evaluation set.',
        },
      },
      {
        title: { pt: 'Documentos são dados não confiáveis', en: 'Documents are untrusted data' },
        detail: {
          pt: 'Instruções ficam só no system prompt, trechos são escapados entre delimitadores, padrões de injeção são sinalizados e a saída passa por guards que bloqueiam o eco de instruções.',
          en: 'Instructions live only in the system prompt, passages are escaped inside delimiters, injection patterns are flagged and output guards block echoed instructions.',
        },
      },
      {
        title: { pt: 'Autorização antes da recuperação', en: 'Authorization before retrieval' },
        detail: {
          pt: 'O filtro de projeto e documentos faz parte da própria consulta vetorial, então trechos de outros usuários nunca chegam ao contexto.',
          en: 'Project and document filters are part of the vector query itself, so passages from other users never reach the context.',
        },
      },
      {
        title: { pt: 'Qualidade medida, não presumida', en: 'Measured, not assumed, quality' },
        detail: {
          pt: 'Um harness avalia recuperação, citações, recusa, extração e resistência a injeção, em modo determinístico no CI e com modelo real localmente, incluindo um dataset holdout.',
          en: 'A harness evaluates retrieval, citations, refusals, extraction and injection resistance — deterministically in CI and with a real model locally, including a holdout set.',
        },
      },
    ],
    tests: [
      {
        name: {
          pt: 'Backend: unitários e integração (pytest, PostgreSQL + pgvector e Redis reais)',
          en: 'Backend: unit and integration (pytest, real PostgreSQL + pgvector and Redis)',
        },
        result: { pt: '149 aprovados', en: '149 passed' },
      },
      {
        name: { pt: 'Frontend (Vitest)', en: 'Frontend (Vitest)' },
        result: { pt: '26 aprovados', en: '26 passed' },
      },
      {
        name: {
          pt: 'E2E (Playwright contra a stack Docker com Ollama real)',
          en: 'E2E (Playwright against the Docker stack with real Ollama)',
        },
        result: { pt: '7 aprovados', en: '7 passed' },
      },
      {
        name: {
          pt: 'Avaliação com modelo real (qwen2.5:1.5b)',
          en: 'Live-model evaluation (qwen2.5:1.5b)',
        },
        result: {
          pt: 'Recall@5 0,95 · precisão de citação 1,00 · recusa correta 1,00',
          en: 'Recall@5 0.95 · citation precision 1.00 · correct refusal 1.00',
        },
      },
    ],
    testsNote: {
      pt: 'Lint (ruff, ESLint), tipos (mypy, tsc) e testes rodam no CI. As métricas de IA vêm de um dataset pequeno e sintético — são evidência, não garantia.',
      en: 'Linting (ruff, ESLint), type checks (mypy, tsc) and tests run in CI. The AI metrics come from a small synthetic dataset — evidence, not a guarantee.',
    },
    limitations: {
      pt: [
        'Alucinações são reduzidas, não eliminadas: 2 de 22 perguntas respondíveis foram recusadas indevidamente na avaliação.',
        'Não há imunidade a prompt injection; as heurísticas podem ser contornadas por paráfrases.',
        'OCR fora do escopo: PDFs escaneados falham com mensagem explícita.',
        'Modelo pequeno por padrão (para rodar em CPU) e chat sem contexto multi-turn.',
      ],
      en: [
        'Hallucinations are reduced, not eliminated: 2 of 22 answerable questions were wrongly refused in evaluation.',
        'There is no immunity to prompt injection; heuristics can be bypassed by paraphrasing.',
        'OCR is out of scope: scanned PDFs fail with an explicit message.',
        'Small default model (to run on CPU) and no multi-turn context in chat.',
      ],
    },
    screenshots: [
      shot(
        'docpilot-ai',
        '03-chat-citations',
        {
          pt: 'Chat do DocPilot com respostas que citam o contrato e o relatório, com trechos e página de origem',
          en: 'DocPilot chat with answers citing the contract and the report, showing passages and source pages',
        },
        { pt: 'Chat com citações verificáveis', en: 'Chat with verifiable citations' },
      ),
      shot(
        'docpilot-ai',
        '04-document-citation-highlight',
        {
          pt: 'Visualização do documento com o trecho citado destacado',
          en: 'Document viewer with the cited passage highlighted',
        },
        { pt: 'Trecho citado destacado', en: 'Highlighted citation' },
      ),
      shot(
        'docpilot-ai',
        '05-extraction-review',
        {
          pt: 'Tela de revisão humana de campos extraídos com status de evidência',
          en: 'Human review screen for extracted fields with evidence status',
        },
        { pt: 'Revisão de extração', en: 'Extraction review' },
      ),
      shot(
        'docpilot-ai',
        '06-dashboard',
        {
          pt: 'Dashboard do DocPilot com documentos processados, revisões pendentes e latência',
          en: 'DocPilot dashboard with processed documents, pending reviews and latency',
        },
        { pt: 'Dashboard', en: 'Dashboard' },
      ),
      shot(
        'docpilot-ai',
        '08-chat-dark',
        { pt: 'Chat do DocPilot no tema escuro', en: 'DocPilot chat in dark mode' },
        { pt: 'Tema escuro', en: 'Dark mode' },
      ),
      shot(
        'docpilot-ai',
        '09-mobile-dashboard',
        {
          pt: 'Dashboard do DocPilot em tela de celular',
          en: 'DocPilot dashboard on a phone screen',
        },
        { pt: 'Layout responsivo', en: 'Responsive layout' },
        true,
      ),
    ],
  },
  {
    slug: 'connecthub',
    name: 'ConnectHub',
    repo: 'https://github.com/caiorocha7/connecthub-integrations',
    tagline: {
      pt: 'Integrações por webhook que sobrevivem a falhas',
      en: 'Webhook integrations that survive failures',
    },
    summary: {
      pt: 'Recebe webhooks assinados, transforma o JSON de forma declarativa e entrega a destinos HTTP de forma assíncrona, idempotente e rastreável, com retentativas, outbox transacional e simulador de falhas.',
      en: 'Receives signed webhooks, transforms JSON declaratively and delivers to HTTP destinations asynchronously, idempotently and traceably, with retries, a transactional outbox and a failure simulator.',
    },
    highlights: {
      pt: [
        'Outbox transacional: evento, entregas e mensagens gravados na mesma transação',
        'Idempotência na entrada e claim concorrente com FOR UPDATE SKIP LOCKED',
        '83 testes, cenário E2E de resiliência e quatro jobs de CI',
      ],
      en: [
        'Transactional outbox: event, deliveries and messages written in one transaction',
        'Idempotent ingestion and concurrent claiming with FOR UPDATE SKIP LOCKED',
        '83 tests, an end-to-end resilience scenario and four CI jobs',
      ],
    },
    stack: [
      'Angular',
      'TypeScript',
      'Python',
      'FastAPI',
      'SQLAlchemy',
      'PostgreSQL',
      'Redis',
      'Celery',
      'Docker',
      'GitHub Actions',
    ],
    testsBadge: { pt: '83 testes', en: '83 tests' },
    problem: {
      pt: [
        'Integrar sistemas por webhook parece simples até algo dar errado: o destino cai e o evento se perde, a origem reenvia e o pedido é processado duas vezes, ou ninguém sabe dizer o que foi entregue e por que falhou.',
        'O ConnectHub ataca cada ponto com mecanismos explícitos — outbox transacional, chave de idempotência, claim de entregas, retentativas classificadas por tipo de erro, histórico completo e transformação declarativa.',
      ],
      en: [
        'Webhook integrations look simple until something breaks: the destination goes down and the event is lost, the source retries and the order is processed twice, or nobody can tell what was delivered and why it failed.',
        'ConnectHub tackles each issue with explicit mechanisms — a transactional outbox, idempotency keys, delivery claiming, retries classified by error type, full history and declarative transformations.',
      ],
    },
    architecture: [
      {
        layer: { pt: 'Ingestão', en: 'Ingestion' },
        detail: {
          pt: 'FastAPI valida HMAC-SHA256 sobre o corpo bruto, janela anti-replay e tamanho; o evento é persistido antes do 202.',
          en: 'FastAPI verifies HMAC-SHA256 over the raw body, an anti-replay window and size limits; the event is persisted before returning 202.',
        },
      },
      {
        layer: { pt: 'Fila e entrega', en: 'Queue and delivery' },
        detail: {
          pt: 'Celery worker e beat com Redis: relay do outbox, entregas HTTP com backoff exponencial e jitter, respeito a Retry-After e job de recuperação.',
          en: 'Celery worker and beat on Redis: outbox relay, HTTP deliveries with exponential backoff and jitter, Retry-After support and a recovery job.',
        },
      },
      {
        layer: { pt: 'Dados', en: 'Data' },
        detail: {
          pt: 'PostgreSQL como fonte da verdade de eventos, entregas, tentativas, outbox e auditoria, com constraints únicas para idempotência.',
          en: 'PostgreSQL as the source of truth for events, deliveries, attempts, outbox and audit logs, with unique constraints for idempotency.',
        },
      },
      {
        layer: { pt: 'Frontend', en: 'Frontend' },
        detail: {
          pt: 'Angular (standalone, signals) com dashboard operacional, editor de transformações com pré-visualização e tela de falhas e reprocessamento.',
          en: 'Angular (standalone, signals) with an operations dashboard, a transformation editor with live preview and a failures/replay screen.',
        },
      },
    ],
    features: {
      pt: [
        'Autenticação com JWT curto e refresh token rotativo com detecção de reuso',
        'Organizações multi-tenant com papéis ADMIN e OPERATOR',
        'Endpoints com segredo HMAC cifrado e rotação com período de carência',
        'Transformação declarativa de payloads JSON, sem eval',
        'Reprocessamento manual por entrega, evento ou em lote, auditado',
        'Simulador de falhas: HTTP 5xx, timeout e 429 com Retry-After',
      ],
      en: [
        'Authentication with short-lived JWT and rotating refresh tokens with reuse detection',
        'Multi-tenant organizations with ADMIN and OPERATOR roles',
        'Endpoints with encrypted HMAC secrets and rotation with a grace period',
        'Declarative JSON payload transformation, without eval',
        'Audited manual replay per delivery, per event or in bulk',
        'Failure simulator: HTTP 5xx, timeouts and 429 with Retry-After',
      ],
    },
    decisions: [
      {
        title: { pt: 'At-least-once honesto', en: 'Honest at-least-once' },
        detail: {
          pt: 'O sistema garante processamento lógico idempotente e entrega at-least-once, sem prometer exactly-once de efeitos externos; cada requisição leva um Idempotency-Key estável para o destino deduplicar.',
          en: 'The system guarantees idempotent logical processing and at-least-once delivery without promising exactly-once external effects; every request carries a stable Idempotency-Key so the destination can deduplicate.',
        },
      },
      {
        title: { pt: 'Outbox transacional', en: 'Transactional outbox' },
        detail: {
          pt: 'Se o Redis estiver fora ou a API cair logo após o commit, a mensagem fica pendente e o relay a publica depois; no pior caso a entrega atrasa, mas não se perde.',
          en: 'If Redis is down or the API crashes right after commit, the message stays pending and the relay publishes it later; in the worst case delivery is delayed, never lost.',
        },
      },
      {
        title: { pt: 'Claim com SKIP LOCKED', en: 'Claiming with SKIP LOCKED' },
        detail: {
          pt: 'Mensagens duplicadas no broker são esperadas; o worker reivindica a entrega com FOR UPDATE SKIP LOCKED e só um vence. A chamada HTTP acontece fora da transação.',
          en: 'Duplicate broker messages are expected; the worker claims the delivery with FOR UPDATE SKIP LOCKED and only one wins. The HTTP call happens outside the transaction.',
        },
      },
      {
        title: { pt: 'Erros classificados', en: 'Classified errors' },
        detail: {
          pt: 'Timeout, rede, 429 e 5xx são temporários e retentados; demais 4xx, redirects, SSRF e erros de transformação são permanentes.',
          en: 'Timeouts, network errors, 429 and 5xx are transient and retried; other 4xx, redirects, SSRF blocks and transformation errors are permanent.',
        },
      },
    ],
    tests: [
      {
        name: {
          pt: 'Backend (pytest com PostgreSQL e Redis reais)',
          en: 'Backend (pytest with real PostgreSQL and Redis)',
        },
        result: { pt: '62 aprovados · 89% de cobertura', en: '62 passed · 89% coverage' },
      },
      {
        name: { pt: 'Frontend (Vitest)', en: 'Frontend (Vitest)' },
        result: { pt: '16 aprovados', en: '16 passed' },
      },
      {
        name: { pt: 'Simulador (pytest)', en: 'Simulator (pytest)' },
        result: { pt: '5 aprovados', en: '5 passed' },
      },
      {
        name: {
          pt: 'E2E de resiliência (stack Docker real)',
          en: 'Resilience E2E (real Docker stack)',
        },
        result: {
          pt: 'falha → retentativas → reprocessamento → sucesso → duplicado bloqueado',
          en: 'failure → retries → replay → success → duplicate blocked',
        },
      },
    ],
    testsNote: {
      pt: 'O CI tem quatro jobs: backend (lint, mypy --strict, alembic check e testes), frontend, simulador e E2E com a stack completa via Docker Compose.',
      en: 'CI runs four jobs: backend (lint, mypy --strict, alembic check and tests), frontend, simulator and E2E with the full stack via Docker Compose.',
    },
    limitations: {
      pt: [
        'Exactly-once de efeito externo não é garantido (at-least-once com Idempotency-Key).',
        'A ordem de entrega entre eventos do mesmo endpoint não é garantida.',
        'Proteção contra DNS rebinding ainda parcial; rate limit da ingestão fica a cargo do gateway.',
        'Tokens no localStorage nesta versão; em produção o recomendado é cookie HttpOnly.',
      ],
      en: [
        'Exactly-once external effects are not guaranteed (at-least-once with Idempotency-Key).',
        'Delivery order between events of the same endpoint is not guaranteed.',
        'DNS rebinding protection is partial; ingestion rate limiting is left to the gateway.',
        'Tokens are stored in localStorage in this version; an HttpOnly cookie is recommended for production.',
      ],
    },
    screenshots: [
      shot(
        'connecthub',
        '02-dashboard',
        {
          pt: 'Dashboard do ConnectHub com KPIs de entregas, gráfico temporal e saúde por destino',
          en: 'ConnectHub dashboard with delivery KPIs, time-series chart and per-destination health',
        },
        { pt: 'Dashboard operacional', en: 'Operations dashboard' },
      ),
      shot(
        'connecthub',
        '11-delivery-detail',
        {
          pt: 'Detalhe de entrega com linha do tempo de tentativas, erros HTTP 500, backoff e payload transformado',
          en: 'Delivery detail with attempt timeline, HTTP 500 errors, backoff and transformed payload',
        },
        { pt: 'Linha do tempo de tentativas', en: 'Attempt timeline' },
      ),
      shot(
        'connecthub',
        '07-transform-editor',
        {
          pt: 'Editor de regras de transformação JSON com pré-visualização',
          en: 'JSON transformation rule editor with live preview',
        },
        { pt: 'Editor de transformação', en: 'Transformation editor' },
      ),
      shot(
        'connecthub',
        '12-failures',
        {
          pt: 'Tela de falhas com opção de reprocessamento manual',
          en: 'Failures screen with manual replay',
        },
        { pt: 'Falhas e reprocessamento', en: 'Failures and replay' },
      ),
      shot(
        'connecthub',
        '13-simulator',
        {
          pt: 'Simulador de falhas configurável com modos 5xx, timeout e 429',
          en: 'Configurable failure simulator with 5xx, timeout and 429 modes',
        },
        { pt: 'Simulador de falhas', en: 'Failure simulator' },
      ),
      shot(
        'connecthub',
        '16-mobile-dashboard',
        {
          pt: 'Dashboard do ConnectHub em tela de celular',
          en: 'ConnectHub dashboard on a phone screen',
        },
        { pt: 'Layout responsivo', en: 'Responsive layout' },
        true,
      ),
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
