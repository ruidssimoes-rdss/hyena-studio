"use client"

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

// ------------------------------------------------------------------ //
// CAP content for Button component page                               //
// Figma node: 9905:3269                                               //
// Sections: Details, Related, Tokens                                  //
// ------------------------------------------------------------------ //

function CAPSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div style={{ padding: "7px", borderRadius: "10px" }}>
      <div
        className="font-medium"
        style={{
          fontSize: "12.3px",
          lineHeight: "18px",
          color: "#262626",
          height: "28px",
          padding: "5px 12px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-center justify-between"
      style={{
        height: "28px",
        padding: "0 12px",
        fontSize: "12.3px",
        lineHeight: "17.5px",
      }}
    >
      <span style={{ color: "#727272", fontWeight: 400 }}>{label}</span>
      <span style={{ color: "#262626", fontWeight: 400 }}>{value}</span>
    </div>
  )
}

function RelatedItem({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between transition-colors duration-150 hover:bg-[rgba(0,0,0,0.04)]"
      style={{
        height: "28px",
        padding: "0 12px",
        borderRadius: "8.75px",
        fontSize: "12.3px",
        color: "#727272",
        fontWeight: 400,
      }}
    >
      <span>{label}</span>
      <ArrowUpRight style={{ width: "14px", height: "14px" }} />
    </Link>
  )
}

function TokenRow({
  name,
  color,
  border,
}: {
  name: string
  color: string
  border?: boolean
}) {
  return (
    <div
      className="flex items-center justify-between"
      style={{
        height: "28px",
        padding: "0 12px",
        fontSize: "13px",
        lineHeight: "22.1px",
        color: "#737373",
        fontWeight: 400,
      }}
    >
      <span>{name}</span>
      <div
        style={{
          width: "13px",
          height: "13px",
          borderRadius: "2.5px",
          background: color,
          border: border ? "1px solid #e1e1e1" : undefined,
        }}
      />
    </div>
  )
}

export function ButtonCAP() {
  return (
    <div style={{ padding: "14px 14px 0" }}>
      <div style={{ height: "14px" }} />

      {/* Details */}
      <CAPSection title="Details">
        <DetailRow label="Type" value="Primitive" />
        <DetailRow label="Variants" value="7" />
        <DetailRow label="Sizes" value="5" />
        <DetailRow label="Deps" value="cva, cn" />
      </CAPSection>

      {/* Related */}
      <CAPSection title="Related">
        <RelatedItem label="Badge" href="/components/badge" />
        <RelatedItem label="Toggle" href="/components/toggle" />
        <RelatedItem label="Input" href="/components/input" />
        <RelatedItem label="Violations" href="/rules/violations" />
      </CAPSection>

      {/* Tokens */}
      <CAPSection title="Tokens">
        <TokenRow name="--primary" color="#262626" />
        <TokenRow name="--primary-fg" color="#fafafa" border />
        <TokenRow name="--destructive" color="#d5143e" />
        <TokenRow name="--border" color="#e5e5e5" border />
        <TokenRow name="--secondary" color="#e8e8e8" border />
        <TokenRow name="--radius" color="#ffffff" border />
      </CAPSection>
    </div>
  )
}
