'use client'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard, CreditCard, BarChart3, TrendingUp,
  PiggyBank, Target, Settings, ChevronLeft, ChevronRight, Zap, X,
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

function isNavActive(pathname: string, href: string) {
  return pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
}

function UserRow({ compact }: { compact?: boolean }) {
  const { user } = useUser()
  const displayName = user?.firstName ?? user?.fullName ?? 'You'
  const initials = displayName[0]?.toUpperCase() ?? 'U'

  return (
    <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-md">
      {user?.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={user.imageUrl} alt={displayName} className="w-6 h-6 rounded-full shrink-0 object-cover" />
      ) : (
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary shrink-0 text-xs font-semibold text-primary-foreground">
          {initials}
        </div>
      )}
      {!compact && (
        <div className="min-w-0">
          <p className="text-xs font-medium text-foreground truncate leading-none">{displayName}</p>
          <p className="text-[10px] text-muted-foreground truncate mt-0.5">Free plan</p>
        </div>
      )}
    </div>
  )
}

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
      className="relative hidden lg:flex flex-col shrink-0 h-full overflow-hidden border-r border-border bg-background z-40"
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
          const active = isNavActive(pathname, href)
          return (
            <Link key={href} href={href}>
              <div
                className={cn(
                  'relative flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm cursor-pointer transition-colors duration-100',
                  active
                    ? 'bg-secondary text-foreground font-medium'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-brand" />
                )}
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
            'relative flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm cursor-pointer transition-colors duration-100',
            pathname === '/settings'
              ? 'bg-secondary text-foreground font-medium'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          )}>
            {pathname === '/settings' && (
              <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-brand" />
            )}
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

export function MobileSidebar() {
  const open = useAppStore((s) => s.mobileNavOpen)
  const setOpen = useAppStore((s) => s.setMobileNavOpen)
  const pathname = usePathname()

  // Close the drawer whenever the route changes
  useEffect(() => { setOpen(false) }, [pathname, setOpen])

  // Lock body scroll while the drawer is open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          />
          <motion.aside
            key="nav-drawer"
            initial={{ x: -288 }}
            animate={{ x: 0 }}
            exit={{ x: -288 }}
            transition={{ type: 'spring', stiffness: 380, damping: 36 }}
            className="fixed inset-y-0 left-0 z-50 flex w-[272px] max-w-[85vw] flex-col border-r border-border bg-background lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Header */}
            <div className="flex items-center justify-between h-14 pl-3.5 pr-2 border-b border-border shrink-0">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary shrink-0">
                  <Zap className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={2.5} />
                </div>
                <span className="font-semibold text-sm tracking-tight text-foreground">Arca</span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex items-center justify-center w-10 h-10 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 py-2.5 px-2 space-y-0.5 overflow-y-auto">
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                const active = isNavActive(pathname, href)
                return (
                  <Link key={href} href={href} onClick={() => setOpen(false)}>
                    <div
                      className={cn(
                        'relative flex items-center gap-3 px-3 py-2.5 rounded-md text-sm cursor-pointer transition-colors duration-100',
                        active
                          ? 'bg-secondary text-foreground font-medium'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      {active && (
                        <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-brand" />
                      )}
                      <Icon className="w-4 h-4 shrink-0" strokeWidth={active ? 2.5 : 2} />
                      {label}
                    </div>
                  </Link>
                )
              })}
            </nav>

            {/* Bottom */}
            <div className="px-2 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2 border-t border-border shrink-0 space-y-0.5">
              <Link href="/settings" onClick={() => setOpen(false)}>
                <div className={cn(
                  'relative flex items-center gap-3 px-3 py-2.5 rounded-md text-sm cursor-pointer transition-colors duration-100',
                  pathname === '/settings'
                    ? 'bg-secondary text-foreground font-medium'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}>
                  {pathname === '/settings' && (
                    <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-brand" />
                  )}
                  <Settings className="w-4 h-4 shrink-0" strokeWidth={2} />
                  Settings
                </div>
              </Link>
              <UserRow />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
