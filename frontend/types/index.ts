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

export interface CreateBlogRequest {
  learningContent: string;
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