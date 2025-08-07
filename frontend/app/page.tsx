import Link from 'next/link';
import BlogList from '@/components/BlogList';
import Logo from '@/components/Logo';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <Logo size="lg" />
              <div>
                <p className="text-gray-600">
                  学んだことをAIが美しいブログ記事に変換します
                </p>
              </div>
            </div>
            <Link
              href="/create"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              新しいブログを作成
            </Link>
          </div>
        </header>

        <main>
          <BlogList />
        </main>
      </div>
    </div>
  );
}
