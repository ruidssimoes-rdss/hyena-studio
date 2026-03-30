"use client"

import { useState, useEffect, type ReactNode } from "react"
import { ChevronRight } from "lucide-react"
import { useSetCAP } from "@/editor/shell/CAPContext"
import { CodeBlock } from "./CodeBlock"

// ================================================================== //
// Shared page components — extracted from ButtonPage                  //
// ================================================================== //

// ── Label Pill ───────────────────────────────────────────────────── //

export function LabelPill({ text }: { text: string }) {
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

// ── Preview Section (pill + box) ─────────────────────────────────── //

export function PreviewSection({
  label,
  children,
  wrapClassName = "flex flex-col items-center gap-[10px] w-full",
  flush = false,
}: {
  label: string
  children: ReactNode
  wrapClassName?: string
  flush?: boolean
}) {
  return (
    <div>
      <LabelPill text={label} />
      <div
        className="flex flex-col justify-center"
        style={{
          marginTop: "7px",
          border: "1px solid #f0f0f0",
          borderRadius: "10px",
          background: "white",
          padding: flush ? "24px 0" : "24px 35px",
          minHeight: "250px",
          overflow: "visible",
        }}
      >
        <div className={wrapClassName}>{children}</div>
      </div>
    </div>
  )
}

// ── Preview Box (no pill — just the bordered box) ────────────────── //

export function PreviewBox({
  children,
  className = "flex items-center justify-center",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={className}
      style={{
        border: "1px solid #f0f0f0",
        borderRadius: "10px",
        background: "white",
        padding: "24px 35px",
        minHeight: "250px",
        overflow: "visible",
      }}
    >
      {children}
    </div>
  )
}

// ── Content Tabs ─────────────────────────────────────────────────── //

export type ContentTab = "preview" | "code" | "api"

export function TabBar({
  active,
  onChange,
  bundled,
  onBundleToggle,
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

// ── Page Breadcrumb ──────────────────────────────────────────────── //

export function Breadcrumb({ section, page }: { section: string; page: string }) {
  return (
    <div className="flex items-center" style={{ gap: "4px" }}>
      <span style={{ fontSize: "12.3px", fontWeight: 400, color: "#a1a1a1", lineHeight: "17.5px" }}>
        {section}
      </span>
      <ChevronRight style={{ width: "11px", height: "11px", color: "#a1a1a1" }} />
      <span style={{ fontSize: "12.3px", fontWeight: 500, color: "#737373", lineHeight: "17.5px" }}>
        {page}
      </span>
    </div>
  )
}

// ── Inline Code ──────────────────────────────────────────────────── //

export function InlineCode({ children }: { children: ReactNode }) {
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

// ── Pkg Manager Tabs ─────────────────────────────────────────────── //

export function PkgManagerTabs({
  active,
  onChange,
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

// ── Standard Code Tab ────────────────────────────────────────────── //

const INSTALL_COMMANDS: Record<string, (pkg: string) => string> = {
  bun: (p) => `bun add ${p}`,
  npm: (p) => `npm install ${p}`,
  pnpm: (p) => `pnpm add ${p}`,
  yarn: (p) => `yarn add ${p}`,
}

export function StandardCodeTab({
  packageName,
  importCode,
  usageCode,
  usageFilename = "usage.tsx",
  extraSections,
}: {
  packageName: string
  importCode: string
  usageCode: string
  usageFilename?: string
  extraSections?: ReactNode
}) {
  const [pkgMgr, setPkgMgr] = useState("pnpm")
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <div>
        <LabelPill text="Installation" />
        <div style={{ marginTop: "8px" }}>
          <PkgManagerTabs active={pkgMgr} onChange={setPkgMgr} />
        </div>
        <div style={{ marginTop: "12px" }}>
          <CodeBlock filename="Terminal" code={INSTALL_COMMANDS[pkgMgr](packageName)} highlight={false} />
        </div>
      </div>
      <div>
        <LabelPill text="Usage" />
        <div style={{ marginTop: "8px" }}>
          <CodeBlock filename="import" code={importCode} />
        </div>
        <div style={{ marginTop: "12px" }}>
          <CodeBlock filename={usageFilename} code={usageCode} />
        </div>
      </div>
      {extraSections}
    </div>
  )
}

// ── Standard API Tab ─────────────────────────────────────────────── //

export interface PropDef {
  prop: string
  type: string
  defaultVal: string
}

export function PropsTable({ props: rows }: { props: PropDef[] }) {
  return (
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
        {rows.map((row, i) => (
          <tr
            key={row.prop}
            style={{
              borderBottom: i < rows.length - 1 ? "1px solid #f0f0f0" : "none",
              transition: "background 100ms",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.02)" }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent" }}
          >
            <td className="font-medium" style={{ fontSize: "12.3px", color: "#262626", height: "40px", padding: "0 12px", fontWeight: 500, whiteSpace: "nowrap" }}>
              {row.prop}
            </td>
            <td className="font-mono" style={{ fontSize: "11px", color: "#727272", height: "40px", padding: "0 12px", maxWidth: "300px", wordBreak: "break-word" }}>
              {row.type}
            </td>
            <td className="font-mono" style={{ fontSize: "11px", color: "#262626", height: "40px", padding: "0 12px", whiteSpace: "nowrap" }}>
              {row.defaultVal}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function StandardApiTab({
  name,
  description,
  props,
  extraSections,
}: {
  name: string
  description: string
  props: PropDef[]
  extraSections?: ReactNode
}) {
  return (
    <div>
      <h2 style={{ fontSize: "16px", fontWeight: 500, color: "#262626", marginBottom: "4px" }}>
        {name}
      </h2>
      <p style={{ fontSize: "12.3px", fontWeight: 400, color: "#727272", lineHeight: 1.6, marginBottom: "24px" }}>
        {description}
      </p>
      <LabelPill text="Props" />
      <div style={{ marginTop: "12px", width: "100%" }}>
        <PropsTable props={props} />
      </div>
      {extraSections}
    </div>
  )
}

// ── Standard CAP ─────────────────────────────────────────────────── //

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

function CAPSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ padding: "7px", borderRadius: "10px" }}>
      <div
        className="font-medium"
        style={{
          fontSize: "12.3px",
          lineHeight: "18px",
          color: "#262626",
          height: "28px",
          padding: "5px 12px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-center justify-between"
      style={{ height: "28px", padding: "0 12px", fontSize: "12.3px", lineHeight: "17.5px" }}
    >
      <span style={{ color: "#727272", fontWeight: 400 }}>{label}</span>
      <span style={{ color: "#262626", fontWeight: 400 }}>{value}</span>
    </div>
  )
}

function RelatedItem({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between transition-colors duration-150 hover:bg-[rgba(0,0,0,0.04)]"
      style={{ height: "28px", padding: "0 12px", borderRadius: "8.75px", fontSize: "12.3px", color: "#727272", fontWeight: 400 }}
    >
      <span>{label}</span>
      <ArrowUpRight style={{ width: "14px", height: "14px" }} />
    </Link>
  )
}

function TokenRow({ name, color, border }: { name: string; color: string; border?: boolean }) {
  return (
    <div
      className="flex items-center justify-between"
      style={{ height: "28px", padding: "0 12px", fontSize: "13px", lineHeight: "22.1px", color: "#737373", fontWeight: 400 }}
    >
      <span>{name}</span>
      <div
        style={{
          width: "13px",
          height: "13px",
          borderRadius: "2.5px",
          background: color,
          border: border ? "1px solid #e1e1e1" : undefined,
        }}
      />
    </div>
  )
}

export interface CAPData {
  type: string
  variants: string
  sizes: string
  deps: string
  related: Array<{ label: string; href: string }>
  tokens: Array<{ name: string; color: string; border?: boolean }>
}

export function ComponentCAP({ data }: { data: CAPData }) {
  return (
    <div style={{ padding: "14px 14px 0" }}>
      <div style={{ height: "14px" }} />
      <CAPSection title="Details">
        <DetailRow label="Type" value={data.type} />
        <DetailRow label="Variants" value={data.variants} />
        <DetailRow label="Sizes" value={data.sizes} />
        <DetailRow label="Deps" value={data.deps} />
      </CAPSection>
      <CAPSection title="Related">
        {data.related.map((r) => (
          <RelatedItem key={r.label} label={r.label} href={r.href} />
        ))}
      </CAPSection>
      <CAPSection title="Tokens">
        {data.tokens.map((t) => (
          <TokenRow key={t.name} name={t.name} color={t.color} border={t.border} />
        ))}
      </CAPSection>
    </div>
  )
}

// ── Full Component Page Layout ───────────────────────────────────── //

export function ComponentPageLayout({
  name,
  section = "Components",
  capContent,
  previewContent,
  codeContent,
  apiContent,
}: {
  name: string
  section?: string
  capContent: ReactNode
  previewContent: ReactNode
  codeContent: ReactNode
  apiContent: ReactNode
}) {
  const setCAP = useSetCAP()
  const [activeTab, setActiveTab] = useState<ContentTab>("preview")
  const [bundled, setBundled] = useState(false)

  useEffect(() => {
    setCAP(capContent)
    return () => setCAP(null)
  }, [setCAP, capContent])

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-white shrink-0 relative" style={{ paddingTop: "28px", paddingBottom: "28px" }}>
        <div style={{ paddingBottom: "28px" }}>
          <Breadcrumb section={section} page={name} />
        </div>
        <TabBar active={activeTab} onChange={setActiveTab} bundled={bundled} onBundleToggle={() => setBundled(!bundled)} />
      </div>
      <div className="flex-1 min-h-0">
        {activeTab === "preview" && previewContent}
        {activeTab === "code" && codeContent}
        {activeTab === "api" && apiContent}
        {/* Bottom spacer — matches top padding for symmetry */}
        <div style={{ height: "28px", flexShrink: 0 }} />
      </div>
    </div>
  )
}
