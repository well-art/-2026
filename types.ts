export interface DocItem {
  id: string;
  title: string;
  date: string;
  url: string;
  description: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
}

export type DocType = 'regulation' | 'other';

export interface CurrentDoc {
  title: string;
  url: string;
  type: DocType;
}
