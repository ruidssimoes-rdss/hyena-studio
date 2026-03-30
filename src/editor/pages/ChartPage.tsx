"use client"

import { useState, useCallback } from "react"
import {
  ComponentPageLayout,
  ComponentCAP,
  PreviewSection,
  StandardCodeTab,
  StandardApiTab,
  type CAPData,
  type PropDef,
} from "@/editor/components/PageShell"

// ================================================================== //
// DATA                                                                //
// ================================================================== //

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

const BAR_DATA = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]

const LINE_DATA = [
  { month: "Jan", revenue: 186, expenses: 120 },
  { month: "Feb", revenue: 305, expenses: 180 },
  { month: "Mar", revenue: 237, expenses: 160 },
  { month: "Apr", revenue: 73, expenses: 140 },
  { month: "May", revenue: 209, expenses: 170 },
  { month: "Jun", revenue: 214, expenses: 130 },
]

const PIE_DATA = [
  { name: "Chrome", value: 275, color: "#2B7FFF" },
  { name: "Safari", value: 200, color: "#14B8A6" },
  { name: "Firefox", value: 187, color: "#F97316" },
  { name: "Edge", value: 173, color: "#8B5CF6" },
  { name: "Other", value: 90, color: "#838383" },
]

const PIE_TOTAL = PIE_DATA.reduce((s, d) => s + d.value, 0)

// ================================================================== //
// COLORS                                                              //
// ================================================================== //

const BLUE = "#2B7FFF"
const TEAL = "#14B8A6"
const ORANGE = "#F97316"
const PURPLE = "#8B5CF6"
const FG = "#262626"
const MUTED = "#838383"
const FAINT = "#C0C0C0"
const BORDER = "#F0F0F0"

// ================================================================== //
// SVG MATH HELPERS                                                    //
// ================================================================== //

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = (angle - 90) * Math.PI / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`
}

function describeDonutSegment(
  cx: number, cy: number, outerR: number, innerR: number,
  startAngle: number, endAngle: number
) {
  const outerStart = polarToCartesian(cx, cy, outerR, endAngle)
  const outerEnd = polarToCartesian(cx, cy, outerR, startAngle)
  const innerStart = polarToCartesian(cx, cy, innerR, startAngle)
  const innerEnd = polarToCartesian(cx, cy, innerR, endAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 0 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerStart.x} ${innerStart.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 1 ${innerEnd.x} ${innerEnd.y}`,
    `Z`,
  ].join(" ")
}

// ================================================================== //
// SHARED: TOOLTIP                                                     //
// ================================================================== //

function ChartTooltip({
  x, y, children, visible,
}: {
  x: number
  y: number
  children: React.ReactNode
  visible: boolean
}) {
  if (!visible) return null
  return (
    <foreignObject x={x - 70} y={y - 60} width={140} height={56} style={{ overflow: "visible", pointerEvents: "none" }}>
      <div
        style={{
          background: "white",
          border: `1px solid ${BORDER}`,
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          padding: "8px 12px",
          fontSize: "11px",
          color: FG,
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </div>
    </foreignObject>
  )
}

function LegendDot({ color }: { color: string }) {
  return (
    <span
      style={{
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: color,
        flexShrink: 0,
      }}
    />
  )
}

function Legend({ items }: { items: Array<{ color: string; label: string }> }) {
  return (
    <div className="flex items-center justify-center flex-wrap" style={{ gap: "16px", marginTop: "16px" }}>
      {items.map((item) => (
        <div key={item.label} className="flex items-center" style={{ gap: "6px" }}>
          <LegendDot color={item.color} />
          <span style={{ fontSize: "11px", color: MUTED }}>{item.label}</span>
        </div>
      ))}
    </div>
  )
}

// ================================================================== //
// SHARED: CHART DIMENSIONS                                            //
// ================================================================== //

const CHART_H = 280
const MARGIN = { top: 20, right: 20, bottom: 30, left: 40 }
const PLOT_W_RATIO = 1 // We use 100% width via viewBox
const VIEWBOX_W = 500
const PLOT_X = MARGIN.left
const PLOT_Y = MARGIN.top
const PLOT_W = VIEWBOX_W - MARGIN.left - MARGIN.right
const PLOT_H = CHART_H - MARGIN.top - MARGIN.bottom

// ================================================================== //
// SHARED: AXES                                                        //
// ================================================================== //

function YAxis({ max, steps }: { max: number; steps: number[] }) {
  return (
    <>
      {steps.map((val) => {
        const y = PLOT_Y + PLOT_H - (val / max) * PLOT_H
        return (
          <g key={val}>
            <line
              x1={PLOT_X}
              x2={PLOT_X + PLOT_W}
              y1={y}
              y2={y}
              stroke={BORDER}
              strokeWidth={0.5}
              strokeDasharray="3 3"
            />
            <text
              x={PLOT_X - 8}
              y={y + 3.5}
              textAnchor="end"
              style={{ fontSize: "11px", fill: FAINT }}
            >
              {val}
            </text>
          </g>
        )
      })}
    </>
  )
}

function XAxisLabels({ labels }: { labels: string[] }) {
  const step = PLOT_W / labels.length
  return (
    <>
      {labels.map((label, i) => (
        <text
          key={label}
          x={PLOT_X + step * i + step / 2}
          y={PLOT_Y + PLOT_H + 20}
          textAnchor="middle"
          style={{ fontSize: "11px", fill: FAINT }}
        >
          {label}
        </text>
      ))}
    </>
  )
}

// ================================================================== //
// SECTION 1: BAR CHART                                                //
// ================================================================== //

function BarChartSection() {
  const [hover, setHover] = useState<number | null>(null)
  const max = 350
  const ySteps = [0, 50, 100, 150, 200, 250, 300, 350]
  const step = PLOT_W / BAR_DATA.length
  const barW = 24
  const gap = 4

  return (
    <PreviewSection label="Bar Chart" wrapClassName="flex flex-col items-stretch w-full">
      <div style={{ width: "100%", height: `${CHART_H + 40}px`, position: "relative" }}>
        <svg
          viewBox={`0 0 ${VIEWBOX_W} ${CHART_H}`}
          style={{ width: "100%", height: CHART_H }}
          preserveAspectRatio="xMidYMid meet"
        >
          <YAxis max={max} steps={ySteps} />
          <XAxisLabels labels={MONTHS} />
          {BAR_DATA.map((d, i) => {
            const cx = PLOT_X + step * i + step / 2
            const desktopH = (d.desktop / max) * PLOT_H
            const mobileH = (d.mobile / max) * PLOT_H
            const barX1 = cx - barW - gap / 2
            const barX2 = cx + gap / 2
            return (
              <g
                key={d.month}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: "pointer" }}
              >
                <rect
                  x={barX1}
                  y={PLOT_Y + PLOT_H - desktopH}
                  width={barW}
                  height={desktopH}
                  rx={4}
                  ry={4}
                  fill={BLUE}
                  opacity={hover !== null && hover !== i ? 0.4 : 1}
                  style={{ transition: "opacity 150ms" }}
                />
                <rect
                  x={barX2}
                  y={PLOT_Y + PLOT_H - mobileH}
                  width={barW}
                  height={mobileH}
                  rx={4}
                  ry={4}
                  fill={TEAL}
                  opacity={hover !== null && hover !== i ? 0.4 : 1}
                  style={{ transition: "opacity 150ms" }}
                />
                {hover === i && (
                  <ChartTooltip x={cx} y={PLOT_Y + PLOT_H - Math.max(desktopH, mobileH) - 8} visible>
                    <div style={{ fontWeight: 500, marginBottom: "4px" }}>{d.month}</div>
                    <div className="flex items-center" style={{ gap: "6px" }}>
                      <LegendDot color={BLUE} />
                      <span>{d.desktop}</span>
                    </div>
                    <div className="flex items-center" style={{ gap: "6px" }}>
                      <LegendDot color={TEAL} />
                      <span>{d.mobile}</span>
                    </div>
                  </ChartTooltip>
                )}
              </g>
            )
          })}
        </svg>
        <Legend items={[{ color: BLUE, label: "Desktop" }, { color: TEAL, label: "Mobile" }]} />
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 2: LINE CHART                                               //
// ================================================================== //

function buildPolylinePoints(
  data: number[],
  max: number,
): Array<{ x: number; y: number }> {
  const step = PLOT_W / data.length
  return data.map((val, i) => ({
    x: PLOT_X + step * i + step / 2,
    y: PLOT_Y + PLOT_H - (val / max) * PLOT_H,
  }))
}

function LineChartSection() {
  const [hover, setHover] = useState<number | null>(null)
  const max = 350
  const ySteps = [0, 50, 100, 150, 200, 250, 300, 350]

  const revenuePoints = buildPolylinePoints(LINE_DATA.map((d) => d.revenue), max)
  const expensePoints = buildPolylinePoints(LINE_DATA.map((d) => d.expenses), max)

  const revenueLine = revenuePoints.map((p) => `${p.x},${p.y}`).join(" ")
  const expenseLine = expensePoints.map((p) => `${p.x},${p.y}`).join(" ")

  return (
    <PreviewSection label="Line Chart" wrapClassName="flex flex-col items-stretch w-full">
      <div style={{ width: "100%", height: `${CHART_H + 40}px`, position: "relative" }}>
        <svg
          viewBox={`0 0 ${VIEWBOX_W} ${CHART_H}`}
          style={{ width: "100%", height: CHART_H }}
          preserveAspectRatio="xMidYMid meet"
        >
          <YAxis max={max} steps={ySteps} />
          <XAxisLabels labels={MONTHS} />
          <polyline
            points={revenueLine}
            fill="none"
            stroke={BLUE}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <polyline
            points={expenseLine}
            fill="none"
            stroke={ORANGE}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {revenuePoints.map((p, i) => (
            <circle
              key={`rev-${i}`}
              cx={p.x}
              cy={p.y}
              r={hover === i ? 6 : 4}
              fill="white"
              stroke={BLUE}
              strokeWidth={2}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer", transition: "r 150ms" }}
            />
          ))}
          {expensePoints.map((p, i) => (
            <circle
              key={`exp-${i}`}
              cx={p.x}
              cy={p.y}
              r={hover === i ? 6 : 4}
              fill="white"
              stroke={ORANGE}
              strokeWidth={2}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer", transition: "r 150ms" }}
            />
          ))}
          {hover !== null && (
            <ChartTooltip
              x={revenuePoints[hover].x}
              y={Math.min(revenuePoints[hover].y, expensePoints[hover].y) - 8}
              visible
            >
              <div style={{ fontWeight: 500, marginBottom: "4px" }}>{LINE_DATA[hover].month}</div>
              <div className="flex items-center" style={{ gap: "6px" }}>
                <LegendDot color={BLUE} />
                <span>{LINE_DATA[hover].revenue}</span>
              </div>
              <div className="flex items-center" style={{ gap: "6px" }}>
                <LegendDot color={ORANGE} />
                <span>{LINE_DATA[hover].expenses}</span>
              </div>
            </ChartTooltip>
          )}
        </svg>
        <Legend items={[{ color: BLUE, label: "Revenue" }, { color: ORANGE, label: "Expenses" }]} />
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 3: AREA CHART                                               //
// ================================================================== //

function AreaChartSection() {
  const [hover, setHover] = useState<number | null>(null)
  const max = 350
  const ySteps = [0, 50, 100, 150, 200, 250, 300, 350]

  const revenuePoints = buildPolylinePoints(LINE_DATA.map((d) => d.revenue), max)
  const expensePoints = buildPolylinePoints(LINE_DATA.map((d) => d.expenses), max)

  const baseline = PLOT_Y + PLOT_H

  const revenueAreaPath = [
    `M ${revenuePoints[0].x},${baseline}`,
    ...revenuePoints.map((p) => `L ${p.x},${p.y}`),
    `L ${revenuePoints[revenuePoints.length - 1].x},${baseline}`,
    "Z",
  ].join(" ")

  const expenseAreaPath = [
    `M ${expensePoints[0].x},${baseline}`,
    ...expensePoints.map((p) => `L ${p.x},${p.y}`),
    `L ${expensePoints[expensePoints.length - 1].x},${baseline}`,
    "Z",
  ].join(" ")

  const revenueLine = revenuePoints.map((p) => `${p.x},${p.y}`).join(" ")
  const expenseLine = expensePoints.map((p) => `${p.x},${p.y}`).join(" ")

  return (
    <PreviewSection label="Area Chart" wrapClassName="flex flex-col items-stretch w-full">
      <div style={{ width: "100%", height: `${CHART_H + 40}px`, position: "relative" }}>
        <svg
          viewBox={`0 0 ${VIEWBOX_W} ${CHART_H}`}
          style={{ width: "100%", height: CHART_H }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="areaGradBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={BLUE} stopOpacity={0.2} />
              <stop offset="100%" stopColor={BLUE} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="areaGradOrange" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ORANGE} stopOpacity={0.2} />
              <stop offset="100%" stopColor={ORANGE} stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis max={max} steps={ySteps} />
          <XAxisLabels labels={MONTHS} />
          <path d={revenueAreaPath} fill="url(#areaGradBlue)" />
          <path d={expenseAreaPath} fill="url(#areaGradOrange)" />
          <polyline
            points={revenueLine}
            fill="none"
            stroke={BLUE}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <polyline
            points={expenseLine}
            fill="none"
            stroke={ORANGE}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {revenuePoints.map((p, i) => (
            <circle
              key={`rev-${i}`}
              cx={p.x}
              cy={p.y}
              r={hover === i ? 6 : 4}
              fill="white"
              stroke={BLUE}
              strokeWidth={2}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer", transition: "r 150ms" }}
            />
          ))}
          {expensePoints.map((p, i) => (
            <circle
              key={`exp-${i}`}
              cx={p.x}
              cy={p.y}
              r={hover === i ? 6 : 4}
              fill="white"
              stroke={ORANGE}
              strokeWidth={2}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer", transition: "r 150ms" }}
            />
          ))}
          {hover !== null && (
            <ChartTooltip
              x={revenuePoints[hover].x}
              y={Math.min(revenuePoints[hover].y, expensePoints[hover].y) - 8}
              visible
            >
              <div style={{ fontWeight: 500, marginBottom: "4px" }}>{LINE_DATA[hover].month}</div>
              <div className="flex items-center" style={{ gap: "6px" }}>
                <LegendDot color={BLUE} />
                <span>{LINE_DATA[hover].revenue}</span>
              </div>
              <div className="flex items-center" style={{ gap: "6px" }}>
                <LegendDot color={ORANGE} />
                <span>{LINE_DATA[hover].expenses}</span>
              </div>
            </ChartTooltip>
          )}
        </svg>
        <Legend items={[{ color: BLUE, label: "Revenue" }, { color: ORANGE, label: "Expenses" }]} />
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 4: PIE CHART                                                //
// ================================================================== //

function PieChartSection() {
  const [hover, setHover] = useState<number | null>(null)
  const cx = 150
  const cy = 120
  const r = 100

  let currentAngle = 0
  const segments = PIE_DATA.map((d) => {
    const angle = (d.value / PIE_TOTAL) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    currentAngle = endAngle

    const midAngle = startAngle + angle / 2
    const mid = polarToCartesian(cx, cy, r * 0.65, midAngle)

    return { ...d, startAngle, endAngle, midX: mid.x, midY: mid.y }
  })

  return (
    <PreviewSection label="Pie Chart" wrapClassName="flex flex-col items-center w-full">
      <div style={{ position: "relative" }}>
        <svg width={300} height={240} viewBox={`0 0 300 240`}>
          {segments.map((seg, i) => {
            const path = [
              `M ${cx} ${cy}`,
              `L ${polarToCartesian(cx, cy, r, seg.startAngle).x} ${polarToCartesian(cx, cy, r, seg.startAngle).y}`,
              describeArc(cx, cy, r, seg.startAngle, seg.endAngle).replace(/^M/, "A").replace(/^A/, `A`),
            ]
            // Build a proper closed pie slice path
            const start = polarToCartesian(cx, cy, r, seg.startAngle)
            const end = polarToCartesian(cx, cy, r, seg.endAngle)
            const largeArc = seg.endAngle - seg.startAngle > 180 ? 1 : 0
            const slicePath = [
              `M ${cx} ${cy}`,
              `L ${start.x} ${start.y}`,
              `A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`,
              `Z`,
            ].join(" ")

            return (
              <g key={seg.name}>
                <path
                  d={slicePath}
                  fill={seg.color}
                  stroke="white"
                  strokeWidth={2}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  opacity={hover !== null && hover !== i ? 0.6 : 1}
                  style={{ cursor: "pointer", transition: "opacity 150ms" }}
                />
              </g>
            )
          })}
          {hover !== null && (
            <ChartTooltip x={segments[hover].midX} y={segments[hover].midY - 16} visible>
              <div style={{ fontWeight: 500, marginBottom: "2px" }}>{segments[hover].name}</div>
              <div style={{ color: MUTED }}>
                {segments[hover].value} ({Math.round((segments[hover].value / PIE_TOTAL) * 100)}%)
              </div>
            </ChartTooltip>
          )}
        </svg>
      </div>
      <Legend
        items={PIE_DATA.map((d) => ({ color: d.color, label: d.name }))}
      />
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 5: DONUT CHART                                              //
// ================================================================== //

function DonutChartSection() {
  const [hover, setHover] = useState<number | null>(null)
  const cx = 150
  const cy = 120
  const outerR = 100
  const innerR = 60

  let currentAngle = 0
  const segments = PIE_DATA.map((d) => {
    const angle = (d.value / PIE_TOTAL) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    currentAngle = endAngle

    const midAngle = startAngle + angle / 2
    const mid = polarToCartesian(cx, cy, (outerR + innerR) / 2, midAngle)

    return { ...d, startAngle, endAngle, midX: mid.x, midY: mid.y }
  })

  return (
    <PreviewSection label="Donut Chart" wrapClassName="flex flex-col items-center w-full">
      <div style={{ position: "relative" }}>
        <svg width={300} height={240} viewBox={`0 0 300 240`}>
          {segments.map((seg, i) => {
            const path = describeDonutSegment(cx, cy, outerR, innerR, seg.startAngle, seg.endAngle)
            return (
              <path
                key={seg.name}
                d={path}
                fill={seg.color}
                stroke="white"
                strokeWidth={2}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                opacity={hover !== null && hover !== i ? 0.6 : 1}
                style={{ cursor: "pointer", transition: "opacity 150ms" }}
              />
            )
          })}
          {/* Center label */}
          <text
            x={cx}
            y={cy - 6}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: "24px", fontWeight: 500, fill: FG }}
          >
            {PIE_TOTAL}
          </text>
          <text
            x={cx}
            y={cy + 14}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fontSize: "11px", fill: MUTED }}
          >
            Total visitors
          </text>
          {hover !== null && (
            <ChartTooltip x={segments[hover].midX} y={segments[hover].midY - 16} visible>
              <div style={{ fontWeight: 500, marginBottom: "2px" }}>{segments[hover].name}</div>
              <div style={{ color: MUTED }}>
                {segments[hover].value} ({Math.round((segments[hover].value / PIE_TOTAL) * 100)}%)
              </div>
            </ChartTooltip>
          )}
        </svg>
      </div>
      <Legend
        items={PIE_DATA.map((d) => ({ color: d.color, label: d.name }))}
      />
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 6: INTERACTIVE                                              //
// ================================================================== //

type ChartMode = "bar" | "line" | "area"

function InteractiveBarChart({ hoverIdx, onHover }: { hoverIdx: number | null; onHover: (i: number | null) => void }) {
  const max = 350
  const ySteps = [0, 50, 100, 150, 200, 250, 300, 350]
  const step = PLOT_W / BAR_DATA.length
  const barW = 24
  const gap = 4

  return (
    <>
      <YAxis max={max} steps={ySteps} />
      <XAxisLabels labels={MONTHS} />
      {BAR_DATA.map((d, i) => {
        const cx = PLOT_X + step * i + step / 2
        const desktopH = (d.desktop / max) * PLOT_H
        const mobileH = (d.mobile / max) * PLOT_H
        const barX1 = cx - barW - gap / 2
        const barX2 = cx + gap / 2
        return (
          <g
            key={d.month}
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(null)}
            style={{ cursor: "pointer" }}
          >
            <rect
              x={barX1}
              y={PLOT_Y + PLOT_H - desktopH}
              width={barW}
              height={desktopH}
              rx={4}
              ry={4}
              fill={BLUE}
              opacity={hoverIdx !== null && hoverIdx !== i ? 0.4 : 1}
              style={{ transition: "opacity 150ms" }}
            />
            <rect
              x={barX2}
              y={PLOT_Y + PLOT_H - mobileH}
              width={barW}
              height={mobileH}
              rx={4}
              ry={4}
              fill={TEAL}
              opacity={hoverIdx !== null && hoverIdx !== i ? 0.4 : 1}
              style={{ transition: "opacity 150ms" }}
            />
            {hoverIdx === i && (
              <ChartTooltip x={cx} y={PLOT_Y + PLOT_H - Math.max(desktopH, mobileH) - 8} visible>
                <div style={{ fontWeight: 500, marginBottom: "4px" }}>{d.month}</div>
                <div className="flex items-center" style={{ gap: "6px" }}>
                  <LegendDot color={BLUE} />
                  <span>{d.desktop}</span>
                </div>
                <div className="flex items-center" style={{ gap: "6px" }}>
                  <LegendDot color={TEAL} />
                  <span>{d.mobile}</span>
                </div>
              </ChartTooltip>
            )}
          </g>
        )
      })}
    </>
  )
}

function InteractiveLineChart({ hoverIdx, onHover }: { hoverIdx: number | null; onHover: (i: number | null) => void }) {
  const max = 350
  const ySteps = [0, 50, 100, 150, 200, 250, 300, 350]

  const desktopPoints = buildPolylinePoints(BAR_DATA.map((d) => d.desktop), max)
  const mobilePoints = buildPolylinePoints(BAR_DATA.map((d) => d.mobile), max)

  const desktopLine = desktopPoints.map((p) => `${p.x},${p.y}`).join(" ")
  const mobileLine = mobilePoints.map((p) => `${p.x},${p.y}`).join(" ")

  return (
    <>
      <YAxis max={max} steps={ySteps} />
      <XAxisLabels labels={MONTHS} />
      <polyline points={desktopLine} fill="none" stroke={BLUE} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      <polyline points={mobileLine} fill="none" stroke={TEAL} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      {desktopPoints.map((p, i) => (
        <circle
          key={`d-${i}`}
          cx={p.x}
          cy={p.y}
          r={hoverIdx === i ? 6 : 4}
          fill="white"
          stroke={BLUE}
          strokeWidth={2}
          onMouseEnter={() => onHover(i)}
          onMouseLeave={() => onHover(null)}
          style={{ cursor: "pointer", transition: "r 150ms" }}
        />
      ))}
      {mobilePoints.map((p, i) => (
        <circle
          key={`m-${i}`}
          cx={p.x}
          cy={p.y}
          r={hoverIdx === i ? 6 : 4}
          fill="white"
          stroke={TEAL}
          strokeWidth={2}
          onMouseEnter={() => onHover(i)}
          onMouseLeave={() => onHover(null)}
          style={{ cursor: "pointer", transition: "r 150ms" }}
        />
      ))}
      {hoverIdx !== null && (
        <ChartTooltip
          x={desktopPoints[hoverIdx].x}
          y={Math.min(desktopPoints[hoverIdx].y, mobilePoints[hoverIdx].y) - 8}
          visible
        >
          <div style={{ fontWeight: 500, marginBottom: "4px" }}>{BAR_DATA[hoverIdx].month}</div>
          <div className="flex items-center" style={{ gap: "6px" }}>
            <LegendDot color={BLUE} />
            <span>{BAR_DATA[hoverIdx].desktop}</span>
          </div>
          <div className="flex items-center" style={{ gap: "6px" }}>
            <LegendDot color={TEAL} />
            <span>{BAR_DATA[hoverIdx].mobile}</span>
          </div>
        </ChartTooltip>
      )}
    </>
  )
}

function InteractiveAreaChart({ hoverIdx, onHover }: { hoverIdx: number | null; onHover: (i: number | null) => void }) {
  const max = 350
  const ySteps = [0, 50, 100, 150, 200, 250, 300, 350]

  const desktopPoints = buildPolylinePoints(BAR_DATA.map((d) => d.desktop), max)
  const mobilePoints = buildPolylinePoints(BAR_DATA.map((d) => d.mobile), max)
  const baseline = PLOT_Y + PLOT_H

  const desktopArea = [
    `M ${desktopPoints[0].x},${baseline}`,
    ...desktopPoints.map((p) => `L ${p.x},${p.y}`),
    `L ${desktopPoints[desktopPoints.length - 1].x},${baseline}`,
    "Z",
  ].join(" ")

  const mobileArea = [
    `M ${mobilePoints[0].x},${baseline}`,
    ...mobilePoints.map((p) => `L ${p.x},${p.y}`),
    `L ${mobilePoints[mobilePoints.length - 1].x},${baseline}`,
    "Z",
  ].join(" ")

  const desktopLine = desktopPoints.map((p) => `${p.x},${p.y}`).join(" ")
  const mobileLine = mobilePoints.map((p) => `${p.x},${p.y}`).join(" ")

  return (
    <>
      <defs>
        <linearGradient id="intAreaBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={BLUE} stopOpacity={0.2} />
          <stop offset="100%" stopColor={BLUE} stopOpacity={0} />
        </linearGradient>
        <linearGradient id="intAreaTeal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={TEAL} stopOpacity={0.2} />
          <stop offset="100%" stopColor={TEAL} stopOpacity={0} />
        </linearGradient>
      </defs>
      <YAxis max={max} steps={ySteps} />
      <XAxisLabels labels={MONTHS} />
      <path d={desktopArea} fill="url(#intAreaBlue)" />
      <path d={mobileArea} fill="url(#intAreaTeal)" />
      <polyline points={desktopLine} fill="none" stroke={BLUE} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      <polyline points={mobileLine} fill="none" stroke={TEAL} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      {desktopPoints.map((p, i) => (
        <circle
          key={`d-${i}`}
          cx={p.x}
          cy={p.y}
          r={hoverIdx === i ? 6 : 4}
          fill="white"
          stroke={BLUE}
          strokeWidth={2}
          onMouseEnter={() => onHover(i)}
          onMouseLeave={() => onHover(null)}
          style={{ cursor: "pointer", transition: "r 150ms" }}
        />
      ))}
      {mobilePoints.map((p, i) => (
        <circle
          key={`m-${i}`}
          cx={p.x}
          cy={p.y}
          r={hoverIdx === i ? 6 : 4}
          fill="white"
          stroke={TEAL}
          strokeWidth={2}
          onMouseEnter={() => onHover(i)}
          onMouseLeave={() => onHover(null)}
          style={{ cursor: "pointer", transition: "r 150ms" }}
        />
      ))}
      {hoverIdx !== null && (
        <ChartTooltip
          x={desktopPoints[hoverIdx].x}
          y={Math.min(desktopPoints[hoverIdx].y, mobilePoints[hoverIdx].y) - 8}
          visible
        >
          <div style={{ fontWeight: 500, marginBottom: "4px" }}>{BAR_DATA[hoverIdx].month}</div>
          <div className="flex items-center" style={{ gap: "6px" }}>
            <LegendDot color={BLUE} />
            <span>{BAR_DATA[hoverIdx].desktop}</span>
          </div>
          <div className="flex items-center" style={{ gap: "6px" }}>
            <LegendDot color={TEAL} />
            <span>{BAR_DATA[hoverIdx].mobile}</span>
          </div>
        </ChartTooltip>
      )}
    </>
  )
}

function InteractiveSection() {
  const [mode, setMode] = useState<ChartMode>("bar")
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)

  const modes: ChartMode[] = ["bar", "line", "area"]

  return (
    <PreviewSection label="Interactive" wrapClassName="flex flex-col items-stretch w-full">
      <div className="flex flex-col" style={{ gap: "16px" }}>
        {/* Toggle buttons */}
        <div className="flex items-center" style={{ gap: "2px" }}>
          {modes.map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setHoverIdx(null) }}
              className="font-medium"
              style={{
                height: "28px",
                padding: "0 12px",
                borderRadius: "8px",
                fontSize: "12.3px",
                background: mode === m ? FG : "transparent",
                color: mode === m ? "white" : MUTED,
                border: "none",
                cursor: "pointer",
                transition: "all 150ms",
              }}
              onMouseEnter={(e) => {
                if (mode !== m) e.currentTarget.style.background = BORDER
              }}
              onMouseLeave={(e) => {
                if (mode !== m) e.currentTarget.style.background = "transparent"
              }}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div style={{ width: "100%", height: `${CHART_H + 40}px`, position: "relative" }}>
          <svg
            viewBox={`0 0 ${VIEWBOX_W} ${CHART_H}`}
            style={{ width: "100%", height: CHART_H }}
            preserveAspectRatio="xMidYMid meet"
          >
            {mode === "bar" && <InteractiveBarChart hoverIdx={hoverIdx} onHover={setHoverIdx} />}
            {mode === "line" && <InteractiveLineChart hoverIdx={hoverIdx} onHover={setHoverIdx} />}
            {mode === "area" && <InteractiveAreaChart hoverIdx={hoverIdx} onHover={setHoverIdx} />}
          </svg>
          <Legend items={[{ color: BLUE, label: "Desktop" }, { color: TEAL, label: "Mobile" }]} />
        </div>
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// PREVIEW TAB                                                         //
// ================================================================== //

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <BarChartSection />
      <LineChartSection />
      <AreaChartSection />
      <PieChartSection />
      <DonutChartSection />
      <InteractiveSection />
    </div>
  )
}

// ================================================================== //
// CODE TAB                                                            //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="hyena-studio"
      importCode={`import { Chart, ChartConfig } from "@/components/ui/chart"`}
      usageCode={`const config: ChartConfig = {\n  desktop: { label: "Desktop", color: "#2B7FFF" },\n  mobile: { label: "Mobile", color: "#14B8A6" },\n}\n\n<Chart\n  type="bar"\n  data={data}\n  config={config}\n  xAxisKey="month"\n  series={["desktop", "mobile"]}\n/>`}
    />
  )
}

// ================================================================== //
// API TAB                                                             //
// ================================================================== //

const CHART_PROPS: PropDef[] = [
  { prop: "type", type: '"bar" | "line" | "area" | "pie" | "donut"', defaultVal: '"bar"' },
  { prop: "data", type: "Record<string, any>[]", defaultVal: "—" },
  { prop: "config", type: "ChartConfig", defaultVal: "—" },
  { prop: "xAxisKey", type: "string", defaultVal: "—" },
  { prop: "series", type: "string[]", defaultVal: "—" },
  { prop: "dataKey", type: "string", defaultVal: "—" },
  { prop: "nameKey", type: "string", defaultVal: "—" },
  { prop: "showGrid", type: "boolean", defaultVal: "true" },
  { prop: "showLegend", type: "boolean", defaultVal: "true" },
  { prop: "showTooltip", type: "boolean", defaultVal: "true" },
  { prop: "height", type: "number", defaultVal: "280" },
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Chart"
      description="Data visualisation component supporting bar, line, area, pie, and donut chart types."
      props={CHART_PROPS}
    />
  )
}

// ================================================================== //
// CAP                                                                 //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Display",
  variants: "5",
  sizes: "1",
  deps: "None",
  related: [
    { label: "Table", href: "/components/table" },
    { label: "Card", href: "/components/card" },
    { label: "Toggle Group", href: "/components/toggle-group" },
  ],
  tokens: [
    { name: "--chart-grid", color: "#F0F0F0", border: true },
    { name: "--chart-axis", color: "#C0C0C0" },
    { name: "--chart-tooltip-bg", color: "#FFFFFF", border: true },
    { name: "--chart-bar-blue", color: "#2B7FFF" },
    { name: "--chart-line-teal", color: "#14B8A6" },
    { name: "--chart-area-orange", color: "#F97316" },
  ],
}

// ================================================================== //
// MAIN                                                                //
// ================================================================== //

export function ChartPage() {
  return (
    <ComponentPageLayout
      name="Chart"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
