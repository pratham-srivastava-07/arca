import { addDays, addMonths, addWeeks, addYears } from 'date-fns'

export type Cycle = 'monthly' | 'yearly' | 'weekly'

export function advanceByCycle(date: Date, cycle: Cycle): Date {
  switch (cycle) {
    case 'monthly': return addMonths(date, 1)
    case 'yearly': return addYears(date, 1)
    case 'weekly': return addWeeks(date, 1)
  }
}

// Walks nextPaymentDate forward past `now`, collecting one charge date per
// elapsed period. Catch-up-safe: missed cron days produce multiple charges.
export function rollover(nextPaymentDate: Date, cycle: Cycle, now: Date): { charges: Date[]; next: Date } {
  const charges: Date[] = []
  let next = nextPaymentDate
  while (next <= now) {
    charges.push(next)
    next = advanceByCycle(next, cycle)
  }
  return { charges, next }
}

// At most one reminder per renewal: a reminder for THIS renewal was sent
// within its 3-day window; anything earlier belonged to a previous renewal.
export function isReminderDue(nextPaymentDate: Date, lastRemindedAt: Date | null, now: Date): boolean {
  if (nextPaymentDate <= now) return false
  if (nextPaymentDate > addDays(now, 3)) return false
  if (lastRemindedAt && lastRemindedAt >= addDays(nextPaymentDate, -3)) return false
  return true
}
