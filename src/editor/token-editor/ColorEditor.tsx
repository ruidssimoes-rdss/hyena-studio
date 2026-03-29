"use client"

import { useCallback, useRef } from "react"
import { useTokens } from "@/tokens/provider"
import type { UserColorInputs } from "@/tokens/types"

const QUICK_PRESETS: Array<{ label: string; value: string }> = [
  { label: "Blue", value: "#2563EB" },
  { label: "Purple", value: "#7C3AED" },
  { label: "Green", value: "#059669" },
  { label: "Orange", value: "#EA580C" },
  { label: "Pink", value: "#DB2777" },
  { label: "Slate", value: "#475569" },
]

const COLOR_FIELDS: Array<{ key: keyof UserColorInputs; label: string }> = [
  { key: "primary", label: "Primary" },
  { key: "error", label: "Error" },
  { key: "warning", label: "Warning" },
  { key: "success", label: "Success" },
  { key: "surface", label: "Surface" },
]

function ColorRow({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  const pickerRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex items-center h-8 gap-2">
      {/* Clickable swatch */}
      <button
        onClick={() => pickerRef.current?.click()}
        className="size-6 rounded-full shrink-0 outline outline-1 outline-[var(--chrome-border)] -outline-offset-1 hover:scale-110 transition-transform duration-150"
        style={{ backgroundColor: value }}
        aria-label={`Pick ${label} color`}
      >
        <input
          ref={pickerRef}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
          tabIndex={-1}
        />
      </button>

      {/* Label */}
      <span className="text-sm text-[var(--chrome-text)] flex-1">
        {label}
      </span>

      {/* Hex input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={`${label} hex value`}
        className="w-[64px] h-6 px-1.5 rounded-[var(--chrome-radius)] bg-[var(--chrome-muted)] border border-[var(--chrome-border)] text-xs font-mono text-[var(--chrome-text-secondary)] text-right focus:border-[var(--chrome-border-hover)] focus:text-[var(--chrome-text)] focus:outline-none transition-all duration-150"
      />
    </div>
  )
}

export function ColorEditor() {
  const { userColors, setColors } = useTokens()

  const updateColor = useCallback(
    (key: keyof UserColorInputs, value: string) => {
      setColors({ ...userColors, [key]: value })
    },
    [userColors, setColors]
  )

  return (
    <div className="space-y-3">
      {/* Quick presets — 6 dots */}
      <div className="flex items-center gap-1">
        {QUICK_PRESETS.map((p) => (
          <button
            key={p.value}
            onClick={() => updateColor("primary", p.value)}
            className="size-[18px] rounded-full shrink-0 transition-transform duration-150 hover:scale-110"
            style={{
              backgroundColor: p.value,
              outline:
                userColors.primary === p.value
                  ? `2px solid var(--chrome-accent)`
                  : undefined,
              outlineOffset:
                userColors.primary === p.value ? "2px" : undefined,
            }}
            title={p.label}
          />
        ))}
      </div>

      {/* Color fields */}
      <div className="space-y-0.5">
        {COLOR_FIELDS.map((field) => (
          <ColorRow
            key={field.key}
            label={field.label}
            value={userColors[field.key]}
            onChange={(v) => updateColor(field.key, v)}
          />
        ))}
      </div>
    </div>
  )
}
