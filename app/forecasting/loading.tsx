import { Skeleton, ChartCardSkeleton } from '@/components/ui/skeleton'

export default function ForecastingLoading() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-5 py-8 space-y-5">
        {/* Summary row */}
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-card border border-border p-4 card-shadow">
              <Skeleton className="w-24 h-2.5 rounded mb-2" />
              <Skeleton className="w-28 h-7 rounded" />
            </div>
          ))}
        </div>

        {/* Scenarios */}
        <div className="rounded-xl bg-card border border-border p-5 card-shadow">
          <Skeleton className="w-32 h-3.5 rounded mb-4" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="w-32 h-9 rounded-md" />
            ))}
          </div>
        </div>

        {/* Forecast chart */}
        <ChartCardSkeleton height={240} />

        {/* Per-sub breakdown */}
        <div className="rounded-xl bg-card border border-border p-5 card-shadow">
          <Skeleton className="w-40 h-3.5 rounded mb-5" />
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-1 space-y-1.5">
                  <div className="flex justify-between">
                    <Skeleton className="w-20 h-3 rounded" />
                    <Skeleton className="w-16 h-3 rounded" />
                  </div>
                  <Skeleton className="w-full h-1 rounded-full" />
                </div>
                <Skeleton className="w-8 h-2.5 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
