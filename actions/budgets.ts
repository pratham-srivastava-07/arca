'use server'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const BudgetSchema = z.object({
  category: z.string().min(1),
  limit: z.number().positive(),
  icon: z.string().optional(),
})

async function getUserRecord() {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) throw new Error('User not found')
  return user
}

export async function getBudgets() {
  const user = await getUserRecord()
  return prisma.budget.findMany({ where: { userId: user.id }, orderBy: { category: 'asc' } })
}

export async function upsertBudget(data: z.infer<typeof BudgetSchema>) {
  const user = await getUserRecord()
  const parsed = BudgetSchema.parse(data)
  const budget = await prisma.budget.upsert({
    where: { userId_category: { userId: user.id, category: parsed.category } },
    update: { limit: parsed.limit },
    create: { ...parsed, userId: user.id },
  })
  revalidatePath('/budget')
  return budget
}

export async function updateBudgetSpent(id: string, spent: number) {
  const user = await getUserRecord()
  const budget = await prisma.budget.findFirst({ where: { id, userId: user.id } })
  if (!budget) throw new Error('Budget not found')
  const updated = await prisma.budget.update({ where: { id }, data: { spent } })
  revalidatePath('/budget')
  return updated
}
