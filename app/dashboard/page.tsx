import { redirect } from 'next/navigation'
import { syncUser } from '@/actions/user'
import { getSubscriptions } from '@/actions/subscriptions'
import { getTransactions, getMonthlySpend } from '@/actions/transactions'
import { DashboardClient } from './client'

export default async function DashboardPage() {
  const user = await syncUser()
  if (!user) redirect('/signin')
  if (!user.onboardingCompleted) redirect('/onboarding')

  const [subscriptions, transactions, monthlySpend] = await Promise.all([
    getSubscriptions(),
    getTransactions(5),
    getMonthlySpend(),
  ])

  return (
    <DashboardClient
      user={{ name: user.name ?? 'there', email: user.email }}
      subscriptions={subscriptions}
      transactions={transactions}
      monthlySpend={monthlySpend}
    />
  )
}
