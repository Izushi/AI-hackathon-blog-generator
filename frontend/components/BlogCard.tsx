import Link from 'next/link';
import { Blog } from '@/types';

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const createdAt = new Date(blog.createdAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <Link href={`/blogs/${blog.id}`} className="block">
        <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
          {blog.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{blog.summary}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <time className="text-sm text-gray-500">{createdAt}</time>
      </Link>
    </article>
  );
}