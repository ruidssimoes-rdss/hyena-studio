"use client"

import { createContext, useContext } from "react"
import { cn } from "@/lib/cn"

// ------------------------------------------------------------------ //
// Card context for concentric radius                                  //
// ------------------------------------------------------------------ //

interface CardContextValue {
  variant: "elevated" | "outlined" | "filled"
}

const CardContext = createContext<CardContextValue>({ variant: "elevated" })

// ------------------------------------------------------------------ //
// Card root                                                           //
// ------------------------------------------------------------------ //

export interface CardProps {
  variant?: "elevated" | "outlined" | "filled"
  interactive?: boolean
  selected?: boolean
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

function CardRoot({
  variant = "elevated",
  interactive = false,
  selected = false,
  onClick,
  children,
  className,
}: CardProps) {
  const Tag = interactive || onClick ? "button" : "div"

  return (
    <CardContext.Provider value={{ variant }}>
      <Tag
        onClick={onClick}
        className={cn(
          // Base — concentric radius: children get calc(var(--radius-xl) - padding)
          "rounded-[var(--radius-xl)] p-[var(--density-padding)] text-left w-full",
          "transition-[background-color,box-shadow,border-color,transform] duration-[var(--duration-fast)] ease-[var(--easing-standard)]",
          "[--card-inner-radius:calc(var(--radius-xl)-var(--density-padding))]",
          // Variant
          variant === "elevated" && [
            "bg-[var(--color-surface)] shadow-[var(--elevation-1)]",
            (interactive || onClick) && "hover:shadow-[var(--elevation-2)]",
          ],
          variant === "outlined" && [
            "bg-[var(--color-surface)] border border-[var(--color-outline-variant)]",
            (interactive || onClick) &&
              "hover:border-[var(--color-outline-hover)]",
          ],
          variant === "filled" && [
            "bg-[var(--color-surface-container)]",
            (interactive || onClick) &&
              "hover:bg-[var(--color-surface-container-high)]",
          ],
          // Selected
          selected && "ring-2 ring-[var(--color-primary)]",
          // Interactive
          (interactive || onClick) && [
            "cursor-pointer",
            "active:scale-[0.98]",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]",
          ],
          className
        )}
      >
        {children}
      </Tag>
    </CardContext.Provider>
  )
}

// ------------------------------------------------------------------ //
// Card.Header                                                         //
// ------------------------------------------------------------------ //

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-3 mb-3",
        "rounded-[var(--card-inner-radius)]",
        className
      )}
    >
      {children}
    </div>
  )
}

// ------------------------------------------------------------------ //
// Card.Body                                                           //
// ------------------------------------------------------------------ //

interface CardBodyProps {
  children: React.ReactNode
  className?: string
}

function CardBody({ children, className }: CardBodyProps) {
  return (
    <div className={cn("rounded-[var(--card-inner-radius)]", className)}>
      {children}
    </div>
  )
}

// ------------------------------------------------------------------ //
// Card.Footer                                                         //
// ------------------------------------------------------------------ //

interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2 mt-4 pt-3",
        "border-t border-[var(--color-outline-variant)]",
        "rounded-b-[var(--card-inner-radius)]",
        className
      )}
    >
      {children}
    </div>
  )
}

// ------------------------------------------------------------------ //
// Compound export                                                     //
// ------------------------------------------------------------------ //

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
})

export { useContext as _useCardContext }
