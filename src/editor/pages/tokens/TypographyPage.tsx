"use client"

import { useEffect } from "react"
import { useTokenStore } from "@/store/token-store"
import { Breadcrumb, LabelPill } from "@/editor/components/PageShell"
import { useSetCAP } from "@/editor/shell/CAPContext"
import type { TypeScaleLevel } from "@/tokens/types"

const SCALE_LEVELS: Array<{ key: TypeScaleLevel; label: string; group: string }> = [
  { key: "display", label: "Display", group: "Display" },
  { key: "heading-lg", label: "Heading LG", group: "Heading" },
  { key: "heading-md", label: "Heading MD", group: "Heading" },
  { key: "heading-sm", label: "Heading SM", group: "Heading" },
  { key: "body-lg", label: "Body LG", group: "Body" },
  { key: "body-md", label: "Body MD", group: "Body" },
  { key: "body-sm", label: "Body SM", group: "Body" },
  { key: "label-lg", label: "Label LG", group: "Label" },
  { key: "label-md", label: "Label MD", group: "Label" },
  { key: "label-sm", label: "Label SM", group: "Label" },
]

export function TypographyPage() {
  const setCAP = useSetCAP()
  const tokens = useTokenStore((s) => s.tokens)
  const ruleReport = useTokenStore((s) => s.ruleReport)

  useEffect(() => {
    const typeErrors = ruleReport.errors.filter((r) => r.rule.scope === "typography")
    const typeWarnings = ruleReport.warnings.filter((r) => r.rule.scope === "typography")

    setCAP(
      <div style={{ padding: "14px 14px 0" }}>
        <div style={{ height: "14px" }} />
        <div style={{ padding: "7px" }}>
          <div
            className="font-medium"
            style={{ fontSize: "12.3px", color: "#262626", height: "28px", padding: "5px 12px", display: "flex", alignItems: "center" }}
          >
            Fonts
          </div>
          <div style={{ padding: "0 12px" }}>
            <div className="flex items-center justify-between" style={{ height: "28px", fontSize: "12.3px" }}>
              <span style={{ color: "#727272" }}>Sans</span>
              <span style={{ color: "#262626", fontSize: "11px" }}>Geist</span>
            </div>
            <div className="flex items-center justify-between" style={{ height: "28px", fontSize: "12.3px" }}>
              <span style={{ color: "#727272" }}>Mono</span>
              <span className="font-mono" style={{ color: "#262626", fontSize: "11px" }}>Geist Mono</span>
            </div>
          </div>
        </div>
        {(typeErrors.length > 0 || typeWarnings.length > 0) && (
          <div style={{ padding: "7px" }}>
            <div
              className="font-medium"
              style={{ fontSize: "12.3px", color: "#262626", height: "28px", padding: "5px 12px", display: "flex", alignItems: "center" }}
            >
              Rules
            </div>
            <div style={{ padding: "0 12px" }}>
              {typeErrors.map((r) => (
                <div key={r.rule.id} className="flex items-start" style={{ gap: "6px", fontSize: "12.3px", color: "#D5143E", padding: "2px 0" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "3px", background: "#D5143E", marginTop: "5px", flexShrink: 0 }} />
                  <span>{r.rule.message}</span>
                </div>
              ))}
              {typeWarnings.map((r) => (
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
  }, [setCAP, ruleReport])

  const { scale } = tokens.typography

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-white shrink-0 relative" style={{ paddingTop: "28px", paddingBottom: "28px" }}>
        <Breadcrumb section="Tokens" page="Typography" />
      </div>

      <div className="flex-1 min-h-0 flex flex-col" style={{ gap: "28px" }}>
        {/* Font families */}
        <div>
          <LabelPill text="Font Families" />
          <div style={{ marginTop: "10px", border: "1px solid #f0f0f0", borderRadius: "10px", padding: "4px 0" }}>
            <div className="flex items-center justify-between" style={{ height: "44px", padding: "0 16px" }}>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 500, color: "#262626" }}>Sans Serif</div>
                <div style={{ fontSize: "11px", color: "#a1a1a1" }}>Primary typeface</div>
              </div>
              <span style={{ fontSize: "14px", fontWeight: 500, color: "#262626" }}>
                Geist
              </span>
            </div>
            <div style={{ height: "1px", background: "#f0f0f0", margin: "0 16px" }} />
            <div className="flex items-center justify-between" style={{ height: "44px", padding: "0 16px" }}>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 500, color: "#262626" }}>Monospace</div>
                <div style={{ fontSize: "11px", color: "#a1a1a1" }}>Code & data</div>
              </div>
              <span className="font-mono" style={{ fontSize: "14px", fontWeight: 500, color: "#262626" }}>
                Geist Mono
              </span>
            </div>
          </div>
        </div>

        {/* Type scale specimen */}
        <div>
          <LabelPill text="Type Scale" />
          <div style={{ marginTop: "10px", border: "1px solid #f0f0f0", borderRadius: "10px", padding: "16px 0" }}>
            {SCALE_LEVELS.map((level, i) => {
              const style = scale[level.key]
              return (
                <div key={level.key}>
                  {i > 0 && SCALE_LEVELS[i - 1].group !== level.group && (
                    <div style={{ height: "1px", background: "#f0f0f0", margin: "8px 16px" }} />
                  )}
                  <div
                    className="flex items-baseline justify-between"
                    style={{ padding: "8px 16px", minHeight: "36px" }}
                  >
                    <div
                      className="flex-1 min-w-0 truncate"
                      style={{
                        fontSize: `${Math.min(style.size, 28)}px`,
                        fontWeight: style.weight,
                        lineHeight: style.lineHeight,
                        letterSpacing: `${style.tracking}em`,
                        color: "#262626",
                      }}
                    >
                      {level.label}
                    </div>
                    <div className="flex items-baseline shrink-0" style={{ gap: "12px", marginLeft: "16px" }}>
                      <span className="font-mono" style={{ fontSize: "11px", color: "#a1a1a1" }}>
                        {style.size}px
                      </span>
                      <span className="font-mono" style={{ fontSize: "11px", color: "#a1a1a1" }}>
                        {style.weight}
                      </span>
                      <span className="font-mono" style={{ fontSize: "11px", color: "#a1a1a1" }}>
                        {style.lineHeight}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Properties table */}
        <div>
          <LabelPill text="Properties" />
          <div style={{ marginTop: "10px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Token", "Size", "Weight", "Line Height", "Tracking"].map((h) => (
                    <th
                      key={h}
                      className="font-medium"
                      style={{
                        fontSize: "11px",
                        color: "#a1a1a1",
                        textAlign: "left",
                        height: "32px",
                        padding: "0 12px",
                        borderBottom: "1px solid #f0f0f0",
                        fontWeight: 500,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SCALE_LEVELS.map((level, i) => {
                  const style = scale[level.key]
                  return (
                    <tr
                      key={level.key}
                      style={{ borderBottom: i < SCALE_LEVELS.length - 1 ? "1px solid #f0f0f0" : "none" }}
                    >
                      <td className="font-mono" style={{ fontSize: "11px", color: "#262626", height: "36px", padding: "0 12px", fontWeight: 500 }}>
                        {level.key}
                      </td>
                      <td className="font-mono" style={{ fontSize: "11px", color: "#727272", height: "36px", padding: "0 12px" }}>
                        {style.size}px
                      </td>
                      <td className="font-mono" style={{ fontSize: "11px", color: "#727272", height: "36px", padding: "0 12px" }}>
                        {style.weight}
                      </td>
                      <td className="font-mono" style={{ fontSize: "11px", color: "#727272", height: "36px", padding: "0 12px" }}>
                        {style.lineHeight}
                      </td>
                      <td className="font-mono" style={{ fontSize: "11px", color: "#727272", height: "36px", padding: "0 12px" }}>
                        {style.tracking}em
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ height: "28px", flexShrink: 0 }} />
      </div>
    </div>
  )
}
