"use client"

import { useState, useRef } from "react"
import {
  ComponentPageLayout,
  ComponentCAP,
  PreviewSection,
  StandardCodeTab,
  StandardApiTab,
  type CAPData,
  type PropDef,
} from "@/editor/components/PageShell"

// ── Shared textarea base style ──────────────────────────────────── //

const baseTextareaStyle: React.CSSProperties = {
  width: "300px",
  height: "100px",
  border: "0.8px solid #F0F0F0",
  borderRadius: "10px",
  padding: "10px 12px",
  fontSize: "13px",
  color: "#262626",
  outline: "none",
  resize: "vertical",
  fontFamily: "inherit",
  lineHeight: 1.5,
}

// ── CAP Data ────────────────────────────────────────────────────── //

const capData: CAPData = {
  type: "Primitive",
  variants: "4",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Input", href: "/components/input" },
    { label: "Field", href: "/components/field" },
  ],
  tokens: [
    { name: "--border", color: "#F0F0F0", border: true },
    { name: "--foreground", color: "#262626" },
    { name: "--muted-fg", color: "#838383" },
    { name: "--error", color: "#EF4444" },
  ],
}

// ── API Props ───────────────────────────────────────────────────── //

const apiProps: PropDef[] = [
  { prop: "placeholder", type: "string", defaultVal: "—" },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
  { prop: "error", type: "boolean | string", defaultVal: "false" },
  { prop: "maxLength", type: "number", defaultVal: "—" },
  { prop: "autoResize", type: "boolean", defaultVal: "false" },
  { prop: "rows", type: "number", defaultVal: "3" },
  { prop: "className", type: "string", defaultVal: "—" },
]

// ── Page ────────────────────────────────────────────────────────── //

export function TextareaPage() {
  const [charCount, setCharCount] = useState(0)
  const autoResizeRef = useRef<HTMLTextAreaElement>(null)

  return (
    <ComponentPageLayout
      name="Textarea"
      capContent={<ComponentCAP data={capData} />}
      previewContent={
        <div className="flex flex-col" style={{ gap: "28px" }}>
          {/* ── Default ──────────────────────────────────────── */}
          <PreviewSection label="Default">
            <textarea
              placeholder="Write something..."
              style={{
                ...baseTextareaStyle,
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#262626"
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#F0F0F0"
              }}
            />
          </PreviewSection>

          {/* ── States ───────────────────────────────────────── */}
          <PreviewSection
            label="States"
            wrapClassName="flex items-start justify-center gap-[20px] w-full flex-wrap"
          >
            {/* Default */}
            <div className="flex flex-col" style={{ gap: "6px" }}>
              <span style={{ fontSize: "12px", color: "#838383", fontWeight: 500 }}>Default</span>
              <textarea
                placeholder="Write something..."
                style={{
                  ...baseTextareaStyle,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#262626"
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#F0F0F0"
                }}
              />
            </div>

            {/* Error */}
            <div className="flex flex-col" style={{ gap: "6px" }}>
              <span style={{ fontSize: "12px", color: "#838383", fontWeight: 500 }}>Error</span>
              <div className="flex flex-col" style={{ gap: "6px" }}>
                <textarea
                  placeholder="Write something..."
                  style={{
                    ...baseTextareaStyle,
                    borderColor: "#EF4444",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#EF4444"
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#EF4444"
                  }}
                />
                <span style={{ fontSize: "12px", color: "#EF4444" }}>This field is required</span>
              </div>
            </div>

            {/* Disabled */}
            <div className="flex flex-col" style={{ gap: "6px" }}>
              <span style={{ fontSize: "12px", color: "#838383", fontWeight: 500 }}>Disabled</span>
              <textarea
                placeholder="Disabled"
                disabled
                style={{
                  ...baseTextareaStyle,
                  opacity: 0.45,
                  cursor: "not-allowed",
                  background: "#F8F8F8",
                }}
              />
            </div>
          </PreviewSection>

          {/* ── With Character Count ─────────────────────────── */}
          <PreviewSection label="With Character Count">
            <div className="flex flex-col" style={{ width: "300px" }}>
              <textarea
                placeholder="Write something..."
                maxLength={200}
                style={{
                  ...baseTextareaStyle,
                  width: "100%",
                }}
                onChange={(e) => setCharCount(e.currentTarget.value.length)}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#262626"
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#F0F0F0"
                }}
              />
              <div
                className="font-mono"
                style={{
                  fontSize: "12px",
                  color: charCount > 180 ? "#EF4444" : "#838383",
                  textAlign: "right",
                  marginTop: "6px",
                }}
              >
                {charCount}/200
              </div>
            </div>
          </PreviewSection>

          {/* ── Auto Resize ──────────────────────────────────── */}
          <PreviewSection label="Auto Resize">
            <textarea
              ref={autoResizeRef}
              placeholder="This textarea grows as you type..."
              style={{
                ...baseTextareaStyle,
                height: "auto",
                minHeight: "60px",
                maxHeight: "200px",
                resize: "none",
              }}
              onInput={(e) => {
                const el = e.currentTarget
                el.style.height = "auto"
                el.style.height = el.scrollHeight + "px"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#262626"
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#F0F0F0"
              }}
            />
          </PreviewSection>
        </div>
      }
      codeContent={
        <StandardCodeTab
          packageName="@hyena/textarea"
          importCode={`import { Textarea } from "@/components/ui/textarea"`}
          usageCode={`<Textarea placeholder="Write something..." />`}
        />
      }
      apiContent={
        <StandardApiTab
          name="Textarea"
          description="A multi-line text input that supports character counting, error states, and auto-resizing."
          props={apiProps}
        />
      }
    />
  )
}
