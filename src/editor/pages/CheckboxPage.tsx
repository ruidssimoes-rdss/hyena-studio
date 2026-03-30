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
// CHECKBOX PRIMITIVE                                                   //
// ================================================================== //

function CheckIcon({ color = "#FFFFFF" }: { color?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2 5.5L4 7.5L8 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IndeterminateIcon({ color = "#FFFFFF" }: { color?: string }) {
  return (
    <svg width="8" height="2" viewBox="0 0 8 2" fill="none">
      <rect width="8" height="2" rx="1" fill={color} />
    </svg>
  )
}

type CheckState = boolean | "indeterminate"

function Checkbox({
  checked: controlledChecked,
  defaultChecked = false,
  indeterminate = false,
  disabled = false,
  color = "#262626",
  onChange,
}: {
  checked?: CheckState
  defaultChecked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  color?: string
  onChange?: (checked: boolean) => void
}) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const isControlled = controlledChecked !== undefined
  const state: CheckState = indeterminate
    ? "indeterminate"
    : isControlled
      ? controlledChecked
      : internalChecked

  const isOn = state === true || state === "indeterminate"

  function toggle() {
    if (disabled) return
    const next = state !== true
    if (!isControlled) setInternalChecked(next)
    onChange?.(next)
  }

  return (
    <button
      role="checkbox"
      aria-checked={state === "indeterminate" ? "mixed" : !!state}
      disabled={disabled}
      onClick={toggle}
      style={{
        width: "16px",
        height: "16px",
        borderRadius: "4px",
        border: `0.8px solid ${isOn ? color : "#D4D4D4"}`,
        background: isOn ? color : "#FFFFFF",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all 150ms ease",
        padding: 0,
        flexShrink: 0,
      }}
    >
      {state === true && <CheckIcon />}
      {state === "indeterminate" && <IndeterminateIcon />}
    </button>
  )
}

// ================================================================== //
// SECTION 1: STATES                                                    //
// ================================================================== //

function StatesSection() {
  const [s1, setS1] = useState(false)
  const [s2, setS2] = useState(true)

  return (
    <PreviewSection label="States">
      <Checkbox checked={s1} onChange={setS1} />
      <Checkbox checked={s2} onChange={setS2} />
      <Checkbox indeterminate />
      <Checkbox disabled />
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 2: WITH LABEL                                                //
// ================================================================== //

function CheckboxWithLabel({
  label,
  defaultChecked = false,
  disabled = false,
}: {
  label: string
  defaultChecked?: boolean
  disabled?: boolean
}) {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <Checkbox checked={checked} onChange={setChecked} disabled={disabled} />
      <span style={{ fontSize: "13px", fontWeight: 400, color: "#262626" }}>
        {label}
      </span>
    </label>
  )
}

function WithLabelSection() {
  return (
    <PreviewSection label="With Label">
      <CheckboxWithLabel label="Accept terms and conditions" />
      <CheckboxWithLabel label="Enable notifications" defaultChecked />
      <CheckboxWithLabel label="Unavailable option" disabled />
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 3: WITH DESCRIPTION                                          //
// ================================================================== //

function CheckboxWithDescription({
  label,
  description,
  defaultChecked = false,
}: {
  label: string
  description: string
  defaultChecked?: boolean
}) {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: "8px",
        cursor: "pointer",
      }}
    >
      <div style={{ marginTop: "2px" }}>
        <Checkbox checked={checked} onChange={setChecked} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <span style={{ fontSize: "13px", fontWeight: 500, color: "#262626" }}>
          {label}
        </span>
        <span style={{ fontSize: "12px", fontWeight: 400, color: "#838383", maxWidth: "300px" }}>
          {description}
        </span>
      </div>
    </label>
  )
}

function WithDescriptionSection() {
  return (
    <PreviewSection label="With Description">
      <CheckboxWithDescription
        label="Marketing emails"
        description="Receive updates about new features and promotions."
      />
      <CheckboxWithDescription
        label="Security alerts"
        description="Get notified about unusual account activity."
        defaultChecked
      />
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 4: COLOURS                                                   //
// ================================================================== //

function ColoursSection() {
  const colours = [
    { label: "Default", color: "#262626" },
    { label: "Success", color: "#14B8A6" },
    { label: "Warning", color: "#F97316" },
    { label: "Error", color: "#D5143E" },
    { label: "Progress", color: "#3B82F6" },
  ]
  return (
    <PreviewSection label="Colours">
      {colours.map((c) => (
        <Checkbox key={c.label} checked={true} color={c.color} />
      ))}
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 5: CARD STYLE                                                //
// ================================================================== //

function CheckboxCard({
  label,
  description,
  defaultChecked = false,
}: {
  label: string
  description: string
  defaultChecked?: boolean
}) {
  const [checked, setChecked] = useState(defaultChecked)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => setChecked(!checked)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "340px",
        border: `0.8px solid ${checked ? "#262626" : hovered ? "#E0E0E0" : "#F0F0F0"}`,
        borderRadius: "10px",
        padding: "12px",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: "10px",
        cursor: "pointer",
        transition: "border-color 150ms ease",
      }}
    >
      <div style={{ marginTop: "2px" }}>
        <Checkbox checked={checked} onChange={setChecked} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <span style={{ fontSize: "13px", fontWeight: 500, color: "#262626" }}>
          {label}
        </span>
        <span style={{ fontSize: "12px", fontWeight: 400, color: "#838383" }}>
          {description}
        </span>
      </div>
    </div>
  )
}

function CardStyleSection() {
  return (
    <PreviewSection label="Card Style">
      <CheckboxCard
        label="Enable notifications"
        description="You can enable or disable notifications at any time."
        defaultChecked
      />
      <CheckboxCard
        label="Public profile"
        description="Make your profile visible to other users."
      />
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 6: INTERACTIVE                                               //
// ================================================================== //

function InteractiveSection() {
  const [email, setEmail] = useState(false)
  const [push, setPush] = useState(true)
  const [sms, setSms] = useState(false)

  return (
    <PreviewSection label="Interactive">
      <div style={{ width: "300px" }}>
        <div style={{ fontSize: "13px", fontWeight: 500, color: "#262626", marginBottom: "8px" }}>
          Notification preferences
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <Checkbox checked={email} onChange={setEmail} />
            <span style={{ fontSize: "13px", color: "#262626" }}>Email notifications</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <Checkbox checked={push} onChange={setPush} />
            <span style={{ fontSize: "13px", color: "#262626" }}>Push notifications</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <Checkbox checked={sms} onChange={setSms} />
            <span style={{ fontSize: "13px", color: "#262626" }}>SMS notifications</span>
          </label>
        </div>
        <div style={{ marginTop: "12px" }}>
          <button
            style={{
              height: "24px",
              padding: "0 10px",
              borderRadius: "6px",
              border: "0.8px solid #F0F0F0",
              background: "white",
              fontSize: "12px",
              fontWeight: 500,
              color: "#262626",
              cursor: "pointer",
            }}
          >
            Save preferences
          </button>
        </div>
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// PREVIEW TAB                                                          //
// ================================================================== //

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <StatesSection />
      <WithLabelSection />
      <WithDescriptionSection />
      <ColoursSection />
      <CardStyleSection />
      <InteractiveSection />
    </div>
  )
}

// ================================================================== //
// CODE TAB                                                             //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/checkbox"
      importCode={`import { Checkbox } from "@/components/ui/checkbox"`}
      usageCode={`<Checkbox />

{/* With label */}
<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <label htmlFor="terms">Accept terms and conditions</label>
</div>`}
    />
  )
}

// ================================================================== //
// API TAB                                                              //
// ================================================================== //

const CHECKBOX_PROPS: PropDef[] = [
  { prop: "checked", type: 'boolean | "indeterminate"', defaultVal: "false" },
  { prop: "defaultChecked", type: "boolean", defaultVal: "false" },
  { prop: "onCheckedChange", type: "(checked: boolean) => void", defaultVal: "—" },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
  { prop: "color", type: '"default" | "success" | "warning" | "error" | "progress"', defaultVal: '"default"' },
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Checkbox"
      description="A toggle control for binary choices, supporting checked, unchecked, and indeterminate states."
      props={CHECKBOX_PROPS}
    />
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Primitive",
  variants: "6",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Toggle", href: "/components/toggle" },
    { label: "Switch", href: "/components/switch" },
    { label: "Radio Group", href: "/components/radio-group" },
    { label: "Checkbox Group", href: "/components/checkbox-group" },
  ],
  tokens: [
    { name: "--primary", color: "#262626" },
    { name: "--primary-fg", color: "#FFFFFF", border: true },
    { name: "--border", color: "#D4D4D4", border: true },
    { name: "--muted-fg", color: "#838383" },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function CheckboxPage() {
  return (
    <ComponentPageLayout
      name="Checkbox"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
