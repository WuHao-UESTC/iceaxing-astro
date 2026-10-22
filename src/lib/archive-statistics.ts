export type ArchiveKind = 'category' | 'project' | 'collection' | 'index';
export type ArchiveStatisticKind = 'project' | 'collection' | 'article' | 'entry';

interface ArchiveCard {
  kind?: 'project' | 'collection' | 'article';
  standalone?: boolean;
}

export function archiveStatistics(kind: ArchiveKind, cards: ArchiveCard[]) {
  const standaloneOnly = kind === 'category' || kind === 'project';
  const count = (type: ArchiveStatisticKind) =>
    cards.filter((card) => {
      const cardKind = card.kind ?? (kind === 'collection' ? 'article' : 'entry');
      return (
        cardKind === type && (type !== 'article' || !standaloneOnly || card.standalone !== false)
      );
    }).length;
  const types: ArchiveStatisticKind[] =
    kind === 'category'
      ? ['project', 'article']
      : kind === 'project'
        ? ['collection', 'article']
        : kind === 'collection'
          ? ['article']
          : (['project', 'collection', 'article', 'entry'] as const).filter(
              (type) => count(type) > 0,
            );
  if (!types.length) types.push('entry');
  return types.map((type) => ({ type, count: count(type) }));
}
