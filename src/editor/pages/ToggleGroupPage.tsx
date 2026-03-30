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
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  Grid,
  LayoutList,
} from "lucide-react"

// ================================================================== //
// TOGGLE GROUP ITEMS                                                   //
// ================================================================== //

function ToggleGroupItem({
  active,
  onClick,
  position,
  children,
  style: extraStyle,
}: {
  active: boolean
  onClick: () => void
  position: "first" | "middle" | "last" | "only"
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  const borderRadius =
    position === "first"
      ? "10px 0 0 10px"
      : position === "last"
        ? "0 10px 10px 0"
        : position === "only"
          ? "10px"
          : "0"

  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "32px",
        width: "32px",
        border: "0.8px solid #F0F0F0",
        borderRadius,
        background: active ? "#262626" : "white",
        color: active ? "white" : "#838383",
        cursor: "pointer",
        transition: "background 150ms, color 150ms",
        flexShrink: 0,
        padding: 0,
        ...extraStyle,
      }}
    >
      {children}
    </button>
  )
}

function ToggleGroupItemWide({
  active,
  onClick,
  position,
  variant = "default",
  children,
}: {
  active: boolean
  onClick: () => void
  position: "first" | "middle" | "last" | "only"
  variant?: "default" | "outline"
  children: React.ReactNode
}) {
  const borderRadius =
    position === "first"
      ? "10px 0 0 10px"
      : position === "last"
        ? "0 10px 10px 0"
        : position === "only"
          ? "10px"
          : "0"

  const isOutline = variant === "outline"

  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        height: "32px",
        padding: "0 12px",
        border: isOutline
          ? `0.8px solid ${active ? "#262626" : "#F0F0F0"}`
          : "0.8px solid #F0F0F0",
        borderRadius,
        background: isOutline ? "white" : active ? "#262626" : "white",
        color: isOutline
          ? active
            ? "#262626"
            : "#838383"
          : active
            ? "white"
            : "#838383",
        cursor: "pointer",
        transition: "background 150ms, color 150ms, border-color 150ms",
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  )
}

// ================================================================== //
// PREVIEW SECTIONS                                                     //
// ================================================================== //

function SingleSection() {
  const [active, setActive] = useState("left")
  const items = [
    { key: "left", icon: AlignLeft, position: "first" as const },
    { key: "center", icon: AlignCenter, position: "middle" as const },
    { key: "right", icon: AlignRight, position: "last" as const },
  ]

  return (
    <PreviewSection label="Single">
      <div className="flex" style={{ gap: "-0.8px" }}>
        {items.map((item) => (
          <ToggleGroupItem
            key={item.key}
            active={active === item.key}
            onClick={() => setActive(item.key)}
            position={item.position}
            style={{ marginLeft: item.position !== "first" ? "-0.8px" : undefined }}
          >
            <item.icon style={{ width: "16px", height: "16px" }} />
          </ToggleGroupItem>
        ))}
      </div>
    </PreviewSection>
  )
}

function MultipleSection() {
  const [active, setActive] = useState<Set<string>>(new Set(["bold"]))
  const items = [
    { key: "bold", icon: Bold, position: "first" as const },
    { key: "italic", icon: Italic, position: "middle" as const },
    { key: "underline", icon: Underline, position: "last" as const },
  ]

  function toggle(key: string) {
    setActive((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  return (
    <PreviewSection label="Multiple">
      <div className="flex" style={{ gap: "-0.8px" }}>
        {items.map((item) => (
          <ToggleGroupItem
            key={item.key}
            active={active.has(item.key)}
            onClick={() => toggle(item.key)}
            position={item.position}
            style={{ marginLeft: item.position !== "first" ? "-0.8px" : undefined }}
          >
            <item.icon style={{ width: "16px", height: "16px" }} />
          </ToggleGroupItem>
        ))}
      </div>
    </PreviewSection>
  )
}

function WithIconsSection() {
  const [active, setActive] = useState("grid")
  const items = [
    { key: "grid", icon: Grid, label: "Grid", position: "first" as const },
    { key: "list", icon: List, label: "List", position: "middle" as const },
    { key: "table", icon: LayoutList, label: "Table", position: "last" as const },
  ]

  return (
    <PreviewSection label="With Icons">
      <div className="flex" style={{ gap: "-0.8px" }}>
        {items.map((item) => (
          <ToggleGroupItemWide
            key={item.key}
            active={active === item.key}
            onClick={() => setActive(item.key)}
            position={item.position}
          >
            <item.icon style={{ width: "16px", height: "16px" }} />
            <span style={{ fontSize: "12px", fontWeight: 500 }}>{item.label}</span>
          </ToggleGroupItemWide>
        ))}
      </div>
    </PreviewSection>
  )
}

function OutlineSection() {
  const [active, setActive] = useState("left")
  const items = [
    { key: "left", icon: AlignLeft, position: "first" as const },
    { key: "center", icon: AlignCenter, position: "middle" as const },
    { key: "right", icon: AlignRight, position: "last" as const },
  ]

  return (
    <PreviewSection label="Outline">
      <div className="flex" style={{ gap: "-0.8px" }}>
        {items.map((item) => (
          <ToggleGroupItemWide
            key={item.key}
            active={active === item.key}
            onClick={() => setActive(item.key)}
            position={item.position}
            variant="outline"
          >
            <item.icon style={{ width: "16px", height: "16px" }} />
          </ToggleGroupItemWide>
        ))}
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// PREVIEW                                                              //
// ================================================================== //

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <SingleSection />
      <MultipleSection />
      <WithIconsSection />
      <OutlineSection />
    </div>
  )
}

// ================================================================== //
// CODE                                                                 //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/toggle-group"
      importCode={`import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"`}
      usageCode={`<ToggleGroup type="single" defaultValue="center">
  <ToggleGroupItem value="left">
    <AlignLeft className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="center">
    <AlignCenter className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="right">
    <AlignRight className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const TOGGLE_GROUP_PROPS: PropDef[] = [
  { prop: "type", type: '"single" | "multiple"', defaultVal: "—" },
  { prop: "value", type: "string | string[]", defaultVal: "—" },
  { prop: "onValueChange", type: "(value) => void", defaultVal: "—" },
  { prop: "variant", type: '"default" | "outline"', defaultVal: '"default"' },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="ToggleGroup"
      description="A set of two-state buttons that can be toggled on or off. Supports single and multiple selection modes."
      props={TOGGLE_GROUP_PROPS}
    />
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Composite",
  variants: "4",
  sizes: "1",
  deps: "cn, lucide-react",
  related: [
    { label: "Toggle", href: "/components/toggle" },
    { label: "Toolbar", href: "/components/toolbar" },
  ],
  tokens: [
    { name: "--primary", color: "#262626" },
    { name: "--border", color: "#F0F0F0", border: true },
    { name: "--muted-fg", color: "#838383" },
    { name: "--surface", color: "#FFFFFF", border: true },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function ToggleGroupPage() {
  return (
    <ComponentPageLayout
      name="Toggle Group"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
