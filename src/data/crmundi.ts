import type { Localized } from '@/lib/i18n';

/**
 * Estudo de caso da experiência profissional na MetaMundi (CRMundi e ChatMundi).
 * Fonte: auditoria somente leitura do histórico Git (commits, MRs e documentação), com status de integração
 * verificado por branch. Não contém métricas de negócio, dados de clientes, nomes internos de tabelas,
 * endpoints, ambientes ou capturas de tela proprietárias.
 */

export interface Block {
  title: Localized;
  body: Localized;
}

export interface FlowStep {
  label: Localized;
  detail: Localized;
}

export const crmundi = {
  title: 'CRMundi & ChatMundi',
  subtitle: {
    pt: 'Plataforma SaaS de gestão empresarial, atendimento WhatsApp, automações e IA aplicada.',
    en: 'SaaS platform for business management, WhatsApp customer service, automation and applied AI.',
  } satisfies Localized,
  identification: {
    pt: 'Experiência profissional · MetaMundi · 2025 a 2026',
    en: 'Professional experience · MetaMundi · 2025 to 2026',
  } satisfies Localized,
  ownershipNote: {
    pt: 'Produto proprietário da MetaMundi. Código privado; aqui apresento apenas a minha contribuição.',
    en: 'Proprietary MetaMundi product. Private code; this page covers only my own contribution.',
  } satisfies Localized,

  /** Resumo curto para a home. */
  summary: {
    pt: 'Na MetaMundi, trabalhei de ponta a ponta no CRMundi, um SaaS multi-tenant para agências de viagem, e no ChatMundi, o atendimento WhatsApp integrado ao CRM. Fui de integrações pontuais a módulos completos e mudanças transversais com rollout controlado.',
    en: 'At MetaMundi I worked end to end on CRMundi, a multi-tenant SaaS for travel agencies, and on ChatMundi, the WhatsApp customer service integrated into the CRM. My scope grew from targeted integrations to complete modules and cross-cutting changes with controlled rollouts.',
  } satisfies Localized,

  pillars: [
    {
      title: { pt: 'ChatMundi e WhatsApp', en: 'ChatMundi and WhatsApp' },
      body: {
        pt: 'Atendimento nativo no CRM integrando Chatwoot e Evolution API, com provisionamento idempotente por tenant e tempo real via WebSocket.',
        en: 'Native customer service inside the CRM integrating Chatwoot and Evolution API, with idempotent per-tenant provisioning and real time over WebSocket.',
      },
    },
    {
      title: { pt: 'Ownership e Round Robin', en: 'Ownership and Round Robin' },
      body: {
        pt: 'Consultor responsável e distribuição transacional de conversas em MySQL, com rollout OFF, SHADOW e ENFORCE por tenant.',
        en: 'Account ownership and transactional conversation assignment in MySQL, rolled out per tenant through OFF, SHADOW and ENFORCE.',
      },
    },
    {
      title: { pt: 'Gerente Mundi (IA)', en: 'Gerente Mundi (AI)' },
      body: {
        pt: 'Assistente gerencial em que o LLM só interpreta a pergunta; os números vêm de consultas pré-definidas e de um renderer determinístico.',
        en: 'Management assistant where the LLM only interprets the question; the numbers come from predefined queries and a deterministic renderer.',
      },
    },
    {
      title: { pt: 'Vendas, financeiro e faturamento', en: 'Sales, finance and billing' },
      body: {
        pt: 'Consistência transacional em vendas e ordens de serviço, evolução do financeiro e faturamento corporativo com PDF em AWS Lambda.',
        en: 'Transactional consistency in sales and service orders, finance improvements and corporate billing with PDFs on AWS Lambda.',
      },
    },
  ] satisfies Block[],

  homeTech: [
    'Python',
    'FastAPI',
    'SQLAlchemy',
    'MySQL',
    'Angular',
    'TypeScript',
    'Chatwoot',
    'Evolution API',
    'WebSocket',
    'AWS Lambda',
    'LLMs',
  ],

  overview: {
    pt: [
      'O CRMundi é uma plataforma SaaS multi-tenant de gestão comercial, financeira e de atendimento para agências de viagem: vendas e ordens de serviço, produtos turísticos, pós-venda, contas a pagar e a receber, faturamento, relatórios, calendário e controle de acesso.',
      'O ChatMundi é a camada de atendimento WhatsApp, baseada em um fork do Chatwoot, que passou a funcionar também dentro do próprio CRM. Trabalhei nos dois lados, além de serviços auxiliares como geração de PDF e notificações.',
    ],
    en: [
      'CRMundi is a multi-tenant SaaS platform for travel agencies covering sales and service orders, travel products, post-sale, accounts payable and receivable, billing, reports, calendar and access control.',
      'ChatMundi is the WhatsApp customer-service layer, based on a Chatwoot fork, which also became available inside the CRM itself. I worked on both sides, plus supporting services such as PDF generation and notifications.',
    ],
  } satisfies Localized<string[]>,

  businessProblem: {
    pt: [
      'Agências de viagem precisam controlar vendas com produtos muito diferentes (aéreo, hotel, ônibus, pacotes, produtos personalizados), manter o financeiro consistente com o que foi vendido e atender clientes pelo WhatsApp sem perder o contexto comercial.',
      'Com vários tenants no mesmo produto, cada entrega precisava respeitar isolamento de dados, permissões por perfil e compatibilidade com o comportamento já existente.',
    ],
    en: [
      'Travel agencies need to manage sales with very different products (flights, hotels, buses, packages, custom products), keep finance consistent with what was sold and serve customers over WhatsApp without losing commercial context.',
      'With many tenants on the same product, every change had to respect data isolation, role-based permissions and compatibility with existing behavior.',
    ],
  } satisfies Localized<string[]>,

  role: {
    pt: [
      'Desenvolvedor de software full stack, com peso maior no backend (Python, FastAPI, SQLAlchemy, MySQL) e atuação forte no frontend Angular.',
      'Implementei funcionalidades de ponta a ponta: modelagem, migrations, APIs, telas, testes automatizados e documentação técnica.',
      'Integrei sistemas externos: Chatwoot (APIs e fork Rails/Sidekiq), Evolution API, n8n, AWS S3 e Lambda e provedor de LLM.',
      'Conduzi mudanças transversais com rollout por fases e documentação de critérios de entrada e rollback.',
      'Atuei em estabilidade de deploy, hardening de autenticação, migrations e promoção de versões entre ambientes.',
    ],
    en: [
      'Full stack software developer with a stronger backend focus (Python, FastAPI, SQLAlchemy, MySQL) and significant Angular frontend work.',
      'Delivered features end to end: data modeling, migrations, APIs, screens, automated tests and technical documentation.',
      'Integrated external systems: Chatwoot (APIs and Rails/Sidekiq fork), Evolution API, n8n, AWS S3 and Lambda and an LLM provider.',
      'Led cross-cutting changes with phased rollouts and documented entry and rollback criteria.',
      'Worked on deployment stability, authentication hardening, migrations and release promotion across environments.',
    ],
  } satisfies Localized<string[]>,

  modules: [
    {
      title: { pt: 'Vendas e ordens de serviço', en: 'Sales and service orders' },
      body: {
        pt: 'Wizard de nova venda, pacotes turísticos com itens e cancelamento por item, produtos personalizados por tenant com formulários dinâmicos, filtros e buscas administrativas.',
        en: 'New-sale wizard, travel packages with item-level cancellation, per-tenant custom products with dynamic forms, and administrative filters and search.',
      },
    },
    {
      title: { pt: 'Financeiro', en: 'Finance' },
      body: {
        pt: 'Contas a pagar e a receber, despesas recorrentes, categorias por tenant, rastreabilidade de origem e autoria, operações em lote atômicas e DRE gerencial.',
        en: 'Accounts payable and receivable, recurring expenses, per-tenant categories, origin and authorship traceability, atomic batch operations and a management P&L report.',
      },
    },
    {
      title: { pt: 'Faturamento corporativo', en: 'Corporate billing' },
      body: {
        pt: 'Módulo de faturas com snapshot imutável das vendas, regras de desconto e retenção por cliente e geração de PDF.',
        en: 'Invoice module with immutable sale snapshots, per-customer discount and withholding rules and PDF generation.',
      },
    },
    {
      title: { pt: 'Dashboards e relatórios', en: 'Dashboards and reports' },
      body: {
        pt: 'Reestruturação do dashboard executivo, operacional e financeiro e relatórios com tabelas analíticas e exportação CSV/PDF.',
        en: 'Restructured executive, operational and financial dashboards, and reports built on analytical tables with CSV/PDF export.',
      },
    },
    {
      title: { pt: 'Acesso e auditoria', en: 'Access and auditing' },
      body: {
        pt: 'Migração do controle de acesso legado para uma matriz RBAC central em duas aplicações, trilha de auditoria e revogação de sessões.',
        en: 'Migration from legacy access control to a central RBAC matrix across two applications, an audit trail and session revocation.',
      },
    },
    {
      title: { pt: 'Notificações e automações', en: 'Notifications and automation' },
      body: {
        pt: 'Fila de notificações consumida por automações n8n e, depois, pipeline próprio multi-tenant (scanner, worker e fila) com envio por WhatsApp e e-mail.',
        en: 'A notification queue consumed by n8n automations, later replaced by an in-house multi-tenant pipeline (scanner, worker and queue) sending over WhatsApp and email.',
      },
    },
  ] satisfies Block[],

  chatmundi: [
    {
      title: { pt: 'Atendimento nativo no CRM', en: 'Native customer service in the CRM' },
      body: {
        pt: 'Lista de conversas com filtros, busca e etiquetas; leitura e envio de mensagens com anexos, imagem colada e áudio gravado; resolver e reabrir; contexto comercial do cliente na conversa; layout responsivo.',
        en: 'Conversation list with filters, search and labels; reading and sending messages with attachments, pasted images and recorded audio; resolve and reopen; the customer’s commercial context inside the conversation; responsive layout.',
      },
    },
    {
      title: { pt: 'Provisionamento WhatsApp por tenant', en: 'Per-tenant WhatsApp provisioning' },
      body: {
        pt: 'Orquestração de Evolution API e Chatwoot para criar e vincular instância, conta e caixa de entrada de cada tenant, com conexão por QR Code self-service, recuperação automática de conexão e tratamento de estados inconsistentes, de forma idempotente.',
        en: 'Orchestration of Evolution API and Chatwoot to create and link each tenant’s instance, account and inbox, with self-service QR Code connection, automatic connection recovery and handling of inconsistent states, all idempotent.',
      },
    },
    {
      title: { pt: 'SSO entre CRM e Chatwoot', en: 'SSO between CRM and Chatwoot' },
      body: {
        pt: 'O CRM emite um JWT RS256 de curta duração com identificador de chave e publica um JWKS; o lado Rails valida pela chave pública, provisiona ou associa usuário e conta e abre a sessão sem segundo login.',
        en: 'The CRM issues a short-lived RS256 JWT with a key id and publishes a JWKS; the Rails side validates it with the public key, provisions or links the user and account and opens the session without a second login.',
      },
    },
    {
      title: { pt: 'Fork Chatwoot (Ruby on Rails)', en: 'Chatwoot fork (Ruby on Rails)' },
      body: {
        pt: 'Webhook ao resolver conversas para integração com o CRM, hardening de jobs Sidekiq (backlog, timeouts, idempotência e retentativas) e atualização da base de 4.5.2 para 4.14.1 em merges incrementais, preservando as customizações.',
        en: 'Webhook on conversation resolution for CRM integration, Sidekiq job hardening (backlog, timeouts, idempotency and retries) and an upgrade of the base from 4.5.2 to 4.14.1 through incremental merges that preserved the customizations.',
      },
    },
    {
      title: {
        pt: 'Conversa resolvida vira oportunidade',
        en: 'Resolved conversations become opportunities',
      },
      body: {
        pt: 'Sincronização idempotente de conversas resolvidas para o pipeline comercial, sem duplicar negócios quando o mesmo evento chega mais de uma vez.',
        en: 'Idempotent sync of resolved conversations into the sales pipeline, without duplicating deals when the same event arrives more than once.',
      },
    },
  ] satisfies Block[],

  microservice: {
    intro: {
      pt: 'Extraí o domínio de conversas do backend principal para um microsserviço FastAPI dedicado, o que desacoplou o chat e viabilizou o tempo real.',
      en: 'I extracted the conversation domain from the main backend into a dedicated FastAPI microservice, decoupling chat and enabling real time.',
    },
    points: {
      pt: [
        'Instâncias, conversas, mensagens, webhooks e health checks em um serviço próprio em Docker.',
        'Fachada interna para o CRM com fallback controlado durante a transição.',
        'Validação de JWT RS256 via JWKS e RBAC alinhado ao CRM.',
        'Tempo real evoluído de polling para SSE e depois para um hub WebSocket autenticado por tenant, com reconexão ao trocar token ou tenant e sem expor tokens em logs.',
        'Cache de configuração por tenant, request id e diagnósticos para operação.',
      ],
      en: [
        'Instances, conversations, messages, webhooks and health checks in a standalone Docker service.',
        'Internal facade for the CRM with a controlled fallback during the transition.',
        'RS256 JWT validation via JWKS and RBAC aligned with the CRM.',
        'Real time evolved from polling to SSE and then to a tenant-authenticated WebSocket hub, reconnecting on token or tenant changes and never logging tokens.',
        'Per-tenant configuration cache, request ids and diagnostics for operations.',
      ],
    } satisfies Localized<string[]>,
  },

  ownership: {
    intro: {
      pt: 'Agências queriam que cada cliente e conversa tivesse um consultor responsável e que consultores vissem só a própria carteira. A mudança atravessava atendimento (HTTP e tempo real), pipeline comercial, vendas e telas derivadas.',
      en: 'Agencies wanted every customer and conversation to have an assigned consultant, and consultants to see only their own portfolio. The change cut across customer service (HTTP and real time), the sales pipeline, sales and related screens.',
    },
    steps: [
      {
        label: { pt: 'Lock na configuração', en: 'Lock the configuration' },
        detail: {
          pt: 'SELECT … FOR UPDATE no canal antes de escolher o consultor',
          en: 'SELECT … FOR UPDATE on the channel before picking a consultant',
        },
      },
      {
        label: { pt: 'Checagem sob lock', en: 'Check under lock' },
        detail: {
          pt: 'Ownership existente é respeitado; cursor do Round Robin avança',
          en: 'Existing ownership is kept; the Round Robin cursor advances',
        },
      },
      {
        label: { pt: 'Auditoria na transação', en: 'Audit in the same transaction' },
        detail: {
          pt: 'Atribuição e registro de auditoria confirmados juntos',
          en: 'Assignment and audit record committed together',
        },
      },
      {
        label: { pt: 'Retry seguro', en: 'Safe retry' },
        detail: {
          pt: 'Deadlock e lock wait tratados com retentativa, sem fail-open',
          en: 'Deadlocks and lock waits retried, never failing open',
        },
      },
    ] satisfies FlowStep[],
    points: {
      pt: [
        'Herança de ownership de conversa para negócio e venda, espelhada a partir dos webhooks do Chatwoot.',
        'Permissões de "ver tudo" por domínio e escopo de dados por consultor.',
        'Rollout por tenant em três fases (OFF, SHADOW e ENFORCE), com critérios de entrada, observação e rollback documentados; em ENFORCE, recursos fora do escopo respondem 404 para não revelar sua existência.',
        'Testes contra MySQL real, de carga e de invariantes.',
      ],
      en: [
        'Ownership inheritance from conversation to deal and sale, mirrored from Chatwoot webhooks.',
        'Per-domain "view all" permissions and per-consultant data scope.',
        'Per-tenant rollout in three phases (OFF, SHADOW and ENFORCE) with documented entry, observation and rollback criteria; in ENFORCE, out-of-scope resources return 404 so their existence is not revealed.',
        'Tests against real MySQL, plus load and invariant tests.',
      ],
    } satisfies Localized<string[]>,
  },

  gerente: {
    intro: {
      pt: 'Gestores queriam perguntar em linguagem natural coisas como "quanto vendemos este mês?" e receber respostas confiáveis. A decisão central foi não deixar o modelo gerar SQL nem números.',
      en: 'Managers wanted to ask in plain language things like "how much did we sell this month?" and get reliable answers. The core decision was never letting the model generate SQL or numbers.',
    },
    steps: [
      {
        label: { pt: 'Pergunta', en: 'Question' },
        detail: {
          pt: 'O usuário pergunta em linguagem natural',
          en: 'The user asks in plain language',
        },
      },
      {
        label: { pt: 'Interpretação', en: 'Interpretation' },
        detail: {
          pt: 'O LLM devolve uma intenção fechada e parâmetros',
          en: 'The LLM returns a closed intent and parameters',
        },
      },
      {
        label: { pt: 'Validação', en: 'Validation' },
        detail: {
          pt: 'O backend valida permissões, tenant e parâmetros',
          en: 'The backend validates permissions, tenant and parameters',
        },
      },
      {
        label: { pt: 'Consulta', en: 'Query' },
        detail: {
          pt: 'Consultas pré-definidas sobre fontes oficiais',
          en: 'Predefined queries over official data sources',
        },
      },
      {
        label: { pt: 'Renderização', en: 'Rendering' },
        detail: {
          pt: 'Renderer determinístico compõe a resposta',
          en: 'A deterministic renderer composes the answer',
        },
      },
    ] satisfies FlowStep[],
    points: {
      pt: [
        'Contexto conversacional em token assinado, sem dados pessoais no contexto.',
        'Perguntas com múltiplas intenções e pedidos de esclarecimento quando falta informação.',
        'Briefings sob demanda e entrega proativa opcional, com metas e preferências salvas pelo chat mediante confirmação.',
        'Proteção contra prompt injection indireta, replay e abuso; rate limit estrito sob concorrência e auditoria.',
      ],
      en: [
        'Conversational context in a signed token, with no personal data in the context.',
        'Multi-intent questions and clarification requests when information is missing.',
        'On-demand briefings and optional proactive delivery, with goals and preferences saved through chat after confirmation.',
        'Protection against indirect prompt injection, replay and abuse; strict rate limiting under concurrency and auditing.',
      ],
    } satisfies Localized<string[]>,
    scope: {
      pt: 'Construído sobre uma camada de provedores de LLM já existente na empresa. Não é RAG vetorial nem modelo treinado.',
      en: 'Built on top of an LLM provider layer that already existed in the company. It is not vector RAG and not a trained model.',
    },
  },

  finance: [
    {
      title: { pt: 'Numeração de OS sob concorrência', en: 'Concurrent service-order numbering' },
      body: {
        pt: 'Códigos colidiam em criações simultâneas. Resolvi com contador transacional (SELECT … FOR UPDATE), retentativa dentro de savepoint para não descartar a transação externa e sequência separada por tenant, com migration compatível com valores existentes.',
        en: 'Codes collided under simultaneous creation. I fixed it with a transactional counter (SELECT … FOR UPDATE), retries inside a savepoint so the outer transaction is not discarded, and a per-tenant sequence, with a migration compatible with existing values.',
      },
    },
    {
      title: { pt: 'Atomicidade do fluxo de vendas', en: 'Atomic sales flow' },
      body: {
        pt: 'Commits implícitos espalhados deixavam vendas em estados parciais quando algo falhava. Removi esses commits, tornei o service dono da transação e documentei a arquitetura do domínio com checklist de code review e suíte de testes dedicada.',
        en: 'Scattered implicit commits left sales half-written when something failed. I removed them, made the service own the transaction and documented the domain architecture with a code-review checklist and a dedicated test suite.',
      },
    },
    {
      title: { pt: 'PDF em AWS Lambda', en: 'PDFs on AWS Lambda' },
      body: {
        pt: 'A renderização com WeasyPrint exigia bibliotecas nativas incompatíveis com o pacote do backend. Isolei a geração em uma Lambda dedicada com layer de bibliotecas, payload versionado, correlação de logs e entrega por URL pré-assinada no S3.',
        en: 'WeasyPrint rendering needed native libraries that did not fit the backend package. I moved generation into a dedicated Lambda with a library layer, a versioned payload, log correlation and delivery through pre-signed S3 URLs.',
      },
    },
    {
      title: { pt: 'Financeiro consistente com vendas', en: 'Finance consistent with sales' },
      body: {
        pt: 'Bloqueio de efeitos financeiros e exclusão de totais para vendas canceladas, preservação de movimentos ao editar vendas, recorrências corrigidas e alteração de status em lote de forma atômica.',
        en: 'Blocked financial effects and excluded canceled sales from totals, preserved movements when editing sales, fixed recurrences and made batch status changes atomic.',
      },
    },
  ] satisfies Block[],

  architecture: {
    pt: 'Visão conceitual simplificada, criada para este portfólio. Não reproduz configurações, nomes internos nem fluxos confidenciais.',
    en: 'Simplified conceptual view created for this portfolio. It does not reproduce configurations, internal names or confidential flows.',
  } satisfies Localized,

  security: {
    pt: [
      'Endurecimento do isolamento multi-tenant, validando o tenant da requisição contra a claim do token.',
      'Matriz RBAC central, trilha de auditoria, revogação de JWT no logout e expiração por inatividade.',
      'Validação de JWT mais restrita, remoção de chaves versionadas e varredura de segredos (gitleaks) no CI.',
      'Resiliência do frontend quando a API fica indisponível durante deploys, sem logout indevido; health checks e checagem de versão.',
      'Validação de migrations no padrão expand/contract no CI e correção de lock de migration preso no pool de conexões.',
      'Testes automatizados com Pytest, inclusive contra MySQL real, e specs Angular.',
    ],
    en: [
      'Hardened multi-tenant isolation by validating the request tenant against the token claim.',
      'Central RBAC matrix, audit trail, JWT revocation on logout and inactivity expiration.',
      'Stricter JWT validation, removal of versioned keys and secret scanning (gitleaks) in CI.',
      'Frontend resilience when the API is unavailable during deployments, without forced logouts; health checks and version checks.',
      'Expand/contract migration validation in CI and a fix for a migration lock stuck in the connection pool.',
      'Automated tests with Pytest, including against real MySQL, and Angular specs.',
    ],
  } satisfies Localized<string[]>,

  challenges: [
    {
      title: {
        pt: 'Linha invisível no REPEATABLE READ',
        en: 'An invisible row under REPEATABLE READ',
      },
      body: {
        pt: 'Após uma violação de UNIQUE, a releitura comum não encontrava a linha conflitante por causa do snapshot da transação. A solução foi reler com lock.',
        en: 'After a UNIQUE violation, a plain re-read could not see the conflicting row because of the transaction snapshot. The fix was re-reading with a lock.',
      },
    },
    {
      title: {
        pt: 'Retentativa sem perder a transação',
        en: 'Retrying without losing the transaction',
      },
      body: {
        pt: 'Repetir uma inserção após conflito descartava todo o trabalho anterior. Isolar a tentativa em um savepoint permitiu repetir só o trecho necessário.',
        en: 'Retrying an insert after a conflict threw away all prior work. Wrapping the attempt in a savepoint allowed retrying only what was needed.',
      },
    },
    {
      title: { pt: 'Três sistemas, um estado', en: 'Three systems, one state' },
      body: {
        pt: 'Provisionar WhatsApp envolvia CRM, Chatwoot e Evolution API, que podiam divergir. Cada etapa precisou ser idempotente e capaz de se recuperar de recursos ausentes ou estados falsos.',
        en: 'WhatsApp provisioning spanned the CRM, Chatwoot and Evolution API, which could drift apart. Every step had to be idempotent and able to recover from missing resources or false states.',
      },
    },
    {
      title: {
        pt: 'Mudança transversal sem quebrar ninguém',
        en: 'A cross-cutting change without breaking anyone',
      },
      body: {
        pt: 'Ownership alterava a visibilidade de dados em vários módulos. O modo SHADOW permitiu observar o efeito antes de aplicar a regra a cada tenant.',
        en: 'Ownership changed data visibility across several modules. SHADOW mode made it possible to observe the impact before enforcing the rule for each tenant.',
      },
    },
    {
      title: { pt: 'IA sem números inventados', en: 'AI without invented numbers' },
      body: {
        pt: 'Separar interpretação e execução eliminou a possibilidade de o modelo produzir valores: ele classifica a intenção e o sistema responde com dados oficiais.',
        en: 'Separating interpretation from execution removed any chance of the model producing figures: it classifies the intent and the system answers with official data.',
      },
    },
  ] satisfies Block[],

  tech: {
    backend: ['Python', 'FastAPI', 'SQLAlchemy', 'Alembic', 'MySQL', 'Pytest', 'REST APIs'],
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
    security: ['JWT RS256', 'JWKS', 'SSO', 'RBAC', 'Multi-tenant isolation'],
    cloud: ['AWS Lambda', 'AWS S3', 'AWS ECS', 'AWS EventBridge', 'Docker', 'GitLab CI/CD'],
    ai: ['LLMs', 'Intent classification', 'Deterministic rendering', 'Prompt-injection defenses'],
  },

  evidence: {
    pt: 'O CRMundi é um produto proprietário. Ainda não há autorização da MetaMundi para publicar capturas de tela, por isso esta página usa apenas diagramas conceituais originais e descrições técnicas. Detalhes adicionais podem ser apresentados em entrevista.',
    en: 'CRMundi is a proprietary product. MetaMundi has not yet authorized publishing screenshots, so this page uses only original conceptual diagrams and technical descriptions. More detail can be shared in an interview.',
  } satisfies Localized,

  attribution: {
    pt: [
      'Trabalhei em um time. Não criei a arquitetura multi-tenant original, o pipeline base de CI/CD, a camada de provedores de LLM, o agente de IA do ChatMundi, a integração com o WhatsApp oficial nem o motor de conciliação financeira.',
      'O Disparador de Mensagens (campanhas WhatsApp com agendamento e cota diária) e as migrations independentes do banco global foram implementados por mim, mas estavam integrados apenas no ambiente de desenvolvimento ao fim do meu período.',
      'O cancelamento centralizado de ordens de serviço foi implementado em branch e ainda não estava integrado.',
      'Não apresento métricas de uso, clientes, desempenho ou receita, porque não tenho dados verificáveis para isso.',
    ],
    en: [
      'I worked as part of a team. I did not create the original multi-tenant architecture, the base CI/CD pipeline, the LLM provider layer, the ChatMundi AI agent, the official WhatsApp integration or the financial reconciliation engine.',
      'The Message Broadcaster (scheduled WhatsApp campaigns with a daily quota) and the independent migrations for the global database were implemented by me, but at the end of my tenure they were integrated only into the development environment.',
      'Centralized service-order cancellation was implemented in a branch and had not yet been merged.',
      'I do not present usage, customer, performance or revenue metrics, since I have no verifiable data for them.',
    ],
  } satisfies Localized<string[]>,
};
