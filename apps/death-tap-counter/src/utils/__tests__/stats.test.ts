/**
 * 統計計算ユーティリティのテスト
 */

import { calculateStats, calculateWinRate, sortHistoryByDate, getRecentHistory } from '../stats';
import { GameHistory } from '@/types';

// テスト用の履歴データ
const mockHistory: GameHistory[] = [
  { id: '1', at: 1000, count: 3, result: 'W' },
  { id: '2', at: 2000, count: 7, result: 'L' },
  { id: '3', at: 3000, count: 1, result: 'W' },
  { id: '4', at: 4000, count: 5, result: 'L' },
  { id: '5', at: 5000, count: 2, result: 'W' },
];

describe('stats utilities', () => {
  describe('calculateStats', () => {
    test('履歴から統計を正しく計算する', () => {
      const stats = calculateStats(mockHistory);

      expect(stats.wins).toBe(3);
      expect(stats.losses).toBe(2);
      // 平均デス数: (3 + 7 + 1 + 5 + 2) / 5 = 18 / 5 = 3.6
      expect(stats.avg).toBe(3.6);
    });

    test('空の履歴では初期値を返す', () => {
      const stats = calculateStats([]);

      expect(stats.wins).toBe(0);
      expect(stats.losses).toBe(0);
      expect(stats.avg).toBe(0);
    });

    test('平均値が小数点1桁で四捨五入される', () => {
      const historyWithDecimal: GameHistory[] = [
        { id: '1', at: 1000, count: 1, result: 'W' },
        { id: '2', at: 2000, count: 2, result: 'W' },
        { id: '3', at: 3000, count: 4, result: 'W' }, // 平均: 7/3 = 2.333...
      ];

      const stats = calculateStats(historyWithDecimal);
      expect(stats.avg).toBe(2.3);
    });

    test('勝利のみの履歴', () => {
      const winsOnly: GameHistory[] = [
        { id: '1', at: 1000, count: 3, result: 'W' },
        { id: '2', at: 2000, count: 5, result: 'W' },
      ];

      const stats = calculateStats(winsOnly);
      expect(stats.wins).toBe(2);
      expect(stats.losses).toBe(0);
      expect(stats.avg).toBe(4.0);
    });

    test('敗北のみの履歴', () => {
      const lossesOnly: GameHistory[] = [
        { id: '1', at: 1000, count: 2, result: 'L' },
        { id: '2', at: 2000, count: 6, result: 'L' },
      ];

      const stats = calculateStats(lossesOnly);
      expect(stats.wins).toBe(0);
      expect(stats.losses).toBe(2);
      expect(stats.avg).toBe(4.0);
    });
  });

  describe('calculateWinRate', () => {
    test('勝率を正しく計算する', () => {
      const stats = { avg: 3.6, wins: 3, losses: 2 };
      const winRate = calculateWinRate(stats);

      // 3/5 = 0.6 = 60.0%
      expect(winRate).toBe(60.0);
    });

    test('全勝の場合は100%を返す', () => {
      const stats = { avg: 2.0, wins: 5, losses: 0 };
      const winRate = calculateWinRate(stats);

      expect(winRate).toBe(100.0);
    });

    test('全敗の場合は0%を返す', () => {
      const stats = { avg: 5.0, wins: 0, losses: 3 };
      const winRate = calculateWinRate(stats);

      expect(winRate).toBe(0.0);
    });

    test('試合数が0の場合は0%を返す', () => {
      const stats = { avg: 0, wins: 0, losses: 0 };
      const winRate = calculateWinRate(stats);

      expect(winRate).toBe(0);
    });

    test('勝率が小数点1桁で四捨五入される', () => {
      const stats = { avg: 3.0, wins: 1, losses: 2 }; // 1/3 = 33.333...%
      const winRate = calculateWinRate(stats);

      expect(winRate).toBe(33.3);
    });
  });

  describe('sortHistoryByDate', () => {
    test('履歴を新しい順にソートする', () => {
      const unsorted: GameHistory[] = [
        { id: '1', at: 3000, count: 1, result: 'W' },
        { id: '2', at: 1000, count: 3, result: 'L' },
        { id: '3', at: 2000, count: 2, result: 'W' },
      ];

      const sorted = sortHistoryByDate(unsorted);

      expect(sorted.map(h => h.at)).toEqual([3000, 2000, 1000]);
      expect(sorted.map(h => h.id)).toEqual(['1', '3', '2']);
    });

    test('元の配列を変更しない', () => {
      const original = [...mockHistory];
      sortHistoryByDate(original);

      expect(original).toEqual(mockHistory);
    });
  });

  describe('getRecentHistory', () => {
    test('指定した件数の最新履歴を取得する', () => {
      const recent = getRecentHistory(mockHistory, 3);

      expect(recent).toHaveLength(3);
      expect(recent.map(h => h.id)).toEqual(['5', '4', '3']);
    });

    test('指定件数が履歴総数より多い場合は全件を返す', () => {
      const recent = getRecentHistory(mockHistory, 10);

      expect(recent).toHaveLength(5);
      expect(recent.map(h => h.id)).toEqual(['5', '4', '3', '2', '1']);
    });

    test('空の履歴では空配列を返す', () => {
      const recent = getRecentHistory([], 5);

      expect(recent).toEqual([]);
    });
  });
});