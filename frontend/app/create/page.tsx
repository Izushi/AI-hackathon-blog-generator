import Link from 'next/link';
import BlogForm from '@/components/BlogForm';
import Logo from '@/components/Logo';

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            新しいブログを作成
          </h1>
          <p className="text-gray-600">
            学習内容を入力すると、AIが自動的にブログ記事を生成します
          </p>
        </header>

        <main className="max-w-3xl">
          <div className="bg-white rounded-lg shadow-md p-8">
            <BlogForm />
          </div>
        </main>
      </div>
    </div>
  );
}