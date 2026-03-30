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
// DESIGN TOKENS                                                        //
// ================================================================== //

const BADGE_BASE: React.CSSProperties = {
  height: "19.6px",
  padding: "1px 5px",
  borderRadius: "8px",
  fontSize: "12px",
  fontWeight: 500,
  lineHeight: "16px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
}

// ================================================================== //
// PREVIEW                                                              //
// ================================================================== //

interface BadgeVariant {
  label: string
  bg: string
  border: string
  color: string
}

function PreviewBadge({ v }: { v: BadgeVariant }) {
  return (
    <span style={{ ...BADGE_BASE, background: v.bg, border: `0.8px solid ${v.border}`, color: v.color }}>
      {v.label}
    </span>
  )
}

const BASE_VARIANTS: BadgeVariant[] = [
  { label: "Default", bg: "#262626", border: "#262626", color: "#FFFFFF" },
  { label: "Secondary", bg: "#F0F0F0", border: "#F0F0F0", color: "#838383" },
  { label: "Outline", bg: "transparent", border: "#F0F0F0", color: "#262626" },
]

const STATUS_VARIANTS: BadgeVariant[] = [
  { label: "Information", bg: "rgba(179,146,240,0.05)", border: "#B392F0", color: "#B392F0" },
  { label: "Success", bg: "rgba(20,184,166,0.05)", border: "#14B8A6", color: "#14B8A6" },
  { label: "Warning", bg: "rgba(249,115,22,0.05)", border: "#F97316", color: "#F97316" },
  { label: "Error", bg: "rgba(213,20,62,0.05)", border: "#D5143E", color: "#D5143E" },
  { label: "Progress", bg: "rgba(59,130,246,0.05)", border: "#3B82F6", color: "#3B82F6" },
]

function VariantsSection() {
  return (
    <PreviewSection label="Variants" wrapClassName="flex flex-col items-center gap-[8px] w-full">
      {BASE_VARIANTS.map((v) => (
        <PreviewBadge key={v.label} v={v} />
      ))}
    </PreviewSection>
  )
}

function StatusVariantsSection() {
  return (
    <PreviewSection label="Variants (status colour)" wrapClassName="flex flex-col items-center gap-[8px] w-full">
      {STATUS_VARIANTS.map((v) => (
        <PreviewBadge key={v.label} v={v} />
      ))}
    </PreviewSection>
  )
}

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <VariantsSection />
      <StatusVariantsSection />
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
      usageCode={`<Badge>Badge</Badge>\n\n<Badge variant="information">Info</Badge>\n<Badge variant="success">Active</Badge>\n<Badge variant="error">Failed</Badge>`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const BADGE_PROPS: PropDef[] = [
  {
    prop: "variant",
    type: '"default" | "secondary" | "outline" | "information" | "success" | "warning" | "error" | "progress"',
    defaultVal: '"default"',
  },
  { prop: "className", type: "string", defaultVal: "—" },
  { prop: "children", type: "React.ReactNode", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Badge"
      description="A small status indicator with variant support."
      props={BADGE_PROPS}
    />
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Primitive",
  variants: "8",
  sizes: "—",
  deps: "cva, cn",
  related: [
    { label: "Button", href: "/components/button" },
    { label: "Alert", href: "/components/alert" },
    { label: "Table", href: "/components/table" },
  ],
  tokens: [
    { name: "--primary", color: "#262626" },
    { name: "--secondary", color: "#F0F0F0", border: true },
    { name: "--information", color: "#B392F0" },
    { name: "--success", color: "#14B8A6" },
    { name: "--warning", color: "#F97316" },
    { name: "--error", color: "#D5143E" },
    { name: "--progress", color: "#3B82F6" },
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
