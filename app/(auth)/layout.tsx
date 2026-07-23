import { ArcaMark } from '@/components/ui/arca-mark'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="force-light min-h-dvh flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md px-4 py-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <ArcaMark size={32} />
          <span className="font-semibold text-sm tracking-tight text-foreground">Arca</span>
        </div>
        {children}
      </div>
    </div>
  )
}
