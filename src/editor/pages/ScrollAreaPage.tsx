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
// SCROLLBAR STYLES                                                     //
// ================================================================== //

const SCROLLBAR_CSS = `
  .hyena-scroll-vertical::-webkit-scrollbar {
    width: 6px;
  }
  .hyena-scroll-vertical::-webkit-scrollbar-track {
    background: #D4D4D4;
    border-radius: 3px;
  }
  .hyena-scroll-vertical::-webkit-scrollbar-thumb {
    background: #838383;
    border-radius: 3px;
  }
  .hyena-scroll-horizontal::-webkit-scrollbar {
    height: 6px;
  }
  .hyena-scroll-horizontal::-webkit-scrollbar-track {
    background: #D4D4D4;
    border-radius: 3px;
  }
  .hyena-scroll-horizontal::-webkit-scrollbar-thumb {
    background: #838383;
    border-radius: 3px;
  }
  .hyena-scroll-both::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  .hyena-scroll-both::-webkit-scrollbar-track {
    background: #D4D4D4;
    border-radius: 3px;
  }
  .hyena-scroll-both::-webkit-scrollbar-thumb {
    background: #838383;
    border-radius: 3px;
  }
`

// ================================================================== //
// PREVIEW                                                              //
// ================================================================== //

const VERTICAL_ITEMS = Array.from({ length: 15 }, (_, i) => `Tag ${i + 1}`)

const HORIZONTAL_CHIPS = [
  "React", "TypeScript", "Tailwind", "Next.js", "Zustand", "Radix",
  "Lucide", "Framer Motion", "Zod", "Prisma", "tRPC", "Vitest",
  "Playwright", "Storybook", "Turborepo", "ESLint", "Prettier",
]

function VerticalSection() {
  return (
    <PreviewSection label="Vertical">
      <style dangerouslySetInnerHTML={{ __html: SCROLLBAR_CSS }} />
      <div
        className="hyena-scroll-vertical"
        style={{
          width: "100%",
          maxWidth: "320px",
          height: "200px",
          overflowY: "auto",
          border: "0.8px solid #F0F0F0",
          borderRadius: "10px",
        }}
      >
        {VERTICAL_ITEMS.map((item, i) => (
          <div
            key={item}
            style={{
              fontSize: "13px",
              color: "#262626",
              padding: "8px 14px",
              borderBottom: i < VERTICAL_ITEMS.length - 1 ? "0.8px solid #F0F0F0" : "none",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </PreviewSection>
  )
}

function HorizontalSection() {
  return (
    <PreviewSection label="Horizontal">
      <div
        className="hyena-scroll-horizontal"
        style={{
          width: "300px",
          overflowX: "auto",
          border: "0.8px solid #F0F0F0",
          borderRadius: "10px",
          padding: "14px",
        }}
      >
        <div style={{ display: "flex", gap: "6px", flexWrap: "nowrap" }}>
          {HORIZONTAL_CHIPS.map((chip) => (
            <div
              key={chip}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "4px 10px",
                background: "#F8F8F8",
                borderRadius: "6px",
                fontSize: "12px",
                color: "#262626",
                whiteSpace: "nowrap",
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    </PreviewSection>
  )
}

function BothSection() {
  return (
    <PreviewSection label="Both">
      <div
        className="hyena-scroll-both"
        style={{
          width: "300px",
          height: "200px",
          overflow: "auto",
          border: "0.8px solid #F0F0F0",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            width: "500px",
            height: "400px",
            backgroundImage:
              "linear-gradient(to right, #F0F0F0 1px, transparent 1px), linear-gradient(to bottom, #F0F0F0 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "24px",
              left: "24px",
              width: "120px",
              height: "80px",
              borderRadius: "8px",
              background: "#F0F0F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              color: "#838383",
            }}
          >
            Block A
          </div>
          <div
            style={{
              position: "absolute",
              top: "130px",
              left: "180px",
              width: "160px",
              height: "100px",
              borderRadius: "8px",
              background: "#F0F0F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              color: "#838383",
            }}
          >
            Block B
          </div>
          <div
            style={{
              position: "absolute",
              top: "260px",
              left: "60px",
              width: "140px",
              height: "90px",
              borderRadius: "8px",
              background: "#F0F0F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              color: "#838383",
            }}
          >
            Block C
          </div>
        </div>
      </div>
    </PreviewSection>
  )
}

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <VerticalSection />
      <HorizontalSection />
      <BothSection />
    </div>
  )
}

// ================================================================== //
// CODE                                                                 //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/scroll-area"
      importCode={`import { ScrollArea } from "@/components/ui/scroll-area"`}
      usageCode={`<ScrollArea className="h-[200px]">\n  {/* scrollable content */}\n</ScrollArea>`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const SCROLL_AREA_PROPS: PropDef[] = [
  { prop: "orientation", type: '"vertical" | "horizontal" | "both"', defaultVal: '"vertical"' },
  { prop: "className", type: "string", defaultVal: "—" },
  { prop: "scrollbarSize", type: "number", defaultVal: "6" },
  { prop: "children", type: "ReactNode", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="ScrollArea"
      description="A scrollable container with custom styled scrollbars for vertical, horizontal, or bidirectional overflow."
      props={SCROLL_AREA_PROPS}
    />
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Primitive",
  variants: "3",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Table", href: "/components/table" },
  ],
  tokens: [
    { name: "--border", color: "#F0F0F0", border: true },
    { name: "--muted-fg", color: "#838383" },
    { name: "--subtle", color: "#D4D4D4" },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function ScrollAreaPage() {
  return (
    <ComponentPageLayout
      name="Scroll Area"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
