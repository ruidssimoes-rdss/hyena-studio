"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { NAV_GROUPS, type NavGroup, type NavItem } from "./nav-data"

function NavBadge({ text }: { text: string }) {
  return (
    <span
      className="inline-flex items-center font-medium"
      style={{
        fontSize: "10.5px",
        height: "16.4px",
        padding: "0 3.5px",
        borderRadius: "4.75px",
        background: "rgba(179, 146, 240, 0.12)",
        color: "#B392F0",
      }}
    >
      {text}
    </span>
  )
}

function SidebarItem({ item }: { item: NavItem }) {
  const pathname = usePathname()
  const active = pathname === item.href

  return (
    <Link
      href={item.href}
      className="flex items-center transition-colors duration-150"
      style={{
        height: "28px",
        padding: "5px 12px",
        borderRadius: "8.75px",
        fontSize: "12.3px",
        fontWeight: active ? 500 : 400,
        color: active ? "#262626" : "#727272",
        background: active ? "#f0f0f0" : "transparent",
        gap: "6px",
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.background = "rgba(0, 0, 0, 0.04)"
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.background = "transparent"
      }}
    >
      <span className="truncate flex-1">{item.label}</span>
      {item.badge && <NavBadge text={item.badge} />}
    </Link>
  )
}

function SidebarGroup({ group }: { group: NavGroup }) {
  const pathname = usePathname()
  const hasActiveChild = group.items.some((item) => pathname === item.href)

  const [open, setOpen] = useState(
    group.defaultOpen ?? false
  )

  // Auto-open when navigating to a child
  useEffect(() => {
    if (hasActiveChild && !open) {
      setOpen(true)
    }
  }, [hasActiveChild]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ padding: "7px", borderRadius: "10px" }}>
      {/* Group header */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full transition-colors duration-150"
        style={{
          height: "28px",
          padding: "5px 12px",
          fontSize: "12.3px",
          fontWeight: 500,
          color: "#262626",
        }}
      >
        <span>{group.label}</span>
        <ChevronRight
          className="transition-transform duration-150"
          style={{
            width: "14px",
            height: "14px",
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {/* Items */}
      {open && (
        <div className="flex flex-col" style={{ gap: "1.8px", marginTop: "1.8px" }}>
          {group.items.map((item) => (
            <SidebarItem key={item.href} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export function Sidebar() {
  return (
    <aside
      className="shrink-0 overflow-y-auto bg-[#fafafa]"
      style={{
        width: "var(--chrome-sidebar-width)",
        padding: "0 14px",
      }}
    >
      {/* Top spacer */}
      <div style={{ height: "14px" }} />

      {NAV_GROUPS.map((group) => (
        <SidebarGroup key={group.label} group={group} />
      ))}
    </aside>
  )
}
