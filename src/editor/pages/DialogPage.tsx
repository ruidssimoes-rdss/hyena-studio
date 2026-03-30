"use client"

import { useState, useEffect } from "react"
import { X, Check } from "lucide-react"
import {
  ComponentPageLayout,
  ComponentCAP,
  PreviewSection,
  StandardCodeTab,
  StandardApiTab,
  type CAPData,
  type PropDef,
} from "@/editor/components/PageShell"

// ── Shared styles ────────────────────────────────────────────────── //

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  zIndex: 50,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

const panelStyle: React.CSSProperties = {
  background: "#FFFFFF",
  borderRadius: "12px",
  boxShadow: "0 16px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)",
  position: "relative",
}

const closeBtnStyle: React.CSSProperties = {
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
}

const headerStyle: React.CSSProperties = {
  padding: "16px 20px",
  borderBottom: "0.8px solid #F0F0F0",
}

const titleStyle: React.CSSProperties = {
  fontWeight: 600,
  fontSize: "15px",
  color: "#262626",
}

const descStyle: React.CSSProperties = {
  fontWeight: 400,
  fontSize: "12.3px",
  color: "#838383",
  marginTop: "4px",
}

const bodyStyle: React.CSSProperties = {
  padding: "20px",
  fontSize: "13px",
  color: "rgba(38,38,38,0.7)",
}

const footerStyle: React.CSSProperties = {
  padding: "12px 20px",
  borderTop: "0.8px solid #F0F0F0",
  display: "flex",
  justifyContent: "flex-end",
  gap: "6px",
}

const outlineBtnStyle: React.CSSProperties = {
  height: "28px",
  padding: "0 14px",
  borderRadius: "10px",
  border: "0.8px solid #F0F0F0",
  background: "white",
  fontSize: "12.3px",
  fontWeight: 500,
  color: "#262626",
  cursor: "pointer",
}

const primaryBtnStyle: React.CSSProperties = {
  height: "28px",
  padding: "0 14px",
  borderRadius: "10px",
  border: "none",
  background: "#262626",
  fontSize: "12.3px",
  fontWeight: 500,
  color: "#FFFFFF",
  cursor: "pointer",
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: "32px",
  border: "0.8px solid #F0F0F0",
  borderRadius: "8px",
  padding: "0 10px",
  fontSize: "13px",
  color: "#262626",
  outline: "none",
  fontFamily: "inherit",
}

const labelStyle: React.CSSProperties = {
  fontSize: "12.3px",
  fontWeight: 500,
  color: "#262626",
  marginBottom: "4px",
  display: "block",
}

const sizeLabelStyle: React.CSSProperties = {
  fontSize: "11px",
  color: "#838383",
  textAlign: "center" as const,
  marginTop: "6px",
}

// ── Close Button Component ───────────────────────────────────────── //

function CloseBtn({ onClick }: { onClick?: () => void }) {
  return (
    <button
      style={closeBtnStyle}
      onClick={onClick}
      onMouseEnter={(e) => { e.currentTarget.style.color = "#262626" }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "#838383" }}
      aria-label="Close"
    >
      <X style={{ width: "14px", height: "14px" }} />
    </button>
  )
}

// ── Section 1: Default ───────────────────────────────────────────── //

function DefaultSection() {
  return (
    <PreviewSection label="Default">
      <div style={{ ...panelStyle, width: "340px" }}>
        <CloseBtn />
        <div style={headerStyle}>
          <div style={titleStyle}>Edit profile</div>
          <div style={descStyle}>Make changes to your profile here.</div>
        </div>
        <div style={bodyStyle}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <label style={labelStyle}>Name</label>
              <input style={inputStyle} defaultValue="Rui Simões" />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input style={inputStyle} defaultValue="rui@hyena.studio" />
            </div>
          </div>
        </div>
        <div style={footerStyle}>
          <button style={outlineBtnStyle}>Cancel</button>
          <button style={primaryBtnStyle}>Save changes</button>
        </div>
      </div>
    </PreviewSection>
  )
}

// ── Section 2: With Form ─────────────────────────────────────────── //

function WithFormSection() {
  return (
    <PreviewSection label="With Form">
      <div style={{ ...panelStyle, width: "340px" }}>
        <div style={headerStyle}>
          <div style={titleStyle}>Create project</div>
          <div style={descStyle}>Add a new project to your workspace.</div>
        </div>
        <div style={bodyStyle}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <label style={labelStyle}>Project name</label>
              <input style={inputStyle} placeholder="My project" />
            </div>
            <div>
              <label style={labelStyle}>Description</label>
              <textarea
                style={{
                  width: "100%",
                  height: "60px",
                  border: "0.8px solid #F0F0F0",
                  borderRadius: "8px",
                  padding: "8px 10px",
                  fontSize: "13px",
                  color: "#262626",
                  outline: "none",
                  fontFamily: "inherit",
                  resize: "vertical",
                }}
              />
            </div>
            <div>
              <label style={labelStyle}>Visibility</label>
              <select
                style={{
                  ...inputStyle,
                  appearance: "auto" as React.CSSProperties["appearance"],
                }}
              >
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>
          </div>
        </div>
        <div style={footerStyle}>
          <button style={outlineBtnStyle}>Cancel</button>
          <button style={primaryBtnStyle}>Create</button>
        </div>
      </div>
    </PreviewSection>
  )
}

// ── Section 3: Sizes ─────────────────────────────────────────────── //

function SizesSection() {
  const sizes = [
    { width: 280, label: "sm" },
    { width: 340, label: "default" },
    { width: 440, label: "lg" },
  ]

  return (
    <PreviewSection label="Sizes">
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center", width: "100%" }}>
        {sizes.map((s) => (
          <div key={s.label}>
            <div style={{ ...panelStyle, width: `${s.width}px` }}>
              <div style={headerStyle}>
                <div style={titleStyle}>Dialog title</div>
              </div>
              <div style={bodyStyle}>Dialog content goes here.</div>
              <div style={footerStyle}>
                <button style={outlineBtnStyle}>Close</button>
              </div>
            </div>
            <div style={sizeLabelStyle}>{s.label}</div>
          </div>
        ))}
      </div>
    </PreviewSection>
  )
}

// ── Section 4: With Feedback ─────────────────────────────────────── //

function WithFeedbackSection() {
  return (
    <PreviewSection label="With Feedback">
      <style>{`@keyframes dialog-spin { to { transform: rotate(360deg) } }`}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center", width: "100%" }}>
        {/* Form state */}
        <div>
          <div style={{ ...panelStyle, width: "340px" }}>
            <CloseBtn />
            <div style={headerStyle}>
              <div style={titleStyle}>Confirm payment</div>
            </div>
            <div style={bodyStyle}>
              You&apos;re about to pay $49.00 for the Pro plan.
            </div>
            <div style={footerStyle}>
              <button style={outlineBtnStyle}>Cancel</button>
              <button style={primaryBtnStyle}>Confirm payment</button>
            </div>
          </div>
          <div style={{ fontSize: "11px", color: "#838383", textAlign: "center", marginTop: "4px" }}>Form</div>
        </div>

        {/* Loading state */}
        <div>
          <div style={{ ...panelStyle, width: "340px" }}>
            <div style={headerStyle}>
              <div style={titleStyle}>Confirm payment</div>
            </div>
            <div style={{ ...bodyStyle, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  border: "2px solid transparent",
                  borderTop: "2px solid #262626",
                  borderRadius: "50%",
                  animation: "dialog-spin 0.6s linear infinite",
                }}
              />
              <div style={{ fontSize: "12.3px", color: "#838383", marginTop: "10px" }}>
                Processing payment...
              </div>
            </div>
            <div style={footerStyle}>
              <button style={{ ...outlineBtnStyle, opacity: 0.5, cursor: "not-allowed" }} disabled>Cancel</button>
              <button style={{ ...primaryBtnStyle, opacity: 0.5, cursor: "not-allowed" }} disabled>Confirm payment</button>
            </div>
          </div>
          <div style={{ fontSize: "11px", color: "#838383", textAlign: "center", marginTop: "4px" }}>Loading</div>
        </div>

        {/* Success state */}
        <div>
          <div style={{ ...panelStyle, width: "340px" }}>
            <CloseBtn />
            <div style={headerStyle}>
              <div style={titleStyle}>Confirm payment</div>
            </div>
            <div style={{ ...bodyStyle, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: "0.8px solid rgba(20,184,166,0.2)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Check style={{ width: "24px", height: "24px", color: "#14B8A6", strokeWidth: 2 }} />
              </div>
              <div style={{ fontWeight: 500, fontSize: "13px", color: "#14B8A6", marginTop: "10px" }}>
                Payment successful
              </div>
            </div>
            <div style={footerStyle}>
              <button style={primaryBtnStyle}>Done</button>
            </div>
          </div>
          <div style={{ fontSize: "11px", color: "#838383", textAlign: "center", marginTop: "4px" }}>Success</div>
        </div>
      </div>
    </PreviewSection>
  )
}

// ── Section 5: Interactive ───────────────────────────────────────── //

function InteractiveSection() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open])

  return (
    <PreviewSection label="Interactive">
      <button style={primaryBtnStyle} onClick={() => setOpen(true)}>
        Open dialog
      </button>

      {open && (
        <div style={overlayStyle} onClick={() => setOpen(false)}>
          <div style={{ ...panelStyle, width: "340px" }} onClick={(e) => e.stopPropagation()}>
            <CloseBtn onClick={() => setOpen(false)} />
            <div style={headerStyle}>
              <div style={titleStyle}>Interactive demo</div>
              <div style={descStyle}>This is a real dialog overlay.</div>
            </div>
            <div style={bodyStyle}>
              Click outside or press Escape to close.
            </div>
            <div style={footerStyle}>
              <button style={outlineBtnStyle} onClick={() => setOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </PreviewSection>
  )
}

// ── CAP Data ─────────────────────────────────────────────────────── //

const capData: CAPData = {
  type: "Composite",
  variants: "5",
  sizes: "3 (sm, default, lg)",
  deps: "cn, lucide-react",
  related: [
    { label: "Alert Dialog", href: "/components/alert-dialog" },
    { label: "Drawer", href: "/components/drawer" },
    { label: "Sheet", href: "/components/sheet" },
  ],
  tokens: [
    { name: "--foreground", color: "#262626" },
    { name: "--muted-fg", color: "#838383" },
    { name: "--border", color: "#F0F0F0", border: true },
  ],
}

// ── API Props ────────────────────────────────────────────────────── //

const dialogProps: PropDef[] = [
  { prop: "open", type: "boolean", defaultVal: "—" },
  { prop: "onOpenChange", type: "(open: boolean) => void", defaultVal: "—" },
  { prop: "className", type: "string", defaultVal: "—" },
]

const dialogContentProps: PropDef[] = [
  { prop: "size", type: '"sm" | "default" | "lg"', defaultVal: '"default"' },
  { prop: "className", type: "string", defaultVal: "—" },
]

// ── Page Export ───────────────────────────────────────────────────── //

export function DialogPage() {
  return (
    <ComponentPageLayout
      name="Dialog"
      capContent={<ComponentCAP data={capData} />}
      previewContent={
        <div className="flex flex-col" style={{ gap: "28px" }}>
          <DefaultSection />
          <WithFormSection />
          <SizesSection />
          <WithFeedbackSection />
          <InteractiveSection />
        </div>
      }
      codeContent={
        <StandardCodeTab
          packageName="@hyena/dialog"
          importCode={`import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"`}
          usageCode={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="outlined">Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here.
      </DialogDescription>
    </DialogHeader>
    <div className="py-4">Content here</div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outlined">Cancel</Button>
      </DialogClose>
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
        />
      }
      apiContent={
        <div className="flex flex-col" style={{ gap: "32px" }}>
          <StandardApiTab
            name="Dialog"
            description="A modal dialog that interrupts the user with important content and expects a response."
            props={dialogProps}
          />
          <StandardApiTab
            name="DialogContent"
            description="The content container for the dialog panel."
            props={dialogContentProps}
          />
        </div>
      }
    />
  )
}
