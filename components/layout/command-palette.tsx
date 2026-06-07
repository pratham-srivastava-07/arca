'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, CreditCard, BarChart3, PiggyBank, Target,
  TrendingUp, LayoutDashboard, Settings, ArrowRight, X,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/stores/app-store'

interface Result {
  id: string
  label: string
  sublabel?: string
  category: string
  href: string
  icon: React.ReactNode
}

const PAGE_RESULTS: Result[] = [
  { id: 'dashboard', label: 'Dashboard', sublabel: 'Overview & metrics', category: 'Pages', href: '/dashboard', icon: <LayoutDashboard className="w-3.5 h-3.5 text-primary" /> },
  { id: 'subscriptions', label: 'Subscriptions', sublabel: 'Manage recurring payments', category: 'Pages', href: '/subscriptions', icon: <CreditCard className="w-3.5 h-3.5 text-muted-foreground" /> },
  { id: 'analytics', label: 'Analytics', sublabel: 'Charts & spending insights', category: 'Pages', href: '/analytics', icon: <BarChart3 className="w-3.5 h-3.5 text-muted-foreground" /> },
  { id: 'forecasting', label: 'Forecasting', sublabel: '12-month spending forecast', category: 'Pages', href: '/forecasting', icon: <TrendingUp className="w-3.5 h-3.5 text-muted-foreground" /> },
  { id: 'budget', label: 'Budget Planner', sublabel: 'Category spending limits', category: 'Pages', href: '/budget', icon: <PiggyBank className="w-3.5 h-3.5 text-muted-foreground" /> },
  { id: 'goals', label: 'Financial Goals', sublabel: 'Track savings & milestones', category: 'Pages', href: '/goals', icon: <Target className="w-3.5 h-3.5 text-muted-foreground" /> },
  { id: 'settings', label: 'Settings', sublabel: 'Account & preferences', category: 'Pages', href: '/settings', icon: <Settings className="w-3.5 h-3.5 text-muted-foreground" /> },
]

export function CommandPalette() {
  const open = useAppStore((s) => s.commandPaletteOpen)
  const setOpen = useAppStore((s) => s.setCommandPaletteOpen)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(true)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [setOpen])

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 40)
    }
  }, [open])

  const filtered = query
    ? PAGE_RESULTS.filter(
        (r) =>
          r.label.toLowerCase().includes(query.toLowerCase()) ||
          r.sublabel?.toLowerCase().includes(query.toLowerCase())
      )
    : PAGE_RESULTS

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)) }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)) }
      if (e.key === 'Enter' && filtered[selected]) {
        router.push(filtered[selected].href)
        setOpen(false)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, filtered, selected, router, setOpen])

  const handleSelect = (href: string) => {
    router.push(href)
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            key="palette"
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed top-[18%] left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
          >
            <div className="rounded-xl bg-popover border border-border shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2.5 px-4 border-b border-border">
                <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelected(0) }}
                  placeholder="Go to page, search features…"
                  className="flex-1 bg-transparent py-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center w-5 h-5 rounded bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <div className="max-h-72 overflow-y-auto py-1.5">
                {filtered.length === 0 ? (
                  <p className="text-center text-sm text-muted-foreground py-8">No results for &ldquo;{query}&rdquo;</p>
                ) : (
                  <>
                    <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Navigation
                    </p>
                    {filtered.map((r, i) => (
                      <button
                        key={r.id}
                        onClick={() => handleSelect(r.href)}
                        onMouseEnter={() => setSelected(i)}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors group ${
                          selected === i ? 'bg-muted' : 'hover:bg-muted/50'
                        }`}
                      >
                        <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center shrink-0">
                          {r.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground truncate">{r.label}</p>
                          {r.sublabel && (
                            <p className="text-xs text-muted-foreground truncate">{r.sublabel}</p>
                          )}
                        </div>
                        <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </>
                )}
              </div>
              <div className="flex items-center gap-4 px-4 py-2 border-t border-border text-[10px] text-muted-foreground">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>Esc Close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
