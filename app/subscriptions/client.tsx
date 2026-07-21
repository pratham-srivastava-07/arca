'use client'
import { useState, useTransition, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { LayoutGrid, List, Plus, Pencil, Pause, Play, Trash2, Bell, BellOff } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { ServiceLogo } from '@/components/ui/service-logo'
import { EmptyState, NoSubscriptionsIllustration } from '@/components/ui/empty-state'
import { SubscriptionModal } from '@/components/modals/subscription-modal'
import { deleteSubscription, updateSubscription, toggleReminder } from '@/actions/subscriptions'
import { useAppStore } from '@/stores/app-store'
import { formatCurrency, daysUntil } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { DbSubscription as Subscription } from '@/types'

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full border',
      status === 'active'
        ? 'bg-green-500/10 text-green-500 border-green-500/20'
        : 'bg-muted text-muted-foreground border-border'
    )}>
      <span className={cn('w-1.5 h-1.5 rounded-full', status === 'active' ? 'bg-green-500' : 'bg-muted-foreground')} />
      {status === 'active' ? 'Active' : 'Paused'}
    </span>
  )
}

interface GridCardProps {
  sub: Subscription
  onEdit: (sub: Subscription) => void
  onDelete: (id: string) => void
  onToggleStatus: (sub: Subscription) => void
  onToggleReminder: (sub: Subscription) => void
}

function GridCard({ sub, onEdit, onDelete, onToggleStatus, onToggleReminder }: GridCardProps) {
  const [hovered, setHovered] = useState(false)
  const days = daysUntil(sub.nextPaymentDate.toISOString().split('T')[0])

  return (
    <motion.div variants={itemVariants} onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)} className="relative">
      <GlassCard hover className="relative overflow-hidden">
        <div className="flex items-start justify-between mb-4">
          <ServiceLogo name={sub.name} size={38} />
          <StatusBadge status={sub.status} />
        </div>
        <p className="text-sm font-semibold text-foreground">{sub.name}</p>
        <p className="text-xs text-muted-foreground mt-0.5 mb-3">{sub.category}</p>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-lg font-bold text-foreground tabular-nums">{formatCurrency(sub.amount)}</p>
            <p className="text-xs text-muted-foreground capitalize">{sub.billingCycle}</p>
          </div>
          <p className={cn('text-xs font-medium', days <= 3 ? 'text-amber-500' : 'text-muted-foreground')}>
            {days === 0 ? 'Due today' : days === 1 ? 'Tomorrow' : `${days}d`}
          </p>
        </div>
        {/* Touch devices: always-visible action row */}
        <div className="flex sm:hidden items-center gap-1.5 mt-3 pt-3 border-t border-border/40">
          <button
            onClick={() => onEdit(sub)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md bg-muted text-foreground text-xs font-medium transition-colors"
          >
            <Pencil className="w-3 h-3" />Edit
          </button>
          <button
            onClick={() => onToggleStatus(sub)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md bg-muted text-muted-foreground text-xs font-medium transition-colors"
          >
            {sub.status === 'active'
              ? <><Pause className="w-3 h-3" />Pause</>
              : <><Play className="w-3 h-3" />Resume</>}
          </button>
          <button
            onClick={() => onToggleReminder(sub)}
            aria-label={sub.reminderEnabled ? 'Disable renewal reminder' : 'Enable renewal reminder'}
            className={cn(
              'flex items-center justify-center w-9 h-9 rounded-md bg-muted transition-colors',
              sub.reminderEnabled ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {sub.reminderEnabled ? <Bell className="w-3.5 h-3.5" /> : <BellOff className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => onDelete(sub.id)}
            aria-label="Delete subscription"
            className="flex items-center justify-center w-9 h-9 rounded-md bg-red-500/10 text-red-500 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="absolute inset-0 bg-card/92 backdrop-blur-sm hidden sm:flex items-center justify-center gap-2 rounded-xl"
            >
              <button
                onClick={() => onEdit(sub)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted hover:bg-muted/70 text-foreground text-xs font-medium transition-colors"
              >
                <Pencil className="w-3 h-3" />Edit
              </button>
              <button
                onClick={() => onToggleStatus(sub)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted hover:bg-muted/70 text-muted-foreground text-xs font-medium transition-colors"
              >
                {sub.status === 'active'
                  ? <><Pause className="w-3 h-3" />Pause</>
                  : <><Play className="w-3 h-3" />Resume</>}
              </button>
              <button
                onClick={() => onToggleReminder(sub)}
                aria-label={sub.reminderEnabled ? 'Disable renewal reminder' : 'Enable renewal reminder'}
                title={sub.reminderEnabled ? 'Reminder on' : 'Remind me 3 days before renewal'}
                className={cn(
                  'p-1.5 rounded-md bg-muted hover:bg-muted/70 transition-colors',
                  sub.reminderEnabled ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {sub.reminderEnabled ? <Bell className="w-3 h-3" /> : <BellOff className="w-3 h-3" />}
              </button>
              <button
                onClick={() => onDelete(sub.id)}
                className="p-1.5 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  )
}

interface ListRowProps {
  sub: Subscription
  index: number
  onEdit: (sub: Subscription) => void
  onDelete: (id: string) => void
  onToggleStatus: (sub: Subscription) => void
  onToggleReminder: (sub: Subscription) => void
}

function ListRow({ sub, index, onEdit, onDelete, onToggleStatus, onToggleReminder }: ListRowProps) {
  const days = daysUntil(sub.nextPaymentDate.toISOString().split('T')[0])

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="flex items-center gap-2.5 sm:gap-4 py-3 border-b border-border/40 last:border-0 group"
    >
      <ServiceLogo name={sub.name} size={32} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{sub.name}</p>
        <p className="text-xs text-muted-foreground truncate">{sub.category}</p>
      </div>
      <div className="hidden md:block">
        <StatusBadge status={sub.status} />
      </div>
      <p className={cn('text-xs hidden sm:block w-20 text-right', days <= 3 ? 'text-amber-500' : 'text-muted-foreground')}>
        {days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `${days}d left`}
      </p>
      <p className="text-sm font-semibold text-foreground tabular-nums w-16 text-right shrink-0">{formatCurrency(sub.amount)}</p>
      <div className="flex items-center gap-0.5 sm:gap-1 shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
        <button onClick={() => onEdit(sub)} aria-label="Edit" className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
          <Pencil className="w-3 h-3" />
        </button>
        <button onClick={() => onToggleStatus(sub)} aria-label={sub.status === 'active' ? 'Pause' : 'Resume'} className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
          {sub.status === 'active' ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </button>
        <button
          onClick={() => onToggleReminder(sub)}
          aria-label={sub.reminderEnabled ? 'Disable renewal reminder' : 'Enable renewal reminder'}
          title={sub.reminderEnabled ? 'Reminder on' : 'Remind me 3 days before renewal'}
          className={cn(
            'p-2 rounded-md hover:bg-muted transition-colors',
            sub.reminderEnabled ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {sub.reminderEnabled ? <Bell className="w-3 h-3" /> : <BellOff className="w-3 h-3" />}
        </button>
        <button onClick={() => onDelete(sub.id)} aria-label="Delete" className="p-2 rounded-md hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors">
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  )
}

export function SubscriptionsClient({ initialSubscriptions }: { initialSubscriptions: Subscription[] }) {
  const router = useRouter()
  const view = useAppStore((s) => s.subscriptionView)
  const setView = useAppStore((s) => s.setSubscriptionView)
  const [subs, setSubs] = useState(initialSubscriptions)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingSub, setEditingSub] = useState<Subscription | null>(null)
  const [limitMsg, setLimitMsg] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  useEffect(() => { setSubs(initialSubscriptions) }, [initialSubscriptions])

  const monthlyTotal = subs.filter(s => s.status === 'active').reduce((sum, s) => sum + s.amount, 0)
  const active = subs.filter((s) => s.status === 'active')

  const handleDelete = (id: string) => {
    setSubs((prev) => prev.filter((s) => s.id !== id))
    startTransition(async () => {
      await deleteSubscription(id)
    })
  }

  const handleToggleStatus = (sub: Subscription) => {
    const newStatus = sub.status === 'active' ? 'paused' : 'active'
    setSubs((prev) => prev.map((s) => s.id === sub.id ? { ...s, status: newStatus } : s))
    startTransition(async () => {
      await updateSubscription(sub.id, { status: newStatus })
    })
  }

  const handleToggleReminder = (sub: Subscription) => {
    const enabled = !sub.reminderEnabled
    setSubs((prev) => prev.map((s) => (s.id === sub.id ? { ...s, reminderEnabled: enabled } : s)))
    startTransition(async () => {
      const result = await toggleReminder(sub.id, enabled)
      if (!result.ok) {
        setSubs((prev) => prev.map((s) => (s.id === sub.id ? { ...s, reminderEnabled: !enabled } : s)))
        setLimitMsg(`Free plan includes reminders on ${result.limit} subscriptions. Upgrade to Pro for all of them.`)
      }
    })
  }

  const handleEdit = (sub: Subscription) => {
    setEditingSub(sub)
    setModalOpen(true)
  }

  const handleAdd = () => {
    setEditingSub(null)
    setModalOpen(true)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5 sm:space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {active.length} active &middot; <span className="text-foreground font-medium">{formatCurrency(monthlyTotal)}/mo</span>
        </p>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md border border-border overflow-hidden">
            <button
              onClick={() => setView('grid')}
              className={cn('p-2 transition-colors', view === 'grid' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground')}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setView('list')}
              className={cn('p-2 transition-colors border-l border-border', view === 'list' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground')}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-brand text-brand-foreground text-xs font-medium hover:bg-[color-mix(in_oklch,var(--brand),#111_8%)] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />Add
          </button>
        </div>
      </div>

      <AnimatePresence>
        {limitMsg && (
          <motion.div
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="flex items-center justify-between gap-3 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2.5 text-sm text-foreground">
              <span>{limitMsg}</span>
              <button onClick={() => setLimitMsg(null)} className="text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0">
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {subs.length === 0 ? (
        <EmptyState
          illustration={<NoSubscriptionsIllustration />}
          title="No subscriptions yet"
          description="Add your first subscription to start tracking recurring payments."
          action={
            <button
              onClick={handleAdd}
              className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-brand text-brand-foreground text-xs font-medium hover:bg-[color-mix(in_oklch,var(--brand),#111_8%)] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />Add subscription
            </button>
          }
        />
      ) : view === 'grid' ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 min-[440px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3"
        >
          {subs.map((sub) => (
            <GridCard
              key={sub.id}
              sub={sub}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
              onToggleReminder={handleToggleReminder}
            />
          ))}
        </motion.div>
      ) : (
        <GlassCard>
          <div className="flex items-center gap-2.5 sm:gap-4 pb-2.5 border-b border-border text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            <div className="w-8" />
            <div className="flex-1">Service</div>
            <div className="hidden md:block">Status</div>
            <div className="hidden sm:block w-20 text-right">Renewal</div>
            <div className="w-16 text-right">Amount</div>
            <div className="w-[5.5rem] sm:w-24" />
          </div>
          {subs.map((sub, i) => (
            <ListRow
              key={sub.id}
              sub={sub}
              index={i}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
              onToggleReminder={handleToggleReminder}
            />
          ))}
        </GlassCard>
      )}

      <SubscriptionModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditingSub(null) }}
        editing={editingSub}
        onSuccess={() => router.refresh()}
      />
    </div>
  )
}
