import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getDictionary } from '@/data/dictionary';
import { projects } from '@/data/projects';
import { ExternalLink } from './ExternalLink';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ProjectCard } from './ProjectCard';
import { ThemeToggle, THEME_KEY } from './ThemeToggle';

// next/image depende do runtime do Next; nos testes basta um <img> com os mesmos src e alt
vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

const pathname = vi.hoisted(() => ({ current: '/pt/projects/routeops/' }));
vi.mock('next/navigation', () => ({ usePathname: () => pathname.current }));

describe('ExternalLink', () => {
  it('abre em nova aba de forma segura e avisa leitores de tela', () => {
    render(
      <ExternalLink href="https://github.com/caiorocha7" newTabLabel="(abre em nova aba)">
        GitHub
      </ExternalLink>,
    );
    const link = screen.getByRole('link', { name: /GitHub\s*\(abre em nova aba\)/ });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

describe('ProjectCard', () => {
  it('mostra nome, screenshot real com alt, tecnologias e links', () => {
    const project = projects[1];
    const dict = getDictionary('pt');
    render(<ProjectCard project={project} locale="pt" dict={dict} index={1} />);

    expect(screen.getByRole('heading', { name: 'DocPilot AI' })).toBeInTheDocument();
    expect(screen.getByText('182 testes')).toBeInTheDocument();
    const img = screen.getByAltText(project.screenshots[0].alt.pt);
    // o prefixo depende de NEXT_PUBLIC_BASE_PATH (vazio localmente, /caio-rocha-portfolio no CI)
    expect(img).toHaveAttribute(
      'src',
      `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/projects/docpilot-ai/03-chat-citations.webp`,
    );
    expect(screen.getByRole('list', { name: 'Tecnologias' })).toHaveTextContent('pgvector');
    expect(screen.getByRole('link', { name: /Ver estudo de caso: DocPilot AI/ })).toHaveAttribute(
      'href',
      expect.stringMatching(/^\/pt\/projects\/docpilot-ai\/?$/),
    );
    expect(screen.getByRole('link', { name: /Código no GitHub: DocPilot AI/ })).toHaveAttribute(
      'href',
      'https://github.com/caiorocha7/docpilot-ai',
    );
  });

  it('não exibe link de demonstração quando o projeto não tem demo pública', () => {
    render(<ProjectCard project={projects[0]} locale="en" dict={getDictionary('en')} index={0} />);
    expect(screen.queryByRole('link', { name: /Live demo/ })).not.toBeInTheDocument();
  });
});

describe('LanguageSwitcher', () => {
  it('aponta para a mesma página no outro idioma', () => {
    pathname.current = '/pt/projects/routeops/';
    render(<LanguageSwitcher locale="pt" label="Ver em inglês" short="EN" />);
    const link = screen.getByRole('link', { name: 'Ver em inglês' });
    // no jsdom o next/link não recebe trailingSlash; a barra final é validada no E2E
    expect(link).toHaveAttribute('href', expect.stringMatching(/^\/en\/projects\/routeops\/?$/));
    expect(link).toHaveAttribute('hreflang', 'en');
  });
});

describe('ThemeToggle', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
    localStorage.clear();
  });

  it('alterna o tema, persiste a escolha e atualiza o rótulo acessível', async () => {
    render(<ThemeToggle labels={{ toLight: 'Ativar tema claro', toDark: 'Ativar tema escuro' }} />);
    const button = screen.getByRole('button', { name: 'Ativar tema escuro' });

    await userEvent.click(button);
    expect(document.documentElement).toHaveClass('dark');
    expect(localStorage.getItem(THEME_KEY)).toBe('dark');
    expect(screen.getByRole('button', { name: 'Ativar tema claro' })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Ativar tema claro' }));
    expect(document.documentElement).not.toHaveClass('dark');
    expect(localStorage.getItem(THEME_KEY)).toBe('light');
  });
});
