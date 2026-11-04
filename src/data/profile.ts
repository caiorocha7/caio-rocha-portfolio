import type { Localized } from '@/lib/i18n';

export const profile = {
  name: 'Caio Rocha',
  fullName: 'Caio Vinicius Carvalho da Rocha',
  role: { pt: 'Engenheiro de Software', en: 'Software Engineer' } satisfies Localized,
  focus: {
    pt: 'Full Stack | Backend | Integrações | IA Aplicada',
    en: 'Full Stack | Backend | Integrations | Applied AI',
  } satisfies Localized,
  location: { pt: 'Teresina, Piauí, Brasil', en: 'Teresina, Piauí, Brazil' } satisfies Localized,
  email: 'caiovinicios82@gmail.com',
  github: 'https://github.com/caiorocha7',
  linkedin: 'https://linkedin.com/in/caioroch',
  intro: {
    pt: 'Desenvolvo soluções de software de ponta a ponta, das interfaces e APIs a microsserviços, integrações e automações. Tenho experiência na evolução de sistemas SaaS em produção, com Python, TypeScript, Angular, AWS e inteligência artificial.',
    en: 'I build software end to end, from interfaces and APIs to microservices, integrations and automation. I have experience evolving SaaS systems in production, working with Python, TypeScript, Angular, AWS and artificial intelligence.',
  } satisfies Localized,
  about: {
    pt: [
      'Tenho formação em Engenharia de Software e pós-graduação em Inteligência Artificial pelo iCEV. Na MetaMundi, trabalhei no desenvolvimento e na evolução de uma plataforma SaaS para agências de viagem, em áreas como vendas, financeiro, faturamento, atendimento via WhatsApp, segurança e IA aplicada.',
      'Atuo no backend e no frontend: APIs e microsserviços em Python, interfaces em Angular, integrações com serviços externos, automações e recursos na AWS, com testes automatizados e atenção à manutenção de sistemas em produção. Nos projetos pessoais, também trabalho com React, Next.js e Node.js.',
    ],
    en: [
      'I studied Software Engineering and Artificial Intelligence (postgraduate program) at iCEV. At MetaMundi I worked on building and evolving a SaaS platform for travel agencies, in areas such as sales, finance, billing, WhatsApp customer service, security and applied AI.',
      'I work across backend and frontend: Python APIs and microservices, Angular interfaces, integrations with external services, automation and AWS resources, with automated tests and care for maintaining systems in production. In personal projects I also work with React, Next.js and Node.js.',
    ],
  } satisfies Localized<string[]>,
  strengths: {
    pt: [
      'Desenvolvimento full stack',
      'Sistemas SaaS em produção',
      'APIs, microsserviços e integrações',
      'Automações e AWS',
      'Segurança e autenticação',
      'IA aplicada',
      'Testes e qualidade',
    ],
    en: [
      'Full stack development',
      'SaaS systems in production',
      'APIs, microservices and integrations',
      'Automation and AWS',
      'Security and authentication',
      'Applied AI',
      'Testing and quality',
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
