import type { TokenSet } from "@/tokens/types"
import { colorRules } from "./color-rules"
import { motionRules } from "./motion-rules"
import { shapeRules } from "./shape-rules"
import { spacingRules } from "./spacing-rules"
import { typographyRules } from "./typography-rules"
import type { Rule, RuleReport, RuleResult } from "./types"

/** All rules, combined across scopes */
export const allRules: Rule[] = [
  ...colorRules,
  ...shapeRules,
  ...typographyRules,
  ...spacingRules,
  ...motionRules,
]

/** Evaluate all rules against a TokenSet. Returns a categorized report. */
export function evaluate(tokens: TokenSet): RuleReport {
  const results: RuleResult[] = allRules.map((rule) => ({
    rule,
    violated: rule.condition(tokens),
  }))

  const errors = results.filter(
    (r) => r.violated && r.rule.severity === "error"
  )
  const warnings = results.filter(
    (r) => r.violated && r.rule.severity === "warning"
  )
  const info = results.filter((r) => r.violated && r.rule.severity === "info")
  const passed = results.filter((r) => !r.violated).length

  return {
    errors,
    warnings,
    info,
    passed,
    total: results.length,
  }
}
