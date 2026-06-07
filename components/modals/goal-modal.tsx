'use client'
import { useState, useTransition, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'
import { createGoal, updateGoal } from '@/actions/goals'
import type { DbGoal as Goal } from '@/types'

const GOAL_ICONS = ['🛡️', '💻', '✈️', '🚗', '🏠', '📚', '💍', '🎓', '🏖️', '🎯']

interface FormState {
  title: string
  targetAmount: string
  currentAmount: string
  deadline: string
  icon: string
  description: string
}

const defaultForm = (): FormState => ({
  title: '',
  targetAmount: '',
  currentAmount: '0',
  deadline: '',
  icon: '🎯',
  description: '',
})

interface Props {
  open: boolean
  onClose: () => void
  editing?: Goal | null
  onSuccess?: () => void
}

export function GoalModal({ open, onClose, editing, onSuccess }: Props) {
  const [form, setForm] = useState<FormState>(defaultForm())
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState('')

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title,
        targetAmount: String(editing.targetAmount),
        currentAmount: String(editing.currentAmount),
        deadline: editing.deadline ? editing.deadline.toISOString().split('T')[0] : '',
        icon: editing.icon ?? '🎯',
        description: editing.description ?? '',
      })
    } else {
      setForm(defaultForm())
    }
    setError('')
  }, [editing, open])

  const set = (k: keyof FormState, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const submit = () => {
    const target = parseFloat(form.targetAmount)
    const current = parseFloat(form.currentAmount)
    if (!form.title.trim()) { setError('Title is required'); return }
    if (isNaN(target) || target <= 0) { setError('Enter a valid target amount'); return }
    setError('')

    startTransition(async () => {
      try {
        const payload = {
          title: form.title.trim(),
          targetAmount: target,
          currentAmount: isNaN(current) ? 0 : current,
          deadline: form.deadline || undefined,
          icon: form.icon,
          description: form.description || undefined,
        }
        if (editing) {
          await updateGoal(editing.id, payload)
        } else {
          await createGoal(payload)
        }
        onSuccess?.()
        onClose()
      } catch {
        setError('Something went wrong.')
      }
    })
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <h2 className="text-sm font-semibold text-foreground">
                  {editing ? 'Edit goal' : 'New goal'}
                </h2>
                <button onClick={onClose} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                {/* Icon picker */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Icon</label>
                  <div className="flex flex-wrap gap-2">
                    {GOAL_ICONS.map((icon) => (
                      <button
                        key={icon}
                        onClick={() => set('icon', icon)}
                        className={`w-9 h-9 text-lg rounded-lg border transition-colors ${
                          form.icon === icon ? 'border-primary bg-primary/10' : 'border-border bg-muted hover:border-border/80'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Goal name</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => set('title', e.target.value)}
                    placeholder="e.g. Emergency Fund"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Amounts */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Target ($)</label>
                    <input
                      type="number"
                      step="1"
                      min="0"
                      value={form.targetAmount}
                      onChange={(e) => set('targetAmount', e.target.value)}
                      placeholder="10000"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Current ($)</label>
                    <input
                      type="number"
                      step="1"
                      min="0"
                      value={form.currentAmount}
                      onChange={(e) => set('currentAmount', e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Deadline */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Deadline (optional)</label>
                  <input
                    type="date"
                    value={form.deadline}
                    onChange={(e) => set('deadline', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Description (optional)</label>
                  <input
                    type="text"
                    value={form.description}
                    onChange={(e) => set('description', e.target.value)}
                    placeholder="What is this goal for?"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {error && <p className="text-xs text-destructive">{error}</p>}
              </div>

              <div className="flex items-center gap-2.5 px-5 py-4 border-t border-border">
                <button onClick={onClose} className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Cancel
                </button>
                <button
                  onClick={submit}
                  disabled={pending}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all disabled:opacity-60"
                >
                  {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {editing ? 'Save changes' : 'Create goal'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
