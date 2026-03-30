"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  ChevronRight, Mail, Plus, Star, Settings, Download, Trash2,
  AlertTriangle, Search, Copy, MoreHorizontal, X, Check, Loader2,
} from "lucide-react"
import { useSetCAP } from "@/editor/shell/CAPContext"
import { ButtonCAP } from "@/editor/shell/ButtonCAP"
import { CodeBlock } from "@/editor/components/CodeBlock"
import { PreviewSection } from "@/editor/components/PageShell"

// ================================================================== //
// DESIGN TOKENS — exact Figma values from DESIGN-SPEC                //
// ================================================================== //

type ButtonVariant =
  | "primary"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | "destructive"
  | "destructive-outline"

const VARIANT_STYLES: Record<
  ButtonVariant,
  { bg: string; border: string; color: string; textDecoration?: string }
> = {
  primary: { bg: "#262626", border: "0.8px solid #262626", color: "#fafafa" },
  outline: { bg: "white", border: "0.8px solid #f0f0f0", color: "#171717" },
  secondary: { bg: "#f0f0f0", border: "0.8px solid #f0f0f0", color: "rgba(23,23,23,0.5)" },
  ghost: { bg: "white", border: "0.8px solid #f0f0f0", color: "#838383" },
  link: { bg: "white", border: "0.8px solid #f0f0f0", color: "#262626", textDecoration: "underline" },
  destructive: { bg: "#d5143e", border: "0.8px solid #bf2144", color: "#fafafa" },
  "destructive-outline": { bg: "rgba(213,20,62,0.05)", border: "0.8px solid #bf2144", color: "#d5143e" },
}

const SIZE_SCALE: Record<string, { height: number; fontSize: string; padding: string }> = {
  xs: { height: 20, fontSize: "11px", padding: "0 6px" },
  sm: { height: 24, fontSize: "12px", padding: "0 8px" },
  md: { height: 28, fontSize: "13px", padding: "0 10.8px" },
  lg: { height: 40, fontSize: "14px", padding: "0 16px" },
  xl: { height: 44, fontSize: "16px", padding: "0 18px" },
}

// ================================================================== //
// SHARED COMPONENTS                                                   //
// ================================================================== //

function PreviewButton({
  variant, label, size = "md", icon, disabled, style: extraStyle, className,
}: {
  variant: ButtonVariant
  label?: string
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  icon?: React.ReactNode
  disabled?: boolean
  style?: React.CSSProperties
  className?: string
}) {
  const s = VARIANT_STYLES[variant]
  const sz = SIZE_SCALE[size]
  return (
    <button
      className={`inline-flex items-center justify-center font-medium ${className || ""}`}
      disabled={disabled}
      style={{
        height: `${sz.height}px`,
        padding: sz.padding,
        borderRadius: "10px",
        background: s.bg,
        border: s.border,
        color: s.color,
        fontSize: sz.fontSize,
        lineHeight: "17.5px",
        gap: "6px",
        textDecoration: s.textDecoration,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        ...extraStyle,
      }}
    >
      {icon}
      {label}
    </button>
  )
}

function LabelPill({ text }: { text: string }) {
  return (
    <div
      className="inline-flex items-center font-medium"
      style={{
        height: "28px",
        padding: "0 10.8px",
        borderRadius: "10px",
        border: "0.8px solid #f0f0f0",
        background: "white",
        fontSize: "12.3px",
        color: "#36393d",
      }}
    >
      {text}
    </div>
  )
}

type ContentTab = "preview" | "code" | "api"

function TabBar({
  active, onChange, bundled, onBundleToggle,
}: {
  active: ContentTab
  onChange: (tab: ContentTab) => void
  bundled: boolean
  onBundleToggle: () => void
}) {
  const tabs: Array<{ value: ContentTab; label: string }> = [
    { value: "preview", label: "Preview" },
    { value: "code", label: "Code" },
    { value: "api", label: "API" },
  ]
  return (
    <div className="flex items-center justify-between" style={{ height: "28px" }}>
      <div className="flex items-center" style={{ gap: "6px" }}>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className="font-medium transition-colors duration-150"
            style={{
              height: "28px",
              padding: "0.8px 10.8px",
              borderRadius: "10px",
              border: "0.8px solid #f0f0f0",
              fontSize: "12.3px",
              color: active === tab.value ? "#262626" : "#a8abb2",
              background: active === tab.value ? "#f0f0f0" : "white",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex items-center" style={{ gap: "8px" }}>
        <span className="font-medium" style={{ fontSize: "12.3px", color: "#a8abb2" }}>
          Bundle
        </span>
        <button
          onClick={onBundleToggle}
          className="relative"
          style={{
            width: "38px",
            height: "20px",
            borderRadius: "10px",
            background: bundled ? "#262626" : "#f0f0f0",
            transition: "background 200ms",
          }}
          aria-label="Toggle bundle"
        >
          <div
            className="absolute"
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "8px",
              background: "white",
              boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
              top: "2px",
              left: bundled ? "20px" : "2px",
              transition: "left 200ms",
            }}
          />
        </button>
      </div>
    </div>
  )
}

// ================================================================== //
// PREVIEW TAB                                                         //
// ================================================================== //

function VariantsSection() {
  return (
    <PreviewSection label="Variants">
      <PreviewButton variant="primary" label="Button" />
      <PreviewButton variant="outline" label="Outline" />
      <PreviewButton variant="secondary" label="Secondary" />
      <PreviewButton variant="ghost" label="Ghost" />
      <PreviewButton variant="link" label="Link" />
      <PreviewButton variant="destructive" label="Destructive" />
      <PreviewButton variant="destructive-outline" label="Destructive" />
    </PreviewSection>
  )
}

function SizesSection() {
  return (
    <PreviewSection label="Sizes">
      <PreviewButton variant="primary" label="Extra Large" size="xl" />
      <PreviewButton variant="primary" label="Large" size="lg" />
      <PreviewButton variant="primary" label="Default" size="md" />
      <PreviewButton variant="primary" label="Small" size="sm" />
      <PreviewButton variant="primary" label="Extra Small" size="xs" />
    </PreviewSection>
  )
}

function WithIconsSection() {
  const iconStyle = { width: "14px", height: "14px", opacity: 0.8 }
  return (
    <PreviewSection label="With Icons">
      <PreviewButton variant="primary" label="Send" icon={<Mail style={iconStyle} />} />
      <PreviewButton variant="outline" label="Add" icon={<Plus style={iconStyle} />} />
      <PreviewButton variant="outline" label="Favorite" icon={<Star style={iconStyle} />} />
      <PreviewButton variant="ghost" label="Settings" icon={<Settings style={iconStyle} />} />
      <PreviewButton variant="link" label="Download" icon={<Download style={iconStyle} />} />
      <PreviewButton variant="destructive" label="Delete" icon={<Trash2 style={iconStyle} />} />
      <PreviewButton variant="destructive-outline" label="Warning" icon={<AlertTriangle style={iconStyle} />} />
    </PreviewSection>
  )
}

function IconOnlySection() {
  const icons: Array<{
    variant: ButtonVariant
    icon: React.ReactNode
    bg: string
    border: string
    color: string
  }> = [
    { variant: "primary", icon: <Plus />, bg: "#262626", border: "0.8px solid #262626", color: "#fafafa" },
    { variant: "outline", icon: <Search />, bg: "white", border: "0.8px solid #f0f0f0", color: "#171717" },
    { variant: "secondary", icon: <Copy />, bg: "#f0f0f0", border: "0.8px solid #f0f0f0", color: "rgba(23,23,23,0.5)" },
    { variant: "ghost", icon: <MoreHorizontal />, bg: "white", border: "0.8px solid #f0f0f0", color: "#838383" },
    { variant: "destructive", icon: <Trash2 />, bg: "#d5143e", border: "0.8px solid #bf2144", color: "#fafafa" },
    { variant: "destructive-outline", icon: <X />, bg: "rgba(213,20,62,0.05)", border: "0.8px solid #bf2144", color: "#d5143e" },
  ]

  return (
    <div>
      <LabelPill text="Icon Only" />
      <div
        className="flex items-center justify-center"
        style={{
          marginTop: "7px",
          border: "1px solid #f0f0f0",
          borderRadius: "10px",
          background: "white",
          padding: "24px 0",
        }}
      >
        <div className="flex flex-col items-center" style={{ gap: "10px" }}>
          {icons.map((item, i) => (
            <button
              key={i}
              className="inline-flex items-center justify-center"
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "10px",
                background: item.bg,
                border: item.border,
                color: item.color,
                cursor: "pointer",
              }}
            >
              {/* Clone icon with proper size and opacity */}
              <span style={{ opacity: 0.8, display: "flex" }}>
                {/* Force 16px icon */}
                <span style={{ width: "16px", height: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.icon}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatesSection() {
  const states: Array<{
    label: string
    style: React.CSSProperties
    disabled?: boolean
    showSpinner?: boolean
  }> = [
    { label: "Default", style: {} },
    { label: "Hover", style: { background: "rgba(38,38,38,0.85)" } },
    { label: "Active", style: { background: "rgba(38,38,38,0.75)", boxShadow: "none" } },
    { label: "Focused", style: { boxShadow: "0 0 0 2px #ffffff, 0 0 0 4px #a1a1a1" } },
    { label: "Disabled", style: { opacity: 0.5, cursor: "not-allowed" }, disabled: true },
    { label: "Loading", style: { color: "transparent" }, showSpinner: true },
  ]

  return (
    <div>
      <LabelPill text="States" />
      <div
        className="flex items-center justify-center"
        style={{
          marginTop: "7px",
          border: "1px solid #f0f0f0",
          borderRadius: "10px",
          background: "white",
          padding: "24px 0",
        }}
      >
        <div className="flex flex-col items-center" style={{ gap: "10px" }}>
          {states.map((state) => (
            <div key={state.label} className="flex flex-col items-center">
              <button
                className="relative inline-flex items-center justify-center font-medium"
                disabled={state.disabled}
                style={{
                  height: "28px",
                  padding: "0 10.8px",
                  borderRadius: "10px",
                  background: "#262626",
                  border: "0.8px solid #262626",
                  color: "#fafafa",
                  fontSize: "13px",
                  lineHeight: "17.5px",
                  cursor: state.disabled ? "not-allowed" : "pointer",
                  ...state.style,
                }}
              >
                Button
                {state.showSpinner && (
                  <span
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ color: "#fafafa" }}
                  >
                    <span
                      style={{
                        width: "16px",
                        height: "16px",
                        border: "2px solid #fafafa",
                        borderTopColor: "transparent",
                        borderRadius: "50%",
                        animation: "spin 0.7s linear infinite",
                      }}
                    />
                  </span>
                )}
              </button>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 400,
                  color: "#a1a1a1",
                  marginTop: "6px",
                  textAlign: "center",
                }}
              >
                {state.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ------------------------------------------------------------------ //
// Interactions section — live interactive buttons                      //
// ------------------------------------------------------------------ //

function InteractionCell({
  label, desc, children,
}: {
  label: string
  desc: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center">
      {children}
      <span style={{ fontSize: "10px", fontWeight: 500, color: "#727272", marginTop: "8px", textAlign: "center" }}>
        {label}
      </span>
      <span style={{ fontSize: "10px", fontWeight: 400, color: "#a1a1a1", marginTop: "2px", textAlign: "center" }}>
        {desc}
      </span>
    </div>
  )
}

function HoverButton() {
  return (
    <InteractionCell label="Hover" desc="150ms ease-out">
      <button
        className="inline-flex items-center justify-center font-medium"
        style={{
          height: "28px", padding: "0 10.8px", borderRadius: "10px",
          background: "#262626", border: "0.8px solid #262626",
          color: "#fafafa", fontSize: "13px", cursor: "pointer",
          transition: "background 150ms ease-out",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(38,38,38,0.85)" }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "#262626" }}
      >
        Hover me
      </button>
    </InteractionCell>
  )
}

function PressButton() {
  return (
    <InteractionCell label="Press" desc="scale(0.97)">
      <button
        className="inline-flex items-center justify-center font-medium"
        style={{
          height: "28px", padding: "0 10.8px", borderRadius: "10px",
          background: "#262626", border: "0.8px solid #262626",
          color: "#fafafa", fontSize: "13px", cursor: "pointer",
          transition: "transform 100ms ease, background 100ms ease",
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "scale(0.97)"
          e.currentTarget.style.background = "#1a1a1a"
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "scale(1)"
          e.currentTarget.style.background = "#262626"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)"
          e.currentTarget.style.background = "#262626"
        }}
      >
        Press me
      </button>
    </InteractionCell>
  )
}

function FocusButton() {
  return (
    <InteractionCell label="Focus" desc="ring expands 150ms">
      <button
        className="inline-flex items-center justify-center font-medium"
        style={{
          height: "28px", padding: "0 10.8px", borderRadius: "10px",
          background: "white", border: "0.8px solid #f0f0f0",
          color: "#171717", fontSize: "13px", cursor: "pointer",
          transition: "box-shadow 150ms ease-out",
          outline: "none",
        }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = "0 0 0 2px #ffffff, 0 0 0 4px #a1a1a1"
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = "none"
        }}
      >
        Tab to me
      </button>
    </InteractionCell>
  )
}

function LoadingButton() {
  const [loading, setLoading] = useState(false)

  const handleClick = useCallback(() => {
    if (loading) return
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }, [loading])

  return (
    <InteractionCell label="Loading" desc="click to trigger">
      <button
        onClick={handleClick}
        className="relative inline-flex items-center justify-center font-medium"
        style={{
          height: "28px", padding: "0 10.8px", borderRadius: "10px",
          background: "#262626", border: "0.8px solid #262626",
          fontSize: "13px", cursor: loading ? "default" : "pointer",
          minWidth: "72px",
        }}
      >
        <span style={{ color: loading ? "transparent" : "#fafafa", transition: "color 150ms" }}>
          Submit
        </span>
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span
              style={{
                width: "16px", height: "16px",
                border: "2px solid #fafafa", borderTopColor: "transparent",
                borderRadius: "50%", animation: "spin 0.7s linear infinite",
              }}
            />
          </span>
        )}
      </button>
    </InteractionCell>
  )
}

function SuccessButton() {
  const [phase, setPhase] = useState<"idle" | "loading" | "success">("idle")

  const handleClick = useCallback(() => {
    if (phase !== "idle") return
    setPhase("loading")
    setTimeout(() => setPhase("success"), 1000)
    setTimeout(() => setPhase("idle"), 3000)
  }, [phase])

  const bg = phase === "success" ? "#14B8A6" : "#262626"

  return (
    <InteractionCell label="Success" desc="loading → complete">
      <button
        onClick={handleClick}
        className="relative inline-flex items-center justify-center font-medium"
        style={{
          height: "28px", padding: "0 10.8px", borderRadius: "10px",
          background: bg, border: `0.8px solid ${bg}`,
          fontSize: "13px", cursor: phase === "idle" ? "pointer" : "default",
          minWidth: "60px", transition: "background 200ms, border-color 200ms",
        }}
      >
        <span style={{ color: phase === "idle" ? "#fafafa" : "transparent", transition: "color 150ms" }}>
          Save
        </span>
        {phase === "loading" && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span style={{
              width: "16px", height: "16px",
              border: "2px solid #fafafa", borderTopColor: "transparent",
              borderRadius: "50%", animation: "spin 0.7s linear infinite",
            }} />
          </span>
        )}
        {phase === "success" && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Check style={{ width: "16px", height: "16px", color: "#fafafa" }} />
          </span>
        )}
      </button>
    </InteractionCell>
  )
}

function ErrorButton() {
  const [shaking, setShaking] = useState(false)

  return (
    <InteractionCell label="Error" desc="shake 400ms">
      <button
        onClick={() => {
          if (shaking) return
          setShaking(true)
          setTimeout(() => setShaking(false), 400)
        }}
        className="inline-flex items-center justify-center font-medium"
        style={{
          height: "28px", padding: "0 10.8px", borderRadius: "10px",
          background: "rgba(213,20,62,0.05)", border: "0.8px solid #bf2144",
          color: "#d5143e", fontSize: "13px", cursor: "pointer",
          animation: shaking ? "shake 400ms ease-out" : "none",
        }}
      >
        Delete
      </button>
    </InteractionCell>
  )
}

function PulseButton() {
  return (
    <InteractionCell label="Pulse" desc="attention CTA">
      <button
        className="inline-flex items-center justify-center font-medium"
        style={{
          height: "28px", padding: "0 10.8px", borderRadius: "10px",
          background: "#262626", border: "0.8px solid #262626",
          color: "#fafafa", fontSize: "13px", cursor: "pointer",
          animation: "pulse-ring 2s ease-in-out infinite",
        }}
      >
        Get Started
      </button>
    </InteractionCell>
  )
}

function ProgressButton() {
  const [state, setState] = useState<"idle" | "progress" | "done">("idle")
  const [pct, setPct] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const handleClick = useCallback(() => {
    if (state !== "idle") return
    setState("progress")
    setPct(0)
    let current = 0
    intervalRef.current = setInterval(() => {
      current += 1
      const p = Math.round((current / 60) * 100) // 60 ticks over 3s at ~50ms
      setPct(Math.min(p, 100))
      if (current >= 60) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setState("done")
        setTimeout(() => {
          setState("idle")
          setPct(0)
        }, 1000)
      }
    }, 50)
  }, [state])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const label = state === "done" ? "Done ✓" : state === "progress" ? `${pct}%` : "Upload"
  const textColor = state === "done" ? "#14B8A6" : "#171717"

  return (
    <InteractionCell label="Progress" desc="click to upload">
      <button
        onClick={handleClick}
        className="relative inline-flex items-center justify-center font-medium overflow-hidden"
        disabled={state === "progress"}
        style={{
          height: "28px", padding: "0 10.8px", borderRadius: "10px",
          background: "white", border: "0.8px solid #f0f0f0",
          color: textColor, fontSize: "13px",
          cursor: state === "idle" ? "pointer" : "default",
          minWidth: "72px",
          transition: "color 200ms",
        }}
      >
        {state === "progress" && (
          <div
            style={{
              position: "absolute", left: 0, top: 0, bottom: 0,
              width: `${pct}%`,
              background: "rgba(38,38,38,0.08)",
              borderRadius: "10px",
              transition: "width 50ms linear",
            }}
          />
        )}
        <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
      </button>
    </InteractionCell>
  )
}

function InteractionsSection() {
  return (
    <div>
      <LabelPill text="Interactions" />
      <div
        className="flex items-center justify-center"
        style={{
          marginTop: "7px",
          border: "1px solid #f0f0f0",
          borderRadius: "10px",
          background: "white",
          padding: "24px 0",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: "24px",
            rowGap: "20px",
          }}
        >
          <HoverButton />
          <PressButton />
          <FocusButton />
          <LoadingButton />
          <SuccessButton />
          <ErrorButton />
          <PulseButton />
          <ProgressButton />
        </div>
      </div>
    </div>
  )
}

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <VariantsSection />
      <SizesSection />
      <WithIconsSection />
      <IconOnlySection />
      <StatesSection />
      <InteractionsSection />
    </div>
  )
}

// ================================================================== //
// CODE TAB                                                            //
// ================================================================== //

function PkgManagerTabs({
  active, onChange,
}: {
  active: string
  onChange: (tab: string) => void
}) {
  const tabs = ["bun", "npm", "pnpm", "yarn"]
  return (
    <div
      className="inline-flex items-center"
      style={{
        gap: "2px",
        padding: "3px",
        background: "rgba(0,0,0,0.04)",
        borderRadius: "6px",
      }}
    >
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className="font-medium"
          style={{
            height: "24px",
            padding: "0 10px",
            borderRadius: "4px",
            fontSize: "11px",
            background: active === t ? "white" : "transparent",
            color: active === t ? "#262626" : "#a1a1a1",
            boxShadow: active === t ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
            border: "none",
            cursor: "pointer",
            transition: "all 150ms",
          }}
        >
          {t}
        </button>
      ))}
    </div>
  )
}

const INSTALL_COMMANDS: Record<string, string> = {
  bun: "bun add @hyena/button",
  npm: "npm install @hyena/button",
  pnpm: "pnpm add @hyena/button",
  yarn: "yarn add @hyena/button",
}

function CodeTab() {
  const [pkgMgr, setPkgMgr] = useState("pnpm")

  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      {/* Installation */}
      <div>
        <LabelPill text="Installation" />
        <div style={{ marginTop: "8px" }}>
          <PkgManagerTabs active={pkgMgr} onChange={setPkgMgr} />
        </div>
        <div style={{ marginTop: "12px" }}>
          <CodeBlock
            filename="Terminal"
            code={INSTALL_COMMANDS[pkgMgr]}
            highlight={false}
          />
        </div>
      </div>

      {/* Usage */}
      <div>
        <LabelPill text="Usage" />
        <div style={{ marginTop: "8px" }}>
          <CodeBlock
            filename="import"
            code={`import { Button } from "@/components/ui/button"`}
          />
        </div>
        <div style={{ marginTop: "12px" }}>
          <CodeBlock
            filename="usage.tsx"
            code={`<Button>Button</Button>`}
          />
        </div>
      </div>

      {/* Link */}
      <div>
        <LabelPill text="Link" />
        <p
          style={{
            fontSize: "12.3px",
            fontWeight: 400,
            color: "#727272",
            lineHeight: 1.6,
            marginTop: "12px",
            marginBottom: "12px",
          }}
        >
          You can use the render prop to make another component look like a button.
          Here&apos;s an example of a link that looks like a button.
        </p>
        <CodeBlock
          filename="link-as-button.tsx"
          code={`import Link from "next/link"
import { Button } from "@/components/ui/button"

export function LinkAsButton() {
  return (
    <Button render={<Link href="/login" />}>
      Login
    </Button>
  )
}`}
        />
      </div>
    </div>
  )
}

// ================================================================== //
// API TAB                                                             //
// ================================================================== //

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code
      className="font-mono"
      style={{
        background: "rgba(0,0,0,0.05)",
        padding: "2px 6px",
        borderRadius: "4px",
        fontSize: "11px",
        color: "#262626",
      }}
    >
      {children}
    </code>
  )
}

const PROPS_DATA: Array<{ prop: string; type: string; defaultVal: string }> = [
  {
    prop: "variant",
    type: '"default" | "outline" | "secondary" | "ghost" | "link" | "destructive" | "destructive-outline"',
    defaultVal: '"default"',
  },
  {
    prop: "size",
    type: '"default" | "sm" | "xs" | "lg" | "xl" | "icon" | "icon-sm" | "icon-lg"',
    defaultVal: '"default"',
  },
  { prop: "loading", type: "boolean", defaultVal: "false" },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
  { prop: "render", type: "React.ReactElement", defaultVal: "—" },
  { prop: "className", type: "string", defaultVal: "—" },
  { prop: "children", type: "React.ReactNode", defaultVal: "—" },
]

function ApiTab() {
  return (
    <div>
      {/* Component heading */}
      <h2 style={{ fontSize: "16px", fontWeight: 500, color: "#262626", marginBottom: "4px" }}>
        Button
      </h2>
      <p style={{ fontSize: "12.3px", fontWeight: 400, color: "#727272", lineHeight: 1.6, marginBottom: "24px" }}>
        A button component with variant, size, and loading states.
      </p>

      {/* Props table */}
      <LabelPill text="Props" />
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
            {PROPS_DATA.map((row, i) => (
              <tr
                key={row.prop}
                style={{
                  borderBottom: i < PROPS_DATA.length - 1 ? "1px solid #f0f0f0" : "none",
                  transition: "background 100ms",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.02)" }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent" }}
              >
                <td
                  className="font-medium"
                  style={{
                    fontSize: "12.3px",
                    color: "#262626",
                    height: "40px",
                    padding: "0 12px",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.prop}
                </td>
                <td
                  className="font-mono"
                  style={{
                    fontSize: "11px",
                    color: "#727272",
                    height: "40px",
                    padding: "0 12px",
                    maxWidth: "300px",
                    wordBreak: "break-word",
                  }}
                >
                  {row.type}
                </td>
                <td
                  className="font-mono"
                  style={{
                    fontSize: "11px",
                    color: "#262626",
                    height: "40px",
                    padding: "0 12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.defaultVal}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Loading behavior */}
      <div style={{ marginTop: "28px" }}>
        <LabelPill text="Loading behavior" />
        <div style={{ marginTop: "12px" }}>
          <p style={{ fontSize: "12.3px", fontWeight: 400, color: "#727272", lineHeight: 1.8 }}>
            When <InlineCode>loading</InlineCode> is set to true, the component:
          </p>
          <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
            {[
              <>— Renders a spinner inside a <InlineCode>data-slot=&quot;button-loading-indicator&quot;</InlineCode> container</>,
              <>— Adds <InlineCode>data-loading</InlineCode> to the button root element</>,
              <>— Forces the native <InlineCode>disabled</InlineCode> attribute</>,
              <>— Sets <InlineCode>aria-disabled=&quot;true&quot;</InlineCode></>,
              <>— Preserves button width by hiding content visually (<InlineCode>color: transparent</InlineCode>) instead of unmounting it</>,
            ].map((line, i) => (
              <p key={i} style={{ fontSize: "12.3px", fontWeight: 400, color: "#727272", lineHeight: 1.8 }}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ================================================================== //
// MAIN BUTTON PAGE                                                    //
// ================================================================== //

export function ButtonPage() {
  const setCAP = useSetCAP()
  const [activeTab, setActiveTab] = useState<ContentTab>("preview")
  const [bundled, setBundled] = useState(false)

  useEffect(() => {
    setCAP(<ButtonCAP />)
    return () => setCAP(null)
  }, [setCAP])

  return (
    <div className="flex flex-col h-full">
      {/* ── Sticky header zone ── */}
      <div
        className="sticky top-0 z-10 bg-white shrink-0 relative"
        style={{ paddingTop: "28px", paddingBottom: "28px" }}
      >
        {/* Breadcrumb */}
        <div className="flex items-center" style={{ gap: "4px", paddingBottom: "28px" }}>
          <span style={{ fontSize: "12.3px", fontWeight: 400, color: "#a1a1a1", lineHeight: "17.5px" }}>
            Components
          </span>
          <ChevronRight style={{ width: "11px", height: "11px", color: "#a1a1a1" }} />
          <span style={{ fontSize: "12.3px", fontWeight: 500, color: "#737373", lineHeight: "17.5px" }}>
            Button
          </span>
        </div>

        {/* Tab bar */}
        <TabBar
          active={activeTab}
          onChange={setActiveTab}
          bundled={bundled}
          onBundleToggle={() => setBundled(!bundled)}
        />
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 min-h-0">
        {activeTab === "preview" && <PreviewTab />}
        {activeTab === "code" && <CodeTab />}
        {activeTab === "api" && <ApiTab />}
        <div style={{ height: "28px", flexShrink: 0 }} />
      </div>
    </div>
  )
}
