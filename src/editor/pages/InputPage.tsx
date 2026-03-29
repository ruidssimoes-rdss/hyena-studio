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

const inputStyle: React.CSSProperties = {
  height: "28px",
  borderRadius: "10px",
  border: "0.8px solid #f0f0f0",
  padding: "0 10.8px",
  fontSize: "13px",
  color: "#262626",
  background: "white",
  outline: "none",
  width: "200px",
}

function VariantsSection() {
  return (
    <PreviewSection label="Variants">
      <input
        type="text"
        placeholder="Email address"
        style={inputStyle}
      />
      <input
        type="text"
        defaultValue="john@example.com"
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Disabled"
        disabled
        style={{ ...inputStyle, opacity: 0.5, cursor: "not-allowed" }}
      />
    </PreviewSection>
  )
}

function SizesSection() {
  return (
    <PreviewSection label="Sizes">
      <input
        type="text"
        placeholder="Small (200px)"
        style={{ ...inputStyle, width: "200px" }}
      />
      <input
        type="text"
        placeholder="Medium (300px)"
        style={{ ...inputStyle, width: "300px" }}
      />
      <input
        type="text"
        placeholder="Full width"
        style={{ ...inputStyle, width: "100%" }}
      />
    </PreviewSection>
  )
}

function StatesSection() {
  const states: Array<{
    label: string
    style: React.CSSProperties
    disabled?: boolean
  }> = [
    { label: "Default", style: {} },
    { label: "Focused", style: { boxShadow: "0 0 0 2px #ffffff, 0 0 0 4px #a1a1a1" } },
    { label: "Error", style: { border: "0.8px solid #d5143e" } },
    { label: "Disabled", style: { opacity: 0.5, cursor: "not-allowed" }, disabled: true },
  ]

  return (
    <PreviewSection label="States" wrapClassName="flex items-center justify-center w-full px-[35px]">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px 24px",
        }}
      >
        {states.map((state) => (
          <div key={state.label} className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Placeholder"
              disabled={state.disabled}
              style={{ ...inputStyle, width: "100%", ...state.style }}
            />
            <span
              style={{
                fontSize: "10px",
                fontWeight: 400,
                color: "#a1a1a1",
                marginTop: "6px",
                textAlign: "center",
              }}
            >
              {state.label}
            </span>
          </div>
        ))}
      </div>
    </PreviewSection>
  )
}

function WithLabelSection() {
  return (
    <PreviewSection label="With Label" height={300} wrapClassName="flex flex-col items-start justify-center gap-[20px] px-[35px] w-full">
      <div className="flex flex-col" style={{ gap: "4px", width: "300px" }}>
        <label
          style={{ fontSize: "12.3px", fontWeight: 500, color: "#262626" }}
        >
          Email
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          style={{ ...inputStyle, width: "100%" }}
        />
        <span style={{ fontSize: "11px", color: "#a1a1a1" }}>
          We&apos;ll never share your email.
        </span>
      </div>
      <div className="flex flex-col" style={{ gap: "4px", width: "300px" }}>
        <label
          style={{ fontSize: "12.3px", fontWeight: 500, color: "#262626" }}
        >
          Password
        </label>
        <input
          type="password"
          placeholder="Enter password"
          style={{ ...inputStyle, width: "100%" }}
        />
        <span style={{ fontSize: "11px", color: "#d5143e" }}>
          Password must be at least 8 characters.
        </span>
      </div>
    </PreviewSection>
  )
}

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <VariantsSection />
      <SizesSection />
      <StatesSection />
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
      packageName="@hyena/input"
      importCode={`import { Input } from "@hyena/input"`}
      usageCode={`<Input placeholder="Email" />`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const INPUT_PROPS: PropDef[] = [
  { prop: "type", type: "string", defaultVal: '"text"' },
  { prop: "placeholder", type: "string", defaultVal: "—" },
  { prop: "size", type: '"sm" | "md" | "lg"', defaultVal: '"md"' },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
  { prop: "error", type: "boolean | string", defaultVal: "false" },
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Input"
      description="A styled input field with size and error state support."
      props={INPUT_PROPS}
    />
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Primitive",
  variants: "3",
  sizes: "3",
  deps: "cn",
  related: [
    { label: "Button", href: "/components/button" },
    { label: "Select", href: "/components/select" },
    { label: "Field", href: "/components/field" },
  ],
  tokens: [
    { name: "--border", color: "#e4e4e7", border: true },
    { name: "--input", color: "#f0f0f0", border: true },
    { name: "--surface", color: "#ffffff", border: true },
    { name: "--foreground", color: "#262626" },
    { name: "--destructive", color: "#d5143e" },
    { name: "--radius", color: "#e4e4e7", border: true },
    { name: "--ring", color: "#a1a1a1" },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function InputPage() {
  return (
    <ComponentPageLayout
      name="Input"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
