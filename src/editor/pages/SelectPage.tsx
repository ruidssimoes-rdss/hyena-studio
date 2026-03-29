"use client"

import { ChevronDown } from "lucide-react"
import {
  ComponentPageLayout,
  ComponentCAP,
  PreviewSection,
  StandardCodeTab,
  StandardApiTab,
  type CAPData,
  type PropDef,
  LabelPill,
} from "@/editor/components/PageShell"

// ================================================================== //
// SHARED                                                               //
// ================================================================== //

const triggerStyle: React.CSSProperties = {
  height: "28px",
  borderRadius: "10px",
  border: "0.8px solid #f0f0f0",
  padding: "0 10.8px",
  fontSize: "13px",
  background: "white",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "6px",
  width: "200px",
}

const chevronStyle: React.CSSProperties = {
  width: "14px",
  height: "14px",
  color: "#a1a1a1",
  flexShrink: 0,
}

// ================================================================== //
// PREVIEW                                                              //
// ================================================================== //

function DefaultSection() {
  return (
    <PreviewSection label="Default">
      {/* Placeholder */}
      <div style={triggerStyle}>
        <span style={{ color: "#a1a1a1" }}>Choose an option</span>
        <ChevronDown style={chevronStyle} />
      </div>
      {/* With value */}
      <div style={triggerStyle}>
        <span style={{ color: "#262626" }}>Option 2</span>
        <ChevronDown style={chevronStyle} />
      </div>
      {/* Disabled */}
      <div style={{ ...triggerStyle, opacity: 0.5, cursor: "not-allowed" }}>
        <span style={{ color: "#a1a1a1" }}>Disabled</span>
        <ChevronDown style={chevronStyle} />
      </div>
    </PreviewSection>
  )
}

function StatesSection() {
  const options = ["Option 1", "Option 2", "Option 3"]

  return (
    <PreviewSection label="States" height={320}>
      <div className="flex items-start justify-center" style={{ gap: "24px", paddingTop: "20px" }}>
        {/* Default */}
        <div className="flex flex-col items-center">
          <div style={triggerStyle}>
            <span style={{ color: "#a1a1a1" }}>Select...</span>
            <ChevronDown style={chevronStyle} />
          </div>
          <span style={{ fontSize: "10px", fontWeight: 400, color: "#a1a1a1", marginTop: "6px" }}>
            Default
          </span>
        </div>

        {/* Open (static dropdown) */}
        <div className="flex flex-col items-center">
          <div style={{ position: "relative" }}>
            <div style={{ ...triggerStyle, border: "0.8px solid #262626" }}>
              <span style={{ color: "#a1a1a1" }}>Select...</span>
              <ChevronDown style={{ ...chevronStyle, transform: "rotate(180deg)" }} />
            </div>
            {/* Dropdown */}
            <div
              style={{
                position: "absolute",
                top: "32px",
                left: 0,
                width: "200px",
                background: "white",
                border: "0.8px solid #f0f0f0",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                padding: "4px",
                zIndex: 10,
              }}
            >
              {options.map((opt, i) => (
                <div
                  key={opt}
                  style={{
                    height: "28px",
                    padding: "0 10.8px",
                    fontSize: "13px",
                    color: "#262626",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "6px",
                    background: i === 1 ? "rgba(0,0,0,0.04)" : "transparent",
                    cursor: "pointer",
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          </div>
          <span style={{ fontSize: "10px", fontWeight: 400, color: "#a1a1a1", marginTop: "110px" }}>
            Open
          </span>
        </div>

        {/* Disabled */}
        <div className="flex flex-col items-center">
          <div style={{ ...triggerStyle, opacity: 0.5, cursor: "not-allowed" }}>
            <span style={{ color: "#a1a1a1" }}>Disabled</span>
            <ChevronDown style={chevronStyle} />
          </div>
          <span style={{ fontSize: "10px", fontWeight: 400, color: "#a1a1a1", marginTop: "6px" }}>
            Disabled
          </span>
        </div>
      </div>
    </PreviewSection>
  )
}

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <DefaultSection />
      <StatesSection />
    </div>
  )
}

// ================================================================== //
// CODE                                                                 //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/select"
      importCode={`import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@hyena/select"`}
      usageCode={`<Select>
  <SelectTrigger placeholder="Choose an option" />
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
    <SelectItem value="3">Option 3</SelectItem>
  </SelectContent>
</Select>`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const SELECT_PROPS: PropDef[] = [
  { prop: "value", type: "string", defaultVal: "—" },
  { prop: "defaultValue", type: "string", defaultVal: "—" },
  { prop: "onValueChange", type: "(value: string) => void", defaultVal: "—" },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
]

const SELECT_ITEM_PROPS: PropDef[] = [
  { prop: "value", type: "string", defaultVal: "—" },
  { prop: "children", type: "React.ReactNode", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Select"
      description="A dropdown selection control."
      props={SELECT_PROPS}
      extraSections={
        <div style={{ marginTop: "28px" }}>
          <LabelPill text="SelectItem Props" />
          <div style={{ marginTop: "12px", width: "100%" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Prop", "Type", "Default"].map((h) => (
                    <th
                      key={h}
                      className="font-medium"
                      style={{
                        fontSize: "12.3px",
                        color: "#727272",
                        textAlign: "left",
                        height: "36px",
                        padding: "0 12px",
                        borderBottom: "1px solid #f0f0f0",
                        fontWeight: 500,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SELECT_ITEM_PROPS.map((row, i) => (
                  <tr
                    key={row.prop}
                    style={{
                      borderBottom: i < SELECT_ITEM_PROPS.length - 1 ? "1px solid #f0f0f0" : "none",
                    }}
                  >
                    <td className="font-medium" style={{ fontSize: "12.3px", color: "#262626", height: "40px", padding: "0 12px", fontWeight: 500 }}>
                      {row.prop}
                    </td>
                    <td className="font-mono" style={{ fontSize: "11px", color: "#727272", height: "40px", padding: "0 12px" }}>
                      {row.type}
                    </td>
                    <td className="font-mono" style={{ fontSize: "11px", color: "#262626", height: "40px", padding: "0 12px" }}>
                      {row.defaultVal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
    />
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Primitive",
  variants: "1",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Input", href: "/components/input" },
    { label: "Combobox", href: "/components/combobox" },
    { label: "Menu", href: "/components/menu" },
  ],
  tokens: [
    { name: "--border", color: "#e4e4e7", border: true },
    { name: "--input", color: "#f0f0f0", border: true },
    { name: "--surface", color: "#ffffff", border: true },
    { name: "--foreground", color: "#262626" },
    { name: "--radius", color: "#e4e4e7", border: true },
    { name: "--popover", color: "#ffffff", border: true },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function SelectPage() {
  return (
    <ComponentPageLayout
      name="Select"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
