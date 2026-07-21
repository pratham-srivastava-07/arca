import { notFound } from 'next/navigation'
import { SubscriptionsClient } from '@/app/subscriptions/client'
import { demoSubscriptions } from '../_demo'

export default function SubscriptionsPreviewPage() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <SubscriptionsClient initialSubscriptions={demoSubscriptions} />
}
