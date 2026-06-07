'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  illustration: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ illustration, title, description, action, className }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn('flex flex-col items-center justify-center py-20 text-center', className)}
    >
      <div className="relative mb-6">
        {/* Halo rings */}
        <div className="absolute inset-[-16px] rounded-full bg-primary/4 blur-sm" />
        <div className="absolute inset-[-8px] rounded-full bg-primary/6 blur-[2px]" />
        {/* Icon container */}
        <div className="relative w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center">
          {illustration}
        </div>
      </div>

      <p className="text-sm font-semibold text-foreground tracking-tight">{title}</p>
      <p className="text-xs text-muted-foreground mt-1.5 max-w-[260px] leading-relaxed">{description}</p>
      {action && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.24 }}
          className="mt-5"
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  )
}

/* ────────────────────────────────────────────────────────────
   SVG Illustrations
   Each uses currentColor so they respect the theme
──────────────────────────────────────────────────────────── */

export function NoSubscriptionsIllustration() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-muted-foreground">
      {/* Card body */}
      <rect x="3" y="8" width="22" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.25" fill="none" />
      {/* Magnetic stripe */}
      <rect x="3" y="12" width="22" height="3.5" fill="currentColor" opacity="0.12" />
      {/* Chip */}
      <rect x="6.5" y="16.5" width="5" height="3.5" rx="0.75" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
      {/* Plus badge — top right */}
      <circle cx="23" cy="9" r="5" fill="var(--background)" stroke="currentColor" strokeWidth="1.25" />
      <path d="M23 6.5v5M20.5 9h5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

export function NoGoalsIllustration() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-muted-foreground">
      {/* Outer ring */}
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.25" fill="none" />
      {/* Middle ring */}
      <circle cx="16" cy="16" r="7.5" stroke="currentColor" strokeWidth="1.25" fill="none" strokeDasharray="2.5 2" />
      {/* Bullseye */}
      <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.25" />
      <circle cx="16" cy="16" r="1.5" fill="currentColor" opacity="0.5" />
      {/* Cross-hairs */}
      <path d="M16 4v4M16 24v4M4 16h4M24 16h4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.4" />
    </svg>
  )
}

export function NoTransactionsIllustration() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-muted-foreground">
      {/* Up arrow (debit) */}
      <path d="M10 22V10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M6.5 13.5L10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      {/* Down arrow (credit) */}
      <path d="M22 10v12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M18.5 18.5L22 22l3.5-3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      {/* Dashes – "no items" feel */}
      <path d="M14 10h4M14 16h4M14 22h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    </svg>
  )
}

export function NoBudgetsIllustration() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-muted-foreground">
      {/* Three progress tracks */}
      <rect x="5" y="8.5" width="22" height="3" rx="1.5" fill="currentColor" opacity="0.15" />
      <rect x="5" y="8.5" width="8" height="3" rx="1.5" fill="currentColor" opacity="0.45" />

      <rect x="5" y="14.5" width="22" height="3" rx="1.5" fill="currentColor" opacity="0.15" />
      <rect x="5" y="14.5" width="14" height="3" rx="1.5" fill="currentColor" opacity="0.45" />

      <rect x="5" y="20.5" width="22" height="3" rx="1.5" fill="currentColor" opacity="0.15" />
      <rect x="5" y="20.5" width="5" height="3" rx="1.5" fill="currentColor" opacity="0.45" />

      {/* Plus icon */}
      <circle cx="25" cy="8" r="4.5" fill="var(--background)" stroke="currentColor" strokeWidth="1.1" />
      <path d="M25 6v4M23 8h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}
