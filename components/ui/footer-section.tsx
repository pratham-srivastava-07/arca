"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Briefcase, Camera, Code2, Moon, Send, Sun, X, Zap } from "lucide-react"

function Footerdemo() {
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === "dark"

  return (
    <footer className="relative border-t border-border bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Newsletter */}
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary">
                <Zap className="w-3 h-3 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <span className="font-semibold text-sm tracking-tight">Arca</span>
            </div>
            <h2 className="mb-4 text-2xl font-bold tracking-tight">Stay in the loop</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Get product updates, financial tips, and insights delivered to your inbox.
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-11 pr-14 backdrop-blur-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1.5 top-1.5 h-8 w-8 rounded-full"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Product</h3>
            <nav className="space-y-2.5 text-sm">
              <Link href="/" className="block transition-colors hover:text-primary">Home</Link>
              <Link href="/dashboard" className="block transition-colors hover:text-primary">Dashboard</Link>
              <Link href="/subscriptions" className="block transition-colors hover:text-primary">Subscriptions</Link>
              <Link href="/analytics" className="block transition-colors hover:text-primary">Analytics</Link>
              <Link href="/forecasting" className="block transition-colors hover:text-primary">Forecasting</Link>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Resources</h3>
            <nav className="space-y-2.5 text-sm">
              <Link href="/budget" className="block transition-colors hover:text-primary">Budget Planner</Link>
              <Link href="/goals" className="block transition-colors hover:text-primary">Financial Goals</Link>
              <Link href="/signin" className="block transition-colors hover:text-primary">Sign in</Link>
              <a href="#" className="block transition-colors hover:text-primary">Privacy Policy</a>
              <a href="#" className="block transition-colors hover:text-primary">Terms of Service</a>
            </nav>
          </div>

          {/* Social + theme */}
          <div className="relative">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Follow Us</h3>
            <div className="mb-6 flex space-x-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full" aria-label="X / Twitter">
                      <X className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Follow on X</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full" aria-label="GitHub">
                      <Code2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>View on GitHub</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full" aria-label="LinkedIn">
                      <Briefcase className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Connect on LinkedIn</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full" aria-label="Instagram">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Follow on Instagram</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-muted-foreground" />
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
              <Moon className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="dark-mode" className="sr-only">Toggle dark mode</Label>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Arca. Built with care.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="transition-colors hover:text-primary text-muted-foreground">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-primary text-muted-foreground">Terms of Service</a>
            <a href="#" className="transition-colors hover:text-primary text-muted-foreground">Cookie Settings</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footerdemo }
