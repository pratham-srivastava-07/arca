'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import type { HorizonSceneController } from '@/components/ui/horizon-scene'

gsap.registerPlugin(ScrollTrigger)

/*
 * Scroll-story hero: a pre-dawn sky that brightens as you scroll, camera
 * gliding toward the horizon through layered ridgelines. The CSS gradient
 * owns the sky; the Three.js scene (stars, ridges, sun) is loaded with a
 * dynamic import after hydration so it never blocks first paint. All scroll
 * work runs through one scrubbed ScrollTrigger; rendering pauses when the
 * tab or section is hidden.
 */

const SECTIONS = [
  {
    headline: 'Know what you pay for.',
    sub: 'Track every subscription, see renewals before they charge, and plan the year ahead.',
    cta: true,
  },
  {
    headline: 'See the charge coming.',
    sub: 'Renewal reminders land three days early, so nothing surprises your card again.',
    cta: false,
  },
  {
    headline: 'Plan the whole year.',
    sub: 'Forecasting turns your subscriptions into a 12-month picture you can act on.',
    cta: true,
  },
]

export function HorizonHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const skyDawnRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true)
      return
    }
    const canvas = canvasRef.current
    const container = containerRef.current
    const viewport = viewportRef.current
    if (!canvas || !container || !viewport) return

    let sceneCtl: HorizonSceneController | null = null
    let cancelled = false
    let inView = true
    const progress = { value: 0 }

    // Three.js arrives as its own chunk; the story works without it until then.
    import('@/components/ui/horizon-scene').then((m) => {
      if (cancelled) return
      sceneCtl = m.initHorizonScene(canvas)
      sceneCtl.applyProgress(progress.value)
      sceneCtl.setRendering(!document.hidden && inView)
    })

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: viewport,
        pinSpacing: false,
      })
      gsap.to(progress, {
        value: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.7,
        },
        onUpdate: () => sceneCtl?.applyProgress(progress.value),
      })
      // Dawn layer crossfades in over the base sky.
      if (skyDawnRef.current) {
        gsap.to(skyDawnRef.current, {
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: container, start: 'top top', end: 'bottom bottom', scrub: 0.7 },
        })
      }
      // Text sections: hold, hand off, hold.
      const windows = [
        { fadeIn: null, fadeOut: [0.22, 0.32] },
        { fadeIn: [0.36, 0.44], fadeOut: [0.58, 0.68] },
        { fadeIn: [0.74, 0.84], fadeOut: null },
      ] as const
      sectionRefs.current.forEach((el, i) => {
        if (!el) return
        const w = windows[i]
        const tl = gsap.timeline({
          scrollTrigger: { trigger: container, start: 'top top', end: 'bottom bottom', scrub: 0.7 },
        })
        tl.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 28 }, 0)
        if (w.fadeIn) tl.to(el, { opacity: 1, y: 0, duration: w.fadeIn[1] - w.fadeIn[0] }, w.fadeIn[0])
        if (w.fadeOut) tl.to(el, { opacity: 0, y: -24, duration: w.fadeOut[1] - w.fadeOut[0] }, w.fadeOut[0])
        tl.set({}, {}, 1) // pad timeline to full scroll length
      })
    }, container)

    const onResize = () => sceneCtl?.resize()
    window.addEventListener('resize', onResize)

    const syncRendering = () => sceneCtl?.setRendering(!document.hidden && inView)
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        syncRendering()
      },
      { threshold: 0 }
    )
    observer.observe(container)
    document.addEventListener('visibilitychange', syncRendering)

    return () => {
      cancelled = true
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', syncRendering)
      observer.disconnect()
      ctx.revert()
      sceneCtl?.dispose()
    }
  }, [])

  const ctas = (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Link
        href="/signup"
        className="group flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 active:scale-[0.98]"
      >
        Start for free
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
      <Link
        href="/signin"
        className="rounded-full border border-[#1b2447]/15 bg-white/50 px-6 py-3 text-sm font-medium text-[#1b2447] backdrop-blur-sm transition-colors hover:bg-white/80"
      >
        Sign in
      </Link>
    </div>
  )

  if (reducedMotion) {
    return (
      <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-gradient-to-b from-[#dce7fb] via-[#eef3fd] to-[#fff3e2]">
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-[#1b2447] md:text-6xl">
            {SECTIONS[0].headline}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#4a5578] md:text-lg">
            {SECTIONS[0].sub}
          </p>
          <div className="mt-8">{ctas}</div>
        </div>
      </section>
    )
  }

  return (
    <div ref={containerRef} className="relative h-[320vh]">
      <div ref={viewportRef} className="relative h-[100dvh] w-full overflow-hidden">
        {/* Base sky: pre-dawn. Dawn layer crossfades in on scroll. */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#cddcf7] via-[#e6edfb] to-[#ffe9cf]" />
        <div
          ref={skyDawnRef}
          className="absolute inset-0 bg-gradient-to-b from-[#e8f1ff] via-[#f4f8ff] to-[#fff3e0] opacity-0"
        />
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        {/* Valley mist: dawn haze pooling below the ridgelines keeps the
            lower frame light and grounds the text. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-[#e9eefb] via-[#e9eefb]/55 to-transparent" />

        {SECTIONS.map((section, i) => (
          <div
            key={section.headline}
            ref={(el) => {
              sectionRefs.current[i] = el
            }}
            className="absolute inset-0 z-10 flex items-center justify-center px-6"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <div className="mx-auto max-w-3xl pb-16 text-center">
              {i === 0 ? (
                <h1 className="font-display text-4xl font-bold tracking-tight text-[#1b2447] md:text-6xl">
                  {section.headline}
                </h1>
              ) : (
                <h2 className="font-display text-4xl font-bold tracking-tight text-[#1b2447] md:text-6xl">
                  {section.headline}
                </h2>
              )}
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#4a5578] md:text-lg">
                {section.sub}
              </p>
              {section.cta && <div className="mt-8">{ctas}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
