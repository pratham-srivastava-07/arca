'use client'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts'
import { GlassCard } from '@/components/ui/glass-card'
import { formatCurrency, cn } from '@/lib/utils'
import type { DbSubscription as Subscription } from '@/types'

type TimeRange = 'day' | 'week' | 'month' | 'year'

const RANGES: { label: string; value: TimeRange }[] = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
  { label: 'Year', value: 'year' },
]

interface TipProps { active?: boolean; payload?: { value: number; name?: string; color?: string }[]; label?: string }

const AreaTip = ({ active, payload, label }: TipProps) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-xl text-sm">
      <p className="text-muted-foreground text-xs mb-0.5">{label}</p>
      <p className="font-semibold text-foreground">{formatCurrency(payload[0].value)}</p>
    </div>
  )
}

const PieTip = ({ active, payload }: TipProps) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-xl text-sm">
      <p className="text-muted-foreground text-xs">{payload[0].name}</p>
      <p className="font-semibold text-foreground">{formatCurrency(payload[0].value)}</p>
    </div>
  )
}

const LineTip = ({ active, payload, label }: TipProps) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-xl text-sm">
      <p className="text-muted-foreground text-xs mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-xs font-semibold" style={{ color: p.color }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  )
}

const INDIGO_SHADES = [
  'oklch(0.585 0.233 264.531)',
  'oklch(0.52 0.21 264)',
  'oklch(0.47 0.19 264)',
  'oklch(0.43 0.17 264)',
  'oklch(0.39 0.15 264)',
  'oklch(0.36 0.12 264)',
]

function HeatmapCell({ value, max }: { value: number; max: number }) {
  const intensity = max > 0 ? value / max : 0
  return (
    <div
      className="w-3 h-3 rounded-sm"
      style={{
        backgroundColor: intensity === 0
          ? 'var(--muted)'
          : `oklch(${0.585 - intensity * 0.12} ${0.233 * intensity + 0.05} 264.531 / ${0.2 + intensity * 0.8})`,
      }}
      title={formatCurrency(value)}
    />
  )
}

interface Props {
  subscriptions: Subscription[]
  monthlySpend: { month: string; amount: number }[]
  dailySpend: { date: string; amount: number }[]
}

export function AnalyticsClient({ subscriptions, monthlySpend, dailySpend }: Props) {
  const [range, setRange] = useState<TimeRange>('month')

  const chartData = useMemo(() => {
    if (monthlySpend.length === 0) return []
    if (range === 'year') return monthlySpend
    if (range === 'month') return monthlySpend.slice(-6)
    if (range === 'week') return monthlySpend.slice(-3)
    return monthlySpend.slice(-1)
  }, [range, monthlySpend])

  const total = chartData.reduce((a, m) => a + m.amount, 0)
  const avg = chartData.length ? total / chartData.length : 0

  // Category breakdown from subscriptions
  const categorySpend = useMemo(() => {
    const byCat: Record<string, number> = {}
    for (const sub of subscriptions.filter((s) => s.status === 'active')) {
      const monthly = sub.billingCycle === 'yearly' ? sub.amount / 12 : sub.amount
      byCat[sub.category] = (byCat[sub.category] ?? 0) + monthly
    }
    return Object.entries(byCat).map(([category, amount]) => ({ category, amount: +amount.toFixed(2) }))
  }, [subscriptions])

  // Subscription growth simulated from monthly data
  const subscriptionGrowth = useMemo(() => {
    const total = subscriptions.length
    return monthlySpend.map((m, i) => ({
      month: m.month,
      count: Math.max(1, total - (monthlySpend.length - 1 - i)),
    }))
  }, [subscriptions.length, monthlySpend])

  const maxHeatmap = dailySpend.length ? Math.max(...dailySpend.map((d) => d.amount)) : 0
  const weeksData: number[][] = []
  for (let i = 0; i < dailySpend.length; i += 7) {
    weeksData.push(dailySpend.slice(i, i + 7).map((d) => d.amount))
  }

  const hasData = monthlySpend.length > 0

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-4 sm:space-y-5">
      {/* Range selector + summary */}
      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-lg font-bold text-foreground tabular-nums">{formatCurrency(total)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Avg / period</p>
            <p className="text-lg font-bold text-foreground tabular-nums">{formatCurrency(avg)}</p>
          </div>
        </div>
        <div className="flex items-center self-stretch sm:self-auto rounded-md border border-border overflow-hidden">
          {RANGES.map((r) => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={cn('flex-1 sm:flex-none px-3 sm:px-3.5 py-2 sm:py-1.5 text-xs font-medium transition-colors border-r border-border last:border-0',
                range === r.value ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Spend trend chart */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}>
        <GlassCard>
          <h3 className="text-sm font-semibold text-foreground mb-4">Spend Trend</h3>
          {hasData ? (
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 4, right: 0, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                  <Tooltip content={<AreaTip />} />
                  <Area dataKey="amount" stroke="var(--primary)" strokeWidth={2} fill="url(#aGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-52 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">No spending data yet. Add transactions to see trends.</p>
            </div>
          )}
        </GlassCard>
      </motion.div>

      {/* Category + Subscription Growth */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
          <GlassCard>
            <h3 className="text-sm font-semibold text-foreground mb-4">Category Breakdown</h3>
            {categorySpend.length > 0 ? (
              <div className="flex flex-col min-[480px]:flex-row items-center gap-4">
                <div className="w-36 h-36 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categorySpend} cx="50%" cy="50%" innerRadius={42} outerRadius={62} dataKey="amount" strokeWidth={0}>
                        {categorySpend.map((_, i) => (
                          <Cell key={i} fill={INDIGO_SHADES[i % INDIGO_SHADES.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<PieTip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 w-full min-[480px]:w-auto min-[480px]:flex-1 min-w-0">
                  {categorySpend.map((cat, i) => (
                    <div key={cat.category} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: INDIGO_SHADES[i % INDIGO_SHADES.length] }} />
                      <span className="text-xs text-muted-foreground flex-1 truncate">{cat.category}</span>
                      <span className="text-xs font-semibold text-foreground tabular-nums">{formatCurrency(cat.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-[172px] flex items-center justify-center">
                <p className="text-sm text-muted-foreground">No subscriptions to break down.</p>
              </div>
            )}
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
          <GlassCard>
            <h3 className="text-sm font-semibold text-foreground mb-4">Subscription Growth</h3>
            {subscriptionGrowth.length > 0 ? (
              <div className="h-[172px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={subscriptionGrowth} margin={{ top: 4, right: 0, bottom: 0, left: -28 }}>
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} allowDecimals={false} />
                    <Tooltip content={<LineTip />} />
                    <Line type="monotone" dataKey="count" stroke="var(--primary)" strokeWidth={2} dot={false} name="Subscriptions" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[172px] flex items-center justify-center">
                <p className="text-sm text-muted-foreground">No data yet.</p>
              </div>
            )}
          </GlassCard>
        </motion.div>
      </div>

      {/* Bar chart */}
      {hasData && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <GlassCard>
            <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Comparison</h3>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 4, right: 0, bottom: 0, left: -20 }} barSize={12} barCategoryGap="40%">
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                  <Tooltip content={<AreaTip />} />
                  <Bar dataKey="amount" fill="var(--primary)" radius={[3, 3, 0, 0]} fillOpacity={0.85} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Heatmap */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Spending Heatmap</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Last 12 weeks</p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span>Less</span>
              {[0, 0.25, 0.5, 0.75, 1].map((v, i) => (
                <div key={i} className="w-3 h-3 rounded-sm" style={{
                  backgroundColor: v === 0 ? 'var(--muted)' : `oklch(${0.585 - v * 0.12} ${0.233 * v + 0.05} 264.531 / ${0.2 + v * 0.8})`,
                }} />
              ))}
              <span>More</span>
            </div>
          </div>
          <div className="flex gap-1 overflow-x-auto pb-1">
            {weeksData.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((amt, di) => (
                  <HeatmapCell key={di} value={amt} max={maxHeatmap} />
                ))}
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}
