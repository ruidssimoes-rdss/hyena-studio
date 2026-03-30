"use client"

import { useEffect } from "react"
import { useTokenStore } from "@/store/token-store"
import { TokenScope } from "@/editor/components/TokenScope"
import { Breadcrumb, LabelPill } from "@/editor/components/PageShell"
import { useSetCAP } from "@/editor/shell/CAPContext"
import type { DensityLevel } from "@/tokens/types"

// ── Density card ───────────────────────────────────────────────────── //

function DensityCard({
  value,
  label,
  description,
  active,
  onClick,
}: {
  value: DensityLevel
  label: string
  description: string
  active: boolean
  onClick: () => void
}) {
  const barGap = value === "compact" ? 2 : value === "comfortable" ? 4 : 6
  return (
    <button
      onClick={onClick}
      className="flex flex-col transition-all duration-150"
      style={{
        flex: 1,
        padding: "16px",
        borderRadius: "10px",
        border: active ? "1.5px solid #262626" : "1px solid #f0f0f0",
        background: active ? "rgba(0,0,0,0.02)" : "white",
        cursor: "pointer",
        gap: "12px",
        alignItems: "flex-start",
      }}
    >
      <div className="flex flex-col items-center self-center" style={{ gap: `${barGap}px` }}>
        <div style={{ width: "32px", height: "3px", borderRadius: "2px", background: "#262626" }} />
        <div style={{ width: "24px", height: "3px", borderRadius: "2px", background: "#727272" }} />
        <div style={{ width: "16px", height: "3px", borderRadius: "2px", background: "#a1a1a1" }} />
      </div>
      <div>
        <div style={{ fontSize: "13px", fontWeight: 500, color: active ? "#262626" : "#727272" }}>
          {label}
        </div>
        <div style={{ fontSize: "11px", color: "#a1a1a1", marginTop: "2px" }}>
          {description}
        </div>
      </div>
    </button>
  )
}

// ── Elevation preview card ─────────────────────────────────────────── //

function ElevationCard({ level, shadow }: { level: number; shadow: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "64px",
        borderRadius: "10px",
        background: "white",
        boxShadow: shadow === "none" ? undefined : shadow,
        border: shadow === "none" ? "1px solid #f0f0f0" : undefined,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12.3px",
        fontWeight: 500,
        color: "#727272",
      }}
    >
      Elevation {level}
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────── //

export function StylesPage() {
  const setCAP = useSetCAP()
  const density = useTokenStore((s) => s.density)
  const setDensity = useTokenStore((s) => s.setDensity)
  const tokens = useTokenStore((s) => s.tokens)

  useEffect(() => {
    setCAP(
      <div style={{ padding: "14px 14px 0" }}>
        <div style={{ height: "14px" }} />
        <div style={{ padding: "7px" }}>
          <div
            className="font-medium"
            style={{ fontSize: "12.3px", color: "#262626", height: "28px", padding: "5px 12px", display: "flex", alignItems: "center" }}
          >
            Current
          </div>
          <div style={{ padding: "0 12px" }}>
            <div className="flex items-center justify-between" style={{ height: "28px", fontSize: "12.3px" }}>
              <span style={{ color: "#727272" }}>Density</span>
              <span style={{ color: "#262626" }}>{density.charAt(0).toUpperCase() + density.slice(1)}</span>
            </div>
            <div className="flex items-center justify-between" style={{ height: "28px", fontSize: "12.3px" }}>
              <span style={{ color: "#727272" }}>Padding</span>
              <span style={{ color: "#262626" }}>
                {density === "compact" ? "12px" : density === "comfortable" ? "16px" : "24px"}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
    return () => setCAP(null)
  }, [setCAP, density])

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-white shrink-0 relative" style={{ paddingTop: "28px", paddingBottom: "28px" }}>
        <Breadcrumb section="Tokens" page="Styles" />
      </div>

      <div className="flex-1 min-h-0 flex flex-col" style={{ gap: "28px" }}>
        {/* Density */}
        <div>
          <LabelPill text="Density" />
          <div className="flex" style={{ gap: "8px", marginTop: "10px" }}>
            <DensityCard value="compact" label="Compact" description="Dense, data-heavy" active={density === "compact"} onClick={() => setDensity("compact")} />
            <DensityCard value="comfortable" label="Comfortable" description="Balanced default" active={density === "comfortable"} onClick={() => setDensity("comfortable")} />
            <DensityCard value="spacious" label="Spacious" description="Airy, open feel" active={density === "spacious"} onClick={() => setDensity("spacious")} />
          </div>
        </div>

        {/* Elevation */}
        <div>
          <LabelPill text="Elevation" />
          <div className="flex flex-col" style={{ gap: "8px", marginTop: "10px", padding: "20px", background: "#fafafa", borderRadius: "10px" }}>
            <ElevationCard level={0} shadow={tokens.elevation[0]} />
            <ElevationCard level={1} shadow={tokens.elevation[1]} />
            <ElevationCard level={2} shadow={tokens.elevation[2]} />
            <ElevationCard level={3} shadow={tokens.elevation[3]} />
          </div>
        </div>

        {/* Motion tokens — read-only display */}
        <div>
          <LabelPill text="Motion" />
          <div style={{ marginTop: "10px", border: "1px solid #f0f0f0", borderRadius: "10px", padding: "4px 0" }}>
            {Object.entries(tokens.motion.duration).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between"
                style={{ height: "36px", padding: "0 16px" }}
              >
                <span style={{ fontSize: "13px", color: "#262626" }}>{key}</span>
                <span className="font-mono" style={{ fontSize: "11px", color: "#a1a1a1" }}>{value}ms</span>
              </div>
            ))}
            <div style={{ height: "1px", background: "#f0f0f0", margin: "4px 16px" }} />
            {Object.entries(tokens.motion.easing).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between"
                style={{ height: "36px", padding: "0 16px" }}
              >
                <span style={{ fontSize: "13px", color: "#262626" }}>{key}</span>
                <span className="font-mono" style={{ fontSize: "10px", color: "#a1a1a1", maxWidth: "180px", textAlign: "right" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live preview with density */}
        <div>
          <LabelPill text="Live Preview" />
          <TokenScope>
            <div
              style={{
                marginTop: "10px",
                border: "1px solid #f0f0f0",
                borderRadius: "10px",
                padding: "24px",
              }}
            >
              {/* Card-like preview showing density */}
              <div
                style={{
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--color-outline-variant)",
                  padding: "var(--density-padding)",
                  background: "var(--color-surface)",
                }}
              >
                <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-on-surface)", marginBottom: "8px" }}>
                  Card Title
                </div>
                <div style={{ fontSize: "13px", color: "var(--color-on-surface-muted)", marginBottom: "var(--density-padding)" }}>
                  This card responds to density changes. The padding adapts based on your chosen density level.
                </div>
                <div className="flex" style={{ gap: "8px" }}>
                  <button
                    style={{
                      height: "32px",
                      padding: "0 12px",
                      borderRadius: "var(--radius-sm)",
                      background: "var(--color-primary)",
                      color: "var(--color-on-primary)",
                      fontSize: "12px",
                      fontWeight: 500,
                      border: "none",
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    style={{
                      height: "32px",
                      padding: "0 12px",
                      borderRadius: "var(--radius-sm)",
                      background: "transparent",
                      color: "var(--color-on-surface-muted)",
                      fontSize: "12px",
                      fontWeight: 500,
                      border: "1px solid var(--color-outline)",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </TokenScope>
        </div>

        <div style={{ height: "28px", flexShrink: 0 }} />
      </div>
    </div>
  )
}
