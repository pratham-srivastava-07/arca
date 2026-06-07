'use client'
import { useEffect, useRef } from 'react'
import { useMotionValue, useSpring, useTransform, motion } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, {
    stiffness: 60,
    damping: 20,
    mass: 0.8,
  })
  const display = useTransform(spring, (v) => {
    const formatted = v.toFixed(decimals)
    const [int, dec] = formatted.split('.')
    const intFormatted = parseInt(int).toLocaleString('en-US')
    return `${prefix}${dec !== undefined ? `${intFormatted}.${dec}` : intFormatted}${suffix}`
  })

  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!hasAnimated.current) {
      hasAnimated.current = true
      const timer = setTimeout(() => {
        motionValue.set(value)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      motionValue.set(value)
    }
  }, [value, motionValue])

  return <motion.span className={className}>{display}</motion.span>
}
