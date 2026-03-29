"use client"

import { useCallback, useRef, useState } from "react"
import {
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  XCircle,
} from "lucide-react"
import { cn } from "@/lib/cn"

export interface AlertProps {
  type?: "info" | "success" | "warning" | "error"
  variant?: "filled" | "soft" | "outlined"
  title?: string
  children: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  icon?: React.ReactNode | false
}

const defaultIcons: Record<string, React.ReactNode> = {
  info: <Info className="size-5 shrink-0" />,
  success: <CheckCircle className="size-5 shrink-0" />,
  warning: <AlertTriangle className="size-5 shrink-0" />,
  error: <XCircle className="size-5 shrink-0" />,
}

const typeColors = {
  info: {
    filled:
      "bg-[var(--color-primary)] text-[var(--color-on-primary)] [&_svg]:text-[var(--color-on-primary)]",
    soft: "bg-[var(--color-primary-soft)] text-[var(--color-on-surface)] [&_svg]:text-[var(--color-primary)]",
    outlined:
      "border border-[var(--color-primary)] text-[var(--color-on-surface)] [&_svg]:text-[var(--color-primary)]",
  },
  success: {
    filled:
      "bg-[var(--color-success)] text-[var(--color-on-success)] [&_svg]:text-[var(--color-on-success)]",
    soft: "bg-[var(--color-success-soft)] text-[var(--color-on-surface)] [&_svg]:text-[var(--color-success)]",
    outlined:
      "border border-[var(--color-success)] text-[var(--color-on-surface)] [&_svg]:text-[var(--color-success)]",
  },
  warning: {
    filled:
      "bg-[var(--color-warning)] text-[var(--color-on-warning)] [&_svg]:text-[var(--color-on-warning)]",
    soft: "bg-[var(--color-warning-soft)] text-[var(--color-on-surface)] [&_svg]:text-[var(--color-warning)]",
    outlined:
      "border border-[var(--color-warning)] text-[var(--color-on-surface)] [&_svg]:text-[var(--color-warning)]",
  },
  error: {
    filled:
      "bg-[var(--color-error)] text-[var(--color-on-error)] [&_svg]:text-[var(--color-on-error)]",
    soft: "bg-[var(--color-error-soft)] text-[var(--color-on-surface)] [&_svg]:text-[var(--color-error)]",
    outlined:
      "border border-[var(--color-error)] text-[var(--color-on-surface)] [&_svg]:text-[var(--color-error)]",
  },
}

export function Alert({
  type = "info",
  variant = "soft",
  title,
  children,
  dismissible = false,
  onDismiss,
  icon,
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false)
  const [collapsing, setCollapsing] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleDismiss = useCallback(() => {
    setCollapsing(true)
    // Animate height collapse
    const el = ref.current
    if (el) {
      el.style.height = `${el.offsetHeight}px`
      el.offsetHeight // force reflow
      el.style.height = "0px"
      el.style.opacity = "0"
      el.style.marginTop = "0px"
      el.style.marginBottom = "0px"
      el.style.paddingTop = "0px"
      el.style.paddingBottom = "0px"
    }
    setTimeout(() => {
      setDismissed(true)
      onDismiss?.()
    }, 200)
  }, [onDismiss])

  if (dismissed) return null

  const iconNode = icon === false ? null : icon || defaultIcons[type]

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        "flex items-start gap-3 p-[var(--spacing-3)] rounded-[var(--radius-md)]",
        "text-[var(--type-body-md-size)] leading-[var(--type-body-md-line-height)]",
        "overflow-hidden",
        collapsing
          ? "transition-[height,opacity,margin,padding] duration-200 ease-[var(--easing-exit)]"
          : "transition-none",
        typeColors[type][variant]
      )}
    >
      {iconNode}
      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-[var(--type-label-lg-weight)] mb-0.5 text-wrap-balance">
            {title}
          </p>
        )}
        <div className="text-[var(--type-body-sm-size)] leading-[var(--type-body-sm-line-height)] opacity-90">
          {children}
        </div>
      </div>
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="shrink-0 p-0.5 rounded-[var(--radius-sm)] opacity-60 hover:opacity-100 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-focus-ring)]"
          aria-label="Dismiss"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
