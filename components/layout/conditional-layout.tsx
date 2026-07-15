'use client'
import { usePathname } from 'next/navigation'
import { Sidebar, MobileSidebar } from './sidebar'
import { TopBar } from './top-bar'
import { CommandPalette } from './command-palette'
import { PageTransition } from './page-transition'

const NO_CHROME_PREFIXES = ['/signin', '/signup']
const NO_CHROME_EXACT = ['/', '/onboarding']

function showAppChrome(pathname: string): boolean {
  if (NO_CHROME_EXACT.includes(pathname)) return false
  if (NO_CHROME_PREFIXES.some((p) => pathname.startsWith(p))) return false
  return true
}

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hasChrome = showAppChrome(pathname)

  if (!hasChrome) return <>{children}</>

  return (
    <div className="flex h-dvh overflow-hidden bg-background text-foreground">
      <Sidebar />
      <MobileSidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
      <CommandPalette />
    </div>
  )
}
