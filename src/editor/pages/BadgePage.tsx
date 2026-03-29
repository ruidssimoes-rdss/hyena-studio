"use client"

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
// PREVIEW                                                              //
// ================================================================== //

interface BadgeStyle {
  bg: string
  color: string
  border?: string
}

const BADGE_VARIANTS: Array<{ label: string; style: BadgeStyle }> = [
  { label: "Default", style: { bg: "#262626", color: "#fafafa" } },
  { label: "Secondary", style: { bg: "#f0f0f0", color: "#262626" } },
  { label: "Outline", style: { bg: "transparent", color: "#262626", border: "0.8px solid #f0f0f0" } },
  { label: "Destructive", style: { bg: "rgba(213,20,62,0.08)", color: "#d5143e" } },
  { label: "Success", style: { bg: "rgba(0,187,127,0.08)", color: "#00885e" } },
  { label: "Warning", style: { bg: "rgba(245,158,11,0.08)", color: "#b45309" } },
  { label: "Info", style: { bg: "rgba(59,130,246,0.08)", color: "#2563eb" } },
]

function PreviewBadge({
  label,
  style,
  height = 22,
  fontSize = "12px",
}: {
  label: string
  style: BadgeStyle
  height?: number
  fontSize?: string
}) {
  return (
    <span
      className="inline-flex items-center justify-center font-medium"
      style={{
        height: `${height}px`,
        padding: "0 6px",
        borderRadius: "10px",
        background: style.bg,
        color: style.color,
        border: style.border || "none",
        fontSize,
        lineHeight: "1",
      }}
    >
      {label}
    </span>
  )
}

function VariantsSection() {
  return (
    <PreviewSection label="Variants">
      {BADGE_VARIANTS.map((v) => (
        <PreviewBadge key={v.label} label={v.label} style={v.style} />
      ))}
    </PreviewSection>
  )
}

function SizesSection() {
  const defaultStyle = BADGE_VARIANTS[0].style
  return (
    <PreviewSection label="Sizes">
      <div className="flex items-center justify-center" style={{ gap: "16px" }}>
        <div className="flex flex-col items-center">
          <PreviewBadge label="Large" style={defaultStyle} height={26} fontSize="14px" />
          <span style={{ fontSize: "10px", fontWeight: 400, color: "#a1a1a1", marginTop: "6px" }}>
            Large
          </span>
        </div>
        <div className="flex flex-col items-center">
          <PreviewBadge label="Default" style={defaultStyle} height={22} fontSize="12px" />
          <span style={{ fontSize: "10px", fontWeight: 400, color: "#a1a1a1", marginTop: "6px" }}>
            Default
          </span>
        </div>
        <div className="flex flex-col items-center">
          <PreviewBadge label="Small" style={defaultStyle} height={18} fontSize="10px" />
          <span style={{ fontSize: "10px", fontWeight: 400, color: "#a1a1a1", marginTop: "6px" }}>
            Small
          </span>
        </div>
      </div>
    </PreviewSection>
  )
}

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <VariantsSection />
      <SizesSection />
    </div>
  )
}

// ================================================================== //
// CODE                                                                 //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/badge"
      importCode={`import { Badge } from "@hyena/badge"`}
      usageCode={`<Badge>Badge</Badge>`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const BADGE_PROPS: PropDef[] = [
  {
    prop: "variant",
    type: '"default" | "secondary" | "outline" | "destructive" | "success" | "warning" | "info"',
    defaultVal: '"default"',
  },
  { prop: "size", type: '"sm" | "md" | "lg"', defaultVal: '"md"' },
  { prop: "className", type: "string", defaultVal: "—" },
  { prop: "children", type: "React.ReactNode", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Badge"
      description="A small status indicator with variant and size support."
      props={BADGE_PROPS}
    />
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Primitive",
  variants: "7",
  sizes: "3",
  deps: "cva, cn",
  related: [
    { label: "Button", href: "/components/button" },
    { label: "Alert", href: "/components/alert" },
    { label: "Table", href: "/components/table" },
  ],
  tokens: [
    { name: "--primary", color: "#262626" },
    { name: "--secondary", color: "#f0f0f0", border: true },
    { name: "--destructive", color: "#d5143e" },
    { name: "--success", color: "#00885e" },
    { name: "--warning", color: "#b45309" },
    { name: "--info", color: "#2563eb" },
    { name: "--border", color: "#e4e4e7", border: true },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function BadgePage() {
  return (
    <ComponentPageLayout
      name="Badge"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
