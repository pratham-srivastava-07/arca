'use client'
import { useState, useTransition, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, type Variants } from 'framer-motion'
import { Plus, Calendar, Zap, Trash2, Pencil } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { GoalProgressRing } from '@/components/ui/goal-progress-ring'
import { EmptyState, NoGoalsIllustration } from '@/components/ui/empty-state'
import { GoalModal } from '@/components/modals/goal-modal'
import { deleteGoal } from '@/actions/goals'
import { formatCurrency, daysRemaining, getProgressPercent } from '@/lib/utils'
import type { DbGoal as Goal } from '@/types'

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: 'easeOut' } },
}

export function GoalsClient({ initialGoals }: { initialGoals: Goal[] }) {
  const router = useRouter()
  const [goals, setGoals] = useState(initialGoals)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
  const [, startTransition] = useTransition()

  useEffect(() => { setGoals(initialGoals) }, [initialGoals])

  const totalSaved = goals.reduce((s, g) => s + g.currentAmount, 0)
  const totalTarget = goals.reduce((s, g) => s + g.targetAmount, 0)
  const completedCount = goals.filter((g) => g.currentAmount >= g.targetAmount).length

  const handleDelete = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id))
    startTransition(async () => { await deleteGoal(id) })
  }

  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal)
    setModalOpen(true)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5 sm:space-y-6">
      {/* Summary */}
      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <div>
            <p className="text-xs text-muted-foreground">Total Saved</p>
            <p className="text-lg font-bold text-foreground tabular-nums">{formatCurrency(totalSaved)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Target</p>
            <p className="text-lg font-bold text-foreground tabular-nums">{formatCurrency(totalTarget)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Completed</p>
            <p className="text-lg font-bold text-foreground">{completedCount} / {goals.length}</p>
          </div>
        </div>
        <button
          onClick={() => { setEditingGoal(null); setModalOpen(true) }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-brand text-brand-foreground text-xs font-medium hover:bg-[color-mix(in_oklch,var(--brand),#111_8%)] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />New Goal
        </button>
      </motion.div>

      {goals.length === 0 ? (
        <EmptyState
          illustration={<NoGoalsIllustration />}
          title="No goals yet"
          description="Set a financial goal to start tracking your progress toward financial freedom."
          action={
            <button
              onClick={() => { setEditingGoal(null); setModalOpen(true) }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-brand text-brand-foreground text-xs font-medium hover:bg-[color-mix(in_oklch,var(--brand),#111_8%)] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />Create goal
            </button>
          }
        />
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"
        >
          {goals.map((goal) => {
            const progress = getProgressPercent(goal.currentAmount, goal.targetAmount)
            const days = goal.deadline ? daysRemaining(goal.deadline.toISOString().split('T')[0]) : null
            const remaining = goal.targetAmount - goal.currentAmount
            const done = goal.currentAmount >= goal.targetAmount
            const monthlyVelocity = days && days > 0 ? Math.max(0, remaining / (days / 30)) : null

            return (
              <motion.div key={goal.id} variants={cardVariants}>
                <GlassCard hover className="group">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <GoalProgressRing progress={progress} size={80} strokeWidth={5}>
                      <div className="text-center">
                        <p className="text-sm font-bold text-foreground leading-none">{Math.round(progress)}%</p>
                      </div>
                    </GoalProgressRing>
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          {goal.icon && <span className="text-base">{goal.icon}</span>}
                          <p className="text-sm font-semibold text-foreground truncate">{goal.title}</p>
                        </div>
                        <div className="flex items-center gap-0.5 shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(goal)}
                            aria-label="Edit goal"
                            className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Pencil className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDelete(goal.id)}
                            aria-label="Delete goal"
                            className="p-2 rounded-md hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      {done && (
                        <span className="inline-block text-[10px] font-semibold text-green-500 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full mt-1">
                          Completed
                        </span>
                      )}
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
                      </p>
                      {!done && remaining > 0 && (
                        <p className="text-xs text-muted-foreground mt-0.5">{formatCurrency(remaining)} to go</p>
                      )}
                      <div className="flex items-center gap-3 mt-3">
                        {days !== null && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>{days > 0 ? `${days}d left` : 'Overdue'}</span>
                          </div>
                        )}
                        {monthlyVelocity !== null && monthlyVelocity > 0 && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Zap className="w-3 h-3" />
                            <span>{formatCurrency(monthlyVelocity)}/mo needed</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>
      )}

      <GoalModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditingGoal(null) }}
        editing={editingGoal}
        onSuccess={() => router.refresh()}
      />
    </div>
  )
}
