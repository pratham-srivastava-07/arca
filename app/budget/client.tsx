'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Plus } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { BudgetGauge } from '@/components/ui/budget-gauge'
import { EmptyState } from '@/components/ui/empty-state'
import { BudgetModal } from '@/components/modals/budget-modal'
import { formatCurrency, getBudgetStatus } from '@/lib/utils'
import type { DbBudget as Budget } from '@/types'

const CATEGORY_ICONS: Record<string, string> = {
  'Food & Dining': '🍔',
  Entertainment: '🎬',
  Housing: '🏠',
  Transport: '🚗',
  Shopping: '🛍️',
  'Software & Tech': '💻',
  'Health & Fitness': '💪',
  Education: '📚',
  Other: '📦',
}

function NoBudgetsIllustration() {
  return (
    <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20">
      <span className="text-4xl">🧮</span>
    </div>
  )
}

export function BudgetClient({ initialBudgets }: { initialBudgets: Budget[] }) {
  const router = useRouter()
  const [budgets, setBudgets] = useState(initialBudgets)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null)

  useEffect(() => { setBudgets(initialBudgets) }, [initialBudgets])

  const totalLimit = budgets.reduce((s, b) => s + b.limit, 0)
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0)
  const healthPct = totalLimit > 0 ? Math.round(((totalLimit - totalSpent) / totalLimit) * 100) : 100

  const overBudget = budgets.filter((b) => getBudgetStatus(b.spent, b.limit) === 'danger')
  const nearLimit = budgets.filter((b) => getBudgetStatus(b.spent, b.limit) === 'warning')
  const healthy = budgets.filter((b) => getBudgetStatus(b.spent, b.limit) === 'safe')

  const handleAdd = () => {
    setEditingBudget(null)
    setModalOpen(true)
  }

  const handleEdit = (b: Budget) => {
    setEditingBudget(b)
    setModalOpen(true)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-4 sm:space-y-5">
      {/* Overview row */}
      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 min-[480px]:grid-cols-3 gap-2.5 sm:gap-3">
        <GlassCard padding="sm">
          <p className="text-xs text-muted-foreground">Total Budget</p>
          <p className="text-xl font-bold text-foreground tabular-nums mt-0.5">{formatCurrency(totalLimit)}</p>
        </GlassCard>
        <GlassCard padding="sm">
          <p className="text-xs text-muted-foreground">Total Spent</p>
          <p className="text-xl font-bold text-foreground tabular-nums mt-0.5">{formatCurrency(totalSpent)}</p>
        </GlassCard>
        <GlassCard padding="sm">
          <p className="text-xs text-muted-foreground">Budget Health</p>
          <p className={`text-xl font-bold tabular-nums mt-0.5 ${healthPct >= 50 ? 'text-green-500' : healthPct >= 25 ? 'text-amber-500' : 'text-red-500'}`}>
            {healthPct}%
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">{formatCurrency(Math.max(0, totalLimit - totalSpent))} remaining</p>
        </GlassCard>
      </motion.div>

      {budgets.length === 0 ? (
        <EmptyState
          illustration={<NoBudgetsIllustration />}
          title="No budgets yet"
          description="Set your first budget category to start tracking monthly spending limits."
          action={
            <button
              onClick={handleAdd}
              className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-brand text-brand-foreground text-xs font-medium hover:bg-[color-mix(in_oklch,var(--brand),#111_8%)] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />Set budget
            </button>
          }
        />
      ) : (
        <>
          {/* Health score ring + insights */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
              <GlassCard className="flex flex-col items-center justify-center py-6">
                <div className="relative w-28 h-28">
                  <svg width="112" height="112" className="absolute inset-0" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="56" cy="56" r="48" fill="none" stroke="var(--muted)" strokeWidth="6" />
                    <motion.circle
                      cx="56" cy="56" r="48"
                      fill="none"
                      stroke={healthPct >= 50 ? 'oklch(0.696 0.17 162.48)' : healthPct >= 25 ? 'oklch(0.769 0.188 70.08)' : 'oklch(0.637 0.237 25.33)'}
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 48}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 48 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 48 * (1 - healthPct / 100) }}
                      transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold text-foreground">{healthPct}%</p>
                    <p className="text-[10px] text-muted-foreground">health</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-foreground mt-3">Budget Score</p>
                <p className="text-xs text-muted-foreground mt-0.5 text-center max-w-[160px]">
                  {healthPct >= 70 ? 'Great discipline!' : healthPct >= 40 ? 'Watch your spending' : 'Budget needs attention'}
                </p>
              </GlassCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="xl:col-span-2">
              <GlassCard>
                <h3 className="text-sm font-semibold text-foreground mb-3">Insights</h3>
                <div className="space-y-2.5">
                  {overBudget.map((b) => (
                    <div key={b.id} className="flex items-start gap-2.5 p-2.5 rounded-md bg-red-500/8 border border-red-500/15">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-foreground">{b.category} over budget</p>
                        <p className="text-xs text-muted-foreground">Spent {formatCurrency(b.spent)} of {formatCurrency(b.limit)} limit</p>
                      </div>
                    </div>
                  ))}
                  {nearLimit.map((b) => (
                    <div key={b.id} className="flex items-start gap-2.5 p-2.5 rounded-md bg-amber-500/8 border border-amber-500/15">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-foreground">{b.category} near limit</p>
                        <p className="text-xs text-muted-foreground">Only {formatCurrency(b.limit - b.spent)} remaining</p>
                      </div>
                    </div>
                  ))}
                  {healthy.length > 0 && (
                    <div className="flex items-start gap-2.5 p-2.5 rounded-md bg-green-500/8 border border-green-500/15">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-foreground">{healthy.length} categories on track</p>
                        <p className="text-xs text-muted-foreground">{healthy.map((b) => b.category).join(', ')}</p>
                      </div>
                    </div>
                  )}
                  {overBudget.length === 0 && nearLimit.length === 0 && healthy.length === 0 && (
                    <p className="text-xs text-muted-foreground">No insights yet. Add spending data.</p>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Budget bars */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
            <GlassCard>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-semibold text-foreground">Categories</h3>
                <button
                  onClick={handleAdd}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted border border-border text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Plus className="w-3 h-3" />Add category
                </button>
              </div>
              <div className="space-y-5">
                {budgets.map((budget, i) => (
                  <div key={budget.id} onClick={() => handleEdit(budget)} className="cursor-pointer">
                    <BudgetGauge
                      category={budget.category}
                      icon={budget.icon ?? CATEGORY_ICONS[budget.category] ?? '💰'}
                      spent={budget.spent}
                      limit={budget.limit}
                      index={i}
                    />
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </>
      )}

      <BudgetModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditingBudget(null) }}
        editing={editingBudget}
        onSuccess={() => router.refresh()}
      />
    </div>
  )
}
