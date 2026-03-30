"use client"

import { useState, useCallback } from "react"
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
// CHECKBOX PRIMITIVE (local)                                           //
// ================================================================== //

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2 5.5L4 7.5L8 3" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DashIcon() {
  return (
    <svg width="8" height="2" viewBox="0 0 8 2" fill="none">
      <rect width="8" height="2" rx="1" fill="#FFFFFF" />
    </svg>
  )
}

type CheckVisual = "checked" | "unchecked" | "indeterminate"

function Checkbox({
  visual,
  disabled = false,
  onClick,
}: {
  visual: CheckVisual
  disabled?: boolean
  onClick?: () => void
}) {
  const isOn = visual !== "unchecked"
  return (
    <button
      role="checkbox"
      aria-checked={visual === "indeterminate" ? "mixed" : visual === "checked"}
      disabled={disabled}
      onClick={onClick}
      style={{
        width: "16px",
        height: "16px",
        borderRadius: "4px",
        border: `0.8px solid ${isOn ? "#262626" : "#D4D4D4"}`,
        background: isOn ? "#262626" : "#FFFFFF",
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
      {visual === "checked" && <CheckIcon />}
      {visual === "indeterminate" && <DashIcon />}
    </button>
  )
}

// ================================================================== //
// SECTION 1: DEFAULT                                                   //
// ================================================================== //

function DefaultSection() {
  const [values, setValues] = useState<Set<string>>(new Set(["email", "push"]))

  const toggle = useCallback((key: string) => {
    setValues((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }, [])

  const items = [
    { key: "email", label: "Email" },
    { key: "push", label: "Push" },
    { key: "sms", label: "SMS" },
  ]

  return (
    <PreviewSection label="Default">
      <div style={{ width: "300px" }}>
        <div style={{ fontSize: "13px", fontWeight: 500, color: "#262626", marginBottom: "8px" }}>
          Notifications
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {items.map((item) => (
            <label
              key={item.key}
              style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
            >
              <Checkbox
                visual={values.has(item.key) ? "checked" : "unchecked"}
                onClick={() => toggle(item.key)}
              />
              <span style={{ fontSize: "13px", fontWeight: 400, color: "#262626" }}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 2: WITH SELECT ALL                                           //
// ================================================================== //

function WithSelectAllSection() {
  const allKeys = ["read", "write", "delete", "admin"]
  const [values, setValues] = useState<Set<string>>(new Set(["read", "write"]))

  const toggle = useCallback((key: string) => {
    setValues((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }, [])

  const allChecked = allKeys.every((k) => values.has(k))
  const noneChecked = allKeys.every((k) => !values.has(k))
  const selectAllVisual: CheckVisual = allChecked
    ? "checked"
    : noneChecked
      ? "unchecked"
      : "indeterminate"

  function toggleAll() {
    if (allChecked) {
      setValues(new Set())
    } else {
      setValues(new Set(allKeys))
    }
  }

  const items = [
    { key: "read", label: "Read" },
    { key: "write", label: "Write" },
    { key: "delete", label: "Delete" },
    { key: "admin", label: "Admin" },
  ]

  return (
    <PreviewSection label="With Select All">
      <div style={{ width: "300px" }}>
        <div style={{ fontSize: "13px", fontWeight: 500, color: "#262626", marginBottom: "8px" }}>
          Permissions
        </div>
        {/* Select all */}
        <label
          style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
        >
          <Checkbox visual={selectAllVisual} onClick={toggleAll} />
          <span style={{ fontSize: "13px", fontWeight: 500, color: "#262626" }}>
            Select all
          </span>
        </label>
        {/* Divider */}
        <div style={{ width: "100%", height: "0.8px", background: "#F0F0F0", margin: "6px 0" }} />
        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {items.map((item) => (
            <label
              key={item.key}
              style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
            >
              <Checkbox
                visual={values.has(item.key) ? "checked" : "unchecked"}
                onClick={() => toggle(item.key)}
              />
              <span style={{ fontSize: "13px", fontWeight: 400, color: "#262626" }}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 3: WITH DESCRIPTION                                          //
// ================================================================== //

function WithDescriptionSection() {
  const [values, setValues] = useState<Set<string>>(new Set(["necessary"]))

  const toggle = useCallback((key: string) => {
    setValues((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }, [])

  const items = [
    {
      key: "necessary",
      label: "Necessary",
      description: "Required for the site to function.",
      disabled: true,
    },
    {
      key: "analytics",
      label: "Analytics",
      description: "Help us understand how you use the site.",
      disabled: false,
    },
    {
      key: "marketing",
      label: "Marketing",
      description: "Used to deliver relevant advertisements.",
      disabled: false,
    },
  ]

  return (
    <PreviewSection label="With Description">
      <div style={{ width: "340px" }}>
        <div style={{ fontSize: "13px", fontWeight: 500, color: "#262626", marginBottom: "8px" }}>
          Cookie preferences
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {items.map((item) => (
            <label
              key={item.key}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                cursor: item.disabled ? "not-allowed" : "pointer",
                opacity: item.disabled ? 1 : 1,
              }}
            >
              <div style={{ marginTop: "2px" }}>
                <Checkbox
                  visual={values.has(item.key) ? "checked" : "unchecked"}
                  disabled={item.disabled}
                  onClick={() => {
                    if (!item.disabled) toggle(item.key)
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ fontSize: "13px", fontWeight: 500, color: "#262626" }}>
                  {item.label}
                </span>
                <span style={{ fontSize: "12px", fontWeight: 400, color: "#838383" }}>
                  {item.description}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 4: CARD STYLE                                                //
// ================================================================== //

function CardStyleSection() {
  const [values, setValues] = useState<Set<string>>(new Set(["pro"]))

  const toggle = useCallback((key: string) => {
    setValues((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }, [])

  const items = [
    { key: "free", label: "Free", description: "Up to 3 projects. Basic support." },
    { key: "pro", label: "Pro", description: "Unlimited projects. Priority support." },
    { key: "enterprise", label: "Enterprise", description: "Custom limits. Dedicated support." },
  ]

  return (
    <PreviewSection label="Card Style">
      <div style={{ width: "340px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ fontSize: "13px", fontWeight: 500, color: "#262626", marginBottom: "0px" }}>
          Select a plan
        </div>
        {items.map((item) => {
          const checked = values.has(item.key)
          return (
            <CardItem
              key={item.key}
              label={item.label}
              description={item.description}
              checked={checked}
              onToggle={() => toggle(item.key)}
            />
          )
        })}
      </div>
    </PreviewSection>
  )
}

function CardItem({
  label,
  description,
  checked,
  onToggle,
}: {
  label: string
  description: string
  checked: boolean
  onToggle: () => void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
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
        <Checkbox visual={checked ? "checked" : "unchecked"} onClick={onToggle} />
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

// ================================================================== //
// PREVIEW TAB                                                          //
// ================================================================== //

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <DefaultSection />
      <WithSelectAllSection />
      <WithDescriptionSection />
      <CardStyleSection />
    </div>
  )
}

// ================================================================== //
// CODE TAB                                                             //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/checkbox-group"
      importCode={`import {
  CheckboxGroup,
  CheckboxGroupItem,
} from "@/components/ui/checkbox-group"`}
      usageCode={`<CheckboxGroup label="Notifications">
  <CheckboxGroupItem value="email" label="Email" />
  <CheckboxGroupItem value="push" label="Push" />
  <CheckboxGroupItem value="sms" label="SMS" />
</CheckboxGroup>`}
    />
  )
}

// ================================================================== //
// API TAB                                                              //
// ================================================================== //

const GROUP_PROPS: PropDef[] = [
  { prop: "label", type: "string", defaultVal: "—" },
  { prop: "defaultValue", type: "string[]", defaultVal: "[]" },
  { prop: "value", type: "string[]", defaultVal: "—" },
  { prop: "onValueChange", type: "(value: string[]) => void", defaultVal: "—" },
  { prop: "selectAll", type: "boolean", defaultVal: "false" },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
  { prop: "className", type: "string", defaultVal: "—" },
]

const ITEM_PROPS: PropDef[] = [
  { prop: "value", type: "string (required)", defaultVal: "—" },
  { prop: "label", type: "string", defaultVal: "—" },
  { prop: "description", type: "string", defaultVal: "—" },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
]

function ApiTab() {
  return (
    <div>
      <h2 style={{ fontSize: "16px", fontWeight: 500, color: "#262626", marginBottom: "4px" }}>
        CheckboxGroup
      </h2>
      <p style={{ fontSize: "12.3px", fontWeight: 400, color: "#727272", lineHeight: 1.6, marginBottom: "24px" }}>
        A group of related checkboxes with shared state management and optional select-all behaviour.
      </p>

      <LabelPill text="CheckboxGroup Props" />
      <div style={{ marginTop: "12px", width: "100%", marginBottom: "24px" }}>
        <PropsTable props={GROUP_PROPS} />
      </div>

      <LabelPill text="CheckboxGroupItem Props" />
      <div style={{ marginTop: "12px", width: "100%" }}>
        <PropsTable props={ITEM_PROPS} />
      </div>
    </div>
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Composite",
  variants: "4",
  sizes: "1",
  deps: "Checkbox, cn",
  related: [
    { label: "Checkbox", href: "/components/checkbox" },
    { label: "Radio Group", href: "/components/radio-group" },
    { label: "Form", href: "/components/form" },
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

export function CheckboxGroupPage() {
  return (
    <ComponentPageLayout
      name="Checkbox Group"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
