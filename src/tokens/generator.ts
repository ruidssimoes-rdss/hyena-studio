import {
  adjustLightness,
  compositeOnSurface,
  contrastingTextColor,
  darkenSurface,
  generateNeutralText,
  generateOutlines,
  hexWithOpacity,
} from "@/lib/color"
import {
  DEFAULT_DENSITY,
  DEFAULT_ELEVATION,
  DEFAULT_MOTION,
  DEFAULT_SPACING,
  DEFAULT_TYPOGRAPHY,
  RADIUS_PRESETS,
} from "./defaults"
import type {
  ColorTokens,
  DensityLevel,
  RadiusPreset,
  SpacingTokens,
  TokenSet,
  TypographyTokens,
  UserColorInputs,
} from "./types"

// ------------------------------------------------------------------ //
// Generate derived color tokens from 5 user inputs                   //
// ------------------------------------------------------------------ //

function generateColorTokens(input: UserColorInputs): ColorTokens {
  const { primary, error, warning, success, surface } = input

  // Primary variants
  const primaryHover = adjustLightness(primary, 8)
  const primaryActive = adjustLightness(primary, 12)
  const primarySoft = compositeOnSurface(primary, surface, 0.08)
  const onPrimary = contrastingTextColor(primary)

  // Semantic variants
  const errorSoft = compositeOnSurface(error, surface, 0.08)
  const onError = contrastingTextColor(error)
  const warningSoft = compositeOnSurface(warning, surface, 0.08)
  const onWarning = contrastingTextColor(warning)
  const successSoft = compositeOnSurface(success, surface, 0.08)
  const onSuccess = contrastingTextColor(success)

  // Surface containers
  const surfaceContainer = darkenSurface(surface, 2)
  const surfaceContainerHigh = darkenSurface(surface, 4)

  // Neutral text
  const [onSurface, onSurfaceMuted, onSurfaceSubtle, onSurfaceFaint] =
    generateNeutralText(surface)

  // Borders
  const [outline, outlineVariant, outlineHover] = generateOutlines(surface)

  // Utility
  const focusRing = hexWithOpacity(primary, 0.25)

  return {
    primary,
    "primary-hover": primaryHover,
    "primary-active": primaryActive,
    "primary-soft": primarySoft,
    "on-primary": onPrimary,

    error,
    "error-soft": errorSoft,
    "on-error": onError,
    warning,
    "warning-soft": warningSoft,
    "on-warning": onWarning,
    success,
    "success-soft": successSoft,
    "on-success": onSuccess,

    surface,
    "surface-container": surfaceContainer,
    "surface-container-high": surfaceContainerHigh,

    "on-surface": onSurface,
    "on-surface-muted": onSurfaceMuted,
    "on-surface-subtle": onSurfaceSubtle,
    "on-surface-faint": onSurfaceFaint,

    outline,
    "outline-variant": outlineVariant,
    "outline-hover": outlineHover,

    "focus-ring": focusRing,
    scrim: "rgba(0, 0, 0, 0.5)",
  }
}

// ------------------------------------------------------------------ //
// Public API: generate a full TokenSet from user inputs               //
// ------------------------------------------------------------------ //

export interface GeneratorInputs {
  colors: UserColorInputs
  radiusPreset: RadiusPreset
  spacing: SpacingTokens
  typography: TypographyTokens
  density: DensityLevel
}

export function generateTokenSet(inputs: GeneratorInputs): TokenSet {
  return {
    color: generateColorTokens(inputs.colors),
    radius: { ...RADIUS_PRESETS[inputs.radiusPreset] },
    spacing: { ...inputs.spacing },
    typography: inputs.typography,
    density: inputs.density,
    elevation: { ...DEFAULT_ELEVATION },
    motion: { ...DEFAULT_MOTION },
  }
}

/** Generate a TokenSet from all defaults */
export function generateDefaultTokenSet(): TokenSet {
  return generateTokenSet({
    colors: {
      primary: "#2563EB",
      error: "#DC2626",
      warning: "#F59E0B",
      success: "#16A34A",
      surface: "#FFFFFF",
    },
    radiusPreset: "soft",
    spacing: DEFAULT_SPACING,
    typography: DEFAULT_TYPOGRAPHY,
    density: DEFAULT_DENSITY,
  })
}
