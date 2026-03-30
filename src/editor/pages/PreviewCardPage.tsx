"use client"

import { useState, useRef, useCallback } from "react"
import {
  ComponentPageLayout,
  ComponentCAP,
  PreviewSection,
  StandardCodeTab,
  StandardApiTab,
  LabelPill,
  PropsTable,
  type CAPData,
  type PropDef,
} from "@/editor/components/PageShell"
import { Star } from "lucide-react"

// ================================================================== //
// SHARED STYLES                                                        //
// ================================================================== //

const cardPanel: React.CSSProperties = {
  width: 280,
  background: "#FFFFFF",
  border: "0.8px solid #F0F0F0",
  borderRadius: 10,
  boxShadow: "0 4px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.03)",
  padding: 0,
  overflow: "hidden",
}

const triggerLink: React.CSSProperties = {
  fontWeight: 500,
  fontSize: 13,
  color: "#262626",
  textDecoration: "underline",
  cursor: "pointer",
}

// ================================================================== //
// REUSABLE CARD CONTENTS                                               //
// ================================================================== //

function UserProfileContent() {
  return (
    <>
      {/* Avatar area */}
      <div
        style={{
          width: 280,
          height: 60,
          background: "#F5F5F5",
          borderRadius: "10px 10px 0 0",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            background: "#262626",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 16,
            marginBottom: -20,
            position: "relative",
            zIndex: 1,
            top: 40,
          }}
        >
          <span style={{ color: "white", fontSize: 16, fontWeight: 500 }}>RS</span>
        </div>
      </div>
      {/* Body */}
      <div style={{ padding: "28px 16px 16px" }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: "#262626" }}>Rui Sim&#xF5;es</div>
        <div style={{ fontWeight: 400, fontSize: 12, color: "#838383" }}>@rui</div>
        <div
          style={{
            fontWeight: 400,
            fontSize: 12.3,
            color: "rgba(38,38,38,0.7)",
            marginTop: 6,
          }}
        >
          Design engineer. Building hyena.studio.
        </div>
        <div style={{ marginTop: 10, display: "flex", gap: 16 }}>
          <span>
            <span style={{ fontWeight: 500, fontSize: 12, color: "#262626" }}>12</span>
            <span style={{ fontWeight: 400, fontSize: 12, color: "#838383" }}> projects</span>
          </span>
          <span>
            <span style={{ fontWeight: 500, fontSize: 12, color: "#262626" }}>1.2k</span>
            <span style={{ fontWeight: 400, fontSize: 12, color: "#838383" }}> followers</span>
          </span>
        </div>
      </div>
    </>
  )
}

function LinkPreviewContent() {
  return (
    <>
      {/* Image placeholder */}
      <div
        style={{
          width: 280,
          height: 100,
          background: "#F0F0F0",
          borderRadius: "10px 10px 0 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontWeight: 400, fontSize: 11, color: "#A1A1A1" }}>Preview image</span>
      </div>
      {/* Body */}
      <div style={{ padding: "12px 16px" }}>
        <div style={{ fontWeight: 400, fontSize: 11, color: "#838383" }}>hyena.studio</div>
        <div style={{ fontWeight: 500, fontSize: 13, color: "#262626", marginTop: 2 }}>
          Hyena Studio — Design System Components
        </div>
        <div
          style={{
            fontWeight: 400,
            fontSize: 12,
            color: "#838383",
            marginTop: 4,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          A premium component library for modern web applications.
        </div>
      </div>
    </>
  )
}

// ================================================================== //
// PREVIEW                                                              //
// ================================================================== //

function UserProfileSection() {
  return (
    <PreviewSection label="User Profile" wrapClassName="flex flex-col items-center">
      <div>
        <span style={triggerLink}>@rui</span>
        <div style={{ marginTop: 6 }}>
          <div style={cardPanel}>
            <UserProfileContent />
          </div>
        </div>
      </div>
    </PreviewSection>
  )
}

function LinkPreviewSection() {
  return (
    <PreviewSection label="Link Preview" wrapClassName="flex flex-col items-center">
      <div>
        <span style={triggerLink}>hyena.studio</span>
        <div style={{ marginTop: 6 }}>
          <div style={cardPanel}>
            <LinkPreviewContent />
          </div>
        </div>
      </div>
    </PreviewSection>
  )
}

function ProductCardSection() {
  return (
    <PreviewSection label="Product Card" wrapClassName="flex flex-col items-center">
      <div>
        <span style={triggerLink}>MacBook Pro</span>
        <div style={{ marginTop: 6 }}>
          <div style={cardPanel}>
            {/* Image placeholder */}
            <div
              style={{
                width: 280,
                height: 80,
                background: "#F5F5F5",
                borderRadius: "10px 10px 0 0",
              }}
            />
            {/* Body */}
            <div style={{ padding: "12px 16px" }}>
              <div style={{ fontWeight: 500, fontSize: 13, color: "#262626" }}>
                MacBook Pro 14-inch
              </div>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#262626", marginTop: 4 }}>
                $1,999
              </div>
              <div style={{ marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                {[0, 1, 2, 3].map((i) => (
                  <Star key={i} size={14} fill="#F97316" stroke="#F97316" />
                ))}
                <Star size={14} fill="none" stroke="#D4D4D4" />
                <span style={{ fontWeight: 500, fontSize: 11, color: "#262626", marginLeft: 4 }}>
                  4.8
                </span>
                <span style={{ fontWeight: 400, fontSize: 11, color: "#838383" }}>(2,847)</span>
              </div>
              <div
                style={{
                  marginTop: 8,
                  display: "inline-flex",
                  alignItems: "center",
                  height: 20,
                  padding: "0 8px",
                  borderRadius: 9999,
                  background: "#ECFDF5",
                  color: "#14B8A6",
                  fontSize: 11,
                  fontWeight: 500,
                }}
              >
                In stock
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewSection>
  )
}

function InteractiveSection() {
  const [activeCard, setActiveCard] = useState<null | "user" | "link">(null)
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimers = useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current)
      openTimeoutRef.current = null
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }, [])

  const handleTriggerEnter = useCallback(
    (card: "user" | "link") => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
        closeTimeoutRef.current = null
      }
      openTimeoutRef.current = setTimeout(() => {
        setActiveCard(card)
      }, 300)
    },
    [],
  )

  const handleTriggerLeave = useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current)
      openTimeoutRef.current = null
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveCard(null)
    }, 200)
  }, [])

  const handleCardEnter = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }, [])

  const handleCardLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveCard(null)
    }, 200)
  }, [])

  return (
    <PreviewSection label="Interactive" wrapClassName="flex flex-col items-center">
      <div style={{ width: 380, position: "relative" }}>
        <p
          style={{
            fontWeight: 400,
            fontSize: 13,
            color: "rgba(38,38,38,0.7)",
            lineHeight: "20px",
            textAlign: "center",
          }}
        >
          Check out the work by{" "}
          <span
            style={{ position: "relative", display: "inline-block" }}
            onMouseEnter={() => handleTriggerEnter("user")}
            onMouseLeave={handleTriggerLeave}
          >
            <span style={triggerLink}>@rui</span>
            {activeCard === "user" && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  zIndex: 10,
                  paddingTop: 6,
                }}
                onMouseEnter={handleCardEnter}
                onMouseLeave={handleCardLeave}
              >
                <div
                  style={{
                    ...cardPanel,
                    transition: "opacity 150ms ease-out, transform 150ms ease-out",
                    opacity: 1,
                    transform: "translateY(0)",
                  }}
                >
                  <UserProfileContent />
                </div>
              </div>
            )}
          </span>{" "}
          on{" "}
          <span
            style={{ position: "relative", display: "inline-block" }}
            onMouseEnter={() => handleTriggerEnter("link")}
            onMouseLeave={handleTriggerLeave}
          >
            <span style={triggerLink}>hyena.studio</span>
            {activeCard === "link" && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  zIndex: 10,
                  paddingTop: 6,
                }}
                onMouseEnter={handleCardEnter}
                onMouseLeave={handleCardLeave}
              >
                <div
                  style={{
                    ...cardPanel,
                    transition: "opacity 150ms ease-out, transform 150ms ease-out",
                    opacity: 1,
                    transform: "translateY(0)",
                  }}
                >
                  <LinkPreviewContent />
                </div>
              </div>
            )}
          </span>{" "}
          — it&#x2019;s a great resource.
        </p>
      </div>
    </PreviewSection>
  )
}

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <UserProfileSection />
      <LinkPreviewSection />
      <ProductCardSection />
      <InteractiveSection />
    </div>
  )
}

// ================================================================== //
// CODE                                                                 //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/preview-card"
      importCode={`import {\n  PreviewCard,\n  PreviewCardTrigger,\n  PreviewCardContent,\n} from "@/components/ui/preview-card"`}
      usageCode={`<PreviewCard>\n  <PreviewCardTrigger asChild>\n    <a href="/user/rui">@rui</a>\n  </PreviewCardTrigger>\n  <PreviewCardContent>\n    <UserProfile name="Rui" handle="@rui" />\n  </PreviewCardContent>\n</PreviewCard>`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const PREVIEW_CARD_PROPS: PropDef[] = [
  { prop: "openDelay", type: "number (ms)", defaultVal: "300" },
  { prop: "closeDelay", type: "number (ms)", defaultVal: "200" },
]

const PREVIEW_CARD_CONTENT_PROPS: PropDef[] = [
  { prop: "side", type: '"top" | "bottom"', defaultVal: '"bottom"' },
  { prop: "align", type: '"start" | "center" | "end"', defaultVal: '"center"' },
  { prop: "sideOffset", type: "number", defaultVal: "6" },
  { prop: "className", type: "string", defaultVal: "\u2014" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Preview Card"
      description="A rich popup that appears when a link is hovered, showing a preview for sighted users."
      props={PREVIEW_CARD_PROPS}
      extraSections={
        <div style={{ marginTop: "28px" }}>
          <LabelPill text="PreviewCardContent Props" />
          <div style={{ marginTop: "12px", width: "100%" }}>
            <PropsTable props={PREVIEW_CARD_CONTENT_PROPS} />
          </div>
        </div>
      }
    />
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Composite",
  variants: "4",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Popover", href: "/components/popover" },
    { label: "Tooltip", href: "/components/tooltip" },
    { label: "Card", href: "/components/card" },
  ],
  tokens: [
    { name: "--border", color: "#F0F0F0", border: true },
    { name: "--foreground", color: "#262626" },
    { name: "--muted-fg", color: "#838383" },
    { name: "--secondary", color: "#F5F5F5" },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function PreviewCardPage() {
  return (
    <ComponentPageLayout
      name="Preview Card"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
