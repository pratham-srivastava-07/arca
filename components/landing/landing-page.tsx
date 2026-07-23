import Link from 'next/link'
import { ArrowRight, LayoutDashboard } from 'lucide-react'
import { ArcaMark } from '@/components/ui/arca-mark'
import { HorizonHero } from '@/components/ui/horizon-hero-section'
import { LogoMarquee } from '@/components/landing/logo-marquee'
import { Features } from '@/components/landing/features'
import { Pricing } from '@/components/landing/pricing'

/*
 * Landing composition (design.md): mountain hero kept as the one cinematic
 * moment, then a paper-and-ink editorial page. Thin borders carry structure,
 * lime appears exactly once (the dark conversion CTA), and the three hero
 * promises are delivered by the capability sections that follow.
 */

function Nav({ isSignedIn }: { isSignedIn: boolean }) {
  return (
    <nav className="fixed inset-x-0 top-0 z-20 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-[min(100%-48px,1280px)] items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <ArcaMark size={24} />
          <span className="text-sm font-semibold tracking-tight text-foreground">Arca</span>
        </Link>
        <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#product" className="transition-colors hover:text-foreground">Product</a>
          <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
        </div>
        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 rounded-lg bg-foreground px-3.5 py-1.5 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/signin" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-foreground px-3.5 py-1.5 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
              >
                Start for free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

function Statement() {
  return (
    <section className="bg-background">
      <div className="mx-auto w-[min(100%-48px,1280px)] py-24 md:py-32">
        <h2 className="max-w-3xl text-4xl font-semibold leading-[1.06] tracking-tight text-foreground md:text-[3.25rem]">
          Subscriptions are designed to be forgotten.
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Free trials roll over. Prices creep up. Arca lines every recurring
          charge up in one place and warns you before each one hits your card.
        </p>
      </div>
    </section>
  )
}

const FACTS = [
  { value: '3 days', label: 'advance notice on every renewal' },
  { value: '12 months', label: 'of spending forecast ahead' },
  { value: '7', label: 'subscriptions tracked on the free plan' },
  { value: '$0', label: 'to start, no card required' },
]

function ProductSection() {
  return (
    <section id="product" className="bg-background">
      <div className="mx-auto w-[min(100%-48px,1280px)]">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            One quiet dashboard for all of it
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            Monthly spend, active subscriptions, upcoming charges, and budget
            health. No spreadsheet required.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card p-1.5">
          <div className="overflow-hidden rounded-xl border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/screenshots/dashboard.png"
              alt="The Arca dashboard: monthly spend, upcoming renewals, and recent transactions"
              width={1440}
              height={900}
              loading="lazy"
              className="block w-full"
            />
          </div>
        </div>

        {/* Product facts as evidence, set in a bordered Swiss grid */}
        <div className="mt-20 grid grid-cols-2 border-y border-border md:grid-cols-4 md:divide-x md:divide-border">
          {FACTS.map((fact) => (
            <div key={fact.value} className="px-2 py-8 md:px-8">
              <p className="font-mono text-3xl font-medium tracking-tight text-foreground">{fact.value}</p>
              <p className="mt-2 max-w-[22ch] text-sm leading-snug text-muted-foreground">{fact.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DarkCta() {
  return (
    <section className="relative overflow-hidden bg-[#101514]">
      {/* one soft lime glow marks the destination */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(201,243,107,0.08),transparent_65%)]" />
      <div className="relative mx-auto w-[min(100%-48px,1280px)] pt-24 text-center md:pt-32">
        <h2 className="text-4xl font-semibold tracking-tight text-[#f5f5ef] md:text-5xl">
          Start before the next renewal.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#a0a69f]">
          Adding your first three subscriptions takes about a minute.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/signup"
            className="group flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition-colors hover:bg-[color-mix(in_oklch,var(--brand),#111_8%)] active:translate-y-px"
          >
            Start for free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* The product itself is the destination: the dark dashboard rises
            into view and the fold cuts it, like stepping inside. */}
        <div className="mx-auto mt-16 h-[280px] max-w-5xl overflow-hidden rounded-t-2xl border border-b-0 border-white/10 md:h-[400px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/screenshots/dashboard-dark.png"
            alt="The Arca dashboard in dark mode"
            width={1440}
            height={900}
            loading="lazy"
            className="block w-full"
          />
        </div>
      </div>

      <footer className="relative border-t border-white/10">
        <div className="mx-auto flex w-[min(100%-48px,1280px)] flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
          <div className="flex items-center gap-2.5">
            <ArcaMark size={24} tile="#f5f5ef" arc="#a3d93f" horizon="#111111" />
            <span className="text-sm font-semibold tracking-tight text-[#f5f5ef]">Arca</span>
            <span className="ml-2 text-sm text-[#6f756e]">Know what you pay for.</span>
          </div>
          <div className="flex items-center gap-7 text-sm text-[#a0a69f]">
            <a href="#product" className="transition-colors hover:text-[#f5f5ef]">Product</a>
            <a href="#pricing" className="transition-colors hover:text-[#f5f5ef]">Pricing</a>
            <Link href="/signin" className="transition-colors hover:text-[#f5f5ef]">Sign in</Link>
          </div>
          <p className="text-sm text-[#6f756e]">© 2026 Arca</p>
        </div>
      </footer>
    </section>
  )
}

export function LandingPage({ isSignedIn }: { isSignedIn: boolean }) {
  return (
    <div className="force-light min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav isSignedIn={isSignedIn} />
      <main>
        <HorizonHero />
        {/* Dissolve the hero's valley mist into the paper background. */}
        <div aria-hidden className="h-28 bg-gradient-to-b from-[#e9eefb] to-[#f7f7f3]" />
        <Statement />
        <ProductSection />
        <Features />
        <LogoMarquee />
        <Pricing />
        <DarkCta />
      </main>
    </div>
  )
}
