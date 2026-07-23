import Link from 'next/link'
import { Check } from 'lucide-react'

/*
 * Editorial pricing: two columns inside one hairline frame, no card
 * shadows. Copy states the real free-tier limits; the Pro column carries
 * a note instead of a second signup button.
 */

const FREE = [
  'Up to 7 subscriptions',
  'Renewal reminders on 2 of them',
  '2 budgets and 2 goals',
  'Last month of spending history',
  'Dashboard, search, dark mode',
]

const PRO = [
  'Unlimited subscriptions, budgets, goals',
  'Reminders on everything',
  '12-month forecasting and scenarios',
  'Full history, heatmap, CSV export',
  'Priority support',
]

export function Pricing() {
  return (
    <section id="pricing" className="bg-background">
      <div className="mx-auto w-[min(100%-48px,1280px)] py-24 md:py-32">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Free to start. Honest when you outgrow it.
        </h2>

        <div className="mt-12 grid overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-2 md:divide-x md:divide-border">
          <div className="flex flex-col p-8 max-md:border-b max-md:border-border md:p-10">
            <p className="text-sm font-medium text-foreground">Free</p>
            <p className="mt-3 flex items-baseline gap-2">
              <span className="font-mono text-5xl font-medium tracking-tight text-foreground">$0</span>
              <span className="text-sm text-muted-foreground">forever</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Everything you need to see where your money goes.
            </p>
            <ul className="mt-8 flex-1 space-y-3">
              {FREE.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="mt-10 inline-flex w-fit items-center rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/85 active:translate-y-px"
            >
              Start for free
            </Link>
          </div>

          <div className="flex flex-col p-8 md:p-10">
            <p className="text-sm font-medium text-foreground">Pro</p>
            <p className="mt-3 flex items-baseline gap-2">
              <span className="font-mono text-5xl font-medium tracking-tight text-foreground">$9</span>
              <span className="text-sm text-muted-foreground">per month</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              For people whose subscriptions outgrew a mental list.
            </p>
            <ul className="mt-8 flex-1 space-y-3">
              {PRO.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-10 text-sm text-muted-foreground">Pro billing opens soon.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
