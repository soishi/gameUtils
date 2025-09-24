/**
 * 統計計算のユーティリティ関数
 */

import { GameHistory, GameStats } from '@/types';

/**
 * 履歴から統計を計算する
 * @param history - 試合履歴
 * @returns 統計情報
 */
export const calculateStats = (history: GameHistory[]): GameStats => {
  if (history.length === 0) {
    return {
      avg: 0,
      wins: 0,
      losses: 0,
    };
  }

  const wins = history.filter((game) => game.result === 'W').length;
  const losses = history.filter((game) => game.result === 'L').length;
  const totalDeaths = history.reduce((sum, game) => sum + game.count, 0);
  const avg = Math.round((totalDeaths / history.length) * 10) / 10; // 小数点1桁で四捨五入

  return {
    avg,
    wins,
    losses,
  };
};

/**
 * 勝率を計算する
 * @param stats - 統計情報
 * @returns 勝率（0-100の範囲、小数点1桁）
 */
export const calculateWinRate = (stats: GameStats): number => {
  const totalGames = stats.wins + stats.losses;
  if (totalGames === 0) {
    return 0;
  }

  return Math.round((stats.wins / totalGames) * 1000) / 10; // 小数点1桁で四捨五入
};

/**
 * 履歴データをソートする（新しい順）
 * @param history - 試合履歴
 * @returns ソートされた履歴
 */
export const sortHistoryByDate = (history: GameHistory[]): GameHistory[] => {
  return [...history].sort((a, b) => b.at - a.at);
};

/**
 * 履歴データをフィルタリングする（直近N件）
 * @param history - 試合履歴
 * @param limit - 取得する件数
 * @returns フィルタリングされた履歴
 */
export const getRecentHistory = (history: GameHistory[], limit: number): GameHistory[] => {
  const sorted = sortHistoryByDate(history);
  return sorted.slice(0, limit);
};