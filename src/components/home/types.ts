export interface HomeCard {
  id: string;
  href: string;
  title: string;
  description: string;
  meta?: string;
  publishedAt?: string;
  tags?: string[];
  progress?: number;
  topic?: string;
  categoryId?: string;
  noteCount?: number;
  group?: 'skill' | 'study' | 'life';
}

export interface HomeLabels {
  heroTitle: string;
  intro: string;
  read: string;
  meet: string;
  featured: string;
  chapters: [string, string, string, string, string];
  chapterIntros: [string, string, string, string];
  studyTopics: string;
  studyLatest: string;
  studyCount: string;
  emptyStudy: string;
  projects: string;
  completed: string;
  latest: string;
  fieldNotes: string;
  emptyRamblings: string;
  directory: string;
  next: string;
  back: string;
  route: string;
}
