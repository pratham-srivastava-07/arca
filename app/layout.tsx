import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Providers } from '@/components/providers'
import { ConditionalLayout } from '@/components/layout/conditional-layout'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://arca.prathamexists.xyz'),
  title: {
    default: 'Arca — Know what you pay for',
    template: '%s · Arca',
  },
  description:
    'Track every subscription, see renewals before they charge, and plan the year ahead. Arca lines up every recurring charge in one place.',
  keywords: ['subscriptions', 'subscription tracker', 'personal finance', 'renewals', 'budgeting', 'spending'],
  openGraph: {
    title: 'Arca — Know what you pay for',
    description:
      'Track every subscription, see renewals before they charge, and plan the year ahead.',
    url: '/',
    siteName: 'Arca',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arca — Know what you pay for',
    description:
      'Track every subscription, see renewals before they charge, and plan the year ahead.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider>
          <Providers>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  )
}
