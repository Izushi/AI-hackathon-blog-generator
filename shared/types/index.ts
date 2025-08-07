export interface BlogInput {
  title: string;
  content: string;
  tags?: string[];
}

export interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GeminiResponse {
  title: string;
  summary: string;
  htmlContent: string;
  tags: string[];
  metadata: {
    readingTime: number;
    wordCount: number;
  };
}

export interface CreateBlogRequest {
  learningContent: string;
  title?: string;
}

export interface CreateBlogResponse {
  success: boolean;
  blog?: Blog;
  error?: string;
}

export interface GetBlogsResponse {
  blogs: Blog[];
  total: number;
  page: number;
  pageSize: number;
}