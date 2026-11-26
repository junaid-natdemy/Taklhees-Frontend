export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  categoryIcon: 'shield' | 'file' | 'stethoscope' | 'briefcase' | 'building';
  publishedAt: string;
  formattedDate: string;
  readingTimeMinutes: number;
  image: string;
  imageAlt: string;
  author: {
    name: string;
    role: string;
  };
}

export interface PaginatedBlogResult {
  items: BlogArticle[];
  featured: BlogArticle | null;
  supporting: BlogArticle[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
