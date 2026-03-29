"use client"

import { useState, useCallback } from "react"
import { Check, Copy } from "lucide-react"
import { getAllComponentNames, getComponentSource } from "@/lib/export"

const COMPONENTS = getAllComponentNames()

export function CodeExport() {
  const [selected, setSelected] = useState("Button")
  const [copied, setCopied] = useState(false)

  const code = getComponentSource(selected) || "// Component not found"

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  return (
    <div className="space-y-2">
      {/* Component selector — COSS sidebar-menu-button pattern */}
      <div className="space-y-0">
        {COMPONENTS.map((name) => (
          <button
            key={name}
            onClick={() => {
              setSelected(name)
              setCopied(false)
            }}
            className={`flex items-center w-full h-7 px-2.5 rounded-lg text-sm transition-all duration-200 ${
              selected === name
                ? "bg-[var(--chrome-accent-soft)] font-medium text-[var(--chrome-text)]"
                : "text-[var(--chrome-sidebar-fg)] hover:text-[var(--chrome-text)]"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Code viewer — COSS code pattern */}
      <div className="relative rounded-2xl overflow-hidden border border-[var(--chrome-border)] shadow-[0_1px_rgba(0,0,0,0.04)]">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-[rgba(255,255,255,0.5)] hover:text-[rgba(255,255,255,0.8)] bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.12)] transition-colors z-10"
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
        <pre className="p-4 text-[13px] font-mono leading-[1.7] text-[#d4d4d8] bg-[#1a1a2e] overflow-x-auto max-h-48 overflow-y-auto whitespace-pre">
          {code}
        </pre>
      </div>
    </div>
  )
}
