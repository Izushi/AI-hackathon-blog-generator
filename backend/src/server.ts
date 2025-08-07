import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { BlogController } from './controllers/blogController';
import { createBlogRouter } from './routes/blogs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not set in environment variables');
  process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const blogController = new BlogController(GEMINI_API_KEY);

blogController.initialize().then(() => {
  console.log('Blog controller initialized');
});

const blogRouter = createBlogRouter(blogController);
app.use('/api/blogs', blogRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`API endpoints:`);
  console.log(`  POST   http://localhost:${PORT}/api/blogs - Create new blog`);
  console.log(`  GET    http://localhost:${PORT}/api/blogs - Get all blogs`);
  console.log(`  GET    http://localhost:${PORT}/api/blogs/:id - Get blog by ID`);
  console.log(`  DELETE http://localhost:${PORT}/api/blogs/:id - Delete blog`);
});