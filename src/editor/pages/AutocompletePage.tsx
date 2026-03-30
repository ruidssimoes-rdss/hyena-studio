"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { FileText, FileCode, File } from "lucide-react"
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

const inputStyle: React.CSSProperties = {
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
}

const dropdownStyle: React.CSSProperties = {
  border: "0.8px solid #F0F0F0",
  borderRadius: 10,
  background: "#FFFFFF",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  marginTop: 4,
  maxHeight: 180,
  overflowY: "auto" as const,
  padding: 4,
}

const suggestionStyle: React.CSSProperties = {
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

// ================================================================== //
// HELPER: HighlightMatch                                               //
// ================================================================== //

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query) return <span>{text}</span>

  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const index = lowerText.indexOf(lowerQuery)

  if (index === -1) return <span>{text}</span>

  const before = text.slice(0, index)
  const match = text.slice(index, index + query.length)
  const after = text.slice(index + query.length)

  return (
    <span>
      {before}
      <strong style={{ fontWeight: 600 }}>{match}</strong>
      {after}
    </span>
  )
}

// ================================================================== //
// PREVIEW SECTIONS                                                     //
// ================================================================== //

function DefaultSection() {
  return (
    <PreviewSection label="Default">
      <div style={{ width: 320 }}>
        <input
          type="text"
          value="Ams"
          readOnly
          style={inputStyle}
        />
        <div style={dropdownStyle}>
          <div style={{ ...suggestionStyle, background: "#F0F0F0" }}>
            <HighlightMatch text="Amsterdam" query="Ams" />
          </div>
          <div style={suggestionStyle}>
            <HighlightMatch text="Amsterdam Centraal" query="Ams" />
          </div>
          <div style={suggestionStyle}>
            <HighlightMatch text="Amstelveen" query="Ams" />
          </div>
        </div>
      </div>
    </PreviewSection>
  )
}

function WithIconsSection() {
  const iconStyle: React.CSSProperties = { width: 14, height: 14, color: "#838383", flexShrink: 0 }

  return (
    <PreviewSection label="With Icons">
      <div style={{ width: 320 }}>
        <input
          type="text"
          value="Re"
          readOnly
          style={inputStyle}
        />
        <div style={dropdownStyle}>
          <div style={{ ...suggestionStyle, background: "#F0F0F0" }}>
            <FileText style={iconStyle} />
            <HighlightMatch text="README.md" query="Re" />
          </div>
          <div style={suggestionStyle}>
            <FileCode style={iconStyle} />
            <HighlightMatch text="remix.config.ts" query="re" />
          </div>
          <div style={suggestionStyle}>
            <File style={iconStyle} />
            <HighlightMatch text="requirements.txt" query="re" />
          </div>
        </div>
      </div>
    </PreviewSection>
  )
}

function GroupedSection() {
  const groupHeaderStyle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 500,
    color: "#838383",
    padding: "4px 10px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  }

  return (
    <PreviewSection label="Grouped">
      <div style={{ width: 320 }}>
        <input
          type="text"
          value="b"
          readOnly
          style={inputStyle}
        />
        <div style={dropdownStyle}>
          <div style={groupHeaderStyle}>FRUITS</div>
          <div style={{ ...suggestionStyle, background: "#F0F0F0" }}>
            <HighlightMatch text="Banana" query="b" />
          </div>
          <div style={suggestionStyle}>
            <HighlightMatch text="Blueberry" query="b" />
          </div>
          <div style={groupHeaderStyle}>VEGETABLES</div>
          <div style={suggestionStyle}>
            <HighlightMatch text="Broccoli" query="b" />
          </div>
          <div style={suggestionStyle}>
            <HighlightMatch text="Brussels sprouts" query="b" />
          </div>
        </div>
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// INTERACTIVE SECTION                                                  //
// ================================================================== //

const COUNTRIES = [
  "Netherlands",
  "Portugal",
  "South Africa",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "United Kingdom",
  "United States",
  "Brazil",
]

function InteractiveSection() {
  const [inputValue, setInputValue] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredItems = COUNTRIES.filter((item) =>
    item.toLowerCase().includes(inputValue.toLowerCase())
  )

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [handleClickOutside])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    setIsOpen(value.length > 0)
    setHighlightedIndex(0)
  }

  const handleFocus = () => {
    if (inputValue.length > 0) {
      setIsOpen(true)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredItems.length === 0) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev + 1) % filteredItems.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (highlightedIndex >= 0) {
        setInputValue(filteredItems[highlightedIndex])
        setIsOpen(false)
      }
    } else if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  const handleSelect = (item: string) => {
    setInputValue(item)
    setIsOpen(false)
  }

  return (
    <PreviewSection label="Interactive">
      <div style={{ width: 320 }} ref={containerRef}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder="Search a country..."
          style={{ ...inputStyle, "::placeholder": undefined } as React.CSSProperties}
        />
        {isOpen && filteredItems.length > 0 && (
          <div style={dropdownStyle}>
            {filteredItems.map((item, index) => (
              <div
                key={item}
                onClick={() => handleSelect(item)}
                onMouseEnter={(e) => {
                  setHighlightedIndex(index)
                  e.currentTarget.style.background = index === highlightedIndex ? "#F0F0F0" : "rgba(0,0,0,0.03)"
                }}
                onMouseLeave={(e) => {
                  if (index !== highlightedIndex) {
                    e.currentTarget.style.background = "transparent"
                  }
                }}
                style={{
                  ...suggestionStyle,
                  background: index === highlightedIndex ? "#F0F0F0" : "transparent",
                }}
              >
                <HighlightMatch text={item} query={inputValue} />
              </div>
            ))}
          </div>
        )}
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// CODE TAB                                                             //
// ================================================================== //

const importCode = `import {
  Autocomplete,
  AutocompleteInput,
  AutocompleteList,
  AutocompleteItem,
  AutocompleteGroup,
} from "@/components/ui/autocomplete"`

const usageCode = `<Autocomplete
  items={["Amsterdam", "Berlin", "Copenhagen"]}
  onSelect={(value) => console.log(value)}
  placeholder="Search a city..."
/>`

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/autocomplete"
      importCode={importCode}
      usageCode={usageCode}
    />
  )
}

// ================================================================== //
// API TAB                                                              //
// ================================================================== //

const autocompleteProps: PropDef[] = [
  { prop: "items", type: 'string[] | { label: string; value: string; group?: string; icon?: ReactNode }[]', defaultVal: "\u2014" },
  { prop: "onSelect", type: "(value: string) => void", defaultVal: "\u2014" },
  { prop: "placeholder", type: "string", defaultVal: "\u2014" },
  { prop: "allowCustom", type: "boolean", defaultVal: "true" },
  { prop: "className", type: "string", defaultVal: "\u2014" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Autocomplete"
      description="A searchable input with dropdown suggestions. Supports icons, grouped results, keyboard navigation, and custom values."
      props={autocompleteProps}
    />
  )
}

// ================================================================== //
// CAP DATA                                                             //
// ================================================================== //

const capData: CAPData = {
  type: "Composite",
  variants: "4",
  sizes: "1",
  deps: "cn, lucide-react",
  related: [
    { label: "Combobox", href: "/components/combobox" },
    { label: "Input", href: "/components/input" },
    { label: "Select", href: "/components/select" },
  ],
  tokens: [
    { name: "--border", color: "#F0F0F0", border: true },
    { name: "--foreground", color: "#262626" },
    { name: "--secondary", color: "#F5F5F5" },
  ],
}

// ================================================================== //
// PAGE EXPORT                                                          //
// ================================================================== //

export function AutocompletePage() {
  return (
    <ComponentPageLayout
      name="Autocomplete"
      capContent={<ComponentCAP data={capData} />}
      previewContent={
        <div className="flex flex-col" style={{ gap: "28px" }}>
          <DefaultSection />
          <WithIconsSection />
          <GroupedSection />
          <InteractiveSection />
        </div>
      }
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
    />
  )
}
