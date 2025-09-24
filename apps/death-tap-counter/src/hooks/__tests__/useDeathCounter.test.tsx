/**
 * useDeathCounterフックのテスト（Issue #9の修正確認）
 */

import { renderHook, act } from '@testing-library/react'
import { useDeathCounter } from '../useDeathCounter'
import { TapEvent } from '@/types'

// localStorageのモック
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value
    }),
    clear: jest.fn(() => {
      store = {}
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key]
    }),
  }
})()

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

describe('useDeathCounter - Issue #9修正確認', () => {
  beforeEach(() => {
    localStorageMock.clear()
    jest.clearAllMocks()
  })

  it('新しいゲーム開始時（カウント0）から最初のタップでカウントが1になる', () => {
    const { result } = renderHook(() => useDeathCounter())

    // 初期状態はカウント0
    expect(result.current.count).toBe(0)

    const incrementEvent: TapEvent = {
      point: { x: 100, y: 400 },
      zone: 'increment',
      timestamp: Date.now(),
    }

    // 最初のタップ
    act(() => {
      result.current.handleTap(incrementEvent, 500)
    })

    // カウントが1になることを確認（Issue #9の修正）
    expect(result.current.count).toBe(1)
  })

  it('カウントが0の時、デクリメントしても0のまま', () => {
    const { result } = renderHook(() => useDeathCounter())

    const decrementEvent: TapEvent = {
      point: { x: 100, y: 50 },
      zone: 'decrement',
      timestamp: Date.now(),
    }

    act(() => {
      result.current.handleTap(decrementEvent, 500)
    })

    expect(result.current.count).toBe(0)
  })

  it('ゲーム確定後、新しいゲームが0から開始される', () => {
    const { result } = renderHook(() => useDeathCounter())

    const incrementEvent: TapEvent = {
      point: { x: 100, y: 400 },
      zone: 'increment',
      timestamp: Date.now(),
    }

    // カウントを増やす
    act(() => {
      result.current.handleTap(incrementEvent, 500)
      result.current.handleTap(incrementEvent, 500)
      result.current.handleTap(incrementEvent, 500)
    })

    expect(result.current.count).toBe(3)

    // ゲーム確定
    act(() => {
      result.current.confirmGame('W')
    })

    // カウントが0にリセットされる
    expect(result.current.count).toBe(0)

    // 新しいゲームの最初のタップ
    act(() => {
      result.current.handleTap(incrementEvent, 500)
    })

    // カウントが1になる（Issue #9の修正確認）
    expect(result.current.count).toBe(1)
  })
})
