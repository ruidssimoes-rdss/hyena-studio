"use client"

import { useState, useEffect } from "react"
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

// ================================================================== //
// SHARED STYLES                                                        //
// ================================================================== //

const panelShadow = "0 16px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)"

function DragHandle() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "8px 0 0" }}>
      <div
        style={{
          width: 32,
          height: 4,
          background: "#D4D4D4",
          borderRadius: 2,
        }}
      />
    </div>
  )
}

// ================================================================== //
// PREVIEW                                                              //
// ================================================================== //

function DefaultSection() {
  return (
    <PreviewSection label="Default" wrapClassName="flex flex-col items-center w-full">
      <div
        style={{
          width: 340,
          height: 200,
          background: "#F5F5F5",
          borderRadius: 10,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 100,
            background: "#FFFFFF",
            borderRadius: "12px 12px 0 0",
            boxShadow: panelShadow,
          }}
        >
          <DragHandle />
          <div style={{ padding: "8px 20px 0" }}>
            <div style={{ fontWeight: 600, fontSize: 15, color: "#262626" }}>Share</div>
            <div style={{ fontWeight: 400, fontSize: 12.3, color: "#838383", marginTop: 4 }}>
              Share this page with others.
            </div>
          </div>
          <div style={{ padding: "6px 20px 0", display: "flex", flexDirection: "column", gap: 4 }}>
            {["Copy link", "Email", "Messages"].map((item) => (
              <div key={item} style={{ padding: "6px 0", fontSize: 13, fontWeight: 400, color: "#262626" }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewSection>
  )
}

function SizesSection() {
  const sizes: { label: string; heightPercent: number }[] = [
    { label: "sm", heightPercent: 25 },
    { label: "default", heightPercent: 50 },
    { label: "lg", heightPercent: 75 },
    { label: "full", heightPercent: 100 },
  ]

  return (
    <PreviewSection label="Sizes" wrapClassName="flex flex-col items-center w-full gap-[12px]">
      {sizes.map(({ label, heightPercent }) => (
        <div key={label}>
          <div
            style={{
              width: 340,
              height: 120,
              background: "#F5F5F5",
              borderRadius: 10,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: `${heightPercent}%`,
                background: "#FFFFFF",
                borderRadius: "12px 12px 0 0",
                boxShadow: panelShadow,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <DragHandle />
              <div style={{ fontSize: 12, color: "#838383", marginTop: 4 }}>Sheet content</div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: "#838383", textAlign: "center", marginTop: 4 }}>{label}</div>
        </div>
      ))}
    </PreviewSection>
  )
}

function DragHandleSection() {
  return (
    <PreviewSection label="With Drag Handle" wrapClassName="flex flex-col items-center w-full">
      <div
        style={{
          width: 340,
          height: 200,
          background: "#F5F5F5",
          borderRadius: 10,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 100,
            background: "#FFFFFF",
            borderRadius: "12px 12px 0 0",
            boxShadow: panelShadow,
          }}
        >
          <DragHandle />
          <div style={{ fontSize: 11, color: "#A1A1A1", textAlign: "center", marginTop: 4 }}>
            Pull down to dismiss
          </div>
          <div style={{ padding: "8px 20px 0", fontSize: 13, color: "rgba(38,38,38,0.7)" }}>
            Sheet body content goes here. This panel can be dragged down to dismiss.
          </div>
        </div>
      </div>
    </PreviewSection>
  )
}

function InteractiveSection() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open])

  return (
    <PreviewSection label="Interactive" wrapClassName="flex flex-col items-center w-full">
      <button
        className="inline-flex items-center justify-center font-medium"
        style={{
          height: 28,
          padding: "0 14px",
          borderRadius: 10,
          border: "0.8px solid #F0F0F0",
          background: "white",
          fontSize: 12.3,
          fontWeight: 500,
          color: "#262626",
          cursor: "pointer",
        }}
        onClick={() => setOpen(true)}
      >
        Open sheet
      </button>

      {open && (
        <>
          {/* Scrim */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 50,
            }}
            onClick={() => setOpen(false)}
          />
          {/* Panel */}
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              background: "#FFFFFF",
              borderRadius: "12px 12px 0 0",
              boxShadow: panelShadow,
              zIndex: 51,
              maxHeight: "50vh",
            }}
          >
            <DragHandle />
            <div style={{ padding: "16px 20px", borderBottom: "0.8px solid #F0F0F0" }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: "#262626" }}>Interactive demo</div>
            </div>
            <div style={{ padding: 20, fontSize: 13, color: "rgba(38,38,38,0.7)" }}>
              Drag the handle down to dismiss, or click the overlay.
            </div>
            <div
              style={{
                padding: "12px 20px",
                borderTop: "0.8px solid #F0F0F0",
                display: "flex",
                justifyContent: "flex-end",
                gap: 6,
              }}
            >
              <button
                className="inline-flex items-center justify-center font-medium"
                style={{
                  height: 28,
                  padding: "0 14px",
                  borderRadius: 10,
                  border: "0.8px solid #F0F0F0",
                  background: "white",
                  fontSize: 12.3,
                  fontWeight: 500,
                  color: "#262626",
                  cursor: "pointer",
                }}
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </PreviewSection>
  )
}

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <DefaultSection />
      <SizesSection />
      <DragHandleSection />
      <InteractiveSection />
    </div>
  )
}

// ================================================================== //
// CODE                                                                 //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/sheet"
      importCode={`import {\n  Sheet,\n  SheetTrigger,\n  SheetContent,\n  SheetHeader,\n  SheetTitle,\n  SheetDescription,\n  SheetFooter,\n  SheetClose,\n  SheetHandle,\n} from "@/components/ui/sheet"`}
      usageCode={`<Sheet>\n  <SheetTrigger asChild>\n    <Button variant="outlined">Open</Button>\n  </SheetTrigger>\n  <SheetContent size="default">\n    <SheetHandle />\n    <SheetHeader>\n      <SheetTitle>Share</SheetTitle>\n      <SheetDescription>\n        Share this page with others.\n      </SheetDescription>\n    </SheetHeader>\n    <div className="p-4">Content here</div>\n    <SheetFooter>\n      <SheetClose asChild>\n        <Button variant="outlined">Close</Button>\n      </SheetClose>\n    </SheetFooter>\n  </SheetContent>\n</Sheet>`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const SHEET_PROPS: PropDef[] = [
  { prop: "open", type: "boolean", defaultVal: "\u2014" },
  { prop: "onOpenChange", type: "(open: boolean) => void", defaultVal: "\u2014" },
  { prop: "snapPoints", type: "number[]", defaultVal: "\u2014" },
]

const SHEET_CONTENT_PROPS: PropDef[] = [
  { prop: "size", type: '"sm" | "default" | "lg" | "full"', defaultVal: '"default"' },
  { prop: "className", type: "string", defaultVal: "\u2014" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Sheet"
      description="A bottom panel that slides up with a drag handle and size presets."
      props={SHEET_PROPS}
      extraSections={
        <div style={{ marginTop: "28px" }}>
          <LabelPill text="SheetContent Props" />
          <div style={{ marginTop: "12px", width: "100%" }}>
            <PropsTable props={SHEET_CONTENT_PROPS} />
          </div>
        </div>
      }
    />
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Composite",
  variants: "4",
  sizes: "4 (sm, default, lg, full)",
  deps: "cn",
  related: [
    { label: "Drawer", href: "/components/drawer" },
    { label: "Dialog", href: "/components/dialog" },
  ],
  tokens: [
    { name: "--foreground", color: "#262626" },
    { name: "--muted-fg", color: "#838383" },
    { name: "--border", color: "#F0F0F0", border: true },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function SheetPage() {
  return (
    <ComponentPageLayout
      name="Sheet"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
