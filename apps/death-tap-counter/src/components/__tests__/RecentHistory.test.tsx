/**
 * RecentHistory コンポーネントのテスト
 */

import { render, screen } from '@testing-library/react'
import { RecentHistory } from '../RecentHistory'
import { calculateStats } from '@/utils'
import { GameHistory } from '@/types'

describe('RecentHistory', () => {
  test('今日の勝ち数/負け数が表示される', () => {
    const now = new Date()
    const startOfToday = new Date(now)
    startOfToday.setHours(0, 0, 0, 0)
    const t0 = startOfToday.getTime()

    const history: GameHistory[] = [
      // 昨日分（カウント対象外）
      { id: 'y1', at: t0 - 1000, count: 2, result: 'W' },
      // 今日分（カウント対象）
      { id: 't1', at: t0 + 1000, count: 3, result: 'W' },
      { id: 't2', at: t0 + 2000, count: 4, result: 'L' },
      { id: 't3', at: t0 + 3000, count: 1, result: 'W' },
    ]

    const stats = calculateStats(history)

    render(<RecentHistory history={history} stats={stats} />)

    // ラベルの隣に表示される数値を検証
    const winLabel = screen.getByText('今日の勝ち数')
    const lossLabel = screen.getByText('今日の負け数')

    const winCountEl = winLabel.parentElement?.querySelector('.tabular-nums')
    const lossCountEl = lossLabel.parentElement?.querySelector('.tabular-nums')

    expect(winCountEl?.textContent).toBe('2')
    expect(lossCountEl?.textContent).toBe('1')
  })
})
