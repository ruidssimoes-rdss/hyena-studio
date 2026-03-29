import type { TypeScaleLevel } from "@/tokens/types"
import type { Rule } from "./types"

/** Ordered from largest to smallest */
const SCALE_ORDER: TypeScaleLevel[] = [
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

export const typographyRules: Rule[] = [
  {
    id: "type-scale-gap",
    name: "Scale gap",
    scope: "typography",
    severity: "warning",
    condition: (tokens) => {
      for (let i = 0; i < SCALE_ORDER.length - 1; i++) {
        const current = tokens.typography.scale[SCALE_ORDER[i]].size
        const next = tokens.typography.scale[SCALE_ORDER[i + 1]].size
        if (Math.abs(current - next) < 2) return true
      }
      return false
    },
    message: "Adjacent type scale levels differ by less than 2px.",
    why: "If two sizes look identical, hierarchy breaks.",
  },
  {
    id: "type-min-size",
    name: "Min font size",
    scope: "typography",
    severity: "error",
    condition: (tokens) => tokens.typography.scale["label-sm"].size < 11,
    message: "Smallest font size is below 11px minimum for interactive text.",
    why: "Below 11px is unreadable on most screens.",
  },
  {
    id: "type-lh-display",
    name: "Display line-height",
    scope: "typography",
    severity: "warning",
    condition: (tokens) => {
      const lh = tokens.typography.scale.display.lineHeight
      return lh < 1.0 || lh > 1.3
    },
    message: "Display line height outside 1.0–1.3 range.",
    why: "Large text needs tight leading to feel cohesive.",
  },
  {
    id: "type-lh-body",
    name: "Body line-height",
    scope: "typography",
    severity: "warning",
    condition: (tokens) => {
      const lh = tokens.typography.scale["body-md"].lineHeight
      return lh < 1.35 || lh > 1.7
    },
    message: "Body line height outside 1.35–1.7 range.",
    why: "Reading comfort depends on line height.",
  },
]
