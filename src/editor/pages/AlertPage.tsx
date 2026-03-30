"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import {
  ComponentPageLayout,
  ComponentCAP,
  LabelPill,
  PreviewSection,
  StandardCodeTab,
  StandardApiTab,
  type CAPData,
  type PropDef,
} from "@/editor/components/PageShell"
import {
  CircleAlert,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  X,
} from "lucide-react"

// ================================================================== //
// DESIGN TOKENS                                                        //
// ================================================================== //

const CARD_STYLE: React.CSSProperties = {
  width: "240px",
  minWidth: "240px",
  maxWidth: "240px",
  height: "85px",
  minHeight: "85px",
  maxHeight: "85px",
  padding: "10px",
  border: "0.8px solid #F0F0F0",
  borderRadius: "10px",
  background: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
}

const ICON_STYLE: React.CSSProperties = {
  width: "18px",
  height: "18px",
  flexShrink: 0,
}

const SPACER_STYLE: React.CSSProperties = {
  width: "18px",
  height: "18px",
  flexShrink: 0,
  opacity: 0,
}

const TITLE_STYLE = (color: string): React.CSSProperties => ({
  fontSize: "13px",
  fontWeight: 500,
  lineHeight: "18px",
  color,
})

const DESC_STYLE = (color: string): React.CSSProperties => ({
  fontSize: "13px",
  fontWeight: 400,
  lineHeight: "18px",
  color,
  flex: 1,
})

const DESC_NEUTRAL = "rgba(38,38,38,0.7)"

const BTN_BASE: React.CSSProperties = {
  height: "24px",
  padding: "0 10px",
  fontSize: "11px",
  fontWeight: 500,
  borderRadius: "10px",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
}

// ================================================================== //
// SHARED COMPONENTS                                                    //
// ================================================================== //

interface AlertVariant {
  title: string
  desc: string
  color: string
  descColor?: string
}

function AlertCard({ data }: { data: AlertVariant }) {
  const descColor = data.descColor ?? DESC_NEUTRAL
  return (
    <div style={CARD_STYLE}>
      <div className="flex items-center" style={{ gap: "3px" }}>
        <CircleAlert style={{ ...ICON_STYLE, color: data.color }} />
        <span style={TITLE_STYLE(data.color)}>{data.title}</span>
      </div>
      <div className="flex items-start" style={{ gap: "3px" }}>
        <div style={SPACER_STYLE} />
        <span style={DESC_STYLE(descColor)}>{data.desc}</span>
      </div>
    </div>
  )
}

function ActionCard({
  title,
  color,
  actions,
}: {
  title: string
  color: string
  actions: React.ReactNode
}) {
  return (
    <div style={{ ...CARD_STYLE, justifyContent: "space-between" }}>
      <div className="flex items-center" style={{ gap: "3px" }}>
        <CircleAlert style={{ ...ICON_STYLE, color }} />
        <span style={TITLE_STYLE(color)}>{title}</span>
      </div>
      <div className="flex items-center justify-end" style={{ gap: "6px" }}>
        {actions}
      </div>
    </div>
  )
}

function OutlineBtn({ label }: { label: string }) {
  return (
    <button style={{ ...BTN_BASE, background: "#FFFFFF", border: "1px solid #F0F0F0", color: "#262626" }}>
      {label}
    </button>
  )
}

function SecondaryBtn({ label }: { label: string }) {
  return (
    <button style={{ ...BTN_BASE, background: "#F0F0F0", border: "1px solid #F0F0F0", color: "#838383" }}>
      {label}
    </button>
  )
}

function FilledBtn({ label, bg, borderColor }: { label: string; bg: string; borderColor: string }) {
  return (
    <button style={{ ...BTN_BASE, background: bg, border: `1px solid ${borderColor}`, color: "#FFFFFF" }}>
      {label}
    </button>
  )
}

function SectionBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        marginTop: "7px",
        border: "1px solid #f0f0f0",
        borderRadius: "10px",
        background: "white",
        padding: "24px 35px",
      }}
    >
      <div className="flex flex-col items-center" style={{ gap: "10px" }}>
        {children}
      </div>
    </div>
  )
}

// ================================================================== //
// SECTION 1: VARIANTS                                                  //
// ================================================================== //

const VARIANTS: AlertVariant[] = [
  { title: "Heads up!", desc: "You can add components to your app using the CLI.", color: "#171717" },
  { title: "Information", desc: "A new version of the CLI is available.", color: "#B392F0" },
  { title: "Warning", desc: "Your free trial expires in 3 days on 08/10/2026.", color: "#F97316" },
  { title: "Error", desc: "Something went wrong. Please try again.", color: "#D5143E" },
  { title: "Success", desc: "Your changes have been saved successfully.", color: "#14B8A6" },
]

function VariantsSection() {
  return (
    <div>
      <LabelPill text="Variants" />
      <SectionBox>
        {VARIANTS.map((v) => (
          <AlertCard key={v.title} data={v} />
        ))}
      </SectionBox>
    </div>
  )
}

// ================================================================== //
// SECTION 2: VARIANTS (BOUND)                                          //
// ================================================================== //

const BOUND_VARIANTS: AlertVariant[] = [
  { title: "Loading", desc: "Use present continuous tense (\u201CSaving\u2026\u201D, \u201CProcessing\u2026\u201D)", color: "#838383", descColor: "#838383" },
  { title: "Destructive", desc: "Delete project? This cannot be undone.", color: "#D5143E", descColor: "#D5143E" },
  { title: "Progress", desc: "\u201CUploading\u2026 67%\u201D, complete (ETA 45s)\u201D.", color: "#3B82F6", descColor: "#3B82F6" },
]

function BoundVariantsSection() {
  return (
    <div>
      <LabelPill text="Variants (Bound)" />
      <SectionBox>
        {BOUND_VARIANTS.map((v) => (
          <AlertCard key={v.title} data={v} />
        ))}
      </SectionBox>
    </div>
  )
}

// ================================================================== //
// SECTION 3: WITH ACTIONS                                              //
// ================================================================== //

function WithActionsSection() {
  return (
    <div>
      <LabelPill text="With Actions" />
      <SectionBox>
        <ActionCard
          title="Changes saved"
          color="#14B8A6"
          actions={<OutlineBtn label="Undo" />}
        />
        <ActionCard
          title="Free trial expires in 3 days"
          color="#F97316"
          actions={<FilledBtn label="Upgrade now" bg="#F97316" borderColor="#F97316" />}
        />
        <ActionCard
          title="Something went wrong"
          color="#D5143E"
          actions={<><OutlineBtn label="Try again" /><SecondaryBtn label="View logs" /></>}
        />
        <ActionCard
          title='Delete project "Acme"?'
          color="#D5143E"
          actions={<><OutlineBtn label="Cancel" /><FilledBtn label="Delete" bg="#D5143E" borderColor="#D5143E" /></>}
        />
      </SectionBox>
    </div>
  )
}

// ================================================================== //
// SECTION 4: PERSISTENCE                                               //
// ================================================================== //

function AutoDismissAlert() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(100)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startCycle = useCallback(() => {
    setVisible(true)
    setProgress(100)
    let p = 100
    intervalRef.current = setInterval(() => {
      p -= 2
      setProgress(Math.max(p, 0))
      if (p <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setVisible(false)
        setTimeout(() => {
          setVisible(true)
          setProgress(100)
          startCycle()
        }, 2300)
      }
    }, 100)
  }, [])

  useEffect(() => {
    startCycle()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      style={{
        ...CARD_STYLE,
        height: "auto",
        minHeight: "auto",
        maxHeight: "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-8px)",
        transition: "opacity 300ms, transform 300ms",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div className="flex items-center" style={{ gap: "3px" }}>
        <CheckCircle style={{ ...ICON_STYLE, color: "#14B8A6" }} />
        <span style={TITLE_STYLE("#14B8A6")}>Changes saved</span>
      </div>
      {/* Progress bar */}
      <div
        style={{
          width: "100%",
          height: "5px",
          borderRadius: "10px",
          border: "0.8px solid #14B8A6",
          overflow: "hidden",
          marginTop: "2px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #14B8A6 0%, #FFFFFF 100%)",
            transition: "width 100ms linear",
            borderRadius: "10px",
          }}
        />
      </div>
    </div>
  )
}

function PersistentAlert() {
  const [visible, setVisible] = useState(true)

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => setVisible(true), 2000)
  }

  return (
    <div
      style={{
        ...CARD_STYLE,
        justifyContent: "space-between",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-8px)",
        transition: "opacity 300ms, transform 300ms",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center" style={{ gap: "3px" }}>
          <CircleAlert style={{ ...ICON_STYLE, color: "#F97316" }} />
          <span style={TITLE_STYLE("#F97316")}>Free trial has expired</span>
        </div>
        <button
          onClick={handleClose}
          className="inline-flex items-center justify-center"
          style={{
            width: "14px",
            height: "14px",
            background: "none",
            border: "1.17px solid #F97316",
            borderRadius: "3px",
            cursor: "pointer",
            padding: 0,
            flexShrink: 0,
          }}
        >
          <X style={{ width: "10px", height: "10px", color: "#F97316" }} />
        </button>
      </div>
      <div className="flex items-center justify-end">
        <FilledBtn label="Upgrade now" bg="#F97316" borderColor="#F97316" />
      </div>
    </div>
  )
}

function PersistenceSection() {
  return (
    <div>
      <LabelPill text="Persistence" />
      <SectionBox>
        <AutoDismissAlert />
        <PersistentAlert />
      </SectionBox>
    </div>
  )
}

// ================================================================== //
// SECTION 5: COMPACT                                                   //
// ================================================================== //

const COMPACT_PILLS: Array<{
  color: string
  bg: string
  border: string
  icon: React.ReactNode
  label: string
}> = [
  { color: "#14B8A6", bg: "rgba(20,184,166,0.05)", border: "#14B8A6", icon: <CheckCircle strokeWidth={1.5} />, label: "Success" },
  { color: "#F97316", bg: "rgba(249,115,22,0.05)", border: "#F97316", icon: <AlertTriangle strokeWidth={1.5} />, label: "Warning" },
  { color: "#D5143E", bg: "rgba(213,20,62,0.05)", border: "#D5143E", icon: <XCircle strokeWidth={1.5} />, label: "Error" },
  { color: "#B392F0", bg: "rgba(179,146,240,0.05)", border: "#B392F0", icon: <Info strokeWidth={1.5} />, label: "Information" },
  { color: "#3B82F6", bg: "rgba(59,130,246,0.05)", border: "#3B82F6", icon: <Info strokeWidth={1.5} />, label: "Progress" },
]

function CompactPill({
  pill,
}: {
  pill: (typeof COMPACT_PILLS)[number]
}) {
  const [hovered, setHovered] = useState(false)
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="flex flex-col items-center">
      <button
        className="inline-flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setExpanded(!expanded)}
        style={{
          height: "32px",
          width: hovered || expanded ? "auto" : "32px",
          minWidth: "32px",
          padding: hovered || expanded ? "0 10px" : "0",
          background: pill.bg,
          border: `1px solid ${pill.border}`,
          borderRadius: "10px",
          gap: "6px",
          cursor: "pointer",
          transition: "all 200ms ease-out",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", color: pill.color, flexShrink: 0 }}>
          {pill.icon}
        </span>
        {(hovered || expanded) && (
          <span style={{ fontSize: "12px", fontWeight: 500, color: pill.color }}>
            {pill.label}
          </span>
        )}
      </button>
      {expanded && (
        <div
          style={{
            marginTop: "6px",
            padding: "8px 10px",
            background: pill.bg,
            border: `1px solid ${pill.border}`,
            borderRadius: "10px",
            fontSize: "12px",
            color: pill.color,
            lineHeight: "18px",
            animation: "section-enter 200ms ease-out",
          }}
        >
          {pill.label} alert expanded content
        </div>
      )}
    </div>
  )
}

function CompactSection() {
  return (
    <div>
      <LabelPill text="Compact" />
      <div
        className="flex flex-col items-center justify-center"
        style={{ marginTop: "7px", border: "1px solid #f0f0f0", borderRadius: "10px", background: "white", padding: "24px 35px" }}
      >
        <div className="flex flex-col items-center" style={{ gap: "8px" }}>
          {COMPACT_PILLS.map((pill) => (
            <CompactPill key={pill.label} pill={pill} />
          ))}
        </div>
        <span style={{ fontSize: "10px", fontWeight: 400, color: "#A1A1A1", marginTop: "12px", lineHeight: "15px" }}>
          Hover to peek, click to expand
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
      <VariantsSection />
      <BoundVariantsSection />
      <WithActionsSection />
      <PersistenceSection />
      <CompactSection />
    </div>
  )
}

// ================================================================== //
// CODE                                                                 //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/alert"
      importCode={`import { Alert, AlertTitle, AlertDescription } from "@hyena/alert"`}
      usageCode={`<Alert variant="success">\n  <AlertTitle>Changes saved</AlertTitle>\n  <AlertDescription>\n    Your changes have been saved successfully.\n  </AlertDescription>\n</Alert>\n\n<Alert variant="error">\n  <AlertTitle>Error</AlertTitle>\n  <AlertDescription>\n    Something went wrong.\n  </AlertDescription>\n</Alert>`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const ALERT_PROPS: PropDef[] = [
  { prop: "variant", type: '"default" | "information" | "success" | "warning" | "error" | "destructive" | "progress" | "loading"', defaultVal: '"default"' },
  { prop: "dismissible", type: "boolean", defaultVal: "false" },
  { prop: "autoDismiss", type: "number | false", defaultVal: "false" },
  { prop: "onDismiss", type: "() => void", defaultVal: "—" },
  { prop: "className", type: "string", defaultVal: "—" },
  { prop: "children", type: "React.ReactNode", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Alert"
      description="A callout for important messages with semantic variants."
      props={ALERT_PROPS}
    />
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Composite",
  variants: "8",
  sizes: "5",
  deps: "cva, cn",
  related: [
    { label: "Badge", href: "/components/badge" },
    { label: "Button", href: "/components/button" },
    { label: "Toast", href: "/components/toast" },
  ],
  tokens: [
    { name: "--neutral", color: "#171717" },
    { name: "--information", color: "#B392F0" },
    { name: "--success", color: "#14B8A6" },
    { name: "--warning", color: "#F97316" },
    { name: "--error", color: "#D5143E" },
    { name: "--progress", color: "#3B82F6" },
    { name: "--loading", color: "#838383" },
    { name: "--border", color: "#F0F0F0", border: true },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function AlertPage() {
  return (
    <ComponentPageLayout
      name="Alert"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
