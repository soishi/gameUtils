/**
 * ハンバーガーメニューコンポーネント
 * 直接履歴を表示する履歴ボタンとして機能
 */

'use client'

interface HamburgerMenuProps {
  onHistoryClick: () => void
  canUndo: boolean
  onUndoClick: () => void
}

export const HamburgerMenu = ({ onHistoryClick }: HamburgerMenuProps) => {
  return (
    <div className="absolute top-4 right-4 z-50">
      {/* 履歴表示ボタン */}
      <button
        onClick={onHistoryClick}
        className="w-14 h-14 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700/80 transition-colors"
        aria-label="履歴・統計を表示"
      >
        <span className="text-2xl">📊</span>
      </button>
    </div>
  )
}
