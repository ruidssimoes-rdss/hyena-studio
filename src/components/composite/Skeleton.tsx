"use client"

import { cn } from "@/lib/cn"

export interface SkeletonProps {
  variant?: "text" | "circular" | "rectangular"
  width?: string | number
  height?: string | number
  className?: string
}

export function Skeleton({
  variant = "text",
  width,
  height,
  className,
}: SkeletonProps) {
  const defaultDimensions = {
    text: { width: "100%", height: 14 },
    circular: { width: 40, height: 40 },
    rectangular: { width: "100%", height: 120 },
  }

  const defaults = defaultDimensions[variant]
  const w = width ?? defaults.width
  const h = height ?? defaults.height

  return (
    <div
      className={cn(
        "bg-[var(--color-surface-container-high)]",
        "animate-[skeleton-pulse_1.5s_ease-in-out_infinite]",
        variant === "text" && "rounded-[var(--radius-xs)]",
        variant === "circular" && "rounded-full",
        variant === "rectangular" && "rounded-[var(--radius-md)]",
        className
      )}
      style={{
        width: typeof w === "number" ? `${w}px` : w,
        height: typeof h === "number" ? `${h}px` : h,
      }}
    />
  )
}
