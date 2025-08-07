'use client';

import { useEffect } from 'react';
import Prism from 'prismjs';

// 必要な言語のサポートを追加
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';

// テーマCSSをインポート
import 'prismjs/themes/prism-tomorrow.css';

interface CodeHighlightProps {
  children: React.ReactNode;
}

export default function CodeHighlight({ children }: CodeHighlightProps) {
  useEffect(() => {
    // コンポーネントがマウントされた後、またはコンテンツが変更された後にハイライトを適用
    Prism.highlightAll();
  }, [children]);

  return <div className="code-highlight-container">{children}</div>;
}