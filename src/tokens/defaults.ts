import type {
  ColorTokens,
  DensityLevel,
  ElevationTokens,
  MotionTokens,
  RadiusPreset,
  RadiusTokens,
  SpacingTokens,
  TokenSet,
  TypographyTokens,
  UserColorInputs,
} from "./types"

// -- Default user color inputs ---------------------------------------

export const DEFAULT_USER_COLORS: UserColorInputs = {
  primary: "#2563EB",
  error: "#DC2626",
  warning: "#F59E0B",
  success: "#16A34A",
  surface: "#FFFFFF",
}

// -- Radius presets --------------------------------------------------

export const RADIUS_PRESETS: Record<RadiusPreset, RadiusTokens> = {
  sharp: {
    none: 0,
    xs: 2,
    sm: 3,
    md: 4,
    lg: 6,
    xl: 8,
    "2xl": 10,
    full: 9999,
  },
  soft: {
    none: 0,
    xs: 4,
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    "2xl": 20,
    full: 9999,
  },
  round: {
    none: 0,
    xs: 6,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    "2xl": 28,
    full: 9999,
  },
}

// -- Default spacing -------------------------------------------------

export const DEFAULT_SPACING: SpacingTokens = {
  base: 4,
}

// -- Default typography ----------------------------------------------

export const DEFAULT_TYPOGRAPHY: TypographyTokens = {
  font: {
    sans: '"DM Sans", system-ui, sans-serif',
    mono: '"DM Mono", ui-monospace, monospace',
  },
  scale: {
    display: { size: 36, lineHeight: 1.15, weight: 600, tracking: -0.025 },
    "heading-lg": { size: 28, lineHeight: 1.2, weight: 600, tracking: -0.02 },
    "heading-md": {
      size: 22,
      lineHeight: 1.25,
      weight: 600,
      tracking: -0.015,
    },
    "heading-sm": { size: 18, lineHeight: 1.3, weight: 600, tracking: -0.01 },
    "body-lg": { size: 16, lineHeight: 1.55, weight: 400, tracking: -0.005 },
    "body-md": { size: 14, lineHeight: 1.5, weight: 400, tracking: 0 },
    "body-sm": { size: 12, lineHeight: 1.5, weight: 400, tracking: 0.005 },
    "label-lg": { size: 14, lineHeight: 1.3, weight: 500, tracking: 0 },
    "label-md": { size: 12, lineHeight: 1.3, weight: 500, tracking: 0.01 },
    "label-sm": { size: 11, lineHeight: 1.3, weight: 500, tracking: 0.015 },
  },
}

// -- Default density -------------------------------------------------

export const DEFAULT_DENSITY: DensityLevel = "comfortable"

// -- Elevation tokens (NOT user-editable) ----------------------------

export const DEFAULT_ELEVATION: ElevationTokens = {
  0: "none",
  1: "0 0 0 1px rgba(0,0,0,0.04), 0 1px 2px -1px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.03)",
  2: "0 0 0 1px rgba(0,0,0,0.06), 0 2px 4px -1px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.05)",
  3: "0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
}

// -- Motion tokens (NOT user-editable) -------------------------------

export const DEFAULT_MOTION: MotionTokens = {
  duration: {
    instant: 80,
    fast: 150,
    normal: 250,
    slow: 350,
  },
  easing: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    enter: "cubic-bezier(0, 0, 0.2, 1)",
    exit: "cubic-bezier(0.4, 0, 1, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
}

// -- Full default color tokens (pre-generated for reference) ---------

export const DEFAULT_COLORS: ColorTokens = {
  primary: "#2563EB",
  "primary-hover": "#4a7eee",
  "primary-active": "#5d8bf0",
  "primary-soft": "#eef3fd",
  "on-primary": "#FFFFFF",

  error: "#DC2626",
  "error-soft": "#fceeee",
  "on-error": "#FFFFFF",
  warning: "#F59E0B",
  "warning-soft": "#fef7eb",
  "on-warning": "#000000",
  success: "#16A34A",
  "success-soft": "#ecf8f1",
  "on-success": "#000000",

  surface: "#FFFFFF",
  "surface-container": "#fafafa",
  "surface-container-high": "#f5f5f5",

  "on-surface": "#111111",
  "on-surface-muted": "#6B6B76",
  "on-surface-subtle": "#9D9DAA",
  "on-surface-faint": "#CCCCD4",

  outline: "#E4E4E7",
  "outline-variant": "#F0F0F3",
  "outline-hover": "#D4D4D8",

  "focus-ring": "rgba(37, 99, 235, 0.25)",
  scrim: "rgba(0, 0, 0, 0.5)",
}
