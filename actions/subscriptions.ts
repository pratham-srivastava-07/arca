'use server'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { FREE_LIMITS, limitReached, type LimitResult } from '@/lib/limits'
import { z } from 'zod'

const SubscriptionSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  amount: z.number().positive(),
  billingCycle: z.enum(['monthly', 'yearly', 'weekly']),
  nextPaymentDate: z.string(),
  status: z.enum(['active', 'paused', 'cancelled']).optional(),
  logo: z.string().optional(),
  logoBg: z.string().optional(),
  logoColor: z.string().optional(),
  description: z.string().optional(),
})

async function getUserRecord() {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) throw new Error('User not found')
  return user
}

export async function getSubscriptions() {
  const user = await getUserRecord()
  return prisma.subscription.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  })
}

export async function createSubscription(data: z.infer<typeof SubscriptionSchema>) {
  const user = await getUserRecord()
  const parsed = SubscriptionSchema.parse(data)
  const sub = await prisma.subscription.create({
    data: {
      ...parsed,
      userId: user.id,
      nextPaymentDate: new Date(parsed.nextPaymentDate),
      status: parsed.status ?? 'active',
    },
  })
  revalidatePath('/subscriptions')
  revalidatePath('/')
  return sub
}

export async function updateSubscription(id: string, data: Partial<z.infer<typeof SubscriptionSchema>>) {
  const user = await getUserRecord()
  const sub = await prisma.subscription.findFirst({ where: { id, userId: user.id } })
  if (!sub) throw new Error('Subscription not found')
  const updated = await prisma.subscription.update({
    where: { id },
    data: {
      ...data,
      ...(data.nextPaymentDate ? { nextPaymentDate: new Date(data.nextPaymentDate) } : {}),
    },
  })
  revalidatePath('/subscriptions')
  revalidatePath('/')
  return updated
}

export async function deleteSubscription(id: string) {
  const user = await getUserRecord()
  const sub = await prisma.subscription.findFirst({ where: { id, userId: user.id } })
  if (!sub) throw new Error('Subscription not found')
  await prisma.subscription.delete({ where: { id } })
  revalidatePath('/subscriptions')
  revalidatePath('/')
}

export async function toggleReminder(id: string, enabled: boolean): Promise<LimitResult> {
  const user = await getUserRecord()
  const sub = await prisma.subscription.findFirst({ where: { id, userId: user.id } })
  if (!sub) throw new Error('Subscription not found')
  if (enabled && user.plan === 'free') {
    const enabledCount = await prisma.subscription.count({
      where: { userId: user.id, reminderEnabled: true, NOT: { id } },
    })
    if (enabledCount >= FREE_LIMITS.reminders) return limitReached('reminders')
  }
  await prisma.subscription.update({ where: { id }, data: { reminderEnabled: enabled } })
  revalidatePath('/subscriptions')
  return { ok: true }
}
