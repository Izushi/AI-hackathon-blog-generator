# 学習内容ブログ生成サービス

TypeScriptで実装された、学習内容を自動的にブログ記事に変換するWebアプリケーションです。

## ✨ 機能

- 📝 学習内容をテキストエリアに入力するだけでブログ記事を自動生成
- 🤖 Google Gemini APIを使用した高品質な文章生成
- 🐦 Twitter/X投稿文の自動生成（100文字制限対応）
- 🎨 シンタックスハイライト付きコード表示
- 📱 レスポンシブデザイン対応
- ⚡ 高速生成（gemini-2.5-flash使用で約28秒）
- 🔍 タグによる記事の分類・検索機能

## 🛠 技術スタック

### バックエンド
- TypeScript
- Express.js
- Google Gemini API (gemini-2.5-flash)
- Zod (バリデーション)
- ファイルベースのデータ永続化

### フロントエンド
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form
- Prism.js (コードハイライト)

## 📋 必要条件

- Node.js 18以上
- npm または yarn
- Google Gemini API キー ([Google AI Studio](https://makersuite.google.com/app/apikey)から無料で取得可能)

## 🚀 セットアップ

### 1. リポジトリをクローン

```bash
git clone https://github.com/[username]/blog-generator-ts.git
cd blog-generator-ts
```

### 2. バックエンドのセットアップ

```bash
# バックエンドディレクトリに移動
cd backend

# 依存関係をインストール
npm install

# 環境変数ファイルを作成
touch .env
```

`.env`ファイルを編集してGemini API Keyを設定：

```env
GEMINI_API_KEY=your_actual_api_key_here
PORT=3001
```

### 3. フロントエンドのセットアップ

```bash
# フロントエンドディレクトリに移動
cd ../frontend

# 依存関係をインストール
npm install
```

### 4. 開発サーバーを起動

**バックエンドサーバー（Terminal 1）:**
```bash
cd backend
npm run dev
```

**フロントエンドサーバー（Terminal 2）:**
```bash
cd frontend
npm run dev
```

### 5. ブラウザでアクセス

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/health

## 📖 使い方

1. ホームページから「新しいブログを作成」をクリック
2. 学習内容をテキストエリアに入力
   - 例：「ReactのカスタムフックについてuseStateとuseEffectを組み合わせた実装方法を学んだ」
3. 「ブログを生成」ボタンをクリック（約28秒で生成）
4. 生成されたブログ記事がホームページの一覧に表示
5. ブログカードをクリックして詳細を表示
6. 「X投稿文を作成」ボタンでSNS用の文章も生成可能

## 🗂 プロジェクト構造

```
blog-generator-ts/
├── backend/              # Expressバックエンド
│   ├── src/
│   │   ├── server.ts    # メインサーバー
│   │   ├── routes/      # APIルート
│   │   ├── controllers/ # コントローラー
│   │   ├── services/    # ビジネスロジック
│   │   │   ├── geminiService.ts  # Gemini API連携
│   │   │   └── fileService.ts    # データ永続化
│   │   └── types/       # 型定義
│   ├── public/          # 静的ファイル・データ保存
│   │   └── blogs.json   # ブログデータ
│   ├── package.json     # バックエンド依存関係
│   └── tsconfig.json    # TypeScript設定
├── frontend/            # Next.jsフロントエンド
│   ├── app/            # App Router
│   │   ├── page.tsx    # ホームページ
│   │   ├── create/     # ブログ作成ページ
│   │   └── blogs/[id]/ # ブログ詳細ページ
│   ├── components/     # Reactコンポーネント
│   │   ├── BlogCard.tsx
│   │   ├── BlogForm.tsx
│   │   ├── BlogList.tsx
│   │   ├── Logo.tsx
│   │   └── TwitterModal.tsx
│   ├── lib/            # API通信ユーティリティ
│   ├── types/          # 型定義
│   └── package.json    # フロントエンド依存関係
└── README.md           # プロジェクト説明
```

## 🔌 API エンドポイント

| メソッド | エンドポイント | 説明 |
|---------|---------------|------|
| POST | `/api/blogs` | 新しいブログを生成 |
| GET | `/api/blogs` | ブログ一覧を取得（ページネーション対応） |
| GET | `/api/blogs/:id` | 特定のブログを取得 |
| POST | `/api/blogs/:id/twitter-content` | Twitter投稿文を生成 |
| DELETE | `/api/blogs/:id` | ブログを削除 |

## 🐛 トラブルシューティング

### Gemini APIエラー
- API Keyが正しく設定されているか確認
- [Google AI Studio](https://makersuite.google.com/app/apikey)でAPIキーの状態を確認
- APIの利用制限に達していないか確認

### TypeScriptコンパイルエラー
```bash
# backendディレクトリでtsconfig.jsonが存在するか確認
ls backend/tsconfig.json

# 存在しない場合は作成
cd backend
touch tsconfig.json
```

### ポート競合
```bash
# 使用中のポートを確認
lsof -i :3000
lsof -i :3001

# プロセスを終了
kill -9 [PID]
```

### ブログ生成が遅い場合
- 現在はgemini-2.5-flashモデルを使用（約28秒）
- さらに高速化が必要な場合はgemini-2.5-flash-liteへの変更を検討

## 🤝 プロジェクトの共有方法

### GitHub経由（推奨）
1. GitHubでリポジトリを作成
2. 以下のコマンドでプッシュ：
```bash
git remote add origin https://github.com/[username]/blog-generator-ts.git
git push -u origin main
```

### Dockerを使用した共有（オプション）
Dockerfileを作成して環境構築を簡略化することも可能

### デプロイオプション
- **Frontend**: Vercel, Netlify
- **Backend**: Render, Railway, Heroku
- **フルスタック**: Docker + Cloud Run, AWS ECS

## 📝 注意事項

- `.env`ファイルは絶対にGitにコミットしないでください
- `backend/public/blogs.json`はローカルストレージとして使用されます
- 本番環境では適切なデータベース（PostgreSQL, MongoDB等）の使用を推奨
- backendとfrontendは独立したプロジェクトとして管理されています

## 📄 ライセンス

ISC

## 👥 貢献

プルリクエストは大歓迎です！大きな変更の場合は、まずissueを開いて変更内容について議論してください。

## 📞 サポート

問題が発生した場合は、GitHubのIssuesセクションで報告してください。