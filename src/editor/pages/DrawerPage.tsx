"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
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
// PREVIEW                                                              //
// ================================================================== //

function DefaultSection() {
  return (
    <PreviewSection label="Default" wrapClassName="w-full">
      <div className="flex items-center justify-center w-full">
        <div
          style={{
            width: "340px",
            height: "200px",
            background: "#F5F5F5",
            borderRadius: "10px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Right-side drawer panel */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "180px",
              background: "#FFFFFF",
              boxShadow:
                "0 16px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)",
            }}
          >
            {/* Close button */}
            <button
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                width: "24px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#838383",
                cursor: "pointer",
                background: "transparent",
                border: "none",
                padding: 0,
              }}
            >
              <X style={{ width: "14px", height: "14px" }} />
            </button>

            {/* Header */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "0.8px solid #F0F0F0",
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "#262626",
                }}
              >
                Notifications
              </div>
              <div
                style={{
                  fontWeight: 400,
                  fontSize: "12.3px",
                  color: "#838383",
                  marginTop: "4px",
                }}
              >
                You have 3 unread messages.
              </div>
            </div>

            {/* Body — list items */}
            <div style={{ padding: "20px", fontSize: "13px", color: "rgba(38,38,38,0.7)" }}>
              {["New comment on your post", "Team invite from Alex", "Payment processed"].map(
                (text, i) => (
                  <div
                    key={i}
                    style={{
                      height: "40px",
                      padding: "0 16px",
                      borderBottom: "0.8px solid #F8F8F8",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        background: "#3B82F6",
                        borderRadius: "50%",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 400,
                        color: "#262626",
                      }}
                    >
                      {text}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </PreviewSection>
  )
}

function SidesSection() {
  const sides = [
    {
      name: "Right",
      panelStyle: {
        position: "absolute" as const,
        right: 0,
        top: 0,
        bottom: 0,
        width: "140px",
        background: "white",
        boxShadow:
          "0 16px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
    {
      name: "Left",
      panelStyle: {
        position: "absolute" as const,
        left: 0,
        top: 0,
        bottom: 0,
        width: "140px",
        background: "white",
        boxShadow:
          "0 16px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
    {
      name: "Bottom",
      panelStyle: {
        position: "absolute" as const,
        bottom: 0,
        left: 0,
        right: 0,
        height: "50px",
        background: "white",
        boxShadow:
          "0 16px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)",
        borderRadius: "12px 12px 0 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
    {
      name: "Top",
      panelStyle: {
        position: "absolute" as const,
        top: 0,
        left: 0,
        right: 0,
        height: "50px",
        background: "white",
        boxShadow:
          "0 16px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)",
        borderRadius: "0 0 12px 12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
  ]

  return (
    <PreviewSection label="Sides" wrapClassName="w-full">
      <div
        className="flex flex-col items-center w-full"
        style={{ gap: "12px" }}
      >
        {sides.map((side) => (
          <div key={side.name} className="flex flex-col items-center">
            <div
              style={{
                width: "340px",
                height: "100px",
                background: "#F5F5F5",
                borderRadius: "10px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div style={side.panelStyle}>
                <span style={{ fontSize: "12px", color: "#838383" }}>
                  {side.name}
                </span>
              </div>
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#838383",
                textAlign: "center",
                marginTop: "4px",
              }}
            >
              {side.name}
            </div>
          </div>
        ))}
      </div>
    </PreviewSection>
  )
}

function WithNavigationSection() {
  const navItems = [
    { label: "Dashboard", active: true },
    { label: "Projects", active: false },
    { label: "Team", active: false },
    { label: "Settings", active: false },
  ]

  return (
    <PreviewSection label="With Navigation" wrapClassName="w-full">
      <div className="flex items-center justify-center w-full">
        <div
          style={{
            width: "340px",
            height: "220px",
            background: "#F5F5F5",
            borderRadius: "10px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Left-side nav drawer */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "180px",
              background: "white",
              boxShadow:
                "0 16px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ paddingTop: "16px" }}>
              {/* Menu title */}
              <div
                style={{
                  padding: "0 16px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#262626",
                  marginBottom: "8px",
                }}
              >
                Menu
              </div>

              {/* Nav items */}
              <div
                className="flex flex-col"
                style={{ padding: "0 8px", gap: "2px" }}
              >
                {navItems.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      height: "32px",
                      padding: "0 12px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "13px",
                      fontWeight: 400,
                      cursor: "default",
                      background: item.active ? "#F0F0F0" : "transparent",
                      color: item.active ? "#262626" : "#838383",
                    }}
                  >
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Separator */}
              <div
                style={{
                  height: "0.8px",
                  background: "#F0F0F0",
                  margin: "8px 16px",
                }}
              />

              {/* Log out */}
              <div
                style={{
                  padding: "0 20px",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "#D5143E",
                }}
              >
                Log out
              </div>
            </div>
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
    <PreviewSection label="Interactive" wrapClassName="w-full">
      <div className="flex items-center justify-center w-full">
        <button
          onClick={() => setOpen(true)}
          style={{
            height: "28px",
            padding: "0 14px",
            borderRadius: "10px",
            border: "0.8px solid #F0F0F0",
            background: "white",
            fontSize: "12.3px",
            fontWeight: 500,
            color: "#262626",
            cursor: "pointer",
          }}
        >
          Open drawer
        </button>
      </div>

      {/* Drawer overlay */}
      {open && (
        <>
          {/* Scrim */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 50,
            }}
          />

          {/* Panel */}
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "340px",
              background: "white",
              boxShadow:
                "0 16px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)",
              zIndex: 51,
              borderRadius: "12px 0 0 12px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                width: "24px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#838383",
                cursor: "pointer",
                background: "transparent",
                border: "none",
                padding: 0,
              }}
            >
              <X style={{ width: "14px", height: "14px" }} />
            </button>

            {/* Header */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "0.8px solid #F0F0F0",
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "#262626",
                }}
              >
                Interactive demo
              </div>
            </div>

            {/* Body */}
            <div
              style={{
                padding: "20px",
                fontSize: "13px",
                color: "rgba(38,38,38,0.7)",
                flex: 1,
              }}
            >
              This drawer slides in from the right. Click outside or press
              Escape to close.
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "12px 20px",
                borderTop: "0.8px solid #F0F0F0",
                display: "flex",
                justifyContent: "flex-end",
                gap: "6px",
              }}
            >
              <button
                onClick={() => setOpen(false)}
                style={{
                  height: "28px",
                  padding: "0 14px",
                  borderRadius: "10px",
                  border: "0.8px solid #F0F0F0",
                  background: "white",
                  fontSize: "12.3px",
                  fontWeight: 500,
                  color: "#262626",
                  cursor: "pointer",
                }}
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
      <SidesSection />
      <WithNavigationSection />
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
      packageName="@hyena/drawer"
      importCode={`import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"`}
      usageCode={`<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outlined">Open</Button>
  </DrawerTrigger>
  <DrawerContent side="right">
    <DrawerHeader>
      <DrawerTitle>Notifications</DrawerTitle>
      <DrawerDescription>
        You have 3 unread messages.
      </DrawerDescription>
    </DrawerHeader>
    <div className="p-4">Content here</div>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outlined">Close</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const DRAWER_PROPS: PropDef[] = [
  { prop: "open", type: "boolean", defaultVal: "—" },
  { prop: "onOpenChange", type: "(open: boolean) => void", defaultVal: "—" },
  { prop: "side", type: '"left" | "right" | "top" | "bottom"', defaultVal: '"right"' },
]

const DRAWER_CONTENT_PROPS: PropDef[] = [
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Drawer"
      description="A panel that slides in from the edge of the screen."
      props={DRAWER_PROPS}
      extraSections={
        <div style={{ marginTop: "28px" }}>
          <LabelPill text="DrawerContent Props" />
          <div style={{ marginTop: "12px", width: "100%" }}>
            <PropsTable props={DRAWER_CONTENT_PROPS} />
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
  sizes: "1",
  deps: "cn, lucide-react",
  related: [
    { label: "Dialog", href: "/components/dialog" },
    { label: "Sheet", href: "/components/sheet" },
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

export function DrawerPage() {
  return (
    <ComponentPageLayout
      name="Drawer"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
