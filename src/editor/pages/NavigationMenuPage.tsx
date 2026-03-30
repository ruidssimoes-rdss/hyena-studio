"use client"

import { useState, useRef } from "react"
import {
  ChevronDown,
  LayoutDashboard,
  Component,
  BookOpen,
  Paintbrush,
  Zap,
  Layers,
  FileText,
  Settings,
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

// ================================================================== //
// DESIGN TOKENS                                                       //
// ================================================================== //

const navBar: React.CSSProperties = {
  width: "100%",
  height: 40,
  display: "flex",
  alignItems: "center",
  gap: 4,
  position: "relative" as const,
}

const navItem: React.CSSProperties = {
  height: 32,
  padding: "0 10px",
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 500,
  color: "#838383",
  display: "flex",
  alignItems: "center",
  gap: 4,
  cursor: "pointer",
  border: "none",
  background: "transparent",
  transition: "all 150ms ease",
}

const panelBase: React.CSSProperties = {
  background: "#FFFFFF",
  border: "0.8px solid #F0F0F0",
  borderRadius: 10,
  boxShadow: "0 4px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.03)",
  padding: 16,
  position: "absolute" as const,
  top: 40,
  left: 0,
  right: 0,
  zIndex: 10,
}

const gridItem: React.CSSProperties = {
  display: "flex",
  gap: 12,
  padding: 10,
  borderRadius: 8,
  cursor: "pointer",
  transition: "background 150ms ease",
}

const iconCircle: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 8,
  background: "#F0F0F0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
}

// ================================================================== //
// HELPER COMPONENTS                                                   //
// ================================================================== //

function NavMenuDemo({
  items,
  panels,
}: {
  items: Array<{
    label: string
    icon?: React.ComponentType<{ size: number; style?: React.CSSProperties }>
    hasPanel?: boolean
  }>
  panels: Record<string, React.ReactNode>
}) {
  const [openPanel, setOpenPanel] = useState<string | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleItemEnter = (label: string, hasPanel?: boolean) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    setHoveredItem(label)
    if (hasPanel) setOpenPanel(label)
    else setOpenPanel(null)
  }

  const handleItemLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenPanel(null)
      setHoveredItem(null)
    }, 150)
  }

  const handlePanelEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
  }

  const handlePanelLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenPanel(null)
      setHoveredItem(null)
    }, 150)
  }

  return (
    <div style={{ position: "relative" }}>
      <div style={navBar}>
        {items.map((item) => {
          const Icon = item.icon
          const isHovered = hoveredItem === item.label
          const isOpen = openPanel === item.label
          return (
            <button
              key={item.label}
              style={{
                ...navItem,
                color: isHovered || isOpen ? "#262626" : "#838383",
                background: isHovered || isOpen ? "#F0F0F0" : "transparent",
              }}
              onMouseEnter={() => handleItemEnter(item.label, item.hasPanel)}
              onMouseLeave={handleItemLeave}
            >
              {Icon && (
                <Icon
                  size={14}
                  style={{
                    color: isHovered || isOpen ? "#262626" : "#838383",
                  }}
                />
              )}
              {item.label}
              {item.hasPanel && (
                <ChevronDown
                  size={12}
                  style={{
                    color: isHovered || isOpen ? "#262626" : "#838383",
                    transform: isOpen ? "rotate(180deg)" : "none",
                    transition: "transform 200ms ease",
                  }}
                />
              )}
            </button>
          )
        })}
      </div>
      {openPanel && panels[openPanel] && (
        <div
          style={{ ...panelBase, animation: "none" }}
          onMouseEnter={handlePanelEnter}
          onMouseLeave={handlePanelLeave}
        >
          {panels[openPanel]}
        </div>
      )}
    </div>
  )
}

function GridItemWithHover({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        ...gridItem,
        background: hovered ? "#FAFAFA" : "transparent",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={iconCircle}>{icon}</div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, color: "#262626" }}>
          {title}
        </div>
        <div
          style={{
            fontSize: 12.3,
            fontWeight: 400,
            color: "#838383",
            marginTop: 2,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  )
}

function SimpleLink({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        fontSize: 13,
        fontWeight: 400,
        color: hovered ? "#262626" : "#838383",
        padding: "6px 10px",
        borderRadius: 8,
        cursor: "pointer",
        background: hovered ? "#FAFAFA" : "transparent",
        transition: "all 150ms ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </div>
  )
}

// ================================================================== //
// COMPACT NAV ITEM                                                    //
// ================================================================== //

function CompactNavItem({
  label,
  items,
}: {
  label: string
  items?: string[]
}) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const closeRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => {
        if (closeRef.current) clearTimeout(closeRef.current)
        setHovered(true)
        if (items) setOpen(true)
      }}
      onMouseLeave={() => {
        closeRef.current = setTimeout(() => {
          setOpen(false)
          setHovered(false)
        }, 150)
      }}
    >
      <button
        style={{
          ...navItem,
          height: 28,
          fontSize: 12.3,
          color: hovered ? "#262626" : "#838383",
          background: hovered ? "#F0F0F0" : "transparent",
        }}
      >
        {label}
        {items && (
          <ChevronDown
            size={10}
            style={{
              transform: open ? "rotate(180deg)" : "none",
              transition: "transform 200ms ease",
            }}
          />
        )}
      </button>
      {open && items && (
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 0,
            width: 200,
            background: "#FFFFFF",
            border: "0.8px solid #F0F0F0",
            borderRadius: 10,
            boxShadow:
              "0 4px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.03)",
            padding: 4,
            zIndex: 10,
          }}
        >
          {items.map((item) => (
            <CompactDropdownItem key={item} label={item} />
          ))}
        </div>
      )}
    </div>
  )
}

function CompactDropdownItem({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        height: 32,
        padding: "0 10px",
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 400,
        color: "#262626",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        background: hovered ? "#F0F0F0" : "transparent",
        transition: "background 150ms ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </div>
  )
}

// ================================================================== //
// SECTIONS                                                            //
// ================================================================== //

function DefaultSection() {
  return (
    <NavMenuDemo
      items={[
        { label: "Getting Started", hasPanel: true },
        { label: "Components", hasPanel: true },
        { label: "Docs" },
        { label: "Blog" },
      ]}
      panels={{
        "Getting Started": (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
            }}
          >
            <GridItemWithHover
              icon={<Zap size={16} style={{ color: "#838383" }} />}
              title="Introduction"
              description="Get started quickly"
            />
            <GridItemWithHover
              icon={<Layers size={16} style={{ color: "#838383" }} />}
              title="Installation"
              description="Set up your project"
            />
            <GridItemWithHover
              icon={<FileText size={16} style={{ color: "#838383" }} />}
              title="Typography"
              description="Styles for text content"
            />
            <GridItemWithHover
              icon={<Paintbrush size={16} style={{ color: "#838383" }} />}
              title="Theming"
              description="Customise the design system"
            />
          </div>
        ),
        Components: (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 4,
            }}
          >
            {[
              "Button",
              "Input",
              "Dialog",
              "Select",
              "Toast",
              "Menu",
              "Tabs",
              "Card",
              "Table",
            ].map((name) => (
              <SimpleLink key={name} label={name} />
            ))}
          </div>
        ),
      }}
    />
  )
}

function WithFeaturedSection() {
  return (
    <NavMenuDemo
      items={[
        { label: "Product", hasPanel: true },
        { label: "Resources", hasPanel: true },
        { label: "Pricing" },
      ]}
      panels={{
        Product: (
          <div style={{ display: "flex", gap: 16 }}>
            <div
              style={{
                width: "40%",
                background: "#FAFAFA",
                borderRadius: 8,
                padding: 16,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{ fontSize: 13, fontWeight: 500, color: "#262626" }}
              >
                Hyena Studio
              </div>
              <div
                style={{
                  fontSize: 12.3,
                  fontWeight: 400,
                  color: "#838383",
                  marginTop: 4,
                }}
              >
                A modern design system component library
              </div>
              <div
                style={{
                  fontSize: 12.3,
                  fontWeight: 500,
                  color: "#2B7FFF",
                  marginTop: 8,
                  cursor: "pointer",
                }}
              >
                Learn more &rarr;
              </div>
            </div>
            <div
              style={{
                width: "60%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <GridItemWithHover
                icon={<Zap size={16} style={{ color: "#838383" }} />}
                title="Quick Start"
                description="Get up and running in 2 minutes"
              />
              <GridItemWithHover
                icon={<Component size={16} style={{ color: "#838383" }} />}
                title="Components"
                description="55 production-ready components"
              />
              <GridItemWithHover
                icon={<Settings size={16} style={{ color: "#838383" }} />}
                title="Configuration"
                description="Customise tokens and themes"
              />
            </div>
          </div>
        ),
        Resources: (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
            }}
          >
            <GridItemWithHover
              icon={<BookOpen size={16} style={{ color: "#838383" }} />}
              title="Documentation"
              description="Guides and references"
            />
            <GridItemWithHover
              icon={<FileText size={16} style={{ color: "#838383" }} />}
              title="Blog"
              description="Updates and articles"
            />
            <GridItemWithHover
              icon={<Layers size={16} style={{ color: "#838383" }} />}
              title="Examples"
              description="Real-world usage patterns"
            />
            <GridItemWithHover
              icon={<Paintbrush size={16} style={{ color: "#838383" }} />}
              title="Showcase"
              description="Built with Hyena"
            />
          </div>
        ),
      }}
    />
  )
}

function WithIconsSection() {
  return (
    <NavMenuDemo
      items={[
        { label: "Overview", icon: LayoutDashboard },
        { label: "Components", icon: Component, hasPanel: true },
        { label: "Docs", icon: BookOpen, hasPanel: true },
        { label: "Themes", icon: Paintbrush },
      ]}
      panels={{
        Components: (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
            }}
          >
            <GridItemWithHover
              icon={<Zap size={16} style={{ color: "#838383" }} />}
              title="Primitives"
              description="Core building blocks"
            />
            <GridItemWithHover
              icon={<Layers size={16} style={{ color: "#838383" }} />}
              title="Composites"
              description="Complex components"
            />
            <GridItemWithHover
              icon={<Component size={16} style={{ color: "#838383" }} />}
              title="Layout"
              description="Structural components"
            />
            <GridItemWithHover
              icon={<Settings size={16} style={{ color: "#838383" }} />}
              title="Utilities"
              description="Helper components"
            />
          </div>
        ),
        Docs: (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {[
              "Getting Started",
              "Installation",
              "Configuration",
              "Theming",
              "Accessibility",
              "Changelog",
            ].map((name) => (
              <SimpleLink key={name} label={name} />
            ))}
          </div>
        ),
      }}
    />
  )
}

function CompactSection() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <CompactNavItem
        label="File"
        items={["New", "Open", "Save", "Export"]}
      />
      <CompactNavItem
        label="Edit"
        items={["Undo", "Redo", "Cut", "Copy", "Paste"]}
      />
      <CompactNavItem
        label="View"
        items={["Zoom In", "Zoom Out", "Full Screen"]}
      />
      <CompactNavItem label="Help" />
    </div>
  )
}

function InteractiveSection() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 4px",
      }}
    >
      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "#262626",
          letterSpacing: -0.5,
        }}
      >
        Hyena
      </div>
      <NavMenuDemo
        items={[
          { label: "Getting Started", hasPanel: true },
          { label: "Components", hasPanel: true },
          { label: "Docs" },
          { label: "Blog" },
        ]}
        panels={{
          "Getting Started": (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
              }}
            >
              <GridItemWithHover
                icon={<Zap size={16} style={{ color: "#838383" }} />}
                title="Introduction"
                description="Get started quickly"
              />
              <GridItemWithHover
                icon={<Layers size={16} style={{ color: "#838383" }} />}
                title="Installation"
                description="Set up your project"
              />
              <GridItemWithHover
                icon={<FileText size={16} style={{ color: "#838383" }} />}
                title="Typography"
                description="Styles for text content"
              />
              <GridItemWithHover
                icon={
                  <Paintbrush size={16} style={{ color: "#838383" }} />
                }
                title="Theming"
                description="Customise the design system"
              />
            </div>
          ),
          Components: (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 4,
              }}
            >
              {[
                "Button",
                "Input",
                "Dialog",
                "Select",
                "Toast",
                "Menu",
                "Tabs",
                "Card",
                "Table",
              ].map((name) => (
                <SimpleLink key={name} label={name} />
              ))}
            </div>
          ),
        }}
      />
      <button
        style={{
          height: 28,
          background: "#262626",
          color: "white",
          fontSize: 12.3,
          fontWeight: 500,
          borderRadius: 8,
          padding: "0 12px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Get Started
      </button>
    </div>
  )
}

// ================================================================== //
// CAP DATA                                                            //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Navigation",
  variants: "5",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Menu", href: "/components/menu" },
    { label: "Breadcrumb", href: "/components/breadcrumb" },
    { label: "Tabs", href: "/components/tabs" },
    { label: "Navbar", href: "/components/navbar" },
  ],
  tokens: [
    { name: "--nav-item-color", color: "#838383" },
    { name: "--nav-item-hover", color: "#262626" },
    { name: "--nav-item-hover-bg", color: "#F0F0F0" },
    { name: "--nav-panel-bg", color: "#FFFFFF", border: true },
    { name: "--nav-panel-border", color: "#F0F0F0", border: true },
  ],
}

// ================================================================== //
// PROPS                                                               //
// ================================================================== //

const NAV_MENU_PROPS: PropDef[] = [
  { prop: "children", type: "ReactNode", defaultVal: "\u2014" },
  { prop: "className", type: "string", defaultVal: "\u2014" },
]

const TRIGGER_PROPS: PropDef[] = [
  { prop: "children", type: "ReactNode", defaultVal: "\u2014" },
  { prop: "icon", type: "ReactNode", defaultVal: "\u2014" },
]

const CONTENT_PROPS: PropDef[] = [
  { prop: "children", type: "ReactNode", defaultVal: "\u2014" },
  {
    prop: "width",
    type: '"auto" | "full"',
    defaultVal: '"full"',
  },
]

const LINK_PROPS: PropDef[] = [
  { prop: "href", type: "string", defaultVal: "\u2014" },
  { prop: "children", type: "ReactNode", defaultVal: "\u2014" },
  { prop: "active", type: "boolean", defaultVal: "false" },
]

// ================================================================== //
// NAVIGATION MENU PAGE                                                //
// ================================================================== //

export function NavigationMenuPage() {
  return (
    <ComponentPageLayout
      name="Navigation Menu"
      capContent={<ComponentCAP data={CAP_DATA} />}
      previewContent={
        <div className="flex flex-col" style={{ gap: "28px" }}>
          <PreviewSection
            label="Default"
            wrapClassName="flex flex-col items-stretch w-full"
          >
            <DefaultSection />
          </PreviewSection>

          <PreviewSection
            label="With Featured"
            wrapClassName="flex flex-col items-stretch w-full"
          >
            <WithFeaturedSection />
          </PreviewSection>

          <PreviewSection
            label="With Icons"
            wrapClassName="flex flex-col items-stretch w-full"
          >
            <WithIconsSection />
          </PreviewSection>

          <PreviewSection
            label="Compact"
            wrapClassName="flex flex-col items-stretch w-full"
          >
            <CompactSection />
          </PreviewSection>

          <PreviewSection
            label="Interactive"
            wrapClassName="flex flex-col items-stretch w-full"
          >
            <InteractiveSection />
          </PreviewSection>
        </div>
      }
      codeContent={
        <StandardCodeTab
          packageName="@hyena/navigation-menu"
          importCode={`import {\n  NavigationMenu,\n  NavigationMenuList,\n  NavigationMenuItem,\n  NavigationMenuTrigger,\n  NavigationMenuContent,\n  NavigationMenuLink,\n} from "@/components/ui/navigation-menu"`}
          usageCode={`<NavigationMenu>\n  <NavigationMenuList>\n    <NavigationMenuItem>\n      <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>\n      <NavigationMenuContent>\n        <NavigationMenuLink href="/docs">Documentation</NavigationMenuLink>\n      </NavigationMenuContent>\n    </NavigationMenuItem>\n    <NavigationMenuItem>\n      <NavigationMenuLink href="/blog">Blog</NavigationMenuLink>\n    </NavigationMenuItem>\n  </NavigationMenuList>\n</NavigationMenu>`}
        />
      }
      apiContent={
        <StandardApiTab
          name="Navigation Menu"
          description="A horizontal navigation bar with mega dropdown panels that open on hover."
          props={NAV_MENU_PROPS}
          extraSections={
            <>
              <div style={{ marginTop: 28 }}>
                <LabelPill text="NavigationMenuTrigger" />
                <div style={{ marginTop: 12, width: "100%" }}>
                  <PropsTable props={TRIGGER_PROPS} />
                </div>
              </div>
              <div style={{ marginTop: 28 }}>
                <LabelPill text="NavigationMenuContent" />
                <div style={{ marginTop: 12, width: "100%" }}>
                  <PropsTable props={CONTENT_PROPS} />
                </div>
              </div>
              <div style={{ marginTop: 28 }}>
                <LabelPill text="NavigationMenuLink" />
                <div style={{ marginTop: 12, width: "100%" }}>
                  <PropsTable props={LINK_PROPS} />
                </div>
              </div>
            </>
          }
        />
      }
    />
  )
}
