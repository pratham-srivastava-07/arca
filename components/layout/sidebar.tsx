'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard, CreditCard, BarChart3, TrendingUp,
  PiggyBank, Target, Settings, ChevronLeft, ChevronRight, Zap,
} from 'lucide-react'
import { useAppStore } from '@/stores/app-store'
import { useUser } from '@clerk/nextjs'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/subscriptions', label: 'Subscriptions', icon: CreditCard },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/forecasting', label: 'Forecasting', icon: TrendingUp },
  { href: '/budget', label: 'Budget', icon: PiggyBank },
  { href: '/goals', label: 'Goals', icon: Target },
]

export function Sidebar() {
  const collapsed = useAppStore((s) => s.sidebarCollapsed)
  const toggle = useAppStore((s) => s.toggleSidebar)
  const pathname = usePathname()
  const { user } = useUser()

  const displayName = user?.firstName ?? user?.fullName ?? 'You'
  const initials = displayName[0]?.toUpperCase() ?? 'U'

  return (
    <motion.aside
      animate={{ width: collapsed ? 56 : 220 }}
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      className="relative flex flex-col shrink-0 h-screen overflow-hidden border-r border-border bg-background z-40"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center h-14 px-3.5 border-b border-border shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
        <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary shrink-0">
          <Zap className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={2.5} />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.18 }}
              className="ml-2.5 font-semibold text-sm tracking-tight text-foreground whitespace-nowrap"
            >
              Arca
            </motion.span>
          )}
        </AnimatePresence>
      </Link>

      {/* Nav */}
      <nav className="flex-1 py-2.5 px-2 space-y-0.5 overflow-y-auto overflow-x-hidden">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
          return (
            <Link key={href} href={href}>
              <div
                className={cn(
                  'flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm cursor-pointer transition-colors duration-100',
                  active
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className="w-4 h-4 shrink-0" strokeWidth={active ? 2.5 : 2} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -4 }}
                      transition={{ duration: 0.15 }}
                      className="whitespace-nowrap"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 pb-2.5 pt-2 border-t border-border shrink-0 space-y-0.5">
        <Link href="/settings">
          <div className={cn(
            'flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm cursor-pointer transition-colors duration-100',
            pathname === '/settings'
              ? 'bg-primary/10 text-primary font-medium'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          )}>
            <Settings className="w-4 h-4 shrink-0" strokeWidth={2} />
            <AnimatePresence>
              {!collapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="whitespace-nowrap text-sm">
                  Settings
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </Link>

        {/* User row */}
        <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-md">
          {user?.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.imageUrl} alt={displayName} className="w-6 h-6 rounded-full shrink-0 object-cover" />
          ) : (
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary shrink-0 text-xs font-semibold text-primary-foreground">
              {initials}
            </div>
          )}
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -4 }} className="min-w-0">
                <p className="text-xs font-medium text-foreground truncate leading-none">{displayName}</p>
                <p className="text-[10px] text-muted-foreground truncate mt-0.5">Free plan</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={toggle}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-100"
        >
          {collapsed ? (
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          ) : (
            <>
              <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  )
}
