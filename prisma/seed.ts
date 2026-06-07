import { PrismaClient, BillingCycle, SubscriptionStatus, TransactionType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Replace with your actual Clerk user ID after signing up
  const DEMO_CLERK_ID = process.env.DEMO_CLERK_ID || 'user_demo'
  const DEMO_EMAIL = process.env.DEMO_EMAIL || 'prathamrajsri2003@gmail.com'

  console.log('🌱 Seeding database...')

  const user = await prisma.user.upsert({
    where: { clerkId: DEMO_CLERK_ID },
    update: {},
    create: {
      clerkId: DEMO_CLERK_ID,
      email: DEMO_EMAIL,
      name: 'Pratham',
    },
  })

  console.log(`✓ User: ${user.email}`)

  // Subscriptions
  const subs = await Promise.all([
    prisma.subscription.upsert({
      where: { id: 'sub_netflix' },
      update: {},
      create: {
        id: 'sub_netflix',
        userId: user.id,
        name: 'Netflix',
        logo: 'N',
        logoBg: '#E50914',
        logoColor: '#ffffff',
        category: 'Entertainment',
        amount: 15.99,
        billingCycle: BillingCycle.monthly,
        nextPaymentDate: new Date('2026-07-15'),
        status: SubscriptionStatus.active,
        description: 'Standard with ads',
      },
    }),
    prisma.subscription.upsert({
      where: { id: 'sub_spotify' },
      update: {},
      create: {
        id: 'sub_spotify',
        userId: user.id,
        name: 'Spotify',
        logo: 'S',
        logoBg: '#1DB954',
        logoColor: '#000000',
        category: 'Music',
        amount: 9.99,
        billingCycle: BillingCycle.monthly,
        nextPaymentDate: new Date('2026-07-08'),
        status: SubscriptionStatus.active,
        description: 'Individual Premium',
      },
    }),
    prisma.subscription.upsert({
      where: { id: 'sub_youtube' },
      update: {},
      create: {
        id: 'sub_youtube',
        userId: user.id,
        name: 'YouTube Premium',
        logo: 'Y',
        logoBg: '#FF0000',
        logoColor: '#ffffff',
        category: 'Entertainment',
        amount: 13.99,
        billingCycle: BillingCycle.monthly,
        nextPaymentDate: new Date('2026-07-20'),
        status: SubscriptionStatus.active,
        description: 'Ad-free + background play',
      },
    }),
    prisma.subscription.upsert({
      where: { id: 'sub_github' },
      update: {},
      create: {
        id: 'sub_github',
        userId: user.id,
        name: 'GitHub Pro',
        logo: 'G',
        logoBg: '#24292e',
        logoColor: '#ffffff',
        category: 'Developer Tools',
        amount: 4,
        billingCycle: BillingCycle.monthly,
        nextPaymentDate: new Date('2026-07-01'),
        status: SubscriptionStatus.active,
        description: 'Pro plan',
      },
    }),
    prisma.subscription.upsert({
      where: { id: 'sub_chatgpt' },
      update: {},
      create: {
        id: 'sub_chatgpt',
        userId: user.id,
        name: 'ChatGPT Plus',
        logo: 'C',
        logoBg: '#10a37f',
        logoColor: '#ffffff',
        category: 'AI Tools',
        amount: 20,
        billingCycle: BillingCycle.monthly,
        nextPaymentDate: new Date('2026-07-12'),
        status: SubscriptionStatus.active,
        description: 'GPT-4 access',
      },
    }),
    prisma.subscription.upsert({
      where: { id: 'sub_aws' },
      update: {},
      create: {
        id: 'sub_aws',
        userId: user.id,
        name: 'AWS',
        logo: 'A',
        logoBg: '#FF9900',
        logoColor: '#232f3e',
        category: 'Cloud',
        amount: 47.23,
        billingCycle: BillingCycle.monthly,
        nextPaymentDate: new Date('2026-07-05'),
        status: SubscriptionStatus.active,
        description: 'Pay-as-you-go',
      },
    }),
  ])

  console.log(`✓ ${subs.length} subscriptions created`)

  // Budgets
  const budgetData = [
    { category: 'Food', limit: 600, spent: 423, icon: '🍔' },
    { category: 'Entertainment', limit: 200, spent: 178, icon: '🎬' },
    { category: 'Housing', limit: 1500, spent: 1500, icon: '🏠' },
    { category: 'Transport', limit: 300, spent: 187, icon: '🚗' },
    { category: 'Shopping', limit: 400, spent: 312, icon: '🛒' },
    { category: 'Other', limit: 250, spent: 89, icon: '💡' },
  ]

  for (const b of budgetData) {
    await prisma.budget.upsert({
      where: { userId_category: { userId: user.id, category: b.category } },
      update: { limit: b.limit, spent: b.spent },
      create: { userId: user.id, ...b },
    })
  }

  console.log(`✓ ${budgetData.length} budgets seeded`)

  // Goals
  const goalData = [
    { id: 'goal_emergency', title: 'Emergency Fund', targetAmount: 10000, currentAmount: 6500, deadline: new Date('2026-12-31'), icon: '🛡️' },
    { id: 'goal_vacation', title: 'Europe Vacation', targetAmount: 5000, currentAmount: 2100, deadline: new Date('2026-09-01'), icon: '✈️' },
    { id: 'goal_laptop', title: 'New MacBook', targetAmount: 2500, currentAmount: 2500, deadline: new Date('2026-06-01'), icon: '💻' },
    { id: 'goal_car', title: 'Car Down Payment', targetAmount: 8000, currentAmount: 1200, deadline: new Date('2027-03-01'), icon: '🚗' },
  ]

  for (const g of goalData) {
    await prisma.goal.upsert({
      where: { id: g.id },
      update: {},
      create: { ...g, userId: user.id },
    })
  }

  console.log(`✓ ${goalData.length} goals seeded`)

  // 12 months of transactions
  const merchants = ['Netflix', 'Spotify', 'YouTube Premium', 'GitHub Pro', 'ChatGPT Plus', 'AWS',
    'Whole Foods', 'Uber', 'Apple', 'Amazon', 'Target', 'Starbucks', 'Airbnb', 'Delta Airlines']

  let txCount = 0
  for (let m = 0; m < 12; m++) {
    const date = new Date(2025, m + 6, 1)
    if (date > new Date()) break
    const txPerMonth = 18 + Math.floor(Math.sin(m) * 4)
    for (let i = 0; i < txPerMonth; i++) {
      const day = 1 + Math.floor(Math.random() * 28)
      const txDate = new Date(date.getFullYear(), date.getMonth(), day)
      const merchant = merchants[Math.floor(Math.random() * merchants.length)]
      const isCredit = Math.random() < 0.05
      await prisma.transaction.create({
        data: {
          userId: user.id,
          amount: isCredit ? +(50 + Math.random() * 200).toFixed(2) : +(5 + Math.random() * 150).toFixed(2),
          category: isCredit ? 'Income' : ['Food', 'Entertainment', 'Transport', 'Shopping', 'Subscriptions'][Math.floor(Math.random() * 5)],
          merchant,
          date: txDate,
          type: isCredit ? TransactionType.credit : TransactionType.debit,
        },
      })
      txCount++
    }
  }

  console.log(`✓ ${txCount} transactions seeded`)
  console.log('\n✅ Seed complete!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
