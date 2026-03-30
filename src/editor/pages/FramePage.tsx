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
// SECTIONS                                                             //
// ================================================================== //

const textStyle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 400,
  color: "rgba(38,38,38,0.7)",
  lineHeight: "18px",
}

function DefaultSection() {
  return (
    <PreviewSection label="Default">
      <div
        style={{
          width: "340px",
          border: "0.8px solid #F0F0F0",
          borderRadius: "10px",
          padding: "16px",
        }}
      >
        <span style={textStyle}>A basic frame with default styling.</span>
      </div>
    </PreviewSection>
  )
}

function VariantsSection() {
  return (
    <PreviewSection label="Variants">
      {/* Outlined */}
      <div
        style={{
          width: "340px",
          border: "0.8px solid #F0F0F0",
          borderRadius: "10px",
          padding: "16px",
          background: "transparent",
        }}
      >
        <span style={textStyle}>Outlined frame.</span>
      </div>
      {/* Filled */}
      <div
        style={{
          width: "340px",
          border: "none",
          borderRadius: "10px",
          padding: "16px",
          background: "#F5F5F5",
        }}
      >
        <span style={textStyle}>Filled frame.</span>
      </div>
      {/* Ghost */}
      <div
        style={{
          width: "340px",
          border: "0.8px dashed #E8E8E8",
          borderRadius: "10px",
          padding: "16px",
          background: "transparent",
        }}
      >
        <span style={{ ...textStyle, color: "#838383" }}>Ghost frame — no visual container.</span>
      </div>
    </PreviewSection>
  )
}

function NestedSection() {
  return (
    <PreviewSection label="Nested">
      <div
        style={{
          width: "340px",
          border: "0.8px solid #F0F0F0",
          borderRadius: "10px",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <div
          style={{
            border: "0.8px solid #F0F0F0",
            borderRadius: "8px",
            padding: "12px",
          }}
        >
          <span style={textStyle}>Nested frame 1</span>
        </div>
        <div
          style={{
            border: "0.8px solid #F0F0F0",
            borderRadius: "8px",
            padding: "12px",
          }}
        >
          <span style={textStyle}>Nested frame 2</span>
        </div>
      </div>
    </PreviewSection>
  )
}

function AsPanelSection() {
  return (
    <PreviewSection label="As Panel">
      <div
        style={{
          width: "340px",
          border: "0.8px solid #F0F0F0",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "12px",
            borderBottom: "0.8px solid #F0F0F0",
            fontSize: "13px",
            fontWeight: 500,
            color: "#262626",
          }}
        >
          Settings
        </div>
        <div style={{ padding: "12px" }}>
          <span style={{ fontSize: "12.3px", fontWeight: 400, color: "rgba(38,38,38,0.7)" }}>
            Configure your preferences below.
          </span>
        </div>
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
      <VariantsSection />
      <NestedSection />
      <AsPanelSection />
    </div>
  )
}

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/frame"
      importCode={`import { Frame } from "@/components/ui/frame"`}
      usageCode={`<Frame>
  Default outlined frame.
</Frame>

<Frame variant="filled" padding="lg">
  Filled frame with large padding.
</Frame>`}
    />
  )
}

const PROPS: PropDef[] = [
  { prop: "variant", type: '"outlined" | "filled" | "ghost"', defaultVal: '"outlined"' },
  { prop: "padding", type: '"none" | "sm" | "default" | "lg"', defaultVal: '"default"' },
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Frame"
      description="A generic container component with border, radius, and padding. The building block for cards, panels, and sections."
      props={PROPS}
    />
  )
}

const CAP_DATA: CAPData = {
  type: "Primitive",
  variants: "3 (outlined, filled, ghost)",
  sizes: "4 (none, sm, default, lg)",
  deps: "cn",
  related: [
    { label: "Card", href: "/components/card" },
    { label: "Group", href: "/components/group" },
  ],
  tokens: [
    { name: "--border", color: "#F0F0F0", border: true },
    { name: "--secondary", color: "#F5F5F5" },
    { name: "--radius", color: "#e4e4e7", border: true },
  ],
}

export function FramePage() {
  return (
    <ComponentPageLayout
      name="Frame"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
