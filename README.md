# Game Utils

ゲーム関連のユーティリティツール集です。

## 📱 アプリケーション

### [Death Tap Counter（デスタップカウンター）](./apps/death-tap-counter/)

Splatoon用のシンプルなデス数カウンターアプリ

- **🚀 デモサイト**: https://soishi.github.io/gameUtils/
- **主要機能**:
  - タップでデス数カウント（7:3分割ゾーン）
  - スワイプで試合結果記録
  - 履歴・統計表示
  - オフライン対応

## 🛠️ 技術スタック

- **Frontend**: Next.js + TypeScript + Tailwind CSS
- **Testing**: Jest + Testing Library
- **Deploy**: GitHub Pages + GitHub Actions
- **Architecture**: モノレポ構成

## 🚀 デプロイ

GitHub Actionsによる自動デプロイを設定済み。`main`ブランチへのプッシュで自動的にGitHub Pagesにデプロイされます。

## 📋 開発

```bash
# プロジェクトルートで各アプリの開発サーバーを起動
cd apps/death-tap-counter
npm run dev
```

## 📄 ライセンス

MIT License