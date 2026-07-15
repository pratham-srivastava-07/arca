'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, type Variants } from 'framer-motion'
import { DollarSign, CreditCard, Calendar, TrendingUp, ArrowUpRight, ArrowDownLeft, Plus } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { MetricCard } from '@/components/ui/metric-card'
import { GlassCard } from '@/components/ui/glass-card'
import { ServiceLogo } from '@/components/ui/service-logo'
import { SubscriptionModal } from '@/components/modals/subscription-modal'
import { getGreeting, formatCurrency, formatDate, daysUntil } from '@/lib/utils'
import type { DbSubscription as Subscription } from '@/types'

interface Transaction {
  id: string
  amount: number
  category: string
  merchant: string
  date: Date
  type: 'debit' | 'credit'
}

interface Props {
  user: { name: string; email: string }
  subscriptions: Subscription[]
  transactions: Transaction[]
  monthlySpend: { month: string; amount: number }[]
}

const stagger: { container: Variants; item: Variants } = {
  container: { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } },
  item: {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
  },
}

interface TooltipProps { active?: boolean; payload?: { value: number }[]; label?: string }
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-xl">
      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-foreground">{formatCurrency(payload[0].value)}</p>
    </div>
  )
}

export function DashboardClient({ user, subscriptions, transactions, monthlySpend }: Props) {
  const [greeting, setGreeting] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const router = useRouter()
  useEffect(() => { setGreeting(getGreeting()) }, [])

  const activeSubs = subscriptions.filter((s) => s.status === 'active')
  const monthlyTotal = activeSubs.reduce((sum, s) => sum + (s.billingCycle === 'yearly' ? s.amount / 12 : s.amount), 0)
  const upcoming = activeSubs
    .filter((s) => daysUntil(s.nextPaymentDate.toISOString().split('T')[0]) <= 7)
    .reduce((sum, s) => sum + s.amount, 0)
  const ytdSpend = monthlySpend.reduce((sum, m) => sum + m.amount, 0)
  const topSubs = [...activeSubs].sort((a, b) => b.amount - a.amount).slice(0, 4)
  const avgMonthly = monthlySpend.length ? monthlySpend.reduce((a, m) => a + m.amount, 0) / monthlySpend.length : 0

  const firstName = user.name.split(' ')[0]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
      <SubscriptionModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSuccess={() => router.refresh()}
      />

      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        className="flex flex-wrap items-start justify-between gap-3"
      >
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{greeting}</p>
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight mt-0.5">
            Good to see you, {firstName}
          </h1>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add subscription
        </button>
      </motion.div>

      {/* Metric Cards */}
      <motion.div
        variants={stagger.container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-3"
      >
        <motion.div variants={stagger.item}>
          <MetricCard label="Monthly Spend" value={monthlyTotal} prefix="$" decimals={2} change={+4.2} icon={<DollarSign className="w-4 h-4" />} />
        </motion.div>
        <motion.div variants={stagger.item}>
          <MetricCard label="Active Subscriptions" value={activeSubs.length} change={0} icon={<CreditCard className="w-4 h-4" />} />
        </motion.div>
        <motion.div variants={stagger.item}>
          <MetricCard label="Due This Week" value={upcoming} prefix="$" decimals={2} change={-2.1} icon={<Calendar className="w-4 h-4" />} />
        </motion.div>
        <motion.div variants={stagger.item}>
          <MetricCard label="YTD Spend" value={ytdSpend} prefix="$" decimals={2} change={+11.8} icon={<TrendingUp className="w-4 h-4" />} />
        </motion.div>
      </motion.div>

      {/* Chart + Top Subscriptions */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="xl:col-span-3"
        >
          <GlassCard>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Monthly Spend</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Last 12 months</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Avg / month</p>
                <p className="text-sm font-semibold text-foreground">{formatCurrency(avgMonthly)}</p>
              </div>
            </div>
            {monthlySpend.length > 0 ? (
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlySpend} margin={{ top: 4, right: 0, bottom: 0, left: -20 }}>
                    <defs>
                      <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area dataKey="amount" stroke="var(--primary)" strokeWidth={2} fill="url(#spendGrad)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-44 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">No spending history yet</p>
              </div>
            )}
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.28 }}
          className="xl:col-span-2"
        >
          <GlassCard className="h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Top Subscriptions</h3>
              <span className="text-xs text-muted-foreground">{activeSubs.length} active</span>
            </div>
            {topSubs.length > 0 ? (
              <div className="space-y-3">
                {topSubs.map((sub, i) => (
                  <motion.div
                    key={sub.id}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: 0.3 + i * 0.06 }}
                    className="flex items-center gap-3"
                  >
                    <ServiceLogo name={sub.name} size={30} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{sub.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{sub.billingCycle}</p>
                    </div>
                    <p className="text-sm font-semibold text-foreground tabular-nums">{formatCurrency(sub.amount)}</p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-24 gap-2">
                <p className="text-sm text-muted-foreground">No subscriptions yet</p>
                <button
                  onClick={() => setAddOpen(true)}
                  className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add your first one
                </button>
              </div>
            )}
          </GlassCard>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.35 }}
      >
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Recent Transactions</h3>
            <span className="text-xs text-muted-foreground">Last {transactions.length}</span>
          </div>
          {transactions.length > 0 ? (
            <div className="space-y-0.5">
              {transactions.map((tx, i) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.38 + i * 0.05 }}
                  className="flex items-center gap-3 py-2.5 border-b border-border/40 last:border-0"
                >
                  <div className={`flex items-center justify-center w-7 h-7 rounded-md ${tx.type === 'credit' ? 'bg-green-500/10' : 'bg-muted'}`}>
                    {tx.type === 'credit' ? (
                      <ArrowDownLeft className="w-3.5 h-3.5 text-green-500" />
                    ) : (
                      <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{tx.merchant}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(tx.date.toISOString().split('T')[0])} · {tx.category}</p>
                  </div>
                  <p className={`text-sm font-semibold tabular-nums ${tx.type === 'credit' ? 'text-green-500' : 'text-foreground'}`}>
                    {tx.type === 'credit' ? '+' : '-'}{formatCurrency(Math.abs(tx.amount))}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-sm text-muted-foreground">No transactions yet</p>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </div>
  )
}
