import { notFound } from 'next/navigation'
import { DashboardClient } from '@/app/dashboard/client'

/*
 * Dev-only preview of the dashboard with representative demo data.
 * Used to capture real product screenshots (e.g. the landing page frame)
 * without an authenticated session. Returns 404 in production.
 */

const DAY = 24 * 60 * 60 * 1000
const now = Date.now()
const inDays = (d: number) => new Date(now + d * DAY)
const agoDays = (d: number) => new Date(now - d * DAY)

const demoSubscriptions = [
  { name: 'Netflix', category: 'Entertainment', amount: 15.49, billingCycle: 'monthly', nextPaymentDate: inDays(2), reminderEnabled: true },
  { name: 'Spotify', category: 'Entertainment', amount: 11.99, billingCycle: 'monthly', nextPaymentDate: inDays(5), reminderEnabled: true },
  { name: 'ChatGPT Plus', category: 'Productivity', amount: 20, billingCycle: 'monthly', nextPaymentDate: inDays(9), reminderEnabled: false },
  { name: 'YouTube Premium', category: 'Entertainment', amount: 13.99, billingCycle: 'monthly', nextPaymentDate: inDays(14), reminderEnabled: false },
  { name: 'GitHub Pro', category: 'Developer', amount: 4, billingCycle: 'monthly', nextPaymentDate: inDays(18), reminderEnabled: false },
  { name: 'AWS', category: 'Developer', amount: 32.4, billingCycle: 'monthly', nextPaymentDate: inDays(21), reminderEnabled: false },
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
  billingCycle: s.billingCycle as 'monthly',
}))

const demoTransactions = [
  { id: 't1', amount: 15.49, category: 'Entertainment', merchant: 'Netflix', date: agoDays(1), type: 'debit' as const },
  { id: 't2', amount: 32.4, category: 'Developer', merchant: 'AWS', date: agoDays(3), type: 'debit' as const },
  { id: 't3', amount: 11.99, category: 'Entertainment', merchant: 'Spotify', date: agoDays(6), type: 'debit' as const },
  { id: 't4', amount: 20, category: 'Productivity', merchant: 'ChatGPT Plus', date: agoDays(9), type: 'debit' as const },
  { id: 't5', amount: 4, category: 'Developer', merchant: 'GitHub Pro', date: agoDays(12), type: 'debit' as const },
]

const demoMonthlySpend = [
  { month: 'Aug 25', amount: 84.2 }, { month: 'Sep 25', amount: 89.1 },
  { month: 'Oct 25', amount: 86.5 }, { month: 'Nov 25', amount: 95.3 },
  { month: 'Dec 25', amount: 104.8 }, { month: 'Jan 26', amount: 97.9 },
  { month: 'Feb 26', amount: 92.4 }, { month: 'Mar 26', amount: 96.1 },
  { month: 'Apr 26', amount: 98.7 }, { month: 'May 26', amount: 93.2 },
  { month: 'Jun 26', amount: 97.9 }, { month: 'Jul 26', amount: 97.87 },
]

export default function DashboardPreviewPage() {
  if (process.env.NODE_ENV === 'production') notFound()
  return (
    <DashboardClient
      user={{ name: 'Alex Rivers', email: 'alex@example.com' }}
      subscriptions={demoSubscriptions}
      transactions={demoTransactions}
      monthlySpend={demoMonthlySpend}
    />
  )
}
