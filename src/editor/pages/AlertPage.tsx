"use client"

import {
  ComponentPageLayout,
  ComponentCAP,
  LabelPill,
  StandardCodeTab,
  StandardApiTab,
  type CAPData,
  type PropDef,
} from "@/editor/components/PageShell"
import { CircleAlert } from "lucide-react"

// ================================================================== //
// PREVIEW — 2×4 grid of alert cards matching Figma exactly            //
// ================================================================== //

interface AlertCardData {
  title: string
  desc: string
  color: string       // icon, title, description color
  bg: string           // card background
  border: string       // card border color
}

const ALERT_CARDS: AlertCardData[] = [
  // Row 1
  {
    title: "Heads up!",
    desc: "You can add components to your app using the CLI.",
    color: "#262626",
    bg: "#ffffff",
    border: "#f0f0f0",
  },
  {
    title: "Information",
    desc: "A new version of the CLI is available.",
    color: "#B392F0",
    bg: "rgba(179,146,240,0.05)",
    border: "#B392F0",
  },
  // Row 2
  {
    title: "Success",
    desc: "Your changes have been saved successfully.",
    color: "#14B8A6",
    bg: "rgba(20,184,166,0.05)",
    border: "#14B8A6",
  },
  {
    title: "Progress",
    desc: "\u201CUploading\u2026 67%\u201D, complete (ETA 45s)\u201D.",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.05)",
    border: "#3B82F6",
  },
  // Row 3
  {
    title: "Warning",
    desc: "Your free trial expires in 3 days.",
    color: "#F97316",
    bg: "rgba(249,115,22,0.05)",
    border: "#F97316",
  },
  {
    title: "Error",
    desc: "Something went wrong. Please try again.",
    color: "#D5143E",
    bg: "rgba(213,20,62,0.05)",
    border: "#D5143E",
  },
  // Row 4
  {
    title: "Destructive",
    desc: "Delete project? This cannot be undone.",
    color: "#D5143E",
    bg: "rgba(213,20,62,0.25)",
    border: "#D5143E",
  },
  {
    title: "Loading",
    desc: 'Use present continuous tense (\u201CSaving\u2026\u201D, \u201CProcessing\u2026\u201D)',
    color: "#838383",
    bg: "rgba(131,131,131,0.05)",
    border: "#838383",
  },
]

function AlertCard({ data }: { data: AlertCardData }) {
  const descColor = data.color === "#262626" ? "rgba(38,38,38,0.7)" : data.color
  return (
    <div
      className="flex flex-col items-start"
      style={{
        width: "240px",
        minWidth: "240px",
        maxWidth: "240px",
        padding: "10px",
        gap: "6px",
        background: data.bg,
        border: `0.8px solid ${data.border}`,
        borderRadius: "10px",
        flex: "1",
      }}
    >
      {/* Title row with icon */}
      <div className="flex items-center" style={{ gap: "3px" }}>
        <CircleAlert style={{ width: "18px", height: "18px", color: data.color, flexShrink: 0 }} />
        <span style={{ fontSize: "13px", fontWeight: 500, lineHeight: "18px", color: data.color }}>
          {data.title}
        </span>
      </div>
      {/* Description row — icon spacer + text */}
      <div className="flex items-start" style={{ gap: "3px", alignSelf: "stretch" }}>
        {/* Invisible spacer matching icon width */}
        <div style={{ width: "18px", height: "18px", flexShrink: 0, opacity: 0 }} />
        <span style={{ fontSize: "13px", fontWeight: 400, lineHeight: "18px", color: descColor, flex: 1 }}>
          {data.desc}
        </span>
      </div>
    </div>
  )
}

function VariantsSection() {
  return (
    <div>
      <LabelPill text="Variants" />
      <div
        className="flex items-center justify-center"
        style={{
          marginTop: "7px",
          border: "1px solid #f0f0f0",
          borderRadius: "10px",
          background: "white",
          padding: "35px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "490px",
          }}
        >
          {/* 4 rows of 2 */}
          {[0, 1, 2, 3].map((row) => (
            <div key={row} className="flex" style={{ gap: "10px" }}>
              <AlertCard data={ALERT_CARDS[row * 2]} />
              <AlertCard data={ALERT_CARDS[row * 2 + 1]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <VariantsSection />
    </div>
  )
}

// ================================================================== //
// CODE                                                                 //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/alert"
      importCode={`import { Alert, AlertTitle, AlertDescription } from "@hyena/alert"`}
      usageCode={`<Alert variant="info">\n  <AlertTitle>Information</AlertTitle>\n  <AlertDescription>\n    A new version is available.\n  </AlertDescription>\n</Alert>\n\n<Alert variant="destructive">\n  <AlertTitle>Error</AlertTitle>\n  <AlertDescription>\n    Something went wrong.\n  </AlertDescription>\n</Alert>`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const ALERT_PROPS: PropDef[] = [
  { prop: "variant", type: '"default" | "info" | "success" | "warning" | "error" | "destructive" | "progress" | "loading"', defaultVal: '"default"' },
  { prop: "className", type: "string", defaultVal: "—" },
  { prop: "children", type: "React.ReactNode", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Alert"
      description="A callout for important messages with semantic variants."
      props={ALERT_PROPS}
    />
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Composite",
  variants: "8",
  sizes: "—",
  deps: "cva, cn",
  related: [
    { label: "Badge", href: "/components/badge" },
    { label: "Toast", href: "/components/toast" },
    { label: "Card", href: "/components/card" },
  ],
  tokens: [
    { name: "--border", color: "#e4e4e7", border: true },
    { name: "--info", color: "#B392F0" },
    { name: "--success", color: "#14B8A6" },
    { name: "--warning", color: "#F97316" },
    { name: "--destructive", color: "#D5143E" },
    { name: "--surface", color: "#ffffff", border: true },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function AlertPage() {
  return (
    <ComponentPageLayout
      name="Alert"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
