import { Skeleton } from '@/components/ui/skeleton'

export default function RootLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2.5L17.5 6.875V13.125L10 17.5L2.5 13.125V6.875L10 2.5Z" stroke="var(--primary)" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="w-48 h-3 rounded" />
          <Skeleton className="w-32 h-2.5 rounded" />
        </div>
      </div>
    </div>
  )
}
