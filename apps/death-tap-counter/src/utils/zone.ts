/**
 * タップゾーン判定のユーティリティ関数
 */

import { Point, TapZone } from '@/types'
import { APP_CONFIG } from '@/types/config'

/**
 * 座標からタップゾーンを判定する
 * @param point - タップされた座標
 * @param screenHeight - 画面の高さ
 * @returns タップゾーン（decrement: 上10%, increment: 下90%）
 */
export const getTapZone = (point: Point, screenHeight: number): TapZone => {
  const zoneThreshold = screenHeight * APP_CONFIG.ZONE_RATIO

  return point.y <= zoneThreshold ? 'decrement' : 'increment'
}

/**
 * 座標が有効かどうかを判定する
 * @param point - 判定する座標
 * @param screenWidth - 画面の幅
 * @param screenHeight - 画面の高さ
 * @returns 座標が画面内にあるかどうか
 */
export const isValidPoint = (point: Point, screenWidth: number, screenHeight: number): boolean => {
  return point.x >= 0 && point.x <= screenWidth && point.y >= 0 && point.y <= screenHeight
}
