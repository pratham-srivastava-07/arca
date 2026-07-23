import { Bell, BellOff } from 'lucide-react'
import { ServiceLogo } from '@/components/ui/service-logo'

/*
 * The hero makes three promises; these two splits deliver the second and
 * third ("See the charge coming" / "Plan the whole year") with real product
 * material: the renewals rail as a live component preview, and a forecast
 * chart computed from the same demo lineup the preview shows.
 */

const RENEWALS = [
  { name: 'Netflix', when: 'renews in 2 days', price: '$15.49', reminder: true },
  { name: 'Spotify', when: 'renews in 5 days', price: '$11.99', reminder: true },
  { name: 'ChatGPT Plus', when: 'renews in 9 days', price: '$20.00', reminder: false },
  { name: 'YouTube Premium', when: 'renews in 14 days', price: '$13.99', reminder: false },
]

function RenewalsPreview() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-medium text-foreground">Upcoming renewals</p>
        <p className="font-mono text-xs text-muted-foreground">next 14 days</p>
      </div>
      <div className="mt-2 divide-y divide-border">
        {RENEWALS.map((item) => (
          <div key={item.name} className="flex items-center gap-3 py-3.5">
            <ServiceLogo name={item.name} size={32} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.when}</p>
            </div>
            {item.reminder ? (
              <Bell className="h-3.5 w-3.5 text-foreground" aria-label="Reminder on" />
            ) : (
              <BellOff className="h-3.5 w-3.5 text-muted-foreground/50" aria-label="Reminder off" />
            )}
            <p className="w-16 text-right font-mono text-sm text-foreground">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/*
 * Forecast preview: 12 months of committed spend for the lineup above,
 * with and without Netflix. Both series are computed here, not drawn by
 * eye; the widening wedge is the argument.
 */
const MONTHLY_TOTAL = 94.5
const MONTHLY_WITHOUT_NETFLIX = MONTHLY_TOTAL - 15.49

function forecastPoints(monthly: number) {
  const W = 560
  const H = 280
  const padX = 8
  const padTop = 16
  const padBottom = 34
  const max = MONTHLY_TOTAL * 12
  return Array.from({ length: 12 }, (_, i) => {
    const x = padX + ((W - 150 - padX) * i) / 11
    const y = H - padBottom - (H - padTop - padBottom) * ((monthly * (i + 1)) / max)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
}

function ForecastPreview() {
  const current = forecastPoints(MONTHLY_TOTAL)
  const without = forecastPoints(MONTHLY_WITHOUT_NETFLIX)
  const lastCurrent = current.split(' ').at(-1)!.split(',')
  const lastWithout = without.split(' ').at(-1)!.split(',')

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-sm font-medium text-foreground">Committed spend, next 12 months</p>
      <svg
        viewBox="0 0 560 280"
        role="img"
        aria-label="Forecast: $1,134 over 12 months as is, or $948 without Netflix"
        className="mt-3 w-full"
      >
        <line x1="8" y1="246" x2="552" y2="246" stroke="var(--border)" strokeWidth="1" />
        <polyline points={current} fill="none" stroke="var(--foreground)" strokeWidth="2" strokeLinecap="round" />
        <polyline points={without} fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="5 5" strokeLinecap="round" />
        <text x={Number(lastCurrent[0]) + 10} y={Number(lastCurrent[1]) + 4} className="fill-[var(--foreground)] font-mono text-[13px]">
          $1,134
        </text>
        <text x={Number(lastWithout[0]) + 10} y={Number(lastWithout[1]) + 4} className="fill-[var(--muted-foreground)] font-mono text-[13px]">
          $948
        </text>
        <text x="8" y="272" className="fill-[var(--muted-foreground)] font-mono text-[11px]">Aug &apos;26</text>
        <text x="368" y="272" className="fill-[var(--muted-foreground)] font-mono text-[11px]">Jul &apos;27</text>
      </svg>
      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1.5 text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="h-0.5 w-5 rounded-full bg-foreground" aria-hidden />
          Current lineup
        </span>
        <span className="flex items-center gap-2">
          <span className="h-0 w-5 border-t border-dashed border-muted-foreground" aria-hidden />
          Without Netflix: $186 back
        </span>
      </div>
    </div>
  )
}

export function Features() {
  return (
    <section className="bg-background">
      <div className="mx-auto w-[min(100%-48px,1280px)] space-y-24 py-24 md:space-y-32 md:py-32">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Reminders</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              See the charge coming.
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              An email lands three days before each renewal. Cancel in time,
              or let it renew on purpose. Either way, you decided.
            </p>
          </div>
          <RenewalsPreview />
        </div>

        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="md:order-2">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Forecasting</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Plan the whole year.
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              Every billing cycle projected forward. Ask what happens if a
              price rises or a subscription goes, and read the answer off one
              line.
            </p>
          </div>
          <div className="md:order-1">
            <ForecastPreview />
          </div>
        </div>
      </div>
    </section>
  )
}
