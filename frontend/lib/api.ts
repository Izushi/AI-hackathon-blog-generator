import axios from 'axios';
import { CreateBlogRequest, CreateBlogResponse, GetBlogsResponse, Blog } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const blogApi = {
  async createBlog(data: CreateBlogRequest): Promise<CreateBlogResponse> {
    const response = await apiClient.post<CreateBlogResponse>('/api/blogs', data);
    return response.data;
  },

  async getBlogs(page = 1, pageSize = 10, search?: string, tags?: string): Promise<GetBlogsResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });
    
    if (search) params.append('search', search);
    if (tags) params.append('tags', tags);
    
    const response = await apiClient.get<GetBlogsResponse>(`/api/blogs?${params}`);
    return response.data;
  },

  async getBlogById(id: string): Promise<Blog> {
    const response = await apiClient.get<Blog>(`/api/blogs/${id}`);
    return response.data;
  },

  async deleteBlog(id: string): Promise<void> {
    await apiClient.delete(`/api/blogs/${id}`);
  },

  async generateTwitterContent(id: string): Promise<{ content: string; characterCount: number }> {
    const response = await apiClient.post<{ content: string; characterCount: number }>(`/api/blogs/${id}/twitter-content`);
    return response.data;
  },
};