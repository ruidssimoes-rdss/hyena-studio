"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { ColorEditor } from "../token-editor/ColorEditor"
import { RadiusEditor } from "../token-editor/RadiusEditor"
import { SpacingEditor } from "../token-editor/SpacingEditor"
import { DensityEditor } from "../token-editor/DensityEditor"
import { TypographyEditor } from "../token-editor/TypographyEditor"

interface SectionProps {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}

/**
 * Sidebar section — COSS pattern:
 * Group label: text-xs, font-medium, h-7, flex items-center
 */
function Section({ title, defaultOpen = false, children }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-[var(--chrome-border-subtle)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-1.5 h-7 px-3.5 group transition-all duration-200"
      >
        <ChevronRight
          className={`size-3 text-[var(--chrome-text-tertiary)] transition-transform duration-150 ${
            open ? "rotate-90" : ""
          }`}
        />
        <span className="text-xs font-medium text-[var(--chrome-sidebar-fg)]">
          {title}
        </span>
      </button>
      {open && (
        <div className="px-3.5 pb-3">
          {children}
        </div>
      )}
    </div>
  )
}

export function Sidebar() {
  return (
    <nav className="h-full flex flex-col pt-2">
      <Section title="Colors" defaultOpen>
        <ColorEditor />
      </Section>
      <Section title="Radius" defaultOpen>
        <RadiusEditor />
      </Section>
      <Section title="Spacing">
        <SpacingEditor />
      </Section>
      <Section title="Density">
        <DensityEditor />
      </Section>
      <Section title="Typography">
        <TypographyEditor />
      </Section>
    </nav>
  )
}
