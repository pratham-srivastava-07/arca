import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Providers } from '@/components/providers'
import { ConditionalLayout } from '@/components/layout/conditional-layout'

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Arca — Subscription & Finance Management',
  description: 'Know exactly where your money goes.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Providers>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
