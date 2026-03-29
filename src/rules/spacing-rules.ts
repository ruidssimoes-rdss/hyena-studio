import type { Rule } from "./types"

export const spacingRules: Rule[] = [
  {
    id: "spacing-base-range",
    name: "Base unit range",
    scope: "spacing",
    severity: "warning",
    condition: (tokens) => {
      const base = tokens.spacing.base
      return base < 2 || base > 8
    },
    message: "Spacing base is outside practical range (2–8).",
    why: "Below 2 elements merge. Above 8 everything is sparse.",
  },
]
