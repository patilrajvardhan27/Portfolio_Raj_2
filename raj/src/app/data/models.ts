export type Kind =
  'about' | 'experience' | 'project' | 'research' | 'education' | 'skills' | 'contact';

export type TabId = 'all' | Exclude<Kind, 'about'>;

export interface Link {
  label: string;
  url: string;
}

export interface Role {
  title: string;
  period: string;
}

export interface Entry {
  id: string;
  kind: Kind;
  /** Name shown next to the round badge, like a site name in a result. */
  source: string;
  /** Breadcrumb trail shown under the source. */
  trail: string[];
  title: string;
  url?: string;
  period?: string;
  location?: string;
  summary: string;
  roles?: Role[];
  points?: string[];
  tags?: string[];
  links?: Link[];
  /** Extra words that should match this entry but are never displayed. */
  keywords?: string[];
}

export interface Tab {
  id: TabId;
  label: string;
  icon: string;
}

export interface Fact {
  label: string;
  value: string;
  url?: string;
}

export interface Question {
  question: string;
  answer: string;
  query: string;
}
