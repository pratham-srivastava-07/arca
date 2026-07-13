import { NextResponse } from 'next/server'
import { addDays } from 'date-fns'
import { prisma } from '@/lib/prisma'
import { rollover, isReminderDue, type Cycle } from '@/lib/billing'
import { sendRenewalReminder } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const now = new Date()

  // Job 1: roll overdue payment dates forward, writing one Transaction per elapsed period
  const overdue = await prisma.subscription.findMany({
    where: { status: 'active', nextPaymentDate: { lte: now } },
  })
  let transactionsCreated = 0
  let errors = 0
  for (const sub of overdue) {
    try {
      const { charges, next } = rollover(sub.nextPaymentDate, sub.billingCycle as Cycle, now)
      await prisma.$transaction([
        prisma.transaction.createMany({
          data: charges.map((date) => ({
            userId: sub.userId,
            subscriptionId: sub.id,
            amount: sub.amount,
            category: sub.category,
            merchant: sub.name,
            date,
            type: 'debit' as const,
          })),
        }),
        prisma.subscription.update({ where: { id: sub.id }, data: { nextPaymentDate: next } }),
      ])
      transactionsCreated += charges.length
    } catch (err) {
      console.error('[cron] subscription', sub.id, err)
      errors++
      continue
    }
  }

  // Job 2: renewal reminders, 3 days out, once per renewal
  const candidates = await prisma.subscription.findMany({
    where: {
      status: 'active',
      reminderEnabled: true,
      nextPaymentDate: { gt: now, lte: addDays(now, 3) },
      user: { remindersMuted: false },
    },
    include: { user: true },
  })
  let remindersSent = 0
  for (const sub of candidates) {
    try {
      if (!isReminderDue(sub.nextPaymentDate, sub.lastRemindedAt, now)) continue
      await sendRenewalReminder({
        to: sub.user.email,
        userName: sub.user.name,
        subscriptionName: sub.name,
        amount: sub.amount,
        currency: sub.user.currency,
        renewsOn: sub.nextPaymentDate,
      })
      await prisma.subscription.update({ where: { id: sub.id }, data: { lastRemindedAt: now } })
      remindersSent++
    } catch (err) {
      console.error('[cron] subscription', sub.id, err)
      errors++
      continue
    }
  }

  return NextResponse.json({ ok: true, transactionsCreated, remindersSent, errors })
}
