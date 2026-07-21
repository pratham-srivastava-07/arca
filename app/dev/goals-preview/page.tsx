import { notFound } from 'next/navigation'
import { GoalsClient } from '@/app/goals/client'
import { demoGoals } from '../_demo'

export default function GoalsPreviewPage() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <GoalsClient initialGoals={demoGoals} />
}
