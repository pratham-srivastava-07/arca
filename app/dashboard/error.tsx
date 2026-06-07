'use client'
import { useEffect } from 'react'
import { RefreshCw, AlertTriangle } from 'lucide-react'

export default function DashboardError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])
  return (
    <div className="flex flex-col items-center justify-center h-full py-24 text-center px-6">
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 mb-4">
        <AlertTriangle className="w-5 h-5 text-red-500" />
      </div>
      <p className="text-sm font-medium text-foreground mb-1">Failed to load dashboard</p>
      <p className="text-xs text-muted-foreground mb-5">Something went wrong fetching your data.</p>
      <button
        onClick={reset}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
      >
        <RefreshCw className="w-3 h-3" />Retry
      </button>
    </div>
  )
}
