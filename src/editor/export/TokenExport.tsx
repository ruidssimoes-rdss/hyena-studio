"use client"

import { useState, useCallback } from "react"
import { Check, Copy } from "lucide-react"
import { useTokens } from "@/tokens/provider"
import {
  generateTokensCss,
  generateTailwindConfig,
  generateJsonTokens,
} from "@/lib/export"

type ExportFormat = "css" | "tailwind" | "json"

export function TokenExport() {
  const { cssVars } = useTokens()
  const [format, setFormat] = useState<ExportFormat>("css")
  const [copied, setCopied] = useState(false)

  const output =
    format === "css"
      ? generateTokensCss(cssVars)
      : format === "tailwind"
        ? generateTailwindConfig(cssVars)
        : generateJsonTokens(cssVars)

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [output])

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-[var(--chrome-sidebar-fg)]">
        Tokens
      </p>

      {/* Format tabs — ghost buttons */}
      <div className="flex gap-0.5">
        {(["css", "tailwind", "json"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFormat(f)}
            className={`px-2.5 h-7 rounded-lg text-xs font-medium transition-all duration-200 ${
              format === f
                ? "bg-[var(--chrome-accent-soft)] text-[var(--chrome-text)]"
                : "text-[var(--chrome-sidebar-fg)] hover:text-[var(--chrome-text)]"
            }`}
          >
            {f === "css" ? "CSS" : f === "tailwind" ? "Tailwind" : "JSON"}
          </button>
        ))}
      </div>

      {/* Code viewer */}
      <div className="relative rounded-2xl overflow-hidden border border-[var(--chrome-border)] shadow-[0_1px_rgba(0,0,0,0.04)]">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-[rgba(255,255,255,0.5)] hover:text-[rgba(255,255,255,0.8)] bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.12)] transition-colors z-10"
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
        <pre className="p-4 text-[13px] font-mono leading-[1.7] text-[#d4d4d8] bg-[#1a1a2e] overflow-x-auto max-h-48 overflow-y-auto whitespace-pre">
          {output}
        </pre>
      </div>
    </div>
  )
}
