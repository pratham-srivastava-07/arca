import { BarChart3, Bell, PiggyBank, Search, Target, TrendingUp } from 'lucide-react'

/*
 * Feature bento: 6 features, 6 cells, mixed cell sizes with varied
 * backgrounds (ink, tinted gradient, plain) so the grid has rhythm instead
 * of six white cards.
 */

function ReminderVisual() {
  return (
    <div className="mt-6 flex flex-col gap-2">
      {[
        { name: 'Netflix', days: 'in 3 days', amount: '$15.49', active: true },
        { name: 'Spotify', days: 'in 11 days', amount: '$11.99', active: false },
      ].map((row) => (
        <div
          key={row.name}
          className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
            row.active ? 'border-primary/25 bg-primary/5' : 'border-[#1b2447]/8 bg-white/60'
          }`}
        >
          <div className="flex items-center gap-3">
            <Bell className={`h-4 w-4 ${row.active ? 'text-primary' : 'text-[#8a93b8]'}`} />
            <span className="text-sm font-medium text-[#1b2447]">{row.name}</span>
            <span className="text-xs text-[#5a6690]">renews {row.days}</span>
          </div>
          <span className="font-mono text-sm font-semibold text-[#1b2447]">{row.amount}</span>
        </div>
      ))}
    </div>
  )
}

function ForecastVisual() {
  return (
    <svg viewBox="0 0 320 96" className="mt-6 h-24 w-full" role="img" aria-label="Rising 12-month spend forecast">
      <defs>
        <linearGradient id="forecast-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.511 0.262 276.966)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="oklch(0.511 0.262 276.966)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,78 C40,74 60,66 96,60 C132,54 150,58 186,48 C222,38 250,30 320,20 L320,96 L0,96 Z"
        fill="url(#forecast-fill)"
      />
      <path
        d="M0,78 C40,74 60,66 96,60 C132,54 150,58 186,48 C222,38 250,30 320,20"
        fill="none"
        stroke="oklch(0.511 0.262 276.966)"
        strokeWidth="2"
        strokeDasharray="4 4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Features() {
  return (
    <section id="features" className="bg-[#fdfdfe] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-[#1b2447] md:text-4xl">
          Everything between payday and renewal day
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[#5a6690]">
          Arca is built around the moments that actually cost you money: the renewal you forgot and the budget you meant to check.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {/* Reminders: the retention hook gets the biggest cell */}
          <div className="rounded-2xl border border-[#1b2447]/8 bg-gradient-to-br from-[#f2f5ff] to-white p-6 md:col-span-2">
            <Bell className="h-5 w-5 text-primary" />
            <h3 className="mt-4 text-lg font-semibold text-[#1b2447]">Renewal reminders</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#5a6690]">
              An email three days before each charge. Cancel in time or let it renew on purpose.
            </p>
            <ReminderVisual />
          </div>

          {/* Forecasting */}
          <div className="rounded-2xl border border-[#1b2447]/8 bg-white p-6 md:col-span-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="mt-4 text-lg font-semibold text-[#1b2447]">12-month forecasting</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#5a6690]">
              Every billing cycle projected forward, with what-if scenarios for price hikes and cancellations.
            </p>
            <ForecastVisual />
          </div>

          {/* Analytics: ink cell for contrast */}
          <div className="rounded-2xl bg-[#161d38] p-6">
            <BarChart3 className="h-5 w-5 text-[#9db1ff]" />
            <h3 className="mt-4 text-lg font-semibold text-white">Spending analytics</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#aab4d6]">
              Trends, categories, and a heatmap of the days your money actually leaves.
            </p>
          </div>

          {/* Budgets */}
          <div className="rounded-2xl border border-[#1b2447]/8 bg-white p-6">
            <PiggyBank className="h-5 w-5 text-primary" />
            <h3 className="mt-4 text-lg font-semibold text-[#1b2447]">Budgets</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#5a6690]">
              Category limits with live progress, so overspending shows up before it happens.
            </p>
          </div>

          {/* Goals */}
          <div className="rounded-2xl border border-[#1b2447]/8 bg-white p-6">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="mt-4 text-lg font-semibold text-[#1b2447]">Goals</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#5a6690]">
              Emergency fund, vacation, new laptop. Progress rings with real velocity.
            </p>
          </div>

          {/* Command palette: warm tint closes the grid */}
          <div className="rounded-2xl border border-[#1b2447]/8 bg-gradient-to-br from-[#fff6e8] to-white p-6">
            <Search className="h-5 w-5 text-[#b7791f]" />
            <h3 className="mt-4 text-lg font-semibold text-[#1b2447]">Instant search</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#5a6690]">
              Press <kbd className="rounded border border-[#1b2447]/15 bg-white px-1.5 py-0.5 font-mono text-xs">⌘K</kbd> and jump to any subscription, budget, or goal.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
