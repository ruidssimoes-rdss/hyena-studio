import type { Rule } from "./types"

const RADIUS_SCALE_KEYS = ["xs", "sm", "md", "lg", "xl", "2xl"] as const

export const shapeRules: Rule[] = [
  {
    id: "shape-radius-scale",
    name: "Scale order",
    scope: "shape",
    severity: "warning",
    condition: (tokens) => {
      for (let i = 0; i < RADIUS_SCALE_KEYS.length - 1; i++) {
        const current =
          tokens.radius[RADIUS_SCALE_KEYS[i]]
        const next =
          tokens.radius[RADIUS_SCALE_KEYS[i + 1]]
        if (current >= next) return true
      }
      return false
    },
    message: "Radius scale isn't increasing. Larger tokens need larger radii.",
    why: "Consistent scale creates visual hierarchy.",
  },
  {
    id: "shape-radius-max",
    name: "Reasonable max",
    scope: "shape",
    severity: "info",
    condition: (tokens) => {
      return RADIUS_SCALE_KEYS.some((key) => tokens.radius[key] > 28)
    },
    message: "Radii above 28px can look distorted on small elements.",
    why: "Extreme radii work for pills but break other shapes.",
  },
]
