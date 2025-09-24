/**
 * UI状態管理関連の型定義
 */

import { GameHistory } from "./game";

// タップゾーン判定の型
export type TapZone = "increment" | "decrement";

// スワイプ方向の型
export type SwipeDirection = "left" | "right" | null;

// アプリケーション状態の型
export interface AppState {
  count: number;
  history: GameHistory[];
  isHistoryOpen: boolean;
}

// モーダル状態の型
export interface ModalState {
  isOpen: boolean;
  type: "history" | null;
}
