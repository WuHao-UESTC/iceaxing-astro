export type FeaturedKind = 'article' | 'category' | 'project' | 'collection';
export interface FeaturedItem {
  key: string;
  id: string;
  kind: FeaturedKind;
  title: string;
  locale: 'zh' | 'en' | 'de' | 'all';
  collection: string;
  slug: string;
  featured: boolean;
  featuredOrder: number;
  status: string;
  isPublic: boolean;
  warning: string;
  preview: string | null;
}
export interface FeaturedPayload {
  items: FeaturedItem[];
  revision: string;
  branch: string | null;
  storageKind: 'local' | 'github';
}
export interface FeaturedEdit {
  key: string;
  featured: boolean;
  featuredOrder: number;
}
