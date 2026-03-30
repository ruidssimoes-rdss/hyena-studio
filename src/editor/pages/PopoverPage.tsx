"use client"

import { useState, useEffect, useRef } from "react"
import {
  ComponentPageLayout,
  ComponentCAP,
  PreviewSection,
  StandardCodeTab,
  StandardApiTab,
  LabelPill,
  PropsTable,
  type CAPData,
  type PropDef,
} from "@/editor/components/PageShell"

/* ------------------------------------------------------------------ */
/*  Shared styles                                                      */
/* ------------------------------------------------------------------ */

const popoverPanel: React.CSSProperties = {
  width: 280,
  background: "#FFFFFF",
  border: "0.8px solid #F0F0F0",
  borderRadius: 10,
  boxShadow: "0 4px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.03)",
}

const outlineBtn: React.CSSProperties = {
  height: 28,
  padding: "0 14px",
  borderRadius: 10,
  border: "0.8px solid #F0F0F0",
  background: "white",
  fontSize: 12.3,
  fontWeight: 500,
  color: "#262626",
  cursor: "pointer",
  fontFamily: "inherit",
}

const primaryBtn: React.CSSProperties = {
  height: 28,
  padding: "0 14px",
  borderRadius: 10,
  border: "none",
  background: "#262626",
  fontSize: 12.3,
  fontWeight: 500,
  color: "#FFFFFF",
  cursor: "pointer",
  fontFamily: "inherit",
}

const smallOutlineBtn: React.CSSProperties = {
  height: 24,
  padding: "0 10px",
  borderRadius: 8,
  border: "0.8px solid #F0F0F0",
  background: "white",
  fontSize: 11,
  fontWeight: 500,
  color: "#262626",
  cursor: "pointer",
  fontFamily: "inherit",
}

const smallPrimaryBtn: React.CSSProperties = {
  height: 24,
  padding: "0 10px",
  borderRadius: 8,
  border: "none",
  background: "#262626",
  fontSize: 11,
  fontWeight: 500,
  color: "#FFFFFF",
  cursor: "pointer",
  fontFamily: "inherit",
}

const smallDestructiveBtn: React.CSSProperties = {
  height: 24,
  padding: "0 10px",
  borderRadius: 8,
  border: "none",
  background: "#D5143E",
  fontSize: 11,
  fontWeight: 500,
  color: "#FFFFFF",
  cursor: "pointer",
  fontFamily: "inherit",
}

const inputStyle: React.CSSProperties = {
  flex: 1,
  height: 28,
  border: "0.8px solid #F0F0F0",
  borderRadius: 8,
  padding: "0 10px",
  fontSize: 12.3,
  fontWeight: 400,
  color: "#262626",
  outline: "none",
  fontFamily: "inherit",
  background: "white",
}

/* ------------------------------------------------------------------ */
/*  CAP data                                                           */
/* ------------------------------------------------------------------ */

const cap: CAPData = {
  type: "Composite",
  variants: "6",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Tooltip", href: "/components/tooltip" },
    { label: "Dialog", href: "/components/dialog" },
  ],
  tokens: [
    { name: "--border", color: "#F0F0F0", border: true },
    { name: "--foreground", color: "#262626" },
    { name: "--muted-fg", color: "#838383" },
  ],
}

/* ------------------------------------------------------------------ */
/*  Props definitions                                                  */
/* ------------------------------------------------------------------ */

const popoverProps: PropDef[] = [
  { prop: "open", type: "boolean", defaultVal: "\u2014" },
  { prop: "defaultOpen", type: "boolean", defaultVal: "false" },
  { prop: "onOpenChange", type: "(open: boolean) => void", defaultVal: "\u2014" },
]

const contentProps: PropDef[] = [
  { prop: "side", type: '"top" | "bottom" | "left" | "right"', defaultVal: '"bottom"' },
  { prop: "align", type: '"start" | "center" | "end"', defaultVal: '"center"' },
  { prop: "sideOffset", type: "number", defaultVal: "6" },
  { prop: "alignOffset", type: "number", defaultVal: "0" },
  { prop: "arrow", type: "boolean", defaultVal: "false" },
  { prop: "className", type: "string", defaultVal: "\u2014" },
]

const triggerProps: PropDef[] = [
  { prop: "asChild", type: "boolean", defaultVal: "false" },
]

/* ------------------------------------------------------------------ */
/*  Reusable sub-components                                            */
/* ------------------------------------------------------------------ */

function PopoverHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div style={{ padding: "12px 16px", borderBottom: "0.8px solid #F0F0F0" }}>
      <div style={{ fontWeight: 600, fontSize: 14, color: "#262626" }}>{title}</div>
      <div style={{ fontWeight: 400, fontSize: 12, color: "#838383", marginTop: 2 }}>
        {description}
      </div>
    </div>
  )
}

function DimensionsBody() {
  const fields = [
    { label: "Width", value: "100%" },
    { label: "Height", value: "25px" },
    { label: "Max W.", value: "300px" },
  ]
  return (
    <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
      {fields.map((f) => (
        <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <label
            style={{
              fontWeight: 500,
              fontSize: 12,
              color: "#838383",
              width: 60,
              textAlign: "right" as const,
            }}
          >
            {f.label}
          </label>
          <input style={inputStyle} defaultValue={f.value} />
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Sections                                                           */
/* ------------------------------------------------------------------ */

function DefaultSection() {
  return (
    <PreviewSection label="Default">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <button style={outlineBtn}>Open popover</button>
        <div style={{ marginTop: 6, ...popoverPanel }}>
          <PopoverHeader title="Dimensions" description="Set the dimensions for the layer." />
          <DimensionsBody />
        </div>
      </div>
    </PreviewSection>
  )
}

function PositionsSection() {
  const smallPopover: React.CSSProperties = { ...popoverPanel, width: 180 }
  const smallTrigger: React.CSSProperties = { ...outlineBtn, height: 24, fontSize: 11, padding: "0 10px" }

  const popoverContent = (
    <div style={{ padding: "10px 14px", fontSize: 12.3, color: "rgba(38,38,38,0.7)" }}>
      Popover content
    </div>
  )

  return (
    <PreviewSection label="Positions">
      <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
        {/* Top */}
        <div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={smallPopover}>{popoverContent}</div>
            <div style={{ marginBottom: 0, marginTop: 6 }}>
              <button style={smallTrigger}>Trigger</button>
            </div>
          </div>
          <div style={{ fontSize: 11, color: "#838383", textAlign: "center", marginTop: 4 }}>Top</div>
        </div>

        {/* Bottom */}
        <div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <button style={smallTrigger}>Trigger</button>
            <div style={{ marginTop: 6, ...smallPopover }}>{popoverContent}</div>
          </div>
          <div style={{ fontSize: 11, color: "#838383", textAlign: "center", marginTop: 4 }}>Bottom</div>
        </div>

        {/* Left */}
        <div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <div style={smallPopover}>{popoverContent}</div>
            <div style={{ marginLeft: 6 }}>
              <button style={smallTrigger}>Trigger</button>
            </div>
          </div>
          <div style={{ fontSize: 11, color: "#838383", textAlign: "center", marginTop: 4 }}>Left</div>
        </div>

        {/* Right */}
        <div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <button style={smallTrigger}>Trigger</button>
            <div style={{ marginLeft: 6, ...smallPopover }}>{popoverContent}</div>
          </div>
          <div style={{ fontSize: 11, color: "#838383", textAlign: "center", marginTop: 4 }}>Right</div>
        </div>
      </div>
    </PreviewSection>
  )
}

function WithArrowSection() {
  return (
    <PreviewSection label="With Arrow">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <button style={outlineBtn}>Open popover</button>
        <div style={{ marginTop: 6, position: "relative", ...popoverPanel, overflow: "visible" }}>
          {/* Arrow */}
          <div
            style={{
              position: "absolute",
              top: -4,
              left: "50%",
              transform: "translateX(-50%) rotate(45deg)",
              width: 8,
              height: 8,
              background: "#FFFFFF",
              borderLeft: "0.8px solid #F0F0F0",
              borderTop: "0.8px solid #F0F0F0",
              zIndex: 1,
            }}
          />
          <PopoverHeader title="Dimensions" description="Set the dimensions for the layer." />
          <DimensionsBody />
        </div>
      </div>
    </PreviewSection>
  )
}

function WithFormSection() {
  return (
    <PreviewSection label="With Form">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <button style={outlineBtn}>Edit profile</button>
        <div style={{ marginTop: 6, ...popoverPanel }}>
          <PopoverHeader title="Edit profile" description="Make changes to your profile." />
          <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#262626", marginBottom: 4 }}>
                Name
              </label>
              <input style={inputStyle} defaultValue="Rui" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#262626", marginBottom: 4 }}>
                Email
              </label>
              <input style={inputStyle} defaultValue="rui@hyena.studio" />
            </div>
          </div>
          <div
            style={{
              padding: "10px 16px",
              borderTop: "0.8px solid #F0F0F0",
              display: "flex",
              justifyContent: "flex-end",
              gap: 6,
            }}
          >
            <button style={smallOutlineBtn}>Cancel</button>
            <button style={smallPrimaryBtn}>Save</button>
          </div>
        </div>
      </div>
    </PreviewSection>
  )
}

function InlineConfirmSection() {
  const destructiveTrigger: React.CSSProperties = {
    height: 28,
    padding: "0 14px",
    borderRadius: 10,
    border: "0.8px solid #D5143E",
    background: "transparent",
    fontSize: 12.3,
    fontWeight: 500,
    color: "#D5143E",
    cursor: "pointer",
    fontFamily: "inherit",
  }

  return (
    <PreviewSection label="Inline Confirm">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <button style={destructiveTrigger}>Remove member</button>
        <div style={{ marginTop: 6, ...popoverPanel, width: 240 }}>
          <div style={{ padding: "14px 16px" }}>
            <div style={{ fontSize: 13, color: "rgba(38,38,38,0.7)" }}>
              Are you sure you want to remove this member?
            </div>
            <div style={{ marginTop: 10, display: "flex", justifyContent: "flex-end", gap: 6 }}>
              <button style={smallOutlineBtn}>Cancel</button>
              <button style={smallDestructiveBtn}>Remove</button>
            </div>
          </div>
        </div>
      </div>
    </PreviewSection>
  )
}

function InteractiveSection() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  return (
    <PreviewSection label="Interactive">
      <div
        ref={containerRef}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <button style={outlineBtn} onClick={() => setOpen(!open)}>
          Click me
        </button>
        {open && (
          <div style={{ marginTop: 6, ...popoverPanel }}>
            <PopoverHeader
              title="Interactive popover"
              description="Click outside or press Escape to close."
            />
            <div
              style={{
                padding: "10px 16px",
                borderTop: "0.8px solid #F0F0F0",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button style={smallOutlineBtn} onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </PreviewSection>
  )
}

/* ------------------------------------------------------------------ */
/*  Tabs                                                               */
/* ------------------------------------------------------------------ */

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/popover"
      importCode={`import {\n  Popover,\n  PopoverTrigger,\n  PopoverContent,\n  PopoverHeader,\n  PopoverTitle,\n  PopoverDescription,\n  PopoverClose,\n} from "@/components/ui/popover"`}
      usageCode={`<Popover>\n  <PopoverTrigger asChild>\n    <Button variant="outlined">Open</Button>\n  </PopoverTrigger>\n  <PopoverContent side="bottom" align="center">\n    <PopoverHeader>\n      <PopoverTitle>Title</PopoverTitle>\n      <PopoverDescription>Description</PopoverDescription>\n    </PopoverHeader>\n    <p>Popover body content.</p>\n    <PopoverClose>Close</PopoverClose>\n  </PopoverContent>\n</Popover>`}
    />
  )
}

function ApiTab() {
  return (
    <StandardApiTab
      name="Popover"
      description="A floating panel anchored to a trigger element. Supports controlled and uncontrolled modes with configurable positioning."
      props={popoverProps}
      extraSections={
        <>
          <div style={{ marginTop: 28 }}>
            <LabelPill text="PopoverContent" />
            <div style={{ marginTop: 12, width: "100%" }}>
              <PropsTable props={contentProps} />
            </div>
          </div>
          <div style={{ marginTop: 28 }}>
            <LabelPill text="PopoverTrigger" />
            <div style={{ marginTop: 12, width: "100%" }}>
              <PropsTable props={triggerProps} />
            </div>
          </div>
        </>
      }
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export function PopoverPage() {
  return (
    <ComponentPageLayout
      name="Popover"
      capContent={<ComponentCAP data={cap} />}
      previewContent={
        <div className="flex flex-col" style={{ gap: 28 }}>
          <DefaultSection />
          <PositionsSection />
          <WithArrowSection />
          <WithFormSection />
          <InlineConfirmSection />
          <InteractiveSection />
        </div>
      }
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
    />
  )
}
