"use client"

import { useState } from "react"
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
// CAP DATA                                                            //
// ================================================================== //

const capData: CAPData = {
  type: "Composite",
  variants: "4",
  sizes: "1",
  deps: "cn",
  related: [{ label: "Button", href: "/components/button" }],
  tokens: [
    { name: "--primary", color: "#262626" },
    { name: "--border", color: "#F0F0F0", border: true },
    { name: "--muted-fg", color: "#838383" },
    { name: "--surface-subtle", color: "#F8F8F8" },
  ],
}

// ================================================================== //
// API PROPS                                                           //
// ================================================================== //

const apiProps: PropDef[] = [
  { prop: "defaultValue", type: "string", defaultVal: "—" },
  { prop: "value", type: "string", defaultVal: "—" },
  { prop: "onValueChange", type: "(value: string) => void", defaultVal: "—" },
  { prop: "orientation", type: '"horizontal" | "vertical"', defaultVal: '"horizontal"' },
  { prop: "className", type: "string", defaultVal: "—" },
]

// ================================================================== //
// DEFAULT TABS                                                        //
// ================================================================== //

function DefaultTabs() {
  const [active, setActive] = useState("account")
  const tabs = [
    { value: "account", label: "Account" },
    { value: "password", label: "Password" },
    { value: "notifications", label: "Notifications" },
  ]
  const content: Record<string, string> = {
    account: "Make changes to your account here. Click save when you're done.",
    password: "Change your password here. After saving, you'll be logged out.",
    notifications: "Manage your notification preferences and delivery channels.",
  }

  return (
    <div style={{ width: "380px" }}>
      <div
        style={{
          display: "flex",
          borderBottom: "0.8px solid #F0F0F0",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            style={{
              padding: "8px 16px",
              fontSize: "13px",
              fontWeight: 500,
              color: active === tab.value ? "#262626" : "#838383",
              borderBottom: active === tab.value ? "2px solid #262626" : "2px solid transparent",
              background: "transparent",
              border: "none",
              borderBottomStyle: "solid",
              borderBottomWidth: "2px",
              borderBottomColor: active === tab.value ? "#262626" : "transparent",
              cursor: "pointer",
              transition: "color 150ms",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ padding: "16px", fontSize: "13px", color: "#262626" }}>
        {content[active]}
      </div>
    </div>
  )
}

// ================================================================== //
// UNDERLINE TABS                                                      //
// ================================================================== //

function UnderlineTabs() {
  const [active, setActive] = useState("overview")
  const tabs = [
    { value: "overview", label: "Overview" },
    { value: "analytics", label: "Analytics" },
    { value: "reports", label: "Reports" },
  ]
  const content: Record<string, string> = {
    overview: "A high-level summary of your project metrics and recent activity.",
    analytics: "Detailed breakdowns of traffic sources, conversions, and engagement.",
    reports: "Generate and download custom reports for any date range.",
  }

  return (
    <div style={{ width: "380px" }}>
      <div
        style={{
          display: "flex",
          borderBottom: "0.8px solid #F0F0F0",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            style={{
              padding: "8px 16px",
              fontSize: "13px",
              fontWeight: 500,
              color: active === tab.value ? "#262626" : "#838383",
              background: "transparent",
              border: "none",
              borderBottomStyle: "solid",
              borderBottomWidth: "2px",
              borderBottomColor: active === tab.value ? "#262626" : "transparent",
              cursor: "pointer",
              transition: "color 150ms, border-color 150ms",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ padding: "16px", fontSize: "13px", color: "#262626" }}>
        {content[active]}
      </div>
    </div>
  )
}

// ================================================================== //
// PILL TABS                                                           //
// ================================================================== //

function PillTabs() {
  const [active, setActive] = useState("daily")
  const tabs = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ]
  const content: Record<string, string> = {
    daily: "Showing data for the last 24 hours with hourly breakdowns.",
    weekly: "Showing data for the last 7 days with daily breakdowns.",
    monthly: "Showing data for the last 30 days with weekly breakdowns.",
  }

  return (
    <div style={{ width: "380px" }}>
      <div
        style={{
          display: "inline-flex",
          background: "#F0F0F0",
          borderRadius: "8px",
          padding: "3px",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            style={{
              padding: "6px 14px",
              fontSize: "12px",
              fontWeight: 500,
              borderRadius: "6px",
              border: "none",
              background: active === tab.value ? "white" : "transparent",
              color: active === tab.value ? "#262626" : "#838383",
              boxShadow: active === tab.value ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
              cursor: "pointer",
              transition: "all 150ms",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ padding: "16px", fontSize: "13px", color: "#262626" }}>
        {content[active]}
      </div>
    </div>
  )
}

// ================================================================== //
// VERTICAL TABS                                                       //
// ================================================================== //

function VerticalTabs() {
  const [active, setActive] = useState("general")
  const tabs = [
    { value: "general", label: "General" },
    { value: "security", label: "Security" },
    { value: "billing", label: "Billing" },
    { value: "integrations", label: "Integrations" },
  ]
  const content: Record<string, string> = {
    general: "Manage your general account settings including display name, email, and language preferences.",
    security: "Configure two-factor authentication, session management, and password policies.",
    billing: "View your current plan, payment methods, and billing history.",
    integrations: "Connect third-party services and manage API keys for your workspace.",
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "16px", width: "420px" }}>
      <div style={{ display: "flex", flexDirection: "column", width: "140px", flexShrink: 0 }}>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            style={{
              padding: "8px 12px",
              fontSize: "13px",
              fontWeight: 500,
              color: active === tab.value ? "#262626" : "#838383",
              background: active === tab.value ? "#F8F8F8" : "transparent",
              borderRadius: "8px",
              border: "none",
              textAlign: "left",
              cursor: "pointer",
              transition: "color 150ms, background 150ms",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, fontSize: "13px", color: "#262626", padding: "8px 0" }}>
        {content[active]}
      </div>
    </div>
  )
}

// ================================================================== //
// CODE & API CONTENT                                                  //
// ================================================================== //

const importCode = `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"`

const usageCode = `<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Make changes to your account here.
  </TabsContent>
  <TabsContent value="password">
    Change your password here.
  </TabsContent>
  <TabsContent value="notifications">
    Manage your notification preferences.
  </TabsContent>
</Tabs>`

// ================================================================== //
// PAGE                                                                //
// ================================================================== //

export function TabsPage() {
  return (
    <ComponentPageLayout
      name="Tabs"
      capContent={<ComponentCAP data={capData} />}
      previewContent={
        <div className="flex flex-col" style={{ gap: "28px" }}>
          <PreviewSection label="Default">
            <DefaultTabs />
          </PreviewSection>

          <PreviewSection label="Underline">
            <UnderlineTabs />
          </PreviewSection>

          <PreviewSection label="Pill">
            <PillTabs />
          </PreviewSection>

          <PreviewSection label="Vertical" wrapClassName="flex flex-col items-center gap-[10px] w-full">
            <VerticalTabs />
          </PreviewSection>
        </div>
      }
      codeContent={
        <StandardCodeTab
          packageName="@hyena/tabs"
          importCode={importCode}
          usageCode={usageCode}
        />
      }
      apiContent={
        <StandardApiTab
          name="Tabs"
          description="A set of layered sections of content, known as tab panels, that are displayed one at a time. Built with accessible keyboard navigation and ARIA attributes."
          props={apiProps}
        />
      }
    />
  )
}
