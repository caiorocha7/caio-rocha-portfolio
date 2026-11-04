import type { Localized } from '@/lib/i18n';

export const profile = {
  name: 'Caio Rocha',
  fullName: 'Caio Vinicius Carvalho da Rocha',
  role: { pt: 'Engenheiro de Software', en: 'Software Engineer' } satisfies Localized,
  focus: {
    pt: 'Backend Python · Full Stack · Integrações e IA aplicada',
    en: 'Python Backend · Full Stack · Integrations and Applied AI',
  } satisfies Localized,
  location: { pt: 'Teresina, Piauí, Brasil', en: 'Teresina, Piauí, Brazil' } satisfies Localized,
  email: 'caiovinicios82@gmail.com',
  github: 'https://github.com/caiorocha7',
  linkedin: 'https://linkedin.com/in/caioroch',
  // Sem currículo no site: o autor envia uma versão específica para cada vaga.
  resume: null as string | null,
  intro: {
    pt: 'Engenheiro de Software com 16 meses de experiência em um SaaS multi-tenant em produção. Resolvo problemas de concorrência, consistência de dados, segurança e integração entre sistemas com Python/FastAPI, Angular e MySQL, e aplico IA com respostas verificáveis.',
    en: 'Software Engineer with 16 months of experience on a multi-tenant SaaS in production. I solve concurrency, data-consistency, security and system-integration problems with Python/FastAPI, Angular and MySQL, and apply AI with verifiable answers.',
  } satisfies Localized,
  about: {
    pt: [
      'Tenho formação em Engenharia de Software e pós-graduação em Inteligência Artificial pelo iCEV. Na MetaMundi, atuei em uma plataforma SaaS multi-tenant, desenvolvendo APIs REST, microsserviços e integrações de atendimento com WhatsApp, além de regras de acesso, controle de concorrência e um assistente com LLMs.',
      'Gosto de problemas em que a confiabilidade importa: transações e locks, idempotência, filas e retentativas, autorização no backend e respostas de IA que podem ser verificadas. Meus projetos públicos seguem essa linha: todos têm testes automatizados, CI e limitações documentadas com honestidade.',
    ],
    en: [
      'I studied Software Engineering and Artificial Intelligence (postgraduate program) at iCEV. At MetaMundi I worked on a multi-tenant SaaS platform, building REST APIs, microservices and WhatsApp customer-service integrations, along with access rules, concurrency control and an LLM-based assistant.',
      'I enjoy problems where reliability matters: transactions and locks, idempotency, queues and retries, server-side authorization and AI answers that can be verified. My public projects follow the same approach: each one ships with automated tests, CI and honestly documented limitations.',
    ],
  } satisfies Localized<string[]>,
  strengths: {
    pt: [
      'Sistemas SaaS multi-tenant',
      'Backend e APIs REST',
      'Desenvolvimento full stack',
      'Integrações e automações',
      'Engenharia de IA aplicada',
      'Qualidade, testes e segurança',
    ],
    en: [
      'Multi-tenant SaaS systems',
      'Backend and REST APIs',
      'Full stack development',
      'Integrations and automation',
      'Applied AI engineering',
      'Quality, testing and security',
    ],
  } satisfies Localized<string[]>,
  education: [
    {
      degree: { pt: 'Bacharelado em Engenharia de Software', en: 'B.Sc. in Software Engineering' },
      school: 'iCEV',
      period: '2022 a 2026',
    },
    {
      degree: {
        pt: 'Pós-graduação em Inteligência Artificial',
        en: 'Postgraduate Program in Artificial Intelligence',
      },
      school: 'iCEV',
      period: '2025 a 2026',
    },
  ] satisfies { degree: Localized; school: string; period: string }[],
};
