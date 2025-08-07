import { Request, Response } from 'express';
import { GeminiService } from '../services/geminiService';
import { FileService } from '../services/fileService';
import { CreateBlogSchema, GetBlogsQuerySchema } from '../types/blog.types';
import { Blog, CreateBlogResponse, GetBlogsResponse } from '@shared/types';
import { TwitterContentResponse } from '../types/gemini.types';

export class BlogController {
  private geminiService: GeminiService;
  private fileService: FileService;

  constructor(geminiApiKey: string) {
    this.geminiService = new GeminiService(geminiApiKey);
    this.fileService = new FileService();
  }

  async initialize(): Promise<void> {
    await this.fileService.initialize();
  }

  async createBlog(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = CreateBlogSchema.parse(req.body);
      
      const geminiResponse = await this.geminiService.generateBlogContent(
        validatedData.learningContent
      );
      
      const blogId = this.fileService.generateBlogId();
      
      const blog: Blog = {
        id: blogId,
        title: geminiResponse.title,
        summary: geminiResponse.summary,
        content: geminiResponse.htmlContent,
        tags: geminiResponse.tags,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await this.fileService.saveBlogMetadata(blog);
      
      const response: CreateBlogResponse = {
        success: true,
        blog: blog,
      };
      
      res.status(201).json(response);
    } catch (error) {
      console.error('Error creating blog:', error);
      
      const response: CreateBlogResponse = {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create blog',
      };
      
      res.status(400).json(response);
    }
  }

  async getBlogs(req: Request, res: Response): Promise<void> {
    try {
      const query = GetBlogsQuerySchema.parse(req.query);
      
      let blogs = await this.fileService.getBlogList();
      
      if (query.search) {
        const searchTerm = query.search.toLowerCase();
        blogs = blogs.filter(blog => 
          blog.title.toLowerCase().includes(searchTerm) ||
          blog.summary.toLowerCase().includes(searchTerm) ||
          blog.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      }
      
      if (query.tags) {
        const filterTags = query.tags.split(',').map(t => t.trim().toLowerCase());
        blogs = blogs.filter(blog =>
          blog.tags.some(tag => filterTags.includes(tag.toLowerCase()))
        );
      }
      
      blogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      const total = blogs.length;
      const startIndex = (query.page - 1) * query.pageSize;
      const endIndex = startIndex + query.pageSize;
      const paginatedBlogs = blogs.slice(startIndex, endIndex);
      
      const response: GetBlogsResponse = {
        blogs: paginatedBlogs,
        total: total,
        page: query.page,
        pageSize: query.pageSize,
      };
      
      res.json(response);
    } catch (error) {
      console.error('Error getting blogs:', error);
      res.status(500).json({ error: 'Failed to get blogs' });
    }
  }

  async getBlog(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const blog = await this.fileService.getBlogById(id);
      
      if (!blog) {
        res.status(404).json({ error: 'Blog not found' });
        return;
      }
      
      res.json(blog);
    } catch (error) {
      console.error('Error getting blog:', error);
      res.status(500).json({ error: 'Failed to get blog' });
    }
  }

  async deleteBlog(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await this.fileService.deleteBlog(id);
      
      if (!success) {
        res.status(404).json({ error: 'Blog not found' });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting blog:', error);
      res.status(500).json({ error: 'Failed to delete blog' });
    }
  }

  async generateTwitterContent(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const blog = await this.fileService.getBlogById(id);
      
      if (!blog) {
        res.status(404).json({ error: 'Blog not found' });
        return;
      }

      const twitterContent = await this.geminiService.generateTwitterContent(
        blog.title,
        blog.summary,
        blog.tags
      );

      res.json(twitterContent);
    } catch (error) {
      console.error('Error generating Twitter content:', error);
      res.status(500).json({ error: 'Failed to generate Twitter content' });
    }
  }
}