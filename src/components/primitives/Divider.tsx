"use client"

import { cn } from "@/lib/cn"

export interface DividerProps {
  variant?: "full" | "inset" | "middle"
  direction?: "horizontal" | "vertical"
  className?: string
}

export function Divider({
  variant = "full",
  direction = "horizontal",
  className,
}: DividerProps) {
  const isHorizontal = direction === "horizontal"

  return (
    <div
      role="separator"
      aria-orientation={direction}
      className={cn(
        "shrink-0 bg-[var(--color-outline-variant)]",
        isHorizontal ? "h-px w-full" : "w-px self-stretch",
        variant === "inset" && isHorizontal && "ml-[var(--spacing-3)]",
        variant === "inset" && !isHorizontal && "mt-[var(--spacing-3)]",
        variant === "middle" && isHorizontal && "mx-[var(--spacing-3)]",
        variant === "middle" && !isHorizontal && "my-[var(--spacing-3)]",
        className
      )}
    />
  )
}
