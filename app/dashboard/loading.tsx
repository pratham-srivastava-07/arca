import { GlassCard } from '@/components/ui/glass-card'

function Shimmer({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-md bg-muted ${className}`} />
  )
}

export default function DashboardLoading() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-8 space-y-8">
      <div>
        <Shimmer className="h-4 w-32 mb-2" />
        <Shimmer className="h-7 w-52" />
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <GlassCard key={i} padding="sm">
            <Shimmer className="h-3 w-20 mb-2" />
            <Shimmer className="h-8 w-28" />
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <div className="xl:col-span-3">
          <GlassCard>
            <Shimmer className="h-4 w-24 mb-1" />
            <Shimmer className="h-3 w-16 mb-5" />
            <Shimmer className="h-44 w-full" />
          </GlassCard>
        </div>
        <div className="xl:col-span-2">
          <GlassCard className="h-full">
            <Shimmer className="h-4 w-28 mb-4" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 mb-4">
                <Shimmer className="w-8 h-8 rounded-lg" />
                <div className="flex-1">
                  <Shimmer className="h-3.5 w-24 mb-1" />
                  <Shimmer className="h-3 w-16" />
                </div>
                <Shimmer className="h-4 w-14" />
              </div>
            ))}
          </GlassCard>
        </div>
      </div>

      <GlassCard>
        <Shimmer className="h-4 w-36 mb-4" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 py-2.5 border-b border-border/40 last:border-0">
            <Shimmer className="w-7 h-7 rounded-md" />
            <div className="flex-1">
              <Shimmer className="h-3.5 w-32 mb-1" />
              <Shimmer className="h-3 w-24" />
            </div>
            <Shimmer className="h-4 w-16" />
          </div>
        ))}
      </GlassCard>
    </div>
  )
}
