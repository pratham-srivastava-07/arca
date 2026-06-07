import { getBudgets } from '@/actions/budgets'
import { BudgetClient } from './client'

export default async function BudgetPage() {
  const budgets = await getBudgets()
  return <BudgetClient initialBudgets={budgets} />
}
