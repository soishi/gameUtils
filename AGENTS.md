# Repository Guidelines

## プロジェクト構成
- モノレポ構成。アプリは `apps/` 配下に配置。
- 主アプリ: `apps/death-tap-counter`（Next.js + TypeScript）。
- ディレクトリ例（アプリ内）:
  - `src/app/` ルーティング/レイアウト/スタイル
  - `src/components/` React コンポーネント（ファイルは PascalCase）
  - `src/hooks/`, `src/utils/`, `src/types/` ライブラリコード
  - テストは `__tests__/` に同居（`.test.ts[x]`）

## ビルド・テスト・開発コマンド
実行は基本 `apps/death-tap-counter` で行います。
- `npm run dev` 開発サーバ起動（Turbopack）。
- `npm run build` 本番ビルド（静的エクスポート）。
- `npm start` ビルド済みアプリを起動。
- `npm test` / `npm run test:watch` 単体テスト実行。
- `npm run lint` ESLint による静的解析。
- `npm run format` / `format:check` Prettier による整形/検査。

## コーディング規約・命名
- 言語は TypeScript（strict 有効）。
- 整形は Prettier に従うこと（未整形コミット禁止）。
- 命名: コンポーネントは PascalCase、フックは `use*`、変数/関数は camelCase。型は `src/types/`。
- インポート: `@/*` エイリアスを使用（`src/` 直下）。
- Lint: Next.js 推奨設定（`eslint.config.mjs`）。警告も可能な限り解消。

## テスト方針
- フレームワーク: Jest + React Testing Library（jsdom）。
- 位置: `src/**/__tests__/` に配置。
- 命名: `*.test.ts` / `*.test.tsx`。
- 方針: 振る舞い重視。新規/変更ロジック（hooks/utils/主要コンポーネント）にテストを追加。

## コミット/PR ガイド
- `main` からブランチ作成し、PR は `main` に。`main` マージでデプロイ。
- コミットは命令形で簡潔に（例: "Add swipe zone utility"）。関連変更はまとめる。
- PR には概要、関連 Issue、テスト結果（UI はスクショ歓迎）、設定変更点を記載。`lint`/`test` を通す。

## セキュリティ/設定メモ
- 静的出力有効。GitHub Pages では `GITHUB_PAGES=true` と `GITHUB_REPOSITORY=owner/repo` で `next.config.ts` の `basePath/assetPrefix` が調整されます。
- シークレットはコミットしない。環境変数とローカル `.env`（非追跡）を使用。

## エージェント向け指示
- このリポジトリに対するエージェントの応答は、常に日本語で行うこと。
- 変更前に短い計画を共有し、関連テスト/リンタを実行してから PR を作成すること。

## 運用ルール（CLAUDE 統合）
- 開発方針: TDD を推奨。変更点には適切なテストを追加。
- デバッグ出力は `console.log` のみに限定し、UI にデバッグ用の要素を追加しない。
- タスク完了時: 編集ファイルの lint/型エラーを解消し、`npm run format` を実行。日本語でコミットし、必要に応じて push。

## 権限/禁止事項
- 許可なく実施可: lint、テスト、型チェック、git commit。
- 許可なく禁止: `package.json` や ESLint 設定の変更。

## 設計・命名原則
- 設計: 単一責任・DRY を徹底。過剰な将来拡張は避け、未使用コードは削除（コメントアウトで温存しない）。
- コメント: 日本語で現仕様/意図のみを簡潔に記述。履歴は残さない。
- 命名: boolean は `is/has/can`、関数は動詞始まり。タイポは即修正。一貫性を維持。
- 型: 共有型は `src/types/` に集約し、再定義は最小限。共有型の変更はレビュー前提。

## ツール/補足
- GitHub CLI: 例）Issue一覧 `gh issue list`、詳細 `gh issue view <番号>`、作成 `gh issue create`、クローズ `gh issue close <番号>`。
- 深いコピーは `structuredClone` を推奨。

## レポート運用
- 保存場所: `memo/report/`
- ファイル名: 先頭にタイムスタンプ（例: `250911_1045_レポート.md`）を付与。
