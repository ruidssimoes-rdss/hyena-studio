import type { TokenSet } from "@/tokens/types"

export type RuleScope = "color" | "shape" | "spacing" | "typography" | "motion"
export type RuleSeverity = "error" | "warning" | "info"

export interface Rule {
  id: string
  name: string
  scope: RuleScope
  severity: RuleSeverity
  /** Returns true when the rule is VIOLATED */
  condition: (tokens: TokenSet) => boolean
  message: string
  why: string
  fix?: (tokens: TokenSet) => Partial<TokenSet>
}

export interface RuleResult {
  rule: Rule
  violated: boolean
}

export interface RuleReport {
  errors: RuleResult[]
  warnings: RuleResult[]
  info: RuleResult[]
  passed: number
  total: number
}
