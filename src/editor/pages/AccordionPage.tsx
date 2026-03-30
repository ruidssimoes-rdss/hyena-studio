"use client"

import { useState, useCallback } from "react"
import { ChevronDown } from "lucide-react"
import {
  ComponentPageLayout,
  ComponentCAP,
  PreviewSection,
  StandardCodeTab,
  StandardApiTab,
  PropsTable,
  LabelPill,
  type CAPData,
  type PropDef,
} from "@/editor/components/PageShell"

// ================================================================== //
// ACCORDION PRIMITIVE                                                  //
// ================================================================== //

interface AccordionItemData {
  title: string
  content: string
  disabled?: boolean
}

function AccordionDemo({
  items,
  defaultOpen = [],
  single = false,
}: {
  items: AccordionItemData[]
  defaultOpen?: number[]
  single?: boolean
}) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set(defaultOpen))

  const toggle = useCallback(
    (index: number) => {
      if (items[index].disabled) return
      setOpenItems((prev) => {
        const next = single ? new Set<number>() : new Set(prev)
        if (prev.has(index)) {
          next.delete(index)
        } else {
          next.add(index)
        }
        return next
      })
    },
    [items, single],
  )

  return (
    <div
      style={{
        width: "340px",
        border: "0.8px solid #F0F0F0",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      {items.map((item, i) => {
        const isOpen = openItems.has(i)
        const isDisabled = item.disabled === true
        return (
          <div key={i}>
            {i > 0 && (
              <div style={{ height: "0.8px", background: "#F0F0F0" }} />
            )}
            {/* Header */}
            <button
              onClick={() => toggle(i)}
              disabled={isDisabled}
              style={{
                width: "100%",
                height: "40px",
                padding: "0 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "white",
                border: "none",
                cursor: isDisabled ? "default" : "pointer",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: isDisabled ? "#A1A1A1" : "#262626",
                }}
              >
                {item.title}
              </span>
              <ChevronDown
                style={{
                  width: "16px",
                  height: "16px",
                  color: isDisabled ? "#D4D4D4" : "#838383",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 200ms ease",
                  flexShrink: 0,
                }}
              />
            </button>
            {/* Content */}
            <div
              style={{
                maxHeight: isOpen ? "200px" : "0px",
                overflow: "hidden",
                transition: "max-height 200ms ease",
              }}
            >
              <div
                style={{
                  padding: "0 12px 12px",
                  fontSize: "13px",
                  lineHeight: "18px",
                  fontWeight: 400,
                  color: "rgba(38,38,38,0.7)",
                }}
              >
                {item.content}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ================================================================== //
// SECTION 1: DEFAULT                                                   //
// ================================================================== //

const DEFAULT_ITEMS: AccordionItemData[] = [
  {
    title: "Is it accessible?",
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    title: "Is it styled?",
    content: "Yes. It comes with default styles that match your design system.",
  },
  {
    title: "Is it animated?",
    content: "Yes. It uses CSS transitions for smooth open/close animations.",
  },
]

function DefaultSection() {
  return (
    <PreviewSection label="Default">
      <AccordionDemo items={DEFAULT_ITEMS} defaultOpen={[0]} />
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 2: SINGLE EXPAND                                             //
// ================================================================== //

const SINGLE_ITEMS: AccordionItemData[] = [
  {
    title: "What is your refund policy?",
    content: "We offer a 30-day money-back guarantee on all plans.",
  },
  {
    title: "How do I cancel?",
    content: "You can cancel anytime from your account settings.",
  },
  {
    title: "Do you offer support?",
    content: "Yes. Email support is included with all plans.",
  },
]

function SingleExpandSection() {
  return (
    <PreviewSection label="Single expand">
      <AccordionDemo items={SINGLE_ITEMS} defaultOpen={[2]} single />
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 3: DISABLED                                                  //
// ================================================================== //

const DISABLED_ITEMS: AccordionItemData[] = [
  {
    title: "Available section",
    content: "This section can be toggled normally.",
  },
  {
    title: "Disabled section",
    content: "",
    disabled: true,
  },
  {
    title: "Another section",
    content: "This section also works normally.",
  },
]

function DisabledSection() {
  return (
    <PreviewSection label="Disabled">
      <AccordionDemo items={DISABLED_ITEMS} defaultOpen={[0]} />
    </PreviewSection>
  )
}

// ================================================================== //
// PREVIEW TAB                                                          //
// ================================================================== //

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <DefaultSection />
      <SingleExpandSection />
      <DisabledSection />
    </div>
  )
}

// ================================================================== //
// CODE TAB                                                             //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/accordion"
      importCode={`import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"`}
      usageCode={`<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
    />
  )
}

// ================================================================== //
// API TAB                                                              //
// ================================================================== //

const ACCORDION_PROPS: PropDef[] = [
  { prop: "type", type: '"single" | "multiple"', defaultVal: '"single"' },
  { prop: "collapsible", type: "boolean", defaultVal: "false" },
  { prop: "defaultValue", type: "string | string[]", defaultVal: "—" },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
  { prop: "className", type: "string", defaultVal: "—" },
]

const ACCORDION_ITEM_PROPS: PropDef[] = [
  { prop: "value", type: "string (required)", defaultVal: "—" },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
]

const ACCORDION_TRIGGER_PROPS: PropDef[] = [
  { prop: "className", type: "string", defaultVal: "—" },
]

const ACCORDION_CONTENT_PROPS: PropDef[] = [
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <div>
      <h2 style={{ fontSize: "16px", fontWeight: 500, color: "#262626", marginBottom: "4px" }}>
        Accordion
      </h2>
      <p style={{ fontSize: "12.3px", fontWeight: 400, color: "#727272", lineHeight: 1.6, marginBottom: "24px" }}>
        A vertically stacked set of collapsible sections.
      </p>

      <LabelPill text="Accordion Props" />
      <div style={{ marginTop: "12px", width: "100%", marginBottom: "24px" }}>
        <PropsTable props={ACCORDION_PROPS} />
      </div>

      <LabelPill text="AccordionItem Props" />
      <div style={{ marginTop: "12px", width: "100%", marginBottom: "24px" }}>
        <PropsTable props={ACCORDION_ITEM_PROPS} />
      </div>

      <LabelPill text="AccordionTrigger Props" />
      <div style={{ marginTop: "12px", width: "100%", marginBottom: "24px" }}>
        <PropsTable props={ACCORDION_TRIGGER_PROPS} />
      </div>

      <LabelPill text="AccordionContent Props" />
      <div style={{ marginTop: "12px", width: "100%" }}>
        <PropsTable props={ACCORDION_CONTENT_PROPS} />
      </div>
    </div>
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Composite",
  variants: "3 (default, single, disabled)",
  sizes: "1",
  deps: "cva, cn",
  related: [
    { label: "Collapsible", href: "/components/collapsible" },
    { label: "Tabs", href: "/components/tabs" },
  ],
  tokens: [
    { name: "--border", color: "#F0F0F0", border: true },
    { name: "--foreground", color: "#262626" },
    { name: "--muted-fg", color: "#838383" },
    { name: "--radius", color: "#e4e4e7", border: true },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function AccordionPage() {
  return (
    <ComponentPageLayout
      name="Accordion"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
