import { Skeleton, SubscriptionCardSkeleton } from '@/components/ui/skeleton'

export default function SubscriptionsLoading() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-5 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Skeleton className="w-40 h-3.5 rounded" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-[70px] h-8 rounded-md" />
            <Skeleton className="w-[72px] h-8 rounded-md" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SubscriptionCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
