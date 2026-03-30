"use client"

import { useCallback } from "react"
import { Minus, Plus } from "lucide-react"
import { useTokenStore } from "@/store/token-store"
import { generateSpacingScale } from "@/lib/math"

export function SpacingEditor() {
  const spacing = useTokenStore((s) => s.spacing)
  const setSpacing = useTokenStore((s) => s.setSpacing)
  const scale = generateSpacingScale(spacing.base)

  const increment = useCallback(() => {
    if (spacing.base < 8) setSpacing({ base: spacing.base + 1 })
  }, [spacing.base, setSpacing])

  const decrement = useCallback(() => {
    if (spacing.base > 2) setSpacing({ base: spacing.base - 1 })
  }, [spacing.base, setSpacing])

  return (
    <div className="space-y-3">
      {/* Base unit control */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-mono font-semibold text-[var(--chrome-text)] tabular-nums leading-none">
          {spacing.base}
        </span>
        <span className="text-xs text-[var(--chrome-text-tertiary)]">
          px base
        </span>
        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={decrement}
            disabled={spacing.base <= 2}
            className="size-6 flex items-center justify-center rounded-[var(--chrome-radius)] border border-[var(--chrome-border)] text-[var(--chrome-text-secondary)] hover:bg-[var(--chrome-accent-soft)] disabled:opacity-30 transition-all duration-150"
          >
            <Minus className="size-3" />
          </button>
          <button
            onClick={increment}
            disabled={spacing.base >= 8}
            className="size-6 flex items-center justify-center rounded-[var(--chrome-radius)] border border-[var(--chrome-border)] text-[var(--chrome-text-secondary)] hover:bg-[var(--chrome-accent-soft)] disabled:opacity-30 transition-all duration-150"
          >
            <Plus className="size-3" />
          </button>
        </div>
      </div>

      {/* Scale chips */}
      <div className="flex flex-wrap gap-1">
        {scale.map((value, i) => (
          <span
            key={i}
            className="px-1.5 py-0.5 rounded-md bg-[var(--chrome-muted)] text-[10px] font-mono text-[var(--chrome-text-secondary)] tabular-nums"
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  )
}
