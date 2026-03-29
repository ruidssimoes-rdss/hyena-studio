"use client"

import { useEffect } from "react"
import { ChevronRight } from "lucide-react"
import { useSetCAP } from "@/editor/shell/CAPContext"
import { ComponentCAP, type CAPData } from "@/editor/components/PageShell"

const EMPTY_CAP: CAPData = {
  type: "—",
  variants: "—",
  sizes: "—",
  deps: "—",
  related: [],
  tokens: [],
}

interface PlaceholderProps {
  title: string
  section?: string
}

export function Placeholder({ title, section }: PlaceholderProps) {
  const setCAP = useSetCAP()

  useEffect(() => {
    setCAP(<ComponentCAP data={EMPTY_CAP} />)
    return () => setCAP(null)
  }, [setCAP])

  return (
    <div style={{ paddingTop: "28px", paddingBottom: "28px" }}>
      {/* Breadcrumb */}
      <div className="flex items-center" style={{ gap: "4px", paddingBottom: "28px" }}>
        {section && (
          <>
            <span style={{ fontSize: "12.3px", fontWeight: 400, color: "#a1a1a1", lineHeight: "17.5px" }}>
              {section}
            </span>
            <ChevronRight style={{ width: "11px", height: "11px", color: "#a1a1a1" }} />
          </>
        )}
        <span style={{ fontSize: "12.3px", fontWeight: 500, color: "#737373", lineHeight: "17.5px" }}>
          {title}
        </span>
      </div>

      {/* Empty state — centered vertically */}
      <div
        className="flex flex-col items-center justify-center"
        style={{
          height: "400px",
          borderRadius: "10px",
          border: "1px solid #f0f0f0",
        }}
      >
        <span style={{ fontSize: "14px", fontWeight: 400, color: "#a1a1a1" }}>
          Coming soon
        </span>
        <span style={{ fontSize: "12.3px", fontWeight: 400, color: "#c8c8c8", marginTop: "8px" }}>
          {title} is being built.
        </span>
      </div>
    </div>
  )
}
