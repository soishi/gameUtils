/**
 * 設定定数関連の型定義
 */

// アプリケーション設定の型
export interface AppConfig {
  readonly ZONE_RATIO: number // 2:8の比率 (0.2)
  readonly MAX_HISTORY: number // 最大履歴件数 (10000)
  readonly SWIPE_THRESHOLD: {
    readonly DISTANCE: number // 80px
    readonly VELOCITY: number // 0.2px/ms
  }
  readonly STORAGE_KEY: {
    readonly COUNT: string
    readonly HISTORY: string
  }
}

// アプリケーション設定値
export const APP_CONFIG: AppConfig = {
  ZONE_RATIO: 0.2,
  MAX_HISTORY: 10000,
  SWIPE_THRESHOLD: {
    DISTANCE: 80,
    VELOCITY: 0.2,
  },
  STORAGE_KEY: {
    COUNT: 'death_tap_counter_count',
    HISTORY: 'death_tap_counter_history',
  },
} as const
