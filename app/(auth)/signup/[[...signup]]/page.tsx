import { SignUp } from '@clerk/nextjs'

/*
 * Clerk renders the widget in a portal outside the page's theme scope, so its
 * appearance can't rely on our semantic CSS tokens (they'd resolve against the
 * viewer's saved app theme and go dark). Everything here is theme-independent:
 * inline `variables` for color, hardcoded hex in `elements` for structure —
 * pinned to the paper/ink brand so sign-up always matches the light landing.
 */
export default function SignUpPage() {
  return (
    <SignUp
      signInUrl="/signin"
      appearance={{
        variables: {
          colorPrimary: '#111111',
          colorBackground: '#ffffff',
          colorText: '#111111',
          colorTextSecondary: '#6f6f6a',
          colorInputBackground: '#ffffff',
          colorInputText: '#111111',
          colorNeutral: '#111111',
          borderRadius: '0.625rem',
          fontFamily: 'var(--font-geist-sans)',
        },
        elements: {
          rootBox: 'w-full',
          card: 'bg-white border border-[#1111111f] shadow-none rounded-xl w-full',
          headerTitle: 'text-[#111111] text-base font-semibold',
          headerSubtitle: 'text-[#6f6f6a] text-sm',
          socialButtonsBlockButton: 'border border-[#1111111f] text-[#111111] hover:bg-[#f2f2ee] rounded-lg',
          socialButtonsBlockButtonText: 'text-[#111111] text-sm font-medium',
          dividerLine: 'bg-[#1111111f]',
          dividerText: 'text-[#6f6f6a] text-xs',
          formFieldLabel: 'text-sm text-[#111111]',
          formFieldInput: 'bg-white border border-[#11111124] text-[#111111] rounded-lg text-sm',
          formButtonPrimary: 'bg-[#111111] hover:bg-[#2b2b28] text-[#f5f5ef] rounded-lg text-sm font-medium normal-case',
          footerActionText: 'text-[#6f6f6a] text-sm',
          footerActionLink: 'text-[#111111] font-medium hover:opacity-80',
          identityPreviewText: 'text-[#111111] text-sm',
          identityPreviewEditButton: 'text-[#111111]',
          formResendCodeLink: 'text-[#111111]',
          otpCodeFieldInput: 'bg-white border border-[#11111124] text-[#111111] rounded-lg',
        },
      }}
    />
  )
}
