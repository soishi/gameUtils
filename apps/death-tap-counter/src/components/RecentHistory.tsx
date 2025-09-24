/**
 * 直近5バトルの履歴表示コンポーネント
 */

import { GameHistory } from '@/types'

interface RecentHistoryProps {
  history: GameHistory[]
}

export const RecentHistory = ({ history }: RecentHistoryProps) => {
  // 直近5件の履歴を取得（新しい順）
  const recentHistory = history.slice(-5).reverse()

  // 履歴全体の勝率を計算
  const totalGames = history.length
  const wins = history.filter((game) => game.result === 'W').length
  const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0

  if (recentHistory.length === 0) {
    return <div className="text-center text-gray-500 text-sm py-2">履歴なし</div>
  }

  return (
    <div className="flex flex-col gap-1 py-2">
      {/* 履歴全体の勝率表示 */}
      <div className="text-center text-xs text-gray-400 mb-1">
        全{totalGames}戦 勝率{winRate}%
      </div>

      {recentHistory.map((game) => (
        <div
          key={game.id}
          className="flex items-center justify-between text-sm px-2 py-1 rounded bg-gray-800/30"
        >
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                game.result === 'W' ? 'bg-green-400' : 'bg-red-400'
              }`}
            />
            <span className="text-gray-300">{game.count}デス</span>
          </div>
          <span className={`font-bold ${game.result === 'W' ? 'text-green-400' : 'text-red-400'}`}>
            {game.result}
          </span>
        </div>
      ))}
    </div>
  )
}
