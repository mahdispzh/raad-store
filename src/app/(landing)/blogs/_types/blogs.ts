export interface Blogs {
  id: number;
  title: string;
  slug: string;
  summary: string;
  description: string;
  image: string;
  author: string;
  readTime: string;
  saved: boolean;
  recent: boolean;
  // برای صفحه جزئیات
  content?: string;
  views?: number;
  createdAt?: string;
}
