/**
 * ゲーム関連の型定義
 */

// 試合結果の型
export type GameResult = 'W' | 'L'

// 履歴項目の型
export interface GameHistory {
  id: string
  at: number // epoch_ms
  count: number
  result: GameResult
}

// 統計情報の型
export interface GameStats {
  avg: number // 平均デス数（小数点1桁）
  wins: number
  losses: number
  winRate: number // 勝率（小数点1桁）
  recentWinAvgDeaths: number // 直近100試合の勝ち試合での平均デス数
  recentLossAvgDeaths: number // 直近100試合の負け試合での平均デス数
}
