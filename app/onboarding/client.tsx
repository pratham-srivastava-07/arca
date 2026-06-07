'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Plus, Check, ChevronRight, Sparkles, Loader2 } from 'lucide-react'
import { createSubscription } from '@/actions/subscriptions'
import { completeOnboarding } from '@/actions/user'

const POPULAR_SERVICES = [
  { name: 'Netflix', category: 'Entertainment', amount: 15.99, logoBg: '#E50914', logoColor: '#fff', billingCycle: 'monthly' as const },
  { name: 'Spotify', category: 'Music', amount: 9.99, logoBg: '#1DB954', logoColor: '#000', billingCycle: 'monthly' as const },
  { name: 'YouTube Premium', category: 'Entertainment', amount: 13.99, logoBg: '#FF0000', logoColor: '#fff', billingCycle: 'monthly' as const },
  { name: 'Apple TV+', category: 'Entertainment', amount: 9.99, logoBg: '#000000', logoColor: '#fff', billingCycle: 'monthly' as const },
  { name: 'Disney+', category: 'Entertainment', amount: 7.99, logoBg: '#006E99', logoColor: '#fff', billingCycle: 'monthly' as const },
  { name: 'Hulu', category: 'Entertainment', amount: 7.99, logoBg: '#1CE783', logoColor: '#000', billingCycle: 'monthly' as const },
  { name: 'ChatGPT Plus', category: 'AI Tools', amount: 20.00, logoBg: '#10A37F', logoColor: '#fff', billingCycle: 'monthly' as const },
  { name: 'GitHub Pro', category: 'Development', amount: 4.00, logoBg: '#24292e', logoColor: '#fff', billingCycle: 'monthly' as const },
  { name: 'AWS', category: 'Cloud', amount: 0, logoBg: '#FF9900', logoColor: '#000', billingCycle: 'monthly' as const },
  { name: 'Adobe CC', category: 'Design', amount: 54.99, logoBg: '#FF0000', logoColor: '#fff', billingCycle: 'monthly' as const },
  { name: 'Notion', category: 'Productivity', amount: 8.00, logoBg: '#000000', logoColor: '#fff', billingCycle: 'monthly' as const },
  { name: 'Figma', category: 'Design', amount: 12.00, logoBg: '#F24E1E', logoColor: '#fff', billingCycle: 'monthly' as const },
  { name: 'Dropbox', category: 'Storage', amount: 9.99, logoBg: '#0061FF', logoColor: '#fff', billingCycle: 'monthly' as const },
  { name: 'Slack', category: 'Productivity', amount: 7.25, logoBg: '#4A154B', logoColor: '#fff', billingCycle: 'monthly' as const },
  { name: '1Password', category: 'Security', amount: 2.99, logoBg: '#1A8CFF', logoColor: '#fff', billingCycle: 'monthly' as const },
  { name: 'Duolingo', category: 'Education', amount: 6.99, logoBg: '#58CC02', logoColor: '#fff', billingCycle: 'monthly' as const },
]

interface CustomSub {
  name: string
  category: string
  amount: string
  billingCycle: 'monthly' | 'yearly'
}

interface Props {
  userName: string
}

const slide = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
}

export function OnboardingClient({ userName }: Props) {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [custom, setCustom] = useState<CustomSub>({ name: '', category: 'Other', amount: '', billingCycle: 'monthly' })
  const [pending, startTransition] = useTransition()

  const firstName = userName.split(' ')[0]
  const totalSteps = 3

  const toggleService = (name: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })
  }

  const finish = () => {
    startTransition(async () => {
      const today = new Date()
      const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
        .toISOString().split('T')[0]

      // Create selected popular services
      const creates = POPULAR_SERVICES
        .filter((s) => selected.has(s.name))
        .map((s) =>
          createSubscription({
            name: s.name,
            category: s.category,
            amount: s.amount > 0 ? s.amount : 10,
            billingCycle: s.billingCycle,
            nextPaymentDate: nextMonth,
            logoBg: s.logoBg,
            logoColor: s.logoColor,
          })
        )

      // Add custom subscription if filled out
      if (custom.name && parseFloat(custom.amount) > 0) {
        creates.push(
          createSubscription({
            name: custom.name,
            category: custom.category,
            amount: parseFloat(custom.amount),
            billingCycle: custom.billingCycle,
            nextPaymentDate: nextMonth,
          })
        )
      }

      await Promise.all(creates)
      await completeOnboarding()
      router.push('/dashboard')
    })
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary">
          <Zap className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={2.5} />
        </div>
        <span className="font-semibold text-sm tracking-tight text-foreground">Arca</span>
      </div>

      {/* Progress */}
      <div className="absolute top-6 right-6 flex items-center gap-2">
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i <= step ? 'bg-primary w-6' : 'bg-muted w-4'
            }`}
          />
        ))}
      </div>

      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {/* Step 0: Welcome */}
          {step === 0 && (
            <motion.div key="welcome" {...slide} transition={{ duration: 0.3 }} className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-6"
              >
                <Sparkles className="w-8 h-8 text-primary" />
              </motion.div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Welcome, {firstName}!
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                Let's set up your Arca account. It takes about 2 minutes and you'll instantly see your subscription costs.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
                {[
                  { step: '01', title: 'Add subscriptions', desc: 'Pick from popular services or enter your own' },
                  { step: '02', title: 'Get analytics', desc: 'See your monthly cost and upcoming payments' },
                  { step: '03', title: 'Track & forecast', desc: 'Understand your spending patterns' },
                ].map((item) => (
                  <div key={item.step} className="rounded-xl border border-border bg-card p-4">
                    <div className="text-2xl font-black text-muted-foreground/30 mb-2">{item.step}</div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 mx-auto px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-all"
              >
                Get started
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* Step 1: Select subscriptions */}
          {step === 1 && (
            <motion.div key="subscriptions" {...slide} transition={{ duration: 0.3 }}>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">What are you subscribed to?</h2>
                <p className="text-muted-foreground">Select all that apply. You can add more later from the subscriptions page.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                {POPULAR_SERVICES.map((service) => {
                  const isSelected = selected.has(service.name)
                  return (
                    <button
                      key={service.name}
                      onClick={() => toggleService(service.name)}
                      className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-card text-foreground hover:border-border/80 hover:bg-muted/50'
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                        style={{ backgroundColor: service.logoBg, color: service.logoColor }}
                      >
                        {service.name[0]}
                      </div>
                      <span className="text-xs font-medium leading-tight">{service.name}</span>
                      <span className="text-[10px] text-muted-foreground">${service.amount > 0 ? service.amount : '?'}/mo</span>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center"
                        >
                          <Check className="w-2.5 h-2.5 text-primary-foreground" />
                        </motion.div>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Custom subscription */}
              <div className="rounded-xl border border-border bg-card p-4 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Plus className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-semibold text-foreground">Add a custom subscription</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <input
                    type="text"
                    placeholder="Name (e.g. Gym)"
                    value={custom.name}
                    onChange={(e) => setCustom((p) => ({ ...p, name: e.target.value }))}
                    className="col-span-2 sm:col-span-1 px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <input
                    type="number"
                    placeholder="Amount ($)"
                    value={custom.amount}
                    onChange={(e) => setCustom((p) => ({ ...p, amount: e.target.value }))}
                    className="px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <select
                    value={custom.category}
                    onChange={(e) => setCustom((p) => ({ ...p, category: e.target.value }))}
                    className="px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {['Entertainment', 'Music', 'AI Tools', 'Development', 'Cloud', 'Design', 'Productivity', 'Education', 'Health', 'Other'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <select
                    value={custom.billingCycle}
                    onChange={(e) => setCustom((p) => ({ ...p, billingCycle: e.target.value as 'monthly' | 'yearly' }))}
                    className="px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>

              {selected.size > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 text-center"
                >
                  <p className="text-sm text-muted-foreground">
                    {selected.size} service{selected.size !== 1 ? 's' : ''} selected ·{' '}
                    <span className="text-foreground font-semibold">
                      ${POPULAR_SERVICES.filter((s) => selected.has(s.name)).reduce((sum, s) => sum + s.amount, 0).toFixed(2)}/mo
                    </span>
                  </p>
                </motion.div>
              )}

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setStep(0)}
                  className="px-5 py-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all"
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: All done */}
          {step === 2 && (
            <motion.div key="done" {...slide} transition={{ duration: 0.3 }} className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring' }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-green-500/10 border border-green-500/20 mb-6"
              >
                <Check className="w-10 h-10 text-green-500" />
              </motion.div>
              <h2 className="text-3xl font-bold text-foreground mb-3">You're all set!</h2>
              <p className="text-muted-foreground mb-4 max-w-sm mx-auto">
                {selected.size > 0
                  ? `We'll track your ${selected.size} subscription${selected.size !== 1 ? 's' : ''} and give you instant insights.`
                  : "Your account is ready. You can add subscriptions anytime from the dashboard."}
              </p>

              {selected.size > 0 && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 mb-8">
                  <span className="text-primary font-semibold">
                    ${POPULAR_SERVICES.filter((s) => selected.has(s.name)).reduce((sum, s) => sum + s.amount, 0).toFixed(2)}/mo
                  </span>
                  <span className="text-muted-foreground text-sm">in recurring costs</span>
                </div>
              )}

              <div className="flex items-center gap-3 justify-center">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={finish}
                  disabled={pending}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-all disabled:opacity-60"
                >
                  {pending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Setting up...
                    </>
                  ) : (
                    <>
                      Go to dashboard
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
