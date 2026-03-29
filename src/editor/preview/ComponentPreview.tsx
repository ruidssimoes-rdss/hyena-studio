"use client"

import { useState, useCallback } from "react"
import { Check, Copy } from "lucide-react"
import {
  Alert,
  Badge,
  Button,
  Card,
  Divider,
  Input,
  Modal,
  Navbar,
  NavLink,
  Select,
  Skeleton,
  Table,
  Toggle,
  Tooltip,
} from "@/components"
import { Plus, Star } from "lucide-react"
import { getComponentSource } from "@/lib/export"

// ------------------------------------------------------------------ //
// Preview Frame — COSS pattern: content on top, tab bar at bottom     //
// ------------------------------------------------------------------ //

function PreviewFrame({
  name,
  children,
  index = 0,
  autoHeight = false,
}: {
  name: string
  children: React.ReactNode
  index?: number
  autoHeight?: boolean
}) {
  const [tab, setTab] = useState<"preview" | "code">("preview")
  const [copied, setCopied] = useState(false)
  const code = getComponentSource(name) || "// Component not found"

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  return (
    <section
      className="opacity-0"
      style={{
        animation: `section-enter 250ms cubic-bezier(0, 0, 0.2, 1) forwards`,
        animationDelay: `${index * 40}ms`,
      }}
    >
      {/* Section label */}
      <h2 className="text-sm font-semibold text-[var(--chrome-text)] mb-3">
        {name}
      </h2>

      {/* COSS card frame */}
      <div className="rounded-2xl border border-[var(--chrome-border)] bg-[var(--chrome-surface)] shadow-[0_1px_rgba(0,0,0,0.04)] overflow-hidden">
        {tab === "preview" ? (
          /* Preview area — COSS: flex items-center justify-center p-10 */
          <div
            className={`flex items-center justify-center p-10 overflow-y-auto ${
              autoHeight ? "min-h-[200px]" : "min-h-[300px]"
            }`}
          >
            <div className="w-full">{children}</div>
          </div>
        ) : (
          /* Code view — dark bg, mono font */
          <div className="relative min-h-[300px]">
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium text-[rgba(255,255,255,0.5)] hover:text-[rgba(255,255,255,0.8)] bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.12)] transition-colors z-10"
            >
              {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
              {copied ? "Copied" : "Copy"}
            </button>
            <pre className="p-10 text-[13px] font-mono leading-[1.7] text-[#d4d4d8] bg-[#1a1a2e] overflow-x-auto max-h-[450px] overflow-y-auto whitespace-pre">
              {code}
            </pre>
          </div>
        )}

        {/* Tab bar at bottom — COSS pattern: border-top, bg-code */}
        <div className="flex items-center border-t border-[var(--chrome-border)] bg-[var(--chrome-surface)]">
          {(["preview", "code"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative h-9 sm:h-8 px-4 text-sm sm:text-xs font-medium transition-colors ${
                tab === t
                  ? "text-[var(--chrome-text)]"
                  : "text-[var(--chrome-text-secondary)] hover:text-[var(--chrome-text-secondary)]"
              }`}
            >
              {t === "preview" ? "Preview" : "Code"}
              {tab === t && (
                <span className="absolute bottom-0 left-2 right-2 h-[2px] rounded-t-full bg-[var(--chrome-accent)]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ------------------------------------------------------------------ //
// Table data                                                          //
// ------------------------------------------------------------------ //

const TABLE_COLUMNS = [
  { key: "name", label: "Name", sortable: true },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
  {
    key: "revenue",
    label: "Revenue",
    align: "right" as const,
    sortable: true,
  },
]

const TABLE_DATA = [
  {
    id: "1",
    name: "Alice Johnson",
    role: "Engineer",
    status: <Badge color="success" variant="soft" size="sm">Active</Badge>,
    revenue: "$12,400",
  },
  {
    id: "2",
    name: "Bob Smith",
    role: "Designer",
    status: <Badge color="warning" variant="soft" size="sm">Away</Badge>,
    revenue: "$8,200",
  },
  {
    id: "3",
    name: "Carol White",
    role: "PM",
    status: <Badge color="success" variant="soft" size="sm">Active</Badge>,
    revenue: "$15,800",
  },
  {
    id: "4",
    name: "Dave Brown",
    role: "Engineer",
    status: <Badge color="error" variant="soft" size="sm">Offline</Badge>,
    revenue: "$6,100",
  },
]

// ------------------------------------------------------------------ //
// Main preview                                                        //
// ------------------------------------------------------------------ //

export function ComponentPreview() {
  const [modalOpen, setModalOpen] = useState(false)
  const [destructiveModalOpen, setDestructiveModalOpen] = useState(false)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [selectValue, setSelectValue] = useState("")

  const toggleRow = (id: string) =>
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    )

  return (
    <div className="space-y-8">
      {/* Button */}
      <PreviewFrame name="Button" index={0}>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-[var(--spacing-2)]">
            <Button>Filled</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="soft">Soft</Button>
          </div>
          <div className="flex flex-wrap items-center gap-[var(--spacing-2)]">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button icon={<Plus />} size="sm">With icon</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
      </PreviewFrame>

      {/* Input */}
      <PreviewFrame name="Input" index={1}>
        <div className="grid grid-cols-2 gap-[var(--spacing-3)]">
          <Input label="Name" placeholder="John Doe" />
          <Input label="Email" placeholder="john@example.com" variant="filled" />
          <Input label="Error state" error="This field is required" />
          <Input label="Disabled" disabled placeholder="Can't touch this" />
        </div>
      </PreviewFrame>

      {/* Badge */}
      <PreviewFrame name="Badge" index={2} autoHeight>
        <div className="flex flex-wrap items-center gap-[var(--spacing-2)]">
          <Badge>Default</Badge>
          <Badge color="primary">Primary</Badge>
          <Badge color="success" variant="soft">Success</Badge>
          <Badge color="warning" variant="soft">Warning</Badge>
          <Badge color="error" variant="filled">Error</Badge>
          <Badge variant="outlined">Outlined</Badge>
          <Badge variant="dot" color="success">Online</Badge>
        </div>
      </PreviewFrame>

      {/* Toggle */}
      <PreviewFrame name="Toggle" index={3} autoHeight>
        <div className="flex items-center gap-[var(--spacing-5)]">
          <Toggle label="Notifications" />
          <Toggle label="Dark mode" size="sm" />
          <Toggle label="Disabled" disabled />
        </div>
      </PreviewFrame>

      {/* Select */}
      <PreviewFrame name="Select" index={4}>
        <div className="grid grid-cols-2 gap-[var(--spacing-3)]">
          <Select
            label="Framework"
            options={[
              { value: "next", label: "Next.js" },
              { value: "remix", label: "Remix" },
              { value: "astro", label: "Astro" },
            ]}
            value={selectValue}
            onChange={setSelectValue}
          />
          <Select
            label="Disabled"
            variant="filled"
            options={[{ value: "none", label: "No options" }]}
            disabled
          />
        </div>
      </PreviewFrame>

      {/* Tooltip */}
      <PreviewFrame name="Tooltip" index={5} autoHeight>
        <div className="flex items-center gap-[var(--spacing-3)]">
          <Tooltip content="Save your changes">
            <Button variant="outlined">Hover me</Button>
          </Tooltip>
          <Tooltip content="This is on the right" side="right">
            <Button variant="ghost">Right tooltip</Button>
          </Tooltip>
        </div>
      </PreviewFrame>

      {/* Divider */}
      <PreviewFrame name="Divider" index={6} autoHeight>
        <div className="space-y-[var(--spacing-3)]">
          <p className="text-[var(--type-body-md-size)] text-[var(--color-on-surface-muted)]">Content above</p>
          <Divider />
          <p className="text-[var(--type-body-md-size)] text-[var(--color-on-surface-muted)]">Content below</p>
        </div>
      </PreviewFrame>

      {/* Card */}
      <PreviewFrame name="Card" index={7}>
        <div className="grid grid-cols-3 gap-[var(--spacing-3)]">
          <Card variant="elevated">
            <Card.Header>
              <div>
                <h3 className="text-[var(--type-label-lg-size)] font-[var(--type-label-lg-weight)] text-[var(--color-on-surface)]">
                  Elevated
                </h3>
                <p className="text-[var(--type-body-sm-size)] text-[var(--color-on-surface-muted)] mt-0.5">
                  With concentric Button
                </p>
              </div>
              <Badge color="primary" variant="soft" size="sm">New</Badge>
            </Card.Header>
            <Card.Body>
              <p className="text-[var(--type-body-md-size)] text-[var(--color-on-surface-muted)]">
                Button inside Card gets concentric radius.
              </p>
            </Card.Body>
            <Card.Footer>
              <Button variant="ghost" size="sm">Cancel</Button>
              <Button size="sm">Save</Button>
            </Card.Footer>
          </Card>

          <Card variant="outlined">
            <Card.Header>
              <h3 className="text-[var(--type-label-lg-size)] font-[var(--type-label-lg-weight)] text-[var(--color-on-surface)]">
                Outlined
              </h3>
            </Card.Header>
            <Card.Body>
              <p className="text-[var(--type-body-md-size)] text-[var(--color-on-surface-muted)]">
                Clean border variant for secondary content.
              </p>
            </Card.Body>
          </Card>

          <Card variant="filled" interactive>
            <Card.Header>
              <h3 className="text-[var(--type-label-lg-size)] font-[var(--type-label-lg-weight)] text-[var(--color-on-surface)]">
                Filled + Interactive
              </h3>
              <Star className="size-4 text-[var(--color-on-surface-subtle)]" />
            </Card.Header>
            <Card.Body>
              <p className="text-[var(--type-body-md-size)] text-[var(--color-on-surface-muted)]">
                Click me — hover and active states.
              </p>
            </Card.Body>
          </Card>
        </div>
      </PreviewFrame>

      {/* Alert */}
      <PreviewFrame name="Alert" index={8}>
        <div className="space-y-[var(--spacing-2)]">
          <Alert type="info" title="Information">
            This is an informational message with default icon.
          </Alert>
          <Alert type="success" title="Success" dismissible>
            Operation completed. This one is dismissible.
          </Alert>
          <Alert type="warning" variant="outlined">
            Warning with outlined variant — no title.
          </Alert>
          <Alert type="error" variant="filled" title="Error">
            Something went wrong. Filled variant for emphasis.
          </Alert>
        </div>
      </PreviewFrame>

      {/* Skeleton */}
      <PreviewFrame name="Skeleton" index={9} autoHeight>
        <div className="space-y-[var(--spacing-3)]">
          <div className="flex gap-[var(--spacing-3)] items-start">
            <Skeleton variant="circular" />
            <div className="flex-1 space-y-[var(--spacing-1)]">
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" />
              <Skeleton variant="text" width="80%" />
            </div>
          </div>
          <Skeleton variant="rectangular" height={100} />
        </div>
      </PreviewFrame>

      {/* Modal */}
      <PreviewFrame name="Modal" index={10} autoHeight>
        <div className="flex gap-[var(--spacing-2)]">
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Button variant="destructive" onClick={() => setDestructiveModalOpen(true)}>
            Destructive Modal
          </Button>
        </div>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Create Project"
          description="Add a new project to your workspace."
          footer={
            <>
              <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setModalOpen(false)}>Create</Button>
            </>
          }
        >
          <div className="space-y-[var(--spacing-3)]">
            <Input label="Project name" placeholder="My project" />
            <Toggle label="Make public" />
          </div>
        </Modal>

        <Modal
          open={destructiveModalOpen}
          onClose={() => setDestructiveModalOpen(false)}
          variant="destructive"
          size="sm"
          title="Delete Project"
          description="This action cannot be undone. All data will be permanently removed."
          footer={
            <>
              <Button variant="ghost" onClick={() => setDestructiveModalOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={() => setDestructiveModalOpen(false)}>Delete</Button>
            </>
          }
        >
          <p className="text-[var(--type-body-md-size)] text-[var(--color-on-surface-muted)]">
            Are you sure you want to delete &quot;My Project&quot;?
          </p>
        </Modal>
      </PreviewFrame>

      {/* Navbar */}
      <PreviewFrame name="Navbar" index={11} autoHeight>
        <div className="rounded-[var(--radius-lg)] overflow-hidden border border-[var(--color-outline-variant)]">
          <Navbar
            variant="glass"
            size="compact"
            brand={
              <span className="text-[var(--type-label-lg-size)] font-semibold text-[var(--color-on-surface)]">
                Glass
              </span>
            }
            actions={
              <Button size="sm" icon={<Plus />}>New</Button>
            }
          >
            <NavLink active>Dashboard</NavLink>
            <NavLink>Analytics</NavLink>
            <NavLink>Reports</NavLink>
          </Navbar>
        </div>
      </PreviewFrame>

      {/* Table */}
      <PreviewFrame name="Table" index={12}>
        <Card variant="outlined" className="overflow-hidden p-0">
          <Table
            variant="default"
            columns={TABLE_COLUMNS}
            data={TABLE_DATA}
            selectable
            selectedRows={selectedRows}
            onSelectRow={toggleRow}
          />
        </Card>
      </PreviewFrame>
    </div>
  )
}
