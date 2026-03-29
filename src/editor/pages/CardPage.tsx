"use client"

import {
  ComponentPageLayout,
  ComponentCAP,
  PreviewSection,
  StandardCodeTab,
  StandardApiTab,
  type CAPData,
  type PropDef,
  LabelPill,
} from "@/editor/components/PageShell"

// ================================================================== //
// SHARED                                                               //
// ================================================================== //

const cardBase: React.CSSProperties = {
  border: "0.8px solid #f0f0f0",
  borderRadius: "10px",
  background: "white",
  overflow: "hidden",
}

const btnStyle: React.CSSProperties = {
  height: "28px",
  padding: "0 10.8px",
  borderRadius: "10px",
  border: "0.8px solid #f0f0f0",
  fontSize: "13px",
  fontWeight: 500,
  cursor: "pointer",
  background: "white",
  color: "#262626",
}

// ================================================================== //
// PREVIEW                                                              //
// ================================================================== //

function DefaultSection() {
  const rows: Array<{ label: string; value: string }> = [
    { label: "Primary", value: "#6366f1" },
    { label: "Radius", value: "8px" },
    { label: "Spacing", value: "4px base" },
  ]

  return (
    <PreviewSection label="Default" height={340}>
      <div style={{ ...cardBase, maxWidth: "380px", width: "100%" }}>
        {/* Header */}
        <div style={{ padding: "16px 16px 0" }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#262626" }}>
            Design Tokens
          </div>
          <div style={{ fontSize: "12.3px", fontWeight: 400, color: "#a1a1a1", marginTop: "2px" }}>
            Your current token configuration.
          </div>
        </div>
        {/* Content */}
        <div style={{ padding: "12px 16px" }}>
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between"
              style={{
                height: "32px",
                fontSize: "12.3px",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ color: "#727272", fontWeight: 400 }}>{row.label}</span>
              <span className="font-mono" style={{ color: "#262626", fontWeight: 400, fontSize: "11px" }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
        {/* Footer */}
        <div
          className="flex items-center justify-end"
          style={{ padding: "0 16px 16px", gap: "8px" }}
        >
          <button style={btnStyle}>Cancel</button>
          <button style={{ ...btnStyle, background: "#262626", border: "0.8px solid #262626", color: "#fafafa" }}>
            Save
          </button>
        </div>
      </div>
    </PreviewSection>
  )
}

function WithImageSection() {
  return (
    <PreviewSection label="With Image" height={360}>
      <div style={{ ...cardBase, maxWidth: "380px", width: "100%" }}>
        {/* Image placeholder */}
        <div
          style={{
            height: "160px",
            background: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "12.3px", color: "#a1a1a1" }}>Image</span>
        </div>
        {/* Header */}
        <div style={{ padding: "16px 16px 0" }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#262626" }}>
            Component Preview
          </div>
          <div style={{ fontSize: "12.3px", fontWeight: 400, color: "#a1a1a1", marginTop: "2px" }}>
            A card with an image header slot.
          </div>
        </div>
        {/* Footer */}
        <div
          className="flex items-center justify-end"
          style={{ padding: "16px", gap: "8px" }}
        >
          <button style={btnStyle}>View</button>
        </div>
      </div>
    </PreviewSection>
  )
}

function MinimalSection() {
  return (
    <PreviewSection label="Minimal" height={200}>
      <div style={{ ...cardBase, maxWidth: "380px", width: "100%", padding: "16px" }}>
        <p style={{ fontSize: "12.3px", fontWeight: 400, color: "#727272", lineHeight: 1.6 }}>
          This is a minimal card with just body content. No header or footer — useful for
          simple content blocks, notes, or inline callouts.
        </p>
      </div>
    </PreviewSection>
  )
}

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <DefaultSection />
      <WithImageSection />
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
      packageName="@hyena/card"
      importCode={`import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@hyena/card"`}
      usageCode={`<Card>
  <CardHeader>
    <CardTitle>Design Tokens</CardTitle>
    <CardDescription>Your current configuration.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card body content here.</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </CardFooter>
</Card>`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const CARD_PROPS: PropDef[] = [
  { prop: "className", type: "string", defaultVal: "—" },
  { prop: "children", type: "React.ReactNode", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Card"
      description="A container component with header, content, and footer slots."
      props={CARD_PROPS}
      extraSections={
        <div style={{ marginTop: "28px" }}>
          <LabelPill text="Sub-components" />
          <div style={{ marginTop: "12px" }}>
            {["CardHeader", "CardTitle", "CardDescription", "CardContent", "CardFooter"].map((name) => (
              <div
                key={name}
                className="flex items-center justify-between"
                style={{
                  height: "36px",
                  padding: "0 12px",
                  fontSize: "12.3px",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <span style={{ fontWeight: 500, color: "#262626" }}>{name}</span>
                <span className="font-mono" style={{ fontSize: "11px", color: "#727272" }}>
                  className, children
                </span>
              </div>
            ))}
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
  variants: "3",
  sizes: "—",
  deps: "cn",
  related: [
    { label: "Alert", href: "/components/alert" },
    { label: "Modal", href: "/components/modal" },
    { label: "Frame", href: "/components/frame" },
  ],
  tokens: [
    { name: "--border", color: "#e4e4e7", border: true },
    { name: "--surface", color: "#ffffff", border: true },
    { name: "--surface-fg", color: "#262626" },
    { name: "--radius", color: "#e4e4e7", border: true },
    { name: "--muted-fg", color: "#a1a1a1" },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function CardPage() {
  return (
    <ComponentPageLayout
      name="Card"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
