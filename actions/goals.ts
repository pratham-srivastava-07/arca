'use server'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const GoalSchema = z.object({
  title: z.string().min(1),
  targetAmount: z.number().positive(),
  currentAmount: z.number().min(0).optional(),
  deadline: z.string().optional(),
  icon: z.string().optional(),
  description: z.string().optional(),
})

async function getUserRecord() {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) throw new Error('User not found')
  return user
}

export async function getGoals() {
  const user = await getUserRecord()
  return prisma.goal.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'asc' } })
}

export async function createGoal(data: z.infer<typeof GoalSchema>) {
  const user = await getUserRecord()
  const parsed = GoalSchema.parse(data)
  const goal = await prisma.goal.create({
    data: {
      ...parsed,
      userId: user.id,
      currentAmount: parsed.currentAmount ?? 0,
      deadline: parsed.deadline ? new Date(parsed.deadline) : null,
    },
  })
  revalidatePath('/goals')
  return goal
}

export async function updateGoal(id: string, data: Partial<z.infer<typeof GoalSchema>>) {
  const user = await getUserRecord()
  const goal = await prisma.goal.findFirst({ where: { id, userId: user.id } })
  if (!goal) throw new Error('Goal not found')
  const updated = await prisma.goal.update({
    where: { id },
    data: { ...data, ...(data.deadline ? { deadline: new Date(data.deadline) } : {}) },
  })
  revalidatePath('/goals')
  return updated
}

export async function deleteGoal(id: string) {
  const user = await getUserRecord()
  const goal = await prisma.goal.findFirst({ where: { id, userId: user.id } })
  if (!goal) throw new Error('Goal not found')
  await prisma.goal.delete({ where: { id } })
  revalidatePath('/goals')
}
