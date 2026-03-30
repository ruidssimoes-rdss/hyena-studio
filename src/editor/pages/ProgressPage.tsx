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
// PROGRESS BAR PRIMITIVE                                               //
// ================================================================== //

function ProgressBar({
  value,
  color = "#262626",
  height = 6,
}: {
  value: number
  color?: string
  height?: number
}) {
  const r = height / 2
  return (
    <div
      style={{
        width: "100%",
        height: `${height}px`,
        background: "#F0F0F0",
        borderRadius: `${r}px`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          height: "100%",
          background: color,
          borderRadius: `${r}px`,
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.1) 6px, rgba(255,255,255,0.1) 12px)",
        }}
      />
    </div>
  )
}

// ================================================================== //
// SECTIONS                                                             //
// ================================================================== //

function DefaultSection() {
  return (
    <PreviewSection label="Default">
      <div style={{ width: "300px" }}>
        <ProgressBar value={45} />
      </div>
    </PreviewSection>
  )
}

function AnimatedSection() {
  return (
    <PreviewSection label="Animated">
      <div style={{ width: "300px", height: "6px", background: "#F0F0F0", borderRadius: "3px", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            background: "#262626",
            borderRadius: "3px",
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.1) 6px, rgba(255,255,255,0.1) 12px)",
            animation: "progress-fill 3s ease-in-out infinite",
          }}
        />
      </div>
      <style>{`
        @keyframes progress-fill {
          0% { width: 0%; }
          90% { width: 100%; }
          90.01% { width: 0%; }
          100% { width: 0%; }
        }
      `}</style>
    </PreviewSection>
  )
}

function IndeterminateSection() {
  return (
    <PreviewSection label="Indeterminate">
      <div style={{ width: "300px", height: "6px", background: "#F0F0F0", borderRadius: "3px", overflow: "hidden", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            width: "30%",
            height: "100%",
            background: "#262626",
            borderRadius: "3px",
            animation: "progress-indeterminate 1.5s ease-in-out infinite",
          }}
        />
      </div>
      <style>{`
        @keyframes progress-indeterminate {
          0% { left: -30%; }
          100% { left: 100%; }
        }
      `}</style>
    </PreviewSection>
  )
}

function SizesSection() {
  return (
    <PreviewSection label="Sizes">
      <div style={{ width: "300px" }}><ProgressBar value={60} height={4} /></div>
      <div style={{ width: "300px" }}><ProgressBar value={60} height={6} /></div>
      <div style={{ width: "300px" }}><ProgressBar value={60} height={8} /></div>
    </PreviewSection>
  )
}

function WithLabelSection() {
  const items = [
    { label: "Uploading files", value: "3 of 8", pct: 37.5, color: "#262626" },
    { label: "Processing", value: "67%", pct: 67, color: "#3B82F6" },
    { label: "Complete", value: "Done", pct: 100, color: "#14B8A6" },
  ]
  return (
    <PreviewSection label="With Label">
      {items.map((item) => (
        <div key={item.label} style={{ width: "300px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{ fontSize: "12.3px", fontWeight: 500, color: "#262626" }}>{item.label}</span>
            <span style={{ fontSize: "12px", fontWeight: 400, color: "#838383", fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}>
              {item.value}
            </span>
          </div>
          <ProgressBar value={item.pct} color={item.color} />
        </div>
      ))}
    </PreviewSection>
  )
}

// ================================================================== //
// TABS                                                                 //
// ================================================================== //

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <DefaultSection />
      <AnimatedSection />
      <IndeterminateSection />
      <SizesSection />
      <WithLabelSection />
    </div>
  )
}

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/progress"
      importCode={`import { Progress } from "@/components/ui/progress"`}
      usageCode={`<Progress value={45} />

{/* Indeterminate */}
<Progress />

{/* Animated */}
<Progress value={67} animated />`}
    />
  )
}

const PROPS: PropDef[] = [
  { prop: "value", type: "number (0–100)", defaultVal: "— (indeterminate)" },
  { prop: "size", type: '"sm" | "default" | "lg"', defaultVal: '"default"' },
  { prop: "animated", type: "boolean", defaultVal: "false" },
  { prop: "label", type: "string", defaultVal: "—" },
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Progress"
      description="A visual indicator showing task completion. Omit value for indeterminate state."
      props={PROPS}
    />
  )
}

const CAP_DATA: CAPData = {
  type: "Primitive",
  variants: "5",
  sizes: "3 (sm, default, lg)",
  deps: "cn",
  related: [
    { label: "Meter", href: "/components/meter" },
    { label: "Spinner", href: "/components/spinner" },
  ],
  tokens: [
    { name: "--primary", color: "#262626" },
    { name: "--secondary", color: "#F0F0F0", border: true },
    { name: "--success", color: "#14B8A6" },
    { name: "--progress", color: "#3B82F6" },
  ],
}

export function ProgressPage() {
  return (
    <ComponentPageLayout
      name="Progress"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
