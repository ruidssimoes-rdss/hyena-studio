"use client"

import { useState } from "react"
import { RulesPanel } from "../guidance/RulesPanel"
import { CodeExport } from "../export/CodeExport"
import { TokenExport } from "../export/TokenExport"
import { ExportAll } from "../export/ExportAll"

type PanelTab = "rules" | "export"

export function Panel() {
  const [activeTab, setActiveTab] = useState<PanelTab>("rules")

  return (
    <div className="h-full flex flex-col pt-2">
      {/* Tab bar — COSS tab style */}
      <div className="shrink-0 flex border-b border-[var(--chrome-border-subtle)] mx-3.5">
        {(["rules", "export"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative h-8 px-3 text-xs font-medium transition-colors duration-150 ${
              activeTab === tab
                ? "text-[var(--chrome-text)]"
                : "text-[var(--chrome-text-secondary)] hover:text-[var(--chrome-text)]"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-1.5 right-1.5 h-[2px] rounded-t-full bg-[var(--chrome-accent)]" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto px-3.5 py-3">
        {activeTab === "rules" && <RulesPanel />}
        {activeTab === "export" && (
          <div className="space-y-5">
            <CodeExport />
            <div className="border-t border-[var(--chrome-border-subtle)] pt-4">
              <TokenExport />
            </div>
            <div className="border-t border-[var(--chrome-border-subtle)] pt-4">
              <ExportAll />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
