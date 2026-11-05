import { crmundi } from '@/data/crmundi';
import type { Localized } from '@/lib/i18n';

export interface Experience {
  id: string;
  company: Localized;
  role: Localized;
  period: Localized;
  context: Localized;
  /** Produto em que atuou (quando houver), exibido como destaque do cartão. */
  product?: { name: string; tagline: Localized };
  /** Resumo de 3 a 5 linhas: home e página de experiência. */
  summary: Localized;
  /** Detalhes curtos, exibidos somente na página de experiência. */
  highlights?: Localized<string[]>;
  tech: string[];
  /** Caminho do estudo de caso (sem idioma), quando existir. */
  caseStudy?: string;
  /** Experiência principal recebe mais espaço visual. */
  primary?: boolean;
}

export const experience: Experience[] = [
  {
    id: 'metamundi',
    primary: true,
    company: { pt: 'MetaMundi', en: 'MetaMundi' },
    role: { pt: 'Desenvolvedor de Software (Full Stack)', en: 'Software Developer (Full Stack)' },
    period: { pt: 'jul/2025 a nov/2026', en: 'Jul 2025 to Nov 2026' },
    context: {
      pt: 'Fortaleza, CE · remoto',
      en: 'Fortaleza, Brazil · remote',
    },
    product: { name: crmundi.title, tagline: crmundi.subtitle },
    summary: crmundi.summary,
    tech: crmundi.tech,
    caseStudy: 'experience/crmundi',
  },
  {
    id: 'semec',
    company: {
      pt: 'Secretaria Municipal de Educação de Teresina',
      en: 'Teresina Municipal Department of Education',
    },
    role: { pt: 'Estagiário de Tecnologia da Informação', en: 'IT Intern' },
    period: { pt: 'abr/2024 a set/2025', en: 'Apr 2024 to Sep 2025' },
    context: { pt: 'Teresina, PI · presencial', en: 'Teresina, Brazil · on-site' },
    summary: {
      pt: 'Suporte a sistemas internos, participação na modernização de aplicações em PHP/Laravel e capacitação de usuários.',
      en: 'Supported internal systems, took part in modernizing PHP/Laravel applications and trained users.',
    },
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
