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
// COLLAPSIBLE PRIMITIVE                                                //
// ================================================================== //

function ChevronIcon({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      style={{
        color: "#838383",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 200ms ease",
        flexShrink: 0,
      }}
    >
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CollapsibleBox({
  trigger,
  children,
  defaultOpen = false,
  bordered = true,
  triggerIcon = "chevron-right",
}: {
  trigger: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  bordered?: boolean
  triggerIcon?: "chevron-right" | "plus-minus" | "chevron-x" | "chevron-left"
}) {
  const [open, setOpen] = useState(defaultOpen)

  const icon = (() => {
    if (triggerIcon === "chevron-left") {
      return <ChevronIcon open={open} />
    }
    if (triggerIcon === "plus-minus") {
      return <PlusMinusIcon open={open} />
    }
    if (triggerIcon === "chevron-x") {
      return <ChevronXIcon open={open} />
    }
    return <ChevronIcon open={open} />
  })()

  if (!bordered) {
    return (
      <div style={{ width: "340px" }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          {icon}
          <span style={{ fontSize: "13px", fontWeight: 500, color: "#262626" }}>{trigger}</span>
        </button>
        <div
          style={{
            maxHeight: open ? "200px" : "0px",
            overflow: "hidden",
            transition: "max-height 200ms ease",
          }}
        >
          <div style={{ paddingLeft: "22px", marginTop: "6px", fontSize: "13px", lineHeight: "18px", fontWeight: 400, color: "rgba(38,38,38,0.7)" }}>
            {children}
          </div>
        </div>
      </div>
    )
  }

  const isLeftIcon = triggerIcon === "chevron-left"

  return (
    <div
      style={{
        width: "340px",
        border: "0.8px solid #F0F0F0",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          height: "40px",
          padding: "0 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: isLeftIcon ? "flex-start" : "space-between",
          gap: isLeftIcon ? "6px" : undefined,
          background: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {isLeftIcon && icon}
        <span style={{ fontSize: "13px", fontWeight: 500, color: "#262626" }}>{trigger}</span>
        {!isLeftIcon && icon}
      </button>
      <div
        style={{
          maxHeight: open ? "300px" : "0px",
          overflow: "hidden",
          transition: "max-height 200ms ease",
        }}
      >
        <div style={{ borderTop: "0.8px solid #F0F0F0", padding: "12px" }}>
          {children}
        </div>
      </div>
    </div>
  )
}

// ================================================================== //
// ANIMATED ICONS                                                       //
// ================================================================== //

function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      {/* Horizontal line (always visible) */}
      <line x1="4" y1="8" x2="12" y2="8" stroke="#838383" strokeWidth="1.5" strokeLinecap="round" />
      {/* Vertical line (collapses on open) */}
      <line
        x1="8" y1="4" x2="8" y2="12"
        stroke="#838383" strokeWidth="1.5" strokeLinecap="round"
        style={{
          transform: open ? "scaleY(0)" : "scaleY(1)",
          transformOrigin: "center",
          transition: "transform 200ms ease",
        }}
      />
    </svg>
  )
}

function ChevronXIcon({ open }: { open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      {/* Top stroke */}
      <line
        x1="5" y1="6" x2="8" y2="9"
        stroke="#838383" strokeWidth="1.5" strokeLinecap="round"
        style={{
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transformOrigin: "8px 8px",
          transition: "transform 200ms ease",
        }}
      />
      {/* Bottom stroke */}
      <line
        x1="11" y1="6" x2="8" y2="9"
        stroke="#838383" strokeWidth="1.5" strokeLinecap="round"
        style={{
          transform: open ? "rotate(-45deg)" : "rotate(0deg)",
          transformOrigin: "8px 8px",
          transition: "transform 200ms ease",
        }}
      />
    </svg>
  )
}

// ================================================================== //
// CHECKBOX (local)                                                     //
// ================================================================== //

function SmallCheckbox({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        width: "16px", height: "16px", borderRadius: "4px",
        border: `0.8px solid ${checked ? "#262626" : "#D4D4D4"}`,
        background: checked ? "#262626" : "#FFFFFF",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", padding: 0, flexShrink: 0, transition: "all 150ms ease",
      }}
    >
      {checked && (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 5.5L4 7.5L8 3" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}

// ================================================================== //
// SECTIONS                                                             //
// ================================================================== //

function DefaultSection() {
  return (
    <PreviewSection label="Default">
      <CollapsibleBox trigger="@peduarte starred 3 repositories">
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontFamily: "var(--font-geist-mono), ui-monospace, monospace", fontSize: "12px", color: "#838383" }}>
          <span>radix-ui/primitives</span>
          <span>radix-ui/colors</span>
          <span>stitches-dev/stitches</span>
        </div>
      </CollapsibleBox>
    </PreviewSection>
  )
}

function OpenByDefaultSection() {
  const [items, setItems] = useState([true, true, true])
  const labels = ["Design system", "Component library", "Documentation"]
  return (
    <PreviewSection label="Open by Default">
      <CollapsibleBox trigger="3 items selected" defaultOpen>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {labels.map((label, i) => (
            <label key={label} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <SmallCheckbox checked={items[i]} onChange={(v) => { const n = [...items]; n[i] = v; setItems(n) }} />
              <span style={{ fontSize: "13px", color: "#262626" }}>{label}</span>
            </label>
          ))}
        </div>
      </CollapsibleBox>
    </PreviewSection>
  )
}

function MinimalSection() {
  return (
    <PreviewSection label="Minimal">
      <CollapsibleBox trigger="View details" bordered={false} triggerIcon="chevron-left">
        This component was last updated 3 days ago. It includes accessibility improvements and minor bug fixes.
      </CollapsibleBox>
    </PreviewSection>
  )
}

function AnimatedIconSection() {
  return (
    <PreviewSection label="Animated Icon">
      <CollapsibleBox trigger="Plus to minus" triggerIcon="plus-minus">
        <div style={{ fontSize: "13px", lineHeight: "18px", color: "rgba(38,38,38,0.7)" }}>
          The plus icon smoothly morphs into a minus when expanded.
        </div>
      </CollapsibleBox>
      <CollapsibleBox trigger="Chevron to X" triggerIcon="chevron-x">
        <div style={{ fontSize: "13px", lineHeight: "18px", color: "rgba(38,38,38,0.7)" }}>
          The chevron strokes rotate to form an X shape when expanded.
        </div>
      </CollapsibleBox>
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
      <OpenByDefaultSection />
      <MinimalSection />
      <AnimatedIconSection />
    </div>
  )
}

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/collapsible"
      importCode={`import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"`}
      usageCode={`<Collapsible>
  <CollapsibleTrigger>Toggle content</CollapsibleTrigger>
  <CollapsibleContent>
    Hidden content here.
  </CollapsibleContent>
</Collapsible>`}
    />
  )
}

const PROPS: PropDef[] = [
  { prop: "open", type: "boolean", defaultVal: "—" },
  { prop: "defaultOpen", type: "boolean", defaultVal: "false" },
  { prop: "onOpenChange", type: "(open: boolean) => void", defaultVal: "—" },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Collapsible"
      description="A component that toggles the visibility of its content."
      props={PROPS}
    />
  )
}

const CAP_DATA: CAPData = {
  type: "Primitive",
  variants: "4",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Accordion", href: "/components/accordion" },
    { label: "Tabs", href: "/components/tabs" },
  ],
  tokens: [
    { name: "--border", color: "#F0F0F0", border: true },
    { name: "--foreground", color: "#262626" },
    { name: "--muted-fg", color: "#838383" },
  ],
}

export function CollapsiblePage() {
  return (
    <ComponentPageLayout
      name="Collapsible"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
