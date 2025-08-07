export interface GeminiConfig {
  apiKey: string;
  model: string;
}

export interface GeminiPromptResponse {
  title: string;
  summary: string;
  htmlContent: string;
  tags: string[];
  metadata: {
    readingTime: number;
    wordCount: number;
  };
}

export interface TwitterContentResponse {
  content: string;
  characterCount: number;
}