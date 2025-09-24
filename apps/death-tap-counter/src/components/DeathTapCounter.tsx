/**
 * デスタップカウンターのメインコンポーネント
 */

'use client'

import { useEffect, useRef } from 'react'
import { useDeathCounter } from '@/hooks/useDeathCounter'
import { useSwipeDetection } from '@/hooks/useSwipeDetection'
import { TapEvent } from '@/types'
import { HamburgerMenu } from './HamburgerMenu'
import { HistoryDrawer } from './HistoryDrawer'
import { RecentHistory } from './RecentHistory'

export const DeathTapCounter = () => {
  const {
    count,
    history,
    isHistoryOpen,
    canUndo,
    isFlashing,
    handleTap,
    undoLastAction,
    handleSwipe,
    toggleHistory,
    clearHistory,
    deleteHistoryItem,
    updateHistoryItemCount,
    getStats,
  } = useDeathCounter()

  const { handlePointerDown, handlePointerUp } = useSwipeDetection({
    onSwipe: handleSwipe,
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartTime = useRef<number>(0)

  // タップイベントの処理
  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const point = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }

    const tapEvent: TapEvent = {
      point,
      zone: point.y <= rect.height * 0.2 ? 'decrement' : 'increment',
      timestamp: Date.now(),
    }

    handleTap(tapEvent, rect.height)
  }

  // タッチ開始イベントの処理
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartTime.current = Date.now()
    handlePointerDown(event)
  }

  // タッチ終了イベントの処理
  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const touchDuration = Date.now() - touchStartTime.current

    // 短いタッチ（200ms以下）はタップとして扱う
    if (touchDuration < 200 && event.changedTouches.length === 1) {
      const touch = event.changedTouches[0]
      const rect = containerRef.current.getBoundingClientRect()
      const point = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      }

      const tapEvent: TapEvent = {
        point,
        zone: point.y <= rect.height * 0.2 ? 'decrement' : 'increment',
        timestamp: Date.now(),
      }

      handleTap(tapEvent, rect.height)
    }

    // スワイプ検知も実行
    handlePointerUp(event)
  }

  // キーボードショートカットの処理
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case ' ': // Space = +1
          event.preventDefault()
          const incrementEvent: TapEvent = {
            point: { x: 0, y: 0 },
            zone: 'increment',
            timestamp: Date.now(),
          }
          handleTap(incrementEvent, 1000)
          break
        case 'ArrowDown': // ↓ = -1
          event.preventDefault()
          const decrementEvent: TapEvent = {
            point: { x: 0, y: 800 },
            zone: 'decrement',
            timestamp: Date.now(),
          }
          handleTap(decrementEvent, 1000)
          break
        case 'z':
        case 'Z':
          if (!event.ctrlKey && !event.metaKey) {
            event.preventDefault()
            undoLastAction()
          }
          break
        case 'ArrowRight': // → = W確定
          event.preventDefault()
          handleSwipe({
            startPoint: { x: 100, y: 100 },
            endPoint: { x: 200, y: 100 },
            distance: 100,
            velocity: 0.3,
            direction: 'right',
            duration: 300,
          })
          break
        case 'ArrowLeft': // ← = L確定
          event.preventDefault()
          handleSwipe({
            startPoint: { x: 200, y: 100 },
            endPoint: { x: 100, y: 100 },
            distance: 100,
            velocity: 0.3,
            direction: 'left',
            duration: 300,
          })
          break
        case 'h':
        case 'H':
          event.preventDefault()
          toggleHistory()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleTap, undoLastAction, handleSwipe, toggleHistory])

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-900 text-white select-none">
      {/* メインタップエリア */}
      <div
        ref={containerRef}
        className="relative h-full w-full cursor-pointer"
        onClick={handleContainerClick}
        onMouseDown={handlePointerDown}
        onMouseUp={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        aria-label="デスカウンタータップエリア"
        role="button"
        tabIndex={0}
      >
        {/* 上部エリア（20% - カウント減少ゾーン） */}
        <div
          className={`absolute top-0 left-0 w-full h-[20%] flex items-center justify-center bg-gradient-to-b from-red-900/20 to-red-800/10 border-b border-red-600/30 transition-all duration-150 ${
            isFlashing ? 'bg-white/10' : ''
          }`}
        >
          <div className="text-xl sm:text-2xl text-red-400 font-medium">タップで -1</div>
        </div>

        {/* 下部エリア（80% - カウント増加ゾーン） */}
        <div
          className={`absolute bottom-0 left-0 w-full h-[80%] flex flex-col items-center justify-center bg-gradient-to-b from-green-800/10 to-green-900/20 transition-all duration-150 ${
            isFlashing ? 'bg-white/10' : ''
          }`}
        >
          <div className="text-center flex-shrink-0">
            <div className="text-[40vw] sm:text-[35vw] md:text-[30vw] lg:text-[25vw] font-bold tabular-nums leading-none mb-4">
              {Math.max(0, count)}
            </div>
            <div className="text-xl sm:text-2xl text-green-400 font-medium mb-4">デス数</div>
          </div>

          {/* 直近5バトルの履歴 */}
          <div className="w-full max-w-xs px-4 flex-shrink-0">
            <RecentHistory history={history} />
          </div>

          <div className="absolute bottom-4 right-4 text-sm text-green-400/80">タップで +1</div>
        </div>

        {/* スワイプ指示 */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-center text-xs text-gray-400/70">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <span>←</span> 負け
            </span>
            <span>|</span>
            <span className="flex items-center gap-1">
              勝ち <span>→</span>
            </span>
          </div>
        </div>
      </div>

      {/* ハンバーガーメニュー */}
      <HamburgerMenu
        onHistoryClick={toggleHistory}
        canUndo={canUndo}
        onUndoClick={undoLastAction}
      />

      {/* 履歴ドロワー */}
      {isHistoryOpen && (
        <HistoryDrawer
          history={history}
          stats={getStats()}
          onClose={toggleHistory}
          onClearHistory={clearHistory}
          onDeleteItem={deleteHistoryItem}
          onUpdateItemCount={updateHistoryItemCount}
        />
      )}
    </div>
  )
}
