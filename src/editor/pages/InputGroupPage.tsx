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
import { Search, ArrowRight, Copy, Share2 } from "lucide-react"

// ================================================================== //
// STYLES                                                               //
// ================================================================== //

const groupStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  border: "0.8px solid #F0F0F0",
  borderRadius: "10px",
  overflow: "hidden",
  height: "28px",
}

const prefixStyle: React.CSSProperties = {
  background: "#F5F5F5",
  borderRight: "0.8px solid #F0F0F0",
  padding: "0 10px",
  display: "flex",
  alignItems: "center",
  fontSize: "12.3px",
  fontWeight: 400,
  color: "#838383",
  flexShrink: 0,
  whiteSpace: "nowrap",
}

const suffixStyle: React.CSSProperties = {
  background: "#F5F5F5",
  borderLeft: "0.8px solid #F0F0F0",
  padding: "0 10px",
  display: "flex",
  alignItems: "center",
  fontSize: "12.3px",
  fontWeight: 400,
  color: "#838383",
  flexShrink: 0,
  whiteSpace: "nowrap",
}

const inputStyle: React.CSSProperties = {
  flex: 1,
  border: "none",
  padding: "0 10px",
  fontSize: "12.3px",
  fontWeight: 400,
  color: "#262626",
  outline: "none",
  background: "transparent",
  fontFamily: "inherit",
}

// ================================================================== //
// PREVIEW                                                              //
// ================================================================== //

function WithPrefixSection() {
  return (
    <PreviewSection label="With Prefix" wrapClassName="flex flex-col items-center gap-[12px] w-full">
      <div style={{ ...groupStyle, width: "320px" }}>
        <div style={prefixStyle}>https://</div>
        <input type="text" placeholder="example.com" style={inputStyle} />
      </div>
      <div style={{ ...groupStyle, width: "320px" }}>
        <div style={prefixStyle}>$</div>
        <input type="text" placeholder="0.00" style={inputStyle} />
      </div>
      <div style={{ ...groupStyle, width: "320px" }}>
        <div style={prefixStyle}>
          <Search style={{ width: "14px", height: "14px", color: "#838383" }} />
        </div>
        <input type="text" placeholder="Search..." style={inputStyle} />
      </div>
    </PreviewSection>
  )
}

function WithSuffixSection() {
  return (
    <PreviewSection label="With Suffix" wrapClassName="flex flex-col items-center gap-[12px] w-full">
      <div style={{ ...groupStyle, width: "320px" }}>
        <input type="text" placeholder="Email" style={inputStyle} />
        <div style={suffixStyle}>@hyena.studio</div>
      </div>
      <div style={{ ...groupStyle, width: "320px" }}>
        <input type="text" placeholder="Weight" style={inputStyle} />
        <div style={suffixStyle}>kg</div>
      </div>
    </PreviewSection>
  )
}

function WithBothSection() {
  return (
    <PreviewSection label="With Both" wrapClassName="flex flex-col items-center gap-[12px] w-full">
      <div style={{ ...groupStyle, width: "320px" }}>
        <div style={prefixStyle}>$</div>
        <input type="text" placeholder="0.00" style={inputStyle} />
        <div style={suffixStyle}>USD</div>
      </div>
    </PreviewSection>
  )
}

function WithButtonSection() {
  return (
    <PreviewSection label="With Button" wrapClassName="flex flex-col items-center gap-[12px] w-full">
      <div style={{ ...groupStyle, width: "320px" }}>
        <input type="text" placeholder="Enter code" style={inputStyle} />
        <button
          style={{
            background: "#262626",
            color: "#FFFFFF",
            borderLeft: "0.8px solid #262626",
            padding: "0 12px",
            fontSize: "12.3px",
            fontWeight: 500,
            cursor: "pointer",
            border: "none",
            borderLeftStyle: "solid",
            borderLeftWidth: "0.8px",
            borderLeftColor: "#262626",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          Apply
        </button>
      </div>
      <div style={{ ...groupStyle, width: "320px" }}>
        <input type="text" placeholder="Search..." style={inputStyle} />
        <button
          style={{
            background: "#F5F5F5",
            borderLeft: "0.8px solid #F0F0F0",
            width: "28px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            borderLeftStyle: "solid",
            borderLeftWidth: "0.8px",
            borderLeftColor: "#F0F0F0",
            height: "100%",
          }}
        >
          <ArrowRight style={{ width: "14px", height: "14px", color: "#838383" }} />
        </button>
      </div>
    </PreviewSection>
  )
}

function AttachedMultiButtonSection() {
  return (
    <PreviewSection label="Attached Multi-Button" wrapClassName="flex flex-col items-center gap-[12px] w-full">
      <div style={{ ...groupStyle, width: "320px" }}>
        <input type="text" placeholder="https://hyena.studio/share/..." style={inputStyle} />
        <button
          style={{
            background: "#F5F5F5",
            borderLeft: "0.8px solid #F0F0F0",
            width: "28px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            borderLeftStyle: "solid",
            borderLeftWidth: "0.8px",
            borderLeftColor: "#F0F0F0",
            height: "100%",
          }}
        >
          <Copy style={{ width: "14px", height: "14px", color: "#838383" }} />
        </button>
        <button
          style={{
            background: "#F5F5F5",
            borderLeft: "0.8px solid #F0F0F0",
            width: "28px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            borderLeftStyle: "solid",
            borderLeftWidth: "0.8px",
            borderLeftColor: "#F0F0F0",
            height: "100%",
          }}
        >
          <Share2 style={{ width: "14px", height: "14px", color: "#838383" }} />
        </button>
      </div>
    </PreviewSection>
  )
}

function PreviewContent() {
  return (
    <div className="flex flex-col" style={{ gap: "20px" }}>
      <WithPrefixSection />
      <WithSuffixSection />
      <WithBothSection />
      <WithButtonSection />
      <AttachedMultiButtonSection />
    </div>
  )
}

// ================================================================== //
// CODE                                                                 //
// ================================================================== //

const importCode = `import { InputGroup, InputPrefix, InputSuffix } from "@/components/ui/input-group"`

const usageCode = `<InputGroup>
  <InputPrefix>https://</InputPrefix>
  <input placeholder="example.com" />
</InputGroup>

<InputGroup>
  <input placeholder="Email" />
  <InputSuffix>@hyena.studio</InputSuffix>
</InputGroup>

<InputGroup>
  <InputPrefix>$</InputPrefix>
  <input placeholder="0.00" />
  <InputSuffix>USD</InputSuffix>
</InputGroup>`

function CodeContent() {
  return (
    <StandardCodeTab
      packageName="@hyena/input-group"
      importCode={importCode}
      usageCode={usageCode}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const inputGroupProps: PropDef[] = [
  { prop: "className", type: "string", defaultVal: "—" },
]

const addonProps: PropDef[] = [
  { prop: "className", type: "string", defaultVal: "—" },
  { prop: "children", type: "ReactNode", defaultVal: "—" },
]

function ApiContent() {
  return (
    <StandardApiTab
      name="InputGroup"
      description="A container that composes prefix, suffix, and input elements into a unified group with shared borders and styling."
      props={inputGroupProps}
      extraSections={
        <div style={{ marginTop: "28px" }}>
          <StandardApiTab
            name="InputPrefix / InputSuffix"
            description="Addon elements rendered before or after the input within the group."
            props={addonProps}
          />
        </div>
      }
    />
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const capData: CAPData = {
  type: "Composite",
  variants: "5",
  sizes: "1",
  deps: "cn, lucide-react",
  related: [
    { label: "Input", href: "/components/input" },
    { label: "Field", href: "/components/field" },
    { label: "Group", href: "/components/group" },
  ],
  tokens: [
    { name: "--border", color: "#F0F0F0", border: true },
    { name: "--secondary", color: "#F5F5F5" },
    { name: "--muted-fg", color: "#838383" },
  ],
}

// ================================================================== //
// PAGE                                                                 //
// ================================================================== //

export function InputGroupPage() {
  return (
    <ComponentPageLayout
      name="Input Group"
      capContent={<ComponentCAP data={capData} />}
      previewContent={<PreviewContent />}
      codeContent={<CodeContent />}
      apiContent={<ApiContent />}
    />
  )
}
