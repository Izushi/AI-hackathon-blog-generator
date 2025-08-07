# 学習内容ブログ生成サービス

TypeScriptで実装された、学習内容を自動的にブログ記事に変換するWebアプリケーションです。

## 機能

- 学習内容をテキストエリアに入力
- Google Gemini APIを使用して内容を構造化・要約
- 美しいHTMLブログ記事として自動生成
- 生成されたブログの一覧表示
- 個別ブログの閲覧

## 技術スタック

### バックエンド
- TypeScript
- Express.js
- Google Gemini API
- Zod (バリデーション)

### フロントエンド
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form

## セットアップ

### 1. 必要条件
- Node.js 18以上
- npm または yarn
- Google Gemini API キー

### 2. インストール

```bash
# リポジトリをクローン
git clone [repository-url]
cd blog-generator-ts

# 依存関係をインストール
npm install

# フロントエンドの依存関係をインストール
cd frontend
npm install
cd ..
```

### 3. 環境変数の設定

ルートディレクトリに `.env` ファイルを作成：

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
```

### 4. 起動方法

#### 開発環境

```bash
# バックエンドサーバーの起動（ポート3001）
npm run dev:backend

# 別のターミナルでフロントエンドの起動（ポート3000）
npm run dev:frontend

# または同時に起動
npm run dev
```

#### 本番環境

```bash
# ビルド
npm run build

# サーバー起動
npm start
```

## 使い方

1. ブラウザで `http://localhost:3000` にアクセス
2. 「新しいブログを作成」をクリック
3. 学習内容をテキストエリアに入力
4. 「ブログを生成」ボタンをクリック
5. 生成されたブログがホームページの一覧に表示されます
6. ブログカードをクリックして詳細を表示

## プロジェクト構造

```
blog-generator-ts/
├── backend/              # Expressバックエンド
│   ├── src/
│   │   ├── server.ts    # メインサーバー
│   │   ├── routes/      # APIルート
│   │   ├── controllers/ # コントローラー
│   │   ├── services/    # ビジネスロジック
│   │   └── types/       # 型定義
│   └── public/          # 静的ファイル
├── frontend/            # Next.jsフロントエンド
│   ├── app/            # Appディレクトリ
│   ├── components/     # Reactコンポーネント
│   ├── lib/            # ユーティリティ
│   └── types/          # 型定義
└── shared/             # 共有型定義
```

## API エンドポイント

- `POST /api/blogs` - 新しいブログを作成
- `GET /api/blogs` - ブログ一覧を取得
- `GET /api/blogs/:id` - 特定のブログを取得
- `DELETE /api/blogs/:id` - ブログを削除

## 開発者向け情報

### TypeScriptコンパイル

```bash
npm run build:backend
```

### 型チェック

```bash
npx tsc --noEmit
```

## トラブルシューティング

### Gemini APIエラー
- APIキーが正しく設定されているか確認
- APIの利用制限に達していないか確認

### ポートエラー
- ポート3000、3001が他のプロセスで使用されていないか確認

## ライセンス

ISC