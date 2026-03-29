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
// SHARED                                                               //
// ================================================================== //

const btnStyle: React.CSSProperties = {
  height: "28px",
  padding: "0 10.8px",
  borderRadius: "10px",
  border: "0.8px solid #f0f0f0",
  fontSize: "13px",
  fontWeight: 500,
  cursor: "pointer",
  background: "white",
  color: "#262626",
}

const tooltipStyle: React.CSSProperties = {
  background: "#262626",
  color: "#fafafa",
  fontSize: "12px",
  padding: "6px 10px",
  borderRadius: "6px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
  whiteSpace: "nowrap",
  position: "absolute",
  pointerEvents: "none",
}

const arrowSize = 5

// ================================================================== //
// PREVIEW                                                              //
// ================================================================== //

function TooltipDemo({
  side,
  label,
}: {
  side: "top" | "right" | "bottom" | "left"
  label: string
}) {
  const tooltipPos: React.CSSProperties = (() => {
    switch (side) {
      case "top":
        return { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" }
      case "bottom":
        return { top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" }
      case "left":
        return { right: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" }
      case "right":
        return { left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" }
    }
  })()

  const arrowPos: React.CSSProperties = (() => {
    switch (side) {
      case "top":
        return {
          position: "absolute" as const,
          bottom: `-${arrowSize}px`,
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid transparent`,
          borderTop: `${arrowSize}px solid #262626`,
        }
      case "bottom":
        return {
          position: "absolute" as const,
          top: `-${arrowSize}px`,
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid #262626`,
        }
      case "left":
        return {
          position: "absolute" as const,
          right: `-${arrowSize}px`,
          top: "50%",
          transform: "translateY(-50%)",
          width: 0,
          height: 0,
          borderTop: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid transparent`,
          borderLeft: `${arrowSize}px solid #262626`,
        }
      case "right":
        return {
          position: "absolute" as const,
          left: `-${arrowSize}px`,
          top: "50%",
          transform: "translateY(-50%)",
          width: 0,
          height: 0,
          borderTop: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid #262626`,
        }
    }
  })()

  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <button style={btnStyle}>{label}</button>
      <div style={{ ...tooltipStyle, ...tooltipPos }}>
        Tooltip {side}
        <div style={arrowPos} />
      </div>
    </div>
  )
}

function PositionsSection() {
  return (
    <PreviewSection label="Positions" height={340}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <TooltipDemo side="top" label="Top" />
        <TooltipDemo side="right" label="Right" />
        <TooltipDemo side="bottom" label="Bottom" />
        <TooltipDemo side="left" label="Left" />
      </div>
    </PreviewSection>
  )
}

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <PositionsSection />
    </div>
  )
}

// ================================================================== //
// CODE                                                                 //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/tooltip"
      importCode={`import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@hyena/tooltip"`}
      usageCode={`<Tooltip>
  <TooltipTrigger>
    <Button>Hover me</Button>
  </TooltipTrigger>
  <TooltipContent side="top">
    Tooltip content
  </TooltipContent>
</Tooltip>`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const TOOLTIP_PROPS: PropDef[] = [
  { prop: "side", type: '"top" | "right" | "bottom" | "left"', defaultVal: '"top"' },
  { prop: "align", type: '"start" | "center" | "end"', defaultVal: '"center"' },
  { prop: "delayMs", type: "number", defaultVal: "200" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Tooltip"
      description="A popup that displays information on hover or focus."
      props={TOOLTIP_PROPS}
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
    { label: "Popover", href: "/components/popover" },
    { label: "Menu", href: "/components/menu" },
    { label: "Button", href: "/components/button" },
  ],
  tokens: [
    { name: "--primary", color: "#262626" },
    { name: "--primary-fg", color: "#fafafa" },
    { name: "--radius", color: "#e4e4e7", border: true },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function TooltipPage() {
  return (
    <ComponentPageLayout
      name="Tooltip"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
