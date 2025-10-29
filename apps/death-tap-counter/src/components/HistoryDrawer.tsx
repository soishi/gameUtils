/**
 * 履歴ドロワーコンポーネント
 */

'use client'

import { useState } from 'react'
import { GameHistory } from '@/types'
import { getRecentHistory } from '@/utils'

interface HistoryDrawerProps {
  history: GameHistory[]
  onClose: () => void
  onClearHistory: () => void
  onDeleteItem: (gameId: string) => void
  onUpdateItemCount: (gameId: string, newCount: number) => void
  onUpdateItemResult: (gameId: string, newResult: 'W' | 'L') => void
}

export const HistoryDrawer = ({
  history,
  onClose,
  onClearHistory,
  onDeleteItem,
  onUpdateItemCount,
  onUpdateItemResult,
}: HistoryDrawerProps) => {
  const recentHistory = getRecentHistory(history, 10)
  const [editingId, setEditingId] = useState<string | null>(null)
  const handleClearHistory = () => {
    if (window.confirm('履歴をすべて削除しますか？この操作は元に戻せません。')) {
      onClearHistory()
    }
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  // 編集機能のヘルパー関数
  const handleDecrementCount = (gameId: string, currentCount: number) => {
    if (currentCount > 0) {
      onUpdateItemCount(gameId, currentCount - 1)
    }
  }

  const handleIncrementCount = (gameId: string, currentCount: number) => {
    onUpdateItemCount(gameId, currentCount + 1)
  }

  const handleDeleteGame = (gameId: string) => {
    onDeleteItem(gameId)
    setEditingId(null)
  }

  const handleToggleResult = (gameId: string, currentResult: 'W' | 'L') => {
    const newResult = currentResult === 'W' ? 'L' : 'W'
    onUpdateItemResult(gameId, newResult)
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* ドロワー */}
      <div className="relative ml-auto w-full max-w-md bg-gray-900 shadow-xl overflow-y-auto">
        {/* ヘッダー */}
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">履歴</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-700/50 hover:bg-gray-600/50 flex items-center justify-center transition-colors"
              aria-label="閉じる"
            >
              <span className="text-white text-lg">×</span>
            </button>
          </div>
        </div>

        {/* クリアボタン */}
        {history.length > 0 && (
          <div className="px-4 pb-2">
            <button
              onClick={handleClearHistory}
              className="w-full py-2 px-4 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium"
            >
              履歴をクリア
            </button>
          </div>
        )}

        {/* 履歴セクション */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-3">
            直近の試合 ({recentHistory.length}件)
          </h3>

          {recentHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-400">まだ試合履歴がありません</div>
          ) : (
            <div className="space-y-3">
              {recentHistory.map((game) => (
                <div
                  key={game.id}
                  className="bg-gray-800/50 rounded-lg p-3 border-l-4"
                  style={{
                    borderLeftColor: game.result === 'W' ? '#10b981' : '#ef4444',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {editingId === game.id ? (
                        <button
                          onClick={() => handleToggleResult(game.id, game.result)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors hover:scale-110 ${
                            game.result === 'W'
                              ? 'bg-green-500 hover:bg-green-600 text-white'
                              : 'bg-red-500 hover:bg-red-600 text-white'
                          }`}
                          aria-label={`勝敗を変更 (現在: ${game.result === 'W' ? '勝利' : '敗北'})`}
                        >
                          {game.result}
                        </button>
                      ) : (
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                            game.result === 'W'
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                          }`}
                        >
                          {game.result}
                        </div>
                      )}
                      <div>
                        {editingId === game.id ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDecrementCount(game.id, game.count)}
                              className="w-7 h-7 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center text-sm font-bold"
                            >
                              -
                            </button>
                            <span className="text-white font-medium min-w-[4rem] text-center">
                              {game.count}デス
                            </span>
                            <button
                              onClick={() => handleIncrementCount(game.id, game.count)}
                              className="w-7 h-7 rounded-full bg-green-600 hover:bg-green-500 text-white flex items-center justify-center text-sm font-bold"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <div className="text-white font-medium">デス数: {game.count}</div>
                        )}
                        <div className="text-sm text-gray-400">{formatDate(game.at)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {editingId === game.id ? (
                        <>
                          <button
                            onClick={() => handleDeleteGame(game.id)}
                            className="px-2 py-1 text-xs bg-red-600 hover:bg-red-500 text-white rounded transition-colors"
                          >
                            削除
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-2 py-1 text-xs bg-gray-600 hover:bg-gray-500 text-white rounded transition-colors"
                          >
                            完了
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setEditingId(game.id)}
                          className="px-3 py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors"
                        >
                          編集
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* フッター */}
        {history.length > 10 && (
          <div className="p-4 text-center text-sm text-gray-400 border-t border-gray-700">
            他 {history.length - 10} 件の履歴があります
          </div>
        )}
      </div>
    </div>
  )
}
