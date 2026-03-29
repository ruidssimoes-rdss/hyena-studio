"use client"

import { useCallback, useState } from "react"
import { ArrowDown, ArrowUp, Check } from "lucide-react"
import { cn } from "@/lib/cn"
import { useTokens } from "@/tokens/provider"

export interface TableColumn {
  key: string
  label: string
  width?: string
  align?: "left" | "center" | "right"
  sortable?: boolean
}

export interface TableProps {
  variant?: "default" | "striped" | "bordered"
  columns: TableColumn[]
  data: Array<Record<string, React.ReactNode>>
  selectable?: boolean
  selectedRows?: string[]
  onSelectRow?: (id: string) => void
  onSort?: (key: string, direction: "asc" | "desc") => void
  emptyMessage?: string
}

// Density-mapped styles — values from CSS variables
const densityStyles = {
  row: "h-[var(--table-row-height)]",
  cellPad: "px-[var(--table-cell-pad-h)] py-[var(--table-cell-pad-v)]",
  headerText:
    "text-[var(--type-label-sm-size)] font-[var(--type-label-sm-weight)] leading-[var(--type-label-sm-line-height)] tracking-[var(--type-label-sm-tracking)]",
}

// CSS vars for density are injected as inline styles on the wrapper
function getDensityVars(density: string): Record<string, string> {
  switch (density) {
    case "compact":
      return {
        "--table-row-height": "36px",
        "--table-cell-pad-h": "var(--spacing-2)",
        "--table-cell-pad-v": "var(--spacing-1)",
        "--table-font": "var(--type-body-sm-size)",
      }
    case "spacious":
      return {
        "--table-row-height": "52px",
        "--table-cell-pad-h": "var(--spacing-4)",
        "--table-cell-pad-v": "var(--spacing-3)",
        "--table-font": "var(--type-body-md-size)",
      }
    default:
      // comfortable
      return {
        "--table-row-height": "44px",
        "--table-cell-pad-h": "var(--spacing-3)",
        "--table-cell-pad-v": "var(--spacing-2)",
        "--table-font": "var(--type-body-md-size)",
      }
  }
}

export function Table({
  variant = "default",
  columns,
  data,
  selectable = false,
  selectedRows = [],
  onSelectRow,
  onSort,
  emptyMessage = "No data",
}: TableProps) {
  const { density } = useTokens()
  const densityVars = getDensityVars(density)
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")

  const handleSort = useCallback(
    (key: string) => {
      const nextDir = sortKey === key && sortDir === "asc" ? "desc" : "asc"
      setSortKey(key)
      setSortDir(nextDir)
      onSort?.(key, nextDir)
    },
    [sortKey, sortDir, onSort]
  )

  return (
    <div
      className="w-full overflow-x-auto rounded-[var(--card-inner-radius,var(--radius-md))]"
      style={densityVars as React.CSSProperties}
    >
      <table className="w-full border-collapse text-[var(--table-font,var(--type-body-md-size))]">
        {/* Header */}
        <thead>
          <tr className="bg-[var(--color-surface-container-high)]">
            {selectable && (
              <th scope="col" className={cn("w-10", densityStyles.cellPad)}>
                <span className="sr-only">Select</span>
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={cn(
                  densityStyles.cellPad,
                  densityStyles.headerText,
                  "text-[var(--color-on-surface-muted)] uppercase",
                  "sticky top-0 bg-[var(--color-surface-container-high)]",
                  col.align === "right" && "text-right",
                  col.align === "center" && "text-center",
                  !col.align && "text-left",
                  col.sortable && "cursor-pointer select-none hover:text-[var(--color-on-surface)]",
                  variant === "bordered" &&
                    "border border-[var(--color-outline-variant)]"
                )}
                style={col.width ? { width: col.width, minWidth: "60px" } : { minWidth: "60px" }}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
              >
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  {col.sortable && sortKey === col.key && (
                    sortDir === "asc" ? (
                      <ArrowUp className="size-3" />
                    ) : (
                      <ArrowDown className="size-3" />
                    )
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className={cn(
                  densityStyles.cellPad,
                  "text-center text-[var(--color-on-surface-muted)] py-8"
                )}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => {
              const rowId = (row.id as string) || String(i)
              const isSelected = selectedRows.includes(rowId)

              return (
                <tr
                  key={rowId}
                  className={cn(
                    densityStyles.row,
                    "transition-colors duration-[var(--duration-fast)]",
                    // Striped
                    variant === "striped" &&
                      i % 2 === 1 &&
                      "bg-[var(--color-surface-container)]",
                    // Selected vs hover
                    isSelected
                      ? "bg-[var(--color-primary-soft)]"
                      : "hover:bg-[var(--color-surface-container)]",
                    // Borders
                    variant !== "bordered" &&
                      "border-b border-[var(--color-outline-variant)]"
                  )}
                >
                  {selectable && (
                    <td className={cn("w-10", densityStyles.cellPad)}>
                      <button
                        onClick={() => onSelectRow?.(rowId)}
                        className={cn(
                          "size-4 rounded-[var(--radius-xs)] border flex items-center justify-center",
                          "transition-colors duration-[var(--duration-fast)]",
                          "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-focus-ring)]",
                          isSelected
                            ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-[var(--color-on-primary)]"
                            : "border-[var(--color-outline)] hover:border-[var(--color-outline-hover)]"
                        )}
                        aria-label={`Select row ${rowId}`}
                      >
                        {isSelected && <Check className="size-3" />}
                      </button>
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        densityStyles.cellPad,
                        "text-[var(--color-on-surface)]",
                        col.align === "right" &&
                          "text-right tabular-nums font-variant-numeric-[tabular-nums]",
                        col.align === "center" && "text-center",
                        variant === "bordered" &&
                          "border border-[var(--color-outline-variant)]"
                      )}
                    >
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
