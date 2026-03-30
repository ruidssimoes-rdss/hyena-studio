"use client"

import { useState } from "react"
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

const panelStyle: React.CSSProperties = {
  background: "#FFFFFF",
  borderRadius: 12,
  boxShadow: "0 16px 48px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)",
  position: "relative",
  width: 340,
}

const headerStyle: React.CSSProperties = {
  padding: "16px 20px",
  borderBottom: "0.8px solid #F0F0F0",
}

const titleStyle: React.CSSProperties = {
  fontWeight: 600,
  fontSize: 15,
  color: "#262626",
}

const descriptionStyle: React.CSSProperties = {
  fontWeight: 400,
  fontSize: 12.3,
  color: "#838383",
  marginTop: 4,
}

const footerStyle: React.CSSProperties = {
  padding: "12px 20px",
  borderTop: "0.8px solid #F0F0F0",
  display: "flex",
  justifyContent: "flex-end",
  gap: 6,
}

const bodyStyle: React.CSSProperties = {
  padding: 20,
  fontSize: 13,
  color: "rgba(38,38,38,0.7)",
}

const outlineButtonStyle: React.CSSProperties = {
  height: 28,
  padding: "0 14px",
  borderRadius: 10,
  border: "0.8px solid #F0F0F0",
  background: "white",
  fontSize: 12.3,
  fontWeight: 500,
  color: "#262626",
  cursor: "pointer",
}

const primaryButtonStyle: React.CSSProperties = {
  height: 28,
  padding: "0 14px",
  borderRadius: 10,
  border: "none",
  background: "#262626",
  fontSize: 12.3,
  fontWeight: 500,
  color: "#FFFFFF",
  cursor: "pointer",
}

const destructiveButtonStyle: React.CSSProperties = {
  ...primaryButtonStyle,
  background: "#D5143E",
}

const warningButtonStyle: React.CSSProperties = {
  ...primaryButtonStyle,
  background: "#F97316",
}

const variantLabelStyle: React.CSSProperties = {
  fontSize: 11,
  color: "#838383",
  textAlign: "center",
  marginTop: 4,
}

// ================================================================== //
// PREVIEW                                                              //
// ================================================================== //

function DefaultSection() {
  return (
    <PreviewSection label="Default" wrapClassName="flex flex-col items-center w-full">
      <div style={panelStyle}>
        <div style={headerStyle}>
          <div style={titleStyle}>Are you sure?</div>
          <div style={descriptionStyle}>
            This action cannot be undone. This will permanently delete your account and remove all data from our servers.
          </div>
        </div>
        <div style={footerStyle}>
          <button style={outlineButtonStyle}>Cancel</button>
          <button style={destructiveButtonStyle}>Delete account</button>
        </div>
      </div>
    </PreviewSection>
  )
}

function VariantsSection() {
  return (
    <PreviewSection label="Variants" wrapClassName="flex flex-col items-center w-full">
      <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
        {/* Info */}
        <div>
          <div style={panelStyle}>
            <div style={headerStyle}>
              <div style={titleStyle}>Confirm changes</div>
              <div style={descriptionStyle}>
                You have unsaved changes. Do you want to save before leaving?
              </div>
            </div>
            <div style={footerStyle}>
              <button style={outlineButtonStyle}>Discard</button>
              <button style={primaryButtonStyle}>Save changes</button>
            </div>
          </div>
          <div style={variantLabelStyle}>Info</div>
        </div>

        {/* Warning */}
        <div>
          <div style={panelStyle}>
            <div style={headerStyle}>
              <div style={titleStyle}>Approaching limit</div>
              <div style={descriptionStyle}>
                You've used 90% of your storage. Uploading more files may fail.
              </div>
            </div>
            <div style={footerStyle}>
              <button style={outlineButtonStyle}>Cancel</button>
              <button style={warningButtonStyle}>Upgrade plan</button>
            </div>
          </div>
          <div style={variantLabelStyle}>Warning</div>
        </div>

        {/* Destructive */}
        <div>
          <div style={panelStyle}>
            <div style={headerStyle}>
              <div style={titleStyle}>Delete &quot;Project Alpha&quot;?</div>
              <div style={descriptionStyle}>
                All files, tasks, and comments will be permanently removed. This cannot be undone.
              </div>
            </div>
            <div style={footerStyle}>
              <button style={outlineButtonStyle}>Cancel</button>
              <button style={destructiveButtonStyle}>Delete project</button>
            </div>
          </div>
          <div style={variantLabelStyle}>Destructive</div>
        </div>
      </div>
    </PreviewSection>
  )
}

function CountdownSection() {
  return (
    <PreviewSection label="With Countdown" wrapClassName="flex flex-col items-center w-full">
      <div style={panelStyle}>
        <div style={headerStyle}>
          <div style={titleStyle}>Deleting project</div>
          <div style={descriptionStyle}>
            This project and all its contents will be permanently deleted.
          </div>
        </div>
        <div style={bodyStyle}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                fontWeight: 600,
                fontSize: 32,
                color: "#D5143E",
                textAlign: "center",
              }}
            >
              5
            </div>
            <div
              style={{
                fontWeight: 400,
                fontSize: 12,
                color: "#838383",
                textAlign: "center",
                marginTop: 4,
              }}
            >
              seconds remaining
            </div>
            <div
              style={{
                width: "100%",
                height: 3,
                background: "#F0F0F0",
                borderRadius: 2,
                marginTop: 12,
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: "#D5143E",
                  borderRadius: 2,
                  width: "100%",
                }}
              />
            </div>
          </div>
        </div>
        <div style={footerStyle}>
          <button style={outlineButtonStyle}>Cancel</button>
        </div>
      </div>
    </PreviewSection>
  )
}

function InteractiveSection() {
  const [open, setOpen] = useState(false)

  return (
    <PreviewSection label="Interactive" wrapClassName="flex flex-col items-center w-full">
      <button
        onClick={() => setOpen(true)}
        style={{
          height: 28,
          padding: "0 14px",
          borderRadius: 10,
          border: "0.8px solid #D5143E",
          background: "transparent",
          fontSize: 12.3,
          fontWeight: 500,
          color: "#D5143E",
          cursor: "pointer",
        }}
      >
        Delete something
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={panelStyle}>
            <div style={headerStyle}>
              <div style={titleStyle}>Are you sure?</div>
              <div style={descriptionStyle}>
                This action cannot be undone. This will permanently delete your account and remove all data from our servers.
              </div>
            </div>
            <div style={footerStyle}>
              <button style={outlineButtonStyle} onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button style={destructiveButtonStyle} onClick={() => setOpen(false)}>
                Delete account
              </button>
            </div>
          </div>
        </div>
      )}
    </PreviewSection>
  )
}

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <DefaultSection />
      <VariantsSection />
      <CountdownSection />
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
      packageName="@hyena/alert-dialog"
      importCode={`import {\n  AlertDialog,\n  AlertDialogTrigger,\n  AlertDialogContent,\n  AlertDialogHeader,\n  AlertDialogTitle,\n  AlertDialogDescription,\n  AlertDialogFooter,\n  AlertDialogCancel,\n  AlertDialogAction,\n} from "@/components/ui/alert-dialog"`}
      usageCode={`<AlertDialog>\n  <AlertDialogTrigger asChild>\n    <Button variant="destructive">Delete</Button>\n  </AlertDialogTrigger>\n  <AlertDialogContent>\n    <AlertDialogHeader>\n      <AlertDialogTitle>Are you sure?</AlertDialogTitle>\n      <AlertDialogDescription>\n        This action cannot be undone.\n      </AlertDialogDescription>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogCancel>Cancel</AlertDialogCancel>\n      <AlertDialogAction variant="destructive">\n        Delete\n      </AlertDialogAction>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const ALERT_DIALOG_PROPS: PropDef[] = [
  { prop: "open", type: "boolean", defaultVal: "—" },
  { prop: "onOpenChange", type: "(open: boolean) => void", defaultVal: "—" },
]

const ALERT_DIALOG_ACTION_PROPS: PropDef[] = [
  { prop: "variant", type: '"default" | "destructive"', defaultVal: '"default"' },
  { prop: "countdown", type: "number", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="AlertDialog"
      description="A modal dialog that requires explicit user action to dismiss. Cannot be closed by clicking the overlay or pressing Escape."
      props={ALERT_DIALOG_PROPS}
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
    { label: "Alert", href: "/components/alert" },
    { label: "Button", href: "/components/button" },
  ],
  tokens: [
    { name: "--foreground", color: "#262626" },
    { name: "--muted-fg", color: "#838383" },
    { name: "--error", color: "#D5143E" },
    { name: "--warning", color: "#F97316" },
    { name: "--border", color: "#F0F0F0", border: true },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function AlertDialogPage() {
  return (
    <ComponentPageLayout
      name="Alert Dialog"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
