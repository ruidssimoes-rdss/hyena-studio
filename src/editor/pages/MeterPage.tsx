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
// METER PRIMITIVE                                                      //
// ================================================================== //

function MeterBar({
  value,
  color = "#262626",
  height = 6,
}: {
  value: number
  color?: string
  height?: number
}) {
  return (
    <div
      style={{
        width: "100%",
        height: `${height}px`,
        background: "#F0F0F0",
        borderRadius: `${height / 2}px`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          height: "100%",
          background: color,
          borderRadius: `${height / 2}px`,
          transition: "width 300ms ease",
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
        <MeterBar value={60} />
      </div>
    </PreviewSection>
  )
}

function ColoursSection() {
  const items = [
    { value: 20, color: "#D5143E", label: "Weak" },
    { value: 50, color: "#F97316", label: "Fair" },
    { value: 75, color: "#3B82F6", label: "Good" },
    { value: 100, color: "#14B8A6", label: "Excellent" },
  ]
  return (
    <PreviewSection label="Colours">
      {items.map((item) => (
        <div key={item.label} style={{ width: "300px" }}>
          <MeterBar value={item.value} color={item.color} />
          <div style={{ fontSize: "11px", fontWeight: 400, color: item.color, marginTop: "4px" }}>
            {item.label}
          </div>
        </div>
      ))}
    </PreviewSection>
  )
}

function WithLabelSection() {
  return (
    <PreviewSection label="With Label">
      <div style={{ width: "300px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
          <span style={{ fontSize: "12.3px", fontWeight: 500, color: "#262626" }}>Storage</span>
          <span style={{ fontSize: "12px", fontWeight: 400, color: "#838383", fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}>
            4.2 GB / 10 GB
          </span>
        </div>
        <MeterBar value={42} />
      </div>
      <div style={{ width: "300px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
          <span style={{ fontSize: "12.3px", fontWeight: 500, color: "#262626" }}>Password strength</span>
          <span style={{ fontSize: "12px", fontWeight: 400, color: "#838383", fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}>
            Strong
          </span>
        </div>
        <MeterBar value={90} color="#14B8A6" />
      </div>
    </PreviewSection>
  )
}

function SizesSection() {
  return (
    <PreviewSection label="Sizes">
      <div style={{ width: "300px" }}>
        <MeterBar value={60} height={4} />
      </div>
      <div style={{ width: "300px" }}>
        <MeterBar value={60} height={6} />
      </div>
      <div style={{ width: "300px" }}>
        <MeterBar value={60} height={8} />
      </div>
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
      <ColoursSection />
      <WithLabelSection />
      <SizesSection />
    </div>
  )
}

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/meter"
      importCode={`import { Meter } from "@/components/ui/meter"`}
      usageCode={`<Meter value={60} />

<Meter value={90} color="success" label="Strong" />`}
    />
  )
}

const PROPS: PropDef[] = [
  { prop: "value", type: "number (0–100)", defaultVal: "0" },
  { prop: "min", type: "number", defaultVal: "0" },
  { prop: "max", type: "number", defaultVal: "100" },
  { prop: "size", type: '"sm" | "default" | "lg"', defaultVal: '"default"' },
  { prop: "color", type: '"default" | "success" | "warning" | "error" | "progress"', defaultVal: '"default"' },
  { prop: "label", type: "string", defaultVal: "—" },
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Meter"
      description="A visual indicator showing a value within a known range. Used for password strength, disk usage, and similar bounded measurements."
      props={PROPS}
    />
  )
}

const CAP_DATA: CAPData = {
  type: "Primitive",
  variants: "4",
  sizes: "3 (sm, default, lg)",
  deps: "cn",
  related: [
    { label: "Progress", href: "/components/progress" },
    { label: "Slider", href: "/components/slider" },
  ],
  tokens: [
    { name: "--secondary", color: "#F0F0F0", border: true },
    { name: "--success", color: "#14B8A6" },
    { name: "--warning", color: "#F97316" },
    { name: "--error", color: "#D5143E" },
    { name: "--progress", color: "#3B82F6" },
  ],
}

export function MeterPage() {
  return (
    <ComponentPageLayout
      name="Meter"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
