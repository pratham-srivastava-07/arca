import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// '/dev' pages are screenshot/preview routes that 404 in production builds
const isPublicRoute = createRouteMatcher(['/', '/signin(.*)', '/signup(.*)', '/api/cron(.*)', '/dev(.*)'])

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth()
  const pathname = request.nextUrl.pathname

  // Protect all non-public routes
  if (!isPublicRoute(request) && !userId) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/__clerk/:path*',
    '/(api|trpc)(.*)',
  ],
}
