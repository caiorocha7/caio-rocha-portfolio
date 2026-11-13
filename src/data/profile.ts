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
    pt: 'Desenvolvo e evoluo sistemas SaaS em produção, de ponta a ponta: interfaces, APIs REST, microsserviços e integrações. Trabalho com Python, FastAPI, Angular, TypeScript, MySQL e AWS em áreas como financeiro, atendimento WhatsApp, automações e IA aplicada.',
    en: 'I build and evolve SaaS systems in production, end to end: interfaces, REST APIs, microservices and integrations. I work with Python, FastAPI, Angular, TypeScript, MySQL and AWS in areas such as finance, WhatsApp customer service, automation and applied AI.',
  } satisfies Localized,
  about: {
    pt: [
      'Tenho formação em Engenharia de Software e pós-graduação em Inteligência Artificial pelo iCEV. Na MetaMundi, participei da construção e da evolução do CRMundi, um SaaS multi-tenant para agências de viagem, em vendas, ordens de serviço, financeiro, faturamento, pós-venda e relatórios. Também participei desde o início da implementação do ChatMundi, a solução que levou o atendimento WhatsApp para dentro do produto.',
      'Gosto de problemas que atravessam o sistema: regras de negócio que precisam continuar corretas sob concorrência, integrações entre serviços, permissões e visibilidade de dados, e IA aplicada com respostas fundamentadas em dados reais. Nos projetos próprios, aprofundo Java com Spring Boot e Kafka, Node.js, NestJS, React e PostgreSQL, além de RAG, embeddings e avaliação de respostas de LLMs.',
      'No dia a dia, uso ferramentas de desenvolvimento assistido por IA, como ChatGPT/Codex e Gemini, para acelerar implementação, investigação e revisão, sempre validando o resultado com testes automatizados e CI.',
    ],
    en: [
      'I studied Software Engineering and Artificial Intelligence (postgraduate program) at iCEV. At MetaMundi I helped build and evolve CRMundi, a multi-tenant SaaS for travel agencies, across sales, service orders, finance, billing, post-sale and reporting. I was also involved from the start in building ChatMundi, the solution that brought WhatsApp customer service into the product.',
      'I enjoy problems that cut across the whole system: business rules that must stay correct under concurrency, integrations between services, permissions and data visibility, and applied AI with answers grounded in real data. In my own projects I go deeper into Java with Spring Boot and Kafka, Node.js, NestJS, React and PostgreSQL, as well as RAG, embeddings and LLM answer evaluation.',
      'In my daily work I use AI-assisted development tools such as ChatGPT/Codex and Gemini to speed up implementation, investigation and review, always validating the result with automated tests and CI.',
    ],
  } satisfies Localized<string[]>,
  strengths: {
    pt: [
      'Desenvolvimento full stack',
      'Sistemas SaaS em produção',
      'APIs REST, microsserviços e integrações',
      'Permissões, segurança e consistência de dados',
      'Automações e AWS',
      'IA aplicada: LLMs, RAG e avaliação',
      'Testes e qualidade',
    ],
    en: [
      'Full stack development',
      'SaaS systems in production',
      'REST APIs, microservices and integrations',
      'Permissions, security and data consistency',
      'Automation and AWS',
      'Applied AI: LLMs, RAG and evaluation',
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
        pt: 'Pós-graduação em Inteligência Artificial (em fase de conclusão)',
        en: 'Postgraduate Program in Artificial Intelligence (completing)',
      },
      school: 'iCEV',
      period: '2025 a 2026',
    },
  ] satisfies { degree: Localized; school: string; period: string }[],
};
