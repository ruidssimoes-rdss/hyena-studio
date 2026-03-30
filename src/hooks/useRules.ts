"use client"

import { useRuleReport } from "@/store/token-store"
import type { RuleReport } from "@/rules/types"

/** Rule report from the Zustand token store — auto-updates on token changes. */
export function useRules(): RuleReport {
  return useRuleReport()
}
