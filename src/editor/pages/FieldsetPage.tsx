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
// SHARED FIELD PARTS                                                   //
// ================================================================== //

const labelStyle: React.CSSProperties = {
  fontSize: "12.3px",
  fontWeight: 500,
  color: "#262626",
  marginBottom: "4px",
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

function FieldItem({ label, placeholder, disabled }: { label: string; placeholder: string; disabled?: boolean }) {
  return (
    <div>
      <div style={{ ...labelStyle, opacity: disabled ? 0.7 : 1 }}>{label}</div>
      <input
        style={{ ...inputStyle, opacity: disabled ? 0.5 : 1, cursor: disabled ? "not-allowed" : undefined }}
        placeholder={placeholder}
        disabled={disabled}
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
      <div style={{ width: "380px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#262626", marginBottom: "4px" }}>
          Personal Information
        </div>
        <div style={{ fontSize: "12.3px", fontWeight: 400, color: "#838383", marginBottom: "16px" }}>
          Please fill in your details below.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <FieldItem label="Full name" placeholder="Enter your full name" />
          <FieldItem label="Email" placeholder="you@example.com" />
          <FieldItem label="Phone" placeholder="+31 6 1234 5678" />
        </div>
      </div>
    </PreviewSection>
  )
}

function WithBorderSection() {
  return (
    <PreviewSection label="With Border">
      <div
        style={{
          width: "380px",
          border: "0.8px solid #F0F0F0",
          borderRadius: "10px",
          padding: "16px",
        }}
      >
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#262626", marginBottom: "4px" }}>
          Personal Information
        </div>
        <div style={{ fontSize: "12.3px", fontWeight: 400, color: "#838383", marginBottom: "16px" }}>
          Please fill in your details below.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <FieldItem label="Full name" placeholder="Enter your full name" />
          <FieldItem label="Email" placeholder="you@example.com" />
          <FieldItem label="Phone" placeholder="+31 6 1234 5678" />
        </div>
      </div>
    </PreviewSection>
  )
}

function DisabledSection() {
  return (
    <PreviewSection label="Disabled">
      <div style={{ width: "380px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#262626", marginBottom: "4px", opacity: 0.7 }}>
          Personal Information
        </div>
        <div style={{ fontSize: "12.3px", fontWeight: 400, color: "#838383", marginBottom: "16px", opacity: 0.7 }}>
          Please fill in your details below.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <FieldItem label="Full name" placeholder="Enter your full name" disabled />
          <FieldItem label="Email" placeholder="you@example.com" disabled />
          <FieldItem label="Phone" placeholder="+31 6 1234 5678" disabled />
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
      <WithBorderSection />
      <DisabledSection />
    </div>
  )
}

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/fieldset"
      importCode={`import {
  Fieldset,
  FieldsetLegend,
  FieldsetDescription,
} from "@/components/ui/fieldset"`}
      usageCode={`<Fieldset>
  <FieldsetLegend>Personal Information</FieldsetLegend>
  <FieldsetDescription>
    Please fill in your details below.
  </FieldsetDescription>
  <Field>
    <FieldLabel>Full name</FieldLabel>
    <Input placeholder="Enter your full name" />
  </Field>
</Fieldset>`}
    />
  )
}

const PROPS: PropDef[] = [
  { prop: "disabled", type: "boolean", defaultVal: "false" },
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Fieldset"
      description="A grouping container for related form fields with a shared legend and description."
      props={PROPS}
    />
  )
}

const CAP_DATA: CAPData = {
  type: "Composite",
  variants: "3",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Field", href: "/components/field" },
    { label: "Form", href: "/components/form" },
  ],
  tokens: [
    { name: "--foreground", color: "#262626" },
    { name: "--muted-fg", color: "#838383" },
    { name: "--border", color: "#F0F0F0", border: true },
  ],
}

export function FieldsetPage() {
  return (
    <ComponentPageLayout
      name="Fieldset"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
