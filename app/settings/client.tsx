'use client'
import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { User, Bell, Shield, Trash2, Loader2, Check } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { updateUserProfile, setRemindersMuted } from '@/actions/user'

interface UserData {
  id: string
  name: string
  email: string
  createdAt: Date
  remindersMuted: boolean
}

function ProfileSection({ user }: { user: UserData }) {
  const [name, setName] = useState(user.name)
  const [saved, setSaved] = useState(false)
  const [pending, startTransition] = useTransition()

  const save = () => {
    startTransition(async () => {
      await updateUserProfile({ name })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    })
  }

  return (
    <GlassCard>
      <div className="flex items-center gap-3 mb-5">
        <User className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Profile</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Display name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-sm px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full max-w-sm px-3 py-2 rounded-lg border border-border bg-muted text-sm text-muted-foreground cursor-not-allowed"
          />
          <p className="text-xs text-muted-foreground mt-1">Email is managed by your auth provider.</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Member since</label>
          <p className="text-sm text-foreground">
            {user.createdAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <button
          onClick={save}
          disabled={pending || saved}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all disabled:opacity-70"
        >
          {pending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          {saved && <Check className="w-3.5 h-3.5" />}
          {saved ? 'Saved!' : 'Save changes'}
        </button>
      </div>
    </GlassCard>
  )
}

function NotificationsSection({ remindersMuted }: { remindersMuted: boolean }) {
  const [prefs, setPrefs] = useState({
    renewalReminders: !remindersMuted,
    budgetAlerts: true,
    weeklyReport: false,
  })
  const [, startTransition] = useTransition()

  const toggle = (key: keyof typeof prefs) => {
    if (key === 'renewalReminders') {
      // Pre-flip value of the toggle IS the new muted value (on → muting).
      startTransition(() => setRemindersMuted(prefs.renewalReminders))
    }
    setPrefs((p) => ({ ...p, [key]: !p[key] }))
  }

  return (
    <GlassCard>
      <div className="flex items-center gap-3 mb-5">
        <Bell className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
      </div>
      <div className="space-y-4">
        {[
          { key: 'renewalReminders' as const, label: 'Renewal reminders', desc: 'Get notified 3 days before a subscription renews' },
          { key: 'budgetAlerts' as const, label: 'Budget alerts', desc: 'Alert when you reach 80% of a budget category (coming soon)' },
          { key: 'weeklyReport' as const, label: 'Weekly report', desc: 'Weekly spending summary every Monday (coming soon)' },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
            <button
              onClick={() => toggle(item.key)}
              aria-label={`Toggle ${item.label}`}
              className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
                prefs[item.key] ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                  prefs[item.key] ? 'translate-x-4.5' : 'translate-x-0.5'
                }`}
                style={{ transform: prefs[item.key] ? 'translateX(18px)' : 'translateX(2px)' }}
              />
            </button>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}

function SecuritySection() {
  return (
    <GlassCard>
      <div className="flex items-center gap-3 mb-5">
        <Shield className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Security</h3>
      </div>
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg bg-muted/50 border border-border">
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">Password</p>
            <p className="text-xs text-muted-foreground">Managed by Clerk authentication</p>
          </div>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md shrink-0">Via Clerk</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg bg-green-500/5 border border-green-500/15">
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">Account status</p>
            <p className="text-xs text-muted-foreground">Your account is active and in good standing</p>
          </div>
          <span className="text-xs text-green-500 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-full shrink-0">Active</span>
        </div>
      </div>
    </GlassCard>
  )
}

function DangerZoneSection() {
  const [confirming, setConfirming] = useState(false)

  return (
    <GlassCard className="border-red-500/20">
      <div className="flex items-center gap-3 mb-5">
        <Trash2 className="w-4 h-4 text-red-500" />
        <h3 className="text-sm font-semibold text-red-500">Danger Zone</h3>
      </div>
      <div className="space-y-3">
        <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/15">
          <p className="text-sm font-medium text-foreground mb-1">Delete account</p>
          <p className="text-xs text-muted-foreground mb-3">
            Permanently delete your account and all data. This cannot be undone.
          </p>
          {!confirming ? (
            <button
              onClick={() => setConfirming(true)}
              className="px-4 py-2 rounded-lg border border-red-500/30 text-red-500 text-xs font-medium hover:bg-red-500/10 transition-colors"
            >
              Delete my account
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setConfirming(false)}
                className="px-4 py-2 rounded-lg border border-border text-muted-foreground text-xs font-medium hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors">
                Yes, delete everything
              </button>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  )
}

export function SettingsClient({ user }: { user: UserData }) {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-4 sm:space-y-5">
      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your account and preferences</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}>
        <ProfileSection user={user} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <NotificationsSection remindersMuted={user.remindersMuted} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}>
        <SecuritySection />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
        <DangerZoneSection />
      </motion.div>
    </div>
  )
}
