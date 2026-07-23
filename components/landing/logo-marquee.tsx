import { ServiceLogo } from '@/components/ui/service-logo'

/*
 * The subscriptions ARE this product's world, so the trust-wall moment is a
 * marquee of the services people actually pay for. Pure CSS animation,
 * duplicated track for a seamless loop, paused under reduced motion.
 */

const ROW_A = ['Netflix', 'Spotify', 'YouTube Premium', 'ChatGPT Plus', 'Notion', 'iCloud+', 'Xbox Game Pass', 'Amazon Prime', 'Dropbox']
const ROW_B = ['AWS', 'GitHub Pro', 'Figma', 'Adobe CC', 'Disney+', 'Audible', 'Canva Pro', 'Hulu', 'Crunchyroll']

function MarqueeRow({ names, reverse }: { names: string[]; reverse?: boolean }) {
  const track = [...names, ...names]
  return (
    <div className="marquee-mask relative overflow-hidden">
      <div className={`flex w-max items-center gap-3 ${reverse ? 'marquee-track-reverse' : 'marquee-track'}`}>
        {track.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex items-center gap-2.5 rounded-full border border-border bg-card py-2 pl-2 pr-4"
            aria-hidden={i >= names.length}
          >
            <ServiceLogo name={name} size={28} />
            <span className="whitespace-nowrap text-sm font-medium text-foreground">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function LogoMarquee() {
  return (
    <section className="border-y border-border bg-secondary/50 py-20 md:py-24">
      <div className="mx-auto w-[min(100%-48px,1280px)]">
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Works with everything you already pay for
        </h2>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
          Add any subscription in seconds. Logos, prices, and billing cycles
          come prefilled for the services you know.
        </p>
      </div>
      <div className="mt-12 space-y-3">
        <MarqueeRow names={ROW_A} />
        <MarqueeRow names={ROW_B} reverse />
      </div>
    </section>
  )
}
