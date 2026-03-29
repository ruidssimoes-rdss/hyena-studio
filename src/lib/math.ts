// ------------------------------------------------------------------ //
// Math utilities: spacing scale, concentric radius                   //
// ------------------------------------------------------------------ //

/** Spacing scale multipliers: base * [1,2,3,4,5,6,8,10,12,16] */
const SPACING_MULTIPLIERS = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16] as const

/** Generate a 10-step spacing scale from a base unit */
export function generateSpacingScale(base: number): number[] {
  return SPACING_MULTIPLIERS.map((m) => base * m)
}

/**
 * Calculate concentric inner radius.
 * inner = max(0, outerRadius - padding)
 */
export function concentricRadius(
  outerRadius: number,
  padding: number
): number {
  return Math.max(0, outerRadius - padding)
}
