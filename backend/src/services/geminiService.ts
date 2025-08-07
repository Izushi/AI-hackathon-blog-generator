import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiPromptResponse, TwitterContentResponse } from '../types/gemini.types';

export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
  }

  async generateBlogContent(learningContent: string): Promise<GeminiPromptResponse> {
    try {
      const prompt = this.formatPrompt(learningContent);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return this.parseGeminiResponse(text);
    } catch (error) {
      console.error('Gemini API Error:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      throw new Error(`Failed to generate blog content: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async generateTwitterContent(title: string, summary: string, tags: string[]): Promise<TwitterContentResponse> {
    try {
      const prompt = this.formatTwitterPrompt(title, summary, tags);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return this.parseTwitterResponse(text);
    } catch (error) {
      console.error('Gemini API Error:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      throw new Error(`Failed to generate Twitter content: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private formatPrompt(content: string): string {
    return `
以下の学習内容を構造化されたブログ記事に変換してください：

【学習内容】
${content}

【要求事項】
1. 適切なタイトルを自動生成
2. 要約（100文字程度）を作成
3. 本文をHTML形式で構造化（見出し、段落、リストなどを使用）
4. 関連するタグを3-5個提案
5. 読了時間を推定（分単位）
6. 文字数をカウント
7. ですます調を使わず、自分ごととして記述

【出力形式】
必ずJSON形式で以下の構造で返してください：
{
  "title": "記事タイトル",
  "summary": "要約（100文字程度）",
  "htmlContent": "<div class='blog-content'><h2>見出し</h2><p>本文...</p></div>",
  "tags": ["タグ1", "タグ2", "タグ3"],
  "metadata": {
    "readingTime": 5,
    "wordCount": 1000
  }
}

注意：
- HTMLは適切にエスケープしてください
- コードブロックがある場合は<pre><code class="language-[言語名]">タグを使用（例：class="language-javascript"）
- インラインコードは<code>タグを使用
- 重要な部分は<strong>や<em>タグで強調
- 箇条書きは<ul>/<ol>と<li>タグを使用
- 対応言語：javascript, typescript, jsx, tsx, json, css, bash, python, java など（htmlはlanguage-markupを使用）
`;
  }

  private parseGeminiResponse(text: string): GeminiPromptResponse {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from Gemini');
      }
      
      const parsed = JSON.parse(jsonMatch[0]);
      
      return {
        title: parsed.title || 'Untitled',
        summary: parsed.summary || '',
        htmlContent: parsed.htmlContent || '<p>No content generated</p>',
        tags: Array.isArray(parsed.tags) ? parsed.tags : [],
        metadata: {
          readingTime: parsed.metadata?.readingTime || 1,
          wordCount: parsed.metadata?.wordCount || 0,
        },
      };
    } catch (error) {
      console.error('Failed to parse Gemini response:', error);
      
      return {
        title: 'Generated Blog Post',
        summary: 'AI-generated blog post from learning content',
        htmlContent: `<div class="blog-content">${text}</div>`,
        tags: ['generated', 'ai', 'blog'],
        metadata: {
          readingTime: Math.ceil(text.length / 1000),
          wordCount: text.split(/\s+/).length,
        },
      };
    }
  }

  private formatTwitterPrompt(title: string, summary: string, tags: string[]): string {
    return `
以下のブログ記事の情報をもとに、バズりそうなTwitter投稿文を作成してください：

【ブログタイトル】
${title}

【要約】
${summary}

【タグ】
${tags.join(', ')}

【要求事項】
1. **厳密に100文字以内**の魅力的な投稿文を作成
2. 興味を引く冒頭文で始める
3. 関連するハッシュタグを1-2個含める（文字数に注意）
4. 絵文字を少し使用してキャッチーに（文字数に注意）
5. エンゲージメントを促す要素を含める

【出力形式】
必ずJSON形式で以下の構造で返してください：
{
  "content": "Twitter投稿文（100文字以内）",
  "characterCount": 実際の文字数
}

注意：
- **絶対に100文字を超えないでください**（厳守）
- ハッシュタグも文字数に含めてください
- 投稿文を作成後、必ず文字数をカウントして100文字以内に収まっているか確認してください
- 100文字を超えている場合は、短縮して調整してください
- バズりやすい表現やトレンド要素を意識してください
`;
  }

  private parseTwitterResponse(text: string): TwitterContentResponse {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from Gemini');
      }
      
      const parsed = JSON.parse(jsonMatch[0]);
      let content = parsed.content || 'Twitter投稿文の生成に失敗しました';
      
      // 100文字制限を強制的にチェック
      if (content.length > 100) {
        content = content.substring(0, 97) + '...';
      }
      
      return {
        content,
        characterCount: content.length,
      };
    } catch (error) {
      console.error('Failed to parse Twitter response:', error);
      
      const fallbackContent = 'バズりそうな投稿文の生成に失敗しました 🤖 #AI #ブログ';
      return {
        content: fallbackContent,
        characterCount: fallbackContent.length,
      };
    }
  }
}