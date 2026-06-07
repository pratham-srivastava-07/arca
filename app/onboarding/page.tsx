import { redirect } from 'next/navigation'
import { syncUser } from '@/actions/user'
import { OnboardingClient } from './client'

export default async function OnboardingPage() {
  const user = await syncUser()
  if (!user) redirect('/sign-in')
  if (user.onboardingCompleted) redirect('/dashboard')
  return <OnboardingClient userName={user.name ?? 'there'} />
}
