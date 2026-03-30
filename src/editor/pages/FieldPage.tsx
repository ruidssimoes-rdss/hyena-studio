"use client"

import { useState } from "react"
import {
  ComponentPageLayout,
  ComponentCAP,
  PreviewSection,
  StandardCodeTab,
  StandardApiTab,
  PropsTable,
  LabelPill,
  type CAPData,
  type PropDef,
} from "@/editor/components/PageShell"

// ================================================================== //
// SHARED FIELD PARTS                                                   //
// ================================================================== //

const labelStyle: React.CSSProperties = {
  fontSize: "12.3px",
  fontWeight: 500,
  color: "#262626",
  marginBottom: "4px",
  display: "flex",
  alignItems: "center",
}

const hintStyle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 400,
  color: "#838383",
  marginTop: "4px",
}

const errorStyle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 400,
  color: "#D5143E",
  marginTop: "4px",
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

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none" as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%23838383' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 10px center",
  paddingRight: "28px",
}

// ================================================================== //
// SECTIONS                                                             //
// ================================================================== //

function WithInputSection() {
  return (
    <PreviewSection label="With Input">
      <div style={{ width: "320px" }}>
        <div style={labelStyle}>Email address</div>
        <input style={inputStyle} placeholder="you@example.com" />
        <div style={hintStyle}>We&apos;ll never share your email.</div>
      </div>
    </PreviewSection>
  )
}

function WithErrorSection() {
  return (
    <PreviewSection label="With Error">
      <div style={{ width: "320px" }}>
        <div style={labelStyle}>Email address</div>
        <input
          style={{ ...inputStyle, borderColor: "#D5143E" }}
          defaultValue="not-an-email"
        />
        <div style={errorStyle}>Please enter a valid email address.</div>
      </div>
    </PreviewSection>
  )
}

function WithSelectSection() {
  return (
    <PreviewSection label="With Select">
      <div style={{ width: "320px" }}>
        <div style={labelStyle}>Country</div>
        <select style={selectStyle} defaultValue="">
          <option value="" disabled>Select a country</option>
          <option value="nl">Netherlands</option>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
        </select>
        <div style={hintStyle}>Select your country of residence.</div>
      </div>
    </PreviewSection>
  )
}

function RequiredSection() {
  return (
    <PreviewSection label="Required">
      <div style={{ width: "320px" }}>
        <div style={labelStyle}>
          Full name
          <span style={{ color: "#D5143E", marginLeft: "2px" }}>*</span>
        </div>
        <input style={inputStyle} placeholder="Enter your full name" />
      </div>
    </PreviewSection>
  )
}

function WithCharacterCountSection() {
  const [value, setValue] = useState("")
  const max = 280
  const len = value.length
  const counterColor = len >= 270 ? "#D5143E" : len >= 240 ? "#F97316" : "#838383"

  return (
    <PreviewSection label="With Character Count">
      <div style={{ width: "320px" }}>
        <div style={labelStyle}>Bio</div>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={max}
          placeholder="Tell us about yourself..."
          style={{
            width: "100%",
            height: "80px",
            padding: "8px 10px",
            borderRadius: "10px",
            border: "0.8px solid #F0F0F0",
            fontSize: "13px",
            fontWeight: 400,
            color: "#262626",
            outline: "none",
            resize: "none",
            fontFamily: "inherit",
            background: "white",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
          <span style={hintStyle}>Write a short bio.</span>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 400,
              color: counterColor,
              fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
              transition: "color 150ms ease",
            }}
          >
            {len}/{max}
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
      <WithInputSection />
      <WithErrorSection />
      <WithSelectSection />
      <RequiredSection />
      <WithCharacterCountSection />
    </div>
  )
}

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/field"
      importCode={`import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field"`}
      usageCode={`<Field>
  <FieldLabel>Email address</FieldLabel>
  <Input placeholder="you@example.com" />
  <FieldDescription>
    We'll never share your email.
  </FieldDescription>
</Field>`}
    />
  )
}

const FIELD_PROPS: PropDef[] = [
  { prop: "error", type: "boolean", defaultVal: "false" },
  { prop: "className", type: "string", defaultVal: "—" },
]

const LABEL_PROPS: PropDef[] = [
  { prop: "required", type: "boolean", defaultVal: "false" },
]

const DESC_PROPS: PropDef[] = [
  { prop: "children", type: "string | ReactNode", defaultVal: "—" },
]

const ERROR_PROPS: PropDef[] = [
  { prop: "children", type: "string | ReactNode", defaultVal: "—" },
]

function ApiTab() {
  return (
    <div>
      <h2 style={{ fontSize: "16px", fontWeight: 500, color: "#262626", marginBottom: "4px" }}>Field</h2>
      <p style={{ fontSize: "12.3px", fontWeight: 400, color: "#727272", lineHeight: 1.6, marginBottom: "24px" }}>
        A wrapper for form controls that provides a label, optional description, and error message.
      </p>
      <LabelPill text="Field Props" />
      <div style={{ marginTop: "12px", width: "100%", marginBottom: "24px" }}><PropsTable props={FIELD_PROPS} /></div>
      <LabelPill text="FieldLabel Props" />
      <div style={{ marginTop: "12px", width: "100%", marginBottom: "24px" }}><PropsTable props={LABEL_PROPS} /></div>
      <LabelPill text="FieldDescription Props" />
      <div style={{ marginTop: "12px", width: "100%", marginBottom: "24px" }}><PropsTable props={DESC_PROPS} /></div>
      <LabelPill text="FieldError Props" />
      <div style={{ marginTop: "12px", width: "100%" }}><PropsTable props={ERROR_PROPS} /></div>
    </div>
  )
}

const CAP_DATA: CAPData = {
  type: "Composite",
  variants: "5",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Input", href: "/components/input" },
    { label: "Select", href: "/components/select" },
    { label: "Checkbox", href: "/components/checkbox" },
  ],
  tokens: [
    { name: "--foreground", color: "#262626" },
    { name: "--muted-fg", color: "#838383" },
    { name: "--error", color: "#D5143E" },
  ],
}

export function FieldPage() {
  return (
    <ComponentPageLayout
      name="Field"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
