/**
 * Export system — generates self-contained component code, token files, and README.
 * All output is pure strings; no file-system access required.
 */

// ------------------------------------------------------------------ //
// Setup comment (top of every exported component file)                //
// ------------------------------------------------------------------ //

const SETUP_COMMENT = `// This component requires Hyena tokens.
// Add the CSS variables from your token export to your global CSS.
// Docs: hyena.studio/docs/setup
`

// ------------------------------------------------------------------ //
// cn.ts — always included                                             //
// ------------------------------------------------------------------ //

export const CN_SOURCE = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`

// ------------------------------------------------------------------ //
// Component source map                                                //
// ------------------------------------------------------------------ //

// Each component's source code, with imports rewritten for the export bundle:
// - @/lib/cn  →  ../lib/cn
// - lucide-react stays as-is (peer dep)

const COMPONENT_SOURCES: Record<string, string> = {}

// -- Primitives --

COMPONENT_SOURCES["Button"] = `${SETUP_COMMENT}
"use client"

import { Loader2 } from "lucide-react"
import { cn } from "../lib/cn"

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
        "inline-flex items-center justify-center whitespace-nowrap",
        "font-[var(--type-label-lg-weight)]",
        "tracking-[var(--type-label-lg-tracking)]",
        "transition-[background-color,border-color,color,transform,filter]",
        "duration-[var(--duration-fast)] ease-[var(--easing-standard)]",
        "select-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]",
        "disabled:opacity-45 disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        iconSizes[size],
        icon && !iconRight && !loading && "pl-[calc(var(--spacing-2)-2px)]",
        iconRight && !icon && !loading && "pr-[calc(var(--spacing-2)-2px)]",
        loading && "pointer-events-none",
        fullWidth && "w-full",
        className
      )}
      disabled={isDisabled}
      style={style}
      {...props}
    >
      {loading ? (
        <Loader2 className="animate-spin" />
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
`

COMPONENT_SOURCES["Input"] = `${SETUP_COMMENT}
"use client"

import { cn } from "../lib/cn"

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "outlined" | "filled"
  size?: "sm" | "md" | "lg"
  label?: string
  helperText?: string
  error?: boolean | string
  icon?: React.ReactNode
  iconRight?: React.ReactNode
  fullWidth?: boolean
}

const sizeStyles: Record<string, { wrapper: string; input: string; icon: string }> = {
  sm: {
    wrapper: "h-[34px] rounded-[var(--radius-sm)]",
    input: "px-[var(--spacing-2)] text-[var(--type-body-sm-size)] leading-[var(--type-body-sm-line-height)]",
    icon: "[&_svg]:size-3.5",
  },
  md: {
    wrapper: "h-10 rounded-[var(--radius-sm)]",
    input: "px-[var(--spacing-3)] text-[var(--type-body-md-size)] leading-[var(--type-body-md-line-height)]",
    icon: "[&_svg]:size-4",
  },
  lg: {
    wrapper: "h-12 rounded-[var(--radius-md)]",
    input: "px-[var(--spacing-3)] text-[var(--type-body-lg-size)] leading-[var(--type-body-lg-line-height)]",
    icon: "[&_svg]:size-[18px]",
  },
}

export function Input({
  variant = "outlined",
  size = "md",
  label,
  helperText,
  error,
  icon,
  iconRight,
  fullWidth = false,
  className,
  id,
  disabled,
  readOnly,
  ...props
}: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\\s+/g, "-") : undefined)
  const hasError = error === true || typeof error === "string"
  const errorMessage = typeof error === "string" ? error : undefined
  const sizeConfig = sizeStyles[size]

  return (
    <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full", className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-[var(--type-label-md-size)] font-[var(--type-label-md-weight)] leading-[var(--type-label-md-line-height)] tracking-[var(--type-label-md-tracking)] text-[var(--color-on-surface)]"
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          "relative flex items-center",
          "transition-[border-color,background-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--easing-standard)]",
          sizeConfig.wrapper,
          sizeConfig.icon,
          variant === "outlined" && [
            "border bg-transparent",
            hasError
              ? "border-[var(--color-error)]"
              : "border-[var(--color-outline)] hover:border-[var(--color-outline-hover)]",
            "focus-within:border-[var(--color-primary)] focus-within:shadow-[0_0_0_2px_var(--color-focus-ring)]",
          ],
          variant === "filled" && [
            "bg-[var(--color-surface-container)] border-0",
            hasError && "ring-1 ring-[var(--color-error)]",
            "focus-within:bg-[var(--color-surface)] focus-within:ring-1 focus-within:ring-[var(--color-primary)] focus-within:shadow-[0_0_0_2px_var(--color-focus-ring)]",
          ],
          readOnly && variant === "outlined" && "border-dashed",
          readOnly && variant === "filled" && "opacity-75",
          disabled && "opacity-45 pointer-events-none"
        )}
      >
        {icon && (
          <span className="pl-[var(--spacing-2)] text-[var(--color-on-surface-subtle)] shrink-0">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={hasError || undefined}
          aria-describedby={
            errorMessage
              ? \`\${inputId}-error\`
              : helperText
                ? \`\${inputId}-helper\`
                : undefined
          }
          className={cn(
            "flex-1 min-w-0 bg-transparent outline-none",
            "text-[var(--color-on-surface)]",
            "placeholder:text-[var(--color-on-surface-faint)]",
            sizeConfig.input,
            icon && "pl-2",
            iconRight && "pr-2"
          )}
          {...props}
        />
        {iconRight && (
          <span className="pr-[var(--spacing-2)] text-[var(--color-on-surface-subtle)] shrink-0">
            {iconRight}
          </span>
        )}
      </div>
      {(errorMessage || helperText) && (
        <p
          id={errorMessage ? \`\${inputId}-error\` : \`\${inputId}-helper\`}
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
`

COMPONENT_SOURCES["Badge"] = `${SETUP_COMMENT}
"use client"

import { cn } from "../lib/cn"

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
`

COMPONENT_SOURCES["Toggle"] = `${SETUP_COMMENT}
"use client"

import { useCallback, useId, useState } from "react"
import { cn } from "../lib/cn"

export interface ToggleProps {
  size?: "sm" | "md"
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
  id?: string
}

const trackSizes: Record<string, string> = { sm: "w-9 h-5", md: "w-11 h-6" }
const thumbSizes: Record<string, string> = { sm: "size-4", md: "size-5" }
const thumbTranslate: Record<string, string> = { sm: "translate-x-4", md: "translate-x-5" }

export function Toggle({
  size = "md",
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  label,
  id: providedId,
}: ToggleProps) {
  const generatedId = useId()
  const inputId = providedId || generatedId
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const isControlled = controlledChecked !== undefined
  const isChecked = isControlled ? controlledChecked : internalChecked

  const handleChange = useCallback(() => {
    if (disabled) return
    const next = !isChecked
    if (!isControlled) setInternalChecked(next)
    onChange?.(next)
  }, [disabled, isChecked, isControlled, onChange])

  return (
    <div className="inline-flex items-center gap-2">
      <button
        id={inputId}
        role="switch"
        type="button"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleChange}
        className={cn(
          "relative inline-flex shrink-0 cursor-pointer items-center rounded-full",
          "transition-colors duration-[var(--duration-normal)] ease-[var(--easing-standard)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]",
          "disabled:opacity-45 disabled:pointer-events-none",
          trackSizes[size],
          isChecked ? "bg-[var(--color-primary)]" : "bg-[var(--color-on-surface-faint)]"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block rounded-full bg-white shadow-sm",
            "transition-transform duration-200 ease-[var(--easing-spring)]",
            "translate-x-0.5",
            thumbSizes[size],
            isChecked && thumbTranslate[size]
          )}
        />
      </button>
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            "text-[var(--type-label-lg-size)] font-[var(--type-label-lg-weight)]",
            "leading-[var(--type-label-lg-line-height)]",
            "text-[var(--color-on-surface)] cursor-pointer select-none",
            disabled && "opacity-45 pointer-events-none"
          )}
        >
          {label}
        </label>
      )}
    </div>
  )
}
`

COMPONENT_SOURCES["Select"] = `${SETUP_COMMENT}
"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "../lib/cn"

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
  placeholder = "Select\\u2026",
  helperText,
  error,
  disabled = false,
  options,
  value,
  onChange,
  fullWidth = false,
}: SelectProps) {
  const generatedId = useId()
  const inputId = label ? label.toLowerCase().replace(/\\s+/g, "-") : generatedId
  const [open, setOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const hasError = error === true || typeof error === "string"
  const errorMessage = typeof error === "string" ? error : undefined
  const selectedOption = options.find((o) => o.value === value)
  const sizeConfig = sizeStyles[size]

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
        listRef.current && !listRef.current.contains(e.target as Node)
      ) { setOpen(false) }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  useEffect(() => {
    if (!open || highlightedIndex < 0) return
    const list = listRef.current
    if (!list) return
    const item = list.children[highlightedIndex] as HTMLElement | undefined
    item?.scrollIntoView({ block: "nearest" })
  }, [open, highlightedIndex])

  const handleSelect = useCallback((val: string) => {
    onChange?.(val)
    setOpen(false)
    triggerRef.current?.focus()
  }, [onChange])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") { setOpen(false); return }
    if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
      e.preventDefault(); setOpen(true); setHighlightedIndex(0); return
    }
    if (!open) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightedIndex((i) => { let n = i + 1; while (n < options.length && options[n].disabled) n++; return n < options.length ? n : i })
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightedIndex((i) => { let n = i - 1; while (n >= 0 && options[n].disabled) n--; return n >= 0 ? n : i })
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      if (highlightedIndex >= 0 && !options[highlightedIndex].disabled) handleSelect(options[highlightedIndex].value)
    }
  }, [open, highlightedIndex, options, handleSelect])

  return (
    <div className={cn("flex flex-col gap-1.5 relative", fullWidth && "w-full")}>
      {label && (
        <label htmlFor={inputId} className="text-[var(--type-label-md-size)] font-[var(--type-label-md-weight)] leading-[var(--type-label-md-line-height)] tracking-[var(--type-label-md-tracking)] text-[var(--color-on-surface)]">
          {label}
        </label>
      )}
      <button
        ref={triggerRef} id={inputId} type="button" role="combobox"
        aria-expanded={open} aria-haspopup="listbox" aria-invalid={hasError || undefined}
        disabled={disabled} onKeyDown={handleKeyDown} onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex items-center justify-between gap-2",
          "transition-[border-color,background-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--easing-standard)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]",
          "disabled:opacity-45 disabled:pointer-events-none",
          sizeConfig.trigger, sizeConfig.text,
          variant === "outlined" && ["border bg-transparent", hasError ? "border-[var(--color-error)]" : "border-[var(--color-outline)] hover:border-[var(--color-outline-hover)]"],
          variant === "filled" && ["bg-[var(--color-surface-container)] border-0", hasError && "ring-1 ring-[var(--color-error)]"]
        )}
      >
        <span className={cn("truncate", selectedOption ? "text-[var(--color-on-surface)]" : "text-[var(--color-on-surface-faint)]")}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown className={cn("size-4 shrink-0 text-[var(--color-on-surface-subtle)]", "transition-transform duration-[var(--duration-fast)]", open && "rotate-180")} />
      </button>
      {open && (
        <ul ref={listRef} role="listbox" className={cn("absolute z-50 top-full left-0 right-0 mt-1 max-h-60 overflow-auto", "bg-[var(--color-surface)] rounded-[var(--radius-md)] shadow-[var(--elevation-2)] border border-[var(--color-outline-variant)] py-1")}>
          {options.map((option, i) => (
            <li key={option.value} role="option" aria-selected={option.value === value} aria-disabled={option.disabled || undefined}
              onMouseEnter={() => !option.disabled && setHighlightedIndex(i)}
              onClick={() => !option.disabled && handleSelect(option.value)}
              className={cn("flex items-center justify-between gap-2 px-[var(--spacing-3)] py-2 cursor-pointer", sizeConfig.text, option.disabled && "opacity-45 pointer-events-none", option.value === value && "bg-[var(--color-primary-soft)]", option.value !== value && i === highlightedIndex && "bg-[var(--color-surface-container)]", "text-[var(--color-on-surface)]")}
            >
              <span className="truncate">{option.label}</span>
              {option.value === value && <Check className="size-4 shrink-0 text-[var(--color-primary)]" />}
            </li>
          ))}
        </ul>
      )}
      {(errorMessage || helperText) && (
        <p className={cn("text-[var(--type-body-sm-size)] leading-[var(--type-body-sm-line-height)]", hasError ? "text-[var(--color-error)]" : "text-[var(--color-on-surface-muted)]")}>
          {errorMessage || helperText}
        </p>
      )}
    </div>
  )
}
`

COMPONENT_SOURCES["Tooltip"] = `${SETUP_COMMENT}
"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "../lib/cn"

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

export function Tooltip({ content, side = "top", delay = 300, children }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = useCallback(() => {
    timerRef.current = setTimeout(() => {
      setMounted(true)
      requestAnimationFrame(() => setVisible(true))
    }, delay)
  }, [delay])

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setVisible(false)
    setTimeout(() => setMounted(false), 100)
  }, [])

  useEffect(() => { return () => { if (timerRef.current) clearTimeout(timerRef.current) } }, [])

  return (
    <span className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {children}
      {mounted && (
        <span role="tooltip" className={cn(
          "absolute z-50 pointer-events-none max-w-60 px-2.5 py-1.5",
          "bg-[var(--color-surface-container-high)] text-[var(--color-on-surface)]",
          "text-[var(--type-body-sm-size)] leading-[var(--type-body-sm-line-height)]",
          "rounded-[var(--radius-sm)] shadow-[var(--elevation-2)] whitespace-normal break-words",
          "transition-[opacity,transform] duration-[var(--duration-fast)] ease-[var(--easing-enter)]",
          positionStyles[side],
          visible ? "opacity-100 translate-x-0 translate-y-0" : enterOrigin[side],
          (side === "top" || side === "bottom") && visible && "!-translate-x-1/2",
          (side === "left" || side === "right") && visible && "!-translate-y-1/2"
        )}>
          {content}
        </span>
      )}
    </span>
  )
}
`

COMPONENT_SOURCES["Divider"] = `${SETUP_COMMENT}
"use client"

import { cn } from "../lib/cn"

export interface DividerProps {
  variant?: "full" | "inset" | "middle"
  direction?: "horizontal" | "vertical"
  className?: string
}

export function Divider({ variant = "full", direction = "horizontal", className }: DividerProps) {
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
`

// -- Composites --

COMPONENT_SOURCES["Card"] = `${SETUP_COMMENT}
"use client"

import { createContext, useContext } from "react"
import { cn } from "../lib/cn"

interface CardContextValue { variant: "elevated" | "outlined" | "filled" }
const CardContext = createContext<CardContextValue>({ variant: "elevated" })

export interface CardProps {
  variant?: "elevated" | "outlined" | "filled"
  interactive?: boolean
  selected?: boolean
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

function CardRoot({ variant = "elevated", interactive = false, selected = false, onClick, children, className }: CardProps) {
  const Tag = interactive || onClick ? "button" : "div"
  return (
    <CardContext.Provider value={{ variant }}>
      <Tag
        onClick={onClick}
        className={cn(
          "rounded-[var(--radius-xl)] p-[var(--density-padding)] text-left w-full",
          "transition-[background-color,box-shadow,border-color,transform] duration-[var(--duration-fast)] ease-[var(--easing-standard)]",
          "[--card-inner-radius:calc(var(--radius-xl)-var(--density-padding))]",
          variant === "elevated" && ["bg-[var(--color-surface)] shadow-[var(--elevation-1)]", (interactive || onClick) && "hover:shadow-[var(--elevation-2)]"],
          variant === "outlined" && ["bg-[var(--color-surface)] border border-[var(--color-outline-variant)]", (interactive || onClick) && "hover:border-[var(--color-outline-hover)]"],
          variant === "filled" && ["bg-[var(--color-surface-container)]", (interactive || onClick) && "hover:bg-[var(--color-surface-container-high)]"],
          selected && "ring-2 ring-[var(--color-primary)]",
          (interactive || onClick) && ["cursor-pointer", "active:scale-[0.98]", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"],
          className
        )}
      >
        {children}
      </Tag>
    </CardContext.Provider>
  )
}

function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex items-start justify-between gap-3 mb-3 rounded-[var(--card-inner-radius)]", className)}>{children}</div>
}

function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-[var(--card-inner-radius)]", className)}>{children}</div>
}

function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex items-center justify-end gap-2 mt-4 pt-3 border-t border-[var(--color-outline-variant)] rounded-b-[var(--card-inner-radius)]", className)}>{children}</div>
}

export const Card = Object.assign(CardRoot, { Header: CardHeader, Body: CardBody, Footer: CardFooter })
`

COMPONENT_SOURCES["Alert"] = `${SETUP_COMMENT}
"use client"

import { useCallback, useRef, useState } from "react"
import { AlertTriangle, CheckCircle, Info, X, XCircle } from "lucide-react"
import { cn } from "../lib/cn"

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
    filled: "bg-[var(--color-primary)] text-[var(--color-on-primary)] [&_svg]:text-[var(--color-on-primary)]",
    soft: "bg-[var(--color-primary-soft)] text-[var(--color-on-surface)] [&_svg]:text-[var(--color-primary)]",
    outlined: "border border-[var(--color-primary)] text-[var(--color-on-surface)] [&_svg]:text-[var(--color-primary)]",
  },
  success: {
    filled: "bg-[var(--color-success)] text-[var(--color-on-success)] [&_svg]:text-[var(--color-on-success)]",
    soft: "bg-[var(--color-success-soft)] text-[var(--color-on-surface)] [&_svg]:text-[var(--color-success)]",
    outlined: "border border-[var(--color-success)] text-[var(--color-on-surface)] [&_svg]:text-[var(--color-success)]",
  },
  warning: {
    filled: "bg-[var(--color-warning)] text-[var(--color-on-warning)] [&_svg]:text-[var(--color-on-warning)]",
    soft: "bg-[var(--color-warning-soft)] text-[var(--color-on-surface)] [&_svg]:text-[var(--color-warning)]",
    outlined: "border border-[var(--color-warning)] text-[var(--color-on-surface)] [&_svg]:text-[var(--color-warning)]",
  },
  error: {
    filled: "bg-[var(--color-error)] text-[var(--color-on-error)] [&_svg]:text-[var(--color-on-error)]",
    soft: "bg-[var(--color-error-soft)] text-[var(--color-on-surface)] [&_svg]:text-[var(--color-error)]",
    outlined: "border border-[var(--color-error)] text-[var(--color-on-surface)] [&_svg]:text-[var(--color-error)]",
  },
}

export function Alert({ type = "info", variant = "soft", title, children, dismissible = false, onDismiss, icon }: AlertProps) {
  const [dismissed, setDismissed] = useState(false)
  const [collapsing, setCollapsing] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleDismiss = useCallback(() => {
    setCollapsing(true)
    const el = ref.current
    if (el) {
      el.style.height = \`\${el.offsetHeight}px\`
      el.offsetHeight
      el.style.height = "0px"
      el.style.opacity = "0"
      el.style.marginTop = "0px"
      el.style.marginBottom = "0px"
      el.style.paddingTop = "0px"
      el.style.paddingBottom = "0px"
    }
    setTimeout(() => { setDismissed(true); onDismiss?.() }, 200)
  }, [onDismiss])

  if (dismissed) return null
  const iconNode = icon === false ? null : icon || defaultIcons[type]

  return (
    <div ref={ref} role="alert" className={cn(
      "flex items-start gap-3 p-[var(--spacing-3)] rounded-[var(--radius-md)]",
      "text-[var(--type-body-md-size)] leading-[var(--type-body-md-line-height)] overflow-hidden",
      collapsing ? "transition-[height,opacity,margin,padding] duration-200 ease-[var(--easing-exit)]" : "transition-none",
      typeColors[type][variant]
    )}>
      {iconNode}
      <div className="flex-1 min-w-0">
        {title && <p className="font-[var(--type-label-lg-weight)] mb-0.5 text-wrap-balance">{title}</p>}
        <div className="text-[var(--type-body-sm-size)] leading-[var(--type-body-sm-line-height)] opacity-90">{children}</div>
      </div>
      {dismissible && (
        <button onClick={handleDismiss} className="shrink-0 p-0.5 rounded-[var(--radius-sm)] opacity-60 hover:opacity-100 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-focus-ring)]" aria-label="Dismiss">
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
`

COMPONENT_SOURCES["Skeleton"] = `${SETUP_COMMENT}
"use client"

import { cn } from "../lib/cn"

export interface SkeletonProps {
  variant?: "text" | "circular" | "rectangular"
  width?: string | number
  height?: string | number
  className?: string
}

export function Skeleton({ variant = "text", width, height, className }: SkeletonProps) {
  const defaults = {
    text: { width: "100%", height: 14 },
    circular: { width: 40, height: 40 },
    rectangular: { width: "100%", height: 120 },
  }
  const d = defaults[variant]
  const w = width ?? d.width
  const h = height ?? d.height

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
      style={{ width: typeof w === "number" ? \`\${w}px\` : w, height: typeof h === "number" ? \`\${h}px\` : h }}
    />
  )
}
`

COMPONENT_SOURCES["Modal"] = `${SETUP_COMMENT}
"use client"

import { useCallback, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { cn } from "../lib/cn"

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

const sizeMap: Record<string, string> = { sm: "max-w-[400px]", md: "max-w-[520px]", lg: "max-w-[640px]" }

export function Modal({ open, onClose, size = "md", variant = "default", title, description, children, footer, closeOnScrim = true, closeOnEscape = true }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement
      document.body.style.overflow = "hidden"
      requestAnimationFrame(() => {
        dialogRef.current?.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')?.focus()
      })
    } else {
      document.body.style.overflow = ""
      previousFocusRef.current?.focus()
    }
    return () => { document.body.style.overflow = "" }
  }, [open])

  useEffect(() => {
    if (!open || !closeOnEscape) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, closeOnEscape, onClose])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return
    const dialog = dialogRef.current
    if (!dialog) return
    const els = dialog.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    if (els.length === 0) return
    const first = els[0], last = els[els.length - 1]
    if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus() } }
    else { if (document.activeElement === last) { e.preventDefault(); first.focus() } }
  }, [])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onKeyDown={handleKeyDown}>
      <div className={cn("absolute inset-0 bg-[var(--color-scrim)]", "animate-[scrim-enter_200ms_ease-out_forwards]")} onClick={closeOnScrim ? onClose : undefined} aria-hidden />
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby={description ? "modal-description" : undefined}
        className={cn("relative w-full rounded-[var(--radius-2xl)] bg-[var(--color-surface)] shadow-[var(--elevation-3)]", "animate-[modal-enter_350ms_var(--easing-enter)_forwards] flex flex-col max-h-[85vh]", sizeMap[size])}
      >
        <div className={cn("flex items-start justify-between gap-3 p-[var(--spacing-5)]", variant === "destructive" && "bg-[var(--color-error-soft)] rounded-t-[var(--radius-2xl)]")}>
          <div className="flex-1 min-w-0">
            <h2 id="modal-title" className="text-[var(--type-heading-sm-size)] font-[var(--type-heading-sm-weight)] leading-[var(--type-heading-sm-line-height)] tracking-[var(--type-heading-sm-tracking)] text-[var(--color-on-surface)] text-wrap-balance">{title}</h2>
            {description && <p id="modal-description" className="mt-1 text-[var(--type-body-md-size)] leading-[var(--type-body-md-line-height)] text-[var(--color-on-surface-muted)]">{description}</p>}
          </div>
          <button onClick={onClose} className="shrink-0 p-1.5 rounded-[var(--radius-sm)] text-[var(--color-on-surface-subtle)] hover:text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container)] transition-colors duration-[var(--duration-fast)] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-focus-ring)]" aria-label="Close">
            <X className="size-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-[var(--spacing-5)] pb-[var(--spacing-5)]">{children}</div>
        {footer && <div className="flex items-center justify-end gap-2 px-[var(--spacing-5)] py-[var(--spacing-3)] border-t border-[var(--color-outline-variant)]">{footer}</div>}
      </div>
    </div>
  )
}
`

COMPONENT_SOURCES["Navbar"] = `${SETUP_COMMENT}
"use client"

import { cn } from "../lib/cn"

export interface NavbarProps {
  variant?: "solid" | "glass"
  size?: "default" | "compact"
  brand?: React.ReactNode
  children?: React.ReactNode
  actions?: React.ReactNode
  sticky?: boolean
  maxWidth?: string
}

export function Navbar({ variant = "solid", size = "default", brand, children, actions, sticky = false, maxWidth }: NavbarProps) {
  return (
    <nav className={cn(
      "w-full flex items-center",
      "transition-[background-color,backdrop-filter,border-color] duration-[var(--duration-fast)] ease-[var(--easing-standard)]",
      size === "default" ? "h-14" : "h-12",
      variant === "solid" && ["bg-[var(--color-surface)]", "border-b border-[var(--color-outline-variant)]"],
      variant === "glass" && ["bg-[var(--color-surface)]/80 backdrop-blur-xl", "border-b border-[var(--color-outline-variant)]/50"],
      sticky && "sticky top-0 z-40"
    )}>
      <div className="flex items-center justify-between w-full px-[var(--spacing-4)]" style={maxWidth ? { maxWidth, margin: "0 auto" } : undefined}>
        {brand && <div className="shrink-0 mr-[var(--spacing-5)]">{brand}</div>}
        {children && <div className="flex items-center gap-1 flex-1">{children}</div>}
        {actions && <div className="flex items-center gap-2 shrink-0 ml-[var(--spacing-3)]">{actions}</div>}
      </div>
    </nav>
  )
}

export interface NavLinkProps {
  href?: string
  active?: boolean
  icon?: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
}

export function NavLink({ href, active = false, icon, children, onClick }: NavLinkProps) {
  const Tag = href ? "a" : "button"
  return (
    <Tag href={href} onClick={onClick} className={cn(
      "relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)]",
      "text-[var(--type-label-lg-size)] font-[var(--type-label-lg-weight)] leading-[var(--type-label-lg-line-height)]",
      "transition-[color,background-color] duration-[var(--duration-fast)] ease-[var(--easing-standard)]",
      "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-focus-ring)]",
      "[&_svg]:size-4",
      icon && "pl-[calc(0.75rem-2px)]",
      active ? "text-[var(--color-on-surface)] bg-[var(--color-surface-container)]" : "text-[var(--color-on-surface-muted)] hover:text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container)]"
    )}>
      {icon}
      {children}
      {active && <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[var(--color-primary)] rounded-full" />}
    </Tag>
  )
}
`

COMPONENT_SOURCES["Table"] = `${SETUP_COMMENT}
"use client"

import { useCallback, useState } from "react"
import { ArrowDown, ArrowUp, Check } from "lucide-react"
import { cn } from "../lib/cn"

export interface TableColumn {
  key: string
  label: string
  width?: string
  align?: "left" | "center" | "right"
  sortable?: boolean
}

export interface TableProps {
  variant?: "default" | "striped" | "bordered"
  columns: TableColumn[]
  data: Array<Record<string, React.ReactNode>>
  selectable?: boolean
  selectedRows?: string[]
  onSelectRow?: (id: string) => void
  onSort?: (key: string, direction: "asc" | "desc") => void
  emptyMessage?: string
  density?: "compact" | "comfortable" | "spacious"
}

function getDensityVars(density: string): Record<string, string> {
  switch (density) {
    case "compact": return { "--table-row-height": "36px", "--table-cell-pad-h": "12px", "--table-cell-pad-v": "8px", "--table-font": "12px" }
    case "spacious": return { "--table-row-height": "52px", "--table-cell-pad-h": "20px", "--table-cell-pad-v": "16px", "--table-font": "14px" }
    default: return { "--table-row-height": "44px", "--table-cell-pad-h": "16px", "--table-cell-pad-v": "12px", "--table-font": "14px" }
  }
}

const ds = {
  row: "h-[var(--table-row-height)]",
  cellPad: "px-[var(--table-cell-pad-h)] py-[var(--table-cell-pad-v)]",
  headerText: "text-[11px] font-medium leading-[1.3] tracking-wider",
}

export function Table({ variant = "default", columns, data, selectable = false, selectedRows = [], onSelectRow, onSort, emptyMessage = "No data", density = "comfortable" }: TableProps) {
  const densityVars = getDensityVars(density)
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")

  const handleSort = useCallback((key: string) => {
    const nextDir = sortKey === key && sortDir === "asc" ? "desc" : "asc"
    setSortKey(key); setSortDir(nextDir); onSort?.(key, nextDir)
  }, [sortKey, sortDir, onSort])

  return (
    <div className="w-full overflow-x-auto rounded-[var(--card-inner-radius,8px)]" style={densityVars as React.CSSProperties}>
      <table className="w-full border-collapse text-[var(--table-font,14px)]">
        <thead>
          <tr className="bg-[var(--color-surface-container-high)]">
            {selectable && <th className={cn("w-10", ds.cellPad)} />}
            {columns.map((col) => (
              <th key={col.key} className={cn(ds.cellPad, ds.headerText, "text-[var(--color-on-surface-muted)] uppercase sticky top-0 bg-[var(--color-surface-container-high)]",
                col.align === "right" && "text-right", col.align === "center" && "text-center", !col.align && "text-left",
                col.sortable && "cursor-pointer select-none hover:text-[var(--color-on-surface)]",
                variant === "bordered" && "border border-[var(--color-outline-variant)]"
              )} style={col.width ? { width: col.width, minWidth: "60px" } : { minWidth: "60px" }} onClick={col.sortable ? () => handleSort(col.key) : undefined}>
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  {col.sortable && sortKey === col.key && (sortDir === "asc" ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />)}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr><td colSpan={columns.length + (selectable ? 1 : 0)} className={cn(ds.cellPad, "text-center text-[var(--color-on-surface-muted)] py-8")}>{emptyMessage}</td></tr>
          ) : data.map((row, i) => {
            const rowId = (row.id as string) || String(i)
            const isSelected = selectedRows.includes(rowId)
            return (
              <tr key={rowId} className={cn(ds.row, "transition-colors duration-150",
                variant === "striped" && i % 2 === 1 && "bg-[var(--color-surface-container)]",
                isSelected ? "bg-[var(--color-primary-soft)]" : "hover:bg-[var(--color-surface-container)]",
                variant !== "bordered" && "border-b border-[var(--color-outline-variant)]"
              )}>
                {selectable && (
                  <td className={cn("w-10", ds.cellPad)}>
                    <button onClick={() => onSelectRow?.(rowId)} className={cn("size-4 rounded-sm border flex items-center justify-center transition-colors",
                      "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-focus-ring)]",
                      isSelected ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-[var(--color-on-primary)]" : "border-[var(--color-outline)] hover:border-[var(--color-outline-hover)]"
                    )} aria-label={\`Select row \${rowId}\`}>
                      {isSelected && <Check className="size-3" />}
                    </button>
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className={cn(ds.cellPad, "text-[var(--color-on-surface)]",
                    col.align === "right" && "text-right tabular-nums",
                    col.align === "center" && "text-center",
                    variant === "bordered" && "border border-[var(--color-outline-variant)]"
                  )}>
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
`

// ------------------------------------------------------------------ //
// Barrel index                                                        //
// ------------------------------------------------------------------ //

export const INDEX_SOURCE = `// Primitives
export { Button, type ButtonProps } from "./Button"
export { Input, type InputProps } from "./Input"
export { Badge, type BadgeProps } from "./Badge"
export { Toggle, type ToggleProps } from "./Toggle"
export { Select, type SelectProps, type SelectOption } from "./Select"
export { Tooltip, type TooltipProps } from "./Tooltip"
export { Divider, type DividerProps } from "./Divider"

// Composites
export { Card, type CardProps } from "./Card"
export { Alert, type AlertProps } from "./Alert"
export { Skeleton, type SkeletonProps } from "./Skeleton"
export { Modal, type ModalProps } from "./Modal"
export { Navbar, type NavbarProps, NavLink, type NavLinkProps } from "./Navbar"
export { Table, type TableColumn, type TableProps } from "./Table"
`

// ------------------------------------------------------------------ //
// Public API                                                          //
// ------------------------------------------------------------------ //

export function getComponentSource(name: string): string | undefined {
  return COMPONENT_SOURCES[name]
}

export function getAllComponentNames(): string[] {
  return Object.keys(COMPONENT_SOURCES)
}

export function getAllComponentSources(): Record<string, string> {
  return { ...COMPONENT_SOURCES }
}

// ------------------------------------------------------------------ //
// Token export generators                                             //
// ------------------------------------------------------------------ //

export function generateCssTokens(cssVars: Record<string, string>): string {
  const lines = Object.entries(cssVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n")
  return `:root {\n${lines}\n}`
}

export function generateTailwindConfig(cssVars: Record<string, string>): string {
  const colors: Record<string, string> = {}
  const spacing: Record<string, string> = {}
  const borderRadius: Record<string, string> = {}
  const fontSize: Record<string, string> = {}

  for (const [key] of Object.entries(cssVars)) {
    if (key.startsWith("--color-")) {
      colors[key.replace("--color-", "")] = `var(${key})`
    } else if (key.startsWith("--spacing-") && key !== "--spacing-base") {
      spacing[key.replace("--spacing-", "")] = `var(${key})`
    } else if (key.startsWith("--radius-")) {
      borderRadius[key.replace("--radius-", "")] = `var(${key})`
    } else if (key.startsWith("--type-") && key.endsWith("-size")) {
      fontSize[key.replace("--type-", "").replace("-size", "")] = `var(${key})`
    }
  }

  return `import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: ${JSON.stringify(colors, null, 8).replace(/^/gm, "      ").trim()},
      spacing: ${JSON.stringify(spacing, null, 8).replace(/^/gm, "      ").trim()},
      borderRadius: ${JSON.stringify(borderRadius, null, 8).replace(/^/gm, "      ").trim()},
      fontSize: ${JSON.stringify(fontSize, null, 8).replace(/^/gm, "      ").trim()},
    },
  },
  plugins: [],
}

export default config
`
}

export function generateJsonTokens(cssVars: Record<string, string>): string {
  return JSON.stringify(cssVars, null, 2)
}

// ------------------------------------------------------------------ //
// CSS keyframes (needed in the consuming project's globals.css)       //
// ------------------------------------------------------------------ //

const KEYFRAMES = `
@keyframes skeleton-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

@keyframes scrim-enter {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modal-enter {
  from { opacity: 0; transform: scale(0.95); filter: blur(4px); }
  to { opacity: 1; transform: scale(1); filter: blur(0); }
}
`

export function generateTokensCss(cssVars: Record<string, string>): string {
  return `${generateCssTokens(cssVars)}\n${KEYFRAMES}`
}

// ------------------------------------------------------------------ //
// README generator                                                    //
// ------------------------------------------------------------------ //

export function generateReadme(): string {
  return `# Hyena Components

Exported from [Hyena Studio](https://hyena.studio) — a design system that thinks.

## Setup

### 1. Install dependencies

\`\`\`bash
npm install clsx tailwind-merge lucide-react
\`\`\`

### 2. Add fonts

Add DM Sans and DM Mono to your project. Self-host or use Google Fonts:

\`\`\`html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
\`\`\`

Or set \`font-family\` in your CSS:

\`\`\`css
body {
  font-family: "DM Sans", system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}
\`\`\`

### 3. Add tokens to your global CSS

Copy the contents of \`tokens.css\` into your \`globals.css\` (or import it).
This file contains all CSS custom properties and required keyframes.

### 4. Use components

\`\`\`tsx
import { Button, Card, Input } from "./components"

export default function Page() {
  return (
    <Card variant="elevated">
      <Card.Header>
        <h3>Create Project</h3>
      </Card.Header>
      <Card.Body>
        <Input label="Project name" placeholder="My project" />
      </Card.Body>
      <Card.Footer>
        <Button variant="ghost">Cancel</Button>
        <Button>Create</Button>
      </Card.Footer>
    </Card>
  )
}
\`\`\`

## File structure

\`\`\`
├── tokens.css            # CSS custom properties + keyframes
├── tailwind.config.ts    # Tailwind theme extension (optional)
├── components/
│   ├── index.ts          # Barrel exports
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Badge.tsx
│   ├── Toggle.tsx
│   ├── Select.tsx
│   ├── Tooltip.tsx
│   ├── Divider.tsx
│   ├── Card.tsx
│   ├── Alert.tsx
│   ├── Skeleton.tsx
│   ├── Modal.tsx
│   ├── Navbar.tsx
│   └── Table.tsx
└── lib/
    └── cn.ts             # clsx + tailwind-merge utility
\`\`\`

## Dependencies

| Package | Purpose |
|---------|---------|
| \`clsx\` | Conditional class names |
| \`tailwind-merge\` | Merge Tailwind classes without conflicts |
| \`lucide-react\` | Icons (tree-shakeable) |

---

Generated by [Hyena Studio](https://hyena.studio)
`
}
