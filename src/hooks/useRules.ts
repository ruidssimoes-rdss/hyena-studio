"use client"

import { useMemo } from "react"
import { evaluate } from "@/rules/engine"
import type { RuleReport } from "@/rules/types"
import { useTokens } from "@/tokens/provider"

/** Run the rules engine against current tokens and return the report. */
export function useRules(): RuleReport {
  const { tokens } = useTokens()
  return useMemo(() => evaluate(tokens), [tokens])
}
