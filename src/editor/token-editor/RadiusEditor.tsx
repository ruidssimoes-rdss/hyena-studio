"use client"

import { useTokenStore } from "@/store/token-store"
import type { RadiusPreset } from "@/tokens/types"

const PRESETS: Array<{ value: RadiusPreset; label: string; preview: number }> = [
  { value: "sharp", label: "Sharp", preview: 2 },
  { value: "soft", label: "Soft", preview: 8 },
  { value: "round", label: "Round", preview: 14 },
]

export function RadiusEditor() {
  const radiusPreset = useTokenStore((s) => s.radiusPreset)
  const setRadiusPreset = useTokenStore((s) => s.setRadiusPreset)

  return (
    <div className="grid grid-cols-3 gap-1">
      {PRESETS.map((p) => (
        <button
          key={p.value}
          onClick={() => setRadiusPreset(p.value)}
          className={`flex flex-col items-center gap-1.5 py-2.5 rounded-[var(--chrome-radius)] border transition-all duration-150 ${
            radiusPreset === p.value
              ? "border-[var(--chrome-accent)] bg-[var(--chrome-accent-soft)]"
              : "border-[var(--chrome-border)] hover:border-[var(--chrome-border-hover)]"
          }`}
        >
          <div
            className="w-7 h-5 border-2 border-[var(--chrome-text)]"
            style={{ borderRadius: `${p.preview}px` }}
          />
          <span className="text-xs font-medium text-[var(--chrome-text-secondary)]">
            {p.label}
          </span>
        </button>
      ))}
    </div>
  )
}
