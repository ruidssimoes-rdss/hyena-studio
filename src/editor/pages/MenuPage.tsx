"use client"

import { useState, useRef, useEffect } from "react"
import {
  Pencil, Copy, Share2, Bookmark, Archive, Trash2, ChevronRight, Check,
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
  minWidth: 200,
  background: "#FFFFFF",
  border: "0.8px solid #F0F0F0",
  borderRadius: 10,
  boxShadow: "0 4px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.03)",
  padding: 4,
}

const outlineBtn: React.CSSProperties = {
  height: 28,
  padding: "0 14px",
  borderRadius: 10,
  border: "0.8px solid #F0F0F0",
  background: "white",
  fontSize: 12.3,
  fontWeight: 500,
  color: "#262626",
  cursor: "pointer",
  fontFamily: "inherit",
}

// ================================================================== //
// HELPER COMPONENTS                                                   //
// ================================================================== //

function MenuItemRow({
  icon,
  label,
  shortcut,
  destructive,
  disabled,
  checked,
  radioSelected,
  chevron,
  onClick,
  switchToggle,
  children,
  forceHover,
}: {
  icon?: React.ReactNode
  label: string
  shortcut?: string
  destructive?: boolean
  disabled?: boolean
  checked?: boolean
  radioSelected?: boolean
  chevron?: boolean
  onClick?: () => void
  switchToggle?: boolean
  children?: React.ReactNode
  forceHover?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const isHovered = forceHover || (hovered && !disabled)

  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: 32,
        padding: "0 8px 0 10px",
        borderRadius: 6,
        fontSize: 13,
        fontWeight: 400,
        color: destructive ? "#D5143E" : disabled ? "rgba(38,38,38,0.5)" : "#262626",
        cursor: disabled ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: isHovered
          ? destructive
            ? "rgba(213,20,62,0.05)"
            : "rgba(0,0,0,0.03)"
          : "transparent",
        border: "none",
        width: "100%",
        fontFamily: "inherit",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {/* Checkbox indicator area */}
      {checked !== undefined && (
        <span style={{ width: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {checked && <Check style={{ width: 14, height: 14, color: "#262626" }} />}
        </span>
      )}

      {/* Radio indicator area */}
      {radioSelected !== undefined && (
        <span style={{ width: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {radioSelected && (
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#262626" }} />
          )}
        </span>
      )}

      {/* Icon */}
      {icon && (
        <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <span style={{ color: destructive ? "#D5143E" : disabled ? "#D4D4D4" : "#838383" }}>
            {icon}
          </span>
        </span>
      )}

      {/* Label */}
      <span style={{ whiteSpace: "nowrap" }}>{label}</span>

      {/* Right-side custom content */}
      {children}

      {/* Shortcut */}
      {shortcut && (
        <span
          style={{
            fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
            fontSize: 11,
            color: "#A1A1A1",
            marginLeft: "auto",
            paddingLeft: 24,
          }}
        >
          {shortcut}
        </span>
      )}

      {/* Chevron */}
      {chevron && (
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          <ChevronRight style={{ width: 12, height: 12, color: "#A1A1A1" }} />
        </span>
      )}

      {/* Switch toggle */}
      {switchToggle !== undefined && (
        <span
          style={{
            marginLeft: "auto",
            width: 24,
            height: 14,
            borderRadius: 7,
            background: switchToggle ? "#262626" : "#F0F0F0",
            position: "relative",
            cursor: "pointer",
            transition: "background 200ms",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              background: "white",
              position: "absolute",
              top: 2,
              left: switchToggle ? 12 : 2,
              transition: "left 200ms",
            }}
          />
        </span>
      )}
    </button>
  )
}

function MenuSep() {
  return <div style={{ height: "0.8px", background: "#F0F0F0", margin: "4px 0" }} />
}

function MenuGroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 500,
        color: "#838383",
        padding: "4px 10px",
        textTransform: "uppercase" as const,
        letterSpacing: "0.5px",
      }}
    >
      {children}
    </div>
  )
}

// ================================================================== //
// SECTIONS                                                            //
// ================================================================== //

function DefaultSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <button style={outlineBtn}>Actions</button>
      <div style={{ ...menuPanel, marginTop: 6 }}>
        <MenuItemRow icon={<Pencil size={14} />} label="Edit" shortcut="⌘E" />
        <MenuItemRow icon={<Copy size={14} />} label="Duplicate" shortcut="⌘D" />
        <MenuSep />
        <MenuItemRow icon={<Share2 size={14} />} label="Share" />
        <MenuItemRow icon={<Bookmark size={14} />} label="Save to collection" />
        <MenuItemRow icon={<Archive size={14} />} label="Archive" disabled />
        <MenuSep />
        <MenuItemRow icon={<Trash2 size={14} />} label="Delete" shortcut="⌫" destructive />
      </div>
    </div>
  )
}

function WithGroupsSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <button style={outlineBtn}>Options</button>
      <div style={{ ...menuPanel, marginTop: 6 }}>
        <MenuGroupLabel>Account</MenuGroupLabel>
        <MenuItemRow label="Profile" />
        <MenuItemRow label="Settings" />
        <MenuItemRow label="Billing" />
        <MenuSep />
        <MenuGroupLabel>Team</MenuGroupLabel>
        <MenuItemRow label="Invite members" />
        <MenuItemRow label="Manage roles" />
        <MenuSep />
        <MenuItemRow label="Log out" destructive />
      </div>
    </div>
  )
}

function WithCheckboxSection() {
  const [sidebar, setSidebar] = useState(true)
  const [toolbar, setToolbar] = useState(true)
  const [statusBar, setStatusBar] = useState(false)
  const [autoSave, setAutoSave] = useState(false)

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <button style={outlineBtn}>View</button>
      <div style={{ ...menuPanel, marginTop: 6 }}>
        <MenuGroupLabel>Show</MenuGroupLabel>
        <MenuItemRow checked={sidebar} label="Sidebar" onClick={() => setSidebar(!sidebar)} />
        <MenuItemRow checked={toolbar} label="Toolbar" onClick={() => setToolbar(!toolbar)} />
        <MenuItemRow checked={statusBar} label="Status bar" onClick={() => setStatusBar(!statusBar)} />
        <MenuSep />
        <MenuItemRow label="Auto save" switchToggle={autoSave} onClick={() => setAutoSave(!autoSave)} />
      </div>
    </div>
  )
}

function WithRadioSection() {
  const [sortBy, setSortBy] = useState("name")

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <button style={outlineBtn}>Sort by</button>
      <div style={{ ...menuPanel, marginTop: 6, minWidth: 180 }}>
        <MenuGroupLabel>Sort order</MenuGroupLabel>
        <MenuItemRow radioSelected={sortBy === "name"} label="Name" onClick={() => setSortBy("name")} />
        <MenuItemRow radioSelected={sortBy === "date"} label="Date modified" onClick={() => setSortBy("date")} />
        <MenuItemRow radioSelected={sortBy === "size"} label="Size" onClick={() => setSortBy("size")} />
        <MenuItemRow radioSelected={sortBy === "type"} label="Type" onClick={() => setSortBy("type")} />
      </div>
    </div>
  )
}

function WithSubmenuSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <button style={outlineBtn}>File</button>
      <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
        {/* Main menu */}
        <div style={menuPanel}>
          <MenuItemRow label="New file" shortcut="⌘N" />
          <MenuItemRow label="Open..." shortcut="⌘O" />
          <MenuSep />
          <MenuItemRow label="Share" chevron forceHover />
          <MenuSep />
          <MenuItemRow label="Export as" chevron />
          <MenuSep />
          <MenuItemRow label="Delete" destructive />
        </div>
        {/* Submenu */}
        <div style={{ ...menuPanel, minWidth: 160, marginTop: 68 }}>
          <MenuItemRow label="Email" />
          <MenuItemRow label="Slack" />
          <MenuItemRow label="Copy link" />
        </div>
      </div>
    </div>
  )
}

function DangerZoneSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <button style={outlineBtn}>Settings</button>
      <div style={{ ...menuPanel, marginTop: 6 }}>
        <MenuItemRow label="General" />
        <MenuItemRow label="Notifications" />
        <MenuItemRow label="Integrations" />
        <MenuSep />
        <div style={{ background: "rgba(213,20,62,0.02)", padding: 4, borderRadius: 6 }}>
          <MenuItemRow label="Transfer ownership" destructive />
          <MenuItemRow label="Delete project" destructive />
        </div>
      </div>
    </div>
  )
}

// ================================================================== //
// INTERACTIVE SECTION                                                 //
// ================================================================== //

interface InteractiveItem {
  type: "item" | "separator"
  icon?: React.ReactNode
  label?: string
  shortcut?: string
  destructive?: boolean
  disabled?: boolean
}

const INTERACTIVE_ITEMS: InteractiveItem[] = [
  { type: "item", icon: <Pencil size={14} />, label: "Edit", shortcut: "⌘E" },
  { type: "item", icon: <Copy size={14} />, label: "Duplicate", shortcut: "⌘D" },
  { type: "separator" },
  { type: "item", icon: <Share2 size={14} />, label: "Share" },
  { type: "item", icon: <Bookmark size={14} />, label: "Save to collection" },
  { type: "item", icon: <Archive size={14} />, label: "Archive", disabled: true },
  { type: "separator" },
  { type: "item", icon: <Trash2 size={14} />, label: "Delete", shortcut: "⌫", destructive: true },
]

function InteractiveSection() {
  const [open, setOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectableIndices = INTERACTIVE_ITEMS
    .map((item, i) => ({ item, i }))
    .filter(({ item }) => item.type === "item" && !item.disabled)
    .map(({ i }) => i)

  // Click outside
  useEffect(() => {
    if (!open) return
    function handleMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setHighlightedIndex(-1)
      }
    }
    document.addEventListener("mousedown", handleMouseDown)
    return () => document.removeEventListener("mousedown", handleMouseDown)
  }, [open])

  // Keyboard navigation
  useEffect(() => {
    if (!open) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false)
        setHighlightedIndex(-1)
        return
      }
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setHighlightedIndex((prev) => {
          const currentPos = selectableIndices.indexOf(prev)
          const nextPos = currentPos < selectableIndices.length - 1 ? currentPos + 1 : 0
          return selectableIndices[nextPos]
        })
        return
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setHighlightedIndex((prev) => {
          const currentPos = selectableIndices.indexOf(prev)
          const nextPos = currentPos > 0 ? currentPos - 1 : selectableIndices.length - 1
          return selectableIndices[nextPos]
        })
        return
      }
      if (e.key === "Enter") {
        setOpen(false)
        setHighlightedIndex(-1)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, selectableIndices])

  return (
    <div ref={containerRef} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <button style={outlineBtn} onClick={() => { setOpen(!open); setHighlightedIndex(-1) }}>
        Open menu
      </button>
      {open && (
        <div style={{ ...menuPanel, marginTop: 6 }}>
          {INTERACTIVE_ITEMS.map((item, i) => {
            if (item.type === "separator") return <MenuSep key={i} />
            return (
              <MenuItemRow
                key={i}
                icon={item.icon}
                label={item.label!}
                shortcut={item.shortcut}
                destructive={item.destructive}
                disabled={item.disabled}
                forceHover={highlightedIndex === i}
                onClick={() => { setOpen(false); setHighlightedIndex(-1) }}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

// ================================================================== //
// CAP DATA                                                            //
// ================================================================== //

const capData: CAPData = {
  type: "Composite",
  variants: "7",
  sizes: "1",
  deps: "cn, lucide-react",
  related: [
    { label: "Popover", href: "/components/popover" },
    { label: "Command", href: "/components/command" },
    { label: "Select", href: "/components/select" },
  ],
  tokens: [
    { name: "--border", color: "#F0F0F0", border: true },
    { name: "--foreground", color: "#262626" },
    { name: "--muted-fg", color: "#838383" },
    { name: "--destructive", color: "#D5143E" },
  ],
}

// ================================================================== //
// MENU PAGE                                                           //
// ================================================================== //

const menuProps: PropDef[] = [
  { prop: "open", type: "boolean", defaultVal: "—" },
  { prop: "defaultOpen", type: "boolean", defaultVal: "false" },
  { prop: "onOpenChange", type: "(open: boolean) => void", defaultVal: "—" },
]

const menuContentProps: PropDef[] = [
  { prop: "side", type: '"top" | "bottom" | "left" | "right"', defaultVal: '"bottom"' },
  { prop: "align", type: '"start" | "center" | "end"', defaultVal: '"start"' },
  { prop: "sideOffset", type: "number", defaultVal: "4" },
  { prop: "className", type: "string", defaultVal: "—" },
]

const menuItemProps: PropDef[] = [
  { prop: "variant", type: '"default" | "destructive"', defaultVal: '"default"' },
  { prop: "inset", type: "boolean", defaultVal: "false" },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
  { prop: "onSelect", type: "() => void", defaultVal: "—" },
]

const menuCheckboxItemProps: PropDef[] = [
  { prop: "checked", type: "boolean", defaultVal: "false" },
  { prop: "onCheckedChange", type: "(checked: boolean) => void", defaultVal: "—" },
  { prop: "variant", type: '"default" | "switch"', defaultVal: '"default"' },
]

const menuRadioGroupProps: PropDef[] = [
  { prop: "value", type: "string", defaultVal: "—" },
  { prop: "onValueChange", type: "(value: string) => void", defaultVal: "—" },
]

const menuRadioItemProps: PropDef[] = [
  { prop: "value", type: "string", defaultVal: "— (required)" },
]

export function MenuPage() {
  return (
    <ComponentPageLayout
      name="Menu"
      capContent={<ComponentCAP data={capData} />}
      previewContent={
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <PreviewSection label="Default">
            <DefaultSection />
          </PreviewSection>

          <PreviewSection label="With Groups">
            <WithGroupsSection />
          </PreviewSection>

          <PreviewSection label="With Checkbox">
            <WithCheckboxSection />
          </PreviewSection>

          <PreviewSection label="With Radio">
            <WithRadioSection />
          </PreviewSection>

          <PreviewSection label="With Submenu">
            <WithSubmenuSection />
          </PreviewSection>

          <PreviewSection label="Danger Zone">
            <DangerZoneSection />
          </PreviewSection>

          <PreviewSection label="Interactive">
            <InteractiveSection />
          </PreviewSection>
        </div>
      }
      codeContent={
        <StandardCodeTab
          packageName="@hyena/menu"
          importCode={`import {\n  Menu,\n  MenuTrigger,\n  MenuContent,\n  MenuItem,\n  MenuSeparator,\n  MenuGroup,\n  MenuGroupLabel,\n  MenuCheckboxItem,\n  MenuRadioGroup,\n  MenuRadioItem,\n  MenuSub,\n  MenuSubTrigger,\n  MenuSubContent,\n  MenuShortcut,\n} from "@/components/ui/menu"`}
          usageCode={`<Menu>\n  <MenuTrigger asChild>\n    <Button variant="outlined">Actions</Button>\n  </MenuTrigger>\n  <MenuContent align="start">\n    <MenuItem>Edit</MenuItem>\n    <MenuItem>Duplicate</MenuItem>\n    <MenuSeparator />\n    <MenuItem variant="destructive">Delete</MenuItem>\n  </MenuContent>\n</Menu>`}
        />
      }
      apiContent={
        <StandardApiTab
          name="Menu"
          description="A dropdown menu that displays a list of actions or options triggered by a button. Supports submenus, checkbox items, radio groups, keyboard navigation, and grouped sections."
          props={menuProps}
          extraSections={
            <>
              <div style={{ marginTop: 28 }}>
                <LabelPill text="MenuContent" />
                <div style={{ marginTop: 12, width: "100%" }}>
                  <PropsTable props={menuContentProps} />
                </div>
              </div>
              <div style={{ marginTop: 28 }}>
                <LabelPill text="MenuItem" />
                <div style={{ marginTop: 12, width: "100%" }}>
                  <PropsTable props={menuItemProps} />
                </div>
              </div>
              <div style={{ marginTop: 28 }}>
                <LabelPill text="MenuCheckboxItem" />
                <div style={{ marginTop: 12, width: "100%" }}>
                  <PropsTable props={menuCheckboxItemProps} />
                </div>
              </div>
              <div style={{ marginTop: 28 }}>
                <LabelPill text="MenuRadioGroup" />
                <div style={{ marginTop: 12, width: "100%" }}>
                  <PropsTable props={menuRadioGroupProps} />
                </div>
              </div>
              <div style={{ marginTop: 28 }}>
                <LabelPill text="MenuRadioItem" />
                <div style={{ marginTop: 12, width: "100%" }}>
                  <PropsTable props={menuRadioItemProps} />
                </div>
              </div>
            </>
          }
        />
      }
    />
  )
}
