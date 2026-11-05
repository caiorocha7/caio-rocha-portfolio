import type { Localized } from '@/lib/i18n';

/**
 * Competências técnicas, nos mesmos quatro grupos do currículo.
 * `work`: usadas profissionalmente (MetaMundi). `personal`: usadas nos projetos próprios publicados.
 * `tools`: ferramentas de trabalho (ex.: desenvolvimento assistido por IA), não tecnologias de produto.
 */
/** Nome de tecnologia (igual nos dois idiomas) ou termo traduzido. */
export type Skill = string | Localized;

export interface SkillGroup {
  category: Localized;
  work: Skill[];
  personal: Skill[];
  tools?: Localized<string[]>;
}

export const skillLabel = (s: Skill, locale: keyof Localized): string =>
  typeof s === 'string' ? s : s[locale];

export const stack: SkillGroup[] = [
  {
    category: { pt: 'Backend e dados', en: 'Backend and data' },
    work: [
      'Python',
      'FastAPI',
      'SQLAlchemy',
      'Alembic',
      'MySQL',
      { pt: 'APIs REST', en: 'REST APIs' },
    ],
    personal: ['Node.js', 'NestJS', 'Prisma', 'PostgreSQL', 'Redis', 'Celery'],
  },
  {
    category: { pt: 'Frontend e integrações', en: 'Frontend and integrations' },
    work: ['Angular', 'TypeScript', 'PrimeNG', 'WebSocket', 'Webhooks', 'n8n'],
    personal: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    category: { pt: 'IA aplicada e ferramentas', en: 'Applied AI and tools' },
    work: [
      'LLMs',
      { pt: 'Engenharia de prompts', en: 'Prompt engineering' },
      { pt: 'Validação de respostas', en: 'Response validation' },
    ],
    personal: [
      'RAG',
      'Embeddings',
      'pgvector',
      'Ollama',
      { pt: 'Avaliação de respostas (evals)', en: 'Answer evaluation (evals)' },
    ],
    tools: {
      pt: ['Claude Code (desenvolvimento assistido por IA)'],
      en: ['Claude Code (AI-assisted development)'],
    },
  },
  {
    category: { pt: 'Cloud, qualidade e segurança', en: 'Cloud, quality and security' },
    work: [
      'AWS Lambda',
      'AWS S3',
      'AWS ECS',
      'AWS EventBridge',
      'Docker',
      'GitLab CI/CD',
      'Pytest',
      'Git',
      'JWT/JWKS',
      'RBAC',
    ],
    personal: ['GitHub Actions', 'Playwright', 'Vitest'],
  },
];
