# CLAUDE.md

You are a Staff Product Engineer, Principal Frontend Engineer, Senior Product Designer, and UX Architect.

Build a production-grade SaaS application called **Sublytics**.

Sublytics is a modern subscription and personal finance management platform that helps users understand where their money goes through beautiful analytics, forecasting, budgeting, and recurring payment tracking.

The result must look and feel like a venture-backed startup product that could compete with Mint, Rocket Money, and Copilot Money.

---

# Core Philosophy

Do not build a CRUD dashboard.

Build a premium financial product.

The UI must feel:

* Linear
* Arc Browser
* Stripe Dashboard
* Attio
* Vercel
* Apple

combined together.

Every interaction should feel intentional.

Prioritize:

* Visual hierarchy
* Information density
* Motion design
* Typography
* Empty states
* Micro-interactions
* Smooth transitions

No generic admin dashboard appearance.

---

# Tech Stack

Frontend:

* Next.js 15 App Router
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion
* Recharts
* Lucide Icons

Backend:

* Next.js Server Actions
* Prisma
* PostgreSQL

Authentication:

* Better Auth

State:

* Zustand

Forms:

* React Hook Form
* Zod

---

# Database Models

User

* id
* email
* name
* avatar
* createdAt

Subscription

* id
* userId
* name
* logo
* category
* amount
* billingCycle
* nextPaymentDate
* status
* createdAt

Transaction

* id
* userId
* amount
* category
* merchant
* date
* type

Budget

* id
* userId
* category
* limit
* spent

Goal

* id
* userId
* title
* targetAmount
* currentAmount
* deadline

---

# Application Sections

## Dashboard

This should be breathtaking.

Hero section:

"Good Evening, Pratham"

Below:

Animated financial summary cards.

Cards:

* Monthly Spend
* Active Subscriptions
* Upcoming Payments
* Budget Remaining

Cards animate on load.

Subtle hover effects.

Live counting numbers.

Smooth gradients.

---

## Subscription Management

Main feature.

Display subscriptions in:

1. Grid View
2. List View

Each card includes:

* Logo
* Name
* Amount
* Renewal Date
* Category

Hovering should reveal:

* Edit
* Pause
* Delete

Beautiful card design.

Not table-heavy.

---

## Spending Analytics

Interactive analytics page.

Charts:

* Monthly spend trend
* Category breakdown
* Subscription growth
* Spending heatmap

Allow:

* Day
* Week
* Month
* Year

switching.

Animations must be fluid.

---

## Forecasting

One of the flagship features.

Calculate:

* Future recurring expenses
* Annual subscription costs
* Budget burn rate
* Savings projections

Display through:

* Interactive timeline
* Forecast graph
* Scenario simulations

Example:

"What happens if Netflix increases by 20%?"

"What if I cancel Spotify?"

Results update instantly.

---

## Budget Planner

Beautiful budgeting experience.

Visual progress bars.

Animated indicators.

Budget health score.

Categories:

* Food
* Entertainment
* Housing
* Transport
* Shopping
* Other

---

## Financial Goals

Users can create:

* Emergency Fund
* Vacation
* New Laptop
* Car

Show:

* Progress rings
* Time remaining
* Goal velocity

Premium visuals.

---

# UI Requirements

Create custom components:

* GlassCard
* MetricCard
* FloatingSidebar
* AnimatedCounter
* ForecastChart
* BudgetGauge
* SpendingHeatmap
* GoalProgressRing

No boring shadcn defaults.

Customize everything.

---

# Motion Design

Use Framer Motion extensively.

Requirements:

* Page transitions
* Card animations
* Hover interactions
* Loading states
* Staggered reveals
* Smooth chart transitions

Animation duration:

200–400ms

Use spring animations where appropriate.

---

# Sidebar

Collapsible.

Beautiful icons.

Active page indicator.

Smooth expand/collapse.

Inspired by Linear.

---

# Search

Global command palette.

Cmd + K.

Search:

* subscriptions
* transactions
* budgets
* goals

Instant results.

Inspired by Raycast.

---

# Theme System

Support:

* Light
* Dark

Dark mode must be primary.

Use deep surfaces.

Not pure black.

Premium appearance.

---

# Design Tokens

Radius:

* 16px
* 20px
* 24px

Spacing:

* Generous

Typography:

* Inter
* Geist

Shadows:

* Soft layered shadows

Use blur effects carefully.

---

# Empty States

Every empty state should be custom.

Examples:

No subscriptions:
"Looks like you're not paying for anything yet."

Show illustration.

Never leave blank screens.

---

# Loading States

Create beautiful skeleton loaders.

Animated shimmer.

No spinners unless necessary.

---

# Demo Data

Seed:

Netflix
Spotify
YouTube Premium
GitHub Pro
ChatGPT Plus
AWS

Generate realistic spending history.

At least 12 months of data.

---

# Performance

Must score:

* Lighthouse 95+
* Mobile Responsive
* Optimized Images
* Server Components where possible

---

# Folder Structure

Use enterprise architecture.

app/
components/
features/
lib/
hooks/
actions/
prisma/
types/
stores/

Feature-based organization.

---

# Deliverables

Generate:

1. Complete Prisma schema
2. Database seed script
3. Full application architecture
4. Reusable UI component system
5. Authentication flow
6. Dashboard pages
7. Analytics pages
8. Forecasting engine
9. Budget planner
10. Goal tracking system

Build the application completely.

Do not create placeholders.

Every page must be fully functional and visually polished.
