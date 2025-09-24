/**
 * スワイプ判定のユーティリティ関数
 */

import { Point, SwipeData, SwipeDirection } from "@/types";
import { APP_CONFIG } from "@/types/config";

/**
 * 2点間の距離を計算する
 * @param start - 開始点
 * @param end - 終了点
 * @returns 距離（px）
 */
export const calculateDistance = (start: Point, end: Point): number => {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
};

/**
 * スワイプの速度を計算する
 * @param distance - スワイプ距離
 * @param duration - スワイプ時間（ms）
 * @returns 速度（px/ms）
 */
export const calculateVelocity = (
  distance: number,
  duration: number,
): number => {
  return duration > 0 ? distance / duration : 0;
};

/**
 * スワイプの方向を判定する
 * @param start - 開始点
 * @param end - 終了点
 * @returns スワイプ方向
 */
export const getSwipeDirection = (start: Point, end: Point): SwipeDirection => {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;

  // 縦方向の動きが横方向より大きい場合はスワイプとしない
  if (Math.abs(deltaY) > Math.abs(deltaX)) {
    return null;
  }

  return deltaX > 0 ? "right" : "left";
};

/**
 * スワイプデータを分析する
 * @param startPoint - 開始点
 * @param endPoint - 終了点
 * @param startTime - 開始時間
 * @param endTime - 終了時間
 * @returns スワイプデータ
 */
export const analyzeSwipe = (
  startPoint: Point,
  endPoint: Point,
  startTime: number,
  endTime: number,
): SwipeData => {
  const distance = calculateDistance(startPoint, endPoint);
  const duration = endTime - startTime;
  const velocity = calculateVelocity(distance, duration);
  const direction = getSwipeDirection(startPoint, endPoint);

  return {
    startPoint,
    endPoint,
    distance,
    velocity,
    direction,
    duration,
  };
};

/**
 * スワイプが有効かどうかを判定する
 * @param swipeData - スワイプデータ
 * @returns スワイプが有効かどうか
 */
export const isValidSwipe = (swipeData: SwipeData): boolean => {
  const { distance, velocity, direction } = swipeData;

  return (
    direction !== null &&
    distance >= APP_CONFIG.SWIPE_THRESHOLD.DISTANCE &&
    velocity >= APP_CONFIG.SWIPE_THRESHOLD.VELOCITY
  );
};
