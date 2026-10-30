import { describe, expect, it } from 'vitest';
import {
  completedProjectSchema,
  profileSchema,
  type CompletedProject,
} from '../content/profile-schema';
import { resolveProfileProjects } from './profile';

const internal = (project: string): CompletedProject => ({
  discriminant: 'internal',
  value: { project },
});
const external: CompletedProject = {
  discriminant: 'external',
  value: { title: 'External work', description: 'Project notes', url: 'https://example.org/work' },
};
const project = (id: string, status = 'completed', publicationStatus = 'published') => ({
  data: {
    projectId: id,
    status,
    publicationStatus,
    labels: {
      zh: { title: '中文项目', description: '中文简介' },
      en: { title: 'English project', description: 'English description' },
      de: { title: 'Deutsches Projekt', description: 'Deutsche Beschreibung' },
    },
  },
});

describe('profile project links', () => {
  it('mixes internal and self-entered projects in editorial order and uses localized routes', () => {
    expect(
      resolveProfileProjects(
        [external, internal('ota')],
        [project('ota')],
        'de',
        (id, locale) => `/${locale}/analog/${id}`,
      ),
    ).toEqual([
      {
        title: 'External work',
        description: 'Project notes',
        href: external.value.url,
        external: true,
      },
      {
        title: 'Deutsches Projekt',
        description: 'Deutsche Beschreibung',
        href: '/de/analog/ota',
        external: false,
      },
    ]);
  });

  it('hides missing, unpublished, unfinished, and unroutable internal projects', () => {
    const projects = [
      project('draft', 'completed', 'draft'),
      project('active', 'active'),
      project('archived', 'completed', 'archived'),
      project('no-route'),
    ];
    expect(
      resolveProfileProjects(
        ['missing', 'draft', 'active', 'archived', 'no-route'].map(internal),
        projects,
        'zh',
        (id) => (id === 'no-route' ? undefined : `/${id}`),
      ),
    ).toEqual([]);
  });

  it('does not show projects omitted by the public parent-category index', () => {
    expect(resolveProfileProjects([internal('hidden-parent')], [], 'zh', () => '/hidden')).toEqual(
      [],
    );
  });
});

describe('profile content and CMS values', () => {
  it('accepts omitted optional sections and blank optional certificate links', () => {
    const value = profileSchema.parse({ honors: [{ title: 'Award', url: '' }] });
    expect(value.honors[0]?.level).toBe('');
    expect(value.work).toEqual([]);
    expect(value.education).toEqual([]);
    expect(value.completedProjects).toEqual([]);
  });

  it.each(['javascript:alert(1)', 'data:text/html,hi', '/relative', 'https://'])(
    'rejects invalid external URL %s',
    (url) => {
      expect(
        completedProjectSchema.safeParse({ ...external, value: { ...external.value, url } })
          .success,
      ).toBe(false);
    },
  );

  it('requires name, description, and URL only for self-entered projects', () => {
    expect(completedProjectSchema.safeParse(internal('ota')).success).toBe(true);
    expect(
      completedProjectSchema.safeParse({
        ...external,
        value: { ...external.value, description: '' },
      }).success,
    ).toBe(false);
    expect(
      completedProjectSchema.safeParse({ discriminant: 'internal', value: { project: null } })
        .success,
    ).toBe(false);
  });
});
