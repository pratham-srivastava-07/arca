'use server'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const TransactionSchema = z.object({
  amount: z.number(),
  category: z.string(),
  merchant: z.string(),
  date: z.string(),
  type: z.enum(['debit', 'credit']),
  description: z.string().optional(),
  subscriptionId: z.string().optional(),
})

async function getUserRecord() {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) throw new Error('User not found')
  return user
}

export async function getTransactions(limit = 50) {
  const user = await getUserRecord()
  return prisma.transaction.findMany({
    where: { userId: user.id },
    orderBy: { date: 'desc' },
    take: limit,
    include: { subscription: { select: { name: true } } },
  })
}

export async function getMonthlySpend() {
  const user = await getUserRecord()
  const since = new Date()
  since.setMonth(since.getMonth() - 12)
  const txs = await prisma.transaction.findMany({
    where: { userId: user.id, type: 'debit', date: { gte: since } },
    select: { amount: true, date: true },
  })
  const byMonth: Record<string, number> = {}
  for (const tx of txs) {
    const key = tx.date.toLocaleString('en-US', { month: 'short', year: '2-digit' })
    byMonth[key] = (byMonth[key] ?? 0) + tx.amount
  }
  return Object.entries(byMonth).map(([month, amount]) => ({ month, amount: +amount.toFixed(2) }))
}

export async function createTransaction(data: z.infer<typeof TransactionSchema>) {
  const user = await getUserRecord()
  const parsed = TransactionSchema.parse(data)
  const tx = await prisma.transaction.create({
    data: { ...parsed, userId: user.id, date: new Date(parsed.date) },
  })
  revalidatePath('/')
  revalidatePath('/analytics')
  return tx
}
