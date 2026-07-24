'use client'
import { usePathname } from 'next/navigation'
import { Search, Bell, Command, Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import { UserButton } from '@clerk/nextjs'
import { useAppStore } from '@/stores/app-store'

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/subscriptions': 'Subscriptions',
  '/analytics': 'Analytics',
  '/forecasting': 'Forecasting',
  '/budget': 'Budget Planner',
  '/goals': 'Financial Goals',
  '/settings': 'Settings',
}

export function TopBar() {
  const pathname = usePathname()
  const openPalette = useAppStore((s) => s.setCommandPaletteOpen)
  const openMobileNav = useAppStore((s) => s.setMobileNavOpen)
  const title = PAGE_TITLES[pathname] ?? ''

  return (
    <header className="flex items-center justify-between h-14 px-3 sm:px-5 shrink-0 border-b border-border bg-background">
      <div className="flex items-center gap-1.5 min-w-0">
        <button
          onClick={() => openMobileNav(true)}
          aria-label="Open menu"
          className="flex lg:hidden items-center justify-center w-9 h-9 -ml-1 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-100"
        >
          <Menu className="w-4 h-4" />
        </button>
        {title && (
          <motion.h2
            key={title}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }}
            className="font-semibold text-sm text-foreground truncate"
          >
            {title}
          </motion.h2>
        )}
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={() => openPalette(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-muted-foreground bg-muted border border-border hover:text-foreground transition-colors duration-100"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-xs">Search</span>
          <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] font-mono text-muted-foreground bg-background border border-border rounded px-1.5 py-0.5">
            <Command className="w-2.5 h-2.5" />K
          </kbd>
        </button>

        <button className="relative flex items-center justify-center w-8 h-8 rounded-md bg-muted border border-border text-muted-foreground hover:text-foreground transition-colors duration-100">
          <Bell className="w-3.5 h-3.5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
        </button>

        <UserButton
          appearance={{
            elements: {
              avatarBox: 'w-7 h-7',
              userButtonPopoverCard: 'bg-popover border border-border shadow-xl',
              userButtonPopoverActionButton: 'text-foreground hover:bg-muted',
              userButtonPopoverActionButtonText: 'text-sm',
              userButtonPopoverFooter: 'hidden',
            },
          }}
        />
      </div>
    </header>
  )
}
