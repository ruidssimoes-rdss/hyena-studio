"use client"

import { useTokenStyle } from "@/store/token-store"

/**
 * Wraps children with inline CSS variables from the token store.
 * Any component rendered inside this scope will read token CSS vars.
 */
export function TokenScope({ children, className }: { children: React.ReactNode; className?: string }) {
  const style = useTokenStyle()
  return (
    <div style={style} className={className}>
      {children}
    </div>
  )
}
