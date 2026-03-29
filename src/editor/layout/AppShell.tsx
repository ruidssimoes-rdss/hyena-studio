"use client"

import { TokenProvider, useTokens } from "@/tokens/provider"
import { useRules } from "@/hooks/useRules"
import { Sidebar } from "./Sidebar"
import { Panel } from "./Panel"
import { ComponentPreview } from "../preview/ComponentPreview"
import { Zap } from "lucide-react"

function TopBar() {
  const report = useRules()
  const hasErrors = report.errors.length > 0
  const hasIssues = report.errors.length + report.warnings.length > 0

  return (
    <header
      className="sticky top-0 z-40 w-full shrink-0 flex items-center justify-between px-4 sm:px-6 bg-[var(--chrome-sidebar)]/80 backdrop-blur-sm"
      style={{ height: "var(--chrome-header-height)" }}
    >
      {/* Bottom border via pseudo — COSS pattern */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--chrome-border-sidebar)]" />

      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <div className="size-6 rounded-[6px] bg-[var(--chrome-accent)] flex items-center justify-center">
          <Zap className="size-3.5 text-[var(--chrome-accent-text)]" strokeWidth={2.5} />
        </div>
        <span className="text-sm font-semibold text-[var(--chrome-text)] tracking-tight">
          Hyena
        </span>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-4">
        {/* Rules status */}
        <div className="flex items-center gap-1.5">
          {hasIssues && (
            <span
              className="size-1.5 rounded-full shrink-0"
              style={{
                backgroundColor: hasErrors
                  ? "var(--chrome-error)"
                  : "var(--chrome-warning)",
              }}
            />
          )}
          <span className="text-xs font-mono text-[var(--chrome-text-tertiary)] tabular-nums">
            {report.passed}/{report.total}
          </span>
        </div>

        {/* Command palette trigger */}
        <button className="flex items-center gap-1.5 h-8 px-2.5 rounded-[var(--chrome-radius)] text-xs text-[var(--chrome-text-tertiary)] hover:text-[var(--chrome-text-secondary)] hover:bg-[var(--chrome-accent-soft)] transition-all duration-150">
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[var(--chrome-surface)] border border-[var(--chrome-border)] shadow-[0_1px_rgba(0,0,0,0.04)]">
            ⌘K
          </kbd>
        </button>
      </div>
    </header>
  )
}

function EditorLayout() {
  const { styleObject, radiusPreset, density } = useTokens()

  return (
    <div className="hyena-chrome relative isolate flex min-h-dvh flex-col overflow-clip bg-[var(--chrome-sidebar)]">
      <TopBar />

      {/* 3-panel layout — COSS: lg:grid lg:grid-cols-[sidebar_minmax(0,1fr)] */}
      <div className="flex-1 flex min-h-0">
        {/* Left — Token editor sidebar */}
        <aside
          className="shrink-0 bg-[var(--chrome-sidebar)] border-r border-[var(--chrome-border-sidebar)] overflow-y-auto"
          style={{ width: "var(--chrome-sidebar-width)" }}
        >
          <Sidebar />
        </aside>

        {/* Center — Component preview (white card bg) */}
        <main className="flex-1 overflow-y-auto bg-[var(--chrome-surface)]">
          <div className="mx-auto w-full max-w-3xl px-6 sm:px-10 py-8">
            {/* Page header */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-[var(--chrome-text)] tracking-tight">
                Components
              </h1>
              <p className="text-sm text-[var(--chrome-text-secondary)] mt-1">
                13 components · {density.charAt(0).toUpperCase() + density.slice(1)} density · {radiusPreset.charAt(0).toUpperCase() + radiusPreset.slice(1)} radius
              </p>
            </div>

            {/* Preview area — inside token scope */}
            <div style={styleObject}>
              <ComponentPreview />
            </div>
          </div>
        </main>

        {/* Right — Rules + Export */}
        <aside className="w-[220px] shrink-0 bg-[var(--chrome-sidebar)] border-l border-[var(--chrome-border-sidebar)] overflow-y-auto">
          <Panel />
        </aside>
      </div>
    </div>
  )
}

export function AppShell() {
  return (
    <TokenProvider>
      <EditorLayout />
    </TokenProvider>
  )
}
