"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
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
// PAGINATION PRIMITIVE                                                 //
// ================================================================== //

const navBtnStyle: React.CSSProperties = {
  height: "28px",
  width: "28px",
  border: "0.8px solid #F0F0F0",
  borderRadius: "10px",
  background: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  padding: 0,
}

function PageBtn({
  page,
  active,
  onClick,
}: {
  page: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        height: "28px",
        minWidth: "28px",
        padding: "0 4px",
        border: `0.8px solid ${active ? "#262626" : "#F0F0F0"}`,
        borderRadius: "10px",
        background: active ? "#262626" : "white",
        color: active ? "#FFFFFF" : "#838383",
        fontSize: "12px",
        fontWeight: 500,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {page}
    </button>
  )
}

function Ellipsis() {
  return (
    <span
      style={{
        height: "28px",
        minWidth: "28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
        color: "#D4D4D4",
        cursor: "default",
      }}
    >
      …
    </span>
  )
}

// ================================================================== //
// SECTIONS                                                             //
// ================================================================== //

function DefaultSection() {
  const [current, setCurrent] = useState(3)
  return (
    <PreviewSection label="Default">
      <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
        <button style={navBtnStyle} onClick={() => setCurrent(Math.max(1, current - 1))}>
          <ChevronLeft style={{ width: "14px", height: "14px", color: "#838383" }} />
        </button>
        {[1, 2, 3, 4, 5].map((p) => (
          <PageBtn key={p} page={p} active={p === current} onClick={() => setCurrent(p)} />
        ))}
        <button style={navBtnStyle} onClick={() => setCurrent(Math.min(5, current + 1))}>
          <ChevronRight style={{ width: "14px", height: "14px", color: "#838383" }} />
        </button>
      </div>
    </PreviewSection>
  )
}

function WithEllipsisSection() {
  const [current, setCurrent] = useState(5)
  const pages = [1, null, 4, 5, 6, null, 20] as const
  return (
    <PreviewSection label="With Ellipsis">
      <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
        <button style={navBtnStyle} onClick={() => setCurrent(Math.max(1, current - 1))}>
          <ChevronLeft style={{ width: "14px", height: "14px", color: "#838383" }} />
        </button>
        {pages.map((p, i) =>
          p === null ? (
            <Ellipsis key={`e${i}`} />
          ) : (
            <PageBtn key={p} page={p} active={p === current} onClick={() => setCurrent(p)} />
          ),
        )}
        <button style={navBtnStyle} onClick={() => setCurrent(Math.min(20, current + 1))}>
          <ChevronRight style={{ width: "14px", height: "14px", color: "#838383" }} />
        </button>
      </div>
    </PreviewSection>
  )
}

function CompactSection() {
  const [current, setCurrent] = useState(5)
  const total = 20
  return (
    <PreviewSection label="Compact">
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button style={navBtnStyle} onClick={() => setCurrent(Math.max(1, current - 1))}>
          <ChevronLeft style={{ width: "14px", height: "14px", color: "#838383" }} />
        </button>
        <span style={{ fontSize: "12.3px", fontWeight: 400, color: "#838383" }}>
          Page <span style={{ fontWeight: 500, color: "#262626" }}>{current}</span> of {total}
        </span>
        <button style={navBtnStyle} onClick={() => setCurrent(Math.min(total, current + 1))}>
          <ChevronRight style={{ width: "14px", height: "14px", color: "#838383" }} />
        </button>
      </div>
    </PreviewSection>
  )
}

function WithPageSizeSection() {
  const [current, setCurrent] = useState(3)
  return (
    <PreviewSection label="With Page Size">
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          <button style={navBtnStyle} onClick={() => setCurrent(Math.max(1, current - 1))}>
            <ChevronLeft style={{ width: "14px", height: "14px", color: "#838383" }} />
          </button>
          {[1, 2, 3, 4, 5].map((p) => (
            <PageBtn key={p} page={p} active={p === current} onClick={() => setCurrent(p)} />
          ))}
          <button style={navBtnStyle} onClick={() => setCurrent(Math.min(5, current + 1))}>
            <ChevronRight style={{ width: "14px", height: "14px", color: "#838383" }} />
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "12px", fontWeight: 400, color: "#838383" }}>Show</span>
          <select
            defaultValue="10"
            style={{
              height: "24px",
              width: "56px",
              border: "0.8px solid #F0F0F0",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: 400,
              color: "#262626",
              outline: "none",
              background: "white",
              padding: "0 4px",
            }}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
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
      <WithEllipsisSection />
      <CompactSection />
      <WithPageSizeSection />
    </div>
  )
}

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/pagination"
      importCode={`import {
  Pagination,
  PaginationPrevious,
  PaginationNext,
  PaginationItem,
  PaginationEllipsis,
} from "@/components/ui/pagination"`}
      usageCode={`<Pagination
  total={20}
  current={5}
  onPageChange={setPage}
  siblings={1}
/>`}
    />
  )
}

const PROPS: PropDef[] = [
  { prop: "total", type: "number", defaultVal: "—" },
  { prop: "current", type: "number", defaultVal: "—" },
  { prop: "onPageChange", type: "(page: number) => void", defaultVal: "—" },
  { prop: "siblings", type: "number", defaultVal: "1" },
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Pagination"
      description="Navigation controls for paginated content. Shows page numbers with previous/next buttons."
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
    { label: "Button", href: "/components/button" },
  ],
  tokens: [
    { name: "--primary", color: "#262626" },
    { name: "--primary-fg", color: "#FFFFFF", border: true },
    { name: "--border", color: "#F0F0F0", border: true },
    { name: "--muted-fg", color: "#838383" },
  ],
}

export function PaginationPage() {
  return (
    <ComponentPageLayout
      name="Pagination"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
