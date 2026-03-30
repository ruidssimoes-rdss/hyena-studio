"use client"

import { useState, useCallback, useRef } from "react"
import { useTokenStore } from "@/store/token-store"
import { TokenScope } from "@/editor/components/TokenScope"
import { Breadcrumb, LabelPill, PreviewSection } from "@/editor/components/PageShell"
import { useSetCAP } from "@/editor/shell/CAPContext"
import { useEffect } from "react"
import { RotateCcw } from "lucide-react"
import type { UserColorInputs } from "@/tokens/types"
import { DEFAULT_USER_COLORS } from "@/tokens/defaults"

// ── Quick presets ───────────────────────────────────────────────────── //

const QUICK_PRESETS = [
  { label: "Blue", value: "#2563EB" },
  { label: "Purple", value: "#7C3AED" },
  { label: "Green", value: "#059669" },
  { label: "Orange", value: "#EA580C" },
  { label: "Pink", value: "#DB2777" },
  { label: "Slate", value: "#475569" },
  { label: "Rose", value: "#E11D48" },
  { label: "Teal", value: "#0D9488" },
]

// ── Color swatch + picker ──────────────────────────────────────────── //

function ColorSwatch({
  label,
  value,
  onChange,
  description,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  description: string
}) {
  const pickerRef = useRef<HTMLInputElement>(null)
  return (
    <div
      className="flex items-center justify-between transition-colors duration-150 hover:bg-[rgba(0,0,0,0.02)]"
      style={{ height: "44px", padding: "0 16px", borderRadius: "8px" }}
    >
      <div className="flex items-center" style={{ gap: "12px" }}>
        <button
          onClick={() => pickerRef.current?.click()}
          className="shrink-0 transition-transform duration-150 hover:scale-110"
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "6px",
            background: value,
            border: "1px solid rgba(0,0,0,0.08)",
          }}
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
        <div>
          <div style={{ fontSize: "13px", fontWeight: 500, color: "#262626", lineHeight: "18px" }}>
            {label}
          </div>
          <div style={{ fontSize: "11px", fontWeight: 400, color: "#a1a1a1", lineHeight: "14px" }}>
            {description}
          </div>
        </div>
      </div>
      <input
        type="text"
        value={value.toUpperCase()}
        onChange={(e) => {
          const v = e.target.value
          if (/^#[0-9a-fA-F]{0,6}$/.test(v)) onChange(v)
        }}
        className="font-mono text-right"
        style={{
          width: "72px",
          height: "28px",
          padding: "0 8px",
          borderRadius: "6px",
          border: "1px solid #f0f0f0",
          fontSize: "11px",
          color: "#727272",
          background: "white",
          outline: "none",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)"
          e.currentTarget.style.color = "#262626"
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#f0f0f0"
          e.currentTarget.style.color = "#727272"
        }}
      />
    </div>
  )
}

// ── Derived palette row ────────────────────────────────────────────── //

function DerivedRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-center justify-between"
      style={{ height: "32px", padding: "0 16px" }}
    >
      <span style={{ fontSize: "12.3px", color: "#a1a1a1" }}>{label}</span>
      <div className="flex items-center" style={{ gap: "8px" }}>
        <span className="font-mono" style={{ fontSize: "11px", color: "#a1a1a1" }}>
          {value}
        </span>
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "4px",
            background: value,
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        />
      </div>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────── //

export function ColourPage() {
  const setCAP = useSetCAP()
  const userColors = useTokenStore((s) => s.userColors)
  const setColor = useTokenStore((s) => s.setColor)
  const setColors = useTokenStore((s) => s.setColors)
  const tokens = useTokenStore((s) => s.tokens)
  const ruleReport = useTokenStore((s) => s.ruleReport)

  // CAP content
  useEffect(() => {
    const colorErrors = ruleReport.errors.filter((r) => r.rule.scope === "color")
    const colorWarnings = ruleReport.warnings.filter((r) => r.rule.scope === "color")

    setCAP(
      <div style={{ padding: "14px 14px 0" }}>
        <div style={{ height: "14px" }} />
        {/* Rules status */}
        <div style={{ padding: "7px" }}>
          <div
            className="font-medium"
            style={{ fontSize: "12.3px", color: "#262626", height: "28px", padding: "5px 12px", display: "flex", alignItems: "center" }}
          >
            Rules
          </div>
          <div style={{ padding: "0 12px" }}>
            {colorErrors.length === 0 && colorWarnings.length === 0 ? (
              <div style={{ fontSize: "12.3px", color: "#a1a1a1", padding: "4px 0" }}>All colour rules pass</div>
            ) : (
              <div className="flex flex-col" style={{ gap: "4px" }}>
                {colorErrors.map((r) => (
                  <div key={r.rule.id} className="flex items-start" style={{ gap: "6px", fontSize: "12.3px", color: "#D5143E", padding: "2px 0" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "3px", background: "#D5143E", marginTop: "5px", flexShrink: 0 }} />
                    <span>{r.rule.message}</span>
                  </div>
                ))}
                {colorWarnings.map((r) => (
                  <div key={r.rule.id} className="flex items-start" style={{ gap: "6px", fontSize: "12.3px", color: "#F97316", padding: "2px 0" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "3px", background: "#F97316", marginTop: "5px", flexShrink: 0 }} />
                    <span>{r.rule.message}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
    return () => setCAP(null)
  }, [setCAP, ruleReport])

  const handleReset = useCallback(() => {
    setColors(DEFAULT_USER_COLORS)
  }, [setColors])

  return (
    <div className="flex flex-col h-full">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-white shrink-0 relative" style={{ paddingTop: "28px", paddingBottom: "28px" }}>
        <div className="flex items-center justify-between">
          <Breadcrumb section="Tokens" page="Colour" />
          <button
            onClick={handleReset}
            className="flex items-center transition-colors duration-150 hover:text-[#262626]"
            style={{ gap: "4px", fontSize: "12.3px", color: "#a1a1a1" }}
          >
            <RotateCcw style={{ width: "12px", height: "12px" }} />
            Reset
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex flex-col" style={{ gap: "28px" }}>
        {/* Quick presets */}
        <div>
          <LabelPill text="Presets" />
          <div
            className="flex flex-wrap items-center"
            style={{ gap: "6px", marginTop: "10px" }}
          >
            {QUICK_PRESETS.map((p) => (
              <button
                key={p.value}
                onClick={() => setColor("primary", p.value)}
                className="transition-transform duration-150 hover:scale-110"
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: p.value,
                  border: userColors.primary === p.value ? "2px solid #262626" : "1px solid rgba(0,0,0,0.08)",
                  outline: userColors.primary === p.value ? "2px solid white" : "none",
                  outlineOffset: "-3px",
                }}
                title={p.label}
              />
            ))}
          </div>
        </div>

        {/* User-controlled colors */}
        <div>
          <LabelPill text="Brand & Semantic" />
          <div style={{ marginTop: "10px", border: "1px solid #f0f0f0", borderRadius: "10px", overflow: "hidden" }}>
            <ColorSwatch
              label="Primary"
              value={userColors.primary}
              onChange={(v) => setColor("primary", v)}
              description="Main brand action colour"
            />
            <div style={{ height: "1px", background: "#f0f0f0", margin: "0 16px" }} />
            <ColorSwatch
              label="Error"
              value={userColors.error}
              onChange={(v) => setColor("error", v)}
              description="Destructive & danger states"
            />
            <div style={{ height: "1px", background: "#f0f0f0", margin: "0 16px" }} />
            <ColorSwatch
              label="Warning"
              value={userColors.warning}
              onChange={(v) => setColor("warning", v)}
              description="Caution & attention states"
            />
            <div style={{ height: "1px", background: "#f0f0f0", margin: "0 16px" }} />
            <ColorSwatch
              label="Success"
              value={userColors.success}
              onChange={(v) => setColor("success", v)}
              description="Positive & confirmation states"
            />
            <div style={{ height: "1px", background: "#f0f0f0", margin: "0 16px" }} />
            <ColorSwatch
              label="Surface"
              value={userColors.surface}
              onChange={(v) => setColor("surface", v)}
              description="Base background colour"
            />
          </div>
        </div>

        {/* Derived palette preview */}
        <div>
          <LabelPill text="Derived Palette" />
          <div style={{ marginTop: "10px", border: "1px solid #f0f0f0", borderRadius: "10px", padding: "8px 0" }}>
            <DerivedRow label="Primary Hover" value={tokens.color["primary-hover"]} />
            <DerivedRow label="Primary Soft" value={tokens.color["primary-soft"]} />
            <DerivedRow label="On Primary" value={tokens.color["on-primary"]} />
            <DerivedRow label="Surface Container" value={tokens.color["surface-container"]} />
            <DerivedRow label="On Surface" value={tokens.color["on-surface"]} />
            <DerivedRow label="On Surface Muted" value={tokens.color["on-surface-muted"]} />
            <DerivedRow label="Outline" value={tokens.color["outline"]} />
            <DerivedRow label="Focus Ring" value={tokens.color["focus-ring"]} />
          </div>
        </div>

        {/* Live preview */}
        <div>
          <LabelPill text="Live Preview" />
          <TokenScope>
            <div
              style={{
                marginTop: "10px",
                border: "1px solid #f0f0f0",
                borderRadius: "10px",
                padding: "24px",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Primary button */}
              <button
                style={{
                  height: "38px",
                  padding: "0 16px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-primary)",
                  color: "var(--color-on-primary)",
                  fontSize: "14px",
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Primary
              </button>
              {/* Outlined button */}
              <button
                style={{
                  height: "38px",
                  padding: "0 16px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-surface)",
                  color: "var(--color-on-surface)",
                  fontSize: "14px",
                  fontWeight: 500,
                  border: "1px solid var(--color-outline)",
                  cursor: "pointer",
                }}
              >
                Outlined
              </button>
              {/* Soft button */}
              <button
                style={{
                  height: "38px",
                  padding: "0 16px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-primary-soft)",
                  color: "var(--color-primary)",
                  fontSize: "14px",
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Soft
              </button>
              {/* Destructive */}
              <button
                style={{
                  height: "38px",
                  padding: "0 16px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-error)",
                  color: "var(--color-on-error)",
                  fontSize: "14px",
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Error
              </button>
            </div>
          </TokenScope>
        </div>

        {/* Bottom spacer */}
        <div style={{ height: "28px", flexShrink: 0 }} />
      </div>
    </div>
  )
}
