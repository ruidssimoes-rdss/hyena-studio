"use client"

import type { RuleResult } from "@/rules/types"
import { useTokenStore } from "@/store/token-store"

const SEVERITY_COLORS = {
  error: "var(--chrome-error)",
  warning: "var(--chrome-warning)",
  info: "var(--chrome-info)",
}

interface RuleCardProps {
  result: RuleResult
}

export function RuleCard({ result }: RuleCardProps) {
  const { rule } = result
  const tokens = useTokenStore((s) => s.tokens)
  const setColors = useTokenStore((s) => s.setColors)
  const setSpacing = useTokenStore((s) => s.setSpacing)
  const barColor = SEVERITY_COLORS[rule.severity]

  const handleFix = () => {
    if (!rule.fix) return
    const patch = rule.fix(tokens)
    if (patch.color) {
      const colorPatch = patch.color as unknown as Record<string, string>
      const userColorKeys = ["primary", "error", "warning", "success", "surface"]
      const updates: Record<string, string> = {}
      for (const key of userColorKeys) {
        if (key in colorPatch) {
          updates[key] = colorPatch[key]
        }
      }
      if (Object.keys(updates).length > 0) {
        setColors({ ...tokens.color, ...updates } as Parameters<typeof setColors>[0])
      }
    }
    if (patch.spacing) {
      setSpacing(patch.spacing)
    }
  }

  return (
    <div className="flex rounded-[var(--chrome-radius)] overflow-hidden border border-[var(--chrome-border)]">
      {/* Left severity bar */}
      <div className="w-[3px] shrink-0" style={{ backgroundColor: barColor }} />

      <div className="flex-1 p-2.5 min-w-0">
        {/* Title + scope */}
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-medium text-[var(--chrome-text)] leading-snug">
            {rule.name}
          </p>
          <span className="text-[10px] font-mono text-[var(--chrome-text-tertiary)] uppercase shrink-0 mt-px">
            {rule.scope}
          </span>
        </div>

        {/* Message */}
        <p className="text-xs text-[var(--chrome-text-secondary)] mt-1 leading-relaxed">
          {rule.message}
        </p>

        {/* Why */}
        <p className="text-[11px] text-[var(--chrome-text-tertiary)] mt-1 leading-relaxed">
          {rule.why}
        </p>

        {/* Fix button */}
        {rule.fix && (
          <button
            onClick={handleFix}
            className="mt-2 text-[11px] font-medium text-[var(--chrome-text-secondary)] hover:text-[var(--chrome-text)] transition-colors duration-150"
          >
            Fix →
          </button>
        )}
      </div>
    </div>
  )
}
