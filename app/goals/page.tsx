import { getGoals } from '@/actions/goals'
import { GoalsClient } from './client'

export default async function GoalsPage() {
  const goals = await getGoals()
  return <GoalsClient initialGoals={goals} />
}
