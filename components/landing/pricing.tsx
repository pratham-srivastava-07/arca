import Link from 'next/link'
import { Check } from 'lucide-react'

/*
 * Pricing copy states the real free-tier limits (7 subscriptions, reminders
 * on 2, 2 budgets, 2 goals, 1 month of history) so the landing page never
 * promises more than the product enforces.
 */

const TIERS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Everything you need to see where your money goes.',
    highlight: false,
    features: [
      'Up to 7 subscriptions',
      'Renewal reminders on 2 of them',
      '2 budgets and 2 goals',
      'Last month of spending history',
      'Dashboard, search, dark mode',
    ],
  },
  {
    name: 'Pro',
    price: '$9',
    period: 'per month',
    description: 'For people whose subscriptions outgrew a mental list.',
    highlight: true,
    features: [
      'Unlimited subscriptions, budgets, goals',
      'Reminders on everything',
      '12-month forecasting and scenarios',
      'Full history, heatmap, CSV export',
      'Priority support',
    ],
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="bg-[#f7f9ff] py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center font-display text-3xl font-bold tracking-tight text-[#1b2447] md:text-4xl">
          Free to start. Honest when you outgrow it.
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-7 ${
                tier.highlight
                  ? 'border border-primary/25 bg-white shadow-xl shadow-primary/10'
                  : 'border border-[#1b2447]/8 bg-white/70'
              }`}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold text-[#1b2447]">{tier.name}</h3>
                {tier.highlight && (
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    Most complete
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-bold tracking-tight text-[#1b2447]">{tier.price}</span>
                <span className="text-sm text-[#5a6690]">{tier.period}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#5a6690]">{tier.description}</p>
              <ul className="mt-6 space-y-2.5">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-[#33406e]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className={`mt-7 flex w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] ${
                  tier.highlight
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90'
                    : 'border border-[#1b2447]/15 text-[#1b2447] hover:bg-white'
                }`}
              >
                Start for free
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-[#8a93b8]">Pro billing opens soon.</p>
      </div>
    </section>
  )
}
