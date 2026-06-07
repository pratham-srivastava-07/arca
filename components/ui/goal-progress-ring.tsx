'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface GoalProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  color?: string
  children?: React.ReactNode
}

export function GoalProgressRing({
  progress,
  size = 88,
  strokeWidth = 5,
  color = 'var(--primary)',
  children,
}: GoalProgressRingProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.min(100, Math.max(0, progress))
  const offset = circumference - (clamped / 100) * circumference

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        style={{ transform: 'rotate(-90deg)', position: 'absolute', inset: 0 }}
      >
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={mounted ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
          transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1], delay: 0.15 }}
        />
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
