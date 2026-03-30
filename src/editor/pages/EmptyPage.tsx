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

// ================================================================== //
// ICONS                                                                //
// ================================================================== //

function InboxIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="5" y="8" width="22" height="16" rx="2" stroke="#D4D4D4" strokeWidth="1.5" />
      <path d="M5 20L11 16H21L27 20" stroke="#D4D4D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FolderOpenIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M5 10V24C5 25.1 5.9 26 7 26H25C26.1 26 27 25.1 27 24V14C27 12.9 26.1 12 25 12H17L14 8H7C5.9 8 5 8.9 5 10Z" stroke="#D4D4D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function EmptyBoxIllustration() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      {/* Box body */}
      <path d="M16 28L16 48C16 49.1 16.9 50 18 50H46C47.1 50 48 49.1 48 48V28" stroke="#D4D4D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Box lid flaps */}
      <path d="M12 28H52" stroke="#D4D4D4" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 28L20 20H44L52 28" stroke="#D4D4D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Sparkles */}
      <path d="M24 14L25 12L26 14L25 16Z" stroke="#D4D4D4" strokeWidth="1" strokeLinejoin="round" />
      <path d="M38 10L39 8L40 10L39 12Z" stroke="#D4D4D4" strokeWidth="1" strokeLinejoin="round" />
      <path d="M44 18L45 16L46 18L45 20Z" stroke="#D4D4D4" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  )
}

// ================================================================== //
// SHARED                                                               //
// ================================================================== //

const dashedContainer: React.CSSProperties = {
  width: "340px",
  border: "0.8px dashed #E0E0E0",
  borderRadius: "10px",
  padding: "32px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
}

// ================================================================== //
// SECTIONS                                                             //
// ================================================================== //

function DefaultSection() {
  return (
    <PreviewSection label="Default">
      <div style={dashedContainer}>
        <InboxIcon />
        <span style={{ fontSize: "14px", fontWeight: 500, color: "#262626" }}>No results found</span>
        <span style={{ fontSize: "12.3px", fontWeight: 400, color: "#838383", textAlign: "center" }}>
          Try adjusting your search or filters.
        </span>
      </div>
    </PreviewSection>
  )
}

function WithActionSection() {
  return (
    <PreviewSection label="With Action">
      <div style={dashedContainer}>
        <FolderOpenIcon />
        <span style={{ fontSize: "14px", fontWeight: 500, color: "#262626" }}>No projects yet</span>
        <span style={{ fontSize: "12.3px", fontWeight: 400, color: "#838383", textAlign: "center" }}>
          Create your first project to get started.
        </span>
        <button
          style={{
            marginTop: "4px",
            height: "28px",
            padding: "0 12px",
            borderRadius: "10px",
            border: "none",
            background: "#262626",
            color: "#FFFFFF",
            fontSize: "12.3px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Create project
        </button>
      </div>
    </PreviewSection>
  )
}

function IllustratedSection() {
  return (
    <PreviewSection label="Illustrated">
      <div style={dashedContainer}>
        <EmptyBoxIllustration />
        <span style={{ fontSize: "14px", fontWeight: 500, color: "#262626" }}>Your inbox is empty</span>
        <span style={{ fontSize: "12.3px", fontWeight: 400, color: "#838383", textAlign: "center" }}>
          When you receive messages, they&apos;ll appear here.
        </span>
      </div>
    </PreviewSection>
  )
}

function MinimalSection() {
  return (
    <PreviewSection label="Minimal">
      <div style={{ width: "340px", display: "flex", justifyContent: "center" }}>
        <span style={{ fontSize: "13px", fontWeight: 500, color: "#838383" }}>Nothing here</span>
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// TABS                                                                 //
// ================================================================== //

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <DefaultSection />
      <WithActionSection />
      <IllustratedSection />
      <MinimalSection />
    </div>
  )
}

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/empty"
      importCode={`import {
  Empty,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
  EmptyAction,
} from "@/components/ui/empty"`}
      usageCode={`<Empty>
  <EmptyIcon>
    <InboxIcon />
  </EmptyIcon>
  <EmptyTitle>No results found</EmptyTitle>
  <EmptyDescription>
    Try adjusting your search or filters.
  </EmptyDescription>
  <EmptyAction>
    <Button>Clear filters</Button>
  </EmptyAction>
</Empty>`}
    />
  )
}

const PROPS: PropDef[] = [
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Empty"
      description="A placeholder component for empty states — shown when a list, table, or page has no content."
      props={PROPS}
    />
  )
}

const CAP_DATA: CAPData = {
  type: "Composite",
  variants: "4",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Table", href: "/components/table" },
    { label: "Card", href: "/components/card" },
  ],
  tokens: [
    { name: "--border", color: "#E0E0E0", border: true },
    { name: "--muted-fg", color: "#838383" },
  ],
}

export function EmptyPage() {
  return (
    <ComponentPageLayout
      name="Empty"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
