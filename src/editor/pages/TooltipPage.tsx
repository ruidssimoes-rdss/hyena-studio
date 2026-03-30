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
// SHARED STYLES                                                        //
// ================================================================== //

const btnStyle: React.CSSProperties = {
  height: "28px",
  padding: "0 10.8px",
  borderRadius: "10px",
  border: "0.8px solid #f0f0f0",
  fontSize: "12.3px",
  fontWeight: 500,
  cursor: "pointer",
  background: "white",
  color: "#262626",
}

const tooltipBase: React.CSSProperties = {
  background: "#F0F0F0",
  border: "0.8px solid rgba(240,240,240,0.5)",
  borderRadius: "8px",
  padding: "2px 10px",
  height: "20px",
  fontSize: "12px",
  lineHeight: "16px",
  fontWeight: 400,
  color: "#838383",
  whiteSpace: "nowrap",
  display: "inline-flex",
  alignItems: "center",
  flexShrink: 0,
}

const shortcutBadge: React.CSSProperties = {
  background: "#FFFFFF",
  borderRadius: "3px",
  padding: "0 4px",
  minWidth: "16px",
  height: "14px",
  fontSize: "10px",
  lineHeight: "16px",
  fontWeight: 300,
  color: "#838383",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
}

// ================================================================== //
// STATIC TOOLTIP COMBOS                                                //
// ================================================================== //

function StaticTooltip({
  text,
  shortcut,
  multiline,
}: {
  text: string
  shortcut?: string
  multiline?: boolean
}) {
  const style: React.CSSProperties = multiline
    ? { ...tooltipBase, whiteSpace: "normal", maxWidth: "200px", height: "auto" }
    : shortcut
      ? { ...tooltipBase, gap: "2px" }
      : tooltipBase

  return (
    <div style={style}>
      <span>{text}</span>
      {shortcut && <span style={shortcutBadge}>{shortcut}</span>}
    </div>
  )
}

function Trigger({ label }: { label: string }) {
  return <button style={btnStyle}>{label}</button>
}

/** Static combo: tooltip always visible above trigger */
function TopCombo({
  triggerLabel,
  tooltipText,
  shortcut,
  multiline,
}: {
  triggerLabel: string
  tooltipText: string
  shortcut?: string
  multiline?: boolean
}) {
  return (
    <div className="flex flex-col items-center" style={{ gap: "6px" }}>
      <StaticTooltip text={tooltipText} shortcut={shortcut} multiline={multiline} />
      <Trigger label={triggerLabel} />
    </div>
  )
}

// ================================================================== //
// SECTION 1: POSITIONS                                                 //
// ================================================================== //

function PositionsSection() {
  return (
    <PreviewSection label="Positions">
      {/* Top: tooltip above trigger */}
      <div className="flex flex-col items-center" style={{ gap: "6px" }}>
        <StaticTooltip text="Tooltip top" />
        <Trigger label="Top" />
      </div>

      {/* Bottom: tooltip below trigger */}
      <div className="flex flex-col items-center" style={{ gap: "6px" }}>
        <Trigger label="Bottom" />
        <StaticTooltip text="Tooltip bottom" />
      </div>

      {/* Left: tooltip to the left, both vertically centered */}
      <div className="flex flex-row-reverse items-center" style={{ gap: "8px" }}>
        <Trigger label="Left" />
        <StaticTooltip text="Tooltip left" />
      </div>

      {/* Right: tooltip to the right, both vertically centered */}
      <div className="flex flex-row items-center" style={{ gap: "8px" }}>
        <Trigger label="Right" />
        <StaticTooltip text="Tooltip right" />
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 2: VARIANTS                                                  //
// ================================================================== //

function VariantsSection() {
  return (
    <PreviewSection label="Variants">
      <TopCombo triggerLabel="Default" tooltipText="Default tooltip" />
      <TopCombo triggerLabel="Save" tooltipText="Save" shortcut="⌘S" />
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 3: MULTILINE                                                 //
// ================================================================== //

function MultilineSection() {
  return (
    <PreviewSection label="Multiline">
      <TopCombo
        triggerLabel="Info"
        tooltipText="This action will permanently delete the selected items."
        multiline
      />
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 4: WITH SHORTCUT                                             //
// ================================================================== //

function WithShortcutSection() {
  return (
    <PreviewSection label="With Shortcut">
      <TopCombo triggerLabel="Save" tooltipText="Save" shortcut="⌘S" />
      <TopCombo triggerLabel="Search" tooltipText="Search" shortcut="⌘K" />
      <TopCombo triggerLabel="Delete" tooltipText="Delete" shortcut="⌫" />
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 5: INTERACTIVE                                               //
// ================================================================== //

function InteractiveTooltip({
  triggerLabel,
  tooltipText,
  shortcut,
  delay = 0,
  side = "top",
  iconOnly,
}: {
  triggerLabel: string
  tooltipText: string
  shortcut?: string
  delay?: number
  side?: "top" | "right"
  iconOnly?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = useCallback(() => {
    setHovered(true)
    if (delay === 0) {
      setVisible(true)
    } else {
      const id = setTimeout(() => setVisible(true), delay)
      setTimeoutId(id)
    }
  }, [delay])

  const handleLeave = useCallback(() => {
    setHovered(false)
    setVisible(false)
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
  }, [timeoutId])

  const tooltipEl = (
    <div
      style={{
        ...tooltipBase,
        ...(shortcut ? { gap: "2px" } : {}),
        position: "absolute",
        pointerEvents: "none",
        opacity: visible && hovered ? 1 : 0,
        transition: "opacity 150ms ease",
        ...(side === "top"
          ? { bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)" }
          : { left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" }),
      }}
    >
      <span>{tooltipText}</span>
      {shortcut && <span style={shortcutBadge}>{shortcut}</span>}
    </div>
  )

  return (
    <div
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {iconOnly ? (
        <button
          style={{
            ...btnStyle,
            width: "28px",
            padding: 0,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ?
        </button>
      ) : (
        <Trigger label={triggerLabel} />
      )}
      {tooltipEl}
    </div>
  )
}

function InteractiveSection() {
  return (
    <PreviewSection label="Interactive">
      <InteractiveTooltip triggerLabel="Instant" tooltipText="Instant tooltip" delay={0} />
      <InteractiveTooltip triggerLabel="200ms delay" tooltipText="200ms delay" delay={200} />
      <InteractiveTooltip triggerLabel="500ms delay" tooltipText="500ms delay" delay={500} />
      <InteractiveTooltip
        triggerLabel="?"
        tooltipText="More info"
        side="right"
        iconOnly
      />
      <InteractiveTooltip
        triggerLabel="Help"
        tooltipText="Help"
        shortcut="⌘/"
      />
    </PreviewSection>
  )
}

// ================================================================== //
// PREVIEW TAB                                                          //
// ================================================================== //

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <PositionsSection />
      <VariantsSection />
      <MultilineSection />
      <WithShortcutSection />
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
</Tooltip>

{/* With shortcut */}
<Tooltip>
  <TooltipTrigger>
    <Button>Save</Button>
  </TooltipTrigger>
  <TooltipContent side="top" shortcut="⌘S">
    Save
  </TooltipContent>
</Tooltip>`}
    />
  )
}

// ================================================================== //
// API TAB                                                              //
// ================================================================== //

const TOOLTIP_PROPS: PropDef[] = [
  { prop: "side", type: '"top" | "right" | "bottom" | "left"', defaultVal: '"top"' },
  { prop: "delay", type: "number", defaultVal: "0" },
  { prop: "shortcut", type: "string", defaultVal: "—" },
  { prop: "multiline", type: "boolean", defaultVal: "false" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Tooltip"
      description="A soft pill that displays contextual information on hover or focus. Supports shortcut badges and multiline content."
      props={TOOLTIP_PROPS}
    />
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Primitive",
  variants: "2 (default, with shortcut)",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Badge", href: "/components/badge" },
    { label: "Button", href: "/components/button" },
  ],
  tokens: [
    { name: "--secondary", color: "#F0F0F0", border: true },
    { name: "--muted-fg", color: "#838383" },
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
