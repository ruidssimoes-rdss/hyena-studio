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
// SHARED                                                               //
// ================================================================== //

const btnStyle: React.CSSProperties = {
  height: "28px",
  padding: "0 10.8px",
  borderRadius: "10px",
  border: "0.8px solid #F0F0F0",
  fontSize: "12.3px",
  fontWeight: 500,
  cursor: "pointer",
  background: "white",
  color: "#262626",
}

const inputStyle: React.CSSProperties = {
  height: "28px",
  padding: "0 10px",
  borderRadius: "10px",
  border: "0.8px solid #F0F0F0",
  fontSize: "13px",
  fontWeight: 400,
  color: "#262626",
  outline: "none",
  background: "white",
  width: "100%",
}

// ================================================================== //
// SECTIONS                                                             //
// ================================================================== //

function HorizontalSection() {
  return (
    <PreviewSection label="Horizontal">
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "8px" }}>
        <button style={btnStyle}>Cancel</button>
        <button style={btnStyle}>Save draft</button>
        <button style={{ ...btnStyle, background: "#262626", color: "#FFFFFF", border: "none" }}>
          Publish
        </button>
      </div>
    </PreviewSection>
  )
}

function VerticalSection() {
  return (
    <PreviewSection label="Vertical">
      <div style={{ width: "200px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <input style={inputStyle} placeholder="First name" />
        <input style={inputStyle} placeholder="Last name" />
        <input style={inputStyle} placeholder="Email" />
      </div>
    </PreviewSection>
  )
}

function WithSeparatorSection() {
  const badgeBase: React.CSSProperties = {
    height: "20px",
    padding: "0 6px",
    borderRadius: "10px",
    fontSize: "11px",
    fontWeight: 500,
    display: "inline-flex",
    alignItems: "center",
  }

  return (
    <PreviewSection label="With Separator">
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "8px" }}>
        <span style={{ ...badgeBase, background: "#F0F0F0", color: "#838383" }}>Draft</span>
        <div style={{ width: "0.8px", height: "20px", background: "#F0F0F0", flexShrink: 0 }} />
        <span style={{ ...badgeBase, border: "0.8px solid #F0F0F0", color: "#838383", background: "white" }}>
          v1.2.0
        </span>
        <div style={{ width: "0.8px", height: "20px", background: "#F0F0F0", flexShrink: 0 }} />
        <span style={{ fontSize: "12px", fontWeight: 400, color: "#838383" }}>Updated 2h ago</span>
      </div>
    </PreviewSection>
  )
}

function AttachedSection() {
  return (
    <PreviewSection label="Attached">
      {/* Attached buttons */}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button
          style={{
            height: "28px",
            padding: "0 10.8px",
            borderRadius: "10px 0 0 10px",
            border: "0.8px solid #F0F0F0",
            borderRight: "none",
            fontSize: "12.3px",
            fontWeight: 500,
            cursor: "pointer",
            background: "white",
            color: "#262626",
          }}
        >
          Bold
        </button>
        <button
          style={{
            height: "28px",
            padding: "0 10.8px",
            borderRadius: "0",
            border: "0.8px solid #F0F0F0",
            borderRight: "none",
            fontSize: "12.3px",
            fontWeight: 500,
            cursor: "pointer",
            background: "white",
            color: "#262626",
          }}
        >
          Italic
        </button>
        <button
          style={{
            height: "28px",
            padding: "0 10.8px",
            borderRadius: "0 10px 10px 0",
            border: "0.8px solid #F0F0F0",
            fontSize: "12.3px",
            fontWeight: 500,
            cursor: "pointer",
            background: "white",
            color: "#262626",
          }}
        >
          Underline
        </button>
      </div>

      {/* Attached input + button */}
      <div style={{ display: "flex", flexDirection: "row", width: "280px" }}>
        <input
          style={{
            flex: 1,
            height: "28px",
            padding: "0 10px",
            borderRadius: "10px 0 0 10px",
            border: "0.8px solid #F0F0F0",
            borderRight: "none",
            fontSize: "13px",
            fontWeight: 400,
            color: "#262626",
            outline: "none",
            background: "white",
          }}
          placeholder="Search..."
        />
        <button
          style={{
            height: "28px",
            padding: "0 10.8px",
            borderRadius: "0 10px 10px 0",
            border: "0.8px solid #F0F0F0",
            fontSize: "12.3px",
            fontWeight: 500,
            cursor: "pointer",
            background: "#F0F0F0",
            color: "#262626",
          }}
        >
          Go
        </button>
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
      <HorizontalSection />
      <VerticalSection />
      <WithSeparatorSection />
      <AttachedSection />
    </div>
  )
}

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/group"
      importCode={`import { Group } from "@/components/ui/group"`}
      usageCode={`<Group direction="row" gap={8}>
  <Button variant="outline">Cancel</Button>
  <Button>Save</Button>
</Group>

{/* With separator */}
<Group separator={<Separator />}>
  <Badge>Draft</Badge>
  <Badge>v1.2.0</Badge>
</Group>`}
    />
  )
}

const PROPS: PropDef[] = [
  { prop: "direction", type: '"row" | "column"', defaultVal: '"row"' },
  { prop: "gap", type: "number", defaultVal: "8" },
  { prop: "align", type: '"start" | "center" | "end"', defaultVal: '"center"' },
  { prop: "wrap", type: "boolean", defaultVal: "false" },
  { prop: "separator", type: "ReactNode", defaultVal: "—" },
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Group"
      description="A layout utility that groups child elements in a row or column with consistent spacing."
      props={PROPS}
    />
  )
}

const CAP_DATA: CAPData = {
  type: "Primitive",
  variants: "4",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Frame", href: "/components/frame" },
    { label: "Toolbar", href: "/components/toolbar" },
  ],
  tokens: [
    { name: "--border", color: "#F0F0F0", border: true },
  ],
}

export function GroupPage() {
  return (
    <ComponentPageLayout
      name="Group"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
