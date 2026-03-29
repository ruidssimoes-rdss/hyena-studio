"use client"

import { useTokens } from "@/tokens/provider"
import type { DensityLevel } from "@/tokens/types"

const DENSITIES: Array<{
  value: DensityLevel
  label: string
  gaps: number[]
}> = [
  { value: "compact", label: "Compact", gaps: [2, 2, 2] },
  { value: "comfortable", label: "Comfort", gaps: [3, 3, 3] },
  { value: "spacious", label: "Spacious", gaps: [5, 5, 5] },
]

export function DensityEditor() {
  const { density, setDensity } = useTokens()

  return (
    <div className="grid grid-cols-3 gap-1">
      {DENSITIES.map((d) => (
        <button
          key={d.value}
          onClick={() => setDensity(d.value)}
          className={`flex flex-col items-center gap-1.5 py-2.5 rounded-[var(--chrome-radius)] border transition-all duration-150 ${
            density === d.value
              ? "border-[var(--chrome-accent)] bg-[var(--chrome-accent-soft)]"
              : "border-[var(--chrome-border)] hover:border-[var(--chrome-border-hover)]"
          }`}
        >
          {/* Visual: 3 bars with different gaps */}
          <div
            className="flex flex-col items-center"
            style={{ gap: `${d.gaps[0]}px` }}
          >
            <div className="w-5 h-[3px] rounded-full bg-[var(--chrome-text)]" />
            <div className="w-4 h-[3px] rounded-full bg-[var(--chrome-text-secondary)]" />
            <div className="w-3 h-[3px] rounded-full bg-[var(--chrome-text-tertiary)]" />
          </div>
          <span className="text-xs font-medium text-[var(--chrome-text-secondary)]">
            {d.label}
          </span>
        </button>
      ))}
    </div>
  )
}
