import { notFound } from 'next/navigation'
import { ForecastingClient } from '@/app/forecasting/client'
import { demoSubscriptions } from '../_demo'

export default function ForecastingPreviewPage() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <ForecastingClient subscriptions={demoSubscriptions} />
}
