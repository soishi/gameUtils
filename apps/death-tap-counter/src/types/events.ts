/**
 * イベント関連の型定義
 */

import { TapZone, SwipeDirection } from './ui'

// 座標の型
export interface Point {
  x: number
  y: number
}

// スワイプデータの型
export interface SwipeData {
  startPoint: Point
  endPoint: Point
  distance: number
  velocity: number // px/ms
  direction: SwipeDirection
  duration: number // ms
}

// タップイベントの型
export interface TapEvent {
  point: Point
  zone: TapZone
  timestamp: number
}

// タッチイベントの型
export interface TouchEventData {
  point: Point
  timestamp: number
  type: 'start' | 'move' | 'end'
}
