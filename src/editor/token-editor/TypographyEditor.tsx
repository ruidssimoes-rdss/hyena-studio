"use client"

import { useTokens } from "@/tokens/provider"
import type { TypeScaleLevel } from "@/tokens/types"

const SCALE_LEVELS: TypeScaleLevel[] = [
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

export function TypographyEditor() {
  const { tokens } = useTokens()

  return (
    <div className="space-y-3">
      {/* Font families */}
      <div>
        <p className="text-[13px] font-medium text-[var(--chrome-text)]">
          DM Sans
        </p>
        <p className="text-[13px] font-mono text-[var(--chrome-text-tertiary)]">
          DM Mono
        </p>
      </div>

      {/* Type scale reference */}
      <div className="space-y-0">
        {SCALE_LEVELS.map((level) => {
          const style = tokens.typography.scale[level]
          return (
            <div
              key={level}
              className="flex items-baseline h-[22px] gap-2"
            >
              <span className="text-[10px] font-mono text-[var(--chrome-text-tertiary)] w-[70px] shrink-0 truncate">
                {level}
              </span>
              <span
                className="text-[var(--chrome-text)] truncate"
                style={{
                  fontSize: `${Math.min(style.size, 16)}px`,
                  fontWeight: style.weight,
                }}
              >
                Aa
              </span>
              <span className="text-[10px] font-mono text-[var(--chrome-text-faint)] shrink-0 ml-auto tabular-nums">
                {style.size}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
