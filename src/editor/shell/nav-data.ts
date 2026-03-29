// ------------------------------------------------------------------ //
// Sidebar navigation structure                                        //
// ------------------------------------------------------------------ //

export interface NavItem {
  label: string
  href: string
  badge?: string
}

export interface NavGroup {
  label: string
  items: NavItem[]
  defaultOpen?: boolean
}

function slug(label: string): string {
  return label.toLowerCase().replace(/\s+/g, "-")
}

// ── Components ─────────────────────────────────────────────────────── //

const COMPONENT_LABELS = [
  "Accordion",
  "Alert",
  "Alert Dialog",
  "Autocomplete",
  "Avatar",
  "Badge",
  "Breadcrumb",
  "Button",
  "Calendar",
  "Card",
  "Checkbox",
  "Checkbox Group",
  "Collapsible",
  "Combobox",
  "Command",
  "Date Picker",
  "Dialog",
  "Drawer",
  "Empty",
  "Field",
  "Fieldset",
  "Form",
  "Frame",
  "Group",
  "Input",
  "Input Group",
  "Input OTP",
  "Kbd",
  "Label",
  "Menu",
  "Meter",
  "Number Field",
  "Pagination",
  "Popover",
  "Preview Card",
  "Progress",
  "Radio Group",
  "Scroll Area",
  "Select",
  "Separator",
  "Sheet",
  "Skeleton",
  "Slider",
  "Spinner",
  "Switch",
  "Table",
  "Tabs",
  "Textarea",
  "Toast",
  "Toggle",
  "Toggle Group",
  "Toolbar",
  "Tooltip",
] as const

const BADGE_MAP: Record<string, string> = {
  Alert: "New",
  Badge: "New",
  Card: "New",
  Divider: "New",
  Input: "New",
  Modal: "New",
  Navbar: "New",
  Select: "New",
  Skeleton: "New",
  Table: "New",
  Toggle: "New",
  Tooltip: "New",
}

const COMPONENT_ITEMS: NavItem[] = COMPONENT_LABELS.map((label) => ({
  label,
  href: `/components/${slug(label)}`,
  badge: BADGE_MAP[label],
}))

// ── Tokens ─────────────────────────────────────────────────────────── //

const TOKEN_ITEMS: NavItem[] = [
  { label: "Colour", href: "/tokens/colour" },
  { label: "Shapes", href: "/tokens/shapes" },
  { label: "Spacing", href: "/tokens/spacing" },
  { label: "Styles", href: "/tokens/styles" },
  { label: "Typography", href: "/tokens/typography" },
]

// ── Rules ──────────────────────────────────────────────────────────── //

const RULES_ITEMS: NavItem[] = [
  { label: "Guides", href: "/rules/guides" },
  { label: "Passes", href: "/rules/passes" },
  { label: "Score", href: "/rules/score" },
  { label: "Violations", href: "/rules/violations" },
]

// ── Icons ──────────────────────────────────────────────────────────── //

const ICON_ITEMS: NavItem[] = [
  { label: "Desktop", href: "/icons/desktop" },
  { label: "Mobile", href: "/icons/mobile" },
]

// ── Assembled groups ───────────────────────────────────────────────── //

export const NAV_GROUPS: NavGroup[] = [
  { label: "Components", items: COMPONENT_ITEMS, defaultOpen: true },
  { label: "Tokens", items: TOKEN_ITEMS },
  { label: "Rules", items: RULES_ITEMS },
  { label: "Icons", items: ICON_ITEMS },
]

// ── Slug validation sets ───────────────────────────────────────────── //

export const VALID_COMPONENT_SLUGS = new Set(
  COMPONENT_LABELS.map((l) => slug(l))
)

export const VALID_TOKEN_CATEGORIES = new Set([
  "colour",
  "shapes",
  "spacing",
  "styles",
  "typography",
])

export const VALID_RULES_PAGES = new Set([
  "guides",
  "passes",
  "score",
  "violations",
])

export const VALID_ICON_PLATFORMS = new Set(["desktop", "mobile"])

// ── Functional component slugs (have real content) ─────────────────── //

export const FUNCTIONAL_COMPONENT_SLUGS = new Set([
  "button",
  "input",
  "badge",
  "toggle",
  "select",
  "tooltip",
  "divider",
  "card",
  "modal",
  "alert",
  "navbar",
  "table",
  "skeleton",
])
