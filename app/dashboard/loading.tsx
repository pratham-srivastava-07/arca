import {
  Skeleton, MetricCardSkeleton, ChartCardSkeleton, TransactionRowSkeleton,
} from '@/components/ui/skeleton'

export default function DashboardLoading() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-8 space-y-8">
      <div className="space-y-2">
        <Skeleton className="w-24 h-3 rounded" />
        <Skeleton className="w-64 h-7 rounded" />
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <MetricCardSkeleton key={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <div className="xl:col-span-3">
          <ChartCardSkeleton height={176} />
        </div>
        <div className="xl:col-span-2">
          <div className="rounded-xl bg-card border border-border p-5 h-full card-shadow">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="w-32 h-3.5 rounded" />
              <Skeleton className="w-14 h-2.5 rounded" />
            </div>
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded-xl shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="w-20 h-3 rounded" />
                    <Skeleton className="w-12 h-2.5 rounded" />
                  </div>
                  <Skeleton className="w-12 h-3 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-card border border-border p-5 card-shadow">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="w-36 h-3.5 rounded" />
          <Skeleton className="w-10 h-2.5 rounded" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <TransactionRowSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
