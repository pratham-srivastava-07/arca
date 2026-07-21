import { notFound } from 'next/navigation'
import { BudgetClient } from '@/app/budget/client'
import { demoBudgets } from '../_demo'

export default function BudgetPreviewPage() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <BudgetClient initialBudgets={demoBudgets} />
}
