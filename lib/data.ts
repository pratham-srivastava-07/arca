import type { Subscription, Transaction, Budget, Goal, MonthlySpend, CategorySpend, HeatmapDay } from '@/types'

export const SUBSCRIPTIONS: Subscription[] = [
  {
    id: 'sub_netflix',
    name: 'Netflix',
    logo: 'N',
    logoColor: '#ffffff',
    logoBg: '#E50914',
    category: 'Entertainment',
    amount: 15.99,
    billingCycle: 'monthly',
    nextPaymentDate: '2026-07-15',
    status: 'active',
    createdAt: '2024-06-01',
    description: 'Standard with ads plan',
  },
  {
    id: 'sub_spotify',
    name: 'Spotify',
    logo: 'S',
    logoColor: '#000000',
    logoBg: '#1DB954',
    category: 'Music',
    amount: 9.99,
    billingCycle: 'monthly',
    nextPaymentDate: '2026-07-08',
    status: 'active',
    createdAt: '2024-03-15',
    description: 'Individual Premium plan',
  },
  {
    id: 'sub_youtube',
    name: 'YouTube Premium',
    logo: 'Y',
    logoColor: '#ffffff',
    logoBg: '#FF0000',
    category: 'Entertainment',
    amount: 13.99,
    billingCycle: 'monthly',
    nextPaymentDate: '2026-07-20',
    status: 'active',
    createdAt: '2024-01-10',
    description: 'Ad-free + YouTube Music',
  },
  {
    id: 'sub_github',
    name: 'GitHub Pro',
    logo: 'G',
    logoColor: '#ffffff',
    logoBg: '#24292e',
    category: 'Development',
    amount: 4.00,
    billingCycle: 'monthly',
    nextPaymentDate: '2026-07-12',
    status: 'active',
    createdAt: '2023-11-01',
    description: 'Advanced developer tools',
  },
  {
    id: 'sub_chatgpt',
    name: 'ChatGPT Plus',
    logo: 'C',
    logoColor: '#ffffff',
    logoBg: '#10A37F',
    category: 'AI Tools',
    amount: 20.00,
    billingCycle: 'monthly',
    nextPaymentDate: '2026-07-18',
    status: 'active',
    createdAt: '2024-05-20',
    description: 'GPT-4o + advanced features',
  },
  {
    id: 'sub_aws',
    name: 'AWS',
    logo: 'A',
    logoColor: '#000000',
    logoBg: '#FF9900',
    category: 'Cloud',
    amount: 47.23,
    billingCycle: 'monthly',
    nextPaymentDate: '2026-07-01',
    status: 'active',
    createdAt: '2023-09-01',
    description: 'EC2 + S3 + CloudFront',
  },
]

export const TRANSACTIONS: Transaction[] = [
  // June 2026
  { id: 't001', subscriptionId: 'sub_aws', amount: -47.23, category: 'Cloud', merchant: 'Amazon Web Services', date: '2026-06-01', type: 'debit' },
  { id: 't002', subscriptionId: 'sub_spotify', amount: -9.99, category: 'Music', merchant: 'Spotify', date: '2026-06-03', type: 'debit' },
  { id: 't003', amount: -67.45, category: 'Food', merchant: 'Whole Foods Market', date: '2026-06-04', type: 'debit' },
  { id: 't004', subscriptionId: 'sub_netflix', amount: -15.99, category: 'Entertainment', merchant: 'Netflix', date: '2026-06-05', type: 'debit' },
  { id: 't005', subscriptionId: 'sub_chatgpt', amount: -20.00, category: 'AI Tools', merchant: 'OpenAI', date: '2026-06-05', type: 'debit' },
  { id: 't006', amount: -34.50, category: 'Food', merchant: 'Chipotle Mexican Grill', date: '2026-06-05', type: 'debit' },
  // May 2026
  { id: 't007', subscriptionId: 'sub_aws', amount: -47.23, category: 'Cloud', merchant: 'Amazon Web Services', date: '2026-05-01', type: 'debit' },
  { id: 't008', subscriptionId: 'sub_spotify', amount: -9.99, category: 'Music', merchant: 'Spotify', date: '2026-05-03', type: 'debit' },
  { id: 't009', amount: -89.99, category: 'Shopping', merchant: 'Amazon', date: '2026-05-05', type: 'debit' },
  { id: 't010', subscriptionId: 'sub_github', amount: -4.00, category: 'Development', merchant: 'GitHub', date: '2026-05-08', type: 'debit' },
  { id: 't011', subscriptionId: 'sub_netflix', amount: -15.99, category: 'Entertainment', merchant: 'Netflix', date: '2026-05-10', type: 'debit' },
  { id: 't012', subscriptionId: 'sub_youtube', amount: -13.99, category: 'Entertainment', merchant: 'YouTube Premium', date: '2026-05-12', type: 'debit' },
  { id: 't013', amount: -156.78, category: 'Food', merchant: 'Kroger', date: '2026-05-14', type: 'debit' },
  { id: 't014', subscriptionId: 'sub_chatgpt', amount: -20.00, category: 'AI Tools', merchant: 'OpenAI', date: '2026-05-15', type: 'debit' },
  { id: 't015', amount: -45.00, category: 'Transport', merchant: 'Chevron', date: '2026-05-18', type: 'debit' },
  { id: 't016', amount: -78.50, category: 'Food', merchant: 'The Capital Grille', date: '2026-05-22', type: 'debit' },
  { id: 't017', amount: -234.99, category: 'Shopping', merchant: 'Apple Store', date: '2026-05-25', type: 'debit' },
  { id: 't018', amount: -12.50, category: 'Food', merchant: 'Blue Bottle Coffee', date: '2026-05-28', type: 'debit' },
  // April 2026
  { id: 't019', subscriptionId: 'sub_aws', amount: -47.23, category: 'Cloud', merchant: 'Amazon Web Services', date: '2026-04-01', type: 'debit' },
  { id: 't020', subscriptionId: 'sub_spotify', amount: -9.99, category: 'Music', merchant: 'Spotify', date: '2026-04-03', type: 'debit' },
  { id: 't021', subscriptionId: 'sub_github', amount: -4.00, category: 'Development', merchant: 'GitHub', date: '2026-04-08', type: 'debit' },
  { id: 't022', subscriptionId: 'sub_netflix', amount: -15.99, category: 'Entertainment', merchant: 'Netflix', date: '2026-04-10', type: 'debit' },
  { id: 't023', subscriptionId: 'sub_youtube', amount: -13.99, category: 'Entertainment', merchant: 'YouTube Premium', date: '2026-04-12', type: 'debit' },
  { id: 't024', subscriptionId: 'sub_chatgpt', amount: -20.00, category: 'AI Tools', merchant: 'OpenAI', date: '2026-04-15', type: 'debit' },
  { id: 't025', amount: -145.67, category: 'Food', merchant: 'Trader Joe\'s', date: '2026-04-16', type: 'debit' },
  { id: 't026', amount: -55.00, category: 'Transport', merchant: 'Shell', date: '2026-04-20', type: 'debit' },
  { id: 't027', amount: 2400.00, category: 'Income', merchant: 'Salary Deposit', date: '2026-04-28', type: 'credit' },
]

export const BUDGETS: Budget[] = [
  { id: 'b_food', category: 'Food & Dining', limit: 600, spent: 520, color: '#22c55e', icon: '🍽️' },
  { id: 'b_ent', category: 'Entertainment', limit: 300, spent: 287, color: '#7c3aed', icon: '🎬' },
  { id: 'b_shop', category: 'Shopping', limit: 400, spent: 325, color: '#ec4899', icon: '🛍️' },
  { id: 'b_transport', category: 'Transport', limit: 200, spent: 100, color: '#f59e0b', icon: '🚗' },
  { id: 'b_tech', category: 'Software & Tech', limit: 150, spent: 135, color: '#22d3ee', icon: '💻' },
  { id: 'b_other', category: 'Other', limit: 200, spent: 89, color: '#94a3b8', icon: '📦' },
]

export const GOALS: Goal[] = [
  {
    id: 'g_emergency',
    title: 'Emergency Fund',
    targetAmount: 10000,
    currentAmount: 6500,
    deadline: '2026-12-31',
    color: '#22c55e',
    accentColor: '#4ade80',
    icon: '🛡️',
    description: '6 months of expenses as a safety net',
  },
  {
    id: 'g_macbook',
    title: 'MacBook Pro M4',
    targetAmount: 2500,
    currentAmount: 1875,
    deadline: '2026-09-15',
    color: '#7c3aed',
    accentColor: '#a78bfa',
    icon: '💻',
    description: 'Upgrade for development work',
  },
  {
    id: 'g_japan',
    title: 'Japan Trip',
    targetAmount: 3000,
    currentAmount: 850,
    deadline: '2027-03-01',
    color: '#ec4899',
    accentColor: '#f9a8d4',
    icon: '✈️',
    description: 'Cherry blossom season trip',
  },
  {
    id: 'g_car',
    title: 'Car Down Payment',
    targetAmount: 5000,
    currentAmount: 2100,
    deadline: '2027-06-01',
    color: '#f59e0b',
    accentColor: '#fcd34d',
    icon: '🚗',
    description: 'EV purchase down payment',
  },
]

export const MONTHLY_SPEND: MonthlySpend[] = [
  { month: "Jul '25", amount: 721.45, subscriptions: 5 },
  { month: "Aug '25", amount: 789.33, subscriptions: 5 },
  { month: "Sep '25", amount: 834.20, subscriptions: 6 },
  { month: "Oct '25", amount: 812.55, subscriptions: 6 },
  { month: "Nov '25", amount: 768.90, subscriptions: 6 },
  { month: "Dec '25", amount: 1124.67, subscriptions: 6 },
  { month: "Jan '26", amount: 698.22, subscriptions: 6 },
  { month: "Feb '26", amount: 714.88, subscriptions: 6 },
  { month: "Mar '26", amount: 845.90, subscriptions: 6 },
  { month: "Apr '26", amount: 798.12, subscriptions: 6 },
  { month: "May '26", amount: 856.23, subscriptions: 6 },
  { month: "Jun '26", amount: 452.10, subscriptions: 6 },
]

export const CATEGORY_SPEND: CategorySpend[] = [
  { category: 'Food & Dining', amount: 520, percentage: 31, color: '#22c55e' },
  { category: 'Entertainment', amount: 287, percentage: 17, color: '#7c3aed' },
  { category: 'Subscriptions', amount: 111, percentage: 13, color: '#22d3ee' },
  { category: 'Shopping', amount: 325, percentage: 19, color: '#ec4899' },
  { category: 'Transport', amount: 100, percentage: 6, color: '#f59e0b' },
  { category: 'Other', amount: 234, percentage: 14, color: '#94a3b8' },
]

// Deterministic heatmap data generator
function seededPseudo(seed: number): number {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

function generateHeatmapData(): HeatmapDay[] {
  const data: HeatmapDay[] = []
  const startDate = new Date(2025, 5, 6)

  for (let i = 0; i < 366; i++) {
    const d = new Date(startDate)
    d.setDate(d.getDate() + i)
    const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate()
    const rng = seededPseudo(seed)
    const isWeekend = d.getDay() === 0 || d.getDay() === 6
    const isMonthStart = d.getDate() <= 3
    const isHoliday = (d.getMonth() === 11 && d.getDate() >= 20) || (d.getMonth() === 0 && d.getDate() <= 3)

    let amount = Math.floor(rng * 25)
    if (isWeekend) amount += Math.floor(rng * 80) + 40
    if (isMonthStart) amount += 111
    if (isHoliday) amount += Math.floor(rng * 200) + 100

    data.push({
      date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
      amount,
    })
  }
  return data
}

export const HEATMAP_DATA = generateHeatmapData()

export const FORECAST_BASE_MONTHS = [
  { month: "Jul '26", amount: 111.20 },
  { month: "Aug '26", amount: 111.20 },
  { month: "Sep '26", amount: 111.20 },
  { month: "Oct '26", amount: 111.20 },
  { month: "Nov '26", amount: 111.20 },
  { month: "Dec '26", amount: 111.20 },
  { month: "Jan '27", amount: 111.20 },
  { month: "Feb '27", amount: 111.20 },
  { month: "Mar '27", amount: 111.20 },
  { month: "Apr '27", amount: 111.20 },
  { month: "May '27", amount: 111.20 },
  { month: "Jun '27", amount: 111.20 },
]
