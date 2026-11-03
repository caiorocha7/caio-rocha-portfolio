import type { Localized } from '@/lib/i18n';

export interface Experience {
  company: Localized;
  role: Localized;
  period: Localized;
  context: Localized;
  highlights: Localized<string[]>;
  tech: string[];
}

export const experience: Experience[] = [
  {
    company: { pt: 'MetaMundi', en: 'MetaMundi' },
    role: { pt: 'Desenvolvedor de Software (Full Stack)', en: 'Software Developer (Full Stack)' },
    period: { pt: 'jul/2025 a nov/2026', en: 'Jul 2025 to Nov 2026' },
    context: {
      pt: 'Remoto · PJ até mar/2026, CLT de abr/2026 a nov/2026',
      en: 'Remote · contractor until Mar 2026, full-time employee from Apr to Nov 2026',
    },
    highlights: {
      pt: [
        'APIs REST, microsserviços e funcionalidades em uma plataforma SaaS multi-tenant de CRM, vendas e financeiro.',
        'Integração do atendimento via WhatsApp ao CRM com Chatwoot e Evolution API: webhooks, WebSocket, provisionamento idempotente por tenant e SSO/JWT.',
        'Distribuição transacional de atendimentos (round robin), RBAC e regras de ownership com locks, controle de concorrência e isolamento de dados.',
        'Assistente gerencial com LLMs que interpreta perguntas e consulta dados por rotinas determinísticas, com validações e proteção contra prompt injection.',
        'Correção de problemas de atomicidade e concorrência no MySQL com transações, FOR UPDATE e savepoints; faturamento e geração de PDFs com AWS Lambda.',
        'Contribuições em testes com Pytest, migrations Alembic, documentação, hardening de JWT, CI/CD e resiliência durante indisponibilidades de APIs externas.',
      ],
      en: [
        'Built REST APIs, microservices and features for a multi-tenant SaaS platform covering CRM, sales and finance.',
        'Integrated WhatsApp customer service into the CRM through Chatwoot and Evolution API: webhooks, WebSocket, idempotent per-tenant provisioning and SSO/JWT.',
        'Implemented transactional round-robin assignment, RBAC and ownership rules with locks, concurrency control and data isolation.',
        'Developed an LLM-based management assistant that interprets questions and queries data through deterministic routines, with validation and prompt-injection safeguards.',
        'Fixed atomicity and concurrency issues in MySQL using transactions, FOR UPDATE and savepoints; built billing and PDF generation on AWS Lambda.',
        'Contributed Pytest suites, Alembic migrations, documentation, JWT hardening, CI/CD and resilience improvements for third-party API outages.',
      ],
    },
    tech: [
      'Python',
      'FastAPI',
      'SQLAlchemy',
      'MySQL',
      'Angular',
      'TypeScript',
      'AWS',
      'JWT/JWKS',
      'LLMs',
    ],
  },
  {
    company: {
      pt: 'Secretaria Municipal de Educação',
      en: 'Municipal Department of Education',
    },
    role: { pt: 'Estagiário de Tecnologia da Informação', en: 'IT Intern' },
    period: { pt: 'abr/2024 a set/2025', en: 'Apr 2024 to Sep 2025' },
    context: { pt: 'Teresina, PI · presencial', en: 'Teresina, Brazil · on-site' },
    highlights: {
      pt: [
        'Suporte a sistemas internos e participação na modernização de aplicações em PHP/Laravel.',
        'Suporte técnico e capacitação de mais de 30 colaboradores no uso dos sistemas.',
      ],
      en: [
        'Supported internal systems and took part in modernizing PHP/Laravel applications.',
        'Provided technical support and trained more than 30 staff members on the systems.',
      ],
    },
    tech: ['PHP', 'Laravel'],
  },
];
