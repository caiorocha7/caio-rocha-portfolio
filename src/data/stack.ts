import type { Localized } from '@/lib/i18n';

export const stack: { category: Localized; items: string[] }[] = [
  {
    category: { pt: 'Backend', en: 'Backend' },
    items: [
      'Python',
      'FastAPI',
      'SQLAlchemy',
      'Pydantic',
      'Alembic',
      'Node.js',
      'NestJS',
      'Prisma',
      'Celery',
      'REST APIs',
      'WebSocket',
    ],
  },
  {
    category: { pt: 'Frontend', en: 'Frontend' },
    items: ['TypeScript', 'Angular', 'React', 'Next.js', 'Tailwind CSS', 'TanStack Query'],
  },
  {
    category: { pt: 'Bancos de dados', en: 'Databases' },
    items: ['PostgreSQL', 'MySQL', 'Redis', 'pgvector'],
  },
  {
    category: { pt: 'IA', en: 'AI' },
    items: [
      'LLMs',
      'RAG',
      'Embeddings',
      'Ollama',
      'Structured extraction',
      'AI evals',
      'Prompt-injection defenses',
    ],
  },
  {
    category: { pt: 'Cloud e DevOps', en: 'Cloud & DevOps' },
    items: [
      'Docker',
      'Docker Compose',
      'GitHub Actions',
      'GitLab CI',
      'AWS Lambda',
      'AWS S3',
      'AWS ECS',
      'Nginx',
      'n8n',
    ],
  },
  {
    category: { pt: 'Qualidade e segurança', en: 'Quality & Security' },
    items: ['Pytest', 'Jest', 'Vitest', 'Playwright', 'JWT/JWKS', 'RBAC', 'OWASP', 'CI/CD'],
  },
];
