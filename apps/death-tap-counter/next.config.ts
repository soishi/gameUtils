import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静的サイトとしてエクスポート
  output: 'export',
  // 画像最適化を無効化（静的エクスポート用）
  images: {
    unoptimized: true,
  },
  // トレイリングスラッシュを追加
  trailingSlash: true,
  // ベースパスの設定（必要に応じて）
  basePath: '',
};

export default nextConfig;
