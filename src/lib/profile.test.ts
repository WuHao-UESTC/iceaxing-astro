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
  it('uses a card upload before the internal project cover, and falls back to the placeholder', () => {
    const covered = {
      ...project('ota'),
      data: { ...project('ota').data, coverImage: { src: '/cover.jpg' } },
    };
    const selected: CompletedProject[] = [
      { discriminant: 'internal', value: { project: 'ota', image: '/card.jpg' } },
      { discriminant: 'internal', value: { project: 'ota', image: null } },
      { ...external, value: { ...external.value, image: '/external.jpg' } },
      external,
    ];
    expect(
      resolveProfileProjects(selected, [covered], 'zh', () => '/ota').map((item) => item.image),
    ).toEqual([
      '/card.jpg',
      '/cover.jpg',
      '/external.jpg',
      '/media/profile/project-placeholder.svg',
    ]);
    expect(completedProjectSchema.safeParse(selected[1]).success).toBe(true);
  });
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
        image: '/media/profile/project-placeholder.svg',
      },
      {
        title: 'Deutsches Projekt',
        description: 'Deutsche Beschreibung',
        href: '/de/analog/ota',
        external: false,
        image: '/media/profile/project-placeholder.svg',
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
  it('accepts uploaded images and empty CMS image values without breaking existing profiles', () => {
    const value = profileSchema.parse({
      honors: [
        { title: 'Certificate', certificateImage: '/media/profile/certificate.jpg' },
        { title: 'No upload', certificateImage: null },
        { title: 'Legacy award' },
      ],
      research: [
        { title: 'With photo', type: 'project', image: '/media/profile/project.jpg' },
        { title: 'No upload', type: 'research', image: null },
        { title: 'Legacy experience', type: 'project' },
      ],
    });
    expect(value.honors.map((item) => item.certificateImage)).toEqual([
      '/media/profile/certificate.jpg',
      '',
      '',
    ]);
    expect(value.research.map((item) => item.image)).toEqual([
      '/media/profile/project.jpg',
      '',
      '',
    ]);
  });
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
