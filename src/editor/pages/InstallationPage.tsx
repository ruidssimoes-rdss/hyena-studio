"use client"

import { useEffect } from "react"
import { useSetCAP } from "@/editor/shell/CAPContext"
import { Breadcrumb } from "@/editor/components/PageShell"
import { CodeBlock } from "@/editor/components/CodeBlock"

// ================================================================== //
// CAP PANEL — "On this page" anchor links                            //
// ================================================================== //

const TOC_LINKS = [
  "Requirements",
  "Quick Start",
  "CLI Reference",
  "Design Tokens",
  "Fonts",
  "Peer Dependencies",
  "Project Structure",
  "Manual Installation",
  "FAQ",
]

function CAPContent() {
  return (
    <div style={{ padding: "14px 14px 0" }}>
      <div style={{ height: "14px" }} />
      <div style={{ padding: "7px", borderRadius: "10px" }}>
        <div
          className="font-medium"
          style={{
            fontSize: "12.3px",
            lineHeight: "18px",
            color: "#262626",
            height: "28px",
            padding: "5px 12px",
            display: "flex",
            alignItems: "center",
          }}
        >
          On this page
        </div>
        {TOC_LINKS.map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
            className="flex items-center transition-colors duration-150"
            style={{
              height: "28px",
              padding: "0 12px",
              borderRadius: "8.75px",
              fontSize: "12.3px",
              color: "#727272",
              fontWeight: 400,
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#262626"
              e.currentTarget.style.background = "rgba(0,0,0,0.04)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#727272"
              e.currentTarget.style.background = "transparent"
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  )
}

// ================================================================== //
// REUSABLE PROSE ELEMENTS                                            //
// ================================================================== //

function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 style={{ fontSize: "24px", fontWeight: 600, color: "#262626", marginBottom: "8px" }}>
      {children}
    </h1>
  )
}

function Subtitle({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: "13px", color: "#838383", lineHeight: 1.6, marginBottom: "32px" }}>
      {children}
    </p>
  )
}

function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      style={{ fontSize: "18px", fontWeight: 600, color: "#262626", marginTop: "40px", marginBottom: "16px" }}
    >
      {children}
    </h2>
  )
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#262626", marginTop: "28px", marginBottom: "12px" }}>
      {children}
    </h3>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: "13px", color: "#262626", lineHeight: 1.7, marginBottom: "16px" }}>
      {children}
    </p>
  )
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul style={{ fontSize: "13px", color: "#262626", lineHeight: 1.7, paddingLeft: "20px", marginBottom: "16px" }}>
      {children}
    </ul>
  )
}

function OL({ children }: { children: React.ReactNode }) {
  return (
    <ol style={{ fontSize: "13px", color: "#262626", lineHeight: 1.7, paddingLeft: "20px", marginBottom: "16px" }}>
      {children}
    </ol>
  )
}

function LI({ children }: { children: React.ReactNode }) {
  return <li style={{ marginBottom: "6px" }}>{children}</li>
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        background: "rgba(0,0,0,0.05)",
        padding: "2px 6px",
        borderRadius: "4px",
        fontFamily: "Geist Mono, monospace",
        fontSize: "11.5px",
        color: "#262626",
      }}
    >
      {children}
    </code>
  )
}

function Separator() {
  return <hr style={{ border: "none", borderTop: "1px solid #F0F0F0", margin: "32px 0" }} />
}

// ================================================================== //
// MAIN PAGE                                                          //
// ================================================================== //

export function InstallationPage() {
  const setCAP = useSetCAP()

  useEffect(() => {
    setCAP(<CAPContent />)
    return () => setCAP(null)
  }, [setCAP])

  return (
    <div className="flex flex-col h-full">
      {/* Sticky header */}
      <div
        className="sticky top-0 z-10 bg-white shrink-0"
        style={{ paddingTop: "28px", paddingBottom: "28px" }}
      >
        <Breadcrumb section="Getting Started" page="Installation" />
      </div>

      {/* Scrollable prose */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div style={{ paddingBottom: "28px", maxWidth: "720px" }}>

          {/* ── Title ────────────────────────────────────────────── */}
          <H1>Installation</H1>
          <Subtitle>Get up and running with Hyena Studio in under 2 minutes.</Subtitle>

          {/* ── Requirements ─────────────────────────────────────── */}
          <H2 id="requirements">Requirements</H2>
          <P>
            Hyena Studio components are built for the modern React + Tailwind stack.
            Make sure your project meets these requirements before getting started:
          </P>
          <UL>
            <LI>React 19 (or 18.3+)</LI>
            <LI>TypeScript</LI>
            <LI>Tailwind CSS 4</LI>
            <LI>Next.js 15+ (App Router recommended, Pages Router supported)</LI>
          </UL>
          <P>
            Other React frameworks (Vite, Remix, Astro) work too — but our components
            are tested against Next.js first.
          </P>

          {/* ── Quick Start ──────────────────────────────────────── */}
          <H2 id="quick-start">Quick Start</H2>

          <H3>1. Initialise Hyena Studio in your project</H3>
          <CodeBlock
            filename="Terminal"
            code="npx hyena-studio@latest init"
            highlight={false}
          />
          <div style={{ marginTop: "16px" }} />
          <P>
            The <InlineCode>init</InlineCode> command will:
          </P>
          <UL>
            <LI>Detect your project structure</LI>
            <LI>Create <InlineCode>hyena.config.json</InlineCode></LI>
            <LI>Add <InlineCode>cn()</InlineCode> utility</LI>
            <LI>Install dependencies (<InlineCode>clsx</InlineCode>, <InlineCode>tailwind-merge</InlineCode>, <InlineCode>lucide-react</InlineCode>, <InlineCode>class-variance-authority</InlineCode>)</LI>
            <LI>Inject design tokens into <InlineCode>globals.css</InlineCode></LI>
            <LI>Verify Tailwind CSS 4 setup</LI>
          </UL>
          <P>You&apos;ll be asked a few questions:</P>
          <CodeBlock
            filename="Terminal"
            code={`◇ Where is your global CSS file? (./app/globals.css)
◇ Where do you want components installed? (./components/ui)
◇ Where is your utils file? (./lib/utils.ts)
◇ Would you like to use CSS variables for colours? (yes)`}
            highlight={false}
          />

          <H3>2. Add components</H3>
          <CodeBlock
            filename="Terminal"
            code="npx hyena-studio@latest add button"
            highlight={false}
          />
          <div style={{ marginTop: "12px" }} />
          <P>Add multiple components at once:</P>
          <CodeBlock
            filename="Terminal"
            code="npx hyena-studio@latest add button input dialog select toast"
            highlight={false}
          />
          <div style={{ marginTop: "12px" }} />
          <P>Or add the entire library:</P>
          <CodeBlock
            filename="Terminal"
            code="npx hyena-studio@latest add --all"
            highlight={false}
          />

          <H3>3. Import and use</H3>
          <CodeBlock
            filename="page.tsx"
            code={`import { Button } from "@/components/ui/button"

export default function Page() {
  return <Button>Click me</Button>
}`}
          />
          <div style={{ marginTop: "16px" }} />
          <P>
            <strong style={{ fontWeight: 600 }}>That&apos;s it. You&apos;re building with Hyena.</strong>
          </P>

          <Separator />

          {/* ── CLI Reference ────────────────────────────────────── */}
          <H2 id="cli-reference">CLI Reference</H2>

          <H3><InlineCode>hyena-studio init</InlineCode></H3>
          <P>
            Scaffolds Hyena Studio into an existing project. Detects your framework,
            installs dependencies, and configures your project.
          </P>
          <CodeBlock
            filename="Terminal"
            code={`npx hyena-studio@latest init

# Options:
#   --yes, -y       Skip prompts and use defaults
#   --cwd <path>    Run in a different directory`}
            highlight={false}
          />
          <div style={{ marginTop: "16px" }} />
          <P>What it creates:</P>
          <CodeBlock
            filename="hyena.config.json"
            code={`{
  "$schema": "https://hyena.studio/schema.json",
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css"
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}`}
          />

          <H3><InlineCode>hyena-studio add [components...]</InlineCode></H3>
          <P>
            Add components to your project. Each component is installed as a source file
            you own and can modify.
          </P>
          <CodeBlock
            filename="Terminal"
            code={`npx hyena-studio@latest add [component...]

# Options:
#   --all            Install all components
#   --overwrite      Overwrite existing files
#   --cwd <path>     Run in a different directory
#   --path <path>    Override the install path`}
            highlight={false}
          />
          <div style={{ marginTop: "16px" }} />
          <P>
            Dependency resolution is automatic. If a component depends on another, both
            are installed:
          </P>
          <CodeBlock
            filename="Terminal"
            code={`npx hyena-studio@latest add code-block
# Also installs: copy-button (dependency)`}
            highlight={false}
          />
          <div style={{ marginTop: "12px" }} />
          <CodeBlock
            filename="Terminal"
            code={`npx hyena-studio@latest add data-table
# Also installs: table, badge, checkbox, button, dropdown-menu
# Peer dependency: @tanstack/react-table — you'll be prompted to install it`}
            highlight={false}
          />

          <H3><InlineCode>hyena-studio list</InlineCode></H3>
          <P>
            List all available components:
          </P>
          <CodeBlock
            filename="Terminal"
            code={`npx hyena-studio@latest list

Available components (68):

accordion        combobox          form              popover           stepper
alert            command           frame             preview-card      switch
alert-dialog     context-menu      group             progress          table
autocomplete     copy-button       input             radio-group       tabs
avatar           data-table        input-group       scroll-area       textarea
badge            date-picker       input-otp         select            timeline
breadcrumb       dialog            kbd               separator         toast
button           divider           label             sheet             toggle
calendar         drawer            menu              skeleton          toggle-group
card             empty             meter             slider            toolbar
checkbox         field             modal             spinner           tooltip
checkbox-group   fieldset          navbar            code-block        -`}
            highlight={false}
          />

          <H3><InlineCode>hyena-studio diff [component]</InlineCode></H3>
          <P>
            Show what changed in a component since you installed it. Useful before
            deciding whether to update.
          </P>
          <CodeBlock
            filename="Terminal"
            code="npx hyena-studio@latest diff button"
            highlight={false}
          />

          <Separator />

          {/* ── Design Tokens ────────────────────────────────────── */}
          <H2 id="design-tokens">Design Tokens</H2>
          <P>
            The <InlineCode>init</InlineCode> command injects a set of CSS custom
            properties into your global stylesheet. These tokens control every visual
            property across all components — colors, radii, spacing, typography, and
            elevation.
          </P>
          <CodeBlock
            filename="globals.css"
            code={`@layer base {
  :root {
    /* Colors — Brand */
    --color-primary: oklch(0.55 0.19 255);
    --color-primary-hover: oklch(0.60 0.19 255);
    --color-primary-active: oklch(0.50 0.19 255);
    --color-primary-soft: oklch(0.96 0.03 255);
    --color-on-primary: #ffffff;

    /* Colors — Semantic */
    --color-error: oklch(0.55 0.22 27);
    --color-warning: oklch(0.75 0.18 70);
    --color-success: oklch(0.65 0.19 155);

    /* Colors — Surface */
    --color-surface: #ffffff;
    --color-surface-container: #f8f8fa;
    --color-surface-container-high: #f0f0f3;
    --color-on-surface: #111111;
    --color-on-surface-muted: #6b6b76;
    --color-on-surface-subtle: #9d9daa;

    /* Colors — Outline */
    --color-outline: #e4e4e7;
    --color-outline-variant: #f0f0f3;

    /* Radius */
    --radius-xs: 4px;
    --radius-sm: 6px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
    --radius-2xl: 20px;
    --radius-full: 9999px;

    /* Spacing */
    --spacing-0: 4px;
    --spacing-1: 8px;
    --spacing-2: 12px;
    --spacing-3: 16px;
    --spacing-4: 20px;
    --spacing-5: 24px;
    --spacing-6: 32px;

    /* Elevation */
    --elevation-1: 0 0 0 1px rgba(0,0,0,0.04), 0 1px 2px -1px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.03);
    --elevation-2: 0 0 0 1px rgba(0,0,0,0.06), 0 2px 4px -1px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.05);
  }
}`}
          />
          <div style={{ marginTop: "16px" }} />
          <P>
            To override any token, edit the values directly in your{" "}
            <InlineCode>globals.css</InlineCode>. Or use Hyena Studio&apos;s visual
            editor to generate the full token set, then export:
          </P>
          <CodeBlock
            filename="globals.css"
            code={`@layer base {
  :root {
    /* Override primary to your brand color */
    --color-primary: oklch(0.65 0.24 150);
    --color-primary-hover: oklch(0.70 0.24 150);
    --color-primary-active: oklch(0.60 0.24 150);
    --color-primary-soft: oklch(0.96 0.04 150);

    /* Override radius to sharp */
    --radius-xs: 2px;
    --radius-sm: 3px;
    --radius-md: 4px;
    --radius-lg: 6px;
    --radius-xl: 8px;
    --radius-2xl: 10px;
  }
}`}
          />

          <Separator />

          {/* ── Fonts ────────────────────────────────────────────── */}
          <H2 id="fonts">Fonts</H2>
          <UL>
            <LI>
              <strong style={{ fontWeight: 600 }}>Geist</strong> — primary sans-serif font for
              all UI text. Weights 400, 500, 600.
            </LI>
            <LI>
              <strong style={{ fontWeight: 600 }}>Geist Mono</strong> — monospace font for code
              blocks, inline code, and tabular data. Weights 400, 500.
            </LI>
            <LI>
              <strong style={{ fontWeight: 600 }}>Cal Sans</strong> — display font for headings
              and marketing. Weight 600 only.
            </LI>
          </UL>
          <CodeBlock
            filename="app/layout.tsx"
            code={`import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={\`\${GeistSans.variable} \${GeistMono.variable} antialiased\`}>
        {children}
      </body>
    </html>
  )
}`}
          />

          <Separator />

          {/* ── Peer Dependencies ────────────────────────────────── */}
          <H2 id="peer-dependencies">Peer Dependencies</H2>
          <P>
            Most components have zero peer dependencies beyond React and Tailwind.
            A few advanced components require additional packages:
          </P>
          <div style={{ marginTop: "16px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Component", "Peer Dependency", "Install Command"].map((h) => (
                    <th
                      key={h}
                      className="font-medium"
                      style={{
                        fontSize: "12.3px",
                        color: "#838383",
                        textAlign: "left",
                        padding: "8px 12px",
                        background: "#FAFAFA",
                        borderBottom: "1px solid #F0F0F0",
                        fontWeight: 500,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #F0F0F0" }}>
                  <td style={{ fontSize: "13px", color: "#262626", padding: "8px 12px" }}>Chart</td>
                  <td style={{ fontSize: "13px", color: "#262626", padding: "8px 12px" }}>
                    <InlineCode>recharts</InlineCode>
                  </td>
                  <td style={{ fontSize: "13px", color: "#262626", padding: "8px 12px" }}>
                    <InlineCode>npm install recharts</InlineCode>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontSize: "13px", color: "#262626", padding: "8px 12px" }}>Data Table</td>
                  <td style={{ fontSize: "13px", color: "#262626", padding: "8px 12px" }}>
                    <InlineCode>@tanstack/react-table</InlineCode>
                  </td>
                  <td style={{ fontSize: "13px", color: "#262626", padding: "8px 12px" }}>
                    <InlineCode>npm install @tanstack/react-table</InlineCode>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Separator />

          {/* ── Project Structure ─────────────────────────────────── */}
          <H2 id="project-structure">Project Structure</H2>
          <P>
            After running <InlineCode>init</InlineCode> and adding a few components,
            your project will look something like this:
          </P>
          <CodeBlock
            filename="your-project/"
            code={`├── app/
│   ├── globals.css          # Hyena tokens injected here
│   ├── layout.tsx           # Font setup
│   └── page.tsx
├── components/
│   └── ui/
│       ├── button.tsx       # Installed by: hyena-studio add button
│       ├── input.tsx        # Installed by: hyena-studio add input
│       ├── dialog.tsx       # Installed by: hyena-studio add dialog
│       └── ...
├── lib/
│   └── utils.ts             # cn() utility
├── hyena.config.json        # Hyena Studio config
├── package.json
├── tailwind.config.ts
└── tsconfig.json`}
            highlight={false}
          />

          <Separator />

          {/* ── Manual Installation ───────────────────────────────── */}
          <H2 id="manual-installation">Manual Installation</H2>
          <P>
            If you prefer not to use the CLI, you can set everything up manually.
          </P>

          <H3>1. Install dependencies</H3>
          <CodeBlock
            filename="Terminal"
            code="npm install clsx tailwind-merge lucide-react class-variance-authority"
            highlight={false}
          />

          <H3>2. Create the cn utility</H3>
          <CodeBlock
            filename="lib/utils.ts"
            code={`import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
          />

          <H3>3. Add tokens to globals.css</H3>
          <P>
            Copy the full token block from the{" "}
            <a
              href="#design-tokens"
              style={{ color: "#2B7FFF", textDecoration: "none", fontWeight: 500 }}
              onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline" }}
              onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none" }}
            >
              Design Tokens
            </a>{" "}
            section above into your <InlineCode>globals.css</InlineCode>.
          </P>

          <H3>4. Copy component files</H3>
          <P>
            Browse the component source code in Hyena Studio, copy the files you need
            into your <InlineCode>components/ui/</InlineCode> directory, and import them
            as usual.
          </P>

          <Separator />

          {/* ── FAQ ──────────────────────────────────────────────── */}
          <H2 id="faq">FAQ</H2>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "8px" }}>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#262626", marginBottom: "4px" }}>
                Can I use Hyena with Vite / Remix / Astro?
              </div>
              <div style={{ fontSize: "13px", color: "#838383", lineHeight: 1.7 }}>
                Yes. The components are standard React + Tailwind — they work anywhere
                React runs. The CLI auto-detects your framework. Next.js is the primary
                test target.
              </div>
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#262626", marginBottom: "4px" }}>
                Can I use Hyena alongside shadcn/ui?
              </div>
              <div style={{ fontSize: "13px", color: "#838383", lineHeight: 1.7 }}>
                Yes. Both use the same components/ui directory pattern. Hyena components
                can coexist with shadcn components — just be mindful of naming conflicts.
              </div>
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#262626", marginBottom: "4px" }}>
                Do I need Base UI / Radix UI?
              </div>
              <div style={{ fontSize: "13px", color: "#838383", lineHeight: 1.7 }}>
                No. Hyena components are built from scratch. No primitive library required.
              </div>
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#262626", marginBottom: "4px" }}>
                Can I customise the components after installing?
              </div>
              <div style={{ fontSize: "13px", color: "#838383", lineHeight: 1.7 }}>
                That&apos;s the whole point. You own the source code. Edit anything.
              </div>
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#262626", marginBottom: "4px" }}>
                How do I update a component?
              </div>
              <div style={{ fontSize: "13px", color: "#838383", lineHeight: 1.7 }}>
                Run <InlineCode>npx hyena-studio@latest diff button</InlineCode> to see
                what changed, then{" "}
                <InlineCode>npx hyena-studio@latest add button --overwrite</InlineCode>{" "}
                to pull the latest version.
              </div>
            </div>
          </div>

          {/* Bottom breathing room */}
          <div style={{ height: "40px" }} />
        </div>
      </div>
    </div>
  )
}
