# CLAUDE.md — Hyena Studio

> This is the single source of truth for this project. Read this file completely before making any changes.

---

## Project Overview

**Name:** Hyena Studio
**Domain:** hyena.studio
**Tagline:** A design system that thinks.

Hyena is a design system product. It ships three layers as one integrated experience:

1. **Design token editor** — colors, radii, spacing, type, density — with intelligent guidance. It advises on companion choices, flags inconsistencies, enforces accessibility, and explains why.

2. **Component library** — consumes those tokens. Every component looks premium out of the box. Every token change cascades to every component in real-time.

3. **Code export pipeline** — outputs production-ready React + Tailwind. No drift between what you see and what you ship.

The system layer is opinionated and active. It doesn't just let you customise — it guides you. That's the difference between Hyena and every other component library or design tool.

### What Hyena IS
- A living design system with intelligent guardrails
- A token editor with real-time propagation to a full component library
- A design education tool that teaches principles through use
- A code export pipeline that outputs exactly what you see

### What Hyena is NOT
- Not a design tool — it doesn't do layout, prototyping, or visual composition (not Figma, not Stitch)
- Not an app builder — it doesn't generate full applications (not v0, not Bolt, not Lovable)
- Not an unstyled primitive kit — it ships with premium defaults and opinions (not raw shadcn)
- Not a component marketplace — it's a coherent system, not a collection from different authors (not 21st.dev)

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **React:** 19 with React Compiler enabled
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS 4
- **Hosting:** Vercel (free tier)
- **Icons:** Lucide React (consistent, tree-shakeable)
- **Utilities:** clsx + tailwind-merge (via `cn()` helper)
- **Database:** None — all client-side state (React context + localStorage for persistence)
- **AI:** None for MVP — rules engine is deterministic
- **Auth:** None for MVP

$0 infrastructure. Everything runs client-side.

---

## Scope & Constraints (MVP)

**Desktop-only for MVP.** The editor UI targets 1280px+ viewports. No mobile layout, no responsive breakpoints on the editor itself. However: do NOT use fixed-width layouts that would block responsive later. Use max-width + auto margins, flex/grid, and relative units so that adding breakpoints post-MVP is a CSS pass, not a rewrite.

**Light mode only for MVP.** The token system supports dark mode structurally (the cascade logic already handles light/dark derivation) but the editor UI, component preview, and all default values assume a light theme. Dark mode is a post-MVP feature. Do not add dark mode toggles, dark token defaults, or conditional dark styles. When dark mode is added later, it will be a second set of default values + a theme toggle in the editor — not a rearchitecture.

**Client-side only for MVP.** All state lives in React context + localStorage. This has a shelf life: the moment we want shareable themes, user presets, or any social/gallery feature, we'll need a database (likely Supabase). The token system and rules engine are designed as pure functions that take a TokenSet and return results — they have no dependency on where the TokenSet came from. This means migrating from localStorage to a database later requires changing only the persistence layer in `provider.tsx`, not the engine or components.

**No AI for MVP.** The rules engine is deterministic TypeScript logic. AI-powered suggestions ("based on your palette, try this accent") are a future feature. The Rule interface already supports `fix` suggestions — these are algorithmic for now, potentially AI-enhanced later.

---

## Core Principles

These govern every decision in this codebase:

1. **Defaults are the product.** The base variant of every component must be good enough that most users never customise. Premium is the starting point.

2. **Opinions over options.** The system has a point of view. It gives you the right way and explains why. Not 50 ways to do something.

3. **Guardrails, not gates.** Users CAN break rules. The system tells them what they broke, what it affects, and what it recommends. Their call.

4. **Education is a feature.** Every warning, suggestion, and default comes with a short explanation. Users learn design principles by using the tool.

5. **Consistency is enforced.** Components share a common origin. Tokens cascade. Changes are traced for impact.

6. **The tool IS the demo.** Hyena's own UI is built with its own component library and token system. The app previews itself.

### Principle 6 Implementation Detail

The app has two visual layers:

- **Product components** (Button, Card, Input, etc.) — these are what users preview, customise, and export. They read tokens from the user's `TokenSet` and update in real-time when tokens change.

- **Editor chrome** (the sidebar, panels, controls of the editor itself) — these ALSO use the same component primitives but read from a **fixed editor theme** that does NOT change when the user edits tokens. This prevents the editor from becoming unusable when a user picks bad colors.

Implementation: the `TokenProvider` wraps the component preview area. The editor chrome sits outside this provider and uses a separate, static set of CSS variables scoped to a `.hyena-chrome` class.

---

## Project Structure

```
hyena-studio/
├── CLAUDE.md                         # This file — project source of truth
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── layout.tsx                # Root layout — loads fonts, editor chrome theme
│   │   ├── page.tsx                  # Main app — editor + preview
│   │   └── globals.css               # Tailwind imports + editor chrome CSS vars + @font-face
│   │
│   ├── tokens/                       # Design token system
│   │   ├── types.ts                  # Token type definitions (TokenSet, ColorTokens, etc.)
│   │   ├── defaults.ts               # Default token values (the premium defaults)
│   │   ├── generator.ts              # Derived token generation (palette from primary, etc.)
│   │   ├── css.ts                    # TokenSet → CSS custom properties string
│   │   └── provider.tsx              # React context: useTokens() hook + TokenProvider
│   │
│   ├── rules/                        # Design system rules engine
│   │   ├── types.ts                  # Rule, RuleResult, Severity types
│   │   ├── engine.ts                 # evaluate(tokens: TokenSet) → RuleResult[]
│   │   ├── color-rules.ts            # Contrast, hue semantics, distinctness
│   │   ├── shape-rules.ts            # Concentric radius, consistency
│   │   ├── typography-rules.ts       # Scale gaps, line height, min size
│   │   ├── spacing-rules.ts          # Base unit multiples, touch targets
│   │   └── motion-rules.ts           # Duration relationships, easing consistency
│   │
│   ├── components/                   # The component library (Hyena's product)
│   │   ├── primitives/               # Atomic — self-contained
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Toggle.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   └── Divider.tsx
│   │   │
│   │   ├── composite/                # Composed from primitives
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Alert.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Table.tsx
│   │   │   └── Skeleton.tsx
│   │   │
│   │   └── index.ts                  # Public barrel exports
│   │
│   ├── editor/                       # The Hyena app UI
│   │   ├── layout/                   # App shell, panels, layout structure
│   │   │   ├── AppShell.tsx          # Main layout: sidebar + preview + panel
│   │   │   ├── Sidebar.tsx           # Left: token editor controls
│   │   │   └── Panel.tsx             # Right: code export, rules, info
│   │   │
│   │   ├── token-editor/             # Token editing controls
│   │   │   ├── ColorEditor.tsx       # Color pickers for all color tokens
│   │   │   ├── RadiusEditor.tsx      # Radius slider / presets
│   │   │   ├── SpacingEditor.tsx     # Base unit control
│   │   │   ├── TypographyEditor.tsx  # Font pairing selector
│   │   │   └── DensityEditor.tsx     # Density presets
│   │   │
│   │   ├── preview/                  # Component preview area
│   │   │   ├── ComponentPreview.tsx  # Renders all components with live tokens
│   │   │   └── StateToggle.tsx       # Toggle between component states
│   │   │
│   │   ├── guidance/                 # Rules engine UI
│   │   │   ├── RulesPanel.tsx        # List of warnings/errors/info
│   │   │   └── RuleCard.tsx          # Individual rule display with explanation
│   │   │
│   │   └── export/                   # Code export UI
│   │       ├── CodeExport.tsx        # Component code viewer + copy
│   │       └── TokenExport.tsx       # CSS variables / Tailwind config export
│   │
│   ├── hooks/                        # Shared React hooks
│   │   ├── useTokens.ts             # Access token context (re-export from provider)
│   │   ├── useRules.ts              # Run rules engine, return results
│   │   └── useClipboard.ts          # Copy to clipboard with feedback
│   │
│   ├── lib/                          # Pure utility functions (no React)
│   │   ├── cn.ts                     # clsx + tailwind-merge utility
│   │   ├── color.ts                  # Color math: contrast ratio, palette gen, hue checks
│   │   ├── math.ts                   # Concentric radius, spacing scale generation
│   │   └── export.ts                 # Code string generation for component export
│   │
│   └── types/                        # Shared TypeScript types
│       └── index.ts                  # Re-exports from tokens/types.ts, rules/types.ts
│
├── public/
│   └── fonts/                        # Self-hosted DM Sans + DM Mono (no Google Fonts dependency)
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

---

## Token System

### Token Categories

```typescript
interface TokenSet {
  color: ColorTokens
  radius: RadiusTokens
  spacing: SpacingTokens
  typography: TypographyTokens
  density: DensityLevel
  elevation: ElevationTokens
  motion: MotionTokens
}

type DensityLevel = 'compact' | 'comfortable' | 'spacious'
```

### Color Tokens

```typescript
interface ColorTokens {
  // Brand — user sets `primary`. Rest are auto-generated.
  primary: string
  'primary-hover': string        // Generated: primary lightness +8%
  'primary-active': string       // Generated: primary lightness +12%
  'primary-soft': string         // Generated: primary at 8% opacity composited on surface
  'on-primary': string           // Generated: #FFFFFF or #000000 based on contrast ratio

  // Semantic — user sets the base. Soft and on- variants auto-generated.
  error: string
  'error-soft': string           // Generated: error at 8% opacity on surface
  'on-error': string             // Generated: white or black for contrast
  warning: string
  'warning-soft': string
  'on-warning': string
  success: string
  'success-soft': string
  'on-success': string

  // Neutral surfaces — user sets surface. Others are derived.
  surface: string                // Base surface (#FFFFFF)
  'surface-container': string    // Generated: surface darkened 2% (#F8F8FA)
  'surface-container-high': string // Generated: surface darkened 4% (#F0F0F3)

  // Neutral text — auto-generated from a neutral hue or pure gray
  'on-surface': string           // Primary text — highest contrast (#111111)
  'on-surface-muted': string     // Secondary text (#6B6B76)
  'on-surface-subtle': string    // Tertiary text (#9D9DAA)
  'on-surface-faint': string     // Placeholder / disabled (#CCCCD4)

  // Borders — derived from surface
  outline: string                // Default borders (#E4E4E7)
  'outline-variant': string      // Subtle dividers (#F0F0F3)
  'outline-hover': string        // Hovered borders (#D4D4D8)

  // Utility
  'focus-ring': string           // Generated: primary at 25% opacity
  scrim: string                  // Fixed: rgba(0, 0, 0, 0.5)
}
```

**What the user directly controls:** `primary`, `error`, `warning`, `success`, `surface`.
**What is auto-generated:** everything else.

### Radius Tokens

```typescript
interface RadiusTokens {
  none: number    // 0
  xs: number      // 4
  sm: number      // 6
  md: number      // 8
  lg: number      // 12
  xl: number      // 16
  '2xl': number   // 20
  full: number    // 9999
}
```

Stored as numbers (px) for math operations. Converted to CSS `px` strings at output.

User controls via **presets**:
- **Sharp:** none:0, xs:2, sm:3, md:4, lg:6, xl:8, 2xl:10, full:9999
- **Soft (default):** none:0, xs:4, sm:6, md:8, lg:12, xl:16, 2xl:20, full:9999
- **Round:** none:0, xs:6, sm:8, md:12, lg:16, xl:20, 2xl:28, full:9999

### Spacing Tokens

```typescript
interface SpacingTokens {
  base: number  // Default: 4
  // Scale is always generated: [base*1, base*2, base*3, base*4, base*5, base*6, base*8, base*10, base*12, base*16]
  // With base=4: [4, 8, 12, 16, 20, 24, 32, 40, 48, 64]
}

// Accessed as:
// spacing[0] = 4px   (base * 1)
// spacing[1] = 8px   (base * 2)
// spacing[2] = 12px  (base * 3)
// spacing[3] = 16px  (base * 4)
// spacing[4] = 20px  (base * 5)
// spacing[5] = 24px  (base * 6)
// spacing[6] = 32px  (base * 8)
// spacing[7] = 40px  (base * 10)
// spacing[8] = 48px  (base * 12)
// spacing[9] = 64px  (base * 16)
```

CSS variables: `--spacing-0` through `--spacing-9`.

### Typography Tokens

```typescript
interface TypographyTokens {
  font: {
    sans: string    // '"DM Sans", system-ui, sans-serif'
    mono: string    // '"DM Mono", ui-monospace, monospace'
  }
  scale: Record<TypeScaleLevel, TypeStyle>
}

type TypeScaleLevel =
  | 'display' | 'heading-lg' | 'heading-md' | 'heading-sm'
  | 'body-lg' | 'body-md' | 'body-sm'
  | 'label-lg' | 'label-md' | 'label-sm'

interface TypeStyle {
  size: number         // px
  lineHeight: number   // unitless ratio
  weight: number       // 300-700
  tracking: number     // em
}
```

**Default type scale:**

| Token | Size | Line Height | Weight | Tracking |
|-------|------|-------------|--------|----------|
| display | 36px | 1.15 | 600 | -0.025em |
| heading-lg | 28px | 1.2 | 600 | -0.02em |
| heading-md | 22px | 1.25 | 600 | -0.015em |
| heading-sm | 18px | 1.3 | 600 | -0.01em |
| body-lg | 16px | 1.55 | 400 | -0.005em |
| body-md | 14px | 1.5 | 400 | 0em |
| body-sm | 12px | 1.5 | 400 | 0.005em |
| label-lg | 14px | 1.3 | 500 | 0em |
| label-md | 12px | 1.3 | 500 | 0.01em |
| label-sm | 11px | 1.3 | 500 | 0.015em |

### Elevation Tokens

```typescript
interface ElevationTokens {
  0: string  // 'none'
  1: string  // '0 0 0 1px rgba(0,0,0,0.04), 0 1px 2px -1px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.03)'
  2: string  // '0 0 0 1px rgba(0,0,0,0.06), 0 2px 4px -1px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.05)'
  3: string  // '0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)'
}
```

All 3 layers each. NOT user-editable for MVP.

### Motion Tokens

```typescript
interface MotionTokens {
  duration: {
    instant: number   // 80 (ms)
    fast: number      // 150
    normal: number    // 250
    slow: number      // 350
  }
  easing: {
    standard: string  // 'cubic-bezier(0.2, 0, 0, 1)'
    enter: string     // 'cubic-bezier(0, 0, 0.2, 1)'
    exit: string      // 'cubic-bezier(0.4, 0, 1, 1)'
    spring: string    // 'cubic-bezier(0.34, 1.56, 0.64, 1)'
  }
}
```

NOT user-editable for MVP.

### Token Cascade

When a user changes a token:

1. **User sets `primary`** → generator produces: primary-hover, primary-active, primary-soft, on-primary, focus-ring
2. **User sets `error`/`warning`/`success`** → generator produces: soft variant, on-color variant for each
3. **User sets `surface`** → generator produces: surface-container, surface-container-high, all on-surface shades, all outline shades
4. **User changes radius preset** → all radius tokens update. Concentric calculations recalculate via CSS calc().
5. **User changes spacing base** → entire spacing scale regenerates.
6. **User changes density** → maps to multiplier affecting component padding and sizing.
7. **User changes font pairing** → font CSS variables update.

**Delivery:** All tokens → CSS custom properties on a wrapper `<div style={cssVarsString}>` around the preview area. Components read via `var(--token-name)`. Most changes are instant CSS variable swaps — no re-render needed.

---

## Rules Engine

### Types

```typescript
interface Rule {
  id: string
  name: string
  scope: 'color' | 'shape' | 'spacing' | 'typography' | 'motion'
  severity: 'error' | 'warning' | 'info'
  condition: (tokens: TokenSet) => boolean  // returns true if VIOLATED
  message: string                            // what's wrong
  why: string                                // why it matters (educational)
  fix?: (tokens: TokenSet) => Partial<TokenSet>
}

interface RuleResult {
  rule: Rule
  violated: boolean
}

type RuleReport = {
  errors: RuleResult[]
  warnings: RuleResult[]
  info: RuleResult[]
  passed: number
  total: number
}
```

### Severity
- **error** — accessibility/usability violation. Red. Must fix.
- **warning** — design inconsistency. Yellow. Should fix.
- **info** — suggestion. Blue. Nice to have.

### Complete Rule Set (MVP)

#### Color Rules

| ID | Name | Sev | Violated when... | Message | Why |
|----|------|-----|-------------------|---------|-----|
| `color-contrast-primary` | Primary contrast | error | contrast(on-primary, primary) < 4.5 | "Text on primary background fails WCAG AA (4.5:1)." | "Low contrast makes text unreadable for users with low vision." |
| `color-contrast-error` | Error contrast | error | contrast(on-error, error) < 4.5 | "Text on error background fails WCAG AA." | Same. |
| `color-contrast-warning` | Warning contrast | error | contrast(on-warning, warning) < 4.5 | "Text on warning background fails WCAG AA." | Same. |
| `color-contrast-success` | Success contrast | error | contrast(on-success, success) < 4.5 | "Text on success background fails WCAG AA." | Same. |
| `color-contrast-surface` | Surface contrast | error | contrast(on-surface, surface) < 4.5 | "Body text on surface fails WCAG AA." | Same. |
| `color-contrast-muted` | Muted text | warning | contrast(on-surface-muted, surface) < 3 | "Secondary text contrast is below 3:1." | "Muted text should be de-emphasized, not invisible." |
| `color-error-hue` | Error hue | warning | hue(error) not in 0-30° or 340-360° | "Error color isn't red/orange. Users expect red = danger." | "Color semantics are cultural conventions." |
| `color-warning-hue` | Warning hue | warning | hue(warning) not in 30-60° | "Warning color isn't yellow/amber." | Same. |
| `color-success-hue` | Success hue | warning | hue(success) not in 90-160° | "Success color isn't green." | Same. |
| `color-primary-error-distinct` | Primary ≠ Error | warning | deltaE(primary, error) < 30 | "Primary and error are too similar. Users may confuse actions with dangers." | "Distinct semantic colors prevent misclicks." |
| `color-primary-soft-contrast` | Soft readable | warning | contrast(on-surface, primary-soft) < 4.5 | "Text on soft primary is hard to read." | "Soft backgrounds are used in chips and badges — text must stay legible." |

#### Shape Rules

| ID | Name | Sev | Violated when... | Message | Why |
|----|------|-----|-------------------|---------|-----|
| `shape-radius-scale` | Scale order | warning | any radius[n] >= radius[n+1] | "Radius scale isn't increasing. Larger tokens need larger radii." | "Consistent scale creates visual hierarchy." |
| `shape-radius-max` | Reasonable max | info | any non-full radius > 28 | "Radii above 28px can look distorted on small elements." | "Extreme radii work for pills but break other shapes." |

#### Typography Rules

| ID | Name | Sev | Violated when... | Message | Why |
|----|------|-----|-------------------|---------|-----|
| `type-scale-gap` | Scale gap | warning | adjacent levels differ < 2px | "[level-a] and [level-b] are only [n]px apart." | "If two sizes look identical, hierarchy breaks." |
| `type-min-size` | Min font size | error | label-sm size < 11 | "Font size [n]px is below 11px minimum for interactive text." | "Below 11px is unreadable on most screens." |
| `type-lh-display` | Display line-height | warning | display lineHeight < 1.0 or > 1.3 | "Display line height outside 1.1–1.2 range." | "Large text needs tight leading to feel cohesive." |
| `type-lh-body` | Body line-height | warning | body-md lineHeight < 1.35 or > 1.7 | "Body line height outside 1.4–1.6 range." | "Reading comfort depends on line height." |

#### Spacing Rules

| ID | Name | Sev | Violated when... | Message | Why |
|----|------|-----|-------------------|---------|-----|
| `spacing-base-range` | Base unit range | warning | base < 2 or base > 8 | "Spacing base [n]px is outside practical range (2–8)." | "Below 2 elements merge. Above 8 everything is sparse." |

#### Motion Rules

| ID | Name | Sev | Violated when... | Message | Why |
|----|------|-----|-------------------|---------|-----|
| `motion-max-duration` | Max duration | info | duration.slow > 400 | "Slowest animation is above 400ms." | "Animations over 400ms feel sluggish." |

### Conflict Resolution
1. Errors first, then warnings, then info
2. Most impactful (more token pairs affected) ranks higher within severity
3. No duplicate messages — merge equivalent guidance
4. Conflicting fixes shown side by side — user chooses

### Engine API
```typescript
const report: RuleReport = evaluate(currentTokens)
// report.errors, report.warnings, report.info, report.passed, report.total
```
Runs synchronously. ~20 rules, <1ms. No debouncing needed.

---

## Component Specifications (MVP — 13 Components)

### Architecture
- **Primitives** (`src/components/primitives/`) — atomic, self-contained, no internal Hyena dependencies
- **Composites** (`src/components/composite/`) — composed from primitives
- All visual values from CSS custom properties — **zero hardcoded colors, sizes, shadows, or radii**
- All interactive components implement: default, hover, active, focus-visible, disabled
- TypeScript props with sensible defaults, exported alongside component
- Accessible by default: aria, keyboard nav, focus management
- Uses `cn()` for conditional classes

### State Patterns (ALL interactive components)

| State | Treatment | CSS |
|-------|-----------|-----|
| default | Base | — |
| hover | Bg shift 8% | `hover:` bg transition 150ms |
| active | Scale 0.97 or deeper bg | `active:` transform 80ms |
| focus-visible | 2px ring, 2px offset, focus-ring token | `focus-visible:` only |
| disabled | Opacity 0.45, pointer-events none | `disabled:` or `aria-disabled` |

No exceptions across any component.

### Animation Patterns (ALL components)

| Type | Duration | Easing | Effect |
|------|----------|--------|--------|
| State transitions | 150ms | standard | bg-color, transform |
| Entry | 250ms | enter | opacity 0→1, translateY 8→0, blur 4→0, staggered 40ms |
| Exit | 150ms | exit | opacity 1→0, translateY 0→-8, blur 0→3 |
| Toggle | 200ms | spring | thumb position |
| Modal enter | 350ms | enter | scale 0.95→1, opacity, blur |
| Modal exit | 200ms | exit | opacity, translateY -8px |

---

### 1. Button

**Variants:**

| Variant | Bg | Text | Border | Use |
|---------|-----|------|--------|-----|
| `filled` | --color-primary | --color-on-primary | none | Primary actions |
| `outlined` | transparent | --color-on-surface | 1px --color-outline | Secondary |
| `ghost` | transparent | --color-on-surface-muted | none | Tertiary |
| `destructive` | --color-error | --color-on-error | none | Dangerous |
| `soft` | --color-primary-soft | --color-primary | none | De-emphasized |

**Sizes:**

| Size | Height | Pad (h) | Font | Icon | Gap | Radius |
|------|--------|---------|------|------|-----|--------|
| sm | 32px | spacing[2] 12px | label-md 12/500 | 14px | 6px | --radius-sm |
| md | 38px | spacing[3] 16px | label-lg 14/500 | 16px | 8px | --radius-md |
| lg | 44px | spacing[4] 20px | body-md 14/500 | 18px | 10px | --radius-md |

**Extra state:** `loading` — spinner replaces content, width locked, pointer-events none.

**Props:**
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined' | 'ghost' | 'destructive' | 'soft'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  fullWidth?: boolean
  asChild?: boolean
}
```

**Rules:** destructive = error tokens only. Icon-only needs aria-label. Loading locks width. Inside Card = concentric radius. Ghost never sole action.

---

### 2. Input

**Variants:** `outlined` (border, transparent bg), `filled` (surface-container bg, no border)

**Sizes:**

| Size | Height | Pad (h) | Font | Radius |
|------|--------|---------|------|--------|
| sm | 34px | spacing[2] 12px | body-sm 12px | --radius-sm |
| md | 40px | spacing[3] 16px | body-md 14px | --radius-sm |
| lg | 48px | spacing[3] 16px | body-lg 16px | --radius-md |

**Extra states:** `error` (error border + message), `readonly` (dashed border or muted bg).

**Props:**
```typescript
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'outlined' | 'filled'
  size?: 'sm' | 'md' | 'lg'
  label?: string
  helperText?: string
  error?: boolean | string
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  fullWidth?: boolean
}
```

**Rules:** Label required (visible or aria). Placeholder ≠ label. Heights align with Button/Select.

---

### 3. Badge

**Variants:** `filled`, `soft`, `outlined`, `dot`
**Colors:** `default`, `primary`, `success`, `warning`, `error`
**Sizes:** sm (20px), md (24px). Always radius-full (pill).

**Props:**
```typescript
interface BadgeProps {
  variant?: 'filled' | 'soft' | 'outlined' | 'dot'
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md'
  children?: React.ReactNode
}
```

**Rules:** Dot needs aria-label. Status colors match meaning. Short text only.

---

### 4. Toggle

**Sizes:** sm (36×20 track, 16px thumb), md (44×24 track, 20px thumb)

**Animation:** Thumb moves with spring easing 200ms. Active: thumb stretches 1.1x horizontally. Hover: 8px halo at 8% opacity.

**Props:**
```typescript
interface ToggleProps {
  size?: 'sm' | 'md'
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
  id?: string
}
```

**Rules:** Must have label. Never in submit forms. Animation uses CSS transition (interruptible).

---

### 5. Select

Mirrors Input in sizing, variants, and visuals. Trigger = Input + chevron-down.

**Dropdown:** surface bg, elevation-2, radius-md. Max 240px, scrollable. Hover: surface-container. Selected: primary-soft + check. Viewport-aware positioning.

**Props:**
```typescript
interface SelectProps {
  variant?: 'outlined' | 'filled'
  size?: 'sm' | 'md' | 'lg'
  label?: string
  placeholder?: string
  helperText?: string
  error?: boolean | string
  disabled?: boolean
  options: Array<{ value: string; label: string; disabled?: boolean }>
  value?: string
  onChange?: (value: string) => void
  fullWidth?: boolean
}
```

**Rules:** Chevron rotates 180° animated. Selected scrolled into view. Heights match Input.

---

### 6. Tooltip

**Purpose:** Contextual hint on hover/focus. Supplementary info only.

**Positioning:** top (default), right, bottom, left. Auto-flips for viewport.
**Delay:** 300ms before show. Instant hide.
**Visual:** surface-container-high bg, on-surface text, radius-sm, elevation-2, max-width 240px, body-sm type.
**Animation:** Fade in (opacity + translateY 4→0, 150ms enter). Fade out (opacity only, 100ms).

**Props:**
```typescript
interface TooltipProps {
  content: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  delay?: number
  children: React.ReactNode
}
```

**Rules:** No interactive content inside. Trigger must be focusable. Text-only content.

---

### 7. Divider

**Purpose:** Visual separator.

**Variants:** `full` (edge to edge), `inset` (indented left), `middle` (margin both sides)
**Direction:** `horizontal` (default), `vertical`
**Visual:** 1px, outline-variant color.

**Props:**
```typescript
interface DividerProps {
  variant?: 'full' | 'inset' | 'middle'
  direction?: 'horizontal' | 'vertical'
  className?: string
}
```

**Rules:** Include `role="separator"` + `aria-orientation`. Never inside Card between slots (Card handles its own gaps).

---

### 8. Card

**Variants:**

| Variant | Bg | Border | Shadow |
|---------|-----|--------|--------|
| `elevated` | --color-surface | none | elevation-1, hover: elevation-2 |
| `outlined` | --color-surface | 1px --color-outline-variant | none |
| `filled` | --color-surface-container | none | none |

**Padding by density:** compact 12px, comfortable 16px, spacious 24px.

**Composable:** `<Card>`, `<Card.Header>`, `<Card.Body>`, `<Card.Footer>` compound pattern.

**Props:**
```typescript
interface CardProps {
  variant?: 'elevated' | 'outlined' | 'filled'
  interactive?: boolean
  selected?: boolean
  onClick?: () => void
  children: React.ReactNode
  className?: string
}
```

**Rules:** Concentric radius on all children: `calc(var(--radius-xl) - PADDING)`. No nesting >1 level. Interactive cards + child buttons need stopPropagation.

---

### 9. Alert

**Variants:** `filled`, `soft`, `outlined`
**Types:** `info` (primary), `success`, `warning`, `error`
Default icons from Lucide: Info, CheckCircle, AlertTriangle, XCircle.

**Props:**
```typescript
interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error'
  variant?: 'filled' | 'soft' | 'outlined'
  title?: string
  children: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  icon?: React.ReactNode | false
}
```

**Rules:** Semantic colors enforced. Dismiss = smooth height collapse. Filled used sparingly.

---

### 10. Skeleton

**Purpose:** Loading placeholder matching content shape.

**Variants:** `text` (14px height, 100% width), `circular` (40px default), `rectangular` (100% × 120px default)
**Animation:** Opacity pulse 0.6→1→0.6, 1.5s, infinite, ease-in-out. No shimmer — just opacity.

**Props:**
```typescript
interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  className?: string
}
```

**Rules:** Must match dimensions of content it replaces. Pulse uses opacity only. Follows Card padding when inside Card.

---

### 11. Modal

**Variants:** `default`, `destructive` (header tinted error-soft)
**Sizes:** sm (400px), md (520px), lg (640px)

**Animation:** Enter: scrim 0→0.5 (200ms), modal scale 0.95→1 + opacity + blur (350ms enter easing). Exit: opacity + translateY -8px (200ms exit easing). **Exit deliberately more subtle.**

**Anatomy:** Scrim → Modal (header + scrollable body + footer). Footer: cancel left, confirm right.

**Props:**
```typescript
interface ModalProps {
  open: boolean
  onClose: () => void
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'destructive'
  title: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  closeOnScrim?: boolean
  closeOnEscape?: boolean
}
```

**Rules:** Focus trapped. Escape closes. Scroll locked. No stacking. Radius-2xl (larger than Card's radius-xl).

---

### 12. Navbar

**Variants:** `solid` (opaque + shadow/border), `glass` (translucent + backdrop-blur)
**Sizes:** default (56px), compact (48px)

**Nav link states:** default (on-surface-muted), hover (on-surface + subtle bg), active (on-surface + primary indicator).

**Props:**
```typescript
interface NavbarProps {
  variant?: 'solid' | 'glass'
  size?: 'default' | 'compact'
  brand?: React.ReactNode
  children?: React.ReactNode
  actions?: React.ReactNode
  sticky?: boolean
  maxWidth?: string
}
```

**Rules:** No rounded corners ever. Glass must maintain readable contrast. Active ≠ hover visually. z-index: above cards, below modals.

---

### 13. Table

**Variants:** `default` (dividers), `striped` (alternating bg), `bordered` (full grid)

**Density:**

| Density | Row H | Cell pad h | Cell pad v | Font |
|---------|-------|-----------|-----------|------|
| compact | 36px | spacing[2] 12px | spacing[1] 8px | body-sm 12px |
| comfortable | 44px | spacing[3] 16px | spacing[2] 12px | body-md 14px |
| spacious | 52px | spacing[4] 20px | spacing[3] 16px | body-md 14px |

Header: surface-container-high bg, label-sm (11px/500).

**Props:**
```typescript
interface TableProps {
  variant?: 'default' | 'striped' | 'bordered'
  columns: Array<{
    key: string; label: string; width?: string
    align?: 'left' | 'center' | 'right'; sortable?: boolean
  }>
  data: Array<Record<string, React.ReactNode>>
  selectable?: boolean
  selectedRows?: string[]
  onSelectRow?: (id: string) => void
  onSort?: (key: string, direction: 'asc' | 'desc') => void
  emptyMessage?: string
}
```

**Rules:** Sticky header. Numeric = right-aligned + tabular-nums. Empty state required. Min column 60px. Inside Card = concentric corners. Selected ≠ hover.

---

### Cross-Component Consistency Rules

1. **Height alignment:** Button sm(32) ≈ Input sm(34) ≈ Select sm(34). 2px difference = border. They align inline.
2. **Radius coherence:** Same hierarchy = same token. Nested = concentric via calc(). Modals (2xl) > Cards (xl) > Inputs (sm).
3. **Color roles:** Primary = action. Error = destructive. Never swapped. No exceptions.
4. **State consistency:** Hover = bg shift. Active = scale. Focus = ring. Disabled = 0.45. Identical everywhere.
5. **Spacing:** All from scale. Zero magic numbers.
6. **Type mapping:** Buttons = label tokens. Input text = body tokens. Helper = body-sm. No invented sizes.
7. **Animation:** All hovers = duration-fast + easing-standard. All entries = duration-normal + easing-enter. All exits = duration-fast + easing-exit.
8. **Density:** Every component with padding/height/gap responds to density changes.

---

## Export System (The Last Mile)

A copied component is useless without its tokens. Hyena's export is self-contained.

### Export Modes

**A) Single component**
User copies a Button. They get:
```tsx
// This component requires Hyena tokens.
// Add the CSS variables from your token export to your global CSS.
// Docs: hyena.studio/docs/setup

// [full Button.tsx code with all variants, sizes, states]
```

**B) Token export**
One of three formats:
- **CSS custom properties** — `:root { ... }` block. Paste into globals.css.
- **Tailwind config** — `theme.extend` object mapping tokens to utilities.
- **JSON** — raw values for any system.

**C) Full library export**
Zip / copyable folder:
```
hyena-export/
├── tokens.css           # All CSS custom properties
├── tailwind.config.ts   # Tailwind theme extension
├── components/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── ... (all 13)
│   └── index.ts
├── lib/
│   └── cn.ts
└── README.md            # Setup: deps, fonts, tokens, usage
```

### Setup Guide (always included)
1. `npm install clsx tailwind-merge lucide-react`
2. Add font imports (link or self-host instructions)
3. Paste `tokens.css` into `globals.css`
4. Import: `import { Button } from './components'`
5. Use: `<Button variant="filled">Save</Button>`

**Standard: user gets it working in under 2 minutes or the export has failed.**

### Export Code Quality
- Works with zero modification in any Next.js + Tailwind project
- No dependencies beyond clsx, tailwind-merge, lucide-react
- No Hyena-internal imports — completely self-contained
- TypeScript types inline
- All values reference CSS variables, not hardcoded

---

## Design Polish Standards (Jakub Krehel)

Built into every component. Cross-referenced to specific implementations.

1. **Text wrapping:** `text-wrap: balance` on headings. *Applies to: Card titles, Modal titles, Alert titles, Navbar brand.*
2. **Concentric border radius:** `calc(var(--parent-radius) - var(--parent-padding))`. *Applies to: Card children, Table inside Card, Button inside Card.*
3. **Crispy text:** `-webkit-font-smoothing: antialiased` on body. *Global.*
4. **Tabular numbers:** `font-variant-numeric: tabular-nums`. *Applies to: Badge counts, Table numeric columns, any numeric display.*
5. **Shadows over borders:** Triple-layer box-shadow on elevated elements. *Applies to: Card elevated, Select dropdown, Modal, Tooltip.*
6. **Staggered entry:** Siblings enter with opacity + translateY + blur, 40ms stagger. *Applies to: Card lists, Table rows, Select options, component preview sections.*
7. **Subtle exits:** Exit < entry animation. *Applies to: Modal, Alert dismiss, Select close, Tooltip hide.*
8. **Optical alignment:** Icon-side padding reduced 2px. *Applies to: Button with icon, Navbar links with icon.*
9. **Interruptible animations:** CSS transitions for all state changes. Keyframes only for staged sequences. *All components.*
10. **Image outlines:** `outline: 1px solid rgba(0,0,0,0.1); outline-offset: -1px`. *Applies to: any media/image if used.*

---

## Coding Standards

### General
- TypeScript strict. No `any`. No `as` unless necessary with comment.
- All components `"use client"`.
- Functional + hooks only.
- Named exports. Default only for pages.
- Props interfaces exported alongside components.

### Styling
- Tailwind CSS 4 for layout (flex, grid, positioning).
- CSS custom properties for ALL design values.
- **Zero hardcoded values in components.** No hex, no px sizes, no shadow strings.
- Exception: structural CSS (position, overflow, display) uses Tailwind directly.
- `cn()` for conditional classes.

### File Pattern
```typescript
"use client"
import { cn } from '@/lib/cn'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined' | 'ghost' | 'destructive' | 'soft'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ variant = 'filled', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button className={cn('...base...', variant === 'filled' && '...', className)} {...props}>
      {children}
    </button>
  )
}
```

### Accessibility
- Keyboard navigable everywhere.
- `alt` or `aria-label` on all images/icons.
- `focus-visible:` only, never `focus:`.
- Color never sole indicator — pair with shape/icon/text.
- 44×44px minimum touch target.

---

## User Flow (MVP)

1. **Land** → Full component library with premium defaults. No signup. Immediately impressive.
2. **Browse** → Click components. All variants, sizes, states. Interactive — buttons click, toggles toggle, modals open.
3. **Customise** → Sidebar: color pickers, radius presets, spacing, density, font. All cascades in real-time.
4. **Get Guided** → Rules panel: violations with severity, message, why, one-click fix.
5. **Export** → Component code viewer + copy. Token export (CSS/Tailwind/JSON). Full library zip.

---

## Build Order

Each step complete and verified before the next.

### Step 0: Foundation
- Verify `npm run dev` works clean
- `npm install clsx tailwind-merge lucide-react`
- Download DM Sans (400, 500, 600) + DM Mono (400, 500) → `public/fonts/`
- Configure `@font-face` in `globals.css` with `font-display: swap`
- **Verify fonts render in browser — do not proceed until they work**
- Create `src/lib/cn.ts`
- Add `"type-check": "tsc --noEmit"` to package.json
- `npm run build` passes zero errors

### Step 1: Token System
- `src/tokens/types.ts` — all interfaces
- `src/tokens/defaults.ts` — all default values from this spec
- `src/lib/color.ts` — contrast ratio, palette gen, hue extraction
- `src/lib/math.ts` — spacing scale gen
- `src/tokens/generator.ts` — 5 user inputs → complete TokenSet
- `src/tokens/css.ts` — TokenSet → CSS properties string
- `src/tokens/provider.tsx` — context + useTokens()
- **Verify:** test page with all CSS vars rendered. Inspect and confirm values.

### Step 2: Rules Engine
- `src/rules/types.ts` — Rule, RuleResult, RuleReport
- `src/rules/color-rules.ts` — 11 rules
- `src/rules/shape-rules.ts` — 2 rules
- `src/rules/typography-rules.ts` — 4 rules
- `src/rules/spacing-rules.ts` — 1 rule
- `src/rules/motion-rules.ts` — 1 rule
- `src/rules/engine.ts` — evaluate()
- `src/hooks/useRules.ts`
- **Verify:** test page with broken tokens → correct violations returned.

### Step 3: Primitives (7)
1. Button → variant/size/state template
2. Input → form pattern, height alignment
3. Badge → semantic colors
4. Toggle → animation patterns
5. Select → dropdown/popover
6. Tooltip → positioning, delay
7. Divider → simplest, validates token-only styling
- **Verify:** all on one page, all variants, token cascade works.

### Step 4: Composites (6)
1. Card → container, concentric radius
2. Alert → semantic type + icon + dismiss
3. Skeleton → loading pattern
4. Modal → overlay, focus trap, enter/exit
5. Navbar → layout, glass variant
6. Table → density system
- **Verify:** Card+Button concentric. Modal focus trap. Table density response.

### Step 5: Editor UI
1. AppShell layout
2. Editor chrome theme (fixed `.hyena-chrome` vars)
3. ColorEditor, RadiusEditor, SpacingEditor, DensityEditor, TypographyEditor
4. ComponentPreview (all 13 components)
5. RulesPanel + RuleCard
6. CodeExport + TokenExport

### Step 6: Export System
1. Component code string generators (per component)
2. Token export generators (CSS, Tailwind, JSON)
3. README.md generator
4. "Export All" zip (client-side)
- **Verify:** export Button + tokens → fresh Next.js project → works with zero changes.

### Step 7: Polish & Ship
1. Staggered entry animations on preview
2. localStorage persistence for tokens
3. Test all 19 rules with edge cases
4. Lighthouse audit
5. Deploy to Vercel
6. DNS: hyena.studio
7. Meta description + OG image

---

## Commands

```bash
npm run dev          # Dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # TypeScript (tsc --noEmit)
```
