import { getSubscriptions } from '@/actions/subscriptions'
import { getMonthlySpend, getDailySpend } from '@/actions/transactions'
import { AnalyticsClient } from './client'

export default async function AnalyticsPage() {
  const [subscriptions, monthlySpend, dailySpend] = await Promise.all([
    getSubscriptions(),
    getMonthlySpend(),
    getDailySpend(84),
  ])
  return <AnalyticsClient subscriptions={subscriptions} monthlySpend={monthlySpend} dailySpend={dailySpend} />
}
