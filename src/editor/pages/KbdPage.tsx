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
// KBD PRIMITIVE                                                        //
// ================================================================== //

function Kbd({
  children,
  size = "default",
}: {
  children: React.ReactNode
  size?: "sm" | "default" | "lg"
}) {
  const styles: Record<string, React.CSSProperties> = {
    sm: { height: "16px", minWidth: "16px", padding: "0 3px", fontSize: "9px" },
    default: { height: "20px", minWidth: "20px", padding: "0 5px", fontSize: "11px" },
    lg: { height: "24px", minWidth: "24px", padding: "0 6px", fontSize: "12px" },
  }
  return (
    <kbd
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F0F0F0",
        border: "0.8px solid #E0E0E0",
        borderBottom: "2px solid #D4D4D4",
        borderRadius: "4px",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
        fontWeight: 400,
        color: "#838383",
        ...styles[size],
      }}
    >
      {children}
    </kbd>
  )
}

function Combo({ keys, label }: { keys: string[]; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {keys.map((k, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            {i > 0 && (
              <span style={{ fontSize: "11px", color: "#D4D4D4", margin: "0 4px" }}>+</span>
            )}
            <Kbd>{k}</Kbd>
          </span>
        ))}
      </div>
      <span style={{ fontSize: "12px", fontWeight: 400, color: "#838383", marginLeft: "12px" }}>
        {label}
      </span>
    </div>
  )
}

// ================================================================== //
// SECTIONS                                                             //
// ================================================================== //

function DefaultSection() {
  return (
    <PreviewSection label="Default">
      <Kbd>⌘</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>K</Kbd>
      <Kbd>Enter</Kbd>
      <Kbd>⌫</Kbd>
    </PreviewSection>
  )
}

function CombinationsSection() {
  return (
    <PreviewSection label="Combinations">
      <Combo keys={["⌘", "K"]} label="Command palette" />
      <Combo keys={["⌘", "S"]} label="Save" />
      <Combo keys={["⌘", "Shift", "P"]} label="Preferences" />
      <Combo keys={["⌘", "Option", "Esc"]} label="Force quit" />
    </PreviewSection>
  )
}

function SizesSection() {
  return (
    <PreviewSection label="Sizes">
      <Kbd size="sm">K</Kbd>
      <Kbd size="default">K</Kbd>
      <Kbd size="lg">K</Kbd>
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
      <CombinationsSection />
      <SizesSection />
    </div>
  )
}

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/kbd"
      importCode={`import { Kbd } from "@/components/ui/kbd"`}
      usageCode={`<Kbd>⌘</Kbd>
<Kbd>K</Kbd>

{/* Combination */}
<span className="flex items-center gap-1">
  <Kbd>⌘</Kbd>
  <span>+</span>
  <Kbd>S</Kbd>
</span>`}
    />
  )
}

const PROPS: PropDef[] = [
  { prop: "size", type: '"sm" | "default" | "lg"', defaultVal: '"default"' },
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Kbd"
      description="A keyboard key indicator for displaying keyboard shortcuts and key references."
      props={PROPS}
    />
  )
}

const CAP_DATA: CAPData = {
  type: "Primitive",
  variants: "3",
  sizes: "3 (sm, default, lg)",
  deps: "cn",
  related: [
    { label: "Tooltip", href: "/components/tooltip" },
    { label: "Button", href: "/components/button" },
  ],
  tokens: [
    { name: "--secondary", color: "#F0F0F0", border: true },
    { name: "--border", color: "#E0E0E0", border: true },
  ],
}

export function KbdPage() {
  return (
    <ComponentPageLayout
      name="Kbd"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
