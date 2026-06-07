import { syncUser } from '@/actions/user'
import { SettingsClient } from './client'
import { redirect } from 'next/navigation'

export default async function SettingsPage() {
  const user = await syncUser()
  if (!user) redirect('/sign-in')
  return <SettingsClient user={{ id: user.id, name: user.name ?? '', email: user.email, createdAt: user.createdAt }} />
}
