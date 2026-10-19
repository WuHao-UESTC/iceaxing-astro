export interface HomeCard {
  id: string;
  href: string;
  title: string;
  description: string;
  meta?: string;
  tags?: string[];
  progress?: number;
}

export interface HomeLabels {
  heroTitle: string;
  intro: string;
  read: string;
  meet: string;
  featured: string;
  chapters: [string, string, string, string];
  chapterIntros: [string, string, string];
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
