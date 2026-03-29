"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/cn"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  variant?: "outlined" | "filled"
  size?: "sm" | "md" | "lg"
  label?: string
  placeholder?: string
  helperText?: string
  error?: boolean | string
  disabled?: boolean
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  fullWidth?: boolean
}

const sizeStyles: Record<string, { trigger: string; text: string }> = {
  sm: {
    trigger: "h-[34px] px-[var(--spacing-2)] rounded-[var(--radius-sm)]",
    text: "text-[var(--type-body-sm-size)] leading-[var(--type-body-sm-line-height)]",
  },
  md: {
    trigger: "h-10 px-[var(--spacing-3)] rounded-[var(--radius-sm)]",
    text: "text-[var(--type-body-md-size)] leading-[var(--type-body-md-line-height)]",
  },
  lg: {
    trigger: "h-12 px-[var(--spacing-3)] rounded-[var(--radius-md)]",
    text: "text-[var(--type-body-lg-size)] leading-[var(--type-body-lg-line-height)]",
  },
}

export function Select({
  variant = "outlined",
  size = "md",
  label,
  placeholder = "Select…",
  helperText,
  error,
  disabled = false,
  options,
  value,
  onChange,
  fullWidth = false,
}: SelectProps) {
  const generatedId = useId()
  const inputId = label
    ? label.toLowerCase().replace(/\s+/g, "-")
    : generatedId
  const [open, setOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const hasError = error === true || typeof error === "string"
  const errorMessage = typeof error === "string" ? error : undefined

  const selectedOption = options.find((o) => o.value === value)
  const sizeConfig = sizeStyles[size]

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        listRef.current &&
        !listRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  // Scroll highlighted into view
  useEffect(() => {
    if (!open || highlightedIndex < 0) return
    const list = listRef.current
    if (!list) return
    const item = list.children[highlightedIndex] as HTMLElement | undefined
    item?.scrollIntoView({ block: "nearest" })
  }, [open, highlightedIndex])

  const handleSelect = useCallback(
    (val: string) => {
      onChange?.(val)
      setOpen(false)
      triggerRef.current?.focus()
    },
    [onChange]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        return
      }
      if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
        e.preventDefault()
        setOpen(true)
        setHighlightedIndex(0)
        return
      }
      if (!open) return

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setHighlightedIndex((i) => {
          let next = i + 1
          while (next < options.length && options[next].disabled) next++
          return next < options.length ? next : i
        })
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setHighlightedIndex((i) => {
          let next = i - 1
          while (next >= 0 && options[next].disabled) next--
          return next >= 0 ? next : i
        })
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        if (highlightedIndex >= 0 && !options[highlightedIndex].disabled) {
          handleSelect(options[highlightedIndex].value)
        }
      }
    },
    [open, highlightedIndex, options, handleSelect]
  )

  return (
    <div className={cn("flex flex-col gap-1.5 relative", fullWidth && "w-full")}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-[var(--type-label-md-size)] font-[var(--type-label-md-weight)] leading-[var(--type-label-md-line-height)] tracking-[var(--type-label-md-tracking)] text-[var(--color-on-surface)]"
        >
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        ref={triggerRef}
        id={inputId}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-invalid={hasError || undefined}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex items-center justify-between gap-2",
          "transition-[border-color,background-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--easing-standard)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]",
          "disabled:opacity-45 disabled:pointer-events-none",
          sizeConfig.trigger,
          sizeConfig.text,
          variant === "outlined" && [
            "border bg-transparent",
            hasError
              ? "border-[var(--color-error)]"
              : "border-[var(--color-outline)] hover:border-[var(--color-outline-hover)]",
          ],
          variant === "filled" && [
            "bg-[var(--color-surface-container)] border-0",
            hasError && "ring-1 ring-[var(--color-error)]",
          ]
        )}
      >
        <span
          className={cn(
            "truncate",
            selectedOption
              ? "text-[var(--color-on-surface)]"
              : "text-[var(--color-on-surface-faint)]"
          )}
        >
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-[var(--color-on-surface-subtle)]",
            "transition-transform duration-[var(--duration-fast)] ease-[var(--easing-standard)]",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <ul
          ref={listRef}
          role="listbox"
          className={cn(
            "absolute z-50 top-full left-0 right-0 mt-1",
            "max-h-60 overflow-auto",
            "bg-[var(--color-surface)] rounded-[var(--radius-md)]",
            "shadow-[var(--elevation-2)]",
            "border border-[var(--color-outline-variant)]",
            "py-1",
            "animate-in fade-in-0 zoom-in-95"
          )}
        >
          {options.map((option, i) => {
            const isSelected = option.value === value
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled || undefined}
                onMouseEnter={() => !option.disabled && setHighlightedIndex(i)}
                onClick={() => !option.disabled && handleSelect(option.value)}
                className={cn(
                  "flex items-center justify-between gap-2 px-[var(--spacing-3)] py-2 cursor-pointer",
                  sizeConfig.text,
                  option.disabled && "opacity-45 pointer-events-none",
                  isSelected && "bg-[var(--color-primary-soft)]",
                  !isSelected &&
                    i === highlightedIndex &&
                    "bg-[var(--color-surface-container)]",
                  "text-[var(--color-on-surface)]"
                )}
              >
                <span className="truncate">{option.label}</span>
                {isSelected && (
                  <Check className="size-4 shrink-0 text-[var(--color-primary)]" />
                )}
              </li>
            )
          })}
        </ul>
      )}

      {(errorMessage || helperText) && (
        <p
          className={cn(
            "text-[var(--type-body-sm-size)] leading-[var(--type-body-sm-line-height)]",
            hasError
              ? "text-[var(--color-error)]"
              : "text-[var(--color-on-surface-muted)]"
          )}
        >
          {errorMessage || helperText}
        </p>
      )}
    </div>
  )
}
