"use client"

import { useState } from "react"
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
import { Rocket, Code, Paintbrush, GitBranch, Check, Sparkles, Bug, ChevronDown } from "lucide-react"

// ================================================================== //
// SECTION 1: DEFAULT                                                   //
// ================================================================== //

function DefaultSection() {
  const events = [
    { title: "Component library launched", description: "Published v1.0 with 55 components", active: true },
    { title: "Token system completed", description: "Design tokens engine fully operational", active: false },
    { title: "First 13 components built", description: "Core primitives shipped to production", active: false },
    { title: "Project initialised", description: "Repository created and stack configured", active: false },
  ]

  return (
    <PreviewSection label="Default" wrapClassName="flex flex-col items-stretch w-full">
      <div style={{ position: "relative", paddingLeft: 28 }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: 3,
            top: 4,
            bottom: 4,
            width: 1,
            background: "#E5E5E5",
          }}
        />
        {events.map((event, i) => (
          <div key={i} style={{ position: "relative", marginBottom: i < events.length - 1 ? 24 : 0 }}>
            {/* Dot */}
            <div
              style={{
                position: "absolute",
                left: -28,
                top: 5,
                width: 8,
                height: 8,
                borderRadius: 4,
                background: event.active ? "#262626" : "#E5E5E5",
                border: "2px solid #FFFFFF",
                zIndex: 1,
              }}
            />
            <div style={{ fontSize: 13, fontWeight: 500, color: "#262626" }}>{event.title}</div>
            <div style={{ fontSize: 13, fontWeight: 400, color: "#838383", marginTop: 2 }}>{event.description}</div>
          </div>
        ))}
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 2: WITH TIMESTAMPS                                           //
// ================================================================== //

function WithTimestampsSection() {
  const events = [
    { timestamp: "Mar 30", title: "Design review completed", description: "All components pass pixel-perfect audit", active: true },
    { timestamp: "Mar 28", title: "Batch components built", description: "Timeline, Stepper and 4 more shipped", active: false },
    { timestamp: "Mar 25", title: "Layout system established", description: "566px preview box system locked in", active: false },
    { timestamp: "Mar 20", title: "Project kickoff", description: "Initial architecture decisions made", active: false },
  ]

  return (
    <PreviewSection label="With Timestamps" wrapClassName="flex flex-col items-stretch w-full">
      <div style={{ position: "relative" }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: 88,
            top: 10,
            bottom: 10,
            width: 1,
            background: "#E5E5E5",
          }}
        />
        {events.map((event, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              marginBottom: i < events.length - 1 ? 24 : 0,
            }}
          >
            {/* Timestamp */}
            <div
              style={{
                width: 80,
                textAlign: "right",
                fontSize: 11,
                fontWeight: 400,
                color: "#838383",
                paddingRight: 16,
                paddingTop: 2,
                flexShrink: 0,
              }}
            >
              {event.timestamp}
            </div>
            {/* Dot */}
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                marginTop: 6,
                flexShrink: 0,
                background: event.active ? "#262626" : "#E5E5E5",
                zIndex: 1,
              }}
            />
            {/* Content */}
            <div style={{ paddingLeft: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#262626" }}>{event.title}</div>
              <div style={{ fontSize: 13, fontWeight: 400, color: "#838383", marginTop: 2 }}>{event.description}</div>
            </div>
          </div>
        ))}
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 3: WITH ICONS                                                //
// ================================================================== //

function WithIconsSection() {
  const events = [
    { icon: Rocket, title: "Launched to production", description: "Live at hyena.studio", active: true },
    { icon: Code, title: "API documentation added", description: "All props tables complete", active: false },
    { icon: Paintbrush, title: "Design system applied", description: "Consistent token usage across all components", active: false },
    { icon: GitBranch, title: "Repository created", description: "Next.js 16 + TypeScript + Tailwind CSS 4", active: false },
  ]

  return (
    <PreviewSection label="With Icons" wrapClassName="flex flex-col items-stretch w-full">
      <div style={{ position: "relative", paddingLeft: 44 }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: 13,
            top: 14,
            bottom: 14,
            width: 1,
            background: "#E5E5E5",
          }}
        />
        {events.map((event, i) => {
          const Icon = event.icon
          return (
            <div key={i} style={{ position: "relative", marginBottom: i < events.length - 1 ? 24 : 0 }}>
              {/* Icon circle */}
              <div
                style={{
                  position: "absolute",
                  left: -44,
                  top: 0,
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: event.active ? "#262626" : "#F0F0F0",
                  zIndex: 1,
                }}
              >
                <Icon size={14} color={event.active ? "#FFFFFF" : "#838383"} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#262626" }}>{event.title}</div>
              <div style={{ fontSize: 13, fontWeight: 400, color: "#838383", marginTop: 2 }}>{event.description}</div>
            </div>
          )
        })}
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 4: WITH STATUS                                               //
// ================================================================== //

function WithStatusSection() {
  type StatusType = "completed" | "current" | "upcoming"

  const events: Array<{ title: string; description: string; status: StatusType }> = [
    { title: "Order placed", description: "Mar 28, 2026 at 14:32", status: "completed" },
    { title: "Payment confirmed", description: "Mar 28, 2026 at 14:33", status: "completed" },
    { title: "Preparing shipment", description: "Estimated 1-2 business days", status: "current" },
    { title: "Out for delivery", description: "Pending", status: "upcoming" },
    { title: "Delivered", description: "Pending", status: "upcoming" },
  ]

  function getConnectorStyle(fromStatus: StatusType, toStatus: StatusType): React.CSSProperties {
    const isCompleted = fromStatus === "completed" && (toStatus === "completed" || toStatus === "current")
    return {
      position: "absolute",
      left: -26,
      width: 1,
      background: isCompleted ? "#14B8A6" : "transparent",
      borderLeft: isCompleted ? "none" : "1px dashed #E5E5E5",
    }
  }

  return (
    <PreviewSection label="With Status" wrapClassName="flex flex-col items-stretch w-full">
      <style>{`@keyframes hyena-pulse { 0%, 100% { transform: scale(1); opacity: 0.2; } 50% { transform: scale(1.3); opacity: 0; } }`}</style>
      <div style={{ position: "relative", paddingLeft: 36 }}>
        {events.map((event, i) => (
          <div key={i} style={{ position: "relative", marginBottom: i < events.length - 1 ? 24 : 0 }}>
            {/* Connector line to next node */}
            {i < events.length - 1 && (
              <div
                style={{
                  ...getConnectorStyle(event.status, events[i + 1].status),
                  top: 20,
                  bottom: -24,
                }}
              />
            )}
            {/* Dot container */}
            <div
              style={{
                position: "absolute",
                left: -36,
                top: 0,
                width: 20,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}
            >
              {event.status === "completed" && (
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    background: "#14B8A6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Check size={10} color="#FFFFFF" />
                </div>
              )}
              {event.status === "current" && (
                <div style={{ position: "relative", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div
                    style={{
                      position: "absolute",
                      width: 16,
                      height: 16,
                      borderRadius: 8,
                      border: "2px solid #2B7FFF",
                      opacity: 0.2,
                      animation: "hyena-pulse 2s ease infinite",
                    }}
                  />
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: "#2B7FFF" }} />
                </div>
              )}
              {event.status === "upcoming" && (
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    background: "transparent",
                    border: "1.5px solid #E5E5E5",
                  }}
                />
              )}
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#262626" }}>{event.title}</div>
            <div style={{ fontSize: 13, fontWeight: 400, color: "#838383", marginTop: 2 }}>{event.description}</div>
          </div>
        ))}
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 5: COMPACT                                                   //
// ================================================================== //

function CompactSection() {
  const events = [
    { title: "Merged PR #47: Add Copy Button component", time: "2m ago", active: true },
    { title: "Closed issue #123: Badge border radius", time: "15m ago", active: false },
    { title: "Pushed 3 commits to main", time: "1h ago", active: false },
    { title: "Created branch feature/timeline", time: "2h ago", active: false },
    { title: "Commented on PR #45", time: "3h ago", active: false },
    { title: "Opened issue #124: Code Block syntax colors", time: "5h ago", active: false },
  ]

  return (
    <PreviewSection label="Compact" wrapClassName="flex flex-col items-stretch w-full">
      <div style={{ position: "relative", paddingLeft: 20 }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: 2,
            top: 3,
            bottom: 3,
            width: 1,
            background: "#E5E5E5",
          }}
        />
        {events.map((event, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              marginBottom: i < events.length - 1 ? 12 : 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Dot */}
            <div
              style={{
                position: "absolute",
                left: -20,
                top: 5,
                width: 6,
                height: 6,
                borderRadius: 3,
                background: event.active ? "#262626" : "#E5E5E5",
                zIndex: 1,
              }}
            />
            <div style={{ fontSize: 12.3, fontWeight: 400, color: "#262626" }}>{event.title}</div>
            <div style={{ fontSize: 11, fontWeight: 400, color: "#C0C0C0", flexShrink: 0, marginLeft: 12 }}>{event.time}</div>
          </div>
        ))}
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 6: INTERACTIVE                                               //
// ================================================================== //

function InteractiveSection() {
  const [expanded, setExpanded] = useState<Set<number>>(new Set())

  function toggleExpand(index: number) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const events = [
    {
      icon: Sparkles,
      title: "v1.2.0 — New Components",
      content: "Added Copy Button, Code Block, and Context Menu. Fixed Badge border radius bug. Updated token system.",
      active: true,
    },
    {
      icon: Bug,
      title: "v1.1.1 — Bug Fixes",
      content: "Fixed Dialog close animation. Resolved Toast z-index issue. Corrected Tooltip positioning on scroll.",
      active: false,
    },
    {
      icon: Rocket,
      title: "v1.0.0 — Initial Release",
      content: "55 components launched. Full design token system. Preview, Code, and API tabs for every component.",
      active: false,
    },
  ]

  return (
    <PreviewSection label="Interactive" wrapClassName="flex flex-col items-stretch w-full">
      <div style={{ position: "relative", paddingLeft: 44 }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: 13,
            top: 14,
            bottom: 14,
            width: 1,
            background: "#E5E5E5",
          }}
        />
        {events.map((event, i) => {
          const Icon = event.icon
          const isExpanded = expanded.has(i)
          return (
            <div key={i} style={{ position: "relative", marginBottom: i < events.length - 1 ? 24 : 0 }}>
              {/* Icon circle */}
              <div
                style={{
                  position: "absolute",
                  left: -44,
                  top: 0,
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: event.active ? "#262626" : "#F0F0F0",
                  zIndex: 1,
                }}
              >
                <Icon size={14} color={event.active ? "#FFFFFF" : "#838383"} />
              </div>
              {/* Title with chevron */}
              <div
                onClick={() => toggleExpand(i)}
                style={{
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#262626",
                }}
              >
                {event.title}
                <ChevronDown
                  size={12}
                  color="#838383"
                  style={{
                    transform: `rotate(${isExpanded ? 180 : 0}deg)`,
                    transition: "transform 200ms ease",
                  }}
                />
              </div>
              {/* Expandable content */}
              <div
                style={{
                  maxHeight: isExpanded ? 200 : 0,
                  opacity: isExpanded ? 1 : 0,
                  overflow: "hidden",
                  background: isExpanded ? "#FAFAFA" : "#FAFAFA",
                  borderRadius: 8,
                  padding: isExpanded ? 12 : 0,
                  marginTop: isExpanded ? 8 : 0,
                  fontSize: 12.3,
                  fontWeight: 400,
                  color: "#262626",
                  lineHeight: 1.6,
                  transition: "all 200ms ease",
                }}
              >
                {event.content}
              </div>
            </div>
          )
        })}
      </div>
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
      <WithTimestampsSection />
      <WithIconsSection />
      <WithStatusSection />
      <CompactSection />
      <InteractiveSection />
    </div>
  )
}

// ================================================================== //
// CODE TAB                                                             //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/timeline"
      importCode={`import {\n  Timeline,\n  TimelineItem,\n  TimelineDot,\n  TimelineConnector,\n  TimelineContent,\n  TimelineTitle,\n  TimelineDescription,\n} from "@/components/ui/timeline"`}
      usageCode={`<Timeline>\n  <TimelineItem>\n    <TimelineDot />\n    <TimelineConnector />\n    <TimelineContent>\n      <TimelineTitle>Event title</TimelineTitle>\n      <TimelineDescription>Event description</TimelineDescription>\n    </TimelineContent>\n  </TimelineItem>\n</Timeline>\n\n// With icons\n<TimelineDot>\n  <RocketIcon className="h-3.5 w-3.5" />\n</TimelineDot>\n\n// With status\n<TimelineDot status="completed" />\n<TimelineDot status="current" />\n<TimelineDot status="upcoming" />`}
    />
  )
}

// ================================================================== //
// API TAB                                                              //
// ================================================================== //

const TIMELINE_PROPS: PropDef[] = [
  { prop: "children", type: "ReactNode", defaultVal: "\u2014" },
  { prop: "className", type: "string", defaultVal: "\u2014" },
]

const TIMELINE_ITEM_PROPS: PropDef[] = [
  { prop: "children", type: "ReactNode", defaultVal: "\u2014" },
  { prop: "active", type: "boolean", defaultVal: "false" },
]

const TIMELINE_DOT_PROPS: PropDef[] = [
  { prop: "children", type: "ReactNode", defaultVal: "\u2014" },
  { prop: "status", type: '"default" | "completed" | "current" | "upcoming"', defaultVal: '"default"' },
  { prop: "size", type: '"sm" | "md" | "lg"', defaultVal: '"md"' },
  { prop: "className", type: "string", defaultVal: "\u2014" },
]

const TIMELINE_CONNECTOR_PROPS: PropDef[] = [
  { prop: "variant", type: '"solid" | "dashed"', defaultVal: '"solid"' },
  { prop: "status", type: '"default" | "completed"', defaultVal: '"default"' },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Timeline"
      description="A vertical timeline for activity feeds, changelogs, order tracking, and chronological event sequences."
      props={TIMELINE_PROPS}
      extraSections={
        <>
          <div style={{ marginTop: "28px" }}>
            <LabelPill text="TimelineItem" />
            <div style={{ marginTop: "12px" }}>
              <PropsTable props={TIMELINE_ITEM_PROPS} />
            </div>
          </div>
          <div style={{ marginTop: "28px" }}>
            <LabelPill text="TimelineDot" />
            <div style={{ marginTop: "12px" }}>
              <PropsTable props={TIMELINE_DOT_PROPS} />
            </div>
          </div>
          <div style={{ marginTop: "28px" }}>
            <LabelPill text="TimelineConnector" />
            <div style={{ marginTop: "12px" }}>
              <PropsTable props={TIMELINE_CONNECTOR_PROPS} />
            </div>
          </div>
        </>
      }
    />
  )
}

// ================================================================== //
// CAP DATA                                                             //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Display",
  variants: "6",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Stepper", href: "/components/stepper" },
    { label: "Separator", href: "/components/separator" },
    { label: "Collapsible", href: "/components/collapsible" },
  ],
  tokens: [
    { name: "--timeline-line", color: "#E5E5E5", border: true },
    { name: "--timeline-dot-active", color: "#262626" },
    { name: "--timeline-completed", color: "#14B8A6" },
    { name: "--timeline-current", color: "#2B7FFF" },
    { name: "--timeline-content-bg", color: "#FAFAFA" },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function TimelinePage() {
  return (
    <ComponentPageLayout
      name="Timeline"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
