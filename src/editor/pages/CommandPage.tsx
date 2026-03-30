"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  Search, Calendar, Calculator, User, CreditCard, Settings,
  Plus, Upload, Users, Home, BarChart3,
} from "lucide-react"
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

// ── Shared styles ────────────────────────────────────────────────── //

const panelStyle: React.CSSProperties = {
  width: 380,
  background: "#FFFFFF",
  border: "0.8px solid #F0F0F0",
  borderRadius: 12,
  boxShadow: "0 8px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
  overflow: "hidden",
}

const searchInputStyle: React.CSSProperties = {
  height: 40,
  padding: "0 12px",
  borderBottom: "0.8px solid #F0F0F0",
  display: "flex",
  alignItems: "center",
  gap: 8,
}

const inputStyle: React.CSSProperties = {
  border: "none",
  outline: "none",
  flex: 1,
  fontSize: 13,
  fontWeight: 400,
  color: "#262626",
  background: "transparent",
}

const groupLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 500,
  color: "#838383",
  padding: "6px 12px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
}

const itemBase: React.CSSProperties = {
  height: 36,
  padding: "0 12px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 13,
  fontWeight: 400,
  color: "#262626",
}

const separatorStyle: React.CSSProperties = {
  height: "0.8px",
  background: "#F0F0F0",
  margin: "4px 0",
}

const footerStyle: React.CSSProperties = {
  height: 32,
  padding: "0 12px",
  borderTop: "0.8px solid #F0F0F0",
  display: "flex",
  alignItems: "center",
  gap: 12,
}

const kbdStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 400,
  color: "#A1A1A1",
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
}

const shortcutStyle: React.CSSProperties = {
  fontFamily: "monospace",
  fontSize: 11,
  fontWeight: 400,
  color: "#A1A1A1",
  marginLeft: "auto",
}

// ── Helpers ──────────────────────────────────────────────────────── //

function CommandFooter() {
  return (
    <div style={footerStyle}>
      <span style={kbdStyle}>↑↓ navigate</span>
      <span style={kbdStyle}>↵ select</span>
      <span style={kbdStyle}>esc close</span>
    </div>
  )
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ fontWeight: 600 }}>{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  )
}

// ── Section 1: Default ──────────────────────────────────────────── //

function DefaultSection() {
  return (
    <PreviewSection label="Default">
      <div style={panelStyle}>
        <div style={searchInputStyle}>
          <Search style={{ width: 16, height: 16, color: "#838383", flexShrink: 0 }} />
          <input style={inputStyle} placeholder="Type a command or search..." readOnly />
        </div>
        <div style={{ paddingBottom: 4 }}>
          <div style={groupLabelStyle}>Suggestions</div>
          <div style={{ ...itemBase, background: "#F0F0F0" }}>
            <Calendar style={{ width: 16, height: 16, color: "#838383", flexShrink: 0 }} />
            <span>Calendar</span>
            <span style={shortcutStyle}>⌘⇧C</span>
          </div>
          <div style={itemBase}>
            <Search style={{ width: 16, height: 16, color: "#838383", flexShrink: 0 }} />
            <span>Search</span>
            <span style={shortcutStyle}>⌘K</span>
          </div>
          <div style={itemBase}>
            <Calculator style={{ width: 16, height: 16, color: "#838383", flexShrink: 0 }} />
            <span>Calculator</span>
          </div>
          <div style={separatorStyle} />
          <div style={groupLabelStyle}>Settings</div>
          <div style={itemBase}>
            <User style={{ width: 16, height: 16, color: "#838383", flexShrink: 0 }} />
            <span>Profile</span>
            <span style={shortcutStyle}>⌘P</span>
          </div>
          <div style={itemBase}>
            <CreditCard style={{ width: 16, height: 16, color: "#838383", flexShrink: 0 }} />
            <span>Billing</span>
          </div>
          <div style={itemBase}>
            <Settings style={{ width: 16, height: 16, color: "#838383", flexShrink: 0 }} />
            <span>Settings</span>
            <span style={shortcutStyle}>⌘,</span>
          </div>
        </div>
        <CommandFooter />
      </div>
    </PreviewSection>
  )
}

// ── Section 2: With Search Results ──────────────────────────────── //

function WithSearchResultsSection() {
  return (
    <PreviewSection label="With Search Results">
      <div style={panelStyle}>
        <div style={searchInputStyle}>
          <Search style={{ width: 16, height: 16, color: "#838383", flexShrink: 0 }} />
          <input style={inputStyle} defaultValue="cal" readOnly />
        </div>
        <div style={{ paddingBottom: 4 }}>
          <div style={{ ...itemBase, background: "#F0F0F0" }}>
            <Calendar style={{ width: 16, height: 16, color: "#838383", flexShrink: 0 }} />
            <span><span style={{ fontWeight: 600 }}>Cal</span>endar</span>
            <span style={shortcutStyle}>⌘⇧C</span>
          </div>
          <div style={itemBase}>
            <Calculator style={{ width: 16, height: 16, color: "#838383", flexShrink: 0 }} />
            <span><span style={{ fontWeight: 600 }}>Cal</span>culator</span>
          </div>
        </div>
        <CommandFooter />
      </div>
    </PreviewSection>
  )
}

// ── Section 3: Empty State ──────────────────────────────────────── //

function EmptyStateSection() {
  return (
    <PreviewSection label="Empty State">
      <div style={panelStyle}>
        <div style={searchInputStyle}>
          <Search style={{ width: 16, height: 16, color: "#838383", flexShrink: 0 }} />
          <input style={inputStyle} defaultValue="xyz" readOnly />
        </div>
        <div style={{ fontSize: 13, fontWeight: 400, color: "#838383", padding: 24, textAlign: "center" }}>
          No results found.
        </div>
        <CommandFooter />
      </div>
    </PreviewSection>
  )
}

// ── Section 4: With Icons and Descriptions ──────────────────────── //

function WithDescriptionsSection() {
  return (
    <PreviewSection label="With Icons and Descriptions">
      <div style={panelStyle}>
        <div style={searchInputStyle}>
          <Search style={{ width: 16, height: 16, color: "#838383", flexShrink: 0 }} />
          <input style={inputStyle} placeholder="Type a command or search..." readOnly />
        </div>
        <div style={{ paddingBottom: 4 }}>
          <div style={groupLabelStyle}>Quick Actions</div>
          <div style={{ ...itemBase, height: 48, background: "#F0F0F0" }}>
            <Plus style={{ width: 16, height: 16, color: "#838383", flexShrink: 0 }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 500, fontSize: 13, color: "#262626" }}>Create project</span>
              <span style={{ fontSize: 11, fontWeight: 400, color: "#838383" }}>Start a new project from scratch</span>
            </div>
          </div>
          <div style={{ ...itemBase, height: 48 }}>
            <Upload style={{ width: 16, height: 16, color: "#838383", flexShrink: 0 }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 500, fontSize: 13, color: "#262626" }}>Import data</span>
              <span style={{ fontSize: 11, fontWeight: 400, color: "#838383" }}>Import from CSV, JSON, or API</span>
            </div>
          </div>
          <div style={{ ...itemBase, height: 48 }}>
            <Users style={{ width: 16, height: 16, color: "#838383", flexShrink: 0 }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 500, fontSize: 13, color: "#262626" }}>Invite team</span>
              <span style={{ fontSize: 11, fontWeight: 400, color: "#838383" }}>Send invitations to collaborators</span>
            </div>
          </div>
          <div style={separatorStyle} />
          <div style={groupLabelStyle}>Navigation</div>
          <div style={{ ...itemBase, height: 48 }}>
            <Home style={{ width: 16, height: 16, color: "#838383", flexShrink: 0 }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 500, fontSize: 13, color: "#262626" }}>Dashboard</span>
              <span style={{ fontSize: 11, fontWeight: 400, color: "#838383" }}>Go to the main dashboard</span>
            </div>
          </div>
          <div style={{ ...itemBase, height: 48 }}>
            <BarChart3 style={{ width: 16, height: 16, color: "#838383", flexShrink: 0 }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 500, fontSize: 13, color: "#262626" }}>Analytics</span>
              <span style={{ fontSize: 11, fontWeight: 400, color: "#838383" }}>View your project analytics</span>
            </div>
          </div>
        </div>
        <CommandFooter />
      </div>
    </PreviewSection>
  )
}

// ── Section 5: Interactive ──────────────────────────────────────── //

const ITEMS = [
  { group: "Suggestions", icon: Calendar, label: "Calendar", shortcut: "⌘⇧C" },
  { group: "Suggestions", icon: Search, label: "Search", shortcut: "⌘K" },
  { group: "Suggestions", icon: Calculator, label: "Calculator" },
  { group: "Settings", icon: User, label: "Profile", shortcut: "⌘P" },
  { group: "Settings", icon: CreditCard, label: "Billing" },
  { group: "Settings", icon: Settings, label: "Settings", shortcut: "⌘," },
]

const kbdElementStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 20,
  height: 20,
  padding: "0 4px",
  borderRadius: 4,
  border: "0.8px solid #F0F0F0",
  background: "#FAFAFA",
  fontSize: 11,
  fontWeight: 500,
  color: "#838383",
  fontFamily: "monospace",
  margin: "0 3px",
}

function InteractiveSection() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = ITEMS.filter((i) =>
    i.label.toLowerCase().includes(query.toLowerCase())
  )

  const groups = filtered.reduce<Record<string, typeof ITEMS>>((acc, item) => {
    if (!acc[item.group]) acc[item.group] = []
    acc[item.group].push(item)
    return acc
  }, {})

  const handleOpen = useCallback(() => {
    setOpen(true)
    setQuery("")
    setHighlightedIndex(0)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    setQuery("")
    setHighlightedIndex(0)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "k") {
        e.preventDefault()
        setOpen(true)
        setQuery("")
        setHighlightedIndex(0)
      }
      if (e.key === "Escape") {
        setOpen(false)
        setQuery("")
        setHighlightedIndex(0)
      }
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [])

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setHighlightedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0))
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1))
      }
      if (e.key === "Enter") {
        e.preventDefault()
        handleClose()
      }
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, filtered.length, handleClose])

  // Reset highlighted index when query changes
  useEffect(() => {
    setHighlightedIndex(0)
  }, [query])

  let flatIndex = 0

  return (
    <PreviewSection label="Interactive">
      <div
        style={{ fontSize: 12.3, fontWeight: 400, color: "#838383", display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={handleOpen}
      >
        Press
        <span style={kbdElementStyle}>⌘</span>
        <span style={kbdElementStyle}>K</span>
        to open command palette
      </div>

      {open && (
        <>
          <div
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 50 }}
            onClick={handleClose}
          />
          <div
            style={{
              ...panelStyle,
              position: "fixed",
              top: "30%",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 51,
            }}
          >
            <div style={searchInputStyle}>
              <Search style={{ width: 16, height: 16, color: "#838383", flexShrink: 0 }} />
              <input
                ref={inputRef}
                style={{ ...inputStyle, fontFamily: "inherit" }}
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div style={{ paddingBottom: 4 }}>
              {filtered.length === 0 ? (
                <div style={{ fontSize: 13, fontWeight: 400, color: "#838383", padding: 24, textAlign: "center" }}>
                  No results found.
                </div>
              ) : (
                Object.entries(groups).map(([groupName, groupItems]) => {
                  const elements = (
                    <div key={groupName}>
                      {!query && <div style={groupLabelStyle}>{groupName}</div>}
                      {groupItems.map((item) => {
                        const currentIndex = flatIndex
                        flatIndex++
                        const Icon = item.icon
                        return (
                          <div
                            key={item.label}
                            style={{
                              ...itemBase,
                              background: highlightedIndex === currentIndex ? "#F0F0F0" : "transparent",
                            }}
                            onClick={handleClose}
                            onMouseEnter={() => setHighlightedIndex(currentIndex)}
                          >
                            <Icon style={{ width: 16, height: 16, color: "#838383", flexShrink: 0 }} />
                            <span>{highlightMatch(item.label, query)}</span>
                            {item.shortcut && <span style={shortcutStyle}>{item.shortcut}</span>}
                          </div>
                        )
                      })}
                    </div>
                  )
                  return elements
                })
              )}
            </div>
            <CommandFooter />
          </div>
        </>
      )}
    </PreviewSection>
  )
}

// ── CAP Data ────────────────────────────────────────────────────── //

const CAP_DATA: CAPData = {
  type: "Composite",
  variants: "5",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Autocomplete", href: "/components/autocomplete" },
    { label: "Dialog", href: "/components/dialog" },
    { label: "Menu", href: "/components/menu" },
  ],
  tokens: [
    { name: "--border", color: "#F0F0F0", border: true },
    { name: "--foreground", color: "#262626" },
    { name: "--muted-fg", color: "#838383" },
  ],
}

// ── API Props ───────────────────────────────────────────────────── //

const commandDialogProps: PropDef[] = [
  { prop: "open", type: "boolean", defaultVal: "false" },
  { prop: "onOpenChange", type: "(open: boolean) => void", defaultVal: "—" },
]

const commandInputProps: PropDef[] = [
  { prop: "placeholder", type: "string", defaultVal: '"Type a command or search..."' },
]

const commandItemProps: PropDef[] = [
  { prop: "value", type: "string", defaultVal: "—" },
  { prop: "onSelect", type: "() => void", defaultVal: "—" },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
]

// ── Page Export ─────────────────────────────────────────────────── //

export function CommandPage() {
  return (
    <ComponentPageLayout
      name="Command"
      capContent={<ComponentCAP data={CAP_DATA} />}
      previewContent={
        <div className="flex flex-col" style={{ gap: "28px" }}>
          <DefaultSection />
          <WithSearchResultsSection />
          <EmptyStateSection />
          <WithDescriptionsSection />
          <InteractiveSection />
        </div>
      }
      codeContent={
        <StandardCodeTab
          packageName="@hyena/command"
          importCode={`import {\n  Command,\n  CommandDialog,\n  CommandInput,\n  CommandList,\n  CommandEmpty,\n  CommandGroup,\n  CommandItem,\n  CommandSeparator,\n  CommandShortcut,\n} from "@/components/ui/command"`}
          usageCode={`<CommandDialog open={open} onOpenChange={setOpen}>\n  <CommandInput placeholder="Type a command or search..." />\n  <CommandList>\n    <CommandEmpty>No results found.</CommandEmpty>\n    <CommandGroup heading="Suggestions">\n      <CommandItem>Calendar</CommandItem>\n      <CommandItem>Search</CommandItem>\n    </CommandGroup>\n  </CommandList>\n</CommandDialog>`}
        />
      }
      apiContent={
        <StandardApiTab
          name="Command"
          description="A searchable command palette for finding and executing actions, triggered by keyboard shortcut."
          props={commandDialogProps}
          extraSections={
            <>
              <div style={{ marginTop: 28 }}>
                <LabelPill text="CommandInput" />
                <div style={{ marginTop: 12, width: "100%" }}>
                  <PropsTable props={commandInputProps} />
                </div>
              </div>
              <div style={{ marginTop: 28 }}>
                <LabelPill text="CommandItem" />
                <div style={{ marginTop: 12, width: "100%" }}>
                  <PropsTable props={commandItemProps} />
                </div>
              </div>
            </>
          }
        />
      }
    />
  )
}
