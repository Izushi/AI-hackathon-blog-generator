import { Router } from 'express';
import { BlogController } from '../controllers/blogController';

export function createBlogRouter(blogController: BlogController): Router {
  const router = Router();

  router.post('/', (req, res) => blogController.createBlog(req, res));
  router.get('/', (req, res) => blogController.getBlogs(req, res));
  router.get('/:id', (req, res) => blogController.getBlog(req, res));
  router.delete('/:id', (req, res) => blogController.deleteBlog(req, res));
  router.post('/:id/twitter-content', (req, res) => blogController.generateTwitterContent(req, res));

  return router;
}