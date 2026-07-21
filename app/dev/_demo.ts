/*
 * Shared demo data for the dev-only preview routes under /dev. These pages
 * render the real page clients with representative data so the app UI can be
 * reviewed and screenshotted without an authenticated session. Every /dev
 * page returns 404 in production (guarded in each page.tsx).
 */

const DAY = 24 * 60 * 60 * 1000
const now = Date.now()
export const inDays = (d: number) => new Date(now + d * DAY)
export const agoDays = (d: number) => new Date(now - d * DAY)

type BillingCycle = 'monthly' | 'yearly' | 'weekly'

export const demoSubscriptions = [
  { name: 'Netflix', category: 'Entertainment', amount: 15.49, billingCycle: 'monthly', nextPaymentDate: inDays(2), reminderEnabled: true },
  { name: 'Spotify', category: 'Entertainment', amount: 11.99, billingCycle: 'monthly', nextPaymentDate: inDays(5), reminderEnabled: true },
  { name: 'ChatGPT Plus', category: 'Productivity', amount: 20, billingCycle: 'monthly', nextPaymentDate: inDays(9), reminderEnabled: false },
  { name: 'YouTube Premium', category: 'Entertainment', amount: 13.99, billingCycle: 'monthly', nextPaymentDate: inDays(14), reminderEnabled: false },
  { name: 'GitHub Pro', category: 'Developer', amount: 4, billingCycle: 'monthly', nextPaymentDate: inDays(18), reminderEnabled: false },
  { name: 'AWS', category: 'Developer', amount: 32.4, billingCycle: 'monthly', nextPaymentDate: inDays(21), reminderEnabled: false },
  { name: 'Adobe CC', category: 'Productivity', amount: 54.99, billingCycle: 'monthly', nextPaymentDate: inDays(24), reminderEnabled: false },
  { name: 'iCloud+', category: 'Utilities', amount: 2.99, billingCycle: 'monthly', nextPaymentDate: inDays(27), reminderEnabled: false },
].map((s, i) => ({
  id: `demo-${i}`,
  userId: 'demo',
  logo: null,
  logoColor: null,
  logoBg: null,
  status: 'active' as const,
  description: null,
  lastRemindedAt: null,
  createdAt: agoDays(300),
  updatedAt: agoDays(1),
  ...s,
  billingCycle: s.billingCycle as BillingCycle,
}))

export const demoTransactions = [
  { id: 't1', amount: 15.49, category: 'Entertainment', merchant: 'Netflix', date: agoDays(1), type: 'debit' as const },
  { id: 't2', amount: 32.4, category: 'Developer', merchant: 'AWS', date: agoDays(3), type: 'debit' as const },
  { id: 't3', amount: 11.99, category: 'Entertainment', merchant: 'Spotify', date: agoDays(6), type: 'debit' as const },
  { id: 't4', amount: 20, category: 'Productivity', merchant: 'ChatGPT Plus', date: agoDays(9), type: 'debit' as const },
  { id: 't5', amount: 4, category: 'Developer', merchant: 'GitHub Pro', date: agoDays(12), type: 'debit' as const },
]

export const demoMonthlySpend = [
  { month: 'Aug 25', amount: 84.2 }, { month: 'Sep 25', amount: 89.1 },
  { month: 'Oct 25', amount: 86.5 }, { month: 'Nov 25', amount: 95.3 },
  { month: 'Dec 25', amount: 104.8 }, { month: 'Jan 26', amount: 97.9 },
  { month: 'Feb 26', amount: 92.4 }, { month: 'Mar 26', amount: 96.1 },
  { month: 'Apr 26', amount: 98.7 }, { month: 'May 26', amount: 93.2 },
  { month: 'Jun 26', amount: 97.9 }, { month: 'Jul 26', amount: 97.87 },
]

// 84 days of daily spend for the analytics heatmap: subscription debits land
// on their day, everything else is zero-filled.
export const demoDailySpend = Array.from({ length: 84 }, (_, i) => {
  const date = agoDays(83 - i)
  const key = date.toISOString().slice(0, 10)
  const day = date.getDate()
  let amount = 0
  if (day === 1) amount += 15.49
  if (day === 5) amount += 11.99
  if (day === 9) amount += 20
  if (day === 12) amount += 4
  if (day === 15) amount += 54.99
  if (day === 21) amount += 32.4
  return { date: key, amount }
})

export const demoBudgets = [
  { id: 'b1', userId: 'demo', category: 'Entertainment', limit: 60, spent: 41.47, icon: null, color: null, createdAt: agoDays(90), updatedAt: agoDays(1) },
  { id: 'b2', userId: 'demo', category: 'Productivity', limit: 90, spent: 74.99, icon: null, color: null, createdAt: agoDays(90), updatedAt: agoDays(1) },
  { id: 'b3', userId: 'demo', category: 'Developer', limit: 50, spent: 36.4, icon: null, color: null, createdAt: agoDays(90), updatedAt: agoDays(1) },
]

export const demoGoals = [
  { id: 'g1', userId: 'demo', title: 'Emergency fund', targetAmount: 6000, currentAmount: 3850, deadline: inDays(210), icon: null, description: null, createdAt: agoDays(120), updatedAt: agoDays(1) },
  { id: 'g2', userId: 'demo', title: 'New laptop', targetAmount: 2400, currentAmount: 1560, deadline: inDays(90), icon: null, description: null, createdAt: agoDays(60), updatedAt: agoDays(1) },
  { id: 'g3', userId: 'demo', title: 'Trip to Japan', targetAmount: 4500, currentAmount: 900, deadline: inDays(320), icon: null, description: null, createdAt: agoDays(30), updatedAt: agoDays(1) },
]
