export interface ColorTokens {
  // Brand
  primary: string
  "primary-hover": string
  "primary-active": string
  "primary-soft": string
  "on-primary": string

  // Semantic
  error: string
  "error-soft": string
  "on-error": string
  warning: string
  "warning-soft": string
  "on-warning": string
  success: string
  "success-soft": string
  "on-success": string

  // Neutral surfaces
  surface: string
  "surface-container": string
  "surface-container-high": string

  // Neutral text
  "on-surface": string
  "on-surface-muted": string
  "on-surface-subtle": string
  "on-surface-faint": string

  // Borders
  outline: string
  "outline-variant": string
  "outline-hover": string

  // Utility
  "focus-ring": string
  scrim: string
}

export interface RadiusTokens {
  none: number
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  "2xl": number
  full: number
}

export interface SpacingTokens {
  base: number
}

export type TypeScaleLevel =
  | "display"
  | "heading-lg"
  | "heading-md"
  | "heading-sm"
  | "body-lg"
  | "body-md"
  | "body-sm"
  | "label-lg"
  | "label-md"
  | "label-sm"

export interface TypeStyle {
  size: number
  lineHeight: number
  weight: number
  tracking: number
}

export interface TypographyTokens {
  font: {
    sans: string
    mono: string
  }
  scale: Record<TypeScaleLevel, TypeStyle>
}

export type DensityLevel = "compact" | "comfortable" | "spacious"

export interface ElevationTokens {
  0: string
  1: string
  2: string
  3: string
}

export interface MotionTokens {
  duration: {
    instant: number
    fast: number
    normal: number
    slow: number
  }
  easing: {
    standard: string
    enter: string
    exit: string
    spring: string
  }
}

export interface TokenSet {
  color: ColorTokens
  radius: RadiusTokens
  spacing: SpacingTokens
  typography: TypographyTokens
  density: DensityLevel
  elevation: ElevationTokens
  motion: MotionTokens
}

/** The 5 user-controlled color inputs */
export interface UserColorInputs {
  primary: string
  error: string
  warning: string
  success: string
  surface: string
}

export type RadiusPreset = "sharp" | "soft" | "round"
