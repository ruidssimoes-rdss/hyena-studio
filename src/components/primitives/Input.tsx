"use client"

import { cn } from "@/lib/cn"

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
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined)
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
          // Variant
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
          // Read-only
          readOnly && variant === "outlined" && "border-dashed",
          readOnly && variant === "filled" && "opacity-75",
          // Disabled
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
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
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
          id={errorMessage ? `${inputId}-error` : `${inputId}-helper`}
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
