'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

const TooltipContext = React.createContext<{
  open: boolean
  setOpen: (v: boolean) => void
}>({ open: false, setOpen: () => {} })

function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function Tooltip({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </TooltipContext.Provider>
  )
}

const TooltipTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { asChild?: boolean }
>(({ children, asChild, ...props }, ref) => {
  const { setOpen } = React.useContext(TooltipContext)
  const triggerProps = {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false),
  }
  if (asChild && React.isValidElement(children)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return React.cloneElement(children as React.ReactElement<any>, { ...triggerProps, ref })
  }
  return (
    <div ref={ref} {...props} {...triggerProps}>
      {children}
    </div>
  )
})
TooltipTrigger.displayName = 'TooltipTrigger'

function TooltipContent({
  children,
  sideOffset = 4,
  className,
}: {
  children: React.ReactNode
  sideOffset?: number
  className?: string
}) {
  const { open } = React.useContext(TooltipContext)
  if (!open) return null
  return (
    <div
      className={cn(
        'absolute bottom-full left-1/2 z-50 -translate-x-1/2 overflow-hidden whitespace-nowrap rounded-md border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md',
        className,
      )}
      style={{ marginBottom: sideOffset }}
    >
      {children}
    </div>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
