import { generateSpacingScale } from "@/lib/math"
import type { TokenSet, TypeScaleLevel } from "./types"

// ------------------------------------------------------------------ //
// TokenSet → CSS custom properties string                            //
// ------------------------------------------------------------------ //

export function tokensToCssVars(tokens: TokenSet): Record<string, string> {
  const vars: Record<string, string> = {}

  // -- Color tokens --
  for (const [key, value] of Object.entries(tokens.color)) {
    vars[`--color-${key}`] = value
  }

  // -- Radius tokens --
  for (const [key, value] of Object.entries(tokens.radius)) {
    vars[`--radius-${key}`] = value === 9999 ? "9999px" : `${value}px`
  }

  // -- Spacing scale --
  const scale = generateSpacingScale(tokens.spacing.base)
  vars["--spacing-base"] = `${tokens.spacing.base}px`
  scale.forEach((value, index) => {
    vars[`--spacing-${index}`] = `${value}px`
  })

  // -- Typography --
  vars["--font-sans"] = tokens.typography.font.sans
  vars["--font-mono"] = tokens.typography.font.mono

  const scaleKeys: TypeScaleLevel[] = [
    "display",
    "heading-lg",
    "heading-md",
    "heading-sm",
    "body-lg",
    "body-md",
    "body-sm",
    "label-lg",
    "label-md",
    "label-sm",
  ]

  for (const level of scaleKeys) {
    const style = tokens.typography.scale[level]
    vars[`--type-${level}-size`] = `${style.size}px`
    vars[`--type-${level}-line-height`] = `${style.lineHeight}`
    vars[`--type-${level}-weight`] = `${style.weight}`
    vars[`--type-${level}-tracking`] = `${style.tracking}em`
  }

  // -- Density --
  vars["--density"] = tokens.density
  const densityPadding: Record<string, string> = {
    compact: "12px",
    comfortable: "16px",
    spacious: "24px",
  }
  vars["--density-padding"] = densityPadding[tokens.density]

  // -- Elevation --
  for (const [key, value] of Object.entries(tokens.elevation)) {
    vars[`--elevation-${key}`] = value
  }

  // -- Motion --
  vars["--duration-instant"] = `${tokens.motion.duration.instant}ms`
  vars["--duration-fast"] = `${tokens.motion.duration.fast}ms`
  vars["--duration-normal"] = `${tokens.motion.duration.normal}ms`
  vars["--duration-slow"] = `${tokens.motion.duration.slow}ms`
  vars["--easing-standard"] = tokens.motion.easing.standard
  vars["--easing-enter"] = tokens.motion.easing.enter
  vars["--easing-exit"] = tokens.motion.easing.exit
  vars["--easing-spring"] = tokens.motion.easing.spring

  return vars
}

/** Convert CSS vars record to inline style string */
export function cssVarsToStyleString(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([key, value]) => `${key}: ${value}`)
    .join("; ")
}

/** Convert CSS vars record to a React style object */
export function cssVarsToStyleObject(
  vars: Record<string, string>
): React.CSSProperties {
  const style: Record<string, string> = {}
  for (const [key, value] of Object.entries(vars)) {
    style[key] = value
  }
  return style as React.CSSProperties
}
