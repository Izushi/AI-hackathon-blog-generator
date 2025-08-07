'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* 背景の円 */}
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="url(#gradient)"
            stroke="#2563eb"
            strokeWidth="2"
          />
          
          {/* AIを表すニューラルネットワークの線 */}
          <g stroke="#ffffff" strokeWidth="1.5" opacity="0.8">
            <line x1="8" y1="12" x2="16" y2="20" />
            <line x1="8" y1="28" x2="16" y2="20" />
            <line x1="16" y1="20" x2="24" y2="14" />
            <line x1="16" y1="20" x2="24" y2="26" />
            <line x1="24" y1="14" x2="32" y2="20" />
            <line x1="24" y1="26" x2="32" y2="20" />
          </g>
          
          {/* ノード */}
          <g fill="#ffffff">
            <circle cx="8" cy="12" r="2" />
            <circle cx="8" cy="28" r="2" />
            <circle cx="16" cy="20" r="2.5" />
            <circle cx="24" cy="14" r="2" />
            <circle cx="24" cy="26" r="2" />
            <circle cx="32" cy="20" r="2.5" />
          </g>
          
          {/* 中央の文字「B」 */}
          <text
            x="20"
            y="25"
            textAnchor="middle"
            className="text-sm font-bold fill-white"
            style={{ fontSize: '12px' }}
          >
            B
          </text>
          
          {/* グラデーション定義 */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div className="flex flex-col">
        <span className={`font-bold text-gray-900 ${
          size === 'sm' ? 'text-sm' : size === 'md' ? 'text-lg' : 'text-xl'
        }`}>
          学習ブログ
        </span>
        <span className={`text-gray-500 ${
          size === 'sm' ? 'text-xs' : 'text-sm'
        }`}>
          AI Blog Generator
        </span>
      </div>
    </div>
  );
}