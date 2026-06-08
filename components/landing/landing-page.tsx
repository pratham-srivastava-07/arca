'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'
import {
  Zap, ArrowRight, BarChart3, CreditCard, TrendingUp, Target,
  PiggyBank, Search, CheckCircle, ChevronRight, LayoutDashboard,
} from 'lucide-react'
import { GlowyWavesHero } from '@/components/ui/glowy-waves-hero-shadcnui'
import { Footerdemo } from '@/components/ui/footer-section'
import { CTA } from '@/components/ui/call-to-action'
import { HighlightGroup, HighlighterItem, Particles } from '@/components/ui/highlighter'

// ─── Dashboard Mockup ────────────────────────────────────────────────────────
function DashboardMockup() {
  return (
    <div className="relative w-full max-w-3xl mx-auto mt-16 select-none" aria-hidden>
      <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-3xl scale-95" />
      <div className="relative rounded-2xl border border-white/10 bg-[#0d0d12] overflow-hidden shadow-2xl shadow-black/60">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-[#111118]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 mx-4">
            <div className="flex items-center gap-2 bg-white/5 rounded-md px-3 py-1.5 max-w-xs mx-auto">
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="text-[11px] text-white/40 font-mono">sublytics.app/dashboard</span>
            </div>
          </div>
        </div>
        <div className="flex h-72">
          <div className="w-14 border-r border-white/5 bg-[#0d0d12] flex flex-col items-center py-4 gap-3">
            <div className="w-7 h-7 rounded-md bg-primary/90 flex items-center justify-center mb-2">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            {[BarChart3, CreditCard, TrendingUp, PiggyBank, Target].map((Icon, i) => (
              <div key={i} className={`p-2 rounded-md ${i === 0 ? 'bg-primary/15 text-primary' : 'text-white/25'}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
            ))}
          </div>
          <div className="flex-1 p-4 overflow-hidden">
            <div className="mb-4">
              <div className="h-2 w-24 rounded bg-white/10 mb-1.5" />
              <div className="h-4 w-40 rounded bg-white/20" />
            </div>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[
                { label: 'Monthly', value: '$111', trend: '+4%', color: 'text-primary' },
                { label: 'Subscriptions', value: '6', trend: '', color: 'text-foreground' },
                { label: 'Due Soon', value: '$47', trend: '3 days', color: 'text-amber-400' },
                { label: 'YTD Spend', value: '$1.3K', trend: '+12%', color: 'text-foreground' },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="rounded-lg border border-white/8 bg-white/4 p-2.5"
                >
                  <div className="text-[9px] text-white/40 mb-1">{card.label}</div>
                  <div className={`text-sm font-bold ${card.color}`}>{card.value}</div>
                  {card.trend && <div className="text-[9px] text-white/30 mt-0.5">{card.trend}</div>}
                </motion.div>
              ))}
            </div>
            <div className="rounded-lg border border-white/8 bg-white/4 p-3 h-20 relative overflow-hidden">
              <div className="text-[9px] text-white/40 mb-2">Monthly Spend</div>
              <svg className="w-full h-10" viewBox="0 0 300 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M0,35 C20,30 40,28 60,25 C80,22 100,20 120,18 C140,16 160,22 180,20 C200,18 220,12 240,10 C260,8 280,14 300,12"
                  fill="url(#chartGrad)" stroke="none"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                />
                <motion.path
                  d="M0,35 C20,30 40,28 60,25 C80,22 100,20 120,18 C140,16 160,22 180,20 C200,18 220,12 240,10 C260,8 280,14 300,12"
                  fill="none" stroke="var(--primary)" strokeWidth="1.5"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: CreditCard,
    title: 'Subscription Tracking',
    description: 'Every recurring payment in one place. Netflix, AWS, Spotify — tracked automatically.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/8 border-blue-500/20',
  },
  {
    icon: BarChart3,
    title: 'Spending Analytics',
    description: 'Interactive charts that reveal patterns. Understand where every dollar actually goes.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/8 border-purple-500/20',
  },
  {
    icon: TrendingUp,
    title: '12-Month Forecasting',
    description: 'See the future before it arrives. Run "what-if" scenarios and plan smarter.',
    color: 'text-primary',
    bg: 'bg-primary/8 border-primary/20',
  },
  {
    icon: PiggyBank,
    title: 'Budget Planner',
    description: 'Set category limits, track progress in real time, and get alerts before you overspend.',
    color: 'text-green-400',
    bg: 'bg-green-500/8 border-green-500/20',
  },
  {
    icon: Target,
    title: 'Financial Goals',
    description: 'Emergency fund, vacation, new laptop — track every goal with velocity indicators.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/8 border-amber-500/20',
  },
  {
    icon: Search,
    title: 'Command Palette',
    description: 'Find any subscription, budget, or goal instantly with ⌘K. Your financial brain.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/8 border-pink-500/20',
  },
]

const PRICING = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Everything you need to get started.',
    cta: 'Get started',
    highlight: false,
    features: ['Unlimited subscriptions', 'Basic spending dashboard', 'Budget categories', 'Financial goals', 'Dark & light mode'],
  },
  {
    name: 'Pro',
    price: '$9',
    period: 'per month',
    description: 'Full analytics & forecasting power.',
    cta: 'Start free trial',
    highlight: true,
    features: ['Everything in Free', 'Advanced analytics', '12-month forecasting', 'What-if scenario engine', 'Spending heatmaps', 'Priority support'],
  },
]

// ─── Subscription Tracking Demo ───────────────────────────────────────────────
const FLOATING_LABELS = [
  { id: 'netflix', top: '12%', left: '72%', label: 'Netflix', opacity: 50 },
  { id: 'spotify', top: '22%', left: '8%', label: 'Spotify', opacity: 50 },
  { id: 'aws', top: '68%', left: '70%', label: 'AWS', opacity: 50 },
  { id: 'github', top: '62%', left: '14%', label: 'GitHub Pro', opacity: 50 },
]

function SubscriptionTrackingDemo() {
  return (
    <section className="relative z-10 px-6 py-20 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">
          Every subscription, finally visible
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Add Netflix, Spotify, AWS and more in seconds. See patterns you never noticed before.
        </p>
      </motion.div>

      <HighlightGroup className="group grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Large feature card */}
        <div className="md:col-span-2">
          <HighlighterItem className="rounded-3xl h-full">
            <div className="relative z-20 h-full overflow-hidden rounded-3xl border border-border bg-card">
              <Particles
                className="absolute inset-0 -z-10 opacity-10 transition-opacity duration-1000 ease-in-out group-hover:opacity-100"
                quantity={120}
                color="#6366f1"
                vy={-0.2}
              />
              <div className="relative h-[280px] p-8">
                {/* Center logo */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 border border-primary/30">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                {/* Floating subscription labels */}
                {FLOATING_LABELS.map((item) => (
                  <motion.div
                    key={item.id}
                    id={item.id}
                    style={{ position: 'absolute', top: item.top, left: item.left }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2 }}
                    className="rounded-full border border-border bg-muted px-3 py-1.5 text-xs text-foreground/80"
                  >
                    {item.label}
                  </motion.div>
                ))}
                {/* Connection lines SVG */}
                <svg className="absolute inset-0 w-full h-full opacity-10" aria-hidden>
                  <line x1="50%" y1="50%" x2="75%" y2="15%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="12%" y2="24%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="73%" y2="70%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="50%" y1="50%" x2="17%" y2="64%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                </svg>
              </div>
              <div className="px-8 pb-8">
                <h3 className="text-xl font-bold mb-2 text-foreground">Track every subscription</h3>
                <p className="text-sm text-muted-foreground">
                  Add services in seconds with quick-select or custom entry. Get automatic renewal alerts before charges hit.
                </p>
              </div>
            </div>
          </HighlighterItem>
        </div>

        {/* Right column with 2 small cards */}
        <div className="flex flex-col gap-4">
          <HighlighterItem className="rounded-3xl flex-1">
            <div className="relative z-20 h-full overflow-hidden rounded-3xl border border-border bg-card p-6">
              <Particles
                className="absolute inset-0 -z-10 opacity-10 transition-opacity duration-1000 group-hover:opacity-100"
                quantity={40}
                color="#10b981"
                vy={-0.1}
              />
              <TrendingUp className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="font-semibold text-foreground mb-1">Forecast 12 months</h3>
              <p className="text-sm text-muted-foreground">
                See your recurring costs projected forward. Know your annual spend before it surprises you.
              </p>
            </div>
          </HighlighterItem>

          <HighlighterItem className="rounded-3xl flex-1">
            <div className="relative z-20 h-full overflow-hidden rounded-3xl border border-border bg-card p-6">
              <Particles
                className="absolute inset-0 -z-10 opacity-10 transition-opacity duration-1000 group-hover:opacity-100"
                quantity={40}
                color="#f59e0b"
                vy={-0.1}
              />
              <PiggyBank className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="font-semibold text-foreground mb-1">Budget & Goals</h3>
              <p className="text-sm text-muted-foreground">
                Set category limits and track financial goals with visual progress rings.
              </p>
            </div>
          </HighlighterItem>
        </div>
      </HighlightGroup>
    </section>
  )
}

// ─── Main Landing ─────────────────────────────────────────────────────────────
export function LandingPage() {
  const { isSignedIn } = useAuth()

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-12 py-4 border-b border-border/50 backdrop-blur-md bg-background/80">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary">
            <Zap className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-sm tracking-tight">Arca</span>
        </div>
        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5" /> Go to Dashboard
            </Link>
          ) : (
            <>
              <Link href="/signin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Sign in
              </Link>
              <Link
                href="/signin"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Get started <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* ── Hero (full-screen glowing waves) ── */}
      <GlowyWavesHero />

      {/* ── Dashboard Preview ── */}
      <section className="relative z-10 px-6 py-10 pb-20 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <DashboardMockup />
        </motion.div>
      </section>

      {/* ── Features Grid ── */}
      <section className="relative z-10 px-6 py-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Everything you need to manage your money
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Built for people who want a clear picture of their finances without the spreadsheet.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className={`rounded-2xl border p-6 ${feat.bg} transition-all hover:scale-[1.02]`}
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-background/50 mb-4 ${feat.color}`}>
                <feat.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feat.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Interactive Subscription Demo ── */}
      <SubscriptionTrackingDemo />

      {/* ── How it works ── */}
      <section className="relative z-10 px-6 py-20 border-y border-border bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">Up and running in minutes</h2>
            <p className="text-muted-foreground text-lg">No bank connections. No data sharing. Just you and your money.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create your account', desc: 'Sign up in seconds. No credit card required, no bank linking needed.' },
              { step: '02', title: 'Add your subscriptions', desc: 'Pick from 100+ popular services or enter custom ones. Takes 2 minutes.' },
              { step: '03', title: 'Get full visibility', desc: 'Instantly see spending patterns, forecasts, and budget health.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <div className="text-5xl font-black text-muted/30 mb-3">{item.step}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="relative z-10 px-6 py-24 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">Simple, honest pricing</h2>
          <p className="text-muted-foreground text-lg">Start free. Upgrade when you need more power.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {PRICING.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border p-8 relative ${plan.highlight ? 'border-primary/40 bg-primary/5' : 'border-border bg-card'}`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">Most popular</span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-black text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">/{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>
              <ul className="space-y-2.5 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-foreground/80">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signin"
                className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.highlight
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-muted border border-border text-foreground hover:bg-muted/80'
                }`}
              >
                {plan.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA Section ── */}
      <CTA />

      {/* ── Footer ── */}
      <Footerdemo />
    </div>
  )
}
