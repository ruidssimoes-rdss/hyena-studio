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
    <PreviewSection label="Default" wrapClassName="w-full" flush>
      <div
        className="flex items-center justify-between w-full h-full"
        style={{ padding: "0 24px" }}
      >
        <span style={{ fontSize: "14px", fontWeight: 500, color: "#262626" }}>
          AppName
        </span>
        <div className="flex items-center" style={{ gap: "20px" }}>
          <span style={{ fontSize: "12.3px", fontWeight: 500, color: "#262626" }}>Home</span>
          <span style={{ fontSize: "12.3px", fontWeight: 400, color: "#727272" }}>Products</span>
          <span style={{ fontSize: "12.3px", fontWeight: 400, color: "#727272" }}>About</span>
          <span style={{ fontSize: "12.3px", fontWeight: 400, color: "#727272" }}>Contact</span>
        </div>
        <div className="flex items-center" style={{ gap: "8px" }}>
          <button
            className="inline-flex items-center justify-center font-medium"
            style={{
              height: "28px",
              padding: "0 10.8px",
              borderRadius: "10px",
              border: "0.8px solid #f0f0f0",
              fontSize: "13px",
              background: "transparent",
              color: "#727272",
            }}
          >
            Sign in
          </button>
          <button
            className="inline-flex items-center justify-center font-medium"
            style={{
              height: "28px",
              padding: "0 10.8px",
              borderRadius: "10px",
              border: "0.8px solid #262626",
              fontSize: "13px",
              background: "#262626",
              color: "#fafafa",
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </PreviewSection>
  )
}

function MinimalSection() {
  return (
    <PreviewSection label="Minimal" wrapClassName="w-full" flush>
      <div
        className="flex items-center justify-between w-full h-full"
        style={{ padding: "0 24px" }}
      >
        <span style={{ fontSize: "14px", fontWeight: 500, color: "#262626" }}>
          AppName
        </span>
        <button
          className="inline-flex items-center justify-center font-medium"
          style={{
            height: "28px",
            padding: "0 10.8px",
            borderRadius: "10px",
            border: "0.8px solid #262626",
            fontSize: "13px",
            background: "#262626",
            color: "#fafafa",
          }}
        >
          Get Started
        </button>
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
      packageName="@hyena/navbar"
      importCode={`import {\n  Navbar,\n  NavbarBrand,\n  NavbarLinks,\n  NavbarLink,\n  NavbarActions,\n} from "@hyena/navbar"`}
      usageCode={`<Navbar>\n  <NavbarBrand>AppName</NavbarBrand>\n  <NavbarLinks>\n    <NavbarLink href="/" active>Home</NavbarLink>\n    <NavbarLink href="/products">Products</NavbarLink>\n    <NavbarLink href="/about">About</NavbarLink>\n  </NavbarLinks>\n  <NavbarActions>\n    <Button variant="ghost">Sign in</Button>\n    <Button>Get Started</Button>\n  </NavbarActions>\n</Navbar>`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const NAVBAR_PROPS: PropDef[] = [
  { prop: "className", type: "string", defaultVal: "—" },
  { prop: "children", type: "React.ReactNode", defaultVal: "—" },
]

const NAVBAR_LINK_PROPS: PropDef[] = [
  { prop: "href", type: "string", defaultVal: "—" },
  { prop: "active", type: "boolean", defaultVal: "false" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Navbar"
      description="A top navigation bar with brand, links, and action slots."
      props={NAVBAR_PROPS}
      extraSections={
        <div style={{ marginTop: "28px" }}>
          <LabelPill text="NavbarLink Props" />
          <div style={{ marginTop: "12px", width: "100%" }}>
            <PropsTable props={NAVBAR_LINK_PROPS} />
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
    { label: "Button", href: "/components/button" },
    { label: "Menu", href: "/components/menu" },
    { label: "Sheet", href: "/components/sheet" },
  ],
  tokens: [
    { name: "--surface", color: "#ffffff", border: true },
    { name: "--foreground", color: "#262626" },
    { name: "--border", color: "#e4e4e7", border: true },
    { name: "--muted-fg", color: "#727272" },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function NavbarPage() {
  return (
    <ComponentPageLayout
      name="Navbar"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
