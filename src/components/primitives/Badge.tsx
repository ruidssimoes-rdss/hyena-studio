"use client"

import { cn } from "@/lib/cn"

export interface BadgeProps {
  variant?: "filled" | "soft" | "outlined" | "dot"
  color?: "default" | "primary" | "success" | "warning" | "error"
  size?: "sm" | "md"
  children?: React.ReactNode
}

const colorMap = {
  default: {
    filled: "bg-[var(--color-on-surface-muted)] text-[var(--color-surface)]",
    soft: "bg-[var(--color-surface-container-high)] text-[var(--color-on-surface)]",
    outlined: "border border-[var(--color-outline)] text-[var(--color-on-surface-muted)]",
    dot: "bg-[var(--color-on-surface-muted)]",
  },
  primary: {
    filled: "bg-[var(--color-primary)] text-[var(--color-on-primary)]",
    soft: "bg-[var(--color-primary-soft)] text-[var(--color-primary)]",
    outlined: "border border-[var(--color-primary)] text-[var(--color-primary)]",
    dot: "bg-[var(--color-primary)]",
  },
  success: {
    filled: "bg-[var(--color-success)] text-[var(--color-on-success)]",
    soft: "bg-[var(--color-success-soft)] text-[var(--color-success)]",
    outlined: "border border-[var(--color-success)] text-[var(--color-success)]",
    dot: "bg-[var(--color-success)]",
  },
  warning: {
    filled: "bg-[var(--color-warning)] text-[var(--color-on-warning)]",
    soft: "bg-[var(--color-warning-soft)] text-[var(--color-warning)]",
    outlined: "border border-[var(--color-warning)] text-[var(--color-warning)]",
    dot: "bg-[var(--color-warning)]",
  },
  error: {
    filled: "bg-[var(--color-error)] text-[var(--color-on-error)]",
    soft: "bg-[var(--color-error-soft)] text-[var(--color-error)]",
    outlined: "border border-[var(--color-error)] text-[var(--color-error)]",
    dot: "bg-[var(--color-error)]",
  },
}

export function Badge({
  variant = "filled",
  color = "default",
  size = "md",
  children,
}: BadgeProps) {
  if (variant === "dot") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5",
          "text-[var(--type-label-md-size)] font-[var(--type-label-md-weight)]",
          "leading-[var(--type-label-md-line-height)]",
          "text-[var(--color-on-surface)]"
        )}
        role="status"
      >
        <span
          className={cn(
            "shrink-0 rounded-full",
            size === "sm" ? "size-1.5" : "size-2",
            colorMap[color].dot
          )}
        />
        {children}
      </span>
    )
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--radius-full)]",
        "font-[var(--type-label-md-weight)] tabular-nums whitespace-nowrap",
        size === "sm" && "h-5 px-1.5 text-[11px]",
        size === "md" && "h-6 px-2 text-[var(--type-label-md-size)]",
        colorMap[color][variant]
      )}
    >
      {children}
    </span>
  )
}
