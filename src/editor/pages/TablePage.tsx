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

interface TableRow {
  token: string
  value: string
  usage: string
  status: string
}

const TABLE_DATA: TableRow[] = [
  { token: "--primary", value: "#262626", usage: "Buttons, links, focus rings", status: "Active" },
  { token: "--radius", value: "0.625rem", usage: "Cards, inputs, buttons", status: "Active" },
  { token: "--destructive", value: "#d5143e", usage: "Error states, destructive actions", status: "Active" },
  { token: "--spacing", value: "4px", usage: "Padding, margin, gap multiplier", status: "Active" },
]

const HEADERS = ["Token", "Value", "Usage", "Status"]

function StatusBadge() {
  return (
    <span
      className="inline-flex items-center font-medium"
      style={{
        height: "18px",
        padding: "0 4px",
        borderRadius: "10px",
        fontSize: "10px",
        background: "rgba(20,184,166,0.02)",
        border: "0.8px solid #14B8A6",
        color: "#14B8A6",
        lineHeight: 1,
      }}
    >
      Active
    </span>
  )
}

function DataTable({ striped = false }: { striped?: boolean }) {
  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {HEADERS.map((h) => (
              <th
                key={h}
                style={{
                  fontSize: "12.3px",
                  fontWeight: 500,
                  color: "#727272",
                  textAlign: "left",
                  height: "36px",
                  padding: "0 12px",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_DATA.map((row, i) => (
            <tr
              key={row.token}
              style={{
                borderBottom: i < TABLE_DATA.length - 1 ? "1px solid #f0f0f0" : "none",
                background: striped && i % 2 === 1 ? "rgba(0,0,0,0.02)" : "transparent",
                transition: "background 100ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.02)" }}
              onMouseLeave={(e) => { e.currentTarget.style.background = striped && i % 2 === 1 ? "rgba(0,0,0,0.02)" : "transparent" }}
            >
              <td className="font-mono" style={{ fontSize: "12.3px", color: "#262626", height: "40px", padding: "0 12px" }}>
                {row.token}
              </td>
              <td className="font-mono" style={{ fontSize: "12.3px", color: "#262626", height: "40px", padding: "0 12px" }}>
                {row.value}
              </td>
              <td style={{ fontSize: "12.3px", color: "#262626", height: "40px", padding: "0 12px" }}>
                {row.usage}
              </td>
              <td style={{ height: "40px", padding: "0 12px" }}>
                <StatusBadge />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function DefaultSection() {
  return (
    <PreviewSection label="Default" wrapClassName="flex flex-col items-stretch w-full" flush>
      <DataTable />
    </PreviewSection>
  )
}

function StripedSection() {
  return (
    <PreviewSection label="Striped" wrapClassName="flex flex-col items-stretch w-full" flush>
      <DataTable striped />
    </PreviewSection>
  )
}

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <DefaultSection />
      <StripedSection />
    </div>
  )
}

// ================================================================== //
// CODE                                                                 //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/table"
      importCode={`import {\n  Table,\n  TableHeader,\n  TableBody,\n  TableRow,\n  TableHead,\n  TableCell,\n} from "@hyena/table"`}
      usageCode={`<Table>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Token</TableHead>\n      <TableHead>Value</TableHead>\n      <TableHead>Usage</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow>\n      <TableCell>--primary</TableCell>\n      <TableCell>#262626</TableCell>\n      <TableCell>Buttons, links</TableCell>\n    </TableRow>\n  </TableBody>\n</Table>`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const TABLE_PROPS: PropDef[] = [
  { prop: "className", type: "string", defaultVal: "—" },
]

const TABLE_ROW_PROPS: PropDef[] = [
  { prop: "className", type: "string", defaultVal: "—" },
]

const TABLE_HEAD_PROPS: PropDef[] = [
  { prop: "className", type: "string", defaultVal: "—" },
]

const TABLE_CELL_PROPS: PropDef[] = [
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Table"
      description="A data table with header, body, and row components."
      props={TABLE_PROPS}
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
    { label: "Card", href: "/components/card" },
    { label: "Badge", href: "/components/badge" },
    { label: "Pagination", href: "/components/pagination" },
  ],
  tokens: [
    { name: "--border", color: "#e4e4e7", border: true },
    { name: "--surface", color: "#ffffff", border: true },
    { name: "--foreground", color: "#262626" },
    { name: "--muted-fg", color: "#727272" },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function TablePage() {
  return (
    <ComponentPageLayout
      name="Table"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
