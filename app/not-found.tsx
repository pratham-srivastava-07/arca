'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Zap } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center"
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 mb-8">
          <Zap className="w-6 h-6 text-primary" strokeWidth={2.5} />
        </div>

        <p className="text-8xl font-black text-foreground/10 tracking-tighter leading-none mb-2 select-none">404</p>

        <h1 className="text-xl font-semibold text-foreground mb-2">Page not found</h1>
        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-8">
          This page doesn&apos;t exist or was moved. Let&apos;s get you back on track.
        </p>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Go to dashboard
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Go back
          </button>
        </div>
      </motion.div>
    </div>
  )
}
