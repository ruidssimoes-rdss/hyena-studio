"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Star, Moon } from "lucide-react"

const NAV_PILLS = [
  {
    label: "Studio",
    href: "/components/button",
    isActive: (p: string) =>
      p.startsWith("/components") ||
      p.startsWith("/tokens") ||
      p.startsWith("/rules") ||
      p.startsWith("/icons"),
  },
  {
    label: "Linter",
    href: "#",
    isActive: () => false,
  },
  {
    label: "Export",
    href: "/export",
    isActive: (p: string) => p === "/export",
  },
] as const

export function Header() {
  const pathname = usePathname()

  return (
    <header
      className="sticky top-0 z-50 shrink-0"
      style={{
        height: "var(--chrome-header-height)",
        background: "rgba(250, 250, 250, 0.8)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Centered inner — max-width 920px */}
      <div
        className="flex items-center justify-between h-full mx-auto"
        style={{
          maxWidth: "920px",
          padding: "0 21px",
        }}
      >
        {/* Left: Wordmark */}
        <div className="flex items-center" style={{ gap: "5.25px" }}>
          <span className="font-cal text-[22.8px] leading-[30.33px] text-[#262626]">
            hyena
          </span>
          <span className="font-cal text-[22.8px] leading-[30.33px] text-[rgba(104,104,104,0.64)]">
            studio
          </span>
        </div>

        {/* Right: Nav pills + utilities */}
        <div className="flex items-center" style={{ gap: "7px" }}>
          {/* Nav pills */}
          {NAV_PILLS.map((pill) => {
            const active = pill.isActive(pathname)
            const El = pill.href === "#" ? "button" : Link

            return (
              <El
                key={pill.label}
                href={pill.href as string}
                className="flex items-center justify-center transition-colors duration-150"
                style={{
                  height: "28px",
                  padding: "0 10.5px",
                  borderRadius: "8.75px",
                  fontSize: "12.3px",
                  fontWeight: 500,
                  color: active ? "#262626" : "#727272",
                  background: active ? "rgba(0, 0, 0, 0.04)" : "transparent",
                }}
              >
                {pill.label}
              </El>
            )
          })}

          {/* ⌘K button */}
          <button
            className="flex items-center transition-all duration-150"
            style={{
              height: "26px",
              padding: "0 9.5px",
              borderRadius: "8.75px",
              background: "white",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
              gap: "6px",
            }}
          >
            <Search
              className="text-[#262626]"
              style={{ width: "14px", height: "14px", opacity: 0.8 }}
            />
            <div className="flex items-center" style={{ gap: "3.5px" }}>
              <kbd
                className="flex items-center justify-center"
                style={{
                  width: "17.5px",
                  height: "17.5px",
                  borderRadius: "3.5px",
                  background: "rgba(0, 0, 0, 0.04)",
                  fontSize: "10.5px",
                  fontWeight: 700,
                  color: "#686868",
                }}
              >
                ⌘
              </kbd>
              <kbd
                className="flex items-center justify-center font-medium"
                style={{
                  width: "17.5px",
                  height: "17.5px",
                  borderRadius: "3.5px",
                  background: "rgba(0, 0, 0, 0.04)",
                  fontSize: "10.5px",
                  color: "#686868",
                }}
              >
                K
              </kbd>
            </div>
          </button>

          {/* Separator */}
          <div
            style={{
              width: "1px",
              height: "17.5px",
              background: "rgba(0, 0, 0, 0.08)",
            }}
          />

          {/* Star count */}
          <div
            className="flex items-center"
            style={{ height: "24.5px", gap: "4px" }}
          >
            <Star
              style={{ width: "14px", height: "14px" }}
              className="text-[#686868]"
            />
            <span
              className="font-medium"
              style={{ fontSize: "10.5px", color: "#686868" }}
            >
              9.5k
            </span>
          </div>

          {/* Theme toggle */}
          <button
            className="flex items-center justify-center transition-colors duration-150 hover:bg-[rgba(0,0,0,0.04)]"
            style={{ width: "28px", height: "28px", borderRadius: "8.75px" }}
            aria-label="Toggle theme"
          >
            <Moon
              style={{
                width: "16px",
                height: "16px",
                transform: "rotate(-45deg)",
              }}
              className="text-[#727272]"
            />
          </button>
        </div>
      </div>
    </header>
  )
}
