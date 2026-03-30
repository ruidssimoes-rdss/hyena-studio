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

// ── CAP Data ────────────────────────────────────────────────────────── //

const capData: CAPData = {
  type: "Primitive",
  variants: "3",
  sizes: "3 (sm, default, lg)",
  deps: "cn",
  related: [
    { label: "Skeleton", href: "/components/skeleton" },
    { label: "Progress", href: "/components/progress" },
  ],
  tokens: [
    { name: "--primary", color: "#262626" },
    { name: "--info", color: "#3B82F6" },
    { name: "--success", color: "#14B8A6" },
  ],
}

// ── API Props ───────────────────────────────────────────────────────── //

const apiProps: PropDef[] = [
  { prop: "size", type: '"sm" | "default" | "lg"', defaultVal: '"default"' },
  { prop: "color", type: "string", defaultVal: '"currentColor"' },
  { prop: "className", type: "string", defaultVal: "—" },
]

// ── Spinner helper ──────────────────────────────────────────────────── //

function Spinner({
  size = 20,
  borderWidth = 2,
  color = "#262626",
}: {
  size?: number
  borderWidth?: number
  color?: string
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: `${borderWidth}px solid transparent`,
        borderTopColor: color,
        borderRadius: "50%",
        animation: "hyena-spin 0.6s linear infinite",
      }}
    />
  )
}

// ── Preview Content ─────────────────────────────────────────────────── //

function PreviewContent() {
  return (
    <div className="flex flex-col" style={{ gap: "20px" }}>
      <style>{`@keyframes hyena-spin { to { transform: rotate(360deg) } }`}</style>

      {/* Default */}
      <PreviewSection label="Default">
        <Spinner />
      </PreviewSection>

      {/* Sizes */}
      <PreviewSection label="Sizes" wrapClassName="flex items-center gap-[32px]">
        {[
          { label: "sm", size: 14, borderWidth: 1.5 },
          { label: "default", size: 20, borderWidth: 2 },
          { label: "lg", size: 28, borderWidth: 2.5 },
        ].map((s) => (
          <div key={s.label} className="flex flex-col items-center" style={{ gap: "8px" }}>
            <Spinner size={s.size} borderWidth={s.borderWidth} />
            <span style={{ fontSize: "11px", color: "#838383" }}>{s.label}</span>
          </div>
        ))}
      </PreviewSection>

      {/* Colours */}
      <PreviewSection label="Colours" wrapClassName="flex items-center gap-[32px]">
        {[
          { label: "default", color: "#262626" },
          { label: "blue", color: "#3B82F6" },
          { label: "success", color: "#14B8A6" },
          { label: "muted", color: "#838383" },
        ].map((c) => (
          <div key={c.label} className="flex flex-col items-center" style={{ gap: "8px" }}>
            <Spinner color={c.color} />
            <span style={{ fontSize: "11px", color: "#838383" }}>{c.label}</span>
          </div>
        ))}
      </PreviewSection>
    </div>
  )
}

// ── Code Content ────────────────────────────────────────────────────── //

function CodeContent() {
  return (
    <StandardCodeTab
      packageName="@hyena/spinner"
      importCode={`import { Spinner } from "@/components/ui/spinner"`}
      usageCode={`<Spinner />\n<Spinner size="lg" />`}
    />
  )
}

// ── API Content ─────────────────────────────────────────────────────── //

function ApiContent() {
  return (
    <StandardApiTab
      name="Spinner"
      description="A lightweight loading indicator with configurable size and color."
      props={apiProps}
    />
  )
}

// ── Page ─────────────────────────────────────────────────────────────── //

export function SpinnerPage() {
  return (
    <ComponentPageLayout
      name="Spinner"
      capContent={<ComponentCAP data={capData} />}
      previewContent={<PreviewContent />}
      codeContent={<CodeContent />}
      apiContent={<ApiContent />}
    />
  )
}
