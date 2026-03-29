"use client"

import { cn } from "@/lib/cn"

export interface NavbarProps {
  variant?: "solid" | "glass"
  size?: "default" | "compact"
  brand?: React.ReactNode
  children?: React.ReactNode
  actions?: React.ReactNode
  sticky?: boolean
  maxWidth?: string
}

export function Navbar({
  variant = "solid",
  size = "default",
  brand,
  children,
  actions,
  sticky = false,
  maxWidth,
}: NavbarProps) {
  return (
    <nav
      className={cn(
        // No rounded corners ever
        "w-full flex items-center",
        "transition-[background-color,backdrop-filter,border-color] duration-[var(--duration-fast)] ease-[var(--easing-standard)]",
        // Size
        size === "default" ? "h-14" : "h-12",
        // Variant
        variant === "solid" && [
          "bg-[var(--color-surface)]",
          "border-b border-[var(--color-outline-variant)]",
        ],
        variant === "glass" && [
          "bg-[var(--color-surface)]/80 backdrop-blur-xl",
          "border-b border-[var(--color-outline-variant)]/50",
        ],
        // Sticky
        sticky && "sticky top-0 z-40"
      )}
    >
      <div
        className="flex items-center justify-between w-full px-[var(--spacing-4)]"
        style={maxWidth ? { maxWidth, margin: "0 auto" } : undefined}
      >
        {/* Brand */}
        {brand && <div className="shrink-0 mr-[var(--spacing-5)]">{brand}</div>}

        {/* Nav links */}
        {children && (
          <div className="flex items-center gap-1 flex-1">{children}</div>
        )}

        {/* Actions */}
        {actions && (
          <div className="flex items-center gap-2 shrink-0 ml-[var(--spacing-3)]">
            {actions}
          </div>
        )}
      </div>
    </nav>
  )
}

// ------------------------------------------------------------------ //
// NavLink helper                                                      //
// ------------------------------------------------------------------ //

export interface NavLinkProps {
  href?: string
  active?: boolean
  icon?: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
}

export function NavLink({
  href,
  active = false,
  icon,
  children,
  onClick,
}: NavLinkProps) {
  const Tag = href ? "a" : "button"

  return (
    <Tag
      href={href}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)]",
        "text-[var(--type-label-lg-size)] font-[var(--type-label-lg-weight)]",
        "leading-[var(--type-label-lg-line-height)]",
        "transition-[color,background-color] duration-[var(--duration-fast)] ease-[var(--easing-standard)]",
        "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-focus-ring)]",
        "[&_svg]:size-4",
        // Icon optical alignment
        icon && "pl-[calc(0.75rem-2px)]",
        // States
        active
          ? "text-[var(--color-on-surface)] bg-[var(--color-surface-container)]"
          : "text-[var(--color-on-surface-muted)] hover:text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container)]"
      )}
    >
      {icon}
      {children}
      {/* Active indicator */}
      {active && (
        <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[var(--color-primary)] rounded-full" />
      )}
    </Tag>
  )
}
