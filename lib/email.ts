import { Resend } from 'resend'

export async function sendRenewalReminder(opts: {
  to: string
  userName: string | null
  subscriptionName: string
  amount: number
  currency: string
  renewsOn: Date
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn(`[email] RESEND_API_KEY not set — skipping reminder to ${opts.to}`)
    return
  }
  const resend = new Resend(process.env.RESEND_API_KEY)
  const amountStr = new Intl.NumberFormat('en-US', { style: 'currency', currency: opts.currency }).format(opts.amount)
  const dateStr = opts.renewsOn.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const greeting = opts.userName ? `Hi ${opts.userName},` : 'Hi,'

  await resend.emails.send({
    from: process.env.RESEND_FROM ?? 'Arca <onboarding@resend.dev>',
    to: opts.to,
    subject: `${opts.subscriptionName} renews ${dateStr} — ${amountStr}`,
    html: `
      <div style="font-family: -apple-system, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a;">
        <p style="font-size: 15px;">${greeting}</p>
        <p style="font-size: 15px; line-height: 1.6;">
          <strong>${opts.subscriptionName}</strong> renews on <strong>${dateStr}</strong>
          and will charge <strong>${amountStr}</strong>.
        </p>
        <p style="font-size: 15px; line-height: 1.6;">
          Still using it? Great. If not, now's the time to cancel.
        </p>
        <p style="font-size: 13px; color: #888; margin-top: 32px;">
          Sent by Arca — you enabled a renewal reminder for this subscription.
          Manage reminders in your <a href="https://arca.vercel.app/settings" style="color: #888;">settings</a>.
        </p>
      </div>
    `,
  })
}
