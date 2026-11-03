import type { Locale } from '@/lib/i18n';

const pt = {
  meta: {
    title: 'Caio Rocha | Engenheiro de Software',
    description:
      'Portfólio de Caio Rocha, Engenheiro de Software com foco em backend, full stack, integrações e IA aplicada. Projetos com NestJS, React, FastAPI, Angular, Next.js, RAG e sistemas distribuídos.',
  },
  nav: {
    skip: 'Pular para o conteúdo',
    about: 'Sobre',
    experience: 'Experiência',
    projects: 'Projetos',
    stack: 'Stack',
    contact: 'Contato',
    menu: 'Menu',
    close: 'Fechar menu',
    primary: 'Navegação principal',
  },
  theme: { toLight: 'Ativar tema claro', toDark: 'Ativar tema escuro' },
  language: { label: 'Idioma', switchTo: 'Ver em inglês', short: 'EN' },
  hero: {
    eyebrow: 'Disponível para oportunidades remotas',
    projects: 'Ver projetos',
    resume: 'Currículo (PDF)',
    summary: 'Resumo',
    based: 'Base',
    education: 'Formação',
    recent: 'Experiência recente',
    educationValue: 'Eng. de Software · Pós em IA (iCEV)',
    recentValue: 'Full Stack na MetaMundi (SaaS multi-tenant)',
    basedValue: 'Teresina, Brasil · remoto',
  },
  sections: {
    about: 'Sobre',
    experience: 'Experiência',
    projects: 'Projetos em destaque',
    projectsLead:
      'Três sistemas completos, publicados com código aberto, testes automatizados, CI e limitações documentadas.',
    stack: 'Stack',
    stackLead: 'Tecnologias que uso em produção e nos projetos publicados.',
    contact: 'Contato',
    contactLead:
      'Estou aberto a oportunidades remotas em backend, full stack e engenharia de IA. A forma mais rápida de falar comigo é por e-mail ou LinkedIn.',
    education: 'Formação',
    strengths: 'Áreas de atuação',
  },
  project: {
    details: 'Ver estudo de caso',
    code: 'Código no GitHub',
    demo: 'Demonstração',
    back: 'Todos os projetos',
    problem: 'Problema',
    stack: 'Tecnologias',
    architecture: 'Arquitetura',
    features: 'Funcionalidades principais',
    decisions: 'Decisões técnicas',
    tests: 'Testes e qualidade',
    suite: 'Suíte',
    result: 'Resultado',
    screenshots: 'Capturas de tela',
    screenshotsNote:
      'Capturas reais da aplicação em execução, geradas a partir do próprio repositório.',
    limitations: 'Limitações conhecidas',
    next: 'Próximo projeto',
    openImage: 'Abrir imagem em tamanho real',
  },
  contact: {
    email: 'E-mail',
    location: 'Localização',
    availability: 'Disponibilidade',
    remote: 'Remoto',
  },
  footer: { built: 'Construído com Next.js, TypeScript e Tailwind CSS.', source: 'Código-fonte' },
  notFound: { title: 'Página não encontrada', back: 'Voltar ao início' },
  external: '(abre em nova aba)',
};

export type Dictionary = typeof pt;

const en: Dictionary = {
  meta: {
    title: 'Caio Rocha | Software Engineer',
    description:
      'Portfolio of Caio Rocha, a Software Engineer focused on backend, full stack, integrations and applied AI. Projects built with NestJS, React, FastAPI, Angular, Next.js, RAG and distributed systems.',
  },
  nav: {
    skip: 'Skip to content',
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    stack: 'Stack',
    contact: 'Contact',
    menu: 'Menu',
    close: 'Close menu',
    primary: 'Main navigation',
  },
  theme: { toLight: 'Switch to light theme', toDark: 'Switch to dark theme' },
  language: { label: 'Language', switchTo: 'View in Portuguese', short: 'PT' },
  hero: {
    eyebrow: 'Open to remote opportunities',
    projects: 'View projects',
    resume: 'Résumé (PDF, Portuguese)',
    summary: 'At a glance',
    based: 'Based in',
    education: 'Education',
    recent: 'Recent experience',
    educationValue: 'B.Sc. Software Engineering · Postgrad in AI (iCEV)',
    recentValue: 'Full stack at MetaMundi (multi-tenant SaaS)',
    basedValue: 'Teresina, Brazil · remote',
  },
  sections: {
    about: 'About',
    experience: 'Experience',
    projects: 'Featured projects',
    projectsLead:
      'Three complete systems, published as open source with automated tests, CI and documented limitations.',
    stack: 'Stack',
    stackLead: 'Technologies I use professionally and in my published projects.',
    contact: 'Contact',
    contactLead:
      'I’m open to remote roles in backend, full stack and AI engineering. The fastest way to reach me is by email or LinkedIn.',
    education: 'Education',
    strengths: 'Focus areas',
  },
  project: {
    details: 'Read the case study',
    code: 'Code on GitHub',
    demo: 'Live demo',
    back: 'All projects',
    problem: 'Problem',
    stack: 'Technologies',
    architecture: 'Architecture',
    features: 'Key features',
    decisions: 'Technical decisions',
    tests: 'Testing and quality',
    suite: 'Suite',
    result: 'Result',
    screenshots: 'Screenshots',
    screenshotsNote:
      'Real screenshots of the running application, captured from the repository itself.',
    limitations: 'Known limitations',
    next: 'Next project',
    openImage: 'Open full-size image',
  },
  contact: { email: 'Email', location: 'Location', availability: 'Availability', remote: 'Remote' },
  footer: { built: 'Built with Next.js, TypeScript and Tailwind CSS.', source: 'Source code' },
  notFound: { title: 'Page not found', back: 'Back to home' },
  external: '(opens in a new tab)',
};

export const dictionaries: Record<Locale, Dictionary> = { pt, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
