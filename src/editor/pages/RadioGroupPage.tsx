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
// RADIO CIRCLE                                                         //
// ================================================================== //

function RadioCircle({ selected }: { selected: boolean }) {
  return (
    <div
      style={{
        width: "16px",
        height: "16px",
        borderRadius: "8px",
        border: `0.8px solid ${selected ? "#262626" : "#F0F0F0"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "border-color 150ms",
      }}
    >
      {selected && (
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "4px",
            background: "#262626",
          }}
        />
      )}
    </div>
  )
}

// ================================================================== //
// PREVIEW                                                              //
// ================================================================== //

function DefaultSection() {
  const [selected, setSelected] = useState("a")
  const options = [
    { value: "a", label: "Option A" },
    { value: "b", label: "Option B" },
    { value: "c", label: "Option C" },
  ]

  return (
    <PreviewSection label="Default">
      <div className="flex flex-col" style={{ gap: "10px" }}>
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center"
            style={{ gap: "10px", cursor: "pointer" }}
            onClick={() => setSelected(opt.value)}
          >
            <RadioCircle selected={selected === opt.value} />
            <span style={{ fontSize: "13px", color: "#262626" }}>
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    </PreviewSection>
  )
}

function WithDescriptionSection() {
  const [selected, setSelected] = useState("startup")
  const options = [
    { value: "startup", label: "Startup", description: "Best for new projects" },
    { value: "scale", label: "Scale", description: "For growing teams" },
    { value: "enterprise", label: "Enterprise", description: "Advanced security & compliance" },
  ]

  return (
    <PreviewSection label="With Description">
      <div className="flex flex-col" style={{ gap: "10px" }}>
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-start"
            style={{ gap: "10px", cursor: "pointer" }}
            onClick={() => setSelected(opt.value)}
          >
            <div style={{ paddingTop: "2px" }}>
              <RadioCircle selected={selected === opt.value} />
            </div>
            <div className="flex flex-col" style={{ gap: "1px" }}>
              <span style={{ fontSize: "13px", fontWeight: 500, color: "#262626" }}>
                {opt.label}
              </span>
              <span style={{ fontSize: "12px", fontWeight: 400, color: "#838383" }}>
                {opt.description}
              </span>
            </div>
          </label>
        ))}
      </div>
    </PreviewSection>
  )
}

function CardStyleSection() {
  const [selected, setSelected] = useState("startup")
  const options = [
    { value: "startup", label: "Startup", description: "Best for new projects" },
    { value: "scale", label: "Scale", description: "For growing teams" },
    { value: "enterprise", label: "Enterprise", description: "Advanced security & compliance" },
  ]

  return (
    <PreviewSection
      label="Card Style"
      wrapClassName="flex flex-row items-start gap-[8px] w-full"
    >
      {options.map((opt) => (
        <div
          key={opt.value}
          onClick={() => setSelected(opt.value)}
          style={{
            display: "flex",
            alignItems: "start",
            gap: "10px",
            padding: "12px 14px",
            borderRadius: "10px",
            border: `0.8px solid ${selected === opt.value ? "#262626" : "#F0F0F0"}`,
            cursor: "pointer",
            flex: 1,
            transition: "border-color 150ms",
          }}
        >
          <div style={{ paddingTop: "2px" }}>
            <RadioCircle selected={selected === opt.value} />
          </div>
          <div className="flex flex-col" style={{ gap: "1px" }}>
            <span style={{ fontSize: "13px", fontWeight: 500, color: "#262626" }}>
              {opt.label}
            </span>
            <span style={{ fontSize: "12px", fontWeight: 400, color: "#838383" }}>
              {opt.description}
            </span>
          </div>
        </div>
      ))}
    </PreviewSection>
  )
}

function HorizontalSection() {
  const [selected, setSelected] = useState("a")
  const options = [
    { value: "a", label: "Option A" },
    { value: "b", label: "Option B" },
    { value: "c", label: "Option C" },
  ]

  return (
    <PreviewSection
      label="Horizontal"
      wrapClassName="flex flex-row items-center gap-[20px] w-full"
    >
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex items-center"
          style={{ gap: "10px", cursor: "pointer" }}
          onClick={() => setSelected(opt.value)}
        >
          <RadioCircle selected={selected === opt.value} />
          <span style={{ fontSize: "13px", color: "#262626" }}>
            {opt.label}
          </span>
        </label>
      ))}
    </PreviewSection>
  )
}

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <DefaultSection />
      <WithDescriptionSection />
      <CardStyleSection />
      <HorizontalSection />
    </div>
  )
}

// ================================================================== //
// CODE                                                                 //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/radio-group"
      importCode={`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`}
      usageCode={`<RadioGroup defaultValue="startup" onValueChange={(v) => console.log(v)}>
  <RadioGroupItem value="startup">Startup</RadioGroupItem>
  <RadioGroupItem value="scale">Scale</RadioGroupItem>
  <RadioGroupItem value="enterprise">Enterprise</RadioGroupItem>
</RadioGroup>`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const RADIO_GROUP_PROPS: PropDef[] = [
  { prop: "value", type: "string", defaultVal: "—" },
  { prop: "defaultValue", type: "string", defaultVal: "—" },
  { prop: "onValueChange", type: "(value: string) => void", defaultVal: "—" },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
  { prop: "orientation", type: '"horizontal" | "vertical"', defaultVal: '"vertical"' },
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="RadioGroup"
      description="A set of mutually exclusive options where only one can be selected at a time."
      props={RADIO_GROUP_PROPS}
    />
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Primitive",
  variants: "4",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Checkbox", href: "/components/checkbox" },
    { label: "Select", href: "/components/select" },
  ],
  tokens: [
    { name: "--primary", color: "#262626" },
    { name: "--border", color: "#F0F0F0", border: true },
    { name: "--muted-fg", color: "#838383" },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function RadioGroupPage() {
  return (
    <ComponentPageLayout
      name="Radio Group"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
