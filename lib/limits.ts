export const FREE_LIMITS = {
  subscriptions: 7,
  budgets: 2,
  goals: 2,
  reminders: 2,
} as const

export type LimitedFeature = keyof typeof FREE_LIMITS

export type LimitResult =
  | { ok: true }
  | { ok: false; code: 'LIMIT_REACHED'; feature: LimitedFeature; limit: number }

export function limitReached(feature: LimitedFeature): LimitResult {
  return { ok: false, code: 'LIMIT_REACHED', feature, limit: FREE_LIMITS[feature] }
}
