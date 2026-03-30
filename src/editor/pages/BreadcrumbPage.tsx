"use client"

import { useState } from "react"
import { ChevronRight, Home, Package, Headphones } from "lucide-react"
import {
  ComponentPageLayout,
  ComponentCAP,
  PreviewSection,
  StandardCodeTab,
  StandardApiTab,
  PropsTable,
  LabelPill,
  type CAPData,
  type PropDef,
} from "@/editor/components/PageShell"

// ================================================================== //
// SHARED                                                               //
// ================================================================== //

const linkStyle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 400,
  color: "#838383",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
}

const currentStyle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 500,
  color: "#262626",
  display: "inline-flex",
  alignItems: "center",
}

const separatorIconStyle: React.CSSProperties = {
  width: "14px",
  height: "14px",
  color: "#D4D4D4",
  strokeWidth: 1.5,
  flexShrink: 0,
}

const textSeparatorStyle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 400,
  color: "#D4D4D4",
  flexShrink: 0,
}

function BreadcrumbLink({
  children,
  icon,
}: {
  children: React.ReactNode
  icon?: React.ReactNode
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      style={{
        ...linkStyle,
        color: hovered ? "#262626" : "#838383",
        textDecoration: hovered ? "underline" : "none",
        textUnderlineOffset: "2px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon && (
        <span style={{ marginRight: "4px", display: "inline-flex" }}>
          {icon}
        </span>
      )}
      {children}
    </span>
  )
}

function BreadcrumbCurrent({
  children,
  icon,
}: {
  children: React.ReactNode
  icon?: React.ReactNode
}) {
  return (
    <span style={currentStyle}>
      {icon && (
        <span style={{ marginRight: "4px", display: "inline-flex" }}>
          {icon}
        </span>
      )}
      {children}
    </span>
  )
}

function ChevronSep() {
  return <ChevronRight style={separatorIconStyle} />
}

function TextSep({ char }: { char: string }) {
  return <span style={textSeparatorStyle}>{char}</span>
}

function BreadcrumbRow({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "6px",
      }}
    >
      {children}
    </nav>
  )
}

// ================================================================== //
// SECTION 1: DEFAULT                                                   //
// ================================================================== //

function DefaultSection() {
  return (
    <PreviewSection label="Default">
      <BreadcrumbRow>
        <BreadcrumbLink>Home</BreadcrumbLink>
        <ChevronSep />
        <BreadcrumbLink>Products</BreadcrumbLink>
        <ChevronSep />
        <BreadcrumbCurrent>Headphones</BreadcrumbCurrent>
      </BreadcrumbRow>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 2: WITH ICONS                                                //
// ================================================================== //

const iconSize = { width: 14, height: 14 }

function WithIconsSection() {
  return (
    <PreviewSection label="With Icons">
      <BreadcrumbRow>
        <BreadcrumbLink icon={<Home {...iconSize} style={{ color: "inherit" }} />}>
          Home
        </BreadcrumbLink>
        <ChevronSep />
        <BreadcrumbLink icon={<Package {...iconSize} style={{ color: "inherit" }} />}>
          Products
        </BreadcrumbLink>
        <ChevronSep />
        <BreadcrumbCurrent icon={<Headphones {...iconSize} style={{ color: "#262626" }} />}>
          Headphones
        </BreadcrumbCurrent>
      </BreadcrumbRow>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 3: SEPARATOR VARIANTS                                        //
// ================================================================== //

function SeparatorVariantsSection() {
  return (
    <PreviewSection label="Separator Variants">
      {/* Chevron */}
      <BreadcrumbRow>
        <BreadcrumbLink>Home</BreadcrumbLink>
        <ChevronSep />
        <BreadcrumbLink>Products</BreadcrumbLink>
        <ChevronSep />
        <BreadcrumbCurrent>Headphones</BreadcrumbCurrent>
      </BreadcrumbRow>

      {/* Slash */}
      <BreadcrumbRow>
        <BreadcrumbLink>Home</BreadcrumbLink>
        <TextSep char="/" />
        <BreadcrumbLink>Products</BreadcrumbLink>
        <TextSep char="/" />
        <BreadcrumbCurrent>Headphones</BreadcrumbCurrent>
      </BreadcrumbRow>

      {/* Dot */}
      <BreadcrumbRow>
        <BreadcrumbLink>Home</BreadcrumbLink>
        <TextSep char="·" />
        <BreadcrumbLink>Products</BreadcrumbLink>
        <TextSep char="·" />
        <BreadcrumbCurrent>Headphones</BreadcrumbCurrent>
      </BreadcrumbRow>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 4: TRUNCATED                                                 //
// ================================================================== //

function EllipsisButton() {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      style={{
        width: "24px",
        height: "20px",
        background: hovered ? "#E8E8E8" : "#F0F0F0",
        borderRadius: "4px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "13px",
        fontWeight: 400,
        color: "#838383",
        cursor: "pointer",
        transition: "background 150ms",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      …
    </span>
  )
}

function TruncatedSection() {
  return (
    <PreviewSection label="Truncated">
      <BreadcrumbRow>
        <BreadcrumbLink>Home</BreadcrumbLink>
        <ChevronSep />
        <EllipsisButton />
        <ChevronSep />
        <BreadcrumbLink>Category</BreadcrumbLink>
        <ChevronSep />
        <BreadcrumbLink>Sub-category</BreadcrumbLink>
        <ChevronSep />
        <BreadcrumbCurrent>Current Page</BreadcrumbCurrent>
      </BreadcrumbRow>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 5: CUSTOM SEPARATOR                                          //
// ================================================================== //

function CustomSeparatorSection() {
  return (
    <PreviewSection label="Custom Separator">
      <BreadcrumbRow>
        <BreadcrumbLink>Dashboard</BreadcrumbLink>
        <TextSep char="→" />
        <BreadcrumbLink>Settings</BreadcrumbLink>
        <TextSep char="→" />
        <BreadcrumbCurrent>Notifications</BreadcrumbCurrent>
      </BreadcrumbRow>
    </PreviewSection>
  )
}

// ================================================================== //
// PREVIEW TAB                                                          //
// ================================================================== //

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <DefaultSection />
      <WithIconsSection />
      <SeparatorVariantsSection />
      <TruncatedSection />
      <CustomSeparatorSection />
    </div>
  )
}

// ================================================================== //
// CODE TAB                                                             //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/breadcrumb"
      importCode={`import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"`}
      usageCode={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
    />
  )
}

// ================================================================== //
// API TAB                                                              //
// ================================================================== //

const BREADCRUMB_PROPS: PropDef[] = [
  { prop: "separator", type: "ReactNode", defaultVal: "chevron-right icon" },
  { prop: "className", type: "string", defaultVal: "—" },
]

const BREADCRUMB_LINK_PROPS: PropDef[] = [
  { prop: "href", type: "string", defaultVal: "—" },
  { prop: "className", type: "string", defaultVal: "—" },
]

const BREADCRUMB_PAGE_PROPS: PropDef[] = [
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <div>
      <h2 style={{ fontSize: "16px", fontWeight: 500, color: "#262626", marginBottom: "4px" }}>
        Breadcrumb
      </h2>
      <p style={{ fontSize: "12.3px", fontWeight: 400, color: "#727272", lineHeight: 1.6, marginBottom: "24px" }}>
        A horizontal navigation trail showing the current page location within a hierarchy.
      </p>

      <LabelPill text="Breadcrumb Props" />
      <div style={{ marginTop: "12px", width: "100%", marginBottom: "24px" }}>
        <PropsTable props={BREADCRUMB_PROPS} />
      </div>

      <LabelPill text="BreadcrumbLink Props" />
      <div style={{ marginTop: "12px", width: "100%", marginBottom: "24px" }}>
        <PropsTable props={BREADCRUMB_LINK_PROPS} />
      </div>

      <LabelPill text="BreadcrumbPage Props" />
      <div style={{ marginTop: "12px", width: "100%" }}>
        <PropsTable props={BREADCRUMB_PAGE_PROPS} />
      </div>
    </div>
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Composite",
  variants: "5",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Tabs", href: "/components/tabs" },
    { label: "Navbar", href: "/components/navbar" },
  ],
  tokens: [
    { name: "--foreground", color: "#262626" },
    { name: "--muted-fg", color: "#838383" },
    { name: "--border", color: "#D4D4D4", border: true },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function BreadcrumbPage() {
  return (
    <ComponentPageLayout
      name="Breadcrumb"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
