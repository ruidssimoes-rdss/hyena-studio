"use client"

import { useState, useCallback } from "react"
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
// NUMBER FIELD PRIMITIVE                                               //
// ================================================================== //

function NumberField({
  value: controlledValue,
  defaultValue = 0,
  min,
  max,
  step = 1,
  size = "default",
  onChange,
}: {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  size?: "sm" | "default" | "lg"
  onChange?: (v: number) => void
}) {
  const [internal, setInternal] = useState(defaultValue)
  const val = controlledValue ?? internal
  const set = useCallback(
    (v: number) => {
      const clamped = Math.max(min ?? -Infinity, Math.min(max ?? Infinity, v))
      setInternal(clamped)
      onChange?.(clamped)
    },
    [min, max, onChange],
  )

  const atMin = min !== undefined && val <= min
  const atMax = max !== undefined && val >= max

  const dims: Record<string, { h: number; btnW: number; fs: number }> = {
    sm: { h: 24, btnW: 24, fs: 11 },
    default: { h: 28, btnW: 28, fs: 13 },
    lg: { h: 36, btnW: 36, fs: 14 },
  }
  const d = dims[size]

  const btnBase: React.CSSProperties = {
    width: `${d.btnW}px`,
    height: `${d.h}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "white",
    border: "none",
    fontSize: `${d.fs + 2}px`,
    padding: 0,
    flexShrink: 0,
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        border: "0.8px solid #F0F0F0",
        borderRadius: "10px",
        overflow: "hidden",
        height: `${d.h}px`,
        width: "160px",
      }}
    >
      <button
        onClick={() => set(val - step)}
        disabled={atMin}
        style={{
          ...btnBase,
          borderRight: "0.8px solid #F0F0F0",
          color: atMin ? "#D4D4D4" : "#838383",
          cursor: atMin ? "not-allowed" : "pointer",
        }}
      >
        −
      </button>
      <input
        type="text"
        value={val}
        onChange={(e) => {
          const n = parseInt(e.target.value, 10)
          if (!isNaN(n)) set(n)
        }}
        style={{
          flex: 1,
          textAlign: "center",
          border: "none",
          fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
          fontSize: `${d.fs}px`,
          fontWeight: 400,
          color: "#262626",
          outline: "none",
          background: "white",
          width: 0,
          MozAppearance: "textfield" as unknown as undefined,
        }}
      />
      <button
        onClick={() => set(val + step)}
        disabled={atMax}
        style={{
          ...btnBase,
          borderLeft: "0.8px solid #F0F0F0",
          color: atMax ? "#D4D4D4" : "#838383",
          cursor: atMax ? "not-allowed" : "pointer",
        }}
      >
        +
      </button>
    </div>
  )
}

// ================================================================== //
// SECTIONS                                                             //
// ================================================================== //

function DefaultSection() {
  return (
    <PreviewSection label="Default">
      <NumberField defaultValue={5} />
    </PreviewSection>
  )
}

function WithBoundsSection() {
  return (
    <PreviewSection label="With Bounds">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
        <NumberField defaultValue={1} min={1} max={10} />
        <span style={{ fontSize: "11px", fontWeight: 400, color: "#838383" }}>Min: 1 · Max: 10</span>
      </div>
    </PreviewSection>
  )
}

function WithStepSection() {
  return (
    <PreviewSection label="With Step">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
        <NumberField defaultValue={25} step={5} />
        <span style={{ fontSize: "11px", fontWeight: 400, color: "#838383" }}>Step: 5</span>
      </div>
    </PreviewSection>
  )
}

function SizesSection() {
  return (
    <PreviewSection label="Sizes">
      <NumberField defaultValue={3} size="sm" />
      <NumberField defaultValue={5} size="default" />
      <NumberField defaultValue={10} size="lg" />
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
      <WithBoundsSection />
      <WithStepSection />
      <SizesSection />
    </div>
  )
}

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/number-field"
      importCode={`import { NumberField } from "@/components/ui/number-field"`}
      usageCode={`<NumberField defaultValue={5} />

<NumberField defaultValue={1} min={1} max={10} step={1} />`}
    />
  )
}

const PROPS: PropDef[] = [
  { prop: "value", type: "number", defaultVal: "—" },
  { prop: "defaultValue", type: "number", defaultVal: "0" },
  { prop: "onChange", type: "(value: number) => void", defaultVal: "—" },
  { prop: "min", type: "number", defaultVal: "—" },
  { prop: "max", type: "number", defaultVal: "—" },
  { prop: "step", type: "number", defaultVal: "1" },
  { prop: "size", type: '"sm" | "default" | "lg"', defaultVal: '"default"' },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="NumberField"
      description="An input for numeric values with increment/decrement buttons. Enforces min/max bounds and step values."
      props={PROPS}
    />
  )
}

const CAP_DATA: CAPData = {
  type: "Primitive",
  variants: "4",
  sizes: "3 (sm, default, lg)",
  deps: "cn",
  related: [
    { label: "Input", href: "/components/input" },
    { label: "Slider", href: "/components/slider" },
  ],
  tokens: [
    { name: "--border", color: "#F0F0F0", border: true },
    { name: "--foreground", color: "#262626" },
    { name: "--muted-fg", color: "#838383" },
  ],
}

export function NumberFieldPage() {
  return (
    <ComponentPageLayout
      name="Number Field"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
