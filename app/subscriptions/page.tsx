import { getSubscriptions } from '@/actions/subscriptions'
import { SubscriptionsClient } from './client'

export default async function SubscriptionsPage() {
  const subscriptions = await getSubscriptions()
  return <SubscriptionsClient initialSubscriptions={subscriptions} />
}
