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

/* ------------------------------------------------------------------ */
/*  CAP data                                                          */
/* ------------------------------------------------------------------ */

const capData: CAPData = {
  type: "Primitive",
  variants: "3",
  sizes: "1",
  deps: "cn",
  related: [{ label: "Divider", href: "/components/divider" }],
  tokens: [
    { name: "--border", color: "#F0F0F0", border: true },
    { name: "--muted-fg", color: "#838383" },
  ],
}

/* ------------------------------------------------------------------ */
/*  API props                                                         */
/* ------------------------------------------------------------------ */

const apiProps: PropDef[] = [
  { prop: "orientation", type: '"horizontal" | "vertical"', defaultVal: '"horizontal"' },
  { prop: "decorative", type: "boolean", defaultVal: "true" },
  { prop: "label", type: "string", defaultVal: "—" },
  { prop: "className", type: "string", defaultVal: "—" },
]

/* ------------------------------------------------------------------ */
/*  Code tab content                                                  */
/* ------------------------------------------------------------------ */

const importCode = `import { Separator } from "@/components/ui/separator"`

const usageCode = `<Separator />

<Separator orientation="vertical" />`

/* ------------------------------------------------------------------ */
/*  Preview sections                                                  */
/* ------------------------------------------------------------------ */

function HorizontalPreview() {
  const items = ["Section One", "Section Two", "Section Three"]
  return (
    <div style={{ width: 300 }}>
      {items.map((item, i) => (
        <div key={item}>
          <div style={{ padding: "12px 0", fontSize: 13, color: "#262626" }}>
            {item}
          </div>
          {i < items.length - 1 && (
            <div
              style={{
                width: "100%",
                height: 0.8,
                background: "#F0F0F0",
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function VerticalPreview() {
  const items = ["Home", "Settings", "Profile"]
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {items.map((item, i) => (
        <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13, color: "#262626" }}>{item}</span>
          {i < items.length - 1 && (
            <div
              style={{
                width: 0.8,
                height: 16,
                background: "#F0F0F0",
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function WithLabelPreview() {
  return (
    <div style={{ width: 300, display: "flex", flexDirection: "column", gap: 24 }}>
      {/* "or" label */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1, height: 0.8, background: "#F0F0F0" }} />
        <span style={{ padding: "0 12px", fontSize: 12, color: "#838383" }}>or</span>
        <div style={{ flex: 1, height: 0.8, background: "#F0F0F0" }} />
      </div>
      {/* "continue with" label */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1, height: 0.8, background: "#F0F0F0" }} />
        <span style={{ padding: "0 12px", fontSize: 12, color: "#838383" }}>continue with</span>
        <div style={{ flex: 1, height: 0.8, background: "#F0F0F0" }} />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export function SeparatorPage() {
  return (
    <ComponentPageLayout
      name="Separator"
      capContent={<ComponentCAP data={capData} />}
      previewContent={
        <div className="flex flex-col" style={{ gap: 28 }}>
          <PreviewSection label="Horizontal">
            <HorizontalPreview />
          </PreviewSection>
          <PreviewSection label="Vertical">
            <VerticalPreview />
          </PreviewSection>
          <PreviewSection label="With Label">
            <WithLabelPreview />
          </PreviewSection>
        </div>
      }
      codeContent={
        <StandardCodeTab
          packageName="@hyena/separator"
          importCode={importCode}
          usageCode={usageCode}
        />
      }
      apiContent={
        <StandardApiTab
          name="Separator"
          description="A visual divider that separates content into distinct sections."
          props={apiProps}
        />
      }
    />
  )
}
