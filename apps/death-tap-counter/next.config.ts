import type { NextConfig } from "next";

// GitHub Pagesでの公開を考慮したベースパス設定
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || '';

const nextConfig: NextConfig = {
  // 静的サイトとしてエクスポート
  output: 'export',
  // 画像最適化を無効化（静的エクスポート用）
  images: {
    unoptimized: true,
  },
  // トレイリングスラッシュを追加
  trailingSlash: true,
  // GitHub Pagesの場合はサブパスに配置
  basePath: isGitHubPages ? `/${repoName}/death-tap-counter` : '',
  // アセットプレフィックスも同様に設定
  assetPrefix: isGitHubPages ? `/${repoName}/death-tap-counter` : '',
};

export default nextConfig;
