'use client'
import { useState, useTransition, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'
import { createSubscription, updateSubscription } from '@/actions/subscriptions'
import type { DbSubscription as Subscription } from '@/types'

const CATEGORIES = [
  'Entertainment', 'Music', 'AI Tools', 'Development', 'Cloud',
  'Design', 'Productivity', 'Education', 'Health', 'Security', 'Storage', 'Other',
]

const QUICK_SERVICES = [
  { name: 'Netflix', logoBg: '#E50914', logoColor: '#fff', amount: 15.99, category: 'Entertainment' },
  { name: 'Spotify', logoBg: '#1DB954', logoColor: '#000', amount: 9.99, category: 'Music' },
  { name: 'YouTube Premium', logoBg: '#FF0000', logoColor: '#fff', amount: 13.99, category: 'Entertainment' },
  { name: 'ChatGPT Plus', logoBg: '#10A37F', logoColor: '#fff', amount: 20.00, category: 'AI Tools' },
  { name: 'GitHub Pro', logoBg: '#24292e', logoColor: '#fff', amount: 4.00, category: 'Development' },
  { name: 'Notion', logoBg: '#000000', logoColor: '#fff', amount: 8.00, category: 'Productivity' },
  { name: 'Figma', logoBg: '#F24E1E', logoColor: '#fff', amount: 12.00, category: 'Design' },
  { name: 'AWS', logoBg: '#FF9900', logoColor: '#000', amount: 0, category: 'Cloud' },
]

interface FormState {
  name: string
  category: string
  amount: string
  billingCycle: 'monthly' | 'yearly' | 'weekly'
  nextPaymentDate: string
  status: 'active' | 'paused'
  description: string
  logoBg: string
  logoColor: string
}

const defaultForm = (): FormState => ({
  name: '',
  category: 'Other',
  amount: '',
  billingCycle: 'monthly',
  nextPaymentDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
  status: 'active',
  description: '',
  logoBg: '',
  logoColor: '',
})

interface Props {
  open: boolean
  onClose: () => void
  editing?: Subscription | null
  onSuccess?: () => void
}

export function SubscriptionModal({ open, onClose, editing, onSuccess }: Props) {
  const [form, setForm] = useState<FormState>(defaultForm())
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState('')

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name,
        category: editing.category,
        amount: String(editing.amount),
        billingCycle: editing.billingCycle as FormState['billingCycle'],
        nextPaymentDate: editing.nextPaymentDate.toISOString().split('T')[0],
        status: editing.status as FormState['status'],
        description: editing.description ?? '',
        logoBg: editing.logoBg ?? '',
        logoColor: editing.logoColor ?? '',
      })
    } else {
      setForm(defaultForm())
    }
    setError('')
  }, [editing, open])

  const set = (k: keyof FormState, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const applyQuick = (svc: typeof QUICK_SERVICES[number]) => {
    setForm((p) => ({
      ...p,
      name: svc.name,
      category: svc.category,
      amount: svc.amount > 0 ? String(svc.amount) : p.amount,
      logoBg: svc.logoBg,
      logoColor: svc.logoColor,
    }))
  }

  const submit = () => {
    const amount = parseFloat(form.amount)
    if (!form.name.trim()) { setError('Name is required'); return }
    if (isNaN(amount) || amount <= 0) { setError('Enter a valid amount'); return }
    setError('')

    startTransition(async () => {
      try {
        const payload = {
          name: form.name.trim(),
          category: form.category,
          amount,
          billingCycle: form.billingCycle,
          nextPaymentDate: form.nextPaymentDate,
          status: form.status,
          description: form.description || undefined,
          logoBg: form.logoBg || undefined,
          logoColor: form.logoColor || undefined,
        }
        if (editing) {
          await updateSubscription(editing.id, payload)
        } else {
          await createSubscription(payload)
        }
        onSuccess?.()
        onClose()
      } catch {
        setError('Something went wrong. Please try again.')
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
            <div className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <h2 className="text-sm font-semibold text-foreground">
                  {editing ? 'Edit subscription' : 'Add subscription'}
                </h2>
                <button onClick={onClose} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
                {/* Quick-select (only when adding) */}
                {!editing && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Quick add popular service</p>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_SERVICES.map((svc) => (
                        <button
                          key={svc.name}
                          onClick={() => applyQuick(svc)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium transition-colors ${
                            form.name === svc.name
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border bg-muted text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded text-[10px] font-bold flex items-center justify-center"
                            style={{ backgroundColor: svc.logoBg, color: svc.logoColor }}
                          >
                            {svc.name[0]}
                          </span>
                          {svc.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Service name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="e.g. Netflix"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Amount + Cycle */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Amount ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={form.amount}
                      onChange={(e) => set('amount', e.target.value)}
                      placeholder="0.00"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Billing cycle</label>
                    <select
                      value={form.billingCycle}
                      onChange={(e) => set('billingCycle', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => set('category', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Next payment date */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Next payment date</label>
                  <input
                    type="date"
                    value={form.nextPaymentDate}
                    onChange={(e) => set('nextPaymentDate', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Status</label>
                  <div className="flex rounded-lg border border-border overflow-hidden">
                    {(['active', 'paused'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => set('status', s)}
                        className={`flex-1 py-2 text-xs font-medium capitalize transition-colors ${
                          form.status === s ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Description (optional)</label>
                  <input
                    type="text"
                    value={form.description}
                    onChange={(e) => set('description', e.target.value)}
                    placeholder="e.g. Standard plan"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {error && <p className="text-xs text-destructive">{error}</p>}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-2.5 px-5 py-4 border-t border-border">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submit}
                  disabled={pending}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all disabled:opacity-60"
                >
                  {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {editing ? 'Save changes' : 'Add subscription'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
