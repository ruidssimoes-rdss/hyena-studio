"use client"

import { useCallback, useId, useState } from "react"
import { cn } from "@/lib/cn"

export interface ToggleProps {
  size?: "sm" | "md"
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
  id?: string
}

const trackSizes: Record<string, string> = {
  sm: "w-9 h-5",
  md: "w-11 h-6",
}

const thumbSizes: Record<string, string> = {
  sm: "size-4",
  md: "size-5",
}

const thumbTranslate: Record<string, string> = {
  sm: "translate-x-4",
  md: "translate-x-5",
}

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
        aria-label={label && !label ? label : undefined}
        disabled={disabled}
        onClick={handleChange}
        className={cn(
          "relative inline-flex shrink-0 cursor-pointer items-center rounded-full",
          "transition-colors duration-[var(--duration-normal)] ease-[var(--easing-standard)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]",
          "disabled:opacity-45 disabled:pointer-events-none",
          trackSizes[size],
          isChecked
            ? "bg-[var(--color-primary)]"
            : "bg-[var(--color-on-surface-faint)]"
        )}
      >
        {/* Thumb */}
        <span
          className={cn(
            "pointer-events-none inline-block rounded-full bg-white shadow-sm",
            "transition-transform duration-200 ease-[var(--easing-spring)]",
            "translate-x-0.5",
            "active:scale-x-110",
            thumbSizes[size],
            isChecked && thumbTranslate[size]
          )}
        />
        {/* Hover halo */}
        <span
          className={cn(
            "absolute inset-0 rounded-full",
            "transition-[box-shadow] duration-[var(--duration-fast)] ease-[var(--easing-standard)]",
            !disabled && "hover:shadow-[inset_0_0_0_100px_rgba(0,0,0,0.08)]"
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
