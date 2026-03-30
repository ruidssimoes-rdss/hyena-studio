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

// ── Inline Switch ──────────────────────────────────────────────────── //

function Switch({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      style={{
        position: "relative",
        width: "40px",
        height: "22px",
        borderRadius: "11px",
        border: "none",
        background: checked ? "#262626" : "#F0F0F0",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "background 200ms ease",
        padding: 0,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "2px",
          left: checked ? "20px" : "2px",
          width: "18px",
          height: "18px",
          borderRadius: "9px",
          background: "#FFFFFF",
          boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
          transition: "left 200ms ease",
        }}
      />
    </button>
  )
}

// ── Preview Content ────────────────────────────────────────────────── //

function SwitchPreview() {
  const [defaultChecked, setDefaultChecked] = useState(false)

  const [labelStates, setLabelStates] = useState([false, false, false])
  const labelNames = ["Notifications", "Dark mode", "Auto-save"]

  const [descStates, setDescStates] = useState([false, false])
  const descItems = [
    {
      label: "Marketing emails",
      description: "Receive emails about new products and features",
    },
    {
      label: "Security alerts",
      description: "Get notified about unusual account activity",
    },
  ]

  return (
    <div className="flex flex-col" style={{ gap: "24px" }}>
      {/* Default */}
      <PreviewSection label="Default">
        <Switch checked={defaultChecked} onChange={setDefaultChecked} />
      </PreviewSection>

      {/* With Label */}
      <PreviewSection
        label="With Label"
        wrapClassName="flex flex-col items-start gap-[14px] w-full"
      >
        {labelNames.map((name, i) => (
          <div
            key={name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Switch
              checked={labelStates[i]}
              onChange={(val) => {
                const next = [...labelStates]
                next[i] = val
                setLabelStates(next)
              }}
            />
            <span style={{ fontSize: "13px", color: "#262626" }}>{name}</span>
          </div>
        ))}
      </PreviewSection>

      {/* With Description */}
      <PreviewSection
        label="With Description"
        wrapClassName="flex flex-col items-start gap-[18px] w-full"
      >
        {descItems.map((item, i) => (
          <div key={item.label} style={{ width: "300px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "#262626",
                  fontWeight: 500,
                }}
              >
                {item.label}
              </span>
              <Switch
                checked={descStates[i]}
                onChange={(val) => {
                  const next = [...descStates]
                  next[i] = val
                  setDescStates(next)
                }}
              />
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "#838383",
                margin: "4px 0 0 0",
                lineHeight: 1.4,
              }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </PreviewSection>

      {/* Disabled */}
      <PreviewSection
        label="Disabled"
        wrapClassName="flex flex-col items-start gap-[14px] w-full"
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Switch checked={false} onChange={() => {}} disabled />
          <span style={{ fontSize: "13px", color: "#838383" }}>
            Disabled (off)
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Switch checked={true} onChange={() => {}} disabled />
          <span style={{ fontSize: "13px", color: "#838383" }}>
            Disabled (on)
          </span>
        </div>
      </PreviewSection>
    </div>
  )
}

// ── Code Tab ───────────────────────────────────────────────────────── //

const importCode = `import { Switch } from "@/components/ui/switch"`

const usageCode = `<Switch />

<Switch checked={enabled} onCheckedChange={setEnabled} />`

function SwitchCodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/switch"
      importCode={importCode}
      usageCode={usageCode}
    />
  )
}

// ── API Tab ────────────────────────────────────────────────────────── //

const apiProps: PropDef[] = [
  { prop: "checked", type: "boolean", defaultVal: "—" },
  { prop: "defaultChecked", type: "boolean", defaultVal: "false" },
  { prop: "onCheckedChange", type: "(checked: boolean) => void", defaultVal: "—" },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
  { prop: "id", type: "string", defaultVal: "—" },
  { prop: "className", type: "string", defaultVal: "—" },
]

function SwitchApiTab() {
  return (
    <StandardApiTab
      name="Switch"
      description="A toggle switch for boolean on/off states. Accessible, animated, and keyboard-navigable."
      props={apiProps}
    />
  )
}

// ── CAP ────────────────────────────────────────────────────────────── //

const capData: CAPData = {
  type: "Primitive",
  variants: "4",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Toggle", href: "/components/toggle" },
    { label: "Checkbox", href: "/components/checkbox" },
  ],
  tokens: [
    { name: "--primary", color: "#262626" },
    { name: "--track", color: "#F0F0F0", border: true },
    { name: "--surface", color: "#FFFFFF", border: true },
  ],
}

// ── Page ───────────────────────────────────────────────────────────── //

export function SwitchPage() {
  return (
    <ComponentPageLayout
      name="Switch"
      capContent={<ComponentCAP data={capData} />}
      previewContent={<SwitchPreview />}
      codeContent={<SwitchCodeTab />}
      apiContent={<SwitchApiTab />}
    />
  )
}
