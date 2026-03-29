"use client"

import { useCallback, useState } from "react"
import { Download, Check, Loader2 } from "lucide-react"
import { useTokens } from "@/tokens/provider"
import {
  getAllComponentSources,
  generateTokensCss,
  generateTailwindConfig,
  generateReadme,
  CN_SOURCE,
  INDEX_SOURCE,
} from "@/lib/export"

export function ExportAll() {
  const { cssVars } = useTokens()
  const [state, setState] = useState<"idle" | "generating" | "done">("idle")

  const handleExport = useCallback(async () => {
    setState("generating")

    const JSZip = (await import("jszip")).default
    const zip = new JSZip()

    zip.file("tokens.css", generateTokensCss(cssVars))
    zip.file("tailwind.config.ts", generateTailwindConfig(cssVars))
    zip.file("lib/cn.ts", CN_SOURCE)

    const sources = getAllComponentSources()
    for (const [name, source] of Object.entries(sources)) {
      zip.file(`components/${name}.tsx`, source)
    }

    zip.file("components/index.ts", INDEX_SOURCE)
    zip.file("README.md", generateReadme())

    const blob = await zip.generateAsync({ type: "blob" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "hyena-export.zip"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setState("done")
    setTimeout(() => setState("idle"), 3000)
  }, [cssVars])

  return (
    <button
      onClick={handleExport}
      disabled={state === "generating"}
      className="w-full flex items-center justify-center gap-1.5 h-8 rounded-lg bg-[var(--chrome-accent)] text-[var(--chrome-accent-text)] text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60 shadow-[0_1px_rgba(0,0,0,0.1),inset_0_1px_rgba(255,255,255,0.16)]"
    >
      {state === "generating" ? (
        <>
          <Loader2 className="size-3.5 animate-spin" />
          Generating…
        </>
      ) : state === "done" ? (
        <>
          <Check className="size-3.5" />
          Downloaded
        </>
      ) : (
        <>
          <Download className="size-3.5" />
          Download .zip
        </>
      )}
    </button>
  )
}
