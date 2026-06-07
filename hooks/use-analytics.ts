'use client'

// Deprecated: analytics data is now computed server-side.
// Kept for backward compatibility.
export type TimeRange = 'day' | 'week' | 'month' | 'year'

export function useAnalytics(_range: TimeRange = 'month') {
  return {
    chartData: [],
    subscriptionGrowth: [],
    categorySpend: [],
    heatmapData: [],
    total: 0,
    avg: 0,
  }
}
