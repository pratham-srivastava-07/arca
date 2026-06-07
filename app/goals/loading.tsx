import { Skeleton, GoalCardSkeleton } from '@/components/ui/skeleton'

export default function GoalsLoading() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-5 py-8 space-y-6">
        {/* Summary */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="w-16 h-2.5 rounded" />
                <Skeleton className="w-24 h-6 rounded" />
              </div>
            ))}
          </div>
          <Skeleton className="w-24 h-8 rounded-md" />
        </div>

        {/* Goal cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <GoalCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
