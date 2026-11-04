import type { Localized } from '@/lib/i18n';

export const profile = {
  name: 'Caio Rocha',
  fullName: 'Caio Vinicius Carvalho da Rocha',
  role: { pt: 'Engenheiro de Software', en: 'Software Engineer' } satisfies Localized,
  focus: 'Backend · Full Stack · Applied AI',
  location: { pt: 'Teresina, Piauí, Brasil', en: 'Teresina, Piauí, Brazil' } satisfies Localized,
  email: 'caiovinicios82@gmail.com',
  github: 'https://github.com/caiorocha7',
  linkedin: 'https://linkedin.com/in/caioroch',
  // Currículo atual (PDF gerado a partir do .docx editável do autor). Use null para ocultar o botão.
  resume: '/resume/Caio_Rocha_CV.pdf' as string | null,
  intro: {
    pt: 'Desenvolvo sistemas backend e full stack para produtos SaaS: APIs, integrações, processamento assíncrono e aplicações com IA. Trabalho com Python/FastAPI, TypeScript, Angular, React e NestJS, com atenção a concorrência, segurança e testes automatizados.',
    en: 'I build backend and full stack systems for SaaS products: APIs, integrations, asynchronous processing and AI-powered applications. I work with Python/FastAPI, TypeScript, Angular, React and NestJS, with a focus on concurrency, security and automated testing.',
  } satisfies Localized,
  about: {
    pt: [
      'Sou bacharel em Engenharia de Software e pós-graduando em Inteligência Artificial pelo iCEV. Na MetaMundi, atuei em uma plataforma SaaS multi-tenant, desenvolvendo APIs REST, microsserviços e integrações de atendimento com WhatsApp, além de regras de acesso, controle de concorrência e um assistente com LLMs.',
      'Gosto de problemas em que a confiabilidade importa: transações e locks, idempotência, filas e retentativas, autorização no backend e respostas de IA que podem ser verificadas. Meus projetos públicos seguem essa linha: todos têm testes automatizados, CI e limitações documentadas com honestidade.',
    ],
    en: [
      'I hold a bachelor’s degree in Software Engineering and I’m completing a postgraduate program in Artificial Intelligence at iCEV. At MetaMundi I worked on a multi-tenant SaaS platform, building REST APIs, microservices and WhatsApp customer-service integrations, along with access rules, concurrency control and an LLM-based assistant.',
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
