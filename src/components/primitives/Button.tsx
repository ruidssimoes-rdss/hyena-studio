"use client"

import { Loader2 } from "lucide-react"
import { cn } from "@/lib/cn"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined" | "ghost" | "destructive" | "soft"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  fullWidth?: boolean
}

const variantStyles: Record<string, string> = {
  filled: [
    "bg-[var(--color-primary)] text-[var(--color-on-primary)]",
    "hover:bg-[var(--color-primary-hover)]",
    "active:bg-[var(--color-primary-active)] active:scale-[0.97]",
  ].join(" "),
  outlined: [
    "bg-transparent text-[var(--color-on-surface)]",
    "border border-[var(--color-outline)]",
    "hover:bg-[var(--color-surface-container)] hover:border-[var(--color-outline-hover)]",
    "active:bg-[var(--color-surface-container-high)] active:scale-[0.97]",
  ].join(" "),
  ghost: [
    "bg-transparent text-[var(--color-on-surface-muted)]",
    "hover:bg-[var(--color-surface-container)] hover:text-[var(--color-on-surface)]",
    "active:bg-[var(--color-surface-container-high)] active:scale-[0.97]",
  ].join(" "),
  destructive: [
    "bg-[var(--color-error)] text-[var(--color-on-error)]",
    "hover:brightness-110",
    "active:brightness-120 active:scale-[0.97]",
  ].join(" "),
  soft: [
    "bg-[var(--color-primary-soft)] text-[var(--color-primary)]",
    "hover:brightness-[0.97]",
    "active:brightness-[0.94] active:scale-[0.97]",
  ].join(" "),
}

const sizeStyles: Record<string, string> = {
  sm: "h-8 px-[var(--spacing-2)] gap-1.5 text-[var(--type-label-md-size)] font-[var(--type-label-md-weight)] rounded-[var(--radius-sm)]",
  md: "h-[38px] px-[var(--spacing-3)] gap-2 text-[var(--type-label-lg-size)] font-[var(--type-label-lg-weight)] rounded-[var(--radius-md)]",
  lg: "h-11 px-[var(--spacing-4)] gap-2.5 text-[var(--type-body-md-size)] font-[var(--type-label-lg-weight)] rounded-[var(--radius-md)]",
}

const iconSizes: Record<string, string> = {
  sm: "[&_svg]:size-3.5",
  md: "[&_svg]:size-4",
  lg: "[&_svg]:size-[18px]",
}

export function Button({
  variant = "filled",
  size = "md",
  loading = false,
  icon,
  iconRight,
  fullWidth = false,
  className,
  children,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      className={cn(
        // Base
        "inline-flex items-center justify-center whitespace-nowrap",
        "font-[var(--type-label-lg-weight)]",
        "tracking-[var(--type-label-lg-tracking)]",
        "transition-[background-color,border-color,color,transform,filter]",
        "duration-[var(--duration-fast)] ease-[var(--easing-standard)]",
        "select-none",
        // Focus
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]",
        // Disabled
        "disabled:opacity-45 disabled:pointer-events-none",
        // Variant + Size
        variantStyles[variant],
        sizeStyles[size],
        iconSizes[size],
        // Icon optical alignment: reduce padding on icon side by 2px
        icon && !iconRight && !loading && "pl-[calc(var(--spacing-2)-2px)]",
        iconRight && !icon && !loading && "pr-[calc(var(--spacing-2)-2px)]",
        // Width lock during loading
        loading && "pointer-events-none",
        fullWidth && "w-full",
        className
      )}
      disabled={isDisabled}
      style={style}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin" aria-hidden="true" />
          <span className="sr-only">Loading</span>
        </>
      ) : (
        <>
          {icon}
          {children}
          {iconRight}
        </>
      )}
    </button>
  )
}
