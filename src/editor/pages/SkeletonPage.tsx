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
// PREVIEW                                                              //
// ================================================================== //

const skeletonStyle: React.CSSProperties = {
  background: "#f0f0f0",
  animation: "skeleton-pulse 1.5s ease-in-out infinite",
}

function ShapesSection() {
  return (
    <PreviewSection label="Shapes" wrapClassName="flex flex-col items-stretch gap-[10px] w-full">
      {/* Rectangle */}
      <div style={{ ...skeletonStyle, width: "100%", height: "12px", borderRadius: "6px" }} />
      {/* Square */}
      <div className="flex justify-center">
        <div style={{ ...skeletonStyle, width: "40px", height: "40px", borderRadius: "8px" }} />
      </div>
      {/* Circle */}
      <div className="flex justify-center">
        <div style={{ ...skeletonStyle, width: "40px", height: "40px", borderRadius: "50%" }} />
      </div>
      {/* Long rectangle */}
      <div style={{ ...skeletonStyle, width: "100%", height: "12px", borderRadius: "6px" }} />
    </PreviewSection>
  )
}

function CardLoadingSection() {
  return (
    <PreviewSection label="Card Loading" wrapClassName="flex flex-col items-stretch gap-[10px] w-full">
      <div
        style={{
          width: "100%",
          maxWidth: "380px",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid #f0f0f0",
        }}
      >
        {/* Header row: avatar + 2 lines */}
        <div className="flex items-center" style={{ gap: "12px", marginBottom: "20px" }}>
          <div style={{ ...skeletonStyle, width: "40px", height: "40px", borderRadius: "50%", flexShrink: 0 }} />
          <div className="flex flex-col" style={{ gap: "8px", flex: 1 }}>
            <div style={{ ...skeletonStyle, width: "60%", height: "12px", borderRadius: "6px" }} />
            <div style={{ ...skeletonStyle, width: "40%", height: "12px", borderRadius: "6px" }} />
          </div>
        </div>
        {/* Body: 3 full-width lines */}
        <div className="flex flex-col" style={{ gap: "10px", marginBottom: "20px" }}>
          <div style={{ ...skeletonStyle, width: "100%", height: "12px", borderRadius: "6px" }} />
          <div style={{ ...skeletonStyle, width: "100%", height: "12px", borderRadius: "6px" }} />
          <div style={{ ...skeletonStyle, width: "100%", height: "12px", borderRadius: "6px" }} />
        </div>
        {/* Footer: short button */}
        <div style={{ ...skeletonStyle, width: "80px", height: "28px", borderRadius: "8px" }} />
      </div>
    </PreviewSection>
  )
}

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <ShapesSection />
      <CardLoadingSection />
    </div>
  )
}

// ================================================================== //
// CODE                                                                 //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/skeleton"
      importCode={`import { Skeleton } from "@hyena/skeleton"`}
      usageCode={`<Skeleton className="w-48 h-3" />\n\n<Skeleton className="w-10 h-10 rounded-full" />\n\n<Skeleton className="w-full h-3" />`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const SKELETON_PROPS: PropDef[] = [
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Skeleton"
      description="A placeholder animation for loading content. Use className to set width, height, and border-radius."
      props={SKELETON_PROPS}
    />
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Composite",
  variants: "1",
  sizes: "—",
  deps: "cn",
  related: [
    { label: "Card", href: "/components/card" },
    { label: "Table", href: "/components/table" },
    { label: "Spinner", href: "/components/spinner" },
  ],
  tokens: [
    { name: "--muted", color: "#f0f0f0", border: true },
    { name: "--radius", color: "#f0f0f0", border: true },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function SkeletonPage() {
  return (
    <ComponentPageLayout
      name="Skeleton"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
