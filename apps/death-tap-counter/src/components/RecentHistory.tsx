/**
 * 直近5バトルの履歴表示コンポーネント
 */

import { GameHistory, GameStats } from '@/types'

interface RecentHistoryProps {
  history: GameHistory[]
  stats: GameStats
}

export const RecentHistory = ({ history, stats }: RecentHistoryProps) => {
  // 直近5件の履歴を取得（新しい順）
  const recentHistory = history.slice(-5).reverse()

  if (recentHistory.length === 0) {
    return <div className="text-center text-gray-500 text-sm py-2">履歴なし</div>
  }

  return (
    <div className="flex flex-col gap-1 py-2">
      {/* 統計表示 */}
      <div className="space-y-2 mb-1">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-800/40 rounded p-2 text-center">
            <div className="text-lg font-semibold text-blue-300 tabular-nums">{stats.avg}</div>
            <div className="text-xs text-gray-300">平均デス数</div>
          </div>
          <div className="bg-gray-800/40 rounded p-2 text-center">
            <div className="text-lg font-semibold text-purple-300 tabular-nums">{stats.winRate}%</div>
            <div className="text-xs text-gray-300">勝率</div>
          </div>
          <div className="bg-gray-800/40 rounded p-2 text-center">
            <div className="text-lg font-semibold text-green-300 tabular-nums">{stats.wins}</div>
            <div className="text-xs text-gray-300">勝利</div>
          </div>
          <div className="bg-gray-800/40 rounded p-2 text-center">
            <div className="text-lg font-semibold text-red-300 tabular-nums">{stats.losses}</div>
            <div className="text-xs text-gray-300">敗北</div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="bg-gray-800/40 rounded p-2 text-center">
            <div className="text-lg font-semibold text-emerald-300 tabular-nums">{stats.recentWinAvgDeaths}</div>
            <div className="text-xs text-gray-300">直近100試合 勝利時平均デス</div>
          </div>
          <div className="bg-gray-800/40 rounded p-2 text-center">
            <div className="text-lg font-semibold text-rose-300 tabular-nums">{stats.recentLossAvgDeaths}</div>
            <div className="text-xs text-gray-300">直近100試合 敗北時平均デス</div>
          </div>
        </div>
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
