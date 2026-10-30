import type { CompletedProject } from '../content/profile-schema';
import type { Locale } from '../i18n/config';
import { folderIsPublic } from './publication';

type ProfileProject = {
  data: {
    projectId: string;
    status: string;
    publicationStatus?: string;
    publishedAt?: string | Date | null;
    labels: Record<Locale, { title: string; description?: string }>;
  };
};
export type ProfileProjectLink = {
  title: string;
  description: string;
  href: string;
  external: boolean;
};

/** The caller passes projects whose parent category is public as well. */
export function resolveProfileProjects(
  selected: CompletedProject[],
  projects: ProfileProject[],
  locale: Locale,
  projectRoute: (projectId: string, locale: Locale) => string | undefined,
): ProfileProjectLink[] {
  return selected.flatMap((selection): ProfileProjectLink[] => {
    if (selection.discriminant === 'external') {
      return [
        {
          title: selection.value.title,
          description: selection.value.description,
          href: selection.value.url,
          external: true,
        },
      ];
    }
    const project = projects.find((entry) => entry.data.projectId === selection.value.project);
    if (!project || project.data.status !== 'completed' || !folderIsPublic(project.data)) return [];
    const href = projectRoute(project.data.projectId, locale);
    if (!href) return [];
    const label = project.data.labels[locale];
    return [{ title: label.title, description: label.description ?? '', href, external: false }];
  });
}
