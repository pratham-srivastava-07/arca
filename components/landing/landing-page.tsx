'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Zap, ArrowRight, BarChart3, CreditCard, TrendingUp, Target,
  PiggyBank, Search, CheckCircle, Star, ChevronRight,
} from 'lucide-react'

// ─── Mini Dashboard Mockup ────────────────────────────────────────────────────
function DashboardMockup() {
  return (
    <div className="relative w-full max-w-3xl mx-auto mt-16 select-none" aria-hidden>
      {/* Glow behind */}
      <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-3xl scale-95" />

      {/* Browser chrome */}
      <div className="relative rounded-2xl border border-white/10 bg-[#0d0d12] overflow-hidden shadow-2xl shadow-black/60">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-[#111118]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 mx-4">
            <div className="flex items-center gap-2 bg-white/5 rounded-md px-3 py-1.5 max-w-xs mx-auto">
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="text-[11px] text-white/40 font-mono">arca.app/dashboard</span>
            </div>
          </div>
        </div>

        {/* App content */}
        <div className="flex h-72">
          {/* Sidebar */}
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

          {/* Main */}
          <div className="flex-1 p-4 overflow-hidden">
            {/* Greeting */}
            <div className="mb-4">
              <div className="h-2 w-24 rounded bg-white/10 mb-1.5" />
              <div className="h-4 w-40 rounded bg-white/20" />
            </div>

            {/* Metric cards */}
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

            {/* Chart */}
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
                  fill="url(#chartGrad)"
                  stroke="none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                />
                <motion.path
                  d="M0,35 C20,30 40,28 60,25 C80,22 100,20 120,18 C140,16 160,22 180,20 C200,18 220,12 240,10 C260,8 280,14 300,12"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
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
    description: 'Every recurring payment visible in one place. Netflix, AWS, Spotify — tracked automatically.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: BarChart3,
    title: 'Spending Analytics',
    description: 'Interactive charts that reveal patterns. Understand where every dollar actually goes.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    icon: TrendingUp,
    title: '12-Month Forecasting',
    description: 'See the future before it arrives. Run "what-if" scenarios and plan smarter.',
    color: 'text-primary',
    bg: 'bg-primary/10 border-primary/20',
  },
  {
    icon: PiggyBank,
    title: 'Budget Planner',
    description: 'Set category limits, track progress in real time, and get alerts before you overspend.',
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
  },
  {
    icon: Target,
    title: 'Financial Goals',
    description: 'Emergency fund, vacation, new laptop — track every goal with velocity indicators.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: Search,
    title: 'Command Palette',
    description: 'Find any subscription, budget, or goal instantly with ⌘K. Your financial brain.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10 border-pink-500/20',
  },
]

const PRICING = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Everything you need to get started.',
    cta: 'Get started',
    ctaHref: '/sign-up',
    highlight: false,
    features: [
      'Unlimited subscriptions',
      'Basic spending dashboard',
      'Budget categories',
      'Financial goals',
      'Dark & light mode',
    ],
  },
  {
    name: 'Pro',
    price: '$9',
    period: 'per month',
    description: 'Full analytics & forecasting power.',
    cta: 'Start free trial',
    ctaHref: '/sign-up',
    highlight: true,
    features: [
      'Everything in Free',
      'Advanced analytics',
      '12-month forecasting',
      'What-if scenario engine',
      'Spending heatmaps',
      'Priority support',
    ],
  },
]

const STATS = [
  { value: '$2.3M', label: 'tracked' },
  { value: '12K', label: 'active users' },
  { value: '50K+', label: 'subscriptions found' },
  { value: '99.9%', label: 'uptime' },
]

// ─── Main Landing ─────────────────────────────────────────────────────────────
export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080810] text-white overflow-x-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-primary/10 blur-[140px] rounded-full" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* ── Nav ── */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary">
            <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-sm tracking-tight text-white">Arca</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Get started <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 pt-20 pb-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-medium mb-8">
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Now in open beta
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
            Subscription chaos,
            <br />
            <span className="bg-gradient-to-r from-primary via-blue-400 to-purple-400 bg-clip-text text-transparent">
              finally tamed.
            </span>
          </h1>

          {/* Subtext */}
          <p className="max-w-xl mx-auto text-lg text-white/50 leading-relaxed mb-10">
            Arca tracks every recurring payment, forecasts your spending for the next 12 months,
            and gives you beautiful analytics to take back control of your finances.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/sign-up"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-base hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-95"
            >
              Start for free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/sign-in"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 font-medium text-base hover:bg-white/10 transition-colors"
            >
              Sign in to your account
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="mt-4 text-sm text-white/30">
            No credit card required &middot; Free forever &middot; 2-minute setup
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <DashboardMockup />
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="relative z-10 px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-[#0d0d14] px-8 py-8 text-center">
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-white/40">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section className="relative z-10 px-6 py-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white mb-4">
            Everything you need to manage your money
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
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
              className={`rounded-2xl border p-6 ${feat.bg} hover:bg-opacity-80 transition-all group`}
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 mb-4 ${feat.color}`}>
                <feat.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-white mb-2">{feat.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="relative z-10 px-6 py-20 bg-white/2 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold tracking-tight text-white mb-4">Up and running in minutes</h2>
            <p className="text-white/40 text-lg">No bank connections. No data sharing. Just you and your money.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Create your account',
                desc: 'Sign up in seconds. No credit card required, no bank linking needed.',
              },
              {
                step: '02',
                title: 'Add your subscriptions',
                desc: 'Pick from 100+ popular services or enter custom ones. Takes 2 minutes.',
              },
              {
                step: '03',
                title: 'Get full visibility',
                desc: 'Instantly see your spending patterns, forecasts, and budget health.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative"
              >
                <div className="text-5xl font-black text-white/5 mb-3">{item.step}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
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
          <h2 className="text-4xl font-bold tracking-tight text-white mb-4">Simple, honest pricing</h2>
          <p className="text-white/40 text-lg">Start free. Upgrade when you need more power.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {PRICING.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border p-8 relative ${
                plan.highlight
                  ? 'border-primary/40 bg-primary/8'
                  : 'border-white/8 bg-white/3'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold">
                    Most popular
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-white/40 text-sm">/{plan.period}</span>
                </div>
                <p className="text-sm text-white/40 mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-2.5 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/70">
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.ctaHref}
                className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.highlight
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-white/8 border border-white/10 text-white hover:bg-white/12'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative z-10 px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 to-purple-500/5 p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-primary/5 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white mb-4">
              Take control of your subscriptions today
            </h2>
            <p className="text-white/50 mb-8 text-lg">
              Join thousands who finally know where their money goes.
            </p>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-semibold text-base hover:bg-primary/90 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-95"
            >
              Get started for free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="mt-4 text-sm text-white/30">Free forever · No credit card · Cancel anytime</p>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary">
              <Zap className="w-3 h-3 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-semibold text-sm text-white/80">Arca</span>
          </div>
          <p className="text-sm text-white/30">
            &copy; {new Date().getFullYear()} Arca. Built with care.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <Link href="/sign-in" className="hover:text-white/70 transition-colors">Sign in</Link>
            <Link href="/sign-up" className="hover:text-white/70 transition-colors">Sign up</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
