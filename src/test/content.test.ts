import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { dictionaries } from '@/data/dictionary';
import { experience } from '@/data/experience';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { stack } from '@/data/stack';
import { locales, localePath, switchLocalePath } from '@/lib/i18n';

const PUBLIC = resolve(__dirname, '../../public');

/** Percorre objetos procurando campos traduzidos ({ pt, en }) e valida ambos os idiomas. */
function collectLocalized(value: unknown, path: string, out: [string, unknown][] = []) {
  if (value && typeof value === 'object') {
    const keys = Object.keys(value);
    if (keys.length === 2 && keys.includes('pt') && keys.includes('en')) out.push([path, value]);
    else for (const [k, v] of Object.entries(value)) collectLocalized(v, `${path}.${k}`, out);
  }
  return out;
}

describe('i18n', () => {
  it('gera caminhos por idioma com barra final', () => {
    expect(localePath('pt')).toBe('/pt/');
    expect(localePath('en', '/projects/routeops/')).toBe('/en/projects/routeops/');
  });

  it('troca o idioma mantendo a página atual', () => {
    expect(switchLocalePath('/pt/projects/docpilot-ai/', 'en')).toBe('/en/projects/docpilot-ai/');
    expect(switchLocalePath('/en/', 'pt')).toBe('/pt/');
    expect(switchLocalePath('/', 'en')).toBe('/en/');
  });

  it('os dicionários têm as mesmas chaves nos dois idiomas', () => {
    const keys = (o: object, prefix = ''): string[] =>
      Object.entries(o).flatMap(([k, v]) =>
        v && typeof v === 'object' ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`],
      );
    expect(keys(dictionaries.en).sort()).toEqual(keys(dictionaries.pt).sort());
  });

  it('todo conteúdo traduzido existe e não está vazio em pt e en', () => {
    const fields = collectLocalized({ profile, experience, projects, stack }, 'content');
    expect(fields.length).toBeGreaterThan(100);
    for (const [path, field] of fields) {
      for (const locale of locales) {
        const v = (field as Record<string, unknown>)[locale];
        const empty = Array.isArray(v)
          ? v.length === 0 || v.some((s) => !String(s).trim())
          : !String(v).trim();
        expect(empty, `${path}.${locale}`).toBe(false);
      }
    }
  });
});

describe('projetos', () => {
  it('destaca exatamente os três projetos, com repositórios do autor', () => {
    expect(projects.map((p) => p.slug)).toEqual(['routeops', 'docpilot-ai', 'connecthub']);
    for (const p of projects)
      expect(p.repo).toMatch(/^https:\/\/github\.com\/caiorocha7\/[a-z-]+$/);
  });

  it('o total de testes exibido bate com a soma das suítes numéricas', () => {
    for (const p of projects) {
      const badge = Number(p.testsBadge.en.match(/\d+/)?.[0]);
      const sum = p.tests
        .map((t) => t.result.en.match(/^(\d+)/)?.[1])
        .filter(Boolean)
        .reduce((acc, n) => acc + Number(n), 0);
      expect(sum, p.name).toBe(badge);
    }
  });

  it('toda captura referenciada existe em public/ e tem texto alternativo', () => {
    for (const p of projects) {
      expect(p.screenshots.length).toBeGreaterThanOrEqual(4);
      for (const s of p.screenshots) {
        expect(existsSync(resolve(PUBLIC, `.${s.src}`)), s.src).toBe(true);
        expect(s.alt.pt.length).toBeGreaterThan(15);
        expect(s.alt.en.length).toBeGreaterThan(15);
      }
    }
  });

  it('o currículo só é exibido se o PDF existir', () => {
    if (profile.resume) expect(existsSync(resolve(PUBLIC, `.${profile.resume}`))).toBe(true);
  });
});
