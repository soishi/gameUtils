/**
 * スワイプ判定ユーティリティのテスト
 */

import {
  calculateDistance,
  calculateVelocity,
  getSwipeDirection,
  analyzeSwipe,
  isValidSwipe,
} from '../swipe';

describe('swipe utilities', () => {
  describe('calculateDistance', () => {
    test('2点間の距離を正しく計算する', () => {
      // 水平方向の距離
      expect(calculateDistance({ x: 0, y: 0 }, { x: 100, y: 0 })).toBe(100);

      // 垂直方向の距離
      expect(calculateDistance({ x: 0, y: 0 }, { x: 0, y: 100 })).toBe(100);

      // 対角線の距離（3-4-5の直角三角形）
      expect(calculateDistance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);

      // より複雑な対角線
      expect(calculateDistance({ x: 10, y: 20 }, { x: 40, y: 60 })).toBe(50);
    });
  });

  describe('calculateVelocity', () => {
    test('速度を正しく計算する', () => {
      // 通常の速度計算
      expect(calculateVelocity(100, 1000)).toBe(0.1);

      // より高速な動き
      expect(calculateVelocity(200, 500)).toBe(0.4);

      // ゼロ時間の場合は0を返す
      expect(calculateVelocity(100, 0)).toBe(0);
    });
  });

  describe('getSwipeDirection', () => {
    test('水平方向のスワイプを正しく判定する', () => {
      // 右方向
      expect(getSwipeDirection({ x: 100, y: 100 }, { x: 200, y: 100 })).toBe('right');

      // 左方向
      expect(getSwipeDirection({ x: 200, y: 100 }, { x: 100, y: 100 })).toBe('left');

      // 斜め右上（水平成分が大きい）
      expect(getSwipeDirection({ x: 100, y: 100 }, { x: 200, y: 120 })).toBe('right');

      // 斜め左下（水平成分が大きい）
      expect(getSwipeDirection({ x: 200, y: 100 }, { x: 100, y: 120 })).toBe('left');
    });

    test('垂直方向の動きが大きい場合は null を返す', () => {
      // 真上
      expect(getSwipeDirection({ x: 100, y: 100 }, { x: 100, y: 50 })).toBe(null);

      // 真下
      expect(getSwipeDirection({ x: 100, y: 100 }, { x: 100, y: 200 })).toBe(null);

      // 垂直成分が水平成分より大きい
      expect(getSwipeDirection({ x: 100, y: 100 }, { x: 120, y: 200 })).toBe(null);
    });
  });

  describe('analyzeSwipe', () => {
    test('スワイプデータを正しく分析する', () => {
      const startPoint = { x: 100, y: 100 };
      const endPoint = { x: 200, y: 100 };
      const startTime = 1000;
      const endTime = 1500;

      const result = analyzeSwipe(startPoint, endPoint, startTime, endTime);

      expect(result.startPoint).toEqual(startPoint);
      expect(result.endPoint).toEqual(endPoint);
      expect(result.distance).toBe(100);
      expect(result.duration).toBe(500);
      expect(result.velocity).toBe(0.2);
      expect(result.direction).toBe('right');
    });
  });

  describe('isValidSwipe', () => {
    test('有効なスワイプを正しく判定する', () => {
      const validSwipe = {
        startPoint: { x: 100, y: 100 },
        endPoint: { x: 200, y: 100 },
        distance: 100, // 80px以上
        velocity: 0.3, // 0.2px/ms以上
        direction: 'right' as const,
        duration: 333,
      };

      expect(isValidSwipe(validSwipe)).toBe(true);
    });

    test('距離が不足している場合は false を返す', () => {
      const invalidSwipe = {
        startPoint: { x: 100, y: 100 },
        endPoint: { x: 150, y: 100 },
        distance: 50, // 80px未満
        velocity: 0.3,
        direction: 'right' as const,
        duration: 167,
      };

      expect(isValidSwipe(invalidSwipe)).toBe(false);
    });

    test('速度が不足している場合は false を返す', () => {
      const invalidSwipe = {
        startPoint: { x: 100, y: 100 },
        endPoint: { x: 200, y: 100 },
        distance: 100,
        velocity: 0.1, // 0.2px/ms未満
        direction: 'right' as const,
        duration: 1000,
      };

      expect(isValidSwipe(invalidSwipe)).toBe(false);
    });

    test('方向が null の場合は false を返す', () => {
      const invalidSwipe = {
        startPoint: { x: 100, y: 100 },
        endPoint: { x: 100, y: 200 },
        distance: 100,
        velocity: 0.3,
        direction: null,
        duration: 333,
      };

      expect(isValidSwipe(invalidSwipe)).toBe(false);
    });
  });
});