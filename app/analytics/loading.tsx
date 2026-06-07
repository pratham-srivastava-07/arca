import { Skeleton, ChartCardSkeleton } from '@/components/ui/skeleton'

export default function AnalyticsLoading() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-5 py-8 space-y-5">
        {/* Summary + range */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="space-y-2">
              <Skeleton className="w-12 h-2.5 rounded" />
              <Skeleton className="w-24 h-6 rounded" />
            </div>
            <div className="space-y-2">
              <Skeleton className="w-16 h-2.5 rounded" />
              <Skeleton className="w-24 h-6 rounded" />
            </div>
          </div>
          <Skeleton className="w-[148px] h-8 rounded-md" />
        </div>

        {/* Spend trend */}
        <ChartCardSkeleton height={208} />

        {/* Category + Growth row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div className="rounded-xl bg-card border border-border p-5 card-shadow">
            <Skeleton className="w-36 h-3.5 rounded mb-5" />
            <div className="flex items-center gap-4">
              <Skeleton className="w-36 h-36 rounded-full shrink-0" />
              <div className="flex-1 space-y-2.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="w-2 h-2 rounded-full shrink-0" />
                    <Skeleton className="flex-1 h-2.5 rounded" />
                    <Skeleton className="w-12 h-2.5 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ChartCardSkeleton height={172} />
        </div>

        {/* Bar chart */}
        <ChartCardSkeleton height={176} />

        {/* Heatmap */}
        <div className="rounded-xl bg-card border border-border p-5 card-shadow">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="w-36 h-3.5 rounded" />
            <Skeleton className="w-28 h-3 rounded" />
          </div>
          <div className="flex gap-1 overflow-hidden">
            {Array.from({ length: 52 }).map((_, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {Array.from({ length: 7 }).map((_, di) => (
                  <Skeleton key={di} className="w-3 h-3 rounded-sm" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
