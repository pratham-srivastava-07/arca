'use server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function syncUser() {
  const { userId } = await auth()
  if (!userId) return null
  const clerkUser = await currentUser()
  if (!clerkUser) return null

  const email = clerkUser.emailAddresses[0]?.emailAddress ?? ''
  const name = `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim()
  const avatar = clerkUser.imageUrl

  // Existing account for this Clerk user — just refresh profile fields.
  const byClerk = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (byClerk) {
    return prisma.user.update({
      where: { clerkId: userId },
      data: { email, name, avatar },
    })
  }

  // A row with this email may already exist under a different clerkId (e.g. the
  // account was first created on the dev Clerk instance, now signing in via the
  // production instance). Re-link it to the current Clerk account rather than
  // colliding on the unique `email` field.
  const byEmail = email ? await prisma.user.findUnique({ where: { email } }) : null
  if (byEmail) {
    return prisma.user.update({
      where: { id: byEmail.id },
      data: { clerkId: userId, name, avatar },
    })
  }

  return prisma.user.create({
    data: { clerkId: userId, email, name, avatar, onboardingCompleted: false },
  })
}

export async function getUser() {
  const { userId } = await auth()
  if (!userId) return null
  return prisma.user.findUnique({ where: { clerkId: userId } })
}

export async function completeOnboarding() {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) throw new Error('User not found')
  await prisma.user.update({
    where: { clerkId: userId },
    data: { onboardingCompleted: true },
  })
  revalidatePath('/dashboard')
}

export async function setRemindersMuted(muted: boolean) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  await prisma.user.update({
    where: { clerkId: userId },
    data: { remindersMuted: muted },
  })
  revalidatePath('/settings')
}

export async function updateUserProfile(data: { name?: string; email?: string }) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  const updated = await prisma.user.update({
    where: { clerkId: userId },
    data,
  })
  revalidatePath('/settings')
  return updated
}
