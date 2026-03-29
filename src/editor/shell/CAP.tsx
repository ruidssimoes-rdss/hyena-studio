"use client"

import { useCAPContent } from "./CAPContext"

// ------------------------------------------------------------------ //
// Contextual Assistant Panel (right column)                           //
// Width matches sidebar: 224px.                                       //
// Content injected per-page via CAPContext.                           //
// ------------------------------------------------------------------ //

export function CAP() {
  const content = useCAPContent()

  return (
    <aside
      className="shrink-0 overflow-y-auto"
      style={{ width: "var(--chrome-sidebar-width)" }}
    >
      {content}
    </aside>
  )
}
