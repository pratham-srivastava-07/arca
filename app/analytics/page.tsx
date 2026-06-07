import { getSubscriptions } from '@/actions/subscriptions'
import { getMonthlySpend } from '@/actions/transactions'
import { AnalyticsClient } from './client'

export default async function AnalyticsPage() {
  const [subscriptions, monthlySpend] = await Promise.all([
    getSubscriptions(),
    getMonthlySpend(),
  ])
  return <AnalyticsClient subscriptions={subscriptions} monthlySpend={monthlySpend} />
}
