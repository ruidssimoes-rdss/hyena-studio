"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface CAPContextValue {
  content: ReactNode
  setContent: (content: ReactNode) => void
}

const CAPCtx = createContext<CAPContextValue | null>(null)

export function CAPProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<ReactNode>(null)
  const setContent = useCallback((c: ReactNode) => setContentState(c), [])

  return (
    <CAPCtx.Provider value={{ content, setContent }}>
      {children}
    </CAPCtx.Provider>
  )
}

export function useCAPContent(): ReactNode {
  const ctx = useContext(CAPCtx)
  return ctx?.content ?? null
}

export function useSetCAP() {
  const ctx = useContext(CAPCtx)
  if (!ctx) throw new Error("useSetCAP must be used within CAPProvider")
  return ctx.setContent
}
