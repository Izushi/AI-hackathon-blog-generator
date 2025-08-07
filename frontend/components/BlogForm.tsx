'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { blogApi } from '@/lib/api';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  learningContent: z.string().min(10, '学習内容は10文字以上入力してください').max(10000, '学習内容は10000文字以内で入力してください'),
});

type FormData = z.infer<typeof formSchema>;

export default function BlogForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await blogApi.createBlog({
        learningContent: data.learningContent,
      });

      if (response.success) {
        router.push('/');
      } else {
        setError(response.error || 'ブログの作成に失敗しました');
      }
    } catch (err: unknown) {
      console.error('Error creating blog:', err);
      const errorMessage = (err as {response?: {data?: {error?: string}}; message?: string})?.response?.data?.error || 
                          (err as {message?: string})?.message || 
                          'ブログの作成中にエラーが発生しました';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="learningContent" className="block text-sm font-medium text-gray-700 mb-2">
          学習内容 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="learningContent"
          {...register('learningContent')}
          rows={12}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="今日学んだことを詳しく書いてください。

例：
今日はReactのuseStateフックについて学びました。
useStateは関数コンポーネントで状態を管理するためのフックで..."
        />
        {errors.learningContent && (
          <p className="mt-2 text-sm text-red-600">{errors.learningContent.message}</p>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 text-white font-medium rounded-lg transition-colors ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              生成中...
            </span>
          ) : (
            'ブログを生成'
          )}
        </button>
      </div>
    </form>
  );
}