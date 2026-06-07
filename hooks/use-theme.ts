'use client'
import { useTheme } from 'next-themes'

export function useAppTheme() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const toggle = () => setTheme(isDark ? 'light' : 'dark')
  return { theme, isDark, toggle, setTheme }
}
