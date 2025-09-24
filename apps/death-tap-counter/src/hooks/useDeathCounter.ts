/**
 * デスカウンター用のカスタムフック
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { GameHistory, GameResult, AppState, TapEvent, SwipeData } from '@/types'
import {
  getTapZone,
  isValidSwipe,
  saveCount,
  loadCount,
  saveHistory,
  loadHistory,
  calculateStats,
} from '@/utils'

export const useDeathCounter = () => {
  const [state, setState] = useState<AppState>({
    count: 0,
    history: [],
    isHistoryOpen: false,
  })

  const [undoStack, setUndoStack] = useState<number[]>([])
  const [isFlashing, setIsFlashing] = useState(false)

  // 初期化: LocalStorageからデータを読み込み
  useEffect(() => {
    const savedCount = loadCount()
    const savedHistory = loadHistory()

    setState((prev) => ({
      ...prev,
      count: savedCount,
      history: savedHistory,
    }))
  }, [])

  // カウント変更時にLocalStorageに保存
  useEffect(() => {
    saveCount(state.count)
  }, [state.count])

  // 履歴変更時にLocalStorageに保存
  useEffect(() => {
    saveHistory(state.history)
  }, [state.history])

  /**
   * 点滅エフェクトを実行する
   */
  const triggerFlash = useCallback(() => {
    setIsFlashing(true)
    setTimeout(() => setIsFlashing(false), 150)
  }, [])

  /**
   * カウントを増加させる
   */
  const incrementCount = useCallback(() => {
    setState((prev) => {
      setUndoStack((stack) => [...stack, prev.count])
      return { ...prev, count: prev.count + 1 }
    })
    triggerFlash()
  }, [triggerFlash])

  /**
   * カウントを減少させる（下限0）
   */
  const decrementCount = useCallback(() => {
    setState((prev) => {
      if (prev.count > 0) {
        setUndoStack((stack) => [...stack, prev.count])
        triggerFlash()
        return { ...prev, count: prev.count - 1 }
      }
      return prev
    })
  }, [triggerFlash])

  /**
   * タップイベントを処理する
   */
  const handleTap = useCallback(
    (tapEvent: TapEvent, screenHeight: number) => {
      const zone = getTapZone(tapEvent.point, screenHeight)

      if (zone === 'increment') {
        incrementCount()
      } else {
        decrementCount()
      }
    },
    [incrementCount, decrementCount],
  )

  /**
   * Undo操作を実行する
   */
  const undoLastAction = useCallback(() => {
    if (undoStack.length > 0) {
      const lastCount = undoStack[undoStack.length - 1]
      setUndoStack((stack) => stack.slice(0, -1))
      setState((prev) => ({ ...prev, count: lastCount }))
      triggerFlash()
    }
  }, [undoStack, triggerFlash])

  /**
   * 試合を確定する
   */
  const confirmGame = useCallback(
    (result: GameResult) => {
      const gameHistory: GameHistory = {
        id: crypto.randomUUID(),
        at: Date.now(),
        count: Math.max(0, state.count),
        result,
      }

      setState((prev) => ({
        ...prev,
        count: 0,
        history: [...prev.history, gameHistory],
      }))

      // Undoスタックもクリア
      setUndoStack([])
    },
    [state.count],
  )

  /**
   * スワイプから試合確定を処理する
   */
  const handleSwipe = useCallback(
    (swipeData: SwipeData) => {
      if (isValidSwipe(swipeData)) {
        const result: GameResult = swipeData.direction === 'right' ? 'W' : 'L'
        confirmGame(result)
      }
    },
    [confirmGame],
  )

  /**
   * 履歴モーダルの表示/非表示を切り替える
   */
  const toggleHistory = useCallback(() => {
    setState((prev) => ({ ...prev, isHistoryOpen: !prev.isHistoryOpen }))
  }, [])

  /**
   * 履歴をクリアする
   */
  const clearHistory = useCallback(() => {
    setState((prev) => ({ ...prev, history: [] }))
    setUndoStack([])
  }, [])

  /**
   * 個別の履歴項目を削除する
   */
  const deleteHistoryItem = useCallback((gameId: string) => {
    setState((prev) => ({
      ...prev,
      history: prev.history.filter((game) => game.id !== gameId),
    }))
  }, [])

  /**
   * 個別の履歴項目のデス数を変更する
   */
  const updateHistoryItemCount = useCallback((gameId: string, newCount: number) => {
    setState((prev) => ({
      ...prev,
      history: prev.history.map((game) =>
        game.id === gameId ? { ...game, count: Math.max(0, newCount) } : game,
      ),
    }))
  }, [])

  /**
   * 個別の履歴項目の勝敗結果を変更する
   */
  const updateHistoryItemResult = useCallback((gameId: string, newResult: GameResult) => {
    setState((prev) => ({
      ...prev,
      history: prev.history.map((game) =>
        game.id === gameId ? { ...game, result: newResult } : game,
      ),
    }))
  }, [])

  /**
   * 統計情報を取得する
   */
  const getStats = useCallback(() => {
    return calculateStats(state.history)
  }, [state.history])

  return {
    // 状態
    count: state.count,
    history: state.history,
    isHistoryOpen: state.isHistoryOpen,
    canUndo: undoStack.length > 0,
    isFlashing,

    // 操作
    handleTap,
    undoLastAction,
    confirmGame,
    handleSwipe,
    toggleHistory,
    clearHistory,
    deleteHistoryItem,
    updateHistoryItemCount,
    updateHistoryItemResult,

    // 統計
    getStats,
  }
}
