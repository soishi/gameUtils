# Death Tap Counter（デスタップカウンター）

Splatoon用のシンプルなデス数カウンターアプリです。画面をタップしてデス数をカウントし、スワイプで試合結果を記録できます。

## 🚀 デモ

GitHub Pagesで公開中: **https://soishi.github.io/gameUtils/death-tap-counter/**

> **注意**: GitHubリポジトリの作成後、Settings > Pages でGitHub Actionsをソースに設定してください。

## 主な機能

### 基本操作

- **タップでカウント**: 画面をタップしてデス数を増減
  - 上部70%エリア: タップでデス数+1
  - 下部30%エリア: タップでデス数-1（最小値0）
- **スワイプで試合確定**:
  - 右スワイプ → 勝利(W)として記録
  - 左スワイプ → 敗北(L)として記録
- **Undo機能**: 直前の+1/-1操作を取り消し

### データ管理

- **永続化**: ブラウザのLocalStorageにデータを保存（再読込後も維持）
- **履歴管理**: 最大100件の試合履歴を保存
- **統計表示**: 平均デス数、勝率、勝敗数を表示

## 操作方法

### 基本操作

1. **デス数カウント**: 画面上部をタップして+1、下部をタップして-1
2. **試合確定**: 画面を右にスワイプで勝利、左にスワイプで敗北として記録
3. **履歴確認**: 右上のハンバーガーメニュー → 「履歴・統計」をタップ

### キーボードショートカット（PC用）

| キー    | 機能             |
| ------- | ---------------- |
| `Space` | +1               |
| `↓`     | -1               |
| `Z`     | やり直し（Undo） |
| `→`     | 勝利として確定   |
| `←`     | 敗北として確定   |
| `H`     | 履歴を開く       |

### スワイプ設定

- **最小距離**: 80px以上
- **最小速度**: 0.2px/ms以上
- **方向判定**: 水平方向の移動が垂直方向より大きい場合のみ有効

## 技術仕様

### フロントエンド

- **Framework**: Next.js (App Router)
- **言語**: TypeScript (strict mode)
- **スタイル**: Tailwind CSS
- **状態管理**: React hooks + LocalStorage
- **ビルド**: 静的サイトエクスポート

### 対応環境

- **ブラウザ**: モダンブラウザ（最新2世代）
- **デバイス**: スマートフォン、タブレット、PC対応
- **オフライン**: ネット接続不要で動作

## 開発・ビルド

### セットアップ

```bash
cd apps/death-tap-counter
npm install
```

### 開発サーバー起動

```bash
npm run dev
```

### テスト実行

```bash
npm test          # 一回実行
npm run test:watch # ウォッチモード
```

### ビルド

```bash
npm run build     # 静的ファイル生成
npm start         # ビルド後のプレビュー
```

### リント・型チェック

```bash
npm run lint      # ESLint実行
npx tsc --noEmit  # TypeScript型チェック
```

## ファイル構成

```
src/
├── app/
│   └── page.tsx              # メインページ
├── components/
│   ├── DeathTapCounter.tsx   # メインコンポーネント
│   ├── HamburgerMenu.tsx     # ハンバーガーメニュー
│   └── HistoryDrawer.tsx     # 履歴ドロワー
├── hooks/
│   ├── useDeathCounter.ts    # メインロジック
│   └── useSwipeDetection.ts  # スワイプ検出
├── types/
│   ├── game.ts               # ゲーム関連の型
│   ├── ui.ts                 # UI関連の型
│   ├── events.ts             # イベント関連の型
│   ├── config.ts             # 設定定数
│   └── index.ts              # 型のエクスポート
└── utils/
    ├── zone.ts               # ゾーン判定
    ├── swipe.ts              # スワイプ判定
    ├── stats.ts              # 統計計算
    ├── storage.ts            # データ永続化
    └── __tests__/            # ユニットテスト
```

## データ構造

### 履歴項目

```typescript
interface GameHistory {
  id: string; // 一意ID
  at: number; // 記録時刻（epoch_ms）
  count: number; // デス数
  result: "W" | "L"; // 試合結果
}
```

### 統計情報

```typescript
interface GameStats {
  avg: number; // 平均デス数（小数点1桁）
  wins: number; // 勝利数
  losses: number; // 敗北数
}
```

## アクセシビリティ

- **ARIA属性**: スクリーンリーダー対応
- **キーボード操作**: 全機能をキーボードで操作可能
- **高コントラスト**: 視認性を重視した配色
- **大きなタップ領域**: 誤操作を防ぐUI設計

## デプロイメント

### GitHub Pagesへのデプロイ

このプロジェクトはGitHub Actionsを使用した自動デプロイに対応しています。

#### 設定手順

1. **GitHubリポジトリの作成**

   ```bash
   git remote add origin https://github.com/soishi/gameUtils.git
   git push -u origin main
   ```

2. **GitHub Pages有効化**
   - GitHubリポジトリの Settings > Pages へ移動
   - Source: "GitHub Actions" を選択
   - 設定完了後、自動でデプロイが開始されます

3. **デプロイ確認**
   - Actions タブでデプロイ状況を確認
   - 完了後、`https://soishi.github.io/gameUtils/death-tap-counter/` でアクセス可能

#### 自動デプロイトリガー

- `main` ブランチへのプッシュ
- 手動実行（Actions タブから）

#### デプロイ内容

- ビルド前の品質チェック（ESLint、テスト実行）
- Next.js静的サイト生成
- GitHub Pagesへのデプロイ

### トラブルシューティング

#### 初回デプロイ時のPages設定エラー

**症状**: GitHub Actionsで "Get Pages site failed" エラーが発生

**解決方法**:

1. リポジトリの Settings > Pages へ移動
2. Source を "GitHub Actions" に設定
3. Actions タブから手動でワークフローを再実行

**または**: 最新のワークフローは自動でPages設定を有効化するため、エラーが発生してもそのまま実行を継続します。

#### ビルドエラーの場合

1. **依存関係エラー**: `npm ci` が失敗する場合は、`package-lock.json` の整合性を確認
2. **テストエラー**: テストが失敗する場合は、ローカルで `npm test` を実行して修正
3. **ESLintエラー**: `npm run lint` でローカル環境のコード品質を確認

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
