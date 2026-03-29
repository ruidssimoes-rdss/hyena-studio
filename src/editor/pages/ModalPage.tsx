"use client"

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
    <PreviewSection label="Default" height={350} wrapClassName="w-full h-full">
      <div
        className="flex items-center justify-center w-full h-full"
        style={{
          background: "rgba(0,0,0,0.4)",
          borderRadius: "9px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "14px",
            maxWidth: "420px",
            width: "100%",
            padding: "24px",
          }}
        >
          <div style={{ fontSize: "16px", fontWeight: 500, color: "#262626", marginBottom: "8px" }}>
            Delete project?
          </div>
          <div style={{ fontSize: "12.3px", color: "#727272", lineHeight: 1.6, marginBottom: "20px" }}>
            This action cannot be undone. This will permanently delete the project and all associated data.
          </div>
          <div className="flex items-center justify-end" style={{ gap: "8px" }}>
            <button
              className="inline-flex items-center justify-center font-medium"
              style={{
                height: "28px",
                padding: "0 10.8px",
                borderRadius: "10px",
                border: "0.8px solid #f0f0f0",
                fontSize: "13px",
                background: "white",
                color: "#262626",
              }}
            >
              Cancel
            </button>
            <button
              className="inline-flex items-center justify-center font-medium"
              style={{
                height: "28px",
                padding: "0 10.8px",
                borderRadius: "10px",
                border: "0.8px solid #d5143e",
                fontSize: "13px",
                background: "#d5143e",
                color: "#fafafa",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </PreviewSection>
  )
}

function MinimalSection() {
  return (
    <PreviewSection label="Minimal" height={250} wrapClassName="w-full h-full">
      <div
        className="flex items-center justify-center w-full h-full"
        style={{
          background: "rgba(0,0,0,0.4)",
          borderRadius: "9px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "14px",
            maxWidth: "420px",
            width: "100%",
            padding: "24px",
          }}
        >
          <div style={{ fontSize: "16px", fontWeight: 500, color: "#262626", marginBottom: "20px" }}>
            Confirm
          </div>
          <div className="flex items-center justify-end">
            <button
              className="inline-flex items-center justify-center font-medium"
              style={{
                height: "28px",
                padding: "0 10.8px",
                borderRadius: "10px",
                border: "0.8px solid #f0f0f0",
                fontSize: "13px",
                background: "white",
                color: "#262626",
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </PreviewSection>
  )
}

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <DefaultSection />
      <MinimalSection />
    </div>
  )
}

// ================================================================== //
// CODE                                                                 //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/modal"
      importCode={`import {\n  Modal,\n  ModalTrigger,\n  ModalContent,\n  ModalHeader,\n  ModalTitle,\n  ModalDescription,\n  ModalFooter,\n} from "@hyena/modal"`}
      usageCode={`<Modal>\n  <ModalTrigger asChild>\n    <Button variant="outline">Open</Button>\n  </ModalTrigger>\n  <ModalContent>\n    <ModalHeader>\n      <ModalTitle>Delete project?</ModalTitle>\n      <ModalDescription>\n        This action cannot be undone.\n      </ModalDescription>\n    </ModalHeader>\n    <ModalFooter>\n      <Button variant="outline">Cancel</Button>\n      <Button variant="destructive">Delete</Button>\n    </ModalFooter>\n  </ModalContent>\n</Modal>`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const MODAL_PROPS: PropDef[] = [
  { prop: "open", type: "boolean", defaultVal: "—" },
  { prop: "onOpenChange", type: "(open: boolean) => void", defaultVal: "—" },
]

const MODAL_CONTENT_PROPS: PropDef[] = [
  { prop: "className", type: "string", defaultVal: "—" },
  { prop: "children", type: "React.ReactNode", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Modal"
      description="A dialog overlay for confirmations and focused tasks."
      props={MODAL_PROPS}
      extraSections={
        <div style={{ marginTop: "28px" }}>
          <LabelPill text="ModalContent Props" />
          <div style={{ marginTop: "12px", width: "100%" }}>
            <PropsTable props={MODAL_CONTENT_PROPS} />
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
  variants: "2",
  sizes: "—",
  deps: "cn",
  related: [
    { label: "Dialog", href: "/components/dialog" },
    { label: "Alert", href: "/components/alert" },
    { label: "Sheet", href: "/components/sheet" },
  ],
  tokens: [
    { name: "--surface", color: "#ffffff", border: true },
    { name: "--foreground", color: "#262626" },
    { name: "--border", color: "#e4e4e7", border: true },
    { name: "--radius", color: "#f0f0f0", border: true },
    { name: "--muted-fg", color: "#727272" },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function ModalPage() {
  return (
    <ComponentPageLayout
      name="Modal"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
