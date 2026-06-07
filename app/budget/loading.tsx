import { Skeleton, BudgetRowSkeleton } from '@/components/ui/skeleton'

export default function BudgetLoading() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-5 py-8 space-y-5">
        {/* Overview row */}
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-card border border-border p-4 card-shadow">
              <Skeleton className="w-20 h-2.5 rounded mb-2" />
              <Skeleton className="w-24 h-7 rounded" />
              {i === 2 && <Skeleton className="w-28 h-2.5 rounded mt-1.5" />}
            </div>
          ))}
        </div>

        {/* Health ring + insights */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="rounded-xl bg-card border border-border p-5 card-shadow flex flex-col items-center py-6">
            <Skeleton className="w-28 h-28 rounded-full mb-3" />
            <Skeleton className="w-24 h-3.5 rounded mb-1.5" />
            <Skeleton className="w-36 h-2.5 rounded" />
          </div>
          <div className="xl:col-span-2 rounded-xl bg-card border border-border p-5 card-shadow">
            <Skeleton className="w-16 h-3.5 rounded mb-4" />
            <div className="space-y-2.5">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-md bg-muted">
                  <Skeleton className="w-3.5 h-3.5 rounded shrink-0 mt-0.5" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="w-36 h-3 rounded" />
                    <Skeleton className="w-48 h-2.5 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Budget bars */}
        <div className="rounded-xl bg-card border border-border p-5 card-shadow">
          <div className="flex items-center justify-between mb-5">
            <Skeleton className="w-20 h-3.5 rounded" />
            <Skeleton className="w-28 h-8 rounded-md" />
          </div>
          <div className="space-y-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <BudgetRowSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
