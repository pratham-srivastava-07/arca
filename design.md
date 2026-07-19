# Design System & UI Direction

> **Purpose:** This document is the visual and interaction contract for
> the project. Use it as the source of truth before building pages,
> components, or screens. The goal is not to copy any single reference
> site, but to reproduce the underlying design quality: editorial
> composition, strong hierarchy, deliberate whitespace, premium
> typography, visual storytelling, and disciplined interaction design.

------------------------------------------------------------------------

## 1. The Core Design Philosophy

The three references share a common principle:

> **The interface should feel designed, not assembled.**

Avoid the typical "SaaS template" look:

-   Generic hero section
-   Gradient background
-   Three cards
-   Random dashboard screenshot
-   Logo strip
-   Testimonials
-   Footer

Instead, every section should have a clear visual role.

### The product should feel:

-   **Premium** --- restrained color, excellent spacing, high-quality
    typography.
-   **Editorial** --- layouts should feel like a magazine or carefully
    art-directed website.
-   **Confident** --- large statements, strong whitespace, minimal
    unnecessary explanation.
-   **Technical but human** --- sophisticated infrastructure or product
    capability presented through understandable visual storytelling.
-   **Intentional** --- no decorative element should exist without
    contributing to hierarchy, mood, or comprehension.

------------------------------------------------------------------------

# 2. Visual Identity

## 2.1 The Design Language

The design language should combine:

### A. Swiss/editorial layout

Use:

-   Strong grids
-   Clear alignment
-   Large typography
-   Thin borders
-   Generous whitespace
-   Structured asymmetry

### B. Premium product design

Use:

-   Soft, restrained surfaces
-   Large rounded containers where appropriate
-   Carefully framed product visuals
-   Simple CTA hierarchy
-   Subtle hover and motion

### C. Art-directed storytelling

Use:

-   Large environmental imagery
-   Product screenshots as visual objects
-   Architectural diagrams
-   Atmospheric backgrounds
-   Controlled transitions between visual worlds

The page should not feel like a collection of sections. It should feel
like a **continuous narrative**.

------------------------------------------------------------------------

# 3. Design Tokens

Define these as CSS variables or theme tokens before building
components.

## 3.1 Color System

Do not use a large color palette.

Start with a small semantic palette:

``` css
:root {
  --background: #f7f7f3;
  --surface: #ffffff;
  --surface-muted: #eeeeeb;

  --foreground: #111111;
  --foreground-muted: #6f6f6a;
  --foreground-subtle: #a0a09a;

  --border: rgba(17, 17, 17, 0.14);
  --border-strong: rgba(17, 17, 17, 0.28);

  --accent: #c9f36b;
  --accent-foreground: #111111;

  --dark: #101514;
  --dark-foreground: #f5f5ef;
}
```

### Rules

-   Use the accent color sparingly.
-   One accent should be enough for most of the product.
-   Avoid rainbow gradients unless the product itself requires them.
-   Do not use a new color merely to make a section "more interesting."
-   The background should usually be slightly off-white rather than pure
    `#ffffff`.

------------------------------------------------------------------------

## 3.2 Typography

Typography is one of the primary visual components.

### Recommended hierarchy

``` text
Display:       64–120px
Hero heading:  56–96px
Section title: 40–64px
Card heading:  20–32px
Body:          15–18px
Small text:    11–14px
```

These are guidelines, not rigid rules.

### Typography principles

Large headings should:

-   Have a tight line-height
-   Use short lines
-   Create a clear visual statement
-   Never be surrounded by excessive copy

Example:

``` text
Patients,
not paperwork
```

is stronger than:

``` text
Our platform helps healthcare professionals
save time by automating their documentation workflow.
```

The explanation can follow the statement.

### Recommended font direction

Use a high-quality grotesk or modern sans-serif.

Possible choices:

-   Inter
-   Geist
-   Satoshi
-   Manrope
-   Instrument Sans
-   Neue Montreal
-   General Sans

Do not use five different font families.

**Maximum: two families.**

A strong default:

``` text
Primary: Inter / Geist / Satoshi
Mono:    Geist Mono / IBM Plex Mono
```

Use monospace only for:

-   Technical metadata
-   Metrics
-   Code
-   Labels
-   System information

------------------------------------------------------------------------

# 4. Layout System

## 4.1 The Grid

The interface should be based on a consistent grid.

### Desktop

``` text
Viewport
│
├── 24px–48px outer margin
│
├── 12-column content grid
│
└── 24px–32px gutters
```

Use a maximum content width:

``` css
--content-width: 1280px;
```

For highly editorial layouts, allow wider sections:

``` css
--wide-width: 1440px;
```

### Standard page container

``` css
.container {
  width: min(100% - 48px, 1280px);
  margin-inline: auto;
}
```

On smaller screens:

``` css
.container {
  width: min(100% - 32px, 1280px);
}
```

------------------------------------------------------------------------

## 4.2 Do Not Center Everything

A major characteristic of the references is that not every element is
centered.

Use a combination of:

-   Left-aligned text
-   Centered hero statements
-   Asymmetric image compositions
-   Full-bleed visual sections
-   Grid-based editorial layouts

### Example

``` text
┌────────────────────────────────────────────┐
│                                            │
│  Section title                             │
│  Short supporting copy                     │
│                                            │
│              [large visual]                │
│                                            │
└────────────────────────────────────────────┘
```

Do not turn every section into:

``` text
             TITLE
             TEXT
             BUTTON
             IMAGE
```

That creates a generic landing page.

------------------------------------------------------------------------

# 5. The Navigation System

The navigation should be quiet.

The references demonstrate that the navbar should not compete with the
hero.

## Desktop structure

``` text
[LOGO]          Product   Solutions   Resources   Pricing          Login   [CTA]
```

### Navigation rules

-   Keep the height compact.
-   Use small typography.
-   Use generous horizontal spacing.
-   Keep the primary CTA visually distinct.
-   Avoid excessive borders and shadows.
-   The navbar can sit inside a rounded container when the brand calls
    for a more product-like feel.
-   For premium editorial sites, the navbar can be nearly invisible.

### Mobile

Use:

``` text
[LOGO]                                  [MENU]
```

Do not squeeze the entire desktop navigation into a mobile header.

------------------------------------------------------------------------

# 6. The Hero Section

The hero is the most important section on the page.

It must answer three questions immediately:

1.  **What is this?**
2.  **Why should I care?**
3.  **What should I do next?**

## Hero formula

``` text
Small context label

Large, memorable statement

Short explanation

Primary CTA     Secondary CTA

Large visual / environment / product demonstration
```

### Example structure

``` text
[AI INFRASTRUCTURE]

The single platform to
build, evaluate, deploy,
and monitor AI systems.

Build reliable AI products without stitching
together disconnected tools.

[Start building]    [Explore platform]

                 [large visual]
```

------------------------------------------------------------------------

## 6.1 Hero Composition

Avoid placing a simple product screenshot directly underneath the
heading.

Instead, treat the visual as a composition.

Possible compositions:

### Product-in-environment

``` text
        ┌──────────────┐
        │              │
        │   PRODUCT    │
        │   INTERFACE  │
        │              │
        └──────────────┘

        atmospheric background
```

### Floating system

``` text
    [metric]          [metric]

             [main product]

    [data]             [status]
```

### Landscape / atmosphere

Use when the brand needs emotional presence.

The visual should establish the world of the product.

------------------------------------------------------------------------

# 7. Section Rhythm

The page should alternate between visual densities.

A good sequence:

``` text
1. High-impact hero
2. Quiet whitespace
3. Product capability
4. Dense visual demonstration
5. Human / team / architecture story
6. Metrics
7. Social proof
8. Resources / library
9. Dark conversion section
10. Footer
```

Do not make every section equally dense.

The page needs moments where the user can breathe.

------------------------------------------------------------------------

# 8. Product Capability Sections

Use a two-column structure when explaining product functionality.

``` text
┌──────────────────────────────────────────────┐
│                                              │
│  Small label                                  │
│  Large title                 [Product visual] │
│                                              │
│  Description                                  │
│                                              │
│  [Learn more →]                               │
│                                              │
└──────────────────────────────────────────────┘
```

### Good pattern

``` text
┌─────────────────┬────────────────────────────┐
│                 │                            │
│  Generate       │                            │
│  personalized   │        [visual]            │
│  output         │                            │
│                 │                            │
│  Description    │                            │
│                 │                            │
└─────────────────┴────────────────────────────┘
```

The visual should not be an afterthought. It should occupy meaningful
space.

------------------------------------------------------------------------

# 9. Feature Cards

Cards should be used with restraint.

## Good card

A good card has:

-   A clear purpose
-   A visual anchor
-   A short title
-   Minimal supporting text
-   A clear interaction

``` text
┌──────────────────────────────────────┐
│  [icon] Product capability            │
│                                      │
│  Short, useful explanation.           │
│                                      │
│                                      │
│              [visual]                 │
│                                      │
│  Learn more →                         │
└──────────────────────────────────────┘
```

## Avoid

``` text
┌────────┐ ┌────────┐ ┌────────┐
│ Icon   │ │ Icon   │ │ Icon   │
│ Title  │ │ Title  │ │ Title  │
│ Text   │ │ Text   │ │ Text   │
└────────┘ └────────┘ └────────┘
```

This is the default SaaS pattern and should not be used automatically.

------------------------------------------------------------------------

# 10. Data and Metrics

Metrics should feel like evidence, not decoration.

Use large numbers with supporting context.

``` text
200M+
Requests processed

5B+
Data points evaluated

99.998%
Platform reliability
```

### Layout

``` text
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ 200M+        │ 5B+          │ 300+         │ 99.998%      │
│ Requests     │ Events       │ Customers    │ Reliability   │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

### Rules

-   Do not exaggerate metrics.
-   Keep the label short.
-   Use consistent number formatting.
-   Let the numbers create visual rhythm.

------------------------------------------------------------------------

# 11. Social Proof

Logo walls work best when they are quiet.

``` text
Trusted by teams building the future

[Logo]   [Logo]   [Logo]   [Logo]   [Logo]
```

Do not make the logos huge.

The purpose is validation, not advertisement.

------------------------------------------------------------------------

# 12. The "Library" / Resources Section

A resource section should feel like a curated publication.

Use varied card sizes.

``` text
┌───────────────────────────────┬───────────┐
│                               │ Article   │
│        Featured article       ├───────────┤
│                               │ Article   │
├───────────────────────────────┴───────────┤
│ Article       Article       Article        │
└───────────────────────────────────────────┘
```

### Card hierarchy

One item should be clearly primary.

Do not give every resource equal visual weight.

Each resource should have:

-   Category
-   Title
-   Visual
-   Optional date / metadata
-   Clear hover state

------------------------------------------------------------------------

# 13. Dark Conversion Section

A dark final CTA is extremely effective when the rest of the page is
light.

``` text
┌────────────────────────────────────────────┐
│                                            │
│          Start your journey                │
│                                            │
│              [CTA]                         │
│                                            │
│          [large product visual]             │
│                                            │
│        atmospheric background               │
│                                            │
└────────────────────────────────────────────┘
```

The final CTA should feel like entering the product.

It should not be another generic:

> Ready to get started?

Instead, create a visual destination.

------------------------------------------------------------------------

# 14. Backgrounds and Atmosphere

Backgrounds are a major part of the references.

Use them strategically.

## Light sections

``` text
background: warm off-white
```

## Technical sections

``` text
background: near-black
```

## Atmospheric sections

Use:

-   Soft gradients
-   Blurred imagery
-   Environmental photography
-   Grain
-   Light noise
-   Subtle texture

### Important

Do not use background effects everywhere.

If every section has a gradient, no section feels special.

------------------------------------------------------------------------

# 15. Borders and Dividers

The references use borders as structural elements.

Use:

``` css
border: 1px solid rgba(0, 0, 0, 0.12);
```

Prefer borders over shadows for:

-   Grid separation
-   Cards
-   Data sections
-   Navigation structure

Use shadows only when an object genuinely needs elevation.

### Avoid

``` css
box-shadow: 0 20px 80px rgba(...);
```

on every card.

That creates a generic modern SaaS aesthetic.

------------------------------------------------------------------------

# 16. Border Radius

Use a controlled radius system.

``` text
Small UI:       6px–10px
Cards:          16px–24px
Large surfaces: 24px–40px
Hero container: 24px–40px
```

Do not make every element aggressively rounded.

The references balance:

-   Sharp editorial structures
-   Soft product surfaces
-   Large rounded containers

That contrast is important.

------------------------------------------------------------------------

# 17. Buttons

Buttons should be simple.

## Primary

``` text
[ Start building ]
```

Characteristics:

-   Dark or accent background
-   High contrast
-   Compact height
-   Strong typography
-   Slightly rounded

## Secondary

``` text
[ Learn more → ]
```

Can be:

-   Text-only
-   Subtle outline
-   Low-contrast surface

### Button hierarchy

Each section should generally have:

``` text
1 primary action
0–1 secondary action
```

Do not put three competing buttons in a section.

------------------------------------------------------------------------

# 18. Micro-Interactions

The UI should feel alive, but not noisy.

## Hover

``` css
transition:
  transform 300ms ease,
  background-color 300ms ease,
  border-color 300ms ease;
```

Good effects:

-   Slight image scale
-   Subtle card translation
-   Border color change
-   Button background transition
-   Text arrow movement

Example:

``` text
Learn more  →    becomes    Learn more  →
                                  →
```

Avoid:

-   Excessive bouncing
-   Random parallax
-   Every object floating
-   Long animations that delay interaction

------------------------------------------------------------------------

# 19. Motion Direction

Motion should communicate hierarchy.

### Hero

Slow and atmospheric.

### Product UI

Fast and responsive.

### Cards

Subtle and immediate.

### Page transitions

Smooth, but never obstructive.

Recommended principles:

``` text
Small UI interaction: 150–250ms
Card hover:           250–400ms
Section reveal:       500–900ms
Atmospheric motion:   3–12s
```

Always respect:

``` css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms;
    transition-duration: 0.01ms;
  }
}
```

------------------------------------------------------------------------

# 20. Image Direction

Images should not be inserted just to fill space.

Every image should have a job.

## Image categories

### 1. Product visual

Shows the actual interface.

### 2. Environmental visual

Creates brand atmosphere.

### 3. Diagrammatic visual

Explains a system or architecture.

### 4. Human visual

Creates trust and emotional connection.

### 5. Editorial visual

Supports articles and resources.

------------------------------------------------------------------------

## Image treatment

Images may use:

-   Cropping
-   Masks
-   Rounded containers
-   Full bleed
-   Layering
-   Partial overlap

Do not make every image the same aspect ratio.

Variation creates visual interest.

------------------------------------------------------------------------

# 21. Architecture / Technical Visuals

For developer-facing products, technical diagrams can become beautiful
visual assets.

Use:

``` text
┌─────────────────────────────────────┐
│                                     │
│       ┌─────────┐                   │
│       │ Service │──────┐            │
│       └─────────┘      │            │
│                        ▼            │
│                  ┌──────────┐       │
│                  │ Platform │       │
│                  └──────────┘       │
│                                     │
└─────────────────────────────────────┘
```

The visual should communicate complexity without becoming a technical
documentation page.

Use:

-   Fine lines
-   Small labels
-   Restrained colors
-   Grid backgrounds
-   Clear flow

------------------------------------------------------------------------

# 22. Responsive Design

Do not treat mobile as a compressed desktop.

## Desktop

Use:

-   Wide compositions
-   Multi-column layouts
-   Large display typography
-   Layered visuals

## Tablet

Use:

-   Reduced columns
-   Smaller type
-   Preserved hierarchy

## Mobile

Use:

``` text
Hero
↓
Primary visual
↓
Key capability
↓
Feature
↓
Feature
↓
Metrics
↓
Resources
↓
CTA
```

### Mobile rules

-   Reduce visual complexity.
-   Keep one primary action visible.
-   Avoid tiny text.
-   Use horizontal scrolling only when it is genuinely useful.
-   Never allow a complex desktop diagram to become unreadable.
-   Convert complex compositions into a clear vertical narrative.

------------------------------------------------------------------------

# 23. Component Architecture

Build the design system into reusable primitives.

## Foundation

``` text
Container
Section
Stack
Grid
Divider
Text
Button
Icon
```

## Navigation

``` text
Navbar
MobileMenu
Dropdown
Breadcrumbs
```

## Content

``` text
Hero
FeatureSection
FeatureCard
Metric
LogoCloud
ArticleCard
ResourceGrid
```

## Visual

``` text
ProductFrame
ImageFrame
Diagram
ScreenshotStack
AmbientBackground
```

## Conversion

``` text
CTASection
SignupPanel
Footer
```

------------------------------------------------------------------------

# 24. Recommended Component API

Components should be composable.

Example:

``` tsx
<Section variant="dark" spacing="xl">
  <Container>
    <Hero
      eyebrow="AI PLATFORM"
      title="Build better AI systems."
      description="..."
      actions={[
        { label: "Start building", variant: "primary" },
        { label: "Learn more", variant: "secondary" }
      ]}
    />
  </Container>
</Section>
```

Avoid hardcoding visual decisions deep inside components.

Prefer:

``` tsx
<Section tone="light" layout="split">
```

over:

``` tsx
<Section isBlueAndLargeWithRoundedCorners>
```

------------------------------------------------------------------------

# 25. Design Rules for AI-Generated UI

If an AI coding tool is being used to build the interface, these rules
are mandatory.

## Never allow the AI to:

-   Invent random gradients
-   Add excessive glassmorphism
-   Use generic dashboard cards everywhere
-   Use excessive rounded corners
-   Add arbitrary shadows
-   Use inconsistent spacing
-   Generate multiple unrelated font sizes
-   Add decorative icons to every feature
-   Use emojis as UI icons
-   Create a different visual style for every section

## The AI must:

-   Reuse the design tokens.
-   Reuse spacing values.
-   Reuse typography scale.
-   Reuse border treatments.
-   Reuse button styles.
-   Preserve the page rhythm.
-   Keep visual hierarchy intentional.

------------------------------------------------------------------------

# 26. Quality Checklist

Before considering a page complete, check:

## Hierarchy

-   Can I understand the page in five seconds?
-   Is there one dominant message?
-   Is the primary CTA obvious?

## Layout

-   Are all sections aligned to a consistent grid?
-   Is there enough whitespace?
-   Is the page rhythm varied?

## Typography

-   Are headings too long?
-   Is the body text too dense?
-   Are there too many font sizes?

## Visuals

-   Does every image have a purpose?
-   Are product visuals large enough to understand?
-   Is the visual hierarchy clear?

## Interaction

-   Are hover states present?
-   Are buttons distinguishable?
-   Are animations subtle?

## Responsive

-   Does the mobile layout feel intentionally designed?
-   Are complex visuals still understandable?
-   Is any text too small?

## Consistency

-   Are spacing values consistent?
-   Are border radii consistent?
-   Are colors semantic?
-   Are components reusable?

------------------------------------------------------------------------

# 27. The Final Standard

The finished interface should feel like this:

> **A strong visual idea, repeated with discipline.**

Not:

> A collection of components generated independently.

The most important rule is:

## Design the page as a composition first. Build the components second.

Before writing code, decide:

``` text
What is the visual story?

What is the dominant moment?

Where does the user's attention go first?

Where does the page breathe?

Where does the product become tangible?

What should the user remember?
```

If those answers are clear, the implementation becomes much easier.

If those answers are unclear, no amount of Tailwind classes, animations,
gradients, or components will make the interface feel premium.


