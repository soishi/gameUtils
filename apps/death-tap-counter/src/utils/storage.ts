/**
 * LocalStorage管理のユーティリティ関数
 */

import { GameHistory } from '@/types'
import { APP_CONFIG } from '@/types/config'

/**
 * カウントをLocalStorageに保存する
 * @param count - 現在のカウント
 */
export const saveCount = (count: number): void => {
  try {
    localStorage.setItem(APP_CONFIG.STORAGE_KEY.COUNT, count.toString())
  } catch (error) {
    console.error('Failed to save count:', error)
  }
}

/**
 * カウントをLocalStorageから読み込む
 * @returns 保存されたカウント（なければ0）
 */
export const loadCount = (): number => {
  try {
    const saved = localStorage.getItem(APP_CONFIG.STORAGE_KEY.COUNT)
    return saved ? parseInt(saved, 10) : 0
  } catch (error) {
    console.error('Failed to load count:', error)
    return 0
  }
}

/**
 * 履歴をLocalStorageに保存する
 * @param history - 試合履歴
 */
export const saveHistory = (history: GameHistory[]): void => {
  try {
    // 最大件数を超える場合は古いものから削除
    const limitedHistory = history.slice(-APP_CONFIG.MAX_HISTORY)
    localStorage.setItem(APP_CONFIG.STORAGE_KEY.HISTORY, JSON.stringify(limitedHistory))
  } catch (error) {
    console.error('Failed to save history:', error)
  }
}

/**
 * 履歴をLocalStorageから読み込む
 * @returns 保存された履歴（なければ空配列）
 */
export const loadHistory = (): GameHistory[] => {
  try {
    const saved = localStorage.getItem(APP_CONFIG.STORAGE_KEY.HISTORY)
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error('Failed to load history:', error)
    return []
  }
}

/**
 * 全データをクリアする
 */
export const clearAllData = (): void => {
  try {
    localStorage.removeItem(APP_CONFIG.STORAGE_KEY.COUNT)
    localStorage.removeItem(APP_CONFIG.STORAGE_KEY.HISTORY)
  } catch (error) {
    console.error('Failed to clear data:', error)
  }
}
