"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ChevronDown, Search, X, Plus, Check } from "lucide-react"
import {
  ComponentPageLayout,
  ComponentCAP,
  PreviewSection,
  StandardCodeTab,
  StandardApiTab,
  type CAPData,
  type PropDef,
} from "@/editor/components/PageShell"

// ================================================================== //
// SHARED STYLES                                                        //
// ================================================================== //

const triggerStyle: React.CSSProperties = {
  width: "100%",
  height: 28,
  border: "0.8px solid #F0F0F0",
  borderRadius: 10,
  padding: "0 10px",
  fontSize: 12.3,
  fontWeight: 400,
  color: "#262626",
  outline: "none",
  fontFamily: "inherit",
  background: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  textAlign: "left" as const,
}

const chevronStyle: React.CSSProperties = {
  width: 14,
  height: 14,
  color: "#838383",
  flexShrink: 0,
}

const dropdownStyle: React.CSSProperties = {
  border: "0.8px solid #F0F0F0",
  borderRadius: 10,
  background: "#FFFFFF",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  marginTop: 4,
  overflow: "hidden",
}

const searchInputStyle: React.CSSProperties = {
  width: "100%",
  height: 28,
  borderTop: "none",
  borderLeft: "none",
  borderRight: "none",
  borderBottom: "0.8px solid #F0F0F0",
  padding: "0 10px 0 32px",
  fontSize: 12.3,
  fontWeight: 400,
  color: "#262626",
  outline: "none",
  fontFamily: "inherit",
  background: "transparent",
}

const searchIconStyle: React.CSSProperties = {
  position: "absolute",
  left: 10,
  top: "50%",
  transform: "translateY(-50%)",
  width: 14,
  height: 14,
  color: "#838383",
}

const resultsListStyle: React.CSSProperties = {
  maxHeight: 180,
  overflowY: "auto" as const,
  padding: 4,
}

const resultItemStyle: React.CSSProperties = {
  height: 32,
  padding: "0 10px",
  borderRadius: 6,
  fontSize: 13,
  fontWeight: 400,
  color: "#262626",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 8,
}

const badgePillStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  height: 18,
  padding: "0 6px",
  background: "#F0F0F0",
  borderRadius: 4,
  fontSize: 11,
  fontWeight: 400,
  color: "#262626",
}

// ================================================================== //
// PREVIEW SECTIONS                                                     //
// ================================================================== //

function DefaultSection() {
  const items = ["Next.js", "Remix", "Astro", "SvelteKit", "Nuxt"]

  return (
    <PreviewSection label="Default">
      <div style={{ width: 320 }}>
        {/* Trigger */}
        <div style={triggerStyle}>
          <span style={{ color: "#A1A1A1" }}>Select framework...</span>
          <ChevronDown style={chevronStyle} />
        </div>

        {/* Dropdown permanently visible */}
        <div style={dropdownStyle}>
          {/* Search */}
          <div style={{ position: "relative" }}>
            <Search style={searchIconStyle} />
            <input
              type="text"
              placeholder="Search..."
              readOnly
              style={searchInputStyle}
            />
          </div>

          {/* Results */}
          <div style={resultsListStyle}>
            {items.map((item, i) => (
              <div
                key={item}
                style={{
                  ...resultItemStyle,
                  background: i === 0 ? "#F0F0F0" : "transparent",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewSection>
  )
}

function WithSelectedSection() {
  return (
    <PreviewSection label="With Selected">
      <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 16 }}>
        {/* First combobox — selected, dropdown closed */}
        <div>
          <div style={triggerStyle}>
            <span style={{ color: "#262626" }}>Next.js</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <X style={{ width: 14, height: 14, color: "#838383" }} />
              <ChevronDown style={chevronStyle} />
            </div>
          </div>
        </div>

        {/* Second combobox — placeholder, dropdown open with search "sv" */}
        <div>
          <div style={triggerStyle}>
            <span style={{ color: "#A1A1A1" }}>Select framework...</span>
            <ChevronDown style={chevronStyle} />
          </div>

          <div style={dropdownStyle}>
            <div style={{ position: "relative" }}>
              <Search style={searchIconStyle} />
              <input
                type="text"
                defaultValue="sv"
                readOnly
                style={searchInputStyle}
              />
            </div>
            <div style={resultsListStyle}>
              <div style={{ ...resultItemStyle, background: "#F0F0F0" }}>
                SvelteKit
              </div>
            </div>
          </div>
        </div>
      </div>
    </PreviewSection>
  )
}

function MultiSelectSection() {
  const selected = ["React", "TypeScript", "Tailwind"]
  const available = ["Next.js", "Vite", "Astro"]

  return (
    <PreviewSection label="Multi-Select">
      <div style={{ width: 320 }}>
        {/* Trigger area with badges */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap" as const,
            gap: 4,
            minHeight: 28,
            padding: "4px 10px",
            border: "0.8px solid #F0F0F0",
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          {selected.map((item) => (
            <span key={item} style={badgePillStyle}>
              {item}
              <X style={{ width: 10, height: 10, cursor: "pointer", color: "#838383" }} />
            </span>
          ))}
          <ChevronDown style={{ ...chevronStyle, marginLeft: "auto" }} />
        </div>

        {/* Dropdown */}
        <div style={dropdownStyle}>
          <div style={{ position: "relative" }}>
            <Search style={searchIconStyle} />
            <input
              type="text"
              placeholder="Search..."
              readOnly
              style={searchInputStyle}
            />
          </div>
          <div style={resultsListStyle}>
            {available.map((item) => (
              <div key={item} style={resultItemStyle}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewSection>
  )
}

function CreateNewSection() {
  return (
    <PreviewSection label="Create New">
      <div style={{ width: 320 }}>
        {/* Trigger */}
        <div style={triggerStyle}>
          <span style={{ color: "#A1A1A1" }}>Select framework...</span>
          <ChevronDown style={chevronStyle} />
        </div>

        {/* Dropdown */}
        <div style={dropdownStyle}>
          <div style={{ position: "relative" }}>
            <Search style={searchIconStyle} />
            <input
              type="text"
              defaultValue="Vue"
              readOnly
              style={searchInputStyle}
            />
          </div>

          {/* Empty state */}
          <div style={{ padding: 12, textAlign: "center", fontSize: 12.3, color: "#838383" }}>
            No results found.
          </div>

          {/* Separator */}
          <div style={{ height: 0.8, background: "#F0F0F0", margin: "0 4px" }} />

          {/* Create row */}
          <div style={{ padding: 4 }}>
            <div
              style={{
                height: 32,
                padding: "0 10px",
                borderRadius: 6,
                fontSize: 12.3,
                fontWeight: 500,
                color: "#262626",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(0,0,0,0.02)",
              }}
            >
              <Plus style={{ width: 14, height: 14, color: "#262626" }} />
              Create &quot;Vue&quot;
            </div>
          </div>
        </div>
      </div>
    </PreviewSection>
  )
}

function InteractiveSection() {
  const dataset = ["JavaScript", "TypeScript", "Python", "Rust", "Go", "Swift", "Kotlin", "Ruby"]

  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [selectedValue, setSelectedValue] = useState<string | null>(null)
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const filtered = dataset.filter((item) =>
    item.toLowerCase().includes(searchValue.toLowerCase())
  )

  // Close on outside click
  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleMouseDown)
    return () => document.removeEventListener("mousedown", handleMouseDown)
  }, [])

  // Auto-focus search when open
  useEffect(() => {
    if (isOpen && searchRef.current) {
      searchRef.current.focus()
    }
  }, [isOpen])

  // Reset highlighted index when filtered list changes
  useEffect(() => {
    setHighlightedIndex(0)
  }, [searchValue])

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) {
        setSearchValue("")
        setHighlightedIndex(0)
      }
      return !prev
    })
  }, [])

  const handleSelect = useCallback((value: string) => {
    setSelectedValue(value)
    setIsOpen(false)
    setSearchValue("")
  }, [])

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedValue(null)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setHighlightedIndex((prev) => Math.min(prev + 1, filtered.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setHighlightedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (filtered[highlightedIndex]) {
          handleSelect(filtered[highlightedIndex])
        }
      } else if (e.key === "Escape") {
        setIsOpen(false)
      }
    },
    [filtered, highlightedIndex, handleSelect]
  )

  return (
    <PreviewSection label="Interactive">
      <div ref={containerRef} style={{ width: 320 }}>
        {/* Trigger */}
        <div style={triggerStyle} onClick={handleToggle}>
          {selectedValue ? (
            <span style={{ color: "#262626" }}>{selectedValue}</span>
          ) : (
            <span style={{ color: "#A1A1A1" }}>Select a language...</span>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {selectedValue && (
              <X
                style={{ width: 14, height: 14, color: "#838383", cursor: "pointer" }}
                onClick={handleClear}
              />
            )}
            <ChevronDown style={chevronStyle} />
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div style={dropdownStyle}>
            <div style={{ position: "relative" }}>
              <Search style={searchIconStyle} />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                style={searchInputStyle}
              />
            </div>
            <div style={resultsListStyle}>
              {filtered.length === 0 ? (
                <div style={{ padding: 12, textAlign: "center", fontSize: 12.3, color: "#838383" }}>
                  No results found.
                </div>
              ) : (
                filtered.map((item, i) => (
                  <div
                    key={item}
                    style={{
                      ...resultItemStyle,
                      background: i === highlightedIndex ? "#F0F0F0" : "transparent",
                    }}
                    onMouseEnter={() => setHighlightedIndex(i)}
                    onClick={() => handleSelect(item)}
                  >
                    {item}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// CODE TAB                                                             //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/combobox"
      importCode={`import {\n  Combobox,\n  ComboboxTrigger,\n  ComboboxContent,\n  ComboboxInput,\n  ComboboxItem,\n  ComboboxEmpty,\n  ComboboxCreate,\n} from "@/components/ui/combobox"`}
      usageCode={`<Combobox\n  items={[\n    { label: "Next.js", value: "nextjs" },\n    { label: "Remix", value: "remix" },\n    { label: "Astro", value: "astro" },\n  ]}\n  placeholder="Select framework..."\n  onValueChange={(value) => console.log(value)}\n/>`}
    />
  )
}

// ================================================================== //
// API TAB                                                              //
// ================================================================== //

const comboboxProps: PropDef[] = [
  { prop: "items", type: "{label: string, value: string}[]", defaultVal: "—" },
  { prop: "value", type: "string | string[]", defaultVal: "—" },
  { prop: "onValueChange", type: "(value) => void", defaultVal: "—" },
  { prop: "multiple", type: "boolean", defaultVal: "false" },
  { prop: "creatable", type: "boolean", defaultVal: "false" },
  { prop: "onCreateItem", type: "(value: string) => void", defaultVal: "—" },
  { prop: "placeholder", type: "string", defaultVal: "—" },
  { prop: "searchPlaceholder", type: "string", defaultVal: '"Search..."' },
  { prop: "emptyMessage", type: "string", defaultVal: '"No results found"' },
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Combobox"
      description="A searchable dropdown that lets users pick from a filtered list of options. Supports single select, multi-select, and creating new items."
      props={comboboxProps}
    />
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const capData: CAPData = {
  type: "Composite",
  variants: "5",
  sizes: "1",
  deps: "cn, lucide-react",
  related: [
    { label: "Autocomplete", href: "/components/autocomplete" },
    { label: "Select", href: "/components/select" },
    { label: "Input", href: "/components/input" },
  ],
  tokens: [
    { name: "--border", color: "#F0F0F0", border: true },
    { name: "--foreground", color: "#262626" },
    { name: "--secondary", color: "#F5F5F5" },
    { name: "--muted-fg", color: "#838383" },
  ],
}

// ================================================================== //
// PAGE EXPORT                                                          //
// ================================================================== //

export function ComboboxPage() {
  return (
    <ComponentPageLayout
      name="Combobox"
      capContent={<ComponentCAP data={capData} />}
      previewContent={
        <div className="flex flex-col" style={{ gap: 28 }}>
          <DefaultSection />
          <WithSelectedSection />
          <MultiSelectSection />
          <CreateNewSection />
          <InteractiveSection />
        </div>
      }
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
    />
  )
}
