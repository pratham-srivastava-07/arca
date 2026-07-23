import { ImageResponse } from 'next/og'

/*
 * The share card shown when an Arca link is posted anywhere (Twitter, Slack,
 * iMessage...). Rendered on-brand: warm paper, ink wordmark, the rising-arc
 * mark, and one lime accent. Generated at request time, no external assets.
 */

export const alt = 'Arca — Know what you pay for'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f7f7f3',
          padding: '80px',
        }}
      >
        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="64" height="64" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="9" fill="#111111" />
            <path d="M7 20A9 9 0 0 1 25 20" stroke="#c9f36b" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M6.5 23.5H25.5" stroke="#f5f5ef" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
          <div style={{ marginLeft: 20, fontSize: 40, fontWeight: 600, color: '#111111', letterSpacing: -1 }}>
            Arca
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 84, fontWeight: 700, color: '#111111', letterSpacing: -3, lineHeight: 1.05 }}>
            Know what you pay for.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 28 }}>
            <div style={{ width: 48, height: 6, borderRadius: 999, background: '#c9f36b' }} />
            <div style={{ marginLeft: 20, fontSize: 32, color: '#5a5a54' }}>
              Track subscriptions, see renewals before they charge, plan the year.
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
