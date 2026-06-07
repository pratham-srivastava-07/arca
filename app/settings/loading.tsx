import { Skeleton } from '@/components/ui/skeleton'

function SettingsSectionSkeleton() {
  return (
    <div className="rounded-xl bg-card border border-border p-5 card-shadow">
      <div className="flex items-center gap-3 mb-5">
        <Skeleton className="w-4 h-4 rounded" />
        <Skeleton className="w-24 h-3.5 rounded" />
      </div>
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Skeleton className="w-24 h-2.5 rounded" />
          <Skeleton className="w-full max-w-sm h-9 rounded-lg" />
        </div>
        <div className="space-y-1.5">
          <Skeleton className="w-16 h-2.5 rounded" />
          <Skeleton className="w-full max-w-sm h-9 rounded-lg" />
        </div>
        <Skeleton className="w-28 h-9 rounded-lg" />
      </div>
    </div>
  )
}

export default function SettingsLoading() {
  return (
    <div className="max-w-2xl mx-auto px-5 py-8 space-y-5">
      <div className="space-y-1.5">
        <Skeleton className="w-20 h-6 rounded" />
        <Skeleton className="w-56 h-3 rounded" />
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <SettingsSectionSkeleton key={i} />
      ))}
    </div>
  )
}
