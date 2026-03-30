"use client"

import { useState, useRef, useCallback, useEffect } from "react"
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
import { ChevronLeft, ChevronRight, FileText, FolderOpen, File } from "lucide-react"

// ================================================================== //
// SPLIT PANEL — core resizable logic                                   //
// ================================================================== //

function SplitPanel({
  direction,
  initialSizes,
  minSizes,
  children,
  panelStyle,
  containerStyle,
  withHandle,
  collapsible,
  onSizesChange,
}: {
  direction: "horizontal" | "vertical"
  initialSizes: number[]
  minSizes?: number[]
  children: React.ReactNode[]
  panelStyle?: React.CSSProperties[]
  containerStyle?: React.CSSProperties
  withHandle?: boolean | "dots"
  collapsible?: boolean
  onSizesChange?: (sizes: number[]) => void
}) {
  const [sizes, setSizes] = useState(initialSizes)
  const [collapsed, setCollapsed] = useState<"left" | "right" | null>(null)
  const [preCollapseSize, setPreCollapseSize] = useState<number[]>(initialSizes)
  const [transitioning, setTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const isHorizontal = direction === "horizontal"

  const handleDrag = useCallback(
    (index: number, delta: number) => {
      if (!containerRef.current) return
      const containerSize = isHorizontal
        ? containerRef.current.offsetWidth
        : containerRef.current.offsetHeight
      const pctDelta = (delta / containerSize) * 100

      setSizes((prev) => {
        const next = [...prev]
        const mins = minSizes ?? prev.map(() => 0)

        let newA = prev[index] + pctDelta
        let newB = prev[index + 1] - pctDelta

        if (newA < mins[index]) {
          newA = mins[index]
          newB = prev[index] + prev[index + 1] - newA
        }
        if (newB < mins[index + 1]) {
          newB = mins[index + 1]
          newA = prev[index] + prev[index + 1] - newB
        }

        next[index] = newA
        next[index + 1] = newB
        return next
      })
      if (collapsed) setCollapsed(null)
    },
    [isHorizontal, minSizes, collapsed],
  )

  useEffect(() => {
    onSizesChange?.(sizes)
  }, [sizes, onSizesChange])

  const handleCollapse = useCallback(
    (handleIndex: number) => {
      if (!collapsible) return
      if (collapsed) {
        // Expand
        setTransitioning(true)
        setSizes(preCollapseSize)
        setCollapsed(null)
        setTimeout(() => setTransitioning(false), 200)
      } else {
        // Collapse smaller panel
        setPreCollapseSize(sizes)
        setTransitioning(true)
        const collapseLeft = sizes[handleIndex] <= sizes[handleIndex + 1]
        const next = [...sizes]
        if (collapseLeft) {
          next[handleIndex + 1] += next[handleIndex]
          next[handleIndex] = 0
          setCollapsed("left")
        } else {
          next[handleIndex] += next[handleIndex + 1]
          next[handleIndex + 1] = 0
          setCollapsed("right")
        }
        setSizes(next)
        setTimeout(() => setTransitioning(false), 200)
      }
    },
    [collapsible, collapsed, sizes, preCollapseSize],
  )

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: isHorizontal ? "row" : "column",
        width: "100%",
        height: "100%",
        ...containerStyle,
      }}
    >
      {children.map((child, i) => (
        <div key={i} style={{ display: "contents" }}>
          <div
            style={{
              flexBasis: `${sizes[i]}%`,
              flexGrow: 0,
              flexShrink: 0,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: transitioning ? "flex-basis 200ms ease" : undefined,
              ...(panelStyle?.[i] ?? {}),
            }}
          >
            {child}
          </div>
          {i < children.length - 1 && (
            <Handle
              direction={direction}
              withHandle={withHandle}
              onDrag={(delta) => handleDrag(i, delta)}
              collapsed={collapsible ? collapsed : null}
              onToggleCollapse={collapsible ? () => handleCollapse(i) : undefined}
            />
          )}
        </div>
      ))}
    </div>
  )
}

// ================================================================== //
// HANDLE                                                               //
// ================================================================== //

function Handle({
  direction,
  withHandle,
  onDrag,
  collapsed,
  onToggleCollapse,
}: {
  direction: "horizontal" | "vertical"
  withHandle?: boolean | "dots"
  onDrag: (delta: number) => void
  collapsed?: "left" | "right" | null
  onToggleCollapse?: () => void
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const lastPos = useRef(0)
  const isHorizontal = direction === "horizontal"

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault()
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
      setIsDragging(true)
      lastPos.current = isHorizontal ? e.clientX : e.clientY
    },
    [isHorizontal],
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return
      const current = isHorizontal ? e.clientX : e.clientY
      const delta = current - lastPos.current
      lastPos.current = current
      onDrag(delta)
    },
    [isDragging, isHorizontal, onDrag],
  )

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleDoubleClick = useCallback(() => {
    onToggleCollapse?.()
  }, [onToggleCollapse])

  const active = isDragging || isHovered
  const hasGrip = withHandle === true || withHandle === "dots"
  const zoneSize = hasGrip ? 12 : 8

  const lineColor = isDragging ? "#262626" : isHovered ? "#E5E5E5" : "#F0F0F0"
  const lineWidth = active ? 2 : 1

  const gripContent = () => {
    if (collapsed) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={onToggleCollapse}
        >
          {collapsed === "left" ? (
            <ChevronRight size={12} color="#838383" />
          ) : (
            <ChevronLeft size={12} color="#838383" />
          )}
        </div>
      )
    }

    if (withHandle === "dots") {
      const dotColor = isDragging ? "#262626" : isHovered ? "#C0C0C0" : "#C0C0C0"
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3px 3px",
            gridTemplateRows: "3px 3px 3px",
            gap: 3,
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: dotColor,
              }}
            />
          ))}
        </div>
      )
    }

    if (withHandle === true) {
      const pillColor = isDragging ? "#262626" : isHovered ? "#C0C0C0" : "#E5E5E5"
      return (
        <div
          style={
            isHorizontal
              ? { width: 4, height: 28, borderRadius: 2, background: pillColor, transition: "background 100ms ease" }
              : { width: 28, height: 4, borderRadius: 2, background: pillColor, transition: "background 100ms ease" }
          }
        />
      )
    }

    return null
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: isDragging ? "grabbing" : isHorizontal ? "col-resize" : "row-resize",
        flexShrink: 0,
        userSelect: "none",
        ...(isHorizontal
          ? { width: hasGrip ? zoneSize : zoneSize, height: "100%", position: "relative" as const }
          : { height: hasGrip ? zoneSize : zoneSize, width: "100%", position: "relative" as const }),
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDoubleClick={handleDoubleClick}
    >
      {!hasGrip && !collapsed && (
        <div
          style={{
            position: "absolute",
            ...(isHorizontal
              ? { width: lineWidth, height: "100%", left: "50%", transform: "translateX(-50%)" }
              : { height: lineWidth, width: "100%", top: "50%", transform: "translateY(-50%)" }),
            background: lineColor,
            transition: "background 100ms ease",
          }}
        />
      )}
      {(hasGrip || collapsed) && gripContent()}
    </div>
  )
}

// ================================================================== //
// MULTI SPLIT PANEL — for 3+ panels                                    //
// ================================================================== //

function MultiSplitPanel({
  direction,
  initialSizes,
  minSizes,
  children,
  panelStyle,
  containerStyle,
  withHandle,
  onSizesChange,
}: {
  direction: "horizontal" | "vertical"
  initialSizes: number[]
  minSizes?: number[]
  children: React.ReactNode[]
  panelStyle?: React.CSSProperties[]
  containerStyle?: React.CSSProperties
  withHandle?: boolean | "dots"
  onSizesChange?: (sizes: number[]) => void
}) {
  const [sizes, setSizes] = useState(initialSizes)
  const containerRef = useRef<HTMLDivElement>(null)
  const isHorizontal = direction === "horizontal"

  const handleDrag = useCallback(
    (index: number, delta: number) => {
      if (!containerRef.current) return
      const containerSize = isHorizontal
        ? containerRef.current.offsetWidth
        : containerRef.current.offsetHeight
      const pctDelta = (delta / containerSize) * 100

      setSizes((prev) => {
        const next = [...prev]
        const mins = minSizes ?? prev.map(() => 0)

        let newA = prev[index] + pctDelta
        let newB = prev[index + 1] - pctDelta

        if (newA < mins[index]) {
          newA = mins[index]
          newB = prev[index] + prev[index + 1] - newA
        }
        if (newB < mins[index + 1]) {
          newB = mins[index + 1]
          newA = prev[index] + prev[index + 1] - newB
        }

        next[index] = newA
        next[index + 1] = newB
        return next
      })
    },
    [isHorizontal, minSizes],
  )

  useEffect(() => {
    onSizesChange?.(sizes)
  }, [sizes, onSizesChange])

  const elements: React.ReactNode[] = []
  children.forEach((child, i) => {
    elements.push(
      <div
        key={`panel-${i}`}
        style={{
          flexBasis: `${sizes[i]}%`,
          flexGrow: 0,
          flexShrink: 0,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...(panelStyle?.[i] ?? {}),
        }}
      >
        {child}
      </div>,
    )
    if (i < children.length - 1) {
      elements.push(
        <Handle
          key={`handle-${i}`}
          direction={direction}
          withHandle={withHandle}
          onDrag={(delta) => handleDrag(i, delta)}
        />,
      )
    }
  })

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: isHorizontal ? "row" : "column",
        width: "100%",
        height: "100%",
        ...containerStyle,
      }}
    >
      {elements}
    </div>
  )
}

// ================================================================== //
// SHARED STYLES                                                        //
// ================================================================== //

const containerBase: React.CSSProperties = {
  width: "100%",
  border: "0.8px solid #F0F0F0",
  borderRadius: 10,
  overflow: "hidden",
}

const panelLabelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  color: "#838383",
}

// ================================================================== //
// SECTION 1: Default                                                   //
// ================================================================== //

function DefaultSection() {
  return (
    <PreviewSection label="Default" wrapClassName="flex flex-col items-stretch w-full">
      <div style={{ ...containerBase, height: 200 }}>
        <SplitPanel
          direction="horizontal"
          initialSizes={[50, 50]}
          panelStyle={[{ background: "#FAFAFA" }, { background: "#FFFFFF" }]}
        >
          <span style={panelLabelStyle}>Panel A</span>
          <span style={panelLabelStyle}>Panel B</span>
        </SplitPanel>
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 2: With Handle                                               //
// ================================================================== //

function WithHandleSection() {
  return (
    <PreviewSection label="With Handle" wrapClassName="flex flex-col items-stretch w-full">
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Pill grip */}
        <div style={{ ...containerBase, height: 200 }}>
          <SplitPanel
            direction="horizontal"
            initialSizes={[50, 50]}
            withHandle={true}
            panelStyle={[{ background: "#FAFAFA" }, { background: "#FFFFFF" }]}
          >
            <span style={panelLabelStyle}>Panel A</span>
            <span style={panelLabelStyle}>Panel B</span>
          </SplitPanel>
        </div>
        {/* Dots grip */}
        <div style={{ ...containerBase, height: 200 }}>
          <SplitPanel
            direction="horizontal"
            initialSizes={[50, 50]}
            withHandle="dots"
            panelStyle={[{ background: "#FAFAFA" }, { background: "#FFFFFF" }]}
          >
            <span style={panelLabelStyle}>Panel A</span>
            <span style={panelLabelStyle}>Panel B</span>
          </SplitPanel>
        </div>
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 3: Vertical                                                  //
// ================================================================== //

function VerticalSection() {
  return (
    <PreviewSection label="Vertical" wrapClassName="flex flex-col items-stretch w-full">
      <div style={{ ...containerBase, height: 280 }}>
        <SplitPanel
          direction="vertical"
          initialSizes={[60, 40]}
          withHandle={true}
          panelStyle={[{ background: "#FAFAFA" }, { background: "#FFFFFF" }]}
        >
          <span style={panelLabelStyle}>Header</span>
          <span style={panelLabelStyle}>Content</span>
        </SplitPanel>
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 4: Three Panels                                              //
// ================================================================== //

function ThreePanelsSection() {
  const sidebarItems = ["Dashboard", "Projects", "Settings", "Help"]

  return (
    <PreviewSection label="Three Panels" wrapClassName="flex flex-col items-stretch w-full">
      <div style={{ ...containerBase, height: 240 }}>
        <MultiSplitPanel
          direction="horizontal"
          initialSizes={[25, 50, 25]}
          minSizes={[15, 30, 15]}
          panelStyle={[
            { background: "#FAFAFA", alignItems: "stretch", justifyContent: "flex-start" },
            { background: "#FFFFFF" },
            { background: "#FAFAFA" },
          ]}
        >
          <div style={{ width: "100%" }}>
            <div style={{ fontSize: 12.3, fontWeight: 500, color: "#262626", padding: "10px 12px" }}>
              Sidebar
            </div>
            {sidebarItems.map((item) => (
              <div
                key={item}
                style={{ fontSize: 12.3, fontWeight: 400, color: "#838383", padding: "4px 12px" }}
              >
                {item}
              </div>
            ))}
          </div>
          <span style={panelLabelStyle}>Main Content</span>
          <span style={panelLabelStyle}>Inspector</span>
        </MultiSplitPanel>
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 5: Nested                                                    //
// ================================================================== //

function NestedSection() {
  return (
    <PreviewSection label="Nested" wrapClassName="flex flex-col items-stretch w-full">
      <div style={{ ...containerBase, height: 280 }}>
        <SplitPanel
          direction="horizontal"
          initialSizes={[30, 70]}
          panelStyle={[
            { background: "#FAFAFA" },
            { alignItems: "stretch", justifyContent: "stretch" },
          ]}
        >
          <span style={panelLabelStyle}>Sidebar</span>
          <div style={{ width: "100%", height: "100%" }}>
            <SplitPanel
              direction="vertical"
              initialSizes={[60, 40]}
              withHandle={true}
              panelStyle={[{ background: "#FFFFFF" }, { background: "#FAFAFA" }]}
            >
              <span style={panelLabelStyle}>Editor</span>
              <span style={panelLabelStyle}>Terminal</span>
            </SplitPanel>
          </div>
        </SplitPanel>
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 6: With Collapse                                             //
// ================================================================== //

function WithCollapseSection() {
  return (
    <PreviewSection label="With Collapse" wrapClassName="flex flex-col items-stretch w-full">
      <div style={{ ...containerBase, height: 200 }}>
        <SplitPanel
          direction="horizontal"
          initialSizes={[50, 50]}
          collapsible
          panelStyle={[{ background: "#FAFAFA" }, { background: "#FFFFFF" }]}
        >
          <span style={panelLabelStyle}>Panel A</span>
          <span style={panelLabelStyle}>Panel B</span>
        </SplitPanel>
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 7: Interactive (IDE layout)                                   //
// ================================================================== //

const titleBarStyle: React.CSSProperties = {
  height: 28,
  display: "flex",
  alignItems: "center",
  padding: "0 10px",
  fontSize: 11,
  fontWeight: 500,
  flexShrink: 0,
}

const fileItemStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  gap: 6,
  alignItems: "center",
  padding: "3px 10px",
  fontSize: 12.3,
  fontWeight: 400,
  color: "#262626",
  cursor: "pointer",
}

const codeLines = [
  { tokens: [{ text: "import", color: "#8B5CF6" }, { text: " { useState } ", color: "#262626" }, { text: "from", color: "#8B5CF6" }, { text: " 'react'", color: "#0D9488" }] },
  { tokens: [{ text: "", color: "#262626" }] },
  { tokens: [{ text: "export function", color: "#8B5CF6" }, { text: " App() {", color: "#262626" }] },
  { tokens: [{ text: "  const", color: "#8B5CF6" }, { text: " [count, setCount] = ", color: "#262626" }, { text: "useState", color: "#2563EB" }, { text: "(0)", color: "#262626" }] },
  { tokens: [{ text: "", color: "#262626" }] },
  { tokens: [{ text: "  return", color: "#8B5CF6" }, { text: " (", color: "#262626" }] },
  { tokens: [{ text: "    <", color: "#262626" }, { text: "div", color: "#2563EB" }, { text: ">", color: "#262626" }] },
  { tokens: [{ text: "      <", color: "#262626" }, { text: "h1", color: "#2563EB" }, { text: ">Count: {count}</", color: "#262626" }, { text: "h1", color: "#2563EB" }, { text: ">", color: "#262626" }] },
  { tokens: [{ text: "    </", color: "#262626" }, { text: "div", color: "#2563EB" }, { text: ">", color: "#262626" }] },
  { tokens: [{ text: "  )", color: "#262626" }] },
  { tokens: [{ text: "}", color: "#262626" }] },
]

const terminalLines = [
  "$ npm run dev",
  "\u25B6 Ready on http://localhost:3000",
  "\u2713 Compiled in 245ms",
]

const fileTree = [
  { name: "src/", icon: FolderOpen, indent: 0 },
  { name: "\u251C App.tsx", icon: FileText, indent: 1 },
  { name: "\u251C index.ts", icon: File, indent: 1 },
  { name: "\u251C utils.ts", icon: File, indent: 1 },
  { name: "components/", icon: FolderOpen, indent: 0 },
  { name: "\u251C Button.tsx", icon: FileText, indent: 1 },
  { name: "\u251C Input.tsx", icon: FileText, indent: 1 },
]

function InteractiveSection() {
  const [explorerSize, setExplorerSize] = useState(25)
  const [editorSize, setEditorSize] = useState(65)
  const [terminalSize, setTerminalSize] = useState(35)

  const handleOuterSizes = useCallback((sizes: number[]) => {
    setExplorerSize(Math.round(sizes[0]))
  }, [])

  const handleInnerSizes = useCallback((sizes: number[]) => {
    const rightPanelPct = 100 - explorerSize
    setEditorSize(Math.round(sizes[0]))
    setTerminalSize(Math.round(sizes[1]))
  }, [explorerSize])

  const editorDisplayPct = Math.round(editorSize * (100 - explorerSize) / 100)
  const terminalDisplayPct = 100 - explorerSize - editorDisplayPct

  return (
    <PreviewSection label="Interactive" wrapClassName="flex flex-col items-stretch w-full">
      <div style={{ ...containerBase, height: 320 }}>
        <SplitPanel
          direction="horizontal"
          initialSizes={[25, 75]}
          onSizesChange={handleOuterSizes}
          panelStyle={[
            { background: "#FAFAFA", alignItems: "stretch", justifyContent: "flex-start" },
            { alignItems: "stretch", justifyContent: "stretch" },
          ]}
        >
          {/* Explorer panel */}
          <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ ...titleBarStyle, background: "#F0F0F0", color: "#838383" }}>
              Explorer
            </div>
            <div style={{ padding: 6, flex: 1 }}>
              {fileTree.map((file, i) => {
                const Icon = file.icon
                return (
                  <div key={i} style={{ ...fileItemStyle, paddingLeft: file.indent ? 22 : 10 }}>
                    <Icon size={12} color="#838383" />
                    <span>{file.name}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right side — editor + terminal */}
          <div style={{ width: "100%", height: "100%" }}>
            <SplitPanel
              direction="vertical"
              initialSizes={[65, 35]}
              withHandle={true}
              onSizesChange={handleInnerSizes}
              panelStyle={[
                { alignItems: "stretch", justifyContent: "flex-start" },
                { alignItems: "stretch", justifyContent: "flex-start" },
              ]}
            >
              {/* Editor */}
              <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ ...titleBarStyle, background: "#F0F0F0", color: "#838383" }}>
                  Editor
                </div>
                <div
                  style={{
                    background: "#FAFAFA",
                    padding: 12,
                    fontFamily: "monospace",
                    fontSize: 12,
                    lineHeight: 1.6,
                    color: "#262626",
                    flex: 1,
                    overflow: "auto",
                  }}
                >
                  {codeLines.map((line, lineIdx) => (
                    <div key={lineIdx}>
                      {line.tokens.map((token, tokenIdx) => (
                        <span key={tokenIdx} style={{ color: token.color }}>
                          {token.text}
                        </span>
                      ))}
                      {line.tokens.length === 1 && line.tokens[0].text === "" && "\u00A0"}
                    </div>
                  ))}
                </div>
              </div>

              {/* Terminal */}
              <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ ...titleBarStyle, background: "#262626", color: "#FFFFFF" }}>
                  Terminal
                </div>
                <div
                  style={{
                    background: "#1A1A1A",
                    padding: 12,
                    fontFamily: "monospace",
                    fontSize: 12,
                    lineHeight: 1.6,
                    color: "#14B8A6",
                    flex: 1,
                    overflow: "auto",
                  }}
                >
                  {terminalLines.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            </SplitPanel>
          </div>
        </SplitPanel>
      </div>

      {/* Size readout */}
      <div
        style={{
          marginTop: 8,
          fontFamily: "monospace",
          fontSize: 12.3,
          color: "#838383",
          textAlign: "center",
        }}
      >
        Explorer: {explorerSize}% | Editor: {editorDisplayPct}% | Terminal: {terminalDisplayPct}%
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
      <WithHandleSection />
      <VerticalSection />
      <ThreePanelsSection />
      <NestedSection />
      <WithCollapseSection />
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
      packageName="@hyena/resizable"
      importCode={`import {\n  ResizablePanelGroup,\n  ResizablePanel,\n  ResizableHandle,\n} from "@/components/ui/resizable"`}
      usageCode={`<ResizablePanelGroup direction="horizontal">\n  <ResizablePanel defaultSize={50}>Left panel</ResizablePanel>\n  <ResizableHandle />\n  <ResizablePanel defaultSize={50}>Right panel</ResizablePanel>\n</ResizablePanelGroup>\n\n// Three panels\n<ResizablePanelGroup direction="horizontal">\n  <ResizablePanel defaultSize={25} minSize={15}>Sidebar</ResizablePanel>\n  <ResizableHandle withHandle />\n  <ResizablePanel defaultSize={50} minSize={30}>Main</ResizablePanel>\n  <ResizableHandle withHandle />\n  <ResizablePanel defaultSize={25} minSize={15}>Inspector</ResizablePanel>\n</ResizablePanelGroup>`}
    />
  )
}

// ================================================================== //
// API TAB                                                              //
// ================================================================== //

const PANEL_GROUP_PROPS: PropDef[] = [
  { prop: "direction", type: '"horizontal" | "vertical"', defaultVal: '"horizontal"' },
  { prop: "children", type: "ReactNode", defaultVal: "\u2014" },
  { prop: "onLayout", type: "(sizes: number[]) => void", defaultVal: "\u2014" },
  { prop: "className", type: "string", defaultVal: "\u2014" },
]

const PANEL_PROPS: PropDef[] = [
  { prop: "defaultSize", type: "number", defaultVal: "auto" },
  { prop: "minSize", type: "number", defaultVal: "0" },
  { prop: "maxSize", type: "number", defaultVal: "100" },
  { prop: "collapsible", type: "boolean", defaultVal: "false" },
  { prop: "onCollapse", type: "() => void", defaultVal: "\u2014" },
  { prop: "onExpand", type: "() => void", defaultVal: "\u2014" },
  { prop: "children", type: "ReactNode", defaultVal: "\u2014" },
]

const HANDLE_PROPS: PropDef[] = [
  { prop: "withHandle", type: "boolean", defaultVal: "false" },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
  { prop: "className", type: "string", defaultVal: "\u2014" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Resizable"
      description="Drag-to-resize panels with handles for building split-view layouts, IDE-like interfaces, and adjustable dashboards."
      props={PANEL_GROUP_PROPS}
      extraSections={
        <>
          <div style={{ marginTop: 28 }}>
            <LabelPill text="ResizablePanel" />
            <div style={{ marginTop: 12, width: "100%" }}>
              <PropsTable props={PANEL_PROPS} />
            </div>
          </div>
          <div style={{ marginTop: 28 }}>
            <LabelPill text="ResizableHandle" />
            <div style={{ marginTop: 12, width: "100%" }}>
              <PropsTable props={HANDLE_PROPS} />
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
  type: "Layout",
  variants: "7",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Frame", href: "/components/frame" },
    { label: "Group", href: "/components/group" },
    { label: "Scroll Area", href: "/components/scroll-area" },
  ],
  tokens: [
    { name: "--handle-bg", color: "#F0F0F0", border: true },
    { name: "--handle-hover", color: "#E5E5E5" },
    { name: "--handle-active", color: "#262626" },
    { name: "--grip-color", color: "#E5E5E5", border: true },
    { name: "--panel-bg", color: "#FFFFFF", border: true },
    { name: "--panel-alt-bg", color: "#FAFAFA" },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function ResizablePage() {
  return (
    <ComponentPageLayout
      name="Resizable"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
