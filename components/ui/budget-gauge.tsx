'use client'
import { motion } from 'framer-motion'
import { getBudgetStatus, formatCurrency } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface BudgetGaugeProps {
  category: string
  icon: string
  spent: number
  limit: number
  index?: number
}

export function BudgetGauge({ category, icon, spent, limit, index = 0 }: BudgetGaugeProps) {
  const percentage = Math.min(100, (spent / limit) * 100)
  const status = getBudgetStatus(spent, limit)
  const remaining = Math.max(0, limit - spent)

  const barColor =
    status === 'danger' ? 'bg-red-500' : status === 'warning' ? 'bg-amber-500' : 'bg-primary'

  const pctColor =
    status === 'danger' ? 'text-red-500' : status === 'warning' ? 'text-amber-500' : 'text-foreground'

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: 'easeOut' }}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 mb-1.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm">{icon}</span>
          <span className="text-sm font-medium text-foreground truncate">{category}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">
            <span className={cn('font-semibold', pctColor)}>{formatCurrency(spent)}</span>
            {' / '}{formatCurrency(limit)}
          </span>
          <span className={cn('text-xs font-semibold tabular-nums', pctColor)}>
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          className={cn('h-full rounded-full', barColor)}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.9, delay: index * 0.06 + 0.15, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        {remaining > 0 ? `${formatCurrency(remaining)} remaining` : 'Over budget'}
      </p>
    </motion.div>
  )
}
