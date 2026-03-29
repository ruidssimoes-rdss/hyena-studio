import { contrastRatio, deltaE, hue } from "@/lib/color"
import type { Rule } from "./types"

export const colorRules: Rule[] = [
  {
    id: "color-contrast-primary",
    name: "Primary contrast",
    scope: "color",
    severity: "error",
    condition: (tokens) =>
      contrastRatio(tokens.color["on-primary"], tokens.color.primary) < 4.5,
    message: "Text on primary background fails WCAG AA (4.5:1).",
    why: "Low contrast makes text unreadable for users with low vision.",
  },
  {
    id: "color-contrast-error",
    name: "Error contrast",
    scope: "color",
    severity: "error",
    condition: (tokens) =>
      contrastRatio(tokens.color["on-error"], tokens.color.error) < 4.5,
    message: "Text on error background fails WCAG AA.",
    why: "Low contrast makes text unreadable for users with low vision.",
  },
  {
    id: "color-contrast-warning",
    name: "Warning contrast",
    scope: "color",
    severity: "error",
    condition: (tokens) =>
      contrastRatio(tokens.color["on-warning"], tokens.color.warning) < 4.5,
    message: "Text on warning background fails WCAG AA.",
    why: "Low contrast makes text unreadable for users with low vision.",
  },
  {
    id: "color-contrast-success",
    name: "Success contrast",
    scope: "color",
    severity: "error",
    condition: (tokens) =>
      contrastRatio(tokens.color["on-success"], tokens.color.success) < 4.5,
    message: "Text on success background fails WCAG AA.",
    why: "Low contrast makes text unreadable for users with low vision.",
  },
  {
    id: "color-contrast-surface",
    name: "Surface contrast",
    scope: "color",
    severity: "error",
    condition: (tokens) =>
      contrastRatio(tokens.color["on-surface"], tokens.color.surface) < 4.5,
    message: "Body text on surface fails WCAG AA.",
    why: "Low contrast makes text unreadable for users with low vision.",
  },
  {
    id: "color-contrast-muted",
    name: "Muted text",
    scope: "color",
    severity: "warning",
    condition: (tokens) =>
      contrastRatio(tokens.color["on-surface-muted"], tokens.color.surface) < 3,
    message: "Secondary text contrast is below 3:1.",
    why: "Muted text should be de-emphasized, not invisible.",
  },
  {
    id: "color-error-hue",
    name: "Error hue",
    scope: "color",
    severity: "warning",
    condition: (tokens) => {
      const h = hue(tokens.color.error)
      // Red/orange: 0–30° or 340–360°
      return !(h <= 30 || h >= 340)
    },
    message: "Error color isn't red/orange. Users expect red = danger.",
    why: "Color semantics are cultural conventions.",
  },
  {
    id: "color-warning-hue",
    name: "Warning hue",
    scope: "color",
    severity: "warning",
    condition: (tokens) => {
      const h = hue(tokens.color.warning)
      return !(h >= 30 && h <= 60)
    },
    message: "Warning color isn't yellow/amber.",
    why: "Color semantics are cultural conventions.",
  },
  {
    id: "color-success-hue",
    name: "Success hue",
    scope: "color",
    severity: "warning",
    condition: (tokens) => {
      const h = hue(tokens.color.success)
      return !(h >= 90 && h <= 160)
    },
    message: "Success color isn't green.",
    why: "Color semantics are cultural conventions.",
  },
  {
    id: "color-primary-error-distinct",
    name: "Primary ≠ Error",
    scope: "color",
    severity: "warning",
    condition: (tokens) =>
      deltaE(tokens.color.primary, tokens.color.error) < 30,
    message:
      "Primary and error are too similar. Users may confuse actions with dangers.",
    why: "Distinct semantic colors prevent misclicks.",
  },
  {
    id: "color-primary-soft-contrast",
    name: "Soft readable",
    scope: "color",
    severity: "warning",
    condition: (tokens) =>
      contrastRatio(tokens.color["on-surface"], tokens.color["primary-soft"]) <
      4.5,
    message: "Text on soft primary is hard to read.",
    why: "Soft backgrounds are used in chips and badges — text must stay legible.",
  },
]
