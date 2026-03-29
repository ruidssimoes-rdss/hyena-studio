"use client"

import { useCallback, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/cn"

export interface ModalProps {
  open: boolean
  onClose: () => void
  size?: "sm" | "md" | "lg"
  variant?: "default" | "destructive"
  title: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  closeOnScrim?: boolean
  closeOnEscape?: boolean
}

const sizeMap: Record<string, string> = {
  sm: "max-w-[400px]",
  md: "max-w-[520px]",
  lg: "max-w-[640px]",
}

export function Modal({
  open,
  onClose,
  size = "md",
  variant = "default",
  title,
  description,
  children,
  footer,
  closeOnScrim = true,
  closeOnEscape = true,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // Lock scroll + store previous focus
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement
      document.body.style.overflow = "hidden"
      // Focus first focusable element inside modal
      requestAnimationFrame(() => {
        const focusable = dialogRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        focusable?.focus()
      })
    } else {
      document.body.style.overflow = ""
      previousFocusRef.current?.focus()
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  // Escape key
  useEffect(() => {
    if (!open || !closeOnEscape) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, closeOnEscape, onClose])

  // Focus trap
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Tab") return
      const dialog = dialogRef.current
      if (!dialog) return

      const focusableEls = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusableEls.length === 0) return

      const first = focusableEls[0]
      const last = focusableEls[focusableEls.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    },
    []
  )

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onKeyDown={handleKeyDown}
    >
      {/* Scrim */}
      <div
        className={cn(
          "absolute inset-0 bg-[var(--color-scrim)]",
          "animate-[scrim-enter_200ms_ease-out_forwards]"
        )}
        onClick={closeOnScrim ? onClose : undefined}
        aria-hidden
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? "modal-description" : undefined}
        className={cn(
          "relative w-full rounded-[var(--radius-2xl)]",
          "bg-[var(--color-surface)] shadow-[var(--elevation-3)]",
          "animate-[modal-enter_350ms_var(--easing-enter)_forwards]",
          "flex flex-col max-h-[85vh]",
          sizeMap[size]
        )}
      >
        {/* Header */}
        <div
          className={cn(
            "flex items-start justify-between gap-3 p-[var(--spacing-5)]",
            variant === "destructive" && "bg-[var(--color-error-soft)] rounded-t-[var(--radius-2xl)]"
          )}
        >
          <div className="flex-1 min-w-0">
            <h2
              id="modal-title"
              className="text-[var(--type-heading-sm-size)] font-[var(--type-heading-sm-weight)] leading-[var(--type-heading-sm-line-height)] tracking-[var(--type-heading-sm-tracking)] text-[var(--color-on-surface)] text-wrap-balance"
            >
              {title}
            </h2>
            {description && (
              <p
                id="modal-description"
                className="mt-1 text-[var(--type-body-md-size)] leading-[var(--type-body-md-line-height)] text-[var(--color-on-surface-muted)]"
              >
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="shrink-0 p-1.5 rounded-[var(--radius-sm)] text-[var(--color-on-surface-subtle)] hover:text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container)] transition-colors duration-[var(--duration-fast)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-focus-ring)]"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Body (scrollable) */}
        <div className="flex-1 overflow-y-auto px-[var(--spacing-5)] pb-[var(--spacing-5)]">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-2 px-[var(--spacing-5)] py-[var(--spacing-3)] border-t border-[var(--color-outline-variant)]">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
