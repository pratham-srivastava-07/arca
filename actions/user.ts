'use server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function syncUser() {
  const { userId } = await auth()
  if (!userId) return null
  const clerkUser = await currentUser()
  if (!clerkUser) return null

  return prisma.user.upsert({
    where: { clerkId: userId },
    update: {
      email: clerkUser.emailAddresses[0]?.emailAddress ?? '',
      name: `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim(),
      avatar: clerkUser.imageUrl,
    },
    create: {
      clerkId: userId,
      email: clerkUser.emailAddresses[0]?.emailAddress ?? '',
      name: `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim(),
      avatar: clerkUser.imageUrl,
      onboardingCompleted: false,
    },
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
