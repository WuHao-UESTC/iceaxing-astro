export type PublicationStatus = 'draft' | 'published' | 'scheduled' | 'archived';
export function publicationIsPublic(
  status: string = 'published',
  publishedAt?: string | Date | null,
  now = Date.now(),
) {
  if (status === 'published') return true;
  const date = publishedAt instanceof Date ? publishedAt.getTime() : Date.parse(publishedAt ?? '');
  return status === 'scheduled' && Number.isFinite(date) && date <= now;
}
export function folderIsPublic(
  data: { publicationStatus?: string; publishedAt?: string | Date | null },
  now = Date.now(),
) {
  return publicationIsPublic(data.publicationStatus ?? 'published', data.publishedAt, now);
}
