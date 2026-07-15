export type SubscriptionStatus = 'active' | 'paused' | 'cancelled'
export type BillingCycle = 'monthly' | 'yearly' | 'weekly'
export type TransactionType = 'debit' | 'credit'

// UI types (used with mock data / store) — dates as strings
export interface Subscription {
  id: string
  name: string
  logo: string
  logoColor: string
  logoBg: string
  category: string
  amount: number
  billingCycle: BillingCycle
  nextPaymentDate: string
  status: SubscriptionStatus
  createdAt: string
  description?: string
}

export interface Transaction {
  id: string
  subscriptionId?: string
  amount: number
  category: string
  merchant: string
  date: string
  type: TransactionType
  description?: string
}

export interface Budget {
  id: string
  category: string
  limit: number
  spent: number
  color: string
  icon: string
}

export interface Goal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline: string
  color: string
  accentColor: string
  icon: string
  description?: string
}

// DB types — returned from Prisma server actions (dates as Date objects)
export interface DbSubscription {
  id: string
  userId: string
  name: string
  logo: string | null
  logoColor: string | null
  logoBg: string | null
  category: string
  amount: number
  billingCycle: string
  nextPaymentDate: Date
  status: string
  description: string | null
  reminderEnabled: boolean
  createdAt: Date
  updatedAt: Date
}

export interface DbTransaction {
  id: string
  userId: string
  subscriptionId: string | null
  amount: number
  category: string
  merchant: string
  date: Date
  type: string
  description: string | null
  createdAt: Date
}

export interface DbBudget {
  id: string
  userId: string
  category: string
  limit: number
  spent: number
  icon: string | null
  color: string | null
  createdAt: Date
  updatedAt: Date
}

export interface DbGoal {
  id: string
  userId: string
  title: string
  targetAmount: number
  currentAmount: number
  deadline: Date | null
  icon: string | null
  description: string | null
  createdAt: Date
  updatedAt: Date
}

export interface ForecastScenario {
  id: string
  subscriptionId: string
  type: 'cancel' | 'price_change'
  changePercent?: number
}

export interface MonthlySpend {
  month: string
  amount: number
  subscriptions: number
}

export interface CategorySpend {
  category: string
  amount: number
  percentage: number
  color: string
}

export interface HeatmapDay {
  date: string
  amount: number
}
