const SERVICE_COLORS: Record<string, { bg: string; color: string }> = {
  Netflix: { bg: '#E50914', color: '#fff' },
  Spotify: { bg: '#1DB954', color: '#000' },
  'YouTube Premium': { bg: '#FF0000', color: '#fff' },
  'GitHub Pro': { bg: '#24292e', color: '#fff' },
  'ChatGPT Plus': { bg: '#10a37f', color: '#fff' },
  AWS: { bg: '#FF9900', color: '#232f3e' },
  Hulu: { bg: '#1ce783', color: '#000' },
  Notion: { bg: '#191919', color: '#fff' },
  'iCloud+': { bg: '#3693F3', color: '#fff' },
  'Xbox Game Pass': { bg: '#107C10', color: '#fff' },
  Figma: { bg: '#1e1e1e', color: '#fff' },
  'Adobe CC': { bg: '#FA0F00', color: '#fff' },
  'Disney+': { bg: '#0d2481', color: '#fff' },
  Audible: { bg: '#F8991C', color: '#000' },
  'Canva Pro': { bg: '#7d2ae8', color: '#fff' },
  'Amazon Prime': { bg: '#00A8E1', color: '#fff' },
  Dropbox: { bg: '#0061FF', color: '#fff' },
  Crunchyroll: { bg: '#F47521', color: '#fff' },
}

interface ServiceLogoProps {
  name: string
  logo?: string
  logoBg?: string
  logoColor?: string
  size?: number
}

export function ServiceLogo({ name, logo, logoBg, logoColor, size = 44 }: ServiceLogoProps) {
  const fallback = SERVICE_COLORS[name]
  const bg = logoBg ?? fallback?.bg ?? '#3f3f46'
  const color = logoColor ?? fallback?.color ?? '#fff'
  const letter = logo ?? name.charAt(0).toUpperCase()
  const radius = Math.round(size * 0.25)

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: Math.round(size * 0.44),
        fontWeight: 700,
        color,
        flexShrink: 0,
        letterSpacing: '-0.03em',
        fontFamily: 'var(--font-sans)',
      }}
      aria-label={name}
    >
      {letter}
    </div>
  )
}
