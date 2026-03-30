"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  ArrowLeft, ArrowRight, RotateCw, Star, Clipboard, Scissors, ClipboardPaste,
  ZoomIn, ZoomOut, Maximize2, FilePlus, FolderPlus, Share2, Mail, MessageSquare,
  Link, Download, Eye, ExternalLink, Pencil, Copy, Pin, Trash2, ChevronRight, FileText,
} from "lucide-react"
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
// DESIGN TOKENS                                                       //
// ================================================================== //

const menuPanel: React.CSSProperties = {
  width: 220,
  background: "#FFFFFF",
  border: "0.8px solid #F0F0F0",
  borderRadius: 10,
  boxShadow: "0 4px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.03)",
  padding: 4,
}

const menuItem: React.CSSProperties = {
  height: 32,
  padding: "0 10px",
  display: "flex",
  alignItems: "center",
  gap: 10,
  fontSize: 13,
  fontWeight: 400,
  color: "#262626",
  borderRadius: 8,
  cursor: "pointer",
}

const shortcutStyle: React.CSSProperties = {
  marginLeft: "auto",
  fontSize: 11,
  fontWeight: 400,
  color: "#A1A1A1",
  fontFamily: "monospace",
}

const groupLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 500,
  color: "#838383",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  padding: "6px 10px 4px",
}

const triggerZone: React.CSSProperties = {
  width: "100%",
  height: 160,
  border: "1.5px dashed #E5E5E5",
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "context-menu",
  position: "relative" as const,
}

const triggerText: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 400,
  color: "#838383",
}

// ================================================================== //
// HELPER COMPONENTS                                                   //
// ================================================================== //

function MenuItemRow({ icon: Icon, label, shortcutText, disabled, danger, checked, radio, hasSubmenu, onClick, onMouseEnter, onMouseLeave }: {
  icon?: React.ComponentType<{ size: number; style?: React.CSSProperties }>
  label: string
  shortcutText?: string
  disabled?: boolean
  danger?: boolean
  checked?: boolean
  radio?: boolean
  hasSubmenu?: boolean
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const color = danger ? "#D5143E" : "#262626"
  const iconColor = danger ? "#D5143E" : "#838383"

  return (
    <div
      style={{
        ...menuItem,
        background: hovered && !disabled ? (danger ? "rgba(213,20,62,0.12)" : "#F0F0F0") : "transparent",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        color,
      }}
      onMouseEnter={() => { setHovered(true); onMouseEnter?.() }}
      onMouseLeave={() => { setHovered(false); onMouseLeave?.() }}
      onClick={disabled ? undefined : onClick}
    >
      {checked !== undefined && (
        <div style={{ width: 14, height: 14, borderRadius: 4, border: checked ? "none" : "0.8px solid #D4D4D4", background: checked ? "#14B8A6" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {checked && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        </div>
      )}
      {radio !== undefined && (
        <div style={{ width: 14, height: 14, borderRadius: 7, border: radio ? "2px solid #262626" : "0.8px solid #D4D4D4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {radio && <div style={{ width: 6, height: 6, borderRadius: 3, background: "#262626" }} />}
        </div>
      )}
      {Icon && <Icon size={14} style={{ color: iconColor, flexShrink: 0 }} />}
      <span>{label}</span>
      {shortcutText && <span style={shortcutStyle}>{shortcutText}</span>}
      {hasSubmenu && <ChevronRight size={12} style={{ color: "#A1A1A1", marginLeft: "auto" }} />}
    </div>
  )
}

function MenuSep() {
  return <div style={{ height: "0.8px", background: "#F0F0F0", margin: "4px 0" }} />
}

// ================================================================== //
// CONTEXT MENU WRAPPER                                                //
// ================================================================== //

function ContextMenuDemo({ triggerLabel, triggerContent, children, triggerStyle }: {
  triggerLabel?: string
  triggerContent?: React.ReactNode
  children: (pos: { x: number; y: number }, close: () => void) => React.ReactNode
  triggerStyle?: React.CSSProperties
}) {
  const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const x = Math.min(e.clientX - rect.left, rect.width - 230)
      const y = Math.min(e.clientY - rect.top, rect.height - 40)
      setMenuPos({ x, y })
    }
  }, [])

  useEffect(() => {
    if (!menuPos) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMenuPos(null)
      }
    }
    const escHandler = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuPos(null) }
    document.addEventListener("mousedown", handler)
    document.addEventListener("keydown", escHandler)
    return () => {
      document.removeEventListener("mousedown", handler)
      document.removeEventListener("keydown", escHandler)
    }
  }, [menuPos])

  return (
    <div ref={containerRef} style={triggerStyle ?? { ...triggerZone, position: "relative" }} onContextMenu={handleContextMenu}>
      {triggerLabel && <span style={triggerText}>{triggerLabel}</span>}
      {triggerContent}
      {menuPos && (
        <div style={{ position: "absolute", left: menuPos.x, top: menuPos.y, zIndex: 10 }} onClick={() => setMenuPos(null)}>
          {children(menuPos, () => setMenuPos(null))}
        </div>
      )}
    </div>
  )
}

// ================================================================== //
// SECTIONS                                                            //
// ================================================================== //

function DefaultSection() {
  return (
    <ContextMenuDemo triggerLabel="Right click here">
      {() => (
        <div style={menuPanel}>
          <MenuItemRow icon={ArrowLeft} label="Back" shortcutText="⌘[" />
          <MenuItemRow icon={ArrowRight} label="Forward" shortcutText="⌘]" disabled />
          <MenuItemRow icon={RotateCw} label="Reload" shortcutText="⌘R" />
          <MenuSep />
          <MenuItemRow icon={Star} label="Add to Favourites" />
          <MenuItemRow icon={Clipboard} label="Copy Link" shortcutText="⌘C" />
        </div>
      )}
    </ContextMenuDemo>
  )
}

function WithGroupsSection() {
  return (
    <ContextMenuDemo triggerLabel="Right click for options">
      {() => (
        <div style={menuPanel}>
          <div style={groupLabel}>Edit</div>
          <MenuItemRow icon={Scissors} label="Cut" shortcutText="⌘X" />
          <MenuItemRow icon={Copy} label="Copy" shortcutText="⌘C" />
          <MenuItemRow icon={ClipboardPaste} label="Paste" shortcutText="⌘V" />
          <MenuSep />
          <div style={groupLabel}>View</div>
          <MenuItemRow icon={ZoomIn} label="Zoom In" shortcutText="⌘+" />
          <MenuItemRow icon={ZoomOut} label="Zoom Out" shortcutText="⌘-" />
          <MenuItemRow icon={Maximize2} label="Actual Size" shortcutText="⌘0" />
        </div>
      )}
    </ContextMenuDemo>
  )
}

function WithSubmenuSection() {
  const [showSubmenu, setShowSubmenu] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setShowSubmenu(true), 150)
  }
  const handleLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setShowSubmenu(false), 150)
  }

  return (
    <ContextMenuDemo triggerLabel="Right click for file options">
      {() => (
        <div style={{ position: "relative" }}>
          <div style={menuPanel}>
            <MenuItemRow icon={FilePlus} label="New File" shortcutText="⌘N" />
            <MenuItemRow icon={FolderPlus} label="New Folder" shortcutText="⇧⌘N" />
            <MenuSep />
            <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
              <MenuItemRow icon={Share2} label="Share" hasSubmenu />
              {showSubmenu && (
                <div style={{ ...menuPanel, width: 180, position: "absolute", left: 216, top: 72, zIndex: 20 }}>
                  <MenuItemRow icon={Mail} label="Email" />
                  <MenuItemRow icon={MessageSquare} label="Message" />
                  <MenuItemRow icon={Link} label="Copy Link" />
                </div>
              )}
            </div>
            <MenuSep />
            <MenuItemRow icon={Download} label="Download" />
          </div>
        </div>
      )}
    </ContextMenuDemo>
  )
}

function WithCheckboxSection() {
  const [showGrid, setShowGrid] = useState(true)
  const [showRulers, setShowRulers] = useState(false)
  const [snapToGrid, setSnapToGrid] = useState(true)
  const [autoSave, setAutoSave] = useState(false)

  return (
    <ContextMenuDemo triggerLabel="Right click for view options">
      {() => (
        <div style={menuPanel}>
          <MenuItemRow checked={showGrid} label="Show Grid" onClick={() => setShowGrid(!showGrid)} />
          <MenuItemRow checked={showRulers} label="Show Rulers" onClick={() => setShowRulers(!showRulers)} />
          <MenuItemRow checked={snapToGrid} label="Snap to Grid" onClick={() => setSnapToGrid(!snapToGrid)} />
          <MenuSep />
          <div
            style={{ ...menuItem, justifyContent: "space-between", cursor: "pointer" }}
            onClick={() => setAutoSave(!autoSave)}
          >
            <span>Auto-save</span>
            <span
              style={{
                width: 32,
                height: 18,
                borderRadius: 9,
                background: autoSave ? "#262626" : "#F0F0F0",
                position: "relative",
                transition: "background 200ms",
                flexShrink: 0,
                display: "inline-block",
              }}
            >
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  background: "white",
                  position: "absolute",
                  top: 2,
                  left: autoSave ? 16 : 2,
                  transition: "left 200ms",
                }}
              />
            </span>
          </div>
        </div>
      )}
    </ContextMenuDemo>
  )
}

function WithRadioSection() {
  const [alignment, setAlignment] = useState("left")
  const [size, setSize] = useState("medium")

  return (
    <ContextMenuDemo triggerLabel="Right click for alignment">
      {() => (
        <div style={menuPanel}>
          <div style={groupLabel}>Alignment</div>
          <MenuItemRow radio={alignment === "left"} label="Left" onClick={() => setAlignment("left")} />
          <MenuItemRow radio={alignment === "center"} label="Center" onClick={() => setAlignment("center")} />
          <MenuItemRow radio={alignment === "right"} label="Right" onClick={() => setAlignment("right")} />
          <MenuSep />
          <div style={groupLabel}>Size</div>
          <MenuItemRow radio={size === "small"} label="Small" onClick={() => setSize("small")} />
          <MenuItemRow radio={size === "medium"} label="Medium" onClick={() => setSize("medium")} />
          <MenuItemRow radio={size === "large"} label="Large" onClick={() => setSize("large")} />
        </div>
      )}
    </ContextMenuDemo>
  )
}

function DangerZoneSection() {
  return (
    <ContextMenuDemo triggerLabel="Right click for actions">
      {() => (
        <div style={menuPanel}>
          <MenuItemRow icon={Pencil} label="Rename" />
          <MenuItemRow icon={Copy} label="Duplicate" />
          <MenuItemRow icon={Pin} label="Pin to Top" />
          <MenuSep />
          <div style={{ background: "rgba(213,20,62,0.08)", borderRadius: 8, padding: 2, margin: "0 -2px" }}>
            <MenuItemRow icon={Trash2} label="Delete" danger />
          </div>
        </div>
      )}
    </ContextMenuDemo>
  )
}


// ================================================================== //
// CAP DATA                                                            //
// ================================================================== //

const capData: CAPData = {
  type: "Overlay",
  variants: "7",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Menu", href: "/components/menu" },
    { label: "Popover", href: "/components/popover" },
    { label: "Command", href: "/components/command" },
  ],
  tokens: [
    { name: "--menu-bg", color: "#FFFFFF", border: true },
    { name: "--border", color: "#F0F0F0", border: true },
    { name: "--foreground", color: "#262626" },
    { name: "--muted-fg", color: "#838383" },
    { name: "--danger", color: "#D5143E" },
  ],
}

// ================================================================== //
// API PROPS                                                           //
// ================================================================== //

const contextMenuProps: PropDef[] = [
  { prop: "children", type: "ReactNode", defaultVal: "\u2014" },
]

const triggerProps: PropDef[] = [
  { prop: "children", type: "ReactNode", defaultVal: "\u2014" },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
  { prop: "asChild", type: "boolean", defaultVal: "false" },
]

const itemProps: PropDef[] = [
  { prop: "shortcut", type: "string", defaultVal: "\u2014" },
  { prop: "icon", type: "ReactNode", defaultVal: "\u2014" },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
  { prop: "variant", type: '"default" | "destructive"', defaultVal: '"default"' },
  { prop: "onSelect", type: "() => void", defaultVal: "\u2014" },
]

const checkboxItemProps: PropDef[] = [
  { prop: "checked", type: "boolean", defaultVal: "false" },
  { prop: "onCheckedChange", type: "(checked: boolean) => void", defaultVal: "\u2014" },
]

// ================================================================== //
// CONTEXT MENU PAGE                                                   //
// ================================================================== //

export function ContextMenuPage() {
  return (
    <ComponentPageLayout
      name="Context Menu"
      capContent={<ComponentCAP data={capData} />}
      previewContent={
        <div className="flex flex-col" style={{ gap: "28px" }}>
          <PreviewSection label="Default">
            <DefaultSection />
          </PreviewSection>

          <PreviewSection label="With Groups">
            <WithGroupsSection />
          </PreviewSection>

          <PreviewSection label="With Submenu">
            <WithSubmenuSection />
          </PreviewSection>

          <PreviewSection label="With Checkboxes">
            <WithCheckboxSection />
          </PreviewSection>

          <PreviewSection label="With Radio">
            <WithRadioSection />
          </PreviewSection>

          <PreviewSection label="Danger Zone">
            <DangerZoneSection />
          </PreviewSection>

          <PreviewSection label="Interactive">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: "100%" }}>
              <div style={{ position: "relative", width: "100%" }}>
                <InteractiveFileCard />
              </div>
            </div>
          </PreviewSection>
        </div>
      }
      codeContent={
        <StandardCodeTab
          packageName="@hyena/context-menu"
          importCode={`import {\n  ContextMenu,\n  ContextMenuTrigger,\n  ContextMenuContent,\n  ContextMenuItem,\n  ContextMenuSeparator,\n} from "@/components/ui/context-menu"`}
          usageCode={`<ContextMenu>\n  <ContextMenuTrigger>\n    <div>Right click me</div>\n  </ContextMenuTrigger>\n  <ContextMenuContent>\n    <ContextMenuItem>Cut</ContextMenuItem>\n    <ContextMenuItem>Copy</ContextMenuItem>\n    <ContextMenuItem>Paste</ContextMenuItem>\n    <ContextMenuSeparator />\n    <ContextMenuItem variant="destructive">Delete</ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenu>`}
        />
      }
      apiContent={
        <StandardApiTab
          name="Context Menu"
          description="A right-click triggered menu that surfaces contextual actions with groups, separators, shortcuts, and submenus."
          props={contextMenuProps}
          extraSections={
            <>
              <div style={{ marginTop: 28 }}>
                <LabelPill text="ContextMenuTrigger" />
                <div style={{ marginTop: 12, width: "100%" }}>
                  <PropsTable props={triggerProps} />
                </div>
              </div>
              <div style={{ marginTop: 28 }}>
                <LabelPill text="ContextMenuItem" />
                <div style={{ marginTop: 12, width: "100%" }}>
                  <PropsTable props={itemProps} />
                </div>
              </div>
              <div style={{ marginTop: 28 }}>
                <LabelPill text="ContextMenuCheckboxItem" />
                <div style={{ marginTop: 12, width: "100%" }}>
                  <PropsTable props={checkboxItemProps} />
                </div>
              </div>
            </>
          }
        />
      }
    />
  )
}

// ================================================================== //
// INTERACTIVE FILE CARD (Section 7)                                   //
// ================================================================== //

function InteractiveFileCard() {
  const [showSubmenu, setShowSubmenu] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setShowSubmenu(true), 150)
  }
  const handleLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setShowSubmenu(false), 150)
  }

  const fileCard: React.CSSProperties = {
    width: "100%",
    height: 200,
    background: "#FAFAFA",
    border: "0.8px solid #F0F0F0",
    borderRadius: 10,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    cursor: "context-menu",
    position: "relative",
  }

  return (
    <ContextMenuDemo
      triggerStyle={fileCard}
      triggerContent={
        <>
          <FileText size={32} style={{ color: "#838383" }} />
          <span style={{ fontSize: 13, fontWeight: 500, color: "#262626" }}>design-system.fig</span>
          <span style={{ fontSize: 11, color: "#838383" }}>2.4 MB</span>
          <span style={{ fontSize: 11, color: "#838383" }}>Mar 28, 2026</span>
        </>
      }
    >
      {() => (
        <div style={{ position: "relative" }}>
          <div style={menuPanel}>
            <MenuItemRow icon={Eye} label="Preview" shortcutText="Space" />
            <MenuItemRow icon={ExternalLink} label="Open in New Tab" shortcutText="⌘Enter" />
            <MenuSep />
            <MenuItemRow icon={Pencil} label="Rename" shortcutText="F2" />
            <MenuItemRow icon={Copy} label="Duplicate" shortcutText="⌘D" />
            <div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
              <MenuItemRow icon={FolderPlus} label="Move to" hasSubmenu />
              {showSubmenu && (
                <div style={{ ...menuPanel, width: 160, position: "absolute", left: 216, top: 104, zIndex: 20 }}>
                  <MenuItemRow label="Desktop" />
                  <MenuItemRow label="Documents" />
                  <MenuItemRow label="Downloads" />
                </div>
              )}
            </div>
            <MenuSep />
            <MenuItemRow icon={Download} label="Download" />
            <MenuItemRow icon={Link} label="Copy Link" shortcutText="⌘⇧C" />
            <MenuSep />
            <div style={{ background: "rgba(213,20,62,0.08)", borderRadius: 8, padding: 2, margin: "0 -2px" }}>
              <MenuItemRow icon={Trash2} label="Delete" shortcutText="⌘⌫" danger />
            </div>
          </div>
        </div>
      )}
    </ContextMenuDemo>
  )
}
