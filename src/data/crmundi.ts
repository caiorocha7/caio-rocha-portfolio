import type { Localized } from '@/lib/i18n';

/**
 * Experiência profissional na MetaMundi (CRMundi e ChatMundi).
 * Fonte: auditoria somente leitura do histórico Git (37 contribuições classificadas), com status de integração
 * verificado por branch. Não contém métricas de negócio, dados de clientes, nomes internos de serviços, tabelas,
 * endpoints ou ambientes, nem a topologia de infraestrutura da empresa.
 */

/** Integrado nas branches principais | colaboração sobre base de outros autores | só em develop | só em branch */
export type ContributionStatus = 'integrated' | 'collaboration' | 'develop' | 'branch';

export interface Contribution {
  title: Localized;
  body: Localized;
  status: ContributionStatus;
}

export interface Domain {
  id: string;
  title: Localized;
  /** Uma linha: o problema de negócio do domínio. Usada também na página de experiência. */
  problem: Localized;
  items: Contribution[];
}

export interface Block {
  title: Localized;
  body: Localized;
}

const c = (
  pt: string,
  en: string,
  ptBody: string,
  enBody: string,
  status: ContributionStatus = 'integrated',
): Contribution => ({
  title: { pt, en },
  body: { pt: ptBody, en: enBody },
  status,
});

export const crmundi = {
  title: 'CRMundi & ChatMundi',
  subtitle: {
    pt: 'Plataforma SaaS para gestão de agências de viagens',
    en: 'SaaS platform for travel agency management',
  } satisfies Localized,
  identification: {
    pt: 'Experiência profissional · MetaMundi · jul/2025 a nov/2026',
    en: 'Professional experience · MetaMundi · Jul 2025 to Nov 2026',
  } satisfies Localized,
  ownershipNote: {
    pt: 'Produto proprietário da MetaMundi, com código privado. Esta página descreve apenas a minha contribuição dentro do time.',
    en: 'Proprietary MetaMundi product with private code. This page describes only my contribution within the team.',
  } satisfies Localized,

  /** Resumo de 3 a 5 linhas: home e página de experiência. */
  summary: {
    pt: 'Atuei de forma abrangente na evolução do CRMundi e do ChatMundi, com contribuições em vendas e ordens de serviço, financeiro, faturamento, atendimento WhatsApp, integrações, automações, segurança e Inteligência Artificial. Desenvolvi APIs, um microsserviço, interfaces Angular e soluções para problemas de concorrência e consistência de dados em MySQL.',
    en: 'I worked broadly on the evolution of CRMundi and ChatMundi, contributing to sales and service orders, finance, billing, WhatsApp customer service, integrations, automation, security and artificial intelligence. I built APIs, a microservice, Angular interfaces and solutions to concurrency and data-consistency problems in MySQL.',
  } satisfies Localized,

  tech: [
    'Python',
    'FastAPI',
    'SQLAlchemy',
    'MySQL',
    'Angular',
    'TypeScript',
    'Chatwoot',
    'AWS',
    'LLMs',
  ],

  /** Resumo executivo do estudo de caso. */
  executive: {
    pt: [
      'O CRMundi é uma plataforma SaaS multi-tenant de gestão comercial, financeira e de atendimento para agências de viagem. O ChatMundi é a camada de atendimento WhatsApp, baseada em um fork do Chatwoot, que passou a funcionar também dentro do CRM.',
      'Entrei em julho de 2025, quando o produto já existia, e acompanhei 16 meses da sua evolução. Comecei com integrações pontuais e assumi, ao longo do tempo, módulos completos de ponta a ponta, integrações entre sistemas, mudanças transversais com rollout controlado e IA aplicada.',
      'Trabalhei com backend Python/FastAPI, frontend Angular, MySQL, integrações externas e serviços AWS, sempre dentro de um time e sobre uma arquitetura que eu não criei, mas que estendi e endureci em praticamente todos os domínios principais.',
    ],
    en: [
      'CRMundi is a multi-tenant SaaS platform for travel agencies covering sales, finance and customer service. ChatMundi is the WhatsApp customer-service layer, based on a Chatwoot fork, which also became available inside the CRM.',
      'I joined in July 2025, when the product already existed, and followed 16 months of its evolution. I started with targeted integrations and, over time, took on complete end-to-end modules, cross-system integrations, cross-cutting changes with controlled rollouts and applied AI.',
      'I worked with a Python/FastAPI backend, an Angular frontend, MySQL, external integrations and AWS services, always as part of a team and on an architecture I did not create but extended and hardened across nearly every core domain.',
    ],
  } satisfies Localized<string[]>,

  /** Evolução do papel, a partir da linha do tempo de commits. */
  evolution: [
    {
      title: { pt: 'jul a out/2025', en: 'Jul to Oct 2025' },
      body: {
        pt: 'Integrações e backend: APIs para automações, relatórios e SSO entre CRM e atendimento.',
        en: 'Integrations and backend: APIs for automation, reports and SSO between CRM and customer service.',
      },
    },
    {
      title: { pt: 'nov/2025 a fev/2026', en: 'Nov 2025 to Feb 2026' },
      body: {
        pt: 'Full stack em vendas e cadastros; início da responsabilidade por versões e promoções de release.',
        en: 'Full stack on sales and registries; started owning versioning and release promotion.',
      },
    },
    {
      title: { pt: 'mar a mai/2026', en: 'Mar to May 2026' },
      body: {
        pt: 'Módulos completos: faturamento com PDF em Lambda, produtos personalizados e RBAC central.',
        en: 'Complete modules: billing with PDFs on Lambda, custom products and central RBAC.',
      },
    },
    {
      title: { pt: 'jun a ago/2026', en: 'Jun to Aug 2026' },
      body: {
        pt: 'Integrações distribuídas (Chatwoot, Evolution API, microsserviço, tempo real) e consistência financeira.',
        en: 'Distributed integrations (Chatwoot, Evolution API, microservice, real time) and financial consistency.',
      },
    },
    {
      title: { pt: 'set a out/2026', en: 'Sep to Oct 2026' },
      body: {
        pt: 'Mudanças transversais com rollout controlado, IA aplicada e confiabilidade de deploy e banco.',
        en: 'Cross-cutting changes with controlled rollouts, applied AI and deployment and database reliability.',
      },
    },
  ] satisfies Block[],

  domains: [
    {
      id: 'core',
      title: { pt: 'Core do CRM e SaaS', en: 'CRM core and SaaS' },
      problem: {
        pt: 'Evoluir um produto multi-tenant sem quebrar regras de negócio, permissões ou o isolamento entre agências.',
        en: 'Evolving a multi-tenant product without breaking business rules, permissions or isolation between agencies.',
      },
      items: [
        c(
          'Isolamento multi-tenant',
          'Multi-tenant isolation',
          'Endureci a resolução do tenant, validando o valor da requisição contra a claim do token.',
          'Hardened tenant resolution by validating the request value against the token claim.',
          'collaboration',
        ),
        c(
          'Cadastros sem duplicidade',
          'Duplicate-free registries',
          'Vendedores e fornecedores com soft delete, reativação e prevenção de duplicidade por documento sobre um modelo Pessoa → Papéis.',
          'Sellers and suppliers with soft delete, reactivation and document-based duplicate prevention on a Person → Roles model.',
        ),
        c(
          'Filtros e buscas administrativas',
          'Administrative filters and search',
          'Busca estrutural, autocomplete assíncrono e padrão visual unificado de filtros em vendas, financeiro e cadastros.',
          'Structural search, async autocomplete and a unified filter pattern across sales, finance and registries.',
        ),
        c(
          'Planos e entitlements',
          'Plans and entitlements',
          'Aplicação da matriz de planos, bloqueios entre planos e homologação de entitlements sobre o SaaS existente.',
          'Applied the plan matrix, cross-plan restrictions and entitlement validation on the existing SaaS layer.',
          'collaboration',
        ),
        c(
          'Portal de autoatendimento',
          'Self-service portal',
          'Fluxo de aprovação de solicitações, centros de custo por usuário e ocultação de preços para usuários externos.',
          'Request approval flow, per-user cost centers and price hiding for external users.',
        ),
      ],
    },
    {
      id: 'sales',
      title: { pt: 'Vendas e ordens de serviço', en: 'Sales and service orders' },
      problem: {
        pt: 'Vender produtos turísticos muito diferentes sem estados parciais, colisões ou retrabalho no pós-venda.',
        en: 'Selling very different travel products without partial states, collisions or post-sale rework.',
      },
      items: [
        c(
          'Pacotes e produtos turísticos',
          'Packages and travel products',
          'Pacotes com itens heterogêneos, passagens de ônibus com ida e volta e cancelamento parcial por item com regras de reembolso.',
          'Packages with heterogeneous items, round-trip bus tickets and item-level cancellation with refund rules.',
        ),
        c(
          'Produtos personalizados por tenant',
          'Per-tenant custom products',
          'Formulários dinâmicos configuráveis por agência, integrados à venda e ao calendário.',
          'Agency-configurable dynamic forms integrated with sales and the calendar.',
        ),
        c(
          'Wizard de nova venda',
          'New-sale wizard',
          'Participantes por identificador, cadastro rápido e refatoração das regras do fluxo com suíte de testes dedicada.',
          'Participants by id, quick registration and refactored flow rules with a dedicated test suite.',
        ),
        c(
          'Numeração de OS sob concorrência',
          'Concurrent service-order numbering',
          'Contador transacional com SELECT … FOR UPDATE e retentativa em savepoint, sequência por tenant e migration compatível com dados existentes.',
          'Transactional counter with SELECT … FOR UPDATE and savepoint retries, per-tenant sequence and a migration compatible with existing data.',
        ),
        c(
          'Atomicidade do fluxo de vendas',
          'Atomic sales flow',
          'Remoção de commits implícitos, service como dono da transação e documentação da arquitetura do domínio para code review.',
          'Removed implicit commits, made the service own the transaction and documented the domain architecture for code review.',
        ),
        c(
          'Cancelamento centralizado de OS',
          'Centralized service-order cancellation',
          'Propagação transacional para financeiro, faturamento, pós-venda e calendário, com testes de concorrência.',
          'Transactional propagation to finance, billing, post-sale and calendar, with concurrency tests.',
          'branch',
        ),
      ],
    },
    {
      id: 'finance',
      title: { pt: 'Financeiro e faturamento', en: 'Finance and billing' },
      problem: {
        pt: 'Manter o financeiro coerente com o que foi vendido e emitir documentos confiáveis para clientes corporativos.',
        en: 'Keeping finance consistent with what was sold and issuing reliable documents to corporate customers.',
      },
      items: [
        c(
          'Contas a pagar e a receber',
          'Accounts payable and receivable',
          'Despesas recorrentes, categorias por tenant, rastreabilidade de origem e autoria e alteração de status em lote atômica.',
          'Recurring expenses, per-tenant categories, origin and authorship traceability and atomic batch status changes.',
        ),
        c(
          'Integridade com vendas',
          'Integrity with sales',
          'Bloqueio de efeitos financeiros e exclusão de totais para vendas canceladas; movimentos preservados ao editar vendas.',
          'Blocked financial effects and excluded canceled sales from totals; movements preserved when editing sales.',
        ),
        c(
          'Faturamento corporativo',
          'Corporate billing',
          'Faturas com snapshot imutável das vendas, regras de desconto e retenção por cliente e numeração própria.',
          'Invoices with immutable sale snapshots, per-customer discount and withholding rules and dedicated numbering.',
        ),
        c(
          'PDF em AWS Lambda',
          'PDFs on AWS Lambda',
          'Renderização isolada em Lambda com layer de bibliotecas nativas, payload versionado e entrega por URL pré-assinada.',
          'Rendering isolated in a Lambda with a native library layer, versioned payload and pre-signed URL delivery.',
        ),
        c(
          'DRE, dashboards e relatórios',
          'P&L, dashboards and reports',
          'DRE gerencial com exportação PDF, dashboard executivo e financeiro reestruturado e relatórios com exportação CSV/PDF.',
          'Management P&L with PDF export, restructured executive and financial dashboards and reports with CSV/PDF export.',
        ),
        c(
          'Extratos e conciliação',
          'Bank statements and reconciliation',
          'Parser de extratos, deduplicação na importação e sugestões explicáveis de conciliação sobre o motor de outros autores.',
          'Statement parser, import deduplication and explainable reconciliation suggestions on an engine built by others.',
          'collaboration',
        ),
      ],
    },
    {
      id: 'chatmundi',
      title: {
        pt: 'ChatMundi e atendimento WhatsApp',
        en: 'ChatMundi and WhatsApp customer service',
      },
      problem: {
        pt: 'Atender pelo WhatsApp dentro do CRM, sem depender de outra ferramenta e sem perder o contexto comercial.',
        en: 'Serving customers over WhatsApp inside the CRM, without another tool and without losing commercial context.',
      },
      items: [
        c(
          'Atendimento nativo no CRM',
          'Native customer service in the CRM',
          'Conversas com filtros e etiquetas, mensagens com anexos e áudio, resolver e reabrir e contexto do cliente na conversa.',
          'Conversations with filters and labels, messages with attachments and audio, resolve and reopen and customer context in the conversation.',
        ),
        c(
          'Provisionamento por tenant',
          'Per-tenant provisioning',
          'Conexão WhatsApp self-service, idempotente, com recuperação automática de estados inconsistentes entre os sistemas envolvidos.',
          'Self-service, idempotent WhatsApp connection with automatic recovery from inconsistent states across the systems involved.',
        ),
        c(
          'SSO com JWT RS256 e JWKS',
          'SSO with RS256 JWT and JWKS',
          'Login único entre o CRM (Python) e a plataforma de atendimento (Rails), com provisionamento de usuários e contas.',
          'Single sign-on between the CRM (Python) and the customer-service platform (Rails), with user and account provisioning.',
        ),
        c(
          'Microsserviço de conversas',
          'Conversation microservice',
          'Domínio de chat extraído para um serviço FastAPI dedicado, com tempo real via WebSocket autenticado por tenant.',
          'Chat domain extracted into a dedicated FastAPI service, with real time over tenant-authenticated WebSocket.',
        ),
        c(
          'Fork Chatwoot (Rails e Sidekiq)',
          'Chatwoot fork (Rails and Sidekiq)',
          'Webhooks de integração, hardening de jobs e atualização da base de 4.5.2 para 4.14.1 preservando as customizações.',
          'Integration webhooks, job hardening and an upgrade of the base from 4.5.2 to 4.14.1 preserving the customizations.',
        ),
        c(
          'Conversa vira oportunidade',
          'Conversations become opportunities',
          'Sincronização idempotente de conversas resolvidas para o pipeline comercial.',
          'Idempotent sync of resolved conversations into the sales pipeline.',
          'collaboration',
        ),
      ],
    },
    {
      id: 'security',
      title: {
        pt: 'Distribuição, ownership e segurança',
        en: 'Assignment, ownership and security',
      },
      problem: {
        pt: 'Garantir que cada pessoa veja e altere apenas o que deve, inclusive sob concorrência.',
        en: 'Ensuring each person sees and changes only what they should, including under concurrency.',
      },
      items: [
        c(
          'Consultor responsável e Round Robin',
          'Account ownership and Round Robin',
          'Distribuição transacional com locks no MySQL e retry de deadlock, herança de ownership e rollout OFF, SHADOW e ENFORCE por tenant.',
          'Transactional assignment with MySQL locks and deadlock retries, ownership inheritance and per-tenant OFF, SHADOW and ENFORCE rollout.',
        ),
        c(
          'RBAC central',
          'Central RBAC',
          'Migração do controle de acesso legado para uma matriz de permissões em duas aplicações, módulo a módulo.',
          'Migration from legacy access control to a permission matrix across two applications, module by module.',
        ),
        c(
          'Auditoria e sessões',
          'Auditing and sessions',
          'Trilha de auditoria, revogação de JWT no logout, expiração por inatividade e troca de senha obrigatória.',
          'Audit trail, JWT revocation on logout, inactivity expiration and mandatory password change.',
        ),
        c(
          'Hardening de autenticação',
          'Authentication hardening',
          'Validação de JWT mais restrita, remoção de chaves versionadas e varredura de segredos no CI.',
          'Stricter JWT validation, removal of versioned keys and secret scanning in CI.',
        ),
      ],
    },
    {
      id: 'ai',
      title: { pt: 'Inteligência Artificial', en: 'Artificial intelligence' },
      problem: {
        pt: 'Responder perguntas de gestão em linguagem natural sem inventar números nem vazar dados.',
        en: 'Answering management questions in plain language without inventing numbers or leaking data.',
      },
      items: [
        c(
          'Gerente Mundi',
          'Gerente Mundi',
          'Assistente gerencial em que o LLM só interpreta a intenção; consultas pré-definidas sobre fontes oficiais e um renderer determinístico compõem a resposta.',
          'Management assistant where the LLM only interprets intent; predefined queries over official sources and a deterministic renderer compose the answer.',
        ),
        c(
          'Segurança do assistente',
          'Assistant security',
          'Validação de permissões e tenant, contexto em token assinado, proteção contra prompt injection e rate limit sob concorrência.',
          'Permission and tenant validation, context in a signed token, prompt-injection protection and rate limiting under concurrency.',
        ),
        c(
          'Briefings e entrega proativa',
          'Briefings and proactive delivery',
          'Resumos sob demanda e envio periódico opcional, com metas e preferências salvas mediante confirmação.',
          'On-demand summaries and optional periodic delivery, with goals and preferences saved after confirmation.',
        ),
      ],
    },
    {
      id: 'automation',
      title: { pt: 'Automações e notificações', en: 'Automation and notifications' },
      problem: {
        pt: 'Comunicar clientes no momento certo, sem envio duplicado e respeitando cada agência.',
        en: 'Reaching customers at the right time, without duplicate sends and respecting each agency.',
      },
      items: [
        c(
          'APIs para automações n8n',
          'APIs for n8n automation',
          'Fila de notificações e endpoints consumidos por automações de lembretes e pós-venda, com autenticação por API key.',
          'Notification queue and endpoints consumed by reminder and post-sale automations, with API-key authentication.',
        ),
        c(
          'Pipeline próprio de notificações',
          'In-house notification pipeline',
          'Scanner, worker e fila multi-tenant com WhatsApp e e-mail, templates, regras com prioridade e deduplicação por participante.',
          'Multi-tenant scanner, worker and queue with WhatsApp and email, templates, prioritized rules and per-participant deduplication.',
        ),
        c(
          'Processamento agendado',
          'Scheduled processing',
          'Tarefas acionadas por agendamento na AWS para notificações e entregas periódicas.',
          'AWS-scheduled jobs for notifications and periodic deliveries.',
        ),
        c(
          'Disparador de Mensagens',
          'Message Broadcaster',
          'Campanhas WhatsApp com cota diária, janela comercial com feriados, opt-out e política anti-duplicidade para resultados incertos.',
          'WhatsApp campaigns with a daily quota, business-hours window with holidays, opt-out and an anti-duplication policy for uncertain results.',
          'develop',
        ),
      ],
    },
    {
      id: 'engineering',
      title: {
        pt: 'Qualidade, confiabilidade e engenharia',
        en: 'Quality, reliability and engineering',
      },
      problem: {
        pt: 'Entregar com frequência sem degradar dados, deploys ou a experiência de quem usa o sistema.',
        en: 'Shipping frequently without degrading data, deployments or the user experience.',
      },
      items: [
        c(
          'Estabilidade de deploy',
          'Deployment stability',
          'Frontend resiliente à indisponibilidade da API sem logout indevido, health checks e checagem de versão.',
          'Frontend resilient to API unavailability without forced logouts, health checks and version checks.',
        ),
        c(
          'Migrations seguras',
          'Safe migrations',
          'Validação expand/contract no CI, resolução de múltiplos heads e correção de lock de migration preso no pool de conexões.',
          'Expand/contract validation in CI, resolution of multiple heads and a fix for a migration lock stuck in the connection pool.',
        ),
        c(
          'Migrations do banco global',
          'Global database migrations',
          'Alembic independente com CLI segura, lock e execução no pipeline.',
          'Independent Alembic setup with a safe CLI, locking and pipeline execution.',
          'develop',
        ),
        c(
          'Testes e documentação',
          'Tests and documentation',
          'Testes Pytest, inclusive contra MySQL real, de carga e de invariantes, specs Angular e documentos de arquitetura e rollout.',
          'Pytest tests, including against real MySQL, load and invariant tests, Angular specs and architecture and rollout documents.',
        ),
        c(
          'Gestão de versões',
          'Release management',
          'Versionamento e promoção recorrente de versões entre ambientes.',
          'Versioning and recurring release promotion across environments.',
        ),
      ],
    },
  ] satisfies Domain[],

  /** Problemas complexos: o que era, como resolvi. */
  problems: [
    {
      title: {
        pt: 'Colisões em criações simultâneas',
        en: 'Collisions under simultaneous creation',
      },
      body: {
        pt: 'Códigos de OS colidiam com usuários criando vendas ao mesmo tempo. Um contador transacional com lock de linha e retentativa isolada em savepoint eliminou a colisão sem descartar o restante da transação.',
        en: 'Service-order codes collided when users created sales at the same time. A transactional counter with a row lock and a retry isolated in a savepoint removed collisions without discarding the rest of the transaction.',
      },
    },
    {
      title: {
        pt: 'Linha invisível no REPEATABLE READ',
        en: 'An invisible row under REPEATABLE READ',
      },
      body: {
        pt: 'Após uma violação de UNIQUE, a releitura comum não encontrava a linha conflitante por causa do snapshot da transação. Reler com lock resolveu a corrida na distribuição de conversas.',
        en: 'After a UNIQUE violation, a plain re-read could not see the conflicting row because of the transaction snapshot. Re-reading with a lock fixed the race in conversation assignment.',
      },
    },
    {
      title: { pt: 'Vendas em estados parciais', en: 'Half-written sales' },
      body: {
        pt: 'Commits implícitos espalhados em upload, auditoria e notificação deixavam vendas incompletas quando algo falhava. Centralizar a transação no service tornou o fluxo atômico.',
        en: 'Implicit commits scattered across uploads, auditing and notifications left sales incomplete when something failed. Centralizing the transaction in the service made the flow atomic.',
      },
    },
    {
      title: { pt: 'Três sistemas, um estado', en: 'Three systems, one state' },
      body: {
        pt: 'Conectar o WhatsApp de uma agência envolvia sistemas que podiam divergir. Cada etapa passou a ser idempotente e capaz de se recuperar de recursos ausentes ou estados falsos.',
        en: 'Connecting an agency’s WhatsApp spanned systems that could drift apart. Every step became idempotent and able to recover from missing resources or false states.',
      },
    },
    {
      title: { pt: 'PDF que não cabia no backend', en: 'PDFs that did not fit the backend' },
      body: {
        pt: 'A biblioteca de renderização exigia dependências nativas incompatíveis com o pacote principal. Isolar a geração em uma função dedicada destravou faturas e DRE em PDF.',
        en: 'The rendering library required native dependencies incompatible with the main package. Isolating generation in a dedicated function unlocked PDF invoices and P&L reports.',
      },
    },
  ] satisfies Block[],

  /** Decisões de engenharia recorrentes. */
  decisions: [
    {
      title: {
        pt: 'LLM classifica, sistema responde',
        en: 'The LLM classifies, the system answers',
      },
      body: {
        pt: 'Sem SQL nem números gerados pelo modelo: intenções fechadas e execução determinística.',
        en: 'No model-generated SQL or numbers: closed intents and deterministic execution.',
      },
    },
    {
      title: { pt: 'Rollout em fases por tenant', en: 'Phased per-tenant rollout' },
      body: {
        pt: 'Mudanças de visibilidade passam por OFF, SHADOW e ENFORCE, com critérios de entrada e rollback documentados.',
        en: 'Visibility changes go through OFF, SHADOW and ENFORCE, with documented entry and rollback criteria.',
      },
    },
    {
      title: {
        pt: 'Migração incremental com adapter',
        en: 'Incremental migration with an adapter',
      },
      body: {
        pt: 'O RBAC legado foi substituído módulo a módulo, com camada de compatibilidade removida ao final.',
        en: 'Legacy RBAC was replaced module by module, with a compatibility layer removed at the end.',
      },
    },
    {
      title: { pt: 'Fila em tabela e tarefa agendada', en: 'Table-based queue and scheduled job' },
      body: {
        pt: 'Para o contexto de execução do backend, fila persistida e processamento agendado no lugar de um broker dedicado.',
        en: 'Given the backend runtime, a persisted queue and scheduled processing instead of a dedicated broker.',
      },
    },
    {
      title: { pt: 'Service dono da transação', en: 'The service owns the transaction' },
      body: {
        pt: 'Repositórios nunca confirmam transações; o service decide, o que evita estados parciais.',
        en: 'Repositories never commit; the service decides, which prevents partial states.',
      },
    },
    {
      title: { pt: 'Snapshot imutável de documentos', en: 'Immutable document snapshots' },
      body: {
        pt: 'Faturas guardam os dados da venda no momento da emissão, independentemente de edições posteriores.',
        en: 'Invoices keep sale data as of issuance, regardless of later edits.',
      },
    },
  ] satisfies Block[],

  techGroups: {
    backend: ['Python', 'FastAPI', 'SQLAlchemy', 'Alembic', 'MySQL', 'Pytest'],
    frontend: ['Angular', 'TypeScript', 'PrimeNG', 'RxJS'],
    integrations: [
      'Chatwoot',
      'Evolution API',
      'WhatsApp',
      'Webhooks',
      'WebSocket',
      'n8n',
      'Ruby on Rails',
      'Sidekiq',
    ],
    security: ['JWT RS256', 'JWKS', 'SSO', 'RBAC'],
    cloud: ['AWS Lambda', 'AWS S3', 'AWS ECS', 'AWS EventBridge', 'Docker', 'GitLab CI/CD'],
    ai: ['LLMs', 'Intent classification', 'Deterministic rendering', 'Prompt-injection defenses'],
  },

  /** Impacto funcional comprovável (o que passou a existir), sem métricas. */
  impact: {
    pt: [
      'Atendimento WhatsApp nativo no CRM, com conexão do número feita pela própria agência.',
      'Emissão de faturas corporativas e DRE em PDF a partir do sistema.',
      'Consultor responsável por cliente e conversa, com visibilidade restrita à carteira quando a regra é ativada.',
      'Consulta de indicadores em linguagem natural, com respostas baseadas nos dados oficiais.',
      'Permissões definidas em uma matriz central, com trilha de auditoria.',
    ],
    en: [
      'Native WhatsApp customer service in the CRM, with the agency connecting its own number.',
      'Corporate invoices and P&L reports issued as PDFs from the system.',
      'An assigned consultant per customer and conversation, with visibility limited to the portfolio when the rule is enabled.',
      'Plain-language queries over indicators, answered from official data.',
      'Permissions defined in a central matrix, with an audit trail.',
    ],
  } satisfies Localized<string[]>,

  impactNote: {
    pt: 'Capacidades integradas às branches principais do produto, verificadas no histórico Git. A liberação em produção depende de aprovação manual e não é verificável por esse histórico; também não apresento números de uso, clientes, desempenho ou receita.',
    en: 'Capabilities merged into the product’s main branches, verified in the Git history. Production release depends on manual approval and cannot be verified from that history; I also do not present usage, customer, performance or revenue numbers.',
  } satisfies Localized,

  attribution: {
    pt: [
      'Trabalhei em um time, sobre um produto que já existia. Não criei a arquitetura multi-tenant original, o pipeline base de CI/CD, a camada de provedores de LLM, o agente de IA do ChatMundi, a integração com o WhatsApp oficial nem o motor de conciliação financeira.',
      'Itens marcados como colaboração foram construídos sobre bases de outros autores; descrevo apenas a minha parte.',
      'O Disparador de Mensagens e as migrations do banco global estavam integrados apenas no ambiente de desenvolvimento ao fim do meu período. O cancelamento centralizado de OS estava em branch, ainda não integrado.',
      'O CRMundi é proprietário: não publico código, capturas de tela, nomes internos, configurações nem a topologia da infraestrutura. Mais detalhes podem ser apresentados em entrevista.',
    ],
    en: [
      'I worked in a team, on a product that already existed. I did not create the original multi-tenant architecture, the base CI/CD pipeline, the LLM provider layer, the ChatMundi AI agent, the official WhatsApp integration or the financial reconciliation engine.',
      'Items marked as collaboration were built on foundations by other authors; I describe only my part.',
      'The Message Broadcaster and the global-database migrations were integrated only into the development environment at the end of my tenure. Centralized service-order cancellation was in a branch, not yet merged.',
      'CRMundi is proprietary: I do not publish code, screenshots, internal names, configurations or the infrastructure topology. More detail can be shared in an interview.',
    ],
  } satisfies Localized<string[]>,
};
