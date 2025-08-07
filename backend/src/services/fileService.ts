import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Blog } from '@shared/types';

export class FileService {
  private metadataFile: string;

  constructor() {
    this.metadataFile = path.join(__dirname, '../../public/blogs.json');
  }

  async initialize(): Promise<void> {
    const publicDir = path.dirname(this.metadataFile);
    await fs.mkdir(publicDir, { recursive: true });
    
    try {
      await fs.access(this.metadataFile);
    } catch {
      await fs.writeFile(this.metadataFile, '[]');
    }
  }

  async saveBlogMetadata(blog: Blog): Promise<void> {
    const blogs = await this.getBlogList();
    blogs.push(blog);
    await fs.writeFile(this.metadataFile, JSON.stringify(blogs, null, 2));
  }

  async getBlogList(): Promise<Blog[]> {
    try {
      const data = await fs.readFile(this.metadataFile, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async getBlogById(id: string): Promise<Blog | null> {
    const blogs = await this.getBlogList();
    return blogs.find(blog => blog.id === id) || null;
  }

  async deleteBlog(id: string): Promise<boolean> {
    const blogs = await this.getBlogList();
    const blog = blogs.find(b => b.id === id);
    
    if (!blog) return false;
    
    try {
      const updatedBlogs = blogs.filter(b => b.id !== id);
      await fs.writeFile(this.metadataFile, JSON.stringify(updatedBlogs, null, 2));
      
      return true;
    } catch (error) {
      console.error('Error deleting blog:', error);
      return false;
    }
  }

  generateBlogId(): string {
    return uuidv4();
  }
}