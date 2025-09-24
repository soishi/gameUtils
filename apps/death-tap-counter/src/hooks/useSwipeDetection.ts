/**
 * スワイプ検出用のカスタムフック
 */

'use client'

import { useState, useCallback, useRef } from 'react'
import { Point, TouchEventData, SwipeData } from '@/types'
import { analyzeSwipe } from '@/utils'

interface UseSwipeDetectionProps {
  onSwipe: (swipeData: SwipeData) => void
}

export const useSwipeDetection = ({ onSwipe }: UseSwipeDetectionProps) => {
  const [isTracking, setIsTracking] = useState(false)
  const startData = useRef<TouchEventData | null>(null)

  /**
   * タッチ開始を処理する
   */
  const handleTouchStart = useCallback((point: Point) => {
    const touchData: TouchEventData = {
      point,
      timestamp: Date.now(),
      type: 'start',
    }

    startData.current = touchData
    setIsTracking(true)
  }, [])

  /**
   * タッチ終了を処理する
   */
  const handleTouchEnd = useCallback(
    (point: Point) => {
      if (!isTracking || !startData.current) {
        return
      }

      const endTime = Date.now()
      const swipeData = analyzeSwipe(
        startData.current.point,
        point,
        startData.current.timestamp,
        endTime,
      )

      onSwipe(swipeData)

      // リセット
      startData.current = null
      setIsTracking(false)
    },
    [isTracking, onSwipe],
  )

  /**
   * マウスイベントをタッチイベントに変換する
   */
  const getPointFromEvent = useCallback((event: React.MouseEvent | React.TouchEvent): Point => {
    if ('touches' in event) {
      // タッチイベント
      const touch = event.touches[0] || event.changedTouches[0]
      return { x: touch.clientX, y: touch.clientY }
    } else {
      // マウスイベント
      return { x: event.clientX, y: event.clientY }
    }
  }, [])

  /**
   * マウス/タッチダウンイベントハンドラー
   */
  const handlePointerDown = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      event.preventDefault()
      const point = getPointFromEvent(event)
      handleTouchStart(point)
    },
    [getPointFromEvent, handleTouchStart],
  )

  /**
   * マウス/タッチアップイベントハンドラー
   */
  const handlePointerUp = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      event.preventDefault()
      const point = getPointFromEvent(event)
      handleTouchEnd(point)
    },
    [getPointFromEvent, handleTouchEnd],
  )

  return {
    isTracking,
    handlePointerDown,
    handlePointerUp,
  }
}
