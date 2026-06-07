'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { GlassCard } from '@/components/ui/glass-card'
import { formatCurrency } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { DbSubscription as Subscription } from '@/types'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

interface TipEntry { name: string; value: number; color: string }
interface TipProps { active?: boolean; payload?: TipEntry[]; label?: string }

const CustomTooltip = ({ active, payload, label }: TipProps) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-xl text-sm">
      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="font-semibold" style={{ color: p.color }}>
          {p.name}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  )
}

interface Scenario {
  subscriptionId: string
  name: string
  type: 'price_change' | 'cancel'
  delta: number
}

export function ForecastingClient({ subscriptions }: { subscriptions: Subscription[] }) {
  const activeSubs = subscriptions.filter((s) => s.status === 'active')
  const [scenarios, setScenarios] = useState<Scenario[]>([])

  const baseMonthly = activeSubs.reduce((sum, s) => {
    if (s.billingCycle === 'yearly') return sum + s.amount / 12
    return sum + s.amount
  }, 0)

  const scenarioDelta = scenarios.reduce((sum, sc) => sum + sc.delta, 0)
  const projectedMonthly = Math.max(0, baseMonthly + scenarioDelta)

  const chartData = MONTHS.map((month, i) => {
    const growth = 1 + i * 0.005
    return {
      month,
      base: +(baseMonthly * growth).toFixed(2),
      projected: +(projectedMonthly * growth).toFixed(2),
    }
  })

  const annualBase = chartData.reduce((a, d) => a + d.base, 0)
  const annualProjected = chartData.reduce((a, d) => a + d.projected, 0)

  const toggleScenario = (sub: Subscription, type: 'price_change' | 'cancel', delta: number) => {
    const key = `${sub.id}_${type}`
    setScenarios((prev) => {
      const exists = prev.find((sc) => sc.subscriptionId === sub.id && sc.type === type)
      if (exists) return prev.filter((sc) => !(sc.subscriptionId === sub.id && sc.type === type))
      return [...prev, { subscriptionId: sub.id, name: sub.name, type, delta }]
    })
  }

  const isActive = (sub: Subscription, type: string) =>
    scenarios.some((sc) => sc.subscriptionId === sub.id && sc.type === type)

  return (
    <div className="max-w-5xl mx-auto px-5 py-8 space-y-5">
      {/* Summary */}
      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-3">
        {[
          { label: 'Base Monthly', value: baseMonthly },
          { label: 'Projected Monthly', value: projectedMonthly, highlight: scenarioDelta !== 0 },
          { label: 'Annual Cost', value: annualProjected },
        ].map((item, i) => (
          <GlassCard key={i} padding="sm">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className={cn('text-xl font-bold tabular-nums mt-0.5', item.highlight ? 'text-primary' : 'text-foreground')}>
              {formatCurrency(item.value)}
            </p>
            {item.highlight && scenarioDelta !== 0 && (
              <p className={cn('text-xs mt-0.5', scenarioDelta > 0 ? 'text-red-500' : 'text-green-500')}>
                {scenarioDelta > 0 ? '+' : ''}{formatCurrency(scenarioDelta)}/mo
              </p>
            )}
          </GlassCard>
        ))}
      </motion.div>

      {/* What-if scenarios per subscription */}
      {activeSubs.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <GlassCard>
            <h3 className="text-sm font-semibold text-foreground mb-3">What-if Scenarios</h3>
            <p className="text-xs text-muted-foreground mb-3">Toggle scenarios to see how they affect your spending forecast.</p>
            <div className="flex flex-wrap gap-2">
              {activeSubs.map((sub) => {
                const monthlyAmount = sub.billingCycle === 'yearly' ? sub.amount / 12 : sub.amount
                const increase20 = monthlyAmount * 0.2
                const cancelDelta = -monthlyAmount
                return (
                  <div key={sub.id} className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleScenario(sub, 'price_change', +increase20)}
                      className={cn(
                        'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-medium transition-colors',
                        isActive(sub, 'price_change')
                          ? 'bg-red-500/10 border-red-500/30 text-red-500'
                          : 'bg-muted border-border text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {sub.name} +20%
                      <span className={cn('font-semibold', isActive(sub, 'price_change') ? 'text-red-500' : 'text-muted-foreground')}>
                        +{formatCurrency(increase20)}
                      </span>
                    </button>
                    <button
                      onClick={() => toggleScenario(sub, 'cancel', cancelDelta)}
                      className={cn(
                        'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border text-xs font-medium transition-colors',
                        isActive(sub, 'cancel')
                          ? 'bg-green-500/10 border-green-500/30 text-green-500'
                          : 'bg-muted border-border text-muted-foreground hover:text-foreground'
                      )}
                    >
                      Cancel {sub.name}
                      <span className={cn('font-semibold', isActive(sub, 'cancel') ? 'text-green-500' : 'text-muted-foreground')}>
                        -{formatCurrency(Math.abs(cancelDelta))}
                      </span>
                    </button>
                  </div>
                )
              })}
            </div>
            {scenarios.length > 0 && (
              <p className="text-xs text-muted-foreground mt-3">
                {scenarios.map((sc) =>
                  sc.type === 'cancel' ? `Cancel ${sc.name}` : `${sc.name} price +20%`
                ).join(' · ')}
              </p>
            )}
          </GlassCard>
        </motion.div>
      )}

      {/* Forecast chart */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}>
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">12-Month Forecast</h3>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 inline-block bg-muted-foreground rounded" />Base
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 inline-block bg-primary rounded" />Projected
              </span>
            </div>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 4, right: 0, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="base" stroke="var(--muted-foreground)" strokeWidth={1.5} dot={false} name="Base" strokeDasharray="4 2" />
                <Line type="monotone" dataKey="projected" stroke="var(--primary)" strokeWidth={2} dot={false} name="Projected" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </motion.div>

      {/* Per-subscription breakdown */}
      {activeSubs.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <GlassCard>
            <h3 className="text-sm font-semibold text-foreground mb-4">Annual Cost Breakdown</h3>
            <div className="space-y-3">
              {activeSubs.map((sub, i) => {
                const annual = sub.billingCycle === 'yearly' ? sub.amount : sub.amount * 12
                const pct = annualBase > 0 ? (annual / annualBase) * 100 : 0
                return (
                  <motion.div
                    key={sub.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.22 + i * 0.04 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-medium text-foreground">{sub.name}</p>
                        <p className="text-xs font-semibold text-foreground tabular-nums">{formatCurrency(annual)}/yr</p>
                      </div>
                      <div className="h-1 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: 0.25 + i * 0.04, ease: [0.34, 1.56, 0.64, 1] }}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground tabular-nums w-8 text-right">{pct.toFixed(0)}%</p>
                  </motion.div>
                )
              })}
            </div>
          </GlassCard>
        </motion.div>
      )}

      {activeSubs.length === 0 && (
        <GlassCard>
          <div className="py-12 text-center">
            <p className="text-4xl mb-3">📈</p>
            <p className="text-sm font-semibold text-foreground mb-1">No subscriptions to forecast</p>
            <p className="text-xs text-muted-foreground">Add subscriptions to see your spending forecast.</p>
          </div>
        </GlassCard>
      )}
    </div>
  )
}
