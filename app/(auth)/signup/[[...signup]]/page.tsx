import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <SignUp
      signInUrl="/signin"
      appearance={{
        elements: {
          rootBox: 'w-full',
          card: 'bg-card border border-border shadow-none rounded-xl w-full',
          headerTitle: 'text-foreground text-base font-semibold',
          headerSubtitle: 'text-muted-foreground text-sm',
          formFieldLabel: 'text-sm text-foreground',
          formFieldInput: 'bg-muted border border-border text-foreground rounded-md text-sm focus:ring-1 focus:ring-primary focus:border-primary',
          formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground rounded-md text-sm font-medium',
          footerActionLink: 'text-primary hover:text-primary/80',
          dividerLine: 'bg-border',
          dividerText: 'text-muted-foreground text-xs',
          socialButtonsBlockButton: 'bg-muted border border-border text-foreground hover:bg-muted/80 rounded-md',
          socialButtonsBlockButtonText: 'text-sm font-medium',
        },
        variables: {
          colorPrimary: 'oklch(0.585 0.233 264.531)',
          colorBackground: 'oklch(0.141 0.005 285.75)',
          colorText: 'oklch(0.985 0 0)',
          colorTextSecondary: 'oklch(0.634 0.004 285.75)',
          colorInputBackground: 'oklch(0.224 0.006 285.75)',
          colorInputText: 'oklch(0.985 0 0)',
          borderRadius: '0.5rem',
          fontFamily: 'var(--font-geist-sans)',
        },
      }}
    />
  )
}
