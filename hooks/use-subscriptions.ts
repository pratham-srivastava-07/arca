'use client'

// Deprecated: subscriptions are now fetched server-side via server actions.
// This hook is kept for backward compatibility but returns empty data.
export function useSubscriptions() {
  return {
    subscriptions: [],
    monthlyTotal: 0,
    activeCount: 0,
  }
}
