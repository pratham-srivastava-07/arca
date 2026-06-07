const SERVICE_COLORS: Record<string, { bg: string; color: string }> = {
  Netflix: { bg: '#E50914', color: '#fff' },
  Spotify: { bg: '#1DB954', color: '#000' },
  'YouTube Premium': { bg: '#FF0000', color: '#fff' },
  'GitHub Pro': { bg: '#24292e', color: '#fff' },
  'ChatGPT Plus': { bg: '#10a37f', color: '#fff' },
  AWS: { bg: '#FF9900', color: '#232f3e' },
  Hulu: { bg: '#1ce783', color: '#000' },
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
