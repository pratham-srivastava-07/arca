'use client'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps extends HTMLMotionProps<'div'> {
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddingMap = { none: '', sm: 'p-4', md: 'p-5', lg: 'p-6' }

export function GlassCard({
  children,
  className,
  hover = true,
  padding = 'lg',
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'rounded-xl bg-card border border-border text-card-foreground',
        paddingMap[padding],
        className
      )}
      whileHover={hover ? { y: -1, boxShadow: '0 4px 16px rgba(0,0,0,0.25)' } : undefined}
      transition={{ duration: 0.15 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
