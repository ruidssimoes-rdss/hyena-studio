"use client"

import { useState } from "react"
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
// TOGGLE COMPONENT                                                     //
// ================================================================== //

function PreviewToggle({
  defaultChecked = false,
  disabled = false,
}: {
  defaultChecked?: boolean
  disabled?: boolean
}) {
  const [checked, setChecked] = useState(defaultChecked)

  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && setChecked(!checked)}
      style={{
        position: "relative",
        width: "38px",
        height: "20px",
        borderRadius: "10px",
        background: checked ? "#262626" : "#f0f0f0",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "background 200ms",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "16px",
          height: "16px",
          borderRadius: "8px",
          background: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
          top: "2px",
          left: checked ? "20px" : "2px",
          transition: "left 200ms",
        }}
      />
    </button>
  )
}

// ================================================================== //
// PREVIEW                                                              //
// ================================================================== //

function DefaultSection() {
  return (
    <PreviewSection label="Default">
      <div className="flex items-center justify-center" style={{ gap: "16px" }}>
        <div className="flex flex-col items-center">
          <PreviewToggle />
          <span style={{ fontSize: "10px", fontWeight: 400, color: "#a1a1a1", marginTop: "6px" }}>
            Off
          </span>
        </div>
        <div className="flex flex-col items-center">
          <PreviewToggle defaultChecked />
          <span style={{ fontSize: "10px", fontWeight: 400, color: "#a1a1a1", marginTop: "6px" }}>
            On
          </span>
        </div>
        <div className="flex flex-col items-center">
          <PreviewToggle disabled />
          <span style={{ fontSize: "10px", fontWeight: 400, color: "#a1a1a1", marginTop: "6px" }}>
            Disabled
          </span>
        </div>
        <div className="flex flex-col items-center">
          <PreviewToggle defaultChecked disabled />
          <span style={{ fontSize: "10px", fontWeight: 400, color: "#a1a1a1", marginTop: "6px" }}>
            Disabled On
          </span>
        </div>
      </div>
    </PreviewSection>
  )
}

function WithLabelsSection() {
  const items: Array<{
    label: string
    description?: string
    defaultChecked?: boolean
  }> = [
    { label: "Email notifications", description: "Receive emails about account activity.", defaultChecked: true },
    { label: "Marketing emails", description: "Get updates about new features and offers." },
    { label: "Dark mode", defaultChecked: true },
  ]

  return (
    <PreviewSection
      label="With Labels"
      height={300}
      wrapClassName="flex flex-col items-start justify-center gap-[16px] px-[35px] w-full"
    >
      <div className="flex flex-col" style={{ gap: "16px", width: "100%", maxWidth: "380px" }}>
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-start justify-between"
            style={{ gap: "12px" }}
          >
            <div className="flex flex-col" style={{ gap: "2px" }}>
              <span style={{ fontSize: "13px", fontWeight: 500, color: "#262626" }}>
                {item.label}
              </span>
              {item.description && (
                <span style={{ fontSize: "12.3px", fontWeight: 400, color: "#a1a1a1" }}>
                  {item.description}
                </span>
              )}
            </div>
            <PreviewToggle defaultChecked={item.defaultChecked} />
          </div>
        ))}
      </div>
    </PreviewSection>
  )
}

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <DefaultSection />
      <WithLabelsSection />
    </div>
  )
}

// ================================================================== //
// CODE                                                                 //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/toggle"
      importCode={`import { Toggle } from "@hyena/toggle"`}
      usageCode={`<Toggle defaultChecked />`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const TOGGLE_PROPS: PropDef[] = [
  { prop: "checked", type: "boolean", defaultVal: "—" },
  { prop: "defaultChecked", type: "boolean", defaultVal: "false" },
  { prop: "onCheckedChange", type: "(checked: boolean) => void", defaultVal: "—" },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Toggle"
      description="A switch control for toggling between two states."
      props={TOGGLE_PROPS}
    />
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Primitive",
  variants: "2",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Button", href: "/components/button" },
    { label: "Checkbox", href: "/components/checkbox" },
    { label: "Input", href: "/components/input" },
  ],
  tokens: [
    { name: "--primary", color: "#262626" },
    { name: "--surface", color: "#ffffff", border: true },
    { name: "--border", color: "#e4e4e7", border: true },
    { name: "--radius", color: "#e4e4e7", border: true },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function TogglePage() {
  return (
    <ComponentPageLayout
      name="Toggle"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
