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

const baseLabelStyle: React.CSSProperties = {
  fontSize: "12.3px",
  fontWeight: 500,
  color: "#262626",
  display: "inline-flex",
  alignItems: "center",
  cursor: "default",
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: "28px",
  padding: "0 10px",
  borderRadius: "10px",
  border: "0.8px solid #F0F0F0",
  fontSize: "13px",
  fontWeight: 400,
  color: "#262626",
  outline: "none",
  background: "white",
}

// ================================================================== //
// SECTIONS                                                             //
// ================================================================== //

function DefaultSection() {
  return (
    <PreviewSection label="Default">
      <span style={baseLabelStyle}>Email address</span>
      <span style={baseLabelStyle}>Password</span>
      <span style={baseLabelStyle}>Username</span>
    </PreviewSection>
  )
}

function WithInputSection() {
  return (
    <PreviewSection label="With Input">
      <div style={{ width: "320px" }}>
        <div style={{ ...baseLabelStyle, marginBottom: "4px" }}>Email</div>
        <input style={inputStyle} placeholder="you@example.com" />
      </div>
      <div style={{ width: "320px" }}>
        <div style={{ ...baseLabelStyle, marginBottom: "4px" }}>Password</div>
        <input style={inputStyle} type="password" placeholder="Enter password" />
      </div>
    </PreviewSection>
  )
}

function VariantsSection() {
  return (
    <PreviewSection label="Variants">
      {/* Default */}
      <span style={baseLabelStyle}>Email address</span>
      {/* Required */}
      <span style={baseLabelStyle}>
        Email address
        <span style={{ color: "#D5143E", marginLeft: "2px" }}>*</span>
      </span>
      {/* Optional */}
      <span style={baseLabelStyle}>
        Email address
        <span style={{ fontSize: "11px", fontWeight: 400, color: "#838383", marginLeft: "4px" }}>
          (optional)
        </span>
      </span>
      {/* Disabled */}
      <span style={{ ...baseLabelStyle, opacity: 0.5 }}>Email address</span>
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
      <WithInputSection />
      <VariantsSection />
    </div>
  )
}

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/label"
      importCode={`import { Label } from "@/components/ui/label"`}
      usageCode={`<Label htmlFor="email">Email address</Label>
<Input id="email" placeholder="you@example.com" />

{/* Required */}
<Label htmlFor="name" required>Full name</Label>`}
    />
  )
}

const PROPS: PropDef[] = [
  { prop: "htmlFor", type: "string", defaultVal: "—" },
  { prop: "required", type: "boolean", defaultVal: "false" },
  { prop: "optional", type: "boolean", defaultVal: "false" },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Label"
      description="A text label for form controls. Associates with an input via htmlFor for accessibility."
      props={PROPS}
    />
  )
}

const CAP_DATA: CAPData = {
  type: "Primitive",
  variants: "4 (default, required, optional, disabled)",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Field", href: "/components/field" },
    { label: "Input", href: "/components/input" },
  ],
  tokens: [
    { name: "--foreground", color: "#262626" },
    { name: "--error", color: "#D5143E" },
    { name: "--muted-fg", color: "#838383" },
  ],
}

export function LabelPage() {
  return (
    <ComponentPageLayout
      name="Label"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
