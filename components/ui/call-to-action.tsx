"use client"

import Link from "next/link"
import { MoveRight, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

function CTA() {
  return (
    <div className="w-full py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col text-center bg-muted/50 border border-border rounded-3xl p-8 lg:p-16 gap-8 items-center relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-primary/5 blur-3xl pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-primary/8 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative">
            <Badge>Get started today</Badge>
          </div>

          <div className="flex flex-col gap-3 relative">
            <h3 className="text-3xl md:text-5xl tracking-tighter max-w-2xl font-semibold text-foreground">
              Stop losing money to forgotten subscriptions
            </h3>
            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl mx-auto">
              Arca gives you complete visibility into every recurring charge.
              Know exactly what you&apos;re paying for, when it renews, and how to optimize your spending.
            </p>
          </div>

          <div className="flex flex-row gap-4 relative">
            <Link href="/signin">
              <Button variant="outline" className="gap-2">
                Sign in to your account
              </Button>
            </Link>
            <Link href="/signin">
              <Button className="gap-2">
                Start for free <MoveRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground relative">
            <Zap className="inline w-3.5 h-3.5 mr-1 text-primary" />
            Free forever · No credit card · 2-minute setup
          </p>
        </div>
      </div>
    </div>
  )
}

export { CTA }
