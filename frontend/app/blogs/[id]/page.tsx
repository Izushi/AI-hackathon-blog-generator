'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Blog } from '@/types';
import { blogApi } from '@/lib/api';
import CodeHighlight from '@/components/CodeHighlight';
import Logo from '@/components/Logo';
import TwitterModal from '@/components/TwitterModal';

export default function BlogPage() {
  const params = useParams();
  const id = params.id as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTwitterModalOpen, setIsTwitterModalOpen] = useState(false);
  const [twitterContent, setTwitterContent] = useState('');
  const [twitterCharCount, setTwitterCharCount] = useState(0);
  const [twitterLoading, setTwitterLoading] = useState(false);
  const [twitterError, setTwitterError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const data = await blogApi.getBlogById(id);
      setBlog(data);
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError('ブログの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const generateTwitterContent = async () => {
    try {
      setTwitterLoading(true);
      setTwitterError(null);
      const data = await blogApi.generateTwitterContent(id);
      setTwitterContent(data.content);
      setTwitterCharCount(data.characterCount);
    } catch (err) {
      console.error('Error generating X content:', err);
      setTwitterError('X投稿文の生成に失敗しました');
    } finally {
      setTwitterLoading(false);
    }
  };

  const handleTwitterModalOpen = async () => {
    setIsTwitterModalOpen(true);
    await generateTwitterContent();
  };

  const handleTwitterModalClose = () => {
    setIsTwitterModalOpen(false);
    setTwitterContent('');
    setTwitterCharCount(0);
    setTwitterError(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error || 'ブログが見つかりません'}</p>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700"
            >
              ホームに戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const createdAt = new Date(blog.createdAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="inline-block">
              <Logo size="md" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              ホームに戻る
            </Link>
          </div>
        </header>

        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
              <time dateTime={blog.createdAt.toString()}>{createdAt}</time>
              <span>•</span>
              <span>読了時間: 約5分</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            {blog.summary && (
              <div className="p-4 bg-gray-100 rounded-lg">
                <p className="text-gray-700">{blog.summary}</p>
              </div>
            )}
            
            <div className="mt-6 flex gap-2">
              <button
                onClick={handleTwitterModalOpen}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X投稿文を作成
              </button>
            </div>
          </header>

          <CodeHighlight>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </CodeHighlight>
        </article>

        <TwitterModal
          isOpen={isTwitterModalOpen}
          onClose={handleTwitterModalClose}
          onGenerate={generateTwitterContent}
          twitterContent={twitterContent}
          characterCount={twitterCharCount}
          isLoading={twitterLoading}
          error={twitterError || undefined}
        />
      </div>
    </div>
  );
}