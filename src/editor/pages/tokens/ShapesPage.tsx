"use client"

import { useEffect } from "react"
import { useTokenStore } from "@/store/token-store"
import { TokenScope } from "@/editor/components/TokenScope"
import { Breadcrumb, LabelPill } from "@/editor/components/PageShell"
import { useSetCAP } from "@/editor/shell/CAPContext"
import { RADIUS_PRESETS } from "@/tokens/defaults"
import type { RadiusPreset } from "@/tokens/types"

// ── Preset card ────────────────────────────────────────────────────── //

function PresetCard({
  preset,
  label,
  active,
  onClick,
}: {
  preset: RadiusPreset
  label: string
  active: boolean
  onClick: () => void
}) {
  const radii = RADIUS_PRESETS[preset]
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center transition-all duration-150"
      style={{
        flex: 1,
        padding: "20px 12px",
        borderRadius: "10px",
        border: active ? "1.5px solid #262626" : "1px solid #f0f0f0",
        background: active ? "rgba(0,0,0,0.02)" : "white",
        cursor: "pointer",
        gap: "12px",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "36px",
          borderRadius: `${radii.md}px`,
          border: "2px solid #262626",
        }}
      />
      <span style={{ fontSize: "12.3px", fontWeight: 500, color: active ? "#262626" : "#727272" }}>
        {label}
      </span>
    </button>
  )
}

// ── Scale row ──────────────────────────────────────────────────────── //

function RadiusScaleRow({ name, value }: { name: string; value: number }) {
  const displayValue = value === 9999 ? "full" : `${value}px`
  const previewRadius = value === 9999 ? "9999px" : `${value}px`
  return (
    <div
      className="flex items-center justify-between"
      style={{ height: "40px", padding: "0 16px" }}
    >
      <div className="flex items-center" style={{ gap: "12px" }}>
        <div
          style={{
            width: "24px",
            height: "24px",
            borderRadius: previewRadius,
            border: "2px solid #262626",
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: "13px", fontWeight: 500, color: "#262626" }}>{name}</span>
      </div>
      <span className="font-mono" style={{ fontSize: "11px", color: "#a1a1a1" }}>
        {displayValue}
      </span>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────── //

export function ShapesPage() {
  const setCAP = useSetCAP()
  const radiusPreset = useTokenStore((s) => s.radiusPreset)
  const setRadiusPreset = useTokenStore((s) => s.setRadiusPreset)
  const tokens = useTokenStore((s) => s.tokens)
  const ruleReport = useTokenStore((s) => s.ruleReport)

  useEffect(() => {
    const shapeWarnings = ruleReport.warnings.filter((r) => r.rule.scope === "shape")
    const shapeInfo = ruleReport.info.filter((r) => r.rule.scope === "shape")

    setCAP(
      <div style={{ padding: "14px 14px 0" }}>
        <div style={{ height: "14px" }} />
        <div style={{ padding: "7px" }}>
          <div
            className="font-medium"
            style={{ fontSize: "12.3px", color: "#262626", height: "28px", padding: "5px 12px", display: "flex", alignItems: "center" }}
          >
            Active Preset
          </div>
          <div style={{ padding: "0 12px", fontSize: "12.3px", color: "#727272" }}>
            {radiusPreset.charAt(0).toUpperCase() + radiusPreset.slice(1)}
          </div>
        </div>
        {(shapeWarnings.length > 0 || shapeInfo.length > 0) && (
          <div style={{ padding: "7px" }}>
            <div
              className="font-medium"
              style={{ fontSize: "12.3px", color: "#262626", height: "28px", padding: "5px 12px", display: "flex", alignItems: "center" }}
            >
              Rules
            </div>
            <div style={{ padding: "0 12px" }}>
              {shapeWarnings.map((r) => (
                <div key={r.rule.id} className="flex items-start" style={{ gap: "6px", fontSize: "12.3px", color: "#F97316", padding: "2px 0" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "3px", background: "#F97316", marginTop: "5px", flexShrink: 0 }} />
                  <span>{r.rule.message}</span>
                </div>
              ))}
              {shapeInfo.map((r) => (
                <div key={r.rule.id} className="flex items-start" style={{ gap: "6px", fontSize: "12.3px", color: "#3B82F6", padding: "2px 0" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "3px", background: "#3B82F6", marginTop: "5px", flexShrink: 0 }} />
                  <span>{r.rule.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
    return () => setCAP(null)
  }, [setCAP, radiusPreset, ruleReport])

  const radii = tokens.radius

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-white shrink-0 relative" style={{ paddingTop: "28px", paddingBottom: "28px" }}>
        <Breadcrumb section="Tokens" page="Shapes" />
      </div>

      <div className="flex-1 min-h-0 flex flex-col" style={{ gap: "28px" }}>
        {/* Preset selector */}
        <div>
          <LabelPill text="Radius Preset" />
          <div className="flex" style={{ gap: "8px", marginTop: "10px" }}>
            <PresetCard preset="sharp" label="Sharp" active={radiusPreset === "sharp"} onClick={() => setRadiusPreset("sharp")} />
            <PresetCard preset="soft" label="Soft" active={radiusPreset === "soft"} onClick={() => setRadiusPreset("soft")} />
            <PresetCard preset="round" label="Round" active={radiusPreset === "round"} onClick={() => setRadiusPreset("round")} />
          </div>
        </div>

        {/* Scale table */}
        <div>
          <LabelPill text="Scale" />
          <div style={{ marginTop: "10px", border: "1px solid #f0f0f0", borderRadius: "10px", padding: "4px 0" }}>
            <RadiusScaleRow name="none" value={radii.none} />
            <RadiusScaleRow name="xs" value={radii.xs} />
            <RadiusScaleRow name="sm" value={radii.sm} />
            <RadiusScaleRow name="md" value={radii.md} />
            <RadiusScaleRow name="lg" value={radii.lg} />
            <RadiusScaleRow name="xl" value={radii.xl} />
            <RadiusScaleRow name="2xl" value={radii["2xl"]} />
            <RadiusScaleRow name="full" value={radii.full} />
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
                gap: "12px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((key) => (
                <div
                  key={key}
                  style={{
                    width: "64px",
                    height: "48px",
                    borderRadius: `var(--radius-${key})`,
                    background: "var(--color-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-on-primary)",
                    fontSize: "11px",
                    fontWeight: 500,
                  }}
                >
                  {key}
                </div>
              ))}
            </div>
          </TokenScope>
        </div>

        <div style={{ height: "28px", flexShrink: 0 }} />
      </div>
    </div>
  )
}
