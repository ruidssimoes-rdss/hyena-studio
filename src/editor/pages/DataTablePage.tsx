"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  ComponentPageLayout,
  ComponentCAP,
  PreviewSection,
  StandardCodeTab,
  StandardApiTab,
  type CAPData,
  type PropDef,
} from "@/editor/components/PageShell"
import {
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
  Search,
  Settings2,
  MoreHorizontal,
  Eye,
  Pencil,
  Copy,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  Check,
} from "lucide-react"

// ================================================================== //
// DATA                                                                 //
// ================================================================== //

type Payment = {
  id: string
  status: "success" | "processing" | "failed"
  email: string
  amount: number
}

const PAYMENTS: Payment[] = [
  { id: "p1", status: "success", email: "ken99@example.com", amount: 316.0 },
  { id: "p2", status: "success", email: "abe45@example.com", amount: 242.0 },
  { id: "p3", status: "processing", email: "monserrat44@example.com", amount: 837.0 },
  { id: "p4", status: "success", email: "silas22@example.com", amount: 874.0 },
  { id: "p5", status: "failed", email: "carmella@example.com", amount: 721.0 },
]

const PAGINATED_PAYMENTS: Payment[] = [
  { id: "p1", status: "success", email: "ken99@example.com", amount: 316.0 },
  { id: "p2", status: "processing", email: "abe45@example.com", amount: 242.0 },
  { id: "p3", status: "success", email: "monserrat44@example.com", amount: 837.0 },
  { id: "p4", status: "failed", email: "silas22@example.com", amount: 874.0 },
  { id: "p5", status: "success", email: "carmella@example.com", amount: 721.0 },
  { id: "p6", status: "processing", email: "james.wilson@example.com", amount: 129.0 },
  { id: "p7", status: "success", email: "maria.garcia@example.com", amount: 453.0 },
  { id: "p8", status: "failed", email: "david.lee@example.com", amount: 678.0 },
  { id: "p9", status: "success", email: "sarah.jones@example.com", amount: 195.0 },
  { id: "p10", status: "processing", email: "alex.brown@example.com", amount: 562.0 },
  { id: "p11", status: "success", email: "emma.davis@example.com", amount: 384.0 },
  { id: "p12", status: "failed", email: "ryan.miller@example.com", amount: 741.0 },
  { id: "p13", status: "success", email: "olivia.taylor@example.com", amount: 298.0 },
  { id: "p14", status: "processing", email: "noah.anderson@example.com", amount: 156.0 },
  { id: "p15", status: "success", email: "sophia.thomas@example.com", amount: 623.0 },
  { id: "p16", status: "failed", email: "liam.jackson@example.com", amount: 487.0 },
  { id: "p17", status: "success", email: "isabella.white@example.com", amount: 912.0 },
  { id: "p18", status: "processing", email: "mason.harris@example.com", amount: 345.0 },
  { id: "p19", status: "success", email: "ava.martin@example.com", amount: 778.0 },
  { id: "p20", status: "failed", email: "ethan.clark@example.com", amount: 234.0 },
]

const INTERACTIVE_PAYMENTS: Payment[] = [
  { id: "i1", status: "success", email: "ken99@example.com", amount: 316.0 },
  { id: "i2", status: "processing", email: "abe45@example.com", amount: 242.0 },
  { id: "i3", status: "success", email: "monserrat44@example.com", amount: 837.0 },
  { id: "i4", status: "failed", email: "silas22@example.com", amount: 874.0 },
  { id: "i5", status: "success", email: "carmella@example.com", amount: 721.0 },
  { id: "i6", status: "processing", email: "james.wilson@example.com", amount: 129.0 },
  { id: "i7", status: "success", email: "maria.garcia@example.com", amount: 453.0 },
  { id: "i8", status: "failed", email: "david.lee@example.com", amount: 678.0 },
  { id: "i9", status: "success", email: "sarah.jones@example.com", amount: 195.0 },
  { id: "i10", status: "processing", email: "alex.brown@example.com", amount: 562.0 },
]

// ================================================================== //
// HELPERS                                                              //
// ================================================================== //

const STATUS_CONFIG = {
  success: { bg: "rgba(20,184,166,0.08)", color: "#14B8A6", label: "Success", Icon: CheckCircle },
  processing: { bg: "rgba(59,130,246,0.08)", color: "#3B82F6", label: "Processing", Icon: Clock },
  failed: { bg: "rgba(213,20,62,0.08)", color: "#D5143E", label: "Failed", Icon: XCircle },
} as const

function StatusBadge({ status }: { status: Payment["status"] }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span
      className="inline-flex items-center gap-[4px] font-medium"
      style={{
        height: "22px",
        padding: "0 8px",
        borderRadius: "11px",
        fontSize: "11px",
        background: cfg.bg,
        color: cfg.color,
        lineHeight: 1,
      }}
    >
      <cfg.Icon style={{ width: "12px", height: "12px" }} />
      {cfg.label}
    </span>
  )
}

function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
}

function Checkbox({
  checked,
  onChange,
  indeterminate = false,
}: {
  checked: boolean
  onChange: () => void
  indeterminate?: boolean
}) {
  return (
    <button
      onClick={onChange}
      className="flex items-center justify-center"
      style={{
        width: "14px",
        height: "14px",
        borderRadius: "3px",
        border: checked || indeterminate ? "none" : "1.5px solid #E5E5E5",
        background: checked || indeterminate ? "#262626" : "white",
        cursor: "pointer",
        flexShrink: 0,
        transition: "all 150ms",
      }}
      aria-label={checked ? "Deselect row" : "Select row"}
    >
      {checked && <Check style={{ width: "10px", height: "10px", color: "white", strokeWidth: 3 }} />}
      {indeterminate && !checked && (
        <div style={{ width: "8px", height: "2px", background: "white", borderRadius: "1px" }} />
      )}
    </button>
  )
}

// ================================================================== //
// SECTION 1: DEFAULT                                                   //
// ================================================================== //

function DefaultSection() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <PreviewSection label="Default" wrapClassName="flex flex-col items-stretch w-full" flush>
      <div style={{ width: "100%", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Status", "Email", "Amount"].map((h) => (
                <th
                  key={h}
                  style={{
                    fontSize: "12.3px",
                    fontWeight: 500,
                    color: "#838383",
                    textAlign: h === "Amount" ? "right" : "left",
                    height: "40px",
                    padding: "0 16px",
                    borderBottom: "0.8px solid #F0F0F0",
                    background: "#FAFAFA",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PAYMENTS.map((row, i) => (
              <tr
                key={row.id}
                style={{
                  borderBottom: i < PAYMENTS.length - 1 ? "0.8px solid #F0F0F0" : "none",
                  background: hovered === row.id ? "#FAFAFA" : "transparent",
                  transition: "background 100ms",
                }}
                onMouseEnter={() => setHovered(row.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <td style={{ fontSize: "13px", color: "#262626", height: "44px", padding: "0 16px" }}>
                  <StatusBadge status={row.status} />
                </td>
                <td style={{ fontSize: "13px", color: "#262626", height: "44px", padding: "0 16px" }}>
                  {row.email}
                </td>
                <td
                  style={{
                    fontSize: "13px",
                    color: "#262626",
                    height: "44px",
                    padding: "0 16px",
                    textAlign: "right",
                    fontFamily: "monospace",
                  }}
                >
                  {formatAmount(row.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 2: WITH SORTING                                              //
// ================================================================== //

type SortDir = "asc" | "desc" | null
type SortKey = "status" | "email" | "amount"

function WithSortingSection() {
  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  function handleSort(key: SortKey) {
    if (sortKey !== key) {
      setSortKey(key)
      setSortDir("asc")
    } else if (sortDir === "asc") {
      setSortDir("desc")
    } else if (sortDir === "desc") {
      setSortKey(null)
      setSortDir(null)
    }
  }

  const sorted = [...PAYMENTS].sort((a, b) => {
    if (!sortKey || !sortDir) return 0
    const av = a[sortKey]
    const bv = b[sortKey]
    if (typeof av === "number" && typeof bv === "number") {
      return sortDir === "asc" ? av - bv : bv - av
    }
    return sortDir === "asc"
      ? String(av).localeCompare(String(bv))
      : String(bv).localeCompare(String(av))
  })

  const columns: Array<{ key: SortKey; label: string; align: "left" | "right" }> = [
    { key: "status", label: "Status", align: "left" },
    { key: "email", label: "Email", align: "left" },
    { key: "amount", label: "Amount", align: "right" },
  ]

  return (
    <PreviewSection label="With Sorting" wrapClassName="flex flex-col items-stretch w-full" flush>
      <div style={{ width: "100%", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {columns.map((col) => {
                const isActive = sortKey === col.key
                const SortIcon =
                  isActive && sortDir === "asc"
                    ? ChevronUp
                    : isActive && sortDir === "desc"
                      ? ChevronDown
                      : ChevronsUpDown
                return (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    style={{
                      fontSize: "12.3px",
                      fontWeight: isActive ? 500 : 500,
                      color: isActive ? "#262626" : "#838383",
                      textAlign: col.align,
                      height: "40px",
                      padding: "0 16px",
                      borderBottom: "0.8px solid #F0F0F0",
                      background: "#FAFAFA",
                      cursor: "pointer",
                      userSelect: "none",
                      transition: "background 100ms",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#F0F0F0"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#FAFAFA"
                    }}
                  >
                    <div
                      className="inline-flex items-center gap-[4px]"
                      style={{
                        justifyContent: col.align === "right" ? "flex-end" : "flex-start",
                        width: "100%",
                      }}
                    >
                      {col.align === "right" && (
                        <SortIcon
                          style={{
                            width: "12px",
                            height: "12px",
                            color: isActive ? "#262626" : "#C0C0C0",
                          }}
                        />
                      )}
                      <span>{col.label}</span>
                      {col.align !== "right" && (
                        <SortIcon
                          style={{
                            width: "12px",
                            height: "12px",
                            color: isActive ? "#262626" : "#C0C0C0",
                          }}
                        />
                      )}
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr
                key={row.id}
                style={{
                  borderBottom: i < sorted.length - 1 ? "0.8px solid #F0F0F0" : "none",
                  background: hovered === row.id ? "#FAFAFA" : "transparent",
                  transition: "background 100ms",
                }}
                onMouseEnter={() => setHovered(row.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <td style={{ fontSize: "13px", color: "#262626", height: "44px", padding: "0 16px" }}>
                  <StatusBadge status={row.status} />
                </td>
                <td style={{ fontSize: "13px", color: "#262626", height: "44px", padding: "0 16px" }}>
                  {row.email}
                </td>
                <td
                  style={{
                    fontSize: "13px",
                    color: "#262626",
                    height: "44px",
                    padding: "0 16px",
                    textAlign: "right",
                    fontFamily: "monospace",
                  }}
                >
                  {formatAmount(row.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 3: WITH FILTERING                                            //
// ================================================================== //

function WithFilteringSection() {
  const [filter, setFilter] = useState("")
  const [hovered, setHovered] = useState<string | null>(null)

  const filtered = PAYMENTS.filter((row) =>
    row.email.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <PreviewSection label="With Filtering" wrapClassName="flex flex-col items-stretch w-full" flush>
      <div style={{ width: "100%", overflow: "hidden", padding: "0 16px" }}>
        {/* Toolbar */}
        <div className="flex items-center justify-between" style={{ paddingBottom: "12px" }}>
          <div
            className="flex items-center"
            style={{
              height: "28px",
              width: "240px",
              border: "0.8px solid #F0F0F0",
              borderRadius: "8px",
              padding: "0 8px",
              gap: "6px",
            }}
          >
            <Search style={{ width: "14px", height: "14px", color: "#C0C0C0", flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Filter emails..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "12.3px",
                color: "#262626",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <button
            className="inline-flex items-center gap-[6px]"
            style={{
              height: "28px",
              padding: "0 10px",
              border: "0.8px solid #F0F0F0",
              borderRadius: "8px",
              fontSize: "12.3px",
              color: "#262626",
              background: "white",
              cursor: "pointer",
            }}
          >
            <Settings2 style={{ width: "14px", height: "14px", color: "#838383" }} />
            Columns
          </button>
        </div>
      </div>
      <div style={{ width: "100%", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Status", "Email", "Amount"].map((h) => (
                <th
                  key={h}
                  style={{
                    fontSize: "12.3px",
                    fontWeight: 500,
                    color: "#838383",
                    textAlign: h === "Amount" ? "right" : "left",
                    height: "40px",
                    padding: "0 16px",
                    borderBottom: "0.8px solid #F0F0F0",
                    background: "#FAFAFA",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr
                key={row.id}
                style={{
                  borderBottom: i < filtered.length - 1 ? "0.8px solid #F0F0F0" : "none",
                  background: hovered === row.id ? "#FAFAFA" : "transparent",
                  transition: "background 100ms",
                }}
                onMouseEnter={() => setHovered(row.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <td style={{ fontSize: "13px", color: "#262626", height: "44px", padding: "0 16px" }}>
                  <StatusBadge status={row.status} />
                </td>
                <td style={{ fontSize: "13px", color: "#262626", height: "44px", padding: "0 16px" }}>
                  {row.email}
                </td>
                <td
                  style={{
                    fontSize: "13px",
                    color: "#262626",
                    height: "44px",
                    padding: "0 16px",
                    textAlign: "right",
                    fontFamily: "monospace",
                  }}
                >
                  {formatAmount(row.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ padding: "12px 16px 0", fontSize: "11px", color: "#838383" }}>
        {filtered.length} of {PAYMENTS.length} row(s)
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 4: WITH SELECTION                                            //
// ================================================================== //

function WithSelectionSection() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [hovered, setHovered] = useState<string | null>(null)

  const allSelected = selected.size === PAYMENTS.length
  const someSelected = selected.size > 0 && selected.size < PAYMENTS.length

  function toggleAll() {
    if (allSelected) {
      setSelected(new Set())
    } else {
      setSelected(new Set(PAYMENTS.map((p) => p.id)))
    }
  }

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <PreviewSection label="With Selection" wrapClassName="flex flex-col items-stretch w-full" flush>
      <div style={{ width: "100%", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                style={{
                  width: "40px",
                  padding: "0 12px",
                  height: "40px",
                  borderBottom: "0.8px solid #F0F0F0",
                  background: "#FAFAFA",
                  textAlign: "left",
                }}
              >
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={toggleAll}
                />
              </th>
              {["Status", "Email", "Amount"].map((h) => (
                <th
                  key={h}
                  style={{
                    fontSize: "12.3px",
                    fontWeight: 500,
                    color: "#838383",
                    textAlign: h === "Amount" ? "right" : "left",
                    height: "40px",
                    padding: "0 16px",
                    borderBottom: "0.8px solid #F0F0F0",
                    background: "#FAFAFA",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PAYMENTS.map((row, i) => {
              const isSelected = selected.has(row.id)
              return (
                <tr
                  key={row.id}
                  style={{
                    borderBottom: i < PAYMENTS.length - 1 ? "0.8px solid #F0F0F0" : "none",
                    background: isSelected
                      ? "rgba(43,127,255,0.04)"
                      : hovered === row.id
                        ? "#FAFAFA"
                        : "transparent",
                    transition: "background 100ms",
                  }}
                  onMouseEnter={() => setHovered(row.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <td style={{ width: "40px", padding: "0 12px", height: "44px" }}>
                    <Checkbox checked={isSelected} onChange={() => toggleRow(row.id)} />
                  </td>
                  <td style={{ fontSize: "13px", color: "#262626", height: "44px", padding: "0 16px" }}>
                    <StatusBadge status={row.status} />
                  </td>
                  <td style={{ fontSize: "13px", color: "#262626", height: "44px", padding: "0 16px" }}>
                    {row.email}
                  </td>
                  <td
                    style={{
                      fontSize: "13px",
                      color: "#262626",
                      height: "44px",
                      padding: "0 16px",
                      textAlign: "right",
                      fontFamily: "monospace",
                    }}
                  >
                    {formatAmount(row.amount)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div style={{ padding: "12px 16px 0", fontSize: "11px", color: "#838383" }}>
        {selected.size} of {PAYMENTS.length} row(s) selected
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 5: WITH PAGINATION                                           //
// ================================================================== //

function WithPaginationSection() {
  const [page, setPage] = useState(1)
  const [hovered, setHovered] = useState<string | null>(null)
  const pageSize = 5
  const totalPages = Math.ceil(PAGINATED_PAYMENTS.length / pageSize)
  const start = (page - 1) * pageSize
  const paged = PAGINATED_PAYMENTS.slice(start, start + pageSize)

  return (
    <PreviewSection label="With Pagination" wrapClassName="flex flex-col items-stretch w-full" flush>
      <div style={{ width: "100%", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Status", "Email", "Amount"].map((h) => (
                <th
                  key={h}
                  style={{
                    fontSize: "12.3px",
                    fontWeight: 500,
                    color: "#838383",
                    textAlign: h === "Amount" ? "right" : "left",
                    height: "40px",
                    padding: "0 16px",
                    borderBottom: "0.8px solid #F0F0F0",
                    background: "#FAFAFA",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((row, i) => (
              <tr
                key={row.id}
                style={{
                  borderBottom: i < paged.length - 1 ? "0.8px solid #F0F0F0" : "none",
                  background: hovered === row.id ? "#FAFAFA" : "transparent",
                  transition: "background 100ms",
                }}
                onMouseEnter={() => setHovered(row.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <td style={{ fontSize: "13px", color: "#262626", height: "44px", padding: "0 16px" }}>
                  <StatusBadge status={row.status} />
                </td>
                <td style={{ fontSize: "13px", color: "#262626", height: "44px", padding: "0 16px" }}>
                  {row.email}
                </td>
                <td
                  style={{
                    fontSize: "13px",
                    color: "#262626",
                    height: "44px",
                    padding: "0 16px",
                    textAlign: "right",
                    fontFamily: "monospace",
                  }}
                >
                  {formatAmount(row.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination bar */}
      <div
        className="flex items-center justify-between"
        style={{ padding: "12px 16px 0" }}
      >
        <span style={{ fontSize: "12.3px", color: "#838383" }}>
          Showing {start + 1}-{Math.min(start + pageSize, PAGINATED_PAYMENTS.length)} of{" "}
          {PAGINATED_PAYMENTS.length}
        </span>
        <div className="flex items-center" style={{ gap: "4px" }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              height: "28px",
              padding: "0 10px",
              fontSize: "12.3px",
              border: "0.8px solid #F0F0F0",
              borderRadius: "8px",
              background: "white",
              color: "#262626",
              cursor: page === 1 ? "not-allowed" : "pointer",
              opacity: page === 1 ? 0.5 : 1,
            }}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{
                height: "28px",
                width: "28px",
                fontSize: "12.3px",
                border: p === page ? "none" : "0.8px solid #F0F0F0",
                borderRadius: "8px",
                background: p === page ? "#262626" : "white",
                color: p === page ? "white" : "#262626",
                cursor: "pointer",
              }}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{
              height: "28px",
              padding: "0 10px",
              fontSize: "12.3px",
              border: "0.8px solid #F0F0F0",
              borderRadius: "8px",
              background: "white",
              color: "#262626",
              cursor: page === totalPages ? "not-allowed" : "pointer",
              opacity: page === totalPages ? 0.5 : 1,
            }}
          >
            Next
          </button>
        </div>
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 6: WITH ROW ACTIONS                                          //
// ================================================================== //

function ActionMenu({
  open,
  onClose,
  anchorRef,
}: {
  open: boolean
  onClose: () => void
  anchorRef: React.RefObject<HTMLButtonElement | null>
}) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open, onClose, anchorRef])

  if (!open) return null

  const items = [
    { label: "View details", Icon: Eye, color: "#262626" },
    { label: "Edit", Icon: Pencil, color: "#262626" },
    { label: "Copy ID", Icon: Copy, color: "#262626" },
    { label: "separator", Icon: null, color: "" },
    { label: "Delete", Icon: Trash2, color: "#D5143E" },
  ]

  return (
    <div
      ref={menuRef}
      style={{
        position: "absolute",
        right: "0",
        top: "100%",
        marginTop: "4px",
        minWidth: "160px",
        background: "white",
        border: "0.8px solid #F0F0F0",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)",
        zIndex: 50,
        padding: "4px",
        overflow: "hidden",
      }}
    >
      {items.map((item, i) => {
        if (item.label === "separator") {
          return (
            <div
              key={i}
              style={{ height: "1px", background: "#F0F0F0", margin: "4px 0" }}
            />
          )
        }
        const Icon = item.Icon!
        return (
          <button
            key={item.label}
            onClick={onClose}
            className="flex items-center gap-[8px] w-full"
            style={{
              height: "32px",
              padding: "0 8px",
              fontSize: "12.3px",
              color: item.color,
              background: "transparent",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background 100ms",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FAFAFA"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent"
            }}
          >
            <Icon style={{ width: "14px", height: "14px" }} />
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

function WithRowActionsSection() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  return (
    <PreviewSection label="With Row Actions" wrapClassName="flex flex-col items-stretch w-full" flush>
      <div style={{ width: "100%", overflow: "visible" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Status", "Email", "Amount", ""].map((h, idx) => (
                <th
                  key={idx}
                  style={{
                    fontSize: "12.3px",
                    fontWeight: 500,
                    color: "#838383",
                    textAlign: h === "Amount" ? "right" : h === "" ? "right" : "left",
                    height: "40px",
                    padding: "0 16px",
                    borderBottom: "0.8px solid #F0F0F0",
                    background: "#FAFAFA",
                    width: h === "" ? "60px" : undefined,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PAYMENTS.map((row, i) => (
              <tr
                key={row.id}
                style={{
                  borderBottom: i < PAYMENTS.length - 1 ? "0.8px solid #F0F0F0" : "none",
                  background: hovered === row.id ? "#FAFAFA" : "transparent",
                  transition: "background 100ms",
                }}
                onMouseEnter={() => setHovered(row.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <td style={{ fontSize: "13px", color: "#262626", height: "44px", padding: "0 16px" }}>
                  <StatusBadge status={row.status} />
                </td>
                <td style={{ fontSize: "13px", color: "#262626", height: "44px", padding: "0 16px" }}>
                  {row.email}
                </td>
                <td
                  style={{
                    fontSize: "13px",
                    color: "#262626",
                    height: "44px",
                    padding: "0 16px",
                    textAlign: "right",
                    fontFamily: "monospace",
                  }}
                >
                  {formatAmount(row.amount)}
                </td>
                <td style={{ height: "44px", padding: "0 16px", textAlign: "right", width: "60px" }}>
                  <div className="relative inline-block">
                    <button
                      ref={(el) => { buttonRefs.current[row.id] = el }}
                      onClick={() => setOpenMenu(openMenu === row.id ? null : row.id)}
                      className="flex items-center justify-center"
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        border: "none",
                        background: openMenu === row.id ? "#F0F0F0" : "transparent",
                        cursor: "pointer",
                        transition: "background 100ms",
                      }}
                      onMouseEnter={(e) => {
                        if (openMenu !== row.id) e.currentTarget.style.background = "#F0F0F0"
                      }}
                      onMouseLeave={(e) => {
                        if (openMenu !== row.id) e.currentTarget.style.background = "transparent"
                      }}
                    >
                      <MoreHorizontal style={{ width: "16px", height: "16px", color: "#838383" }} />
                    </button>
                    <ActionMenu
                      open={openMenu === row.id}
                      onClose={() => setOpenMenu(null)}
                      anchorRef={{ current: buttonRefs.current[row.id] ?? null }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 7: INTERACTIVE (ALL FEATURES)                                //
// ================================================================== //

function InteractiveSection() {
  const [filter, setFilter] = useState("")
  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>(null)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [page, setPage] = useState(1)
  const [hovered, setHovered] = useState<string | null>(null)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const pageSize = 5

  // Filter
  const filtered = INTERACTIVE_PAYMENTS.filter((row) =>
    row.email.toLowerCase().includes(filter.toLowerCase())
  )

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey || !sortDir) return 0
    const av = a[sortKey]
    const bv = b[sortKey]
    if (typeof av === "number" && typeof bv === "number") {
      return sortDir === "asc" ? av - bv : bv - av
    }
    return sortDir === "asc"
      ? String(av).localeCompare(String(bv))
      : String(bv).localeCompare(String(av))
  })

  // Paginate
  const totalPages = Math.ceil(sorted.length / pageSize)
  const clampedPage = Math.min(page, Math.max(1, totalPages))
  const start = (clampedPage - 1) * pageSize
  const paged = sorted.slice(start, start + pageSize)

  // Reset page on filter change
  const prevFilter = useRef(filter)
  useEffect(() => {
    if (prevFilter.current !== filter) {
      setPage(1)
      prevFilter.current = filter
    }
  }, [filter])

  function handleSort(key: SortKey) {
    if (sortKey !== key) {
      setSortKey(key)
      setSortDir("asc")
    } else if (sortDir === "asc") {
      setSortDir("desc")
    } else if (sortDir === "desc") {
      setSortKey(null)
      setSortDir(null)
    }
  }

  const allPageSelected = paged.length > 0 && paged.every((r) => selected.has(r.id))
  const somePageSelected = paged.some((r) => selected.has(r.id)) && !allPageSelected

  const toggleAll = useCallback(() => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (allPageSelected) {
        paged.forEach((r) => next.delete(r.id))
      } else {
        paged.forEach((r) => next.add(r.id))
      }
      return next
    })
  }, [allPageSelected, paged])

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const columns: Array<{ key: SortKey; label: string; align: "left" | "right" }> = [
    { key: "status", label: "Status", align: "left" },
    { key: "email", label: "Email", align: "left" },
    { key: "amount", label: "Amount", align: "right" },
  ]

  return (
    <PreviewSection label="Interactive" wrapClassName="flex flex-col items-stretch w-full" flush>
      {/* Toolbar */}
      <div style={{ width: "100%", padding: "0 16px" }}>
        <div className="flex items-center justify-between" style={{ paddingBottom: "12px" }}>
          <div
            className="flex items-center"
            style={{
              height: "28px",
              width: "240px",
              border: "0.8px solid #F0F0F0",
              borderRadius: "8px",
              padding: "0 8px",
              gap: "6px",
            }}
          >
            <Search style={{ width: "14px", height: "14px", color: "#C0C0C0", flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Filter emails..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "12.3px",
                color: "#262626",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <button
            className="inline-flex items-center gap-[6px]"
            style={{
              height: "28px",
              padding: "0 10px",
              border: "0.8px solid #F0F0F0",
              borderRadius: "8px",
              fontSize: "12.3px",
              color: "#262626",
              background: "white",
              cursor: "pointer",
            }}
          >
            <Settings2 style={{ width: "14px", height: "14px", color: "#838383" }} />
            Columns
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ width: "100%", overflow: "visible" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {/* Selection header */}
              <th
                style={{
                  width: "40px",
                  padding: "0 12px",
                  height: "40px",
                  borderBottom: "0.8px solid #F0F0F0",
                  background: "#FAFAFA",
                  textAlign: "left",
                }}
              >
                <Checkbox
                  checked={allPageSelected}
                  indeterminate={somePageSelected}
                  onChange={toggleAll}
                />
              </th>
              {/* Data columns */}
              {columns.map((col) => {
                const isActive = sortKey === col.key
                const SortIcon =
                  isActive && sortDir === "asc"
                    ? ChevronUp
                    : isActive && sortDir === "desc"
                      ? ChevronDown
                      : ChevronsUpDown
                return (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    style={{
                      fontSize: "12.3px",
                      fontWeight: 500,
                      color: isActive ? "#262626" : "#838383",
                      textAlign: col.align,
                      height: "40px",
                      padding: "0 16px",
                      borderBottom: "0.8px solid #F0F0F0",
                      background: "#FAFAFA",
                      cursor: "pointer",
                      userSelect: "none",
                      transition: "background 100ms",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#F0F0F0"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#FAFAFA"
                    }}
                  >
                    <div
                      className="inline-flex items-center gap-[4px]"
                      style={{
                        justifyContent: col.align === "right" ? "flex-end" : "flex-start",
                        width: "100%",
                      }}
                    >
                      {col.align === "right" && (
                        <SortIcon
                          style={{
                            width: "12px",
                            height: "12px",
                            color: isActive ? "#262626" : "#C0C0C0",
                          }}
                        />
                      )}
                      <span>{col.label}</span>
                      {col.align !== "right" && (
                        <SortIcon
                          style={{
                            width: "12px",
                            height: "12px",
                            color: isActive ? "#262626" : "#C0C0C0",
                          }}
                        />
                      )}
                    </div>
                  </th>
                )
              })}
              {/* Actions header */}
              <th
                style={{
                  width: "60px",
                  height: "40px",
                  padding: "0 16px",
                  borderBottom: "0.8px solid #F0F0F0",
                  background: "#FAFAFA",
                }}
              />
            </tr>
          </thead>
          <tbody>
            {paged.map((row, i) => {
              const isSelected = selected.has(row.id)
              return (
                <tr
                  key={row.id}
                  style={{
                    borderBottom: i < paged.length - 1 ? "0.8px solid #F0F0F0" : "none",
                    background: isSelected
                      ? "rgba(43,127,255,0.04)"
                      : hovered === row.id
                        ? "#FAFAFA"
                        : "transparent",
                    transition: "background 100ms",
                  }}
                  onMouseEnter={() => setHovered(row.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <td style={{ width: "40px", padding: "0 12px", height: "44px" }}>
                    <Checkbox checked={isSelected} onChange={() => toggleRow(row.id)} />
                  </td>
                  <td style={{ fontSize: "13px", color: "#262626", height: "44px", padding: "0 16px" }}>
                    <StatusBadge status={row.status} />
                  </td>
                  <td style={{ fontSize: "13px", color: "#262626", height: "44px", padding: "0 16px" }}>
                    {row.email}
                  </td>
                  <td
                    style={{
                      fontSize: "13px",
                      color: "#262626",
                      height: "44px",
                      padding: "0 16px",
                      textAlign: "right",
                      fontFamily: "monospace",
                    }}
                  >
                    {formatAmount(row.amount)}
                  </td>
                  <td style={{ height: "44px", padding: "0 16px", textAlign: "right", width: "60px" }}>
                    <div className="relative inline-block">
                      <button
                        ref={(el) => { buttonRefs.current[row.id] = el }}
                        onClick={() => setOpenMenu(openMenu === row.id ? null : row.id)}
                        className="flex items-center justify-center"
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "8px",
                          border: "none",
                          background: openMenu === row.id ? "#F0F0F0" : "transparent",
                          cursor: "pointer",
                          transition: "background 100ms",
                        }}
                        onMouseEnter={(e) => {
                          if (openMenu !== row.id) e.currentTarget.style.background = "#F0F0F0"
                        }}
                        onMouseLeave={(e) => {
                          if (openMenu !== row.id) e.currentTarget.style.background = "transparent"
                        }}
                      >
                        <MoreHorizontal style={{ width: "16px", height: "16px", color: "#838383" }} />
                      </button>
                      <ActionMenu
                        open={openMenu === row.id}
                        onClose={() => setOpenMenu(null)}
                        anchorRef={{ current: buttonRefs.current[row.id] ?? null }}
                      />
                    </div>
                  </td>
                </tr>
              )
            })}
            {paged.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    height: "80px",
                    textAlign: "center",
                    fontSize: "12.3px",
                    color: "#838383",
                  }}
                >
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Status bar + pagination */}
      <div
        className="flex items-center justify-between"
        style={{ padding: "12px 16px 0" }}
      >
        <span style={{ fontSize: "11px", color: "#838383" }}>
          {selected.size} of {filtered.length} row(s) selected
        </span>
        <div className="flex items-center" style={{ gap: "4px" }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={clampedPage === 1}
            style={{
              height: "28px",
              padding: "0 10px",
              fontSize: "12.3px",
              border: "0.8px solid #F0F0F0",
              borderRadius: "8px",
              background: "white",
              color: "#262626",
              cursor: clampedPage === 1 ? "not-allowed" : "pointer",
              opacity: clampedPage === 1 ? 0.5 : 1,
            }}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{
                height: "28px",
                width: "28px",
                fontSize: "12.3px",
                border: p === clampedPage ? "none" : "0.8px solid #F0F0F0",
                borderRadius: "8px",
                background: p === clampedPage ? "#262626" : "white",
                color: p === clampedPage ? "white" : "#262626",
                cursor: "pointer",
              }}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={clampedPage === totalPages || totalPages === 0}
            style={{
              height: "28px",
              padding: "0 10px",
              fontSize: "12.3px",
              border: "0.8px solid #F0F0F0",
              borderRadius: "8px",
              background: "white",
              color: "#262626",
              cursor: clampedPage === totalPages || totalPages === 0 ? "not-allowed" : "pointer",
              opacity: clampedPage === totalPages || totalPages === 0 ? 0.5 : 1,
            }}
          >
            Next
          </button>
        </div>
      </div>
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
      <WithSortingSection />
      <WithFilteringSection />
      <WithSelectionSection />
      <WithPaginationSection />
      <WithRowActionsSection />
      <InteractiveSection />
    </div>
  )
}

// ================================================================== //
// CODE                                                                 //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="hyena-studio"
      importCode={`import { DataTable } from "@/components/ui/data-table"\nimport { columns } from "./columns"`}
      usageCode={`<DataTable\n  columns={columns}\n  data={payments}\n  searchKey="email"\n  searchPlaceholder="Filter emails..."\n  showPagination\n  showRowSelection\n  pageSize={5}\n/>`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const DATA_TABLE_PROPS: PropDef[] = [
  { prop: "columns", type: "ColumnDef<T>[]", defaultVal: "\u2014" },
  { prop: "data", type: "T[]", defaultVal: "\u2014" },
  { prop: "searchKey", type: "string", defaultVal: "\u2014" },
  { prop: "searchPlaceholder", type: "string", defaultVal: '"Search..."' },
  { prop: "showPagination", type: "boolean", defaultVal: "false" },
  { prop: "pageSize", type: "number", defaultVal: "10" },
  { prop: "showRowSelection", type: "boolean", defaultVal: "false" },
  { prop: "showColumnVisibility", type: "boolean", defaultVal: "false" },
  { prop: "onRowSelectionChange", type: "(rows: T[]) => void", defaultVal: "\u2014" },
  { prop: "className", type: "string", defaultVal: "\u2014" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="DataTable"
      description="A full-featured data table with sorting, filtering, column visibility, row selection, and pagination."
      props={DATA_TABLE_PROPS}
    />
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Display",
  variants: "1",
  sizes: "1",
  deps: "@tanstack/react-table",
  related: [
    { label: "Table", href: "/components/table" },
    { label: "Checkbox", href: "/components/checkbox" },
    { label: "Menu", href: "/components/menu" },
    { label: "Pagination", href: "/components/pagination" },
    { label: "Badge", href: "/components/badge" },
    { label: "Input", href: "/components/input" },
  ],
  tokens: [
    { name: "--dt-header-bg", color: "#FAFAFA", border: true },
    { name: "--dt-header-text", color: "#838383" },
    { name: "--dt-row-hover", color: "#FAFAFA", border: true },
    { name: "--dt-row-selected", color: "rgba(43,127,255,0.15)" },
    { name: "--dt-border", color: "#F0F0F0", border: true },
    { name: "--dt-sort-active", color: "#262626" },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function DataTablePage() {
  return (
    <ComponentPageLayout
      name="Data Table"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
