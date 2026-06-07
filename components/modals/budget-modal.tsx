'use client'
import { useState, useTransition, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'
import { upsertBudget } from '@/actions/budgets'
import type { DbBudget as Budget } from '@/types'

const PRESET_CATEGORIES = [
  { name: 'Food & Dining', icon: '🍔', defaultLimit: 600 },
  { name: 'Entertainment', icon: '🎬', defaultLimit: 200 },
  { name: 'Shopping', icon: '🛍️', defaultLimit: 300 },
  { name: 'Transport', icon: '🚗', defaultLimit: 200 },
  { name: 'Software & Tech', icon: '💻', defaultLimit: 150 },
  { name: 'Health & Fitness', icon: '💪', defaultLimit: 100 },
  { name: 'Education', icon: '📚', defaultLimit: 100 },
  { name: 'Other', icon: '📦', defaultLimit: 200 },
]

interface FormState {
  category: string
  icon: string
  limit: string
}

interface Props {
  open: boolean
  onClose: () => void
  editing?: Budget | null
  onSuccess?: () => void
}

export function BudgetModal({ open, onClose, editing, onSuccess }: Props) {
  const [form, setForm] = useState<FormState>({ category: 'Food & Dining', icon: '🍔', limit: '600' })
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState('')

  useEffect(() => {
    if (editing) {
      setForm({ category: editing.category, icon: editing.icon ?? '📦', limit: String(editing.limit) })
    } else {
      const preset = PRESET_CATEGORIES[0]
      setForm({ category: preset.name, icon: preset.icon, limit: String(preset.defaultLimit) })
    }
    setError('')
  }, [editing, open])

  const handleCategorySelect = (cat: typeof PRESET_CATEGORIES[number]) => {
    setForm((p) => ({ ...p, category: cat.name, icon: cat.icon, limit: String(cat.defaultLimit) }))
  }

  const submit = () => {
    const limit = parseFloat(form.limit)
    if (isNaN(limit) || limit <= 0) { setError('Enter a valid limit'); return }
    setError('')

    startTransition(async () => {
      try {
        await upsertBudget({ category: form.category, limit, icon: form.icon })
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
                  {editing ? 'Edit budget' : 'Set budget'}
                </h2>
                <button onClick={onClose} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                {!editing && (
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-2">Category</label>
                    <div className="grid grid-cols-4 gap-2">
                      {PRESET_CATEGORIES.map((cat) => (
                        <button
                          key={cat.name}
                          onClick={() => handleCategorySelect(cat)}
                          className={`flex flex-col items-center gap-1.5 p-2.5 rounded-lg border text-center transition-colors ${
                            form.category === cat.name
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border bg-muted text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <span className="text-xl">{cat.icon}</span>
                          <span className="text-[10px] leading-tight">{cat.name.split(' ')[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {editing && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    <span className="text-2xl">{form.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{form.category}</p>
                      <p className="text-xs text-muted-foreground">Budget category</p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Monthly limit ($)</label>
                  <input
                    type="number"
                    step="10"
                    min="1"
                    value={form.limit}
                    onChange={(e) => setForm((p) => ({ ...p, limit: e.target.value }))}
                    placeholder="500"
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
                  {editing ? 'Save changes' : 'Set budget'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
