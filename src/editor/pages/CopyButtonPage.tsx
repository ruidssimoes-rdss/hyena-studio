"use client"

import { useState, useCallback } from "react"
import { Copy, Check, X } from "lucide-react"
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

const btnBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 150ms ease",
  flexShrink: 0,
}

const outlineBtn: React.CSSProperties = {
  ...btnBase,
  background: "transparent",
  border: "0.8px solid #F0F0F0",
}

const ghostBtn: React.CSSProperties = {
  ...btnBase,
  background: "transparent",
  border: "none",
}

const subtleBtn: React.CSSProperties = {
  ...btnBase,
  background: "#F0F0F0",
  border: "none",
}

const stateLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 400,
  color: "#838383",
  textAlign: "center" as const,
  marginTop: 4,
}

// ================================================================== //
// CAP DATA                                                             //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Feedback",
  variants: "3",
  sizes: "4",
  deps: "cn",
  related: [
    { label: "Button", href: "/components/button" },
    { label: "Input Group", href: "/components/input-group" },
    { label: "Code Block", href: "/components/code-block" },
    { label: "Toast", href: "/components/toast" },
  ],
  tokens: [
    { name: "--copy-icon-idle", color: "#838383" },
    { name: "--copy-icon-success", color: "#14B8A6" },
    { name: "--copy-icon-error", color: "#D5143E" },
    { name: "--border", color: "#F0F0F0", border: true },
  ],
}

// ================================================================== //
// API PROPS                                                            //
// ================================================================== //

const COPY_BUTTON_PROPS: PropDef[] = [
  { prop: "content", type: "string", defaultVal: "—" },
  { prop: "label", type: "string", defaultVal: "—" },
  { prop: "variant", type: '"outline" | "ghost" | "subtle"', defaultVal: '"outline"' },
  { prop: "size", type: '"xs" | "sm" | "md" | "lg"', defaultVal: '"md"' },
  { prop: "resetDelay", type: "number", defaultVal: "2000" },
  { prop: "onCopy", type: "() => void", defaultVal: "—" },
  { prop: "onError", type: "(error: Error) => void", defaultVal: "—" },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
  { prop: "className", type: "string", defaultVal: "—" },
]

// ================================================================== //
// PREVIEW                                                              //
// ================================================================== //

function PreviewTab() {
  const [copied1, setCopied1] = useState(false)
  const [copied2, setCopied2] = useState(false)
  const [copiedInput, setCopiedInput] = useState(false)
  const [copiedInteractive, setCopiedInteractive] = useState(false)
  const [textareaValue, setTextareaValue] = useState("")

  const handleCopy1 = useCallback(() => {
    try {
      navigator.clipboard.writeText("Copied from Hyena Studio")
    } catch {
      // silent
    }
    setCopied1(true)
    setTimeout(() => setCopied1(false), 2000)
  }, [])

  const handleCopy2 = useCallback(() => {
    try {
      navigator.clipboard.writeText("Copied from Hyena Studio")
    } catch {
      // silent
    }
    setCopied2(true)
    setTimeout(() => setCopied2(false), 2000)
  }, [])

  const handleCopyInput = useCallback(() => {
    try {
      navigator.clipboard.writeText("https://hyena.studio/components/copy-button")
    } catch {
      // silent
    }
    setCopiedInput(true)
    setTimeout(() => setCopiedInput(false), 2000)
  }, [])

  const handleCopyInteractive = useCallback(() => {
    if (!textareaValue) return
    try {
      navigator.clipboard.writeText(textareaValue)
    } catch {
      // silent
    }
    setCopiedInteractive(true)
    setTimeout(() => setCopiedInteractive(false), 2000)
  }, [textareaValue])

  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      {/* Section 1: Default */}
      <PreviewSection label="Default">
        <button
          style={{
            ...outlineBtn,
            width: 28,
            height: 28,
            borderRadius: 8,
          }}
        >
          <Copy size={14} color="#838383" />
        </button>
      </PreviewSection>

      {/* Section 2: With Text */}
      <PreviewSection label="With Text">
        <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
          <button
            onClick={handleCopy1}
            style={{
              ...outlineBtn,
              height: 28,
              padding: "0 10px",
              borderRadius: 8,
              gap: 6,
            }}
          >
            {copied1 ? (
              <Check size={14} color="#14B8A6" />
            ) : (
              <Copy size={14} color="#838383" />
            )}
            <span style={{ fontSize: 12.3, fontWeight: 500, color: copied1 ? "#14B8A6" : "#262626" }}>
              {copied1 ? "Copied!" : "Copy"}
            </span>
          </button>
          <button
            onClick={handleCopy2}
            style={{
              ...outlineBtn,
              height: 28,
              padding: "0 10px",
              borderRadius: 8,
              gap: 6,
            }}
          >
            {copied2 ? (
              <Check size={14} color="#14B8A6" />
            ) : (
              <Copy size={14} color="#838383" />
            )}
            <span style={{ fontSize: 12.3, fontWeight: 500, color: copied2 ? "#14B8A6" : "#262626" }}>
              {copied2 ? "Copied!" : "Copy to clipboard"}
            </span>
          </button>
        </div>
      </PreviewSection>

      {/* Section 3: Feedback States */}
      <PreviewSection label="Feedback States" wrapClassName="flex items-center gap-[12px] justify-center">
        {/* Idle */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <button
            style={{
              ...outlineBtn,
              width: 28,
              height: 28,
              borderRadius: 8,
            }}
          >
            <Copy size={14} color="#838383" />
          </button>
          <span style={stateLabel}>Idle</span>
        </div>
        {/* Copied */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <button
            style={{
              ...outlineBtn,
              width: 28,
              height: 28,
              borderRadius: 8,
              borderColor: "rgba(20, 184, 166, 0.3)",
              transform: "scale(1)",
            }}
          >
            <Check size={14} color="#14B8A6" />
          </button>
          <span style={stateLabel}>Copied</span>
        </div>
        {/* Error */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <button
            style={{
              ...outlineBtn,
              width: 28,
              height: 28,
              borderRadius: 8,
              borderColor: "rgba(213, 20, 62, 0.3)",
            }}
          >
            <X size={14} color="#D5143E" />
          </button>
          <span style={stateLabel}>Error</span>
        </div>
      </PreviewSection>

      {/* Section 4: Sizes */}
      <PreviewSection label="Sizes" wrapClassName="flex items-end gap-[12px] justify-center">
        {[
          { label: "xs", size: 20, icon: 12, radius: 6 },
          { label: "sm", size: 24, icon: 13, radius: 6 },
          { label: "md", size: 28, icon: 14, radius: 8 },
          { label: "lg", size: 36, icon: 16, radius: 8 },
        ].map((s) => (
          <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <button
              style={{
                ...outlineBtn,
                width: s.size,
                height: s.size,
                borderRadius: s.radius,
              }}
            >
              <Copy size={s.icon} color="#838383" />
            </button>
            <span style={stateLabel}>{s.label}</span>
          </div>
        ))}
      </PreviewSection>

      {/* Section 5: Variants */}
      <PreviewSection label="Variants" wrapClassName="flex items-center gap-[12px] justify-center">
        {/* Outline */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <button
            style={{
              ...outlineBtn,
              width: 28,
              height: 28,
              borderRadius: 8,
            }}
          >
            <Copy size={14} color="#838383" />
          </button>
          <span style={stateLabel}>Outline</span>
        </div>
        {/* Ghost */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <button
            style={{
              ...ghostBtn,
              width: 28,
              height: 28,
              borderRadius: 8,
            }}
          >
            <Copy size={14} color="#838383" />
          </button>
          <span style={stateLabel}>Ghost</span>
        </div>
        {/* Subtle */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <button
            style={{
              ...subtleBtn,
              width: 28,
              height: 28,
              borderRadius: 8,
            }}
          >
            <Copy size={14} color="#838383" />
          </button>
          <span style={stateLabel}>Subtle</span>
        </div>
      </PreviewSection>

      {/* Section 6: With Input */}
      <PreviewSection label="With Input">
        <div style={{ display: "flex", width: "100%" }}>
          <input
            readOnly
            value="https://hyena.studio/components/copy-button"
            style={{
              flex: 1,
              height: 28,
              border: "0.8px solid #F0F0F0",
              borderRadius: "8px 0 0 8px",
              fontSize: 13,
              fontWeight: 400,
              color: "#838383",
              padding: "0 10px",
              outline: "none",
              background: "white",
            }}
          />
          <button
            onClick={handleCopyInput}
            style={{
              width: 36,
              height: 28,
              borderRadius: "0 8px 8px 0",
              border: "0.8px solid #F0F0F0",
              borderLeft: "none",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {copiedInput ? (
              <Check size={14} color="#14B8A6" />
            ) : (
              <Copy size={14} color="#838383" />
            )}
          </button>
        </div>
      </PreviewSection>

      {/* Section 7: Interactive */}
      <PreviewSection label="Interactive">
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", width: 380 }}>
          <textarea
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
            placeholder="Type something to copy..."
            style={{
              width: "100%",
              height: 80,
              border: "0.8px solid #F0F0F0",
              borderRadius: 10,
              padding: "8px 10px",
              fontSize: 13,
              fontWeight: 400,
              color: "#262626",
              resize: "vertical",
              fontFamily: "inherit",
              outline: "none",
            }}
          />
          <button
            onClick={handleCopyInteractive}
            style={{
              ...outlineBtn,
              height: 28,
              padding: "0 10px",
              borderRadius: 8,
              gap: 6,
              opacity: textareaValue ? 1 : 0.5,
              cursor: textareaValue ? "pointer" : "not-allowed",
            }}
          >
            {copiedInteractive ? (
              <Check size={14} color="#14B8A6" />
            ) : (
              <Copy size={14} color="#838383" />
            )}
            <span style={{ fontSize: 12.3, fontWeight: 500, color: copiedInteractive ? "#14B8A6" : "#262626" }}>
              {copiedInteractive ? "Copied!" : "Copy"}
            </span>
          </button>
        </div>
      </PreviewSection>
    </div>
  )
}

// ================================================================== //
// CODE                                                                 //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/copy-button"
      importCode={`import { CopyButton } from "@/components/ui/copy-button"`}
      usageCode={`<CopyButton content="Text to copy" />\n\n// With text label\n<CopyButton content="https://hyena.studio" label="Copy link" />\n\n// With input\n<CopyButton content={inputValue} variant="outline" size="md" />`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

function ApiTab() {
  return (
    <StandardApiTab
      name="Copy Button"
      description="A button that copies text to the clipboard with animated icon feedback."
      props={COPY_BUTTON_PROPS}
    />
  )
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function CopyButtonPage() {
  return (
    <ComponentPageLayout
      name="Copy Button"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
