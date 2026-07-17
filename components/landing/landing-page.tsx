import Link from 'next/link'
import { ArrowRight, LayoutDashboard, Zap } from 'lucide-react'
import { HorizonHero } from '@/components/ui/horizon-hero-section'
import { LogoMarquee } from '@/components/landing/logo-marquee'
import { Features } from '@/components/landing/features'
import { Pricing } from '@/components/landing/pricing'

/*
 * Landing page: fixed light theme, independent of the in-app dark theme.
 * Server component; the only client islands are the hero and Clerk's
 * signed-in/out gates (SSR-aware, no hydration branch on useAuth).
 */

function Nav({ isSignedIn }: { isSignedIn: boolean }) {
  return (
    <nav className="fixed inset-x-0 top-0 z-20 border-b border-[#1b2447]/8 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
            <Zap className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-display text-sm font-semibold tracking-tight text-[#1b2447]">Arca</span>
        </Link>
        <div className="hidden items-center gap-7 text-sm text-[#5a6690] md:flex">
          <a href="#features" className="transition-colors hover:text-[#1b2447]">Features</a>
          <a href="#pricing" className="transition-colors hover:text-[#1b2447]">Pricing</a>
        </div>
        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              Open dashboard
            </Link>
          ) : (
            <>
              <Link href="/signin" className="text-sm text-[#5a6690] transition-colors hover:text-[#1b2447]">
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
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

function ProductFrame() {
  return (
    <section className="bg-[#fdfdfe] pb-4 pt-20 md:pt-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mx-auto max-w-2xl text-center font-display text-3xl font-bold tracking-tight text-[#1b2447] md:text-4xl">
          One quiet dashboard for all of it
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-base leading-relaxed text-[#5a6690]">
          Monthly spend, active subscriptions, upcoming charges, and budget health. No spreadsheet required.
        </p>
        <div className="mt-12 overflow-hidden rounded-2xl border border-[#1b2447]/10 bg-[#10131f] shadow-2xl shadow-[#1b2447]/15">
          {/* Real product screenshot, captured from the running app */}
          <img
            src="/screenshots/dashboard.png"
            alt="The Arca dashboard showing monthly spend, active subscriptions, upcoming payments, and budget summary"
            width={1440}
            height={900}
            className="block w-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}

function ClosingCta() {
  return (
    <section className="bg-[#fdfdfe] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-[#141b33] px-8 py-16 text-center md:py-20">
          {/* Dawn glow echoes the hero */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
            style={{ background: 'radial-gradient(60% 100% at 50% 100%, rgba(255,190,120,0.28), transparent)' }}
          />
          <h2 className="relative font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            Start before the next renewal
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-base leading-relaxed text-[#aab4d6]">
            Adding your first three subscriptions takes about a minute.
          </p>
          <Link
            href="/signup"
            className="group relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#141b33] transition-all hover:bg-[#eef1ff] active:scale-[0.98]"
          >
            Start for free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[#1b2447]/8 bg-[#fdfdfe]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
            <Zap className="h-3 w-3 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-medium text-[#1b2447]">Arca</span>
          <span className="text-sm text-[#8a93b8]">Know what you pay for.</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-[#5a6690]">
          <a href="#features" className="transition-colors hover:text-[#1b2447]">Features</a>
          <a href="#pricing" className="transition-colors hover:text-[#1b2447]">Pricing</a>
          <Link href="/signin" className="transition-colors hover:text-[#1b2447]">Sign in</Link>
        </div>
        <p className="text-xs text-[#8a93b8]">© 2026 Arca</p>
      </div>
    </footer>
  )
}

export function LandingPage({ isSignedIn }: { isSignedIn: boolean }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fdfdfe]">
      <Nav isSignedIn={isSignedIn} />
      <main>
        <HorizonHero />
        {/* Dissolve the hero's valley mist into the page background. */}
        <div aria-hidden className="h-28 bg-gradient-to-b from-[#e9eefb] to-[#fdfdfe]" />
        <LogoMarquee />
        <ProductFrame />
        <Features />
        <Pricing />
        <ClosingCta />
      </main>
      <Footer />
    </div>
  )
}
