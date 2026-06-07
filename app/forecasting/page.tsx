import { getSubscriptions } from '@/actions/subscriptions'
import { ForecastingClient } from './client'

export default async function ForecastingPage() {
  const subscriptions = await getSubscriptions()
  return <ForecastingClient subscriptions={subscriptions} />
}
