"use client"

import { useEffect, useCallback } from "react"
import { Minus, Plus, RotateCcw } from "lucide-react"
import { useTokenStore } from "@/store/token-store"
import { TokenScope } from "@/editor/components/TokenScope"
import { Breadcrumb, LabelPill } from "@/editor/components/PageShell"
import { useSetCAP } from "@/editor/shell/CAPContext"
import { generateSpacingScale } from "@/lib/math"
import { DEFAULT_SPACING } from "@/tokens/defaults"

export function SpacingPage() {
  const setCAP = useSetCAP()
  const spacing = useTokenStore((s) => s.spacing)
  const setSpacing = useTokenStore((s) => s.setSpacing)
  const ruleReport = useTokenStore((s) => s.ruleReport)

  const scale = generateSpacingScale(spacing.base)

  const increment = useCallback(() => {
    if (spacing.base < 8) setSpacing({ base: spacing.base + 1 })
  }, [spacing.base, setSpacing])

  const decrement = useCallback(() => {
    if (spacing.base > 2) setSpacing({ base: spacing.base - 1 })
  }, [spacing.base, setSpacing])

  const handleReset = useCallback(() => {
    setSpacing(DEFAULT_SPACING)
  }, [setSpacing])

  useEffect(() => {
    const spacingWarnings = ruleReport.warnings.filter((r) => r.rule.scope === "spacing")

    setCAP(
      <div style={{ padding: "14px 14px 0" }}>
        <div style={{ height: "14px" }} />
        <div style={{ padding: "7px" }}>
          <div
            className="font-medium"
            style={{ fontSize: "12.3px", color: "#262626", height: "28px", padding: "5px 12px", display: "flex", alignItems: "center" }}
          >
            Base Unit
          </div>
          <div style={{ padding: "0 12px", fontSize: "12.3px", color: "#727272" }}>
            {spacing.base}px — {scale.length} scale steps
          </div>
        </div>
        {spacingWarnings.length > 0 && (
          <div style={{ padding: "7px" }}>
            <div
              className="font-medium"
              style={{ fontSize: "12.3px", color: "#262626", height: "28px", padding: "5px 12px", display: "flex", alignItems: "center" }}
            >
              Rules
            </div>
            <div style={{ padding: "0 12px" }}>
              {spacingWarnings.map((r) => (
                <div key={r.rule.id} className="flex items-start" style={{ gap: "6px", fontSize: "12.3px", color: "#F97316", padding: "2px 0" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "3px", background: "#F97316", marginTop: "5px", flexShrink: 0 }} />
                  <span>{r.rule.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
    return () => setCAP(null)
  }, [setCAP, spacing, ruleReport, scale.length])

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-white shrink-0 relative" style={{ paddingTop: "28px", paddingBottom: "28px" }}>
        <div className="flex items-center justify-between">
          <Breadcrumb section="Tokens" page="Spacing" />
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
        {/* Base unit control */}
        <div>
          <LabelPill text="Base Unit" />
          <div
            className="flex items-center justify-between"
            style={{
              marginTop: "10px",
              border: "1px solid #f0f0f0",
              borderRadius: "10px",
              padding: "16px 20px",
            }}
          >
            <div className="flex items-baseline" style={{ gap: "8px" }}>
              <span className="font-mono" style={{ fontSize: "32px", fontWeight: 600, color: "#262626", lineHeight: 1 }}>
                {spacing.base}
              </span>
              <span style={{ fontSize: "13px", color: "#a1a1a1" }}>px</span>
            </div>
            <div className="flex items-center" style={{ gap: "4px" }}>
              <button
                onClick={decrement}
                disabled={spacing.base <= 2}
                className="flex items-center justify-center transition-all duration-150 hover:bg-[rgba(0,0,0,0.04)] disabled:opacity-30"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  border: "1px solid #f0f0f0",
                }}
              >
                <Minus style={{ width: "14px", height: "14px", color: "#727272" }} />
              </button>
              <button
                onClick={increment}
                disabled={spacing.base >= 8}
                className="flex items-center justify-center transition-all duration-150 hover:bg-[rgba(0,0,0,0.04)] disabled:opacity-30"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  border: "1px solid #f0f0f0",
                }}
              >
                <Plus style={{ width: "14px", height: "14px", color: "#727272" }} />
              </button>
            </div>
          </div>
        </div>

        {/* Scale table */}
        <div>
          <LabelPill text="Scale" />
          <div style={{ marginTop: "10px", border: "1px solid #f0f0f0", borderRadius: "10px", padding: "4px 0" }}>
            {scale.map((value, index) => (
              <div
                key={index}
                className="flex items-center justify-between"
                style={{ height: "40px", padding: "0 16px" }}
              >
                <div className="flex items-center" style={{ gap: "12px" }}>
                  <span className="font-mono" style={{ fontSize: "11px", color: "#a1a1a1", width: "32px" }}>
                    --{index}
                  </span>
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "#262626" }}>
                    {value}px
                  </span>
                </div>
                <div
                  style={{
                    width: `${Math.min(value, 80)}px`,
                    height: "8px",
                    borderRadius: "4px",
                    background: "#262626",
                    opacity: 0.15,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Visual spacing preview */}
        <div>
          <LabelPill text="Visual" />
          <TokenScope>
            <div
              style={{
                marginTop: "10px",
                border: "1px solid #f0f0f0",
                borderRadius: "10px",
                padding: "24px",
              }}
            >
              <div className="flex flex-col" style={{ gap: "4px" }}>
                {scale.slice(0, 6).map((value, index) => (
                  <div key={index} className="flex items-center" style={{ gap: "8px" }}>
                    <span className="font-mono" style={{ fontSize: "10px", color: "#a1a1a1", width: "20px", textAlign: "right" }}>
                      {index}
                    </span>
                    <div
                      style={{
                        height: `${value}px`,
                        width: "100%",
                        background: "var(--color-primary)",
                        borderRadius: "2px",
                        opacity: 0.2,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TokenScope>
        </div>

        <div style={{ height: "28px", flexShrink: 0 }} />
      </div>
    </div>
  )
}
