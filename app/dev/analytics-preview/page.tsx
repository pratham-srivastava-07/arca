import { notFound } from 'next/navigation'
import { AnalyticsClient } from '@/app/analytics/client'
import { demoSubscriptions, demoMonthlySpend, demoDailySpend } from '../_demo'

export default function AnalyticsPreviewPage() {
  if (process.env.NODE_ENV === 'production') notFound()
  return (
    <AnalyticsClient
      subscriptions={demoSubscriptions}
      monthlySpend={demoMonthlySpend}
      dailySpend={demoDailySpend}
    />
  )
}
