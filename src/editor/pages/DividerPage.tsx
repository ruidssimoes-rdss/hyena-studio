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

function HorizontalSection() {
  return (
    <PreviewSection label="Horizontal" wrapClassName="flex flex-col items-stretch gap-[10px] w-full">
      <span style={{ fontSize: "12.3px", color: "#262626", textAlign: "center" }}>
        Section A
      </span>
      <div style={{ width: "100%", height: "1px", background: "#f0f0f0" }} />
      <span style={{ fontSize: "12.3px", color: "#262626", textAlign: "center" }}>
        Section B
      </span>
    </PreviewSection>
  )
}

function VerticalSection() {
  return (
    <PreviewSection label="Vertical">
      <div className="flex items-center justify-center" style={{ gap: "16px" }}>
        <span style={{ fontSize: "12.3px", color: "#262626" }}>Left</span>
        <div style={{ width: "1px", height: "40px", background: "#f0f0f0" }} />
        <span style={{ fontSize: "12.3px", color: "#262626" }}>Right</span>
      </div>
    </PreviewSection>
  )
}

function WithLabelSection() {
  return (
    <PreviewSection label="With Label" wrapClassName="flex flex-col items-stretch gap-[10px] w-full">
      <div style={{ width: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "100%", height: "1px", background: "#f0f0f0" }} />
        <span
          style={{
            position: "absolute",
            background: "white",
            padding: "0 12px",
            fontSize: "12.3px",
            color: "#727272",
          }}
        >
          or
        </span>
      </div>
    </PreviewSection>
  )
}

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <HorizontalSection />
      <VerticalSection />
      <WithLabelSection />
    </div>
  )
}

// ================================================================== //
// CODE                                                                 //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/divider"
      importCode={`import { Divider } from "@hyena/divider"`}
      usageCode={`<Divider />\n\n<Divider orientation="vertical" />`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const DIVIDER_PROPS: PropDef[] = [
  { prop: "orientation", type: '"horizontal" | "vertical"', defaultVal: '"horizontal"' },
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Divider"
      description="A visual separator between content sections."
      props={DIVIDER_PROPS}
    />
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Primitive",
  variants: "2",
  sizes: "—",
  deps: "cn",
  related: [
    { label: "Separator", href: "/components/separator" },
    { label: "Card", href: "/components/card" },
    { label: "Frame", href: "/components/frame" },
  ],
  tokens: [
    { name: "--border", color: "#e4e4e7", border: true },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function DividerPage() {
  return (
    <ComponentPageLayout
      name="Divider"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
