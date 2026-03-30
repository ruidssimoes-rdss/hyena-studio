"use client"

import { useState } from "react"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Image,
  Undo,
  Redo,
} from "lucide-react"
import {
  ComponentPageLayout,
  ComponentCAP,
  PreviewSection,
  StandardCodeTab,
  StandardApiTab,
  type CAPData,
  type PropDef,
} from "@/editor/components/PageShell"

// ── Shared Styles ──────────────────────────────────────────────────── //

const BORDER_COLOR = "#F0F0F0"
const FG_COLOR = "#262626"
const MUTED_COLOR = "#838383"
const HOVER_BG = "#F8F8F8"
const BORDER_WIDTH = "0.8px"
const BORDER_RADIUS = "10px"

// ── Toolbar Button ─────────────────────────────────────────────────── //

function ToolbarIconButton({
  active,
  onClick,
  icon: Icon,
  size = 30,
  iconSize = 15,
  radius = 7,
  label,
}: {
  active?: boolean
  onClick?: () => void
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>
  size?: number
  iconSize?: number
  radius?: number
  label: string
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={label}
      aria-pressed={active}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${radius}px`,
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: active ? FG_COLOR : hovered ? HOVER_BG : "transparent",
        transition: "background 150ms",
      }}
    >
      <Icon
        size={iconSize}
        style={{ color: active ? "white" : MUTED_COLOR }}
      />
    </button>
  )
}

// ── Separator ──────────────────────────────────────────────────────── //

function ToolbarSeparator({ height = 16 }: { height?: number }) {
  return (
    <div
      style={{
        width: "1px",
        height: `${height}px`,
        background: BORDER_COLOR,
        margin: "0 4px",
        flexShrink: 0,
      }}
    />
  )
}

// ── Toolbar Container ──────────────────────────────────────────────── //

function ToolbarContainer({
  children,
  padding = 3,
}: {
  children: React.ReactNode
  padding?: number
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        border: `${BORDER_WIDTH} solid ${BORDER_COLOR}`,
        borderRadius: BORDER_RADIUS,
        padding: `${padding}px`,
        gap: "2px",
        background: "white",
      }}
    >
      {children}
    </div>
  )
}

// ── Default Toolbar Section ────────────────────────────────────────── //

function DefaultToolbar() {
  const [formatting, setFormatting] = useState<Set<string>>(new Set(["bold"]))
  const [alignment, setAlignment] = useState("left")

  const toggleFormat = (key: string) => {
    setFormatting((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <ToolbarContainer>
      <ToolbarIconButton
        icon={Bold}
        active={formatting.has("bold")}
        onClick={() => toggleFormat("bold")}
        label="Bold"
      />
      <ToolbarIconButton
        icon={Italic}
        active={formatting.has("italic")}
        onClick={() => toggleFormat("italic")}
        label="Italic"
      />
      <ToolbarIconButton
        icon={Underline}
        active={formatting.has("underline")}
        onClick={() => toggleFormat("underline")}
        label="Underline"
      />
      <ToolbarSeparator />
      <ToolbarIconButton
        icon={AlignLeft}
        active={alignment === "left"}
        onClick={() => setAlignment("left")}
        label="Align left"
      />
      <ToolbarIconButton
        icon={AlignCenter}
        active={alignment === "center"}
        onClick={() => setAlignment("center")}
        label="Align center"
      />
      <ToolbarIconButton
        icon={AlignRight}
        active={alignment === "right"}
        onClick={() => setAlignment("right")}
        label="Align right"
      />
    </ToolbarContainer>
  )
}

// ── With Dividers Section ──────────────────────────────────────────── //

function DividersToolbar() {
  const [formatting, setFormatting] = useState<Set<string>>(new Set())

  const toggleFormat = (key: string) => {
    setFormatting((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <ToolbarContainer>
      <ToolbarIconButton icon={Undo} onClick={() => {}} label="Undo" />
      <ToolbarIconButton icon={Redo} onClick={() => {}} label="Redo" />
      <ToolbarSeparator />
      <ToolbarIconButton
        icon={Bold}
        active={formatting.has("bold")}
        onClick={() => toggleFormat("bold")}
        label="Bold"
      />
      <ToolbarIconButton
        icon={Italic}
        active={formatting.has("italic")}
        onClick={() => toggleFormat("italic")}
        label="Italic"
      />
      <ToolbarIconButton
        icon={Underline}
        active={formatting.has("underline")}
        onClick={() => toggleFormat("underline")}
        label="Underline"
      />
      <ToolbarSeparator />
      <ToolbarIconButton icon={Link} onClick={() => {}} label="Insert link" />
      <ToolbarIconButton
        icon={Image}
        onClick={() => {}}
        label="Insert image"
      />
    </ToolbarContainer>
  )
}

// ── Compact Toolbar Section ────────────────────────────────────────── //

function CompactToolbar() {
  const [formatting, setFormatting] = useState<Set<string>>(new Set(["bold"]))
  const [alignment, setAlignment] = useState("left")

  const toggleFormat = (key: string) => {
    setFormatting((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <ToolbarContainer padding={2}>
      <ToolbarIconButton
        icon={Bold}
        active={formatting.has("bold")}
        onClick={() => toggleFormat("bold")}
        size={26}
        iconSize={13}
        radius={6}
        label="Bold"
      />
      <ToolbarIconButton
        icon={Italic}
        active={formatting.has("italic")}
        onClick={() => toggleFormat("italic")}
        size={26}
        iconSize={13}
        radius={6}
        label="Italic"
      />
      <ToolbarIconButton
        icon={Underline}
        active={formatting.has("underline")}
        onClick={() => toggleFormat("underline")}
        size={26}
        iconSize={13}
        radius={6}
        label="Underline"
      />
      <ToolbarSeparator height={12} />
      <ToolbarIconButton
        icon={AlignLeft}
        active={alignment === "left"}
        onClick={() => setAlignment("left")}
        size={26}
        iconSize={13}
        radius={6}
        label="Align left"
      />
      <ToolbarIconButton
        icon={AlignCenter}
        active={alignment === "center"}
        onClick={() => setAlignment("center")}
        size={26}
        iconSize={13}
        radius={6}
        label="Align center"
      />
      <ToolbarIconButton
        icon={AlignRight}
        active={alignment === "right"}
        onClick={() => setAlignment("right")}
        size={26}
        iconSize={13}
        radius={6}
        label="Align right"
      />
    </ToolbarContainer>
  )
}

// ── CAP Data ───────────────────────────────────────────────────────── //

const capData: CAPData = {
  type: "Composite",
  variants: "3",
  sizes: "2 (default, compact)",
  deps: "cn, lucide-react",
  related: [
    { label: "Toggle Group", href: "/components/toggle-group" },
    { label: "Button", href: "/components/button" },
  ],
  tokens: [
    { name: "--primary", color: "#262626" },
    { name: "--border", color: "#F0F0F0", border: true },
    { name: "--muted-fg", color: "#838383" },
    { name: "--surface-hover", color: "#F8F8F8", border: true },
  ],
}

// ── Props ──────────────────────────────────────────────────────────── //

const toolbarProps: PropDef[] = [
  {
    prop: "orientation",
    type: '"horizontal" | "vertical"',
    defaultVal: '"horizontal"',
  },
  { prop: "className", type: "string", defaultVal: "—" },
]

// ── Code Strings ───────────────────────────────────────────────────── //

const importCode = `import {
  Toolbar,
  ToolbarButton,
  ToolbarToggleGroup,
  ToolbarSeparator,
} from "@/components/ui/toolbar"`

const usageCode = `<Toolbar>
  <ToolbarToggleGroup type="multiple" value={formatting} onValueChange={setFormatting}>
    <ToolbarButton value="bold">
      <Bold />
    </ToolbarButton>
    <ToolbarButton value="italic">
      <Italic />
    </ToolbarButton>
    <ToolbarButton value="underline">
      <Underline />
    </ToolbarButton>
  </ToolbarToggleGroup>

  <ToolbarSeparator />

  <ToolbarToggleGroup type="single" value={alignment} onValueChange={setAlignment}>
    <ToolbarButton value="left">
      <AlignLeft />
    </ToolbarButton>
    <ToolbarButton value="center">
      <AlignCenter />
    </ToolbarButton>
    <ToolbarButton value="right">
      <AlignRight />
    </ToolbarButton>
  </ToolbarToggleGroup>
</Toolbar>`

// ── Sub-component Docs ─────────────────────────────────────────────── //

const subComponentDocs = (
  <div style={{ marginTop: "28px" }}>
    <h3
      style={{
        fontSize: "14px",
        fontWeight: 500,
        color: FG_COLOR,
        marginBottom: "16px",
      }}
    >
      Sub-components
    </h3>

    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <p
          style={{
            fontSize: "12.3px",
            fontWeight: 500,
            color: FG_COLOR,
            marginBottom: "4px",
          }}
        >
          ToolbarButton
        </p>
        <p
          style={{
            fontSize: "12.3px",
            color: "#727272",
            lineHeight: 1.6,
            marginBottom: "8px",
          }}
        >
          An individual button within the toolbar. Can be used standalone or
          inside a ToolbarToggleGroup.
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {[
              { prop: "children", type: "ReactNode", defaultVal: "—" },
              { prop: "disabled", type: "boolean", defaultVal: "false" },
            ].map((row, i, arr) => (
              <tr
                key={row.prop}
                style={{
                  borderBottom:
                    i < arr.length - 1 ? "1px solid #f0f0f0" : "none",
                }}
              >
                <td
                  className="font-medium"
                  style={{
                    fontSize: "12.3px",
                    color: FG_COLOR,
                    height: "36px",
                    padding: "0 12px",
                    fontWeight: 500,
                  }}
                >
                  {row.prop}
                </td>
                <td
                  className="font-mono"
                  style={{
                    fontSize: "11px",
                    color: "#727272",
                    height: "36px",
                    padding: "0 12px",
                  }}
                >
                  {row.type}
                </td>
                <td
                  className="font-mono"
                  style={{
                    fontSize: "11px",
                    color: FG_COLOR,
                    height: "36px",
                    padding: "0 12px",
                  }}
                >
                  {row.defaultVal}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <p
          style={{
            fontSize: "12.3px",
            fontWeight: 500,
            color: FG_COLOR,
            marginBottom: "4px",
          }}
        >
          ToolbarToggleGroup
        </p>
        <p
          style={{
            fontSize: "12.3px",
            color: "#727272",
            lineHeight: 1.6,
            marginBottom: "8px",
          }}
        >
          Groups toggle buttons together. Supports single or multiple selection.
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {[
              {
                prop: "type",
                type: '"single" | "multiple"',
                defaultVal: '"single"',
              },
              {
                prop: "value",
                type: "string | string[]",
                defaultVal: "—",
              },
              {
                prop: "onValueChange",
                type: "(value: string | string[]) => void",
                defaultVal: "—",
              },
            ].map((row, i, arr) => (
              <tr
                key={row.prop}
                style={{
                  borderBottom:
                    i < arr.length - 1 ? "1px solid #f0f0f0" : "none",
                }}
              >
                <td
                  className="font-medium"
                  style={{
                    fontSize: "12.3px",
                    color: FG_COLOR,
                    height: "36px",
                    padding: "0 12px",
                    fontWeight: 500,
                  }}
                >
                  {row.prop}
                </td>
                <td
                  className="font-mono"
                  style={{
                    fontSize: "11px",
                    color: "#727272",
                    height: "36px",
                    padding: "0 12px",
                  }}
                >
                  {row.type}
                </td>
                <td
                  className="font-mono"
                  style={{
                    fontSize: "11px",
                    color: FG_COLOR,
                    height: "36px",
                    padding: "0 12px",
                  }}
                >
                  {row.defaultVal}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <p
          style={{
            fontSize: "12.3px",
            fontWeight: 500,
            color: FG_COLOR,
            marginBottom: "4px",
          }}
        >
          ToolbarSeparator
        </p>
        <p
          style={{
            fontSize: "12.3px",
            color: "#727272",
            lineHeight: 1.6,
          }}
        >
          A vertical divider used to visually separate groups of toolbar buttons.
          No props required.
        </p>
      </div>
    </div>
  </div>
)

// ── Page Export ─────────────────────────────────────────────────────── //

export function ToolbarPage() {
  return (
    <ComponentPageLayout
      name="Toolbar"
      capContent={<ComponentCAP data={capData} />}
      previewContent={
        <div className="flex flex-col" style={{ gap: "24px" }}>
          <PreviewSection label="Default">
            <DefaultToolbar />
          </PreviewSection>

          <PreviewSection label="With Dividers">
            <DividersToolbar />
          </PreviewSection>

          <PreviewSection label="Compact">
            <CompactToolbar />
          </PreviewSection>
        </div>
      }
      codeContent={
        <StandardCodeTab
          packageName="@hyena/toolbar"
          importCode={importCode}
          usageCode={usageCode}
        />
      }
      apiContent={
        <StandardApiTab
          name="Toolbar"
          description="A container for grouping interactive icon buttons, toggle groups, and separators into a cohesive action bar."
          props={toolbarProps}
          extraSections={subComponentDocs}
        />
      }
    />
  )
}
