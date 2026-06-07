import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  style?: React.CSSProperties
}

export function Skeleton({ className, style }: SkeletonProps) {
  return <div className={cn('skeleton rounded-md', className)} style={style} aria-hidden />
}

/* ── Composite skeletons that mirror real components ── */

export function MetricCardSkeleton() {
  return (
    <div className="rounded-xl bg-card border border-border p-5 card-shadow">
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="w-8 h-8 rounded-md" />
        <Skeleton className="w-14 h-3.5 rounded" />
      </div>
      <Skeleton className="w-[72px] h-2.5 rounded mb-2.5" />
      <Skeleton className="w-28 h-7 rounded" />
    </div>
  )
}

export function SubscriptionCardSkeleton() {
  return (
    <div className="rounded-xl bg-card border border-border p-5 card-shadow">
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <Skeleton className="w-14 h-5 rounded-full" />
      </div>
      <Skeleton className="w-24 h-3.5 rounded mb-1.5" />
      <Skeleton className="w-16 h-2.5 rounded mb-4" />
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <Skeleton className="w-14 h-6 rounded" />
          <Skeleton className="w-10 h-2.5 rounded" />
        </div>
        <Skeleton className="w-8 h-2.5 rounded" />
      </div>
    </div>
  )
}

export function SubscriptionListRowSkeleton() {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-border/40 last:border-0">
      <Skeleton className="w-8 h-8 rounded-xl shrink-0" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="w-28 h-3 rounded" />
        <Skeleton className="w-16 h-2.5 rounded" />
      </div>
      <Skeleton className="w-14 h-5 rounded-full" />
      <Skeleton className="hidden sm:block w-12 h-2.5 rounded" />
      <Skeleton className="w-12 h-3.5 rounded" />
    </div>
  )
}

export function ChartCardSkeleton({ height = 180, title = true }: { height?: number; title?: boolean }) {
  return (
    <div className="rounded-xl bg-card border border-border p-5 card-shadow">
      {title && (
        <div className="flex items-center justify-between mb-5">
          <div className="space-y-1.5">
            <Skeleton className="w-28 h-3.5 rounded" />
            <Skeleton className="w-16 h-2.5 rounded" />
          </div>
          <Skeleton className="w-14 h-5 rounded" />
        </div>
      )}
      <Skeleton className="w-full rounded-lg" style={{ height }} />
    </div>
  )
}

export function BudgetRowSkeleton() {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="w-20 h-3 rounded" />
        </div>
        <Skeleton className="w-28 h-3 rounded" />
      </div>
      <Skeleton className="w-full h-1.5 rounded-full" />
      <Skeleton className="w-20 h-2.5 rounded" />
    </div>
  )
}

export function GoalCardSkeleton() {
  return (
    <div className="rounded-xl bg-card border border-border p-5 card-shadow">
      <div className="flex items-start gap-4">
        <Skeleton className="w-20 h-20 rounded-full shrink-0" />
        <div className="flex-1 pt-1 space-y-2">
          <Skeleton className="w-32 h-3.5 rounded" />
          <Skeleton className="w-40 h-2.5 rounded" />
          <Skeleton className="w-24 h-2.5 rounded" />
          <div className="flex gap-3 mt-3">
            <Skeleton className="w-16 h-2.5 rounded" />
            <Skeleton className="w-24 h-2.5 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function TransactionRowSkeleton() {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-border/40 last:border-0">
      <Skeleton className="w-7 h-7 rounded-md shrink-0" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="w-28 h-3 rounded" />
        <Skeleton className="w-36 h-2.5 rounded" />
      </div>
      <Skeleton className="w-14 h-3.5 rounded" />
    </div>
  )
}

export function SummaryRowSkeleton({ cols = 3 }: { cols?: number }) {
  return (
    <div className={`grid grid-cols-${cols} gap-3`}>
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} className="rounded-xl bg-card border border-border p-4 card-shadow">
          <Skeleton className="w-16 h-2.5 rounded mb-2" />
          <Skeleton className="w-24 h-7 rounded" />
        </div>
      ))}
    </div>
  )
}
