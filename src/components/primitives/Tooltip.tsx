"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/cn"

export interface TooltipProps {
  content: string
  side?: "top" | "right" | "bottom" | "left"
  delay?: number
  children: React.ReactNode
}

const positionStyles: Record<string, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
}

const enterOrigin: Record<string, string> = {
  top: "translate-y-1 opacity-0",
  right: "-translate-x-1 opacity-0",
  bottom: "-translate-y-1 opacity-0",
  left: "translate-x-1 opacity-0",
}

export function Tooltip({
  content,
  side = "top",
  delay = 300,
  children,
}: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = useCallback(() => {
    timerRef.current = setTimeout(() => {
      setMounted(true)
      // rAF to trigger enter animation after mount
      requestAnimationFrame(() => setVisible(true))
    }, delay)
  }, [delay])

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setVisible(false)
    // Wait for exit animation before unmounting
    setTimeout(() => setMounted(false), 100)
  }, [])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {mounted && (
        <span
          role="tooltip"
          className={cn(
            "absolute z-50 pointer-events-none",
            "max-w-60 px-2.5 py-1.5",
            "bg-[var(--color-surface-container-high)] text-[var(--color-on-surface)]",
            "text-[var(--type-body-sm-size)] leading-[var(--type-body-sm-line-height)]",
            "rounded-[var(--radius-sm)]",
            "shadow-[var(--elevation-2)]",
            "whitespace-normal break-words",
            "transition-[opacity,transform] duration-[var(--duration-fast)] ease-[var(--easing-enter)]",
            positionStyles[side],
            visible ? "opacity-100 translate-x-0 translate-y-0" : enterOrigin[side],
            // Override translate for top/bottom (keep the centering -translate-x-1/2)
            (side === "top" || side === "bottom") && visible && "!-translate-x-1/2",
            (side === "left" || side === "right") && visible && "!-translate-y-1/2"
          )}
        >
          {content}
        </span>
      )}
    </span>
  )
}
