"use client"

import { useState, useCallback } from "react"
import {
  LayoutDashboard, Component, Palette, BookOpen, Settings, Users,
  ChevronRight, ChevronDown, Inbox, Bell, Search,
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
// SHARED SIDEBAR PRIMITIVES                                           //
// ================================================================== //

interface MenuItem {
  icon: React.ReactNode
  label: string
  active?: boolean
  badge?: React.ReactNode
}

function SidebarHeader({ iconOnly = false }: { iconOnly?: boolean }) {
  return (
    <div
      className="flex items-center shrink-0"
      style={{
        height: "56px",
        padding: iconOnly ? "0" : "0 16px",
        borderBottom: "0.8px solid #F0F0F0",
        justifyContent: iconOnly ? "center" : "flex-start",
      }}
    >
      <div
        style={{
          width: "24px",
          height: "24px",
          background: "#262626",
          borderRadius: "6px",
          flexShrink: 0,
        }}
      />
      {!iconOnly && (
        <span
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#262626",
            marginLeft: "10px",
          }}
        >
          Hyena
        </span>
      )}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: "10px",
        fontWeight: 500,
        color: "#C0C0C0",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        padding: "8px 8px 4px",
      }}
    >
      {children}
    </div>
  )
}

function MenuItemRow({
  icon,
  label,
  active = false,
  badge,
}: MenuItem) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="flex items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: "32px",
        padding: "0 8px",
        borderRadius: "8px",
        gap: "10px",
        background: active || hovered ? "#F0F0F0" : "transparent",
        cursor: "pointer",
        transition: "background 150ms",
      }}
    >
      <div style={{ width: "16px", height: "16px", color: active ? "#262626" : "#838383", flexShrink: 0 }}>
        {icon}
      </div>
      <span
        style={{
          fontSize: "13px",
          fontWeight: active ? 500 : 400,
          color: "#262626",
          flex: 1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </span>
      {badge}
    </div>
  )
}

function SidebarFooter({ iconOnly = false }: { iconOnly?: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="shrink-0"
      style={{
        padding: "8px",
        borderTop: "0.8px solid #F0F0F0",
      }}
    >
      <div
        className="flex items-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          gap: "10px",
          padding: iconOnly ? "4px" : "4px 8px",
          borderRadius: "8px",
          background: hovered ? "#F0F0F0" : "transparent",
          cursor: "pointer",
          transition: "background 150ms",
          justifyContent: iconOnly ? "center" : "flex-start",
        }}
      >
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "14px",
            background: "#E5E5E5",
            fontSize: "11px",
            fontWeight: 500,
            color: "#262626",
          }}
        >
          RS
        </div>
        {!iconOnly && (
          <>
            <span
              style={{
                fontSize: "12.3px",
                fontWeight: 500,
                color: "#262626",
                flex: 1,
              }}
            >
              Rui S.
            </span>
            <ChevronRight style={{ width: "12px", height: "12px", color: "#C0C0C0", flexShrink: 0 }} />
          </>
        )}
      </div>
    </div>
  )
}

function MainContent({ text = "Main content area" }: { text?: string }) {
  return (
    <div
      className="flex flex-1 items-center justify-center"
      style={{ background: "white", padding: "24px" }}
    >
      <span style={{ fontSize: "13px", color: "#838383" }}>{text}</span>
    </div>
  )
}

// ================================================================== //
// SECTION 1: DEFAULT                                                  //
// ================================================================== //

function DefaultSection() {
  return (
    <PreviewSection label="Default" wrapClassName="flex flex-col items-stretch w-full">
      <div
        className="flex"
        style={{
          width: "100%",
          height: "400px",
          border: "0.8px solid #F0F0F0",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {/* Sidebar */}
        <div
          className="flex flex-col shrink-0"
          style={{
            width: "224px",
            background: "#FAFAFA",
            borderRight: "0.8px solid #F0F0F0",
          }}
        >
          <SidebarHeader />
          <div className="flex-1 overflow-y-auto" style={{ padding: "8px" }}>
            <SectionLabel>Main</SectionLabel>
            <div className="flex flex-col" style={{ gap: "1px" }}>
              <MenuItemRow icon={<LayoutDashboard style={{ width: "16px", height: "16px" }} />} label="Dashboard" active />
              <MenuItemRow icon={<Component style={{ width: "16px", height: "16px" }} />} label="Components" />
              <MenuItemRow icon={<Palette style={{ width: "16px", height: "16px" }} />} label="Themes" />
              <MenuItemRow icon={<BookOpen style={{ width: "16px", height: "16px" }} />} label="Documentation" />
            </div>
            <SectionLabel>Settings</SectionLabel>
            <div className="flex flex-col" style={{ gap: "1px" }}>
              <MenuItemRow icon={<Settings style={{ width: "16px", height: "16px" }} />} label="Settings" />
              <MenuItemRow icon={<Users style={{ width: "16px", height: "16px" }} />} label="Team" />
            </div>
          </div>
          <SidebarFooter />
        </div>
        {/* Main */}
        <MainContent />
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 2: COLLAPSIBLE SECTIONS                                     //
// ================================================================== //

function CollapsibleSectionsSection() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    main: true,
    resources: false,
    settings: true,
  })

  const toggle = useCallback((key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const sections = [
    {
      key: "main",
      label: "Main",
      items: [
        { icon: <LayoutDashboard style={{ width: "16px", height: "16px" }} />, label: "Dashboard", active: true },
        { icon: <Component style={{ width: "16px", height: "16px" }} />, label: "Components" },
        { icon: <Palette style={{ width: "16px", height: "16px" }} />, label: "Themes" },
        { icon: <BookOpen style={{ width: "16px", height: "16px" }} />, label: "Documentation" },
      ],
    },
    {
      key: "resources",
      label: "Resources",
      items: [
        { icon: <BookOpen style={{ width: "16px", height: "16px" }} />, label: "Guides" },
        { icon: <Component style={{ width: "16px", height: "16px" }} />, label: "Templates" },
      ],
    },
    {
      key: "settings",
      label: "Settings",
      items: [
        { icon: <Settings style={{ width: "16px", height: "16px" }} />, label: "Settings" },
        { icon: <Users style={{ width: "16px", height: "16px" }} />, label: "Team" },
      ],
    },
  ]

  return (
    <PreviewSection label="Collapsible Sections" wrapClassName="flex flex-col items-stretch w-full">
      <div
        className="flex"
        style={{
          width: "100%",
          height: "400px",
          border: "0.8px solid #F0F0F0",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          className="flex flex-col shrink-0"
          style={{
            width: "224px",
            background: "#FAFAFA",
            borderRight: "0.8px solid #F0F0F0",
          }}
        >
          <SidebarHeader />
          <div className="flex-1 overflow-y-auto" style={{ padding: "8px" }}>
            {sections.map((section) => {
              const isExpanded = expanded[section.key]
              return (
                <div key={section.key}>
                  <button
                    className="flex items-center w-full"
                    onClick={() => toggle(section.key)}
                    style={{
                      padding: "8px 8px 4px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      gap: "4px",
                    }}
                  >
                    <ChevronDown
                      style={{
                        width: "12px",
                        height: "12px",
                        color: "#C0C0C0",
                        transform: isExpanded ? "rotate(0deg)" : "rotate(-90deg)",
                        transition: "transform 200ms ease",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 500,
                        color: "#C0C0C0",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {section.label}
                    </span>
                  </button>
                  <div
                    style={{
                      maxHeight: isExpanded ? "200px" : "0px",
                      overflow: "hidden",
                      transition: "max-height 200ms ease",
                    }}
                  >
                    <div className="flex flex-col" style={{ gap: "1px" }}>
                      {section.items.map((item) => (
                        <MenuItemRow
                          key={item.label}
                          icon={item.icon}
                          label={item.label}
                          active={item.active}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <SidebarFooter />
        </div>
        <MainContent />
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 3: ICON ONLY                                                //
// ================================================================== //

function IconOnlyItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "8px",
        background: active || hovered ? "#F0F0F0" : "transparent",
        cursor: "pointer",
        transition: "background 150ms",
      }}
    >
      <div style={{ width: "16px", height: "16px", color: active ? "#262626" : "#838383" }}>
        {icon}
      </div>
      {hovered && (
        <div
          className="absolute"
          style={{
            left: "calc(100% + 8px)",
            top: "50%",
            transform: "translateY(-50%)",
            background: "#262626",
            color: "white",
            fontSize: "11px",
            fontWeight: 500,
            padding: "4px 8px",
            borderRadius: "6px",
            whiteSpace: "nowrap",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          {label}
        </div>
      )}
    </div>
  )
}

function IconOnlySection() {
  return (
    <PreviewSection label="Icon Only" wrapClassName="flex flex-col items-stretch w-full">
      <div
        className="flex"
        style={{
          width: "100%",
          height: "400px",
          border: "0.8px solid #F0F0F0",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          className="flex flex-col items-center shrink-0"
          style={{
            width: "56px",
            background: "#FAFAFA",
            borderRight: "0.8px solid #F0F0F0",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              height: "56px",
              borderBottom: "0.8px solid #F0F0F0",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                background: "#262626",
                borderRadius: "6px",
              }}
            />
          </div>
          {/* Items */}
          <div className="flex-1 flex flex-col items-center overflow-y-auto" style={{ padding: "8px 0", gap: "2px" }}>
            <IconOnlyItem icon={<LayoutDashboard style={{ width: "16px", height: "16px" }} />} label="Dashboard" active />
            <IconOnlyItem icon={<Component style={{ width: "16px", height: "16px" }} />} label="Components" />
            <IconOnlyItem icon={<Palette style={{ width: "16px", height: "16px" }} />} label="Themes" />
            <IconOnlyItem icon={<BookOpen style={{ width: "16px", height: "16px" }} />} label="Documentation" />
            <IconOnlyItem icon={<Settings style={{ width: "16px", height: "16px" }} />} label="Settings" />
            <IconOnlyItem icon={<Users style={{ width: "16px", height: "16px" }} />} label="Team" />
          </div>
          {/* Footer */}
          <div
            className="shrink-0 flex items-center justify-center"
            style={{
              padding: "8px",
              borderTop: "0.8px solid #F0F0F0",
              width: "100%",
            }}
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "14px",
                background: "#E5E5E5",
                fontSize: "11px",
                fontWeight: 500,
                color: "#262626",
                cursor: "pointer",
              }}
            >
              RS
            </div>
          </div>
        </div>
        <MainContent />
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 4: WITH BADGES                                              //
// ================================================================== //

function WithBadgesSection() {
  return (
    <PreviewSection label="With Badges" wrapClassName="flex flex-col items-stretch w-full">
      <div
        className="flex"
        style={{
          width: "100%",
          height: "400px",
          border: "0.8px solid #F0F0F0",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          className="flex flex-col shrink-0"
          style={{
            width: "224px",
            background: "#FAFAFA",
            borderRight: "0.8px solid #F0F0F0",
          }}
        >
          <SidebarHeader />
          <div className="flex-1 overflow-y-auto" style={{ padding: "8px" }}>
            <SectionLabel>Main</SectionLabel>
            <div className="flex flex-col" style={{ gap: "1px" }}>
              <MenuItemRow
                icon={<LayoutDashboard style={{ width: "16px", height: "16px" }} />}
                label="Dashboard"
                active
              />
              <MenuItemRow
                icon={<Inbox style={{ width: "16px", height: "16px" }} />}
                label="Inbox"
                badge={
                  <div
                    className="flex items-center justify-center"
                    style={{
                      minWidth: "18px",
                      height: "18px",
                      borderRadius: "9px",
                      background: "#D5143E",
                      color: "white",
                      fontSize: "10px",
                      fontWeight: 600,
                      padding: "0 5px",
                      flexShrink: 0,
                    }}
                  >
                    12
                  </div>
                }
              />
              <MenuItemRow
                icon={<Bell style={{ width: "16px", height: "16px" }} />}
                label="Notifications"
                badge={
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "3px",
                      background: "#2B7FFF",
                      flexShrink: 0,
                    }}
                  />
                }
              />
              <MenuItemRow
                icon={<Component style={{ width: "16px", height: "16px" }} />}
                label="Components"
                badge={
                  <div
                    className="flex items-center justify-center"
                    style={{
                      height: "18px",
                      borderRadius: "9px",
                      background: "rgba(43,127,255,0.08)",
                      color: "#1447e6",
                      fontSize: "10px",
                      fontWeight: 500,
                      padding: "0 6px",
                      flexShrink: 0,
                    }}
                  >
                    New
                  </div>
                }
              />
              <MenuItemRow
                icon={<Settings style={{ width: "16px", height: "16px" }} />}
                label="Settings"
              />
            </div>
          </div>
          <SidebarFooter />
        </div>
        <MainContent />
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 5: WITH SEARCH                                              //
// ================================================================== //

function WithSearchSection() {
  return (
    <PreviewSection label="With Search" wrapClassName="flex flex-col items-stretch w-full">
      <div
        className="flex"
        style={{
          width: "100%",
          height: "400px",
          border: "0.8px solid #F0F0F0",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          className="flex flex-col shrink-0"
          style={{
            width: "224px",
            background: "#FAFAFA",
            borderRight: "0.8px solid #F0F0F0",
          }}
        >
          <SidebarHeader />
          {/* Search */}
          <div style={{ padding: "8px 8px 0" }}>
            <div
              className="flex items-center"
              style={{
                height: "28px",
                border: "0.8px solid #F0F0F0",
                borderRadius: "8px",
                padding: "0 8px",
                background: "white",
                gap: "6px",
              }}
            >
              <Search style={{ width: "14px", height: "14px", color: "#C0C0C0", flexShrink: 0 }} />
              <span
                style={{
                  fontSize: "12.3px",
                  color: "#C0C0C0",
                  flex: 1,
                }}
              >
                Search...
              </span>
              <div
                className="flex items-center justify-center"
                style={{
                  background: "#F0F0F0",
                  fontSize: "9px",
                  fontWeight: 500,
                  color: "#838383",
                  padding: "2px 5px",
                  borderRadius: "3px",
                  flexShrink: 0,
                }}
              >
                ⌘K
              </div>
            </div>
          </div>
          {/* Menu */}
          <div className="flex-1 overflow-y-auto" style={{ padding: "8px" }}>
            <SectionLabel>Main</SectionLabel>
            <div className="flex flex-col" style={{ gap: "1px" }}>
              <MenuItemRow icon={<LayoutDashboard style={{ width: "16px", height: "16px" }} />} label="Dashboard" active />
              <MenuItemRow icon={<Component style={{ width: "16px", height: "16px" }} />} label="Components" />
              <MenuItemRow icon={<Palette style={{ width: "16px", height: "16px" }} />} label="Themes" />
              <MenuItemRow icon={<BookOpen style={{ width: "16px", height: "16px" }} />} label="Documentation" />
            </div>
            <SectionLabel>Settings</SectionLabel>
            <div className="flex flex-col" style={{ gap: "1px" }}>
              <MenuItemRow icon={<Settings style={{ width: "16px", height: "16px" }} />} label="Settings" />
              <MenuItemRow icon={<Users style={{ width: "16px", height: "16px" }} />} label="Team" />
            </div>
          </div>
          <SidebarFooter />
        </div>
        <MainContent />
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// SECTION 6: INTERACTIVE                                              //
// ================================================================== //

function InteractiveSection() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState("Dashboard")
  const [sections, setSections] = useState<Record<string, boolean>>({
    main: true,
    settings: true,
  })

  const toggleSection = useCallback((key: string) => {
    setSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const sidebarWidth = collapsed ? 56 : 224

  const menuSections = [
    {
      key: "main",
      label: "Main",
      items: [
        { icon: <LayoutDashboard style={{ width: "16px", height: "16px" }} />, label: "Dashboard" },
        { icon: <Component style={{ width: "16px", height: "16px" }} />, label: "Components" },
        { icon: <Palette style={{ width: "16px", height: "16px" }} />, label: "Themes" },
        { icon: <BookOpen style={{ width: "16px", height: "16px" }} />, label: "Documentation" },
      ],
    },
    {
      key: "settings",
      label: "Settings",
      items: [
        { icon: <Settings style={{ width: "16px", height: "16px" }} />, label: "Settings" },
        { icon: <Users style={{ width: "16px", height: "16px" }} />, label: "Team" },
      ],
    },
  ]

  return (
    <PreviewSection label="Interactive" wrapClassName="flex flex-col items-stretch w-full">
      <div
        className="flex"
        style={{
          width: "100%",
          height: "400px",
          border: "0.8px solid #F0F0F0",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {/* Sidebar */}
        <div
          className="flex flex-col shrink-0"
          style={{
            width: `${sidebarWidth}px`,
            background: "#FAFAFA",
            borderRight: "0.8px solid #F0F0F0",
            transition: "width 200ms ease",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center shrink-0"
            style={{
              height: "56px",
              padding: collapsed ? "0" : "0 16px",
              borderBottom: "0.8px solid #F0F0F0",
              justifyContent: collapsed ? "center" : "flex-start",
              minWidth: collapsed ? "56px" : "224px",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                background: "#262626",
                borderRadius: "6px",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#262626",
                marginLeft: "10px",
                opacity: collapsed ? 0 : 1,
                transition: "opacity 200ms ease",
                whiteSpace: "nowrap",
              }}
            >
              Hyena
            </span>
          </div>
          {/* Content */}
          <div className="flex-1 overflow-y-auto" style={{ padding: "8px", minWidth: collapsed ? "56px" : "224px" }}>
            {menuSections.map((section) => {
              const isExpanded = sections[section.key]
              return (
                <div key={section.key}>
                  {!collapsed && (
                    <button
                      className="flex items-center w-full"
                      onClick={() => toggleSection(section.key)}
                      style={{
                        padding: "8px 8px 4px",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        gap: "4px",
                      }}
                    >
                      <ChevronDown
                        style={{
                          width: "12px",
                          height: "12px",
                          color: "#C0C0C0",
                          transform: isExpanded ? "rotate(0deg)" : "rotate(-90deg)",
                          transition: "transform 200ms ease",
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 500,
                          color: "#C0C0C0",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {section.label}
                      </span>
                    </button>
                  )}
                  <div
                    style={{
                      maxHeight: collapsed || isExpanded ? "400px" : "0px",
                      overflow: "hidden",
                      transition: "max-height 200ms ease",
                    }}
                  >
                    <div className="flex flex-col" style={{ gap: collapsed ? "2px" : "1px", alignItems: collapsed ? "center" : "stretch" }}>
                      {section.items.map((item) => {
                        const isActive = activeItem === item.label
                        if (collapsed) {
                          return (
                            <IconOnlyItem
                              key={item.label}
                              icon={item.icon}
                              label={item.label}
                              active={isActive}
                            />
                          )
                        }
                        return (
                          <InteractiveMenuItem
                            key={item.label}
                            icon={item.icon}
                            label={item.label}
                            active={isActive}
                            onClick={() => setActiveItem(item.label)}
                          />
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {/* Footer */}
          <SidebarFooter iconOnly={collapsed} />
        </div>
        {/* Main content */}
        <div className="flex flex-1 flex-col">
          {/* Collapse toggle bar */}
          <div
            className="flex items-center shrink-0"
            style={{
              height: "56px",
              padding: "0 16px",
              borderBottom: "0.8px solid #F0F0F0",
            }}
          >
            <button
              onClick={() => setCollapsed((prev) => !prev)}
              className="flex items-center justify-center"
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                border: "0.8px solid #F0F0F0",
                background: "white",
                cursor: "pointer",
                color: "#838383",
              }}
            >
              <ChevronRight
                style={{
                  width: "14px",
                  height: "14px",
                  transform: collapsed ? "rotate(0deg)" : "rotate(180deg)",
                  transition: "transform 200ms ease",
                }}
              />
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <span style={{ fontSize: "13px", color: "#838383" }}>
              Selected: <span style={{ color: "#262626", fontWeight: 500 }}>{activeItem}</span>
            </span>
          </div>
        </div>
      </div>
    </PreviewSection>
  )
}

function InteractiveMenuItem({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="flex items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        height: "32px",
        padding: "0 8px",
        borderRadius: "8px",
        gap: "10px",
        background: active || hovered ? "#F0F0F0" : "transparent",
        cursor: "pointer",
        transition: "background 150ms",
      }}
    >
      <div style={{ width: "16px", height: "16px", color: active ? "#262626" : "#838383", flexShrink: 0 }}>
        {icon}
      </div>
      <span
        style={{
          fontSize: "13px",
          fontWeight: active ? 500 : 400,
          color: "#262626",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </span>
    </div>
  )
}

// ================================================================== //
// PREVIEW TAB                                                         //
// ================================================================== //

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <DefaultSection />
      <CollapsibleSectionsSection />
      <IconOnlySection />
      <WithBadgesSection />
      <WithSearchSection />
      <InteractiveSection />
    </div>
  )
}

// ================================================================== //
// CODE TAB                                                            //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="hyena-studio"
      importCode={`import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"`}
      usageCode={`<Sidebar>
  <SidebarHeader>
    <AppLogo />
  </SidebarHeader>
  <SidebarContent>
    <SidebarGroup>
      <SidebarGroupLabel>Main</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem icon={<LayoutDashboard />} active>
          Dashboard
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  </SidebarContent>
  <SidebarFooter>
    <UserProfile />
  </SidebarFooter>
</Sidebar>`}
    />
  )
}

// ================================================================== //
// API TAB                                                             //
// ================================================================== //

const SIDEBAR_PROPS: PropDef[] = [
  { prop: "width", type: "number", defaultVal: "224" },
  { prop: "collapsedWidth", type: "number", defaultVal: "56" },
  { prop: "collapsible", type: "boolean", defaultVal: "false" },
  { prop: "defaultCollapsed", type: "boolean", defaultVal: "false" },
  { prop: "side", type: '"left" | "right"', defaultVal: '"left"' },
  { prop: "children", type: "ReactNode", defaultVal: "—" },
  { prop: "className", type: "string", defaultVal: "—" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Sidebar"
      description="An app shell sidebar with collapsible sections, nested items, icon-only collapsed mode, and header/footer slots."
      props={SIDEBAR_PROPS}
    />
  )
}

// ================================================================== //
// CAP                                                                 //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Navigation",
  variants: "3",
  sizes: "2",
  deps: "None",
  related: [
    { label: "Navigation Menu", href: "/components/navigation-menu" },
    { label: "Collapsible", href: "/components/collapsible" },
    { label: "Tooltip", href: "/components/tooltip" },
    { label: "Sheet", href: "/components/sheet" },
  ],
  tokens: [
    { name: "--sidebar-bg", color: "#FAFAFA", border: true },
    { name: "--sidebar-border", color: "#F0F0F0", border: true },
    { name: "--sidebar-item-hover", color: "#F0F0F0", border: true },
    { name: "--sidebar-label", color: "#C0C0C0" },
    { name: "--sidebar-icon", color: "#838383" },
  ],
}

// ================================================================== //
// MAIN                                                                //
// ================================================================== //

export function SidebarPage() {
  return (
    <ComponentPageLayout
      name="Sidebar"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
