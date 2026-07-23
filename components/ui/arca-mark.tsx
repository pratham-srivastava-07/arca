/*
 * The Arca mark: a rising arc over a horizon line, echoing the dawn-horizon
 * hero — "arca" (Latin: strongbox / vault) meets the sunrise the product is
 * built around. Colors default to theme tokens so the mark inverts correctly
 * in the light landing and the dark app shell; pass explicit colors for fixed
 * surfaces (e.g. the dark footer).
 */
export function ArcaMark({
  size = 28,
  tile = 'var(--foreground)',
  arc = 'var(--brand)',
  horizon = 'var(--background)',
  className,
}: {
  size?: number
  tile?: string
  arc?: string
  horizon?: string
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="9" fill={tile} />
      <path d="M7 20A9 9 0 0 1 25 20" stroke={arc} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M6.5 23.5H25.5" stroke={horizon} strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}
