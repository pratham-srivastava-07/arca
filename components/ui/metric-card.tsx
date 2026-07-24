'use client'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { AnimatedCounter } from './animated-counter'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  icon: React.ReactNode
  label: string
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  change?: number
  changeLabel?: string
  index?: number
  /** For metrics like spend where a decrease is the good direction */
  goodWhenDown?: boolean
}

export function MetricCard({
  icon,
  label,
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  change,
  changeLabel,
  index = 0,
  goodWhenDown = false,
}: MetricCardProps) {
  const isPositive = change !== undefined ? change >= 0 : true
  const isGood = goodWhenDown ? !isPositive : isPositive

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: 'easeOut' }}
      className="rounded-xl bg-card border border-border p-4 sm:p-5"
    >
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-secondary text-foreground">
          {icon}
        </div>
        {change !== undefined && (
          <span
            className={cn(
              'text-xs font-medium flex items-center gap-0.5',
              isGood ? 'text-emerald-500' : 'text-red-500'
            )}
          >
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(change).toFixed(1)}%
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground font-medium mb-1 uppercase tracking-wide">
        {label}
      </p>
      <p className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground tabular-nums">
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </p>
      {changeLabel && (
        <p className="text-xs text-muted-foreground mt-1">{changeLabel}</p>
      )}
    </motion.div>
  )
}
