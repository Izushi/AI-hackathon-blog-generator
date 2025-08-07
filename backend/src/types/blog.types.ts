import { z } from 'zod';

export const CreateBlogSchema = z.object({
  learningContent: z.string().min(1).max(10000),
});

export type CreateBlogDto = z.infer<typeof CreateBlogSchema>;

export const GetBlogsQuerySchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val) : 1),
  pageSize: z.string().optional().transform(val => val ? parseInt(val) : 10),
  search: z.string().optional(),
  tags: z.string().optional(),
});

export type GetBlogsQueryDto = z.infer<typeof GetBlogsQuerySchema>;