import { ServiceLogo } from '@/components/ui/service-logo'

/*
 * The subscriptions ARE this product's world, so the trust-wall moment is a
 * marquee of the services people actually pay for. Pure CSS animation,
 * duplicated track for a seamless loop, paused under reduced motion.
 */

const ROW_A = ['Netflix', 'Spotify', 'YouTube Premium', 'ChatGPT Plus', 'Notion', 'iCloud+', 'Xbox Game Pass']
const ROW_B = ['AWS', 'GitHub Pro', 'Figma', 'Adobe CC', 'Disney+', 'Audible', 'Canva Pro', 'Hulu']

function MarqueeRow({ names, reverse }: { names: string[]; reverse?: boolean }) {
  const track = [...names, ...names]
  return (
    <div className="marquee-mask relative overflow-hidden">
      <div className={`flex w-max items-center gap-3 ${reverse ? 'marquee-track-reverse' : 'marquee-track'}`}>
        {track.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex items-center gap-2.5 rounded-full border border-[#1b2447]/8 bg-white/70 py-2 pl-2 pr-4"
            aria-hidden={i >= names.length}
          >
            <ServiceLogo name={name} size={28} />
            <span className="whitespace-nowrap text-sm font-medium text-[#33406e]">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function LogoMarquee() {
  return (
    <section className="bg-[#f7f9ff] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center font-display text-2xl font-semibold tracking-tight text-[#1b2447] md:text-3xl">
          Works with everything you already pay for
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-[#5a6690]">
          Add any subscription in seconds. Logos, prices, and billing cycles come prefilled for the services you know.
        </p>
      </div>
      <div className="mt-10 space-y-3">
        <MarqueeRow names={ROW_A} />
        <MarqueeRow names={ROW_B} reverse />
      </div>
    </section>
  )
}
