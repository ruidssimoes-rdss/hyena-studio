// ------------------------------------------------------------------ //
// Sidebar navigation structure                                        //
// ------------------------------------------------------------------ //

export interface NavItem {
  label: string
  href: string
  badge?: string
  locked?: boolean
}

export interface NavGroup {
  label: string
  items: NavItem[]
  defaultOpen?: boolean
  groupBadge?: string
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
  "Carousel",
  "Chart",
  "Checkbox",
  "Checkbox Group",
  "Collapsible",
  "Code Block",
  "Color Picker",
  "Combobox",
  "Command",
  "Context Menu",
  "Copy Button",
  "Data Table",
  "Date Picker",
  "Dialog",
  "Drawer",
  "Empty",
  "Field",
  "Fieldset",
  "File Upload",
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
  "Navigation Menu",
  "Number Field",
  "Pagination",
  "Popover",
  "Preview Card",
  "Progress",
  "Radio Group",
  "Resizable",
  "Scroll Area",
  "Select",
  "Separator",
  "Sheet",
  "Sidebar",
  "Skeleton",
  "Slider",
  "Spinner",
  "Stepper",
  "Switch",
  "Table",
  "Tabs",
  "Textarea",
  "Timeline",
  "Toast",
  "Toggle",
  "Toggle Group",
  "Toolbar",
  "Tooltip",
] as const

const BADGE_MAP: Record<string, string> = {
  Chart: "New",
  "Data Table": "New",
  "File Upload": "New",
  Sidebar: "New",
}

const COMPONENT_ITEMS: NavItem[] = COMPONENT_LABELS.map((label) => ({
  label,
  href: `/components/${slug(label)}`,
  badge: BADGE_MAP[label],
}))

// ── Tokens ─────────────────────────────────────────────────────────── //

const TOKEN_ITEMS: NavItem[] = [
  { label: "Colour", href: "/tokens/colour", locked: true },
  { label: "Shapes", href: "/tokens/shapes", locked: true },
  { label: "Spacing", href: "/tokens/spacing", locked: true },
  { label: "Styles", href: "/tokens/styles", locked: true },
  { label: "Typography", href: "/tokens/typography", locked: true },
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

// ── Getting Started ───────────────────────────────────────────────── //

const GETTING_STARTED_ITEMS: NavItem[] = [
  { label: "Installation", href: "/docs/installation" },
]

// ── Assembled groups ───────────────────────────────────────────────── //

export const NAV_GROUPS: NavGroup[] = [
  { label: "Getting Started", items: GETTING_STARTED_ITEMS, defaultOpen: true },
  { label: "Components", items: COMPONENT_ITEMS, defaultOpen: true },
  { label: "Tokens", items: TOKEN_ITEMS, groupBadge: "Soon" },
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

export const VALID_DOCS_PAGES = new Set(["installation"])

// ── Functional component slugs (have real content) ─────────────────── //

export const FUNCTIONAL_COMPONENT_SLUGS = new Set([
  "accordion",
  "avatar",
  "breadcrumb",
  "button",
  "checkbox",
  "checkbox-group",
  "collapsible",
  "empty",
  "field",
  "fieldset",
  "frame",
  "group",
  "input",
  "kbd",
  "label",
  "meter",
  "number-field",
  "pagination",
  "progress",
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
  "radio-group",
  "scroll-area",
  "separator",
  "slider",
  "spinner",
  "switch",
  "tabs",
  "textarea",
  "toggle-group",
  "toolbar",
  "dialog",
  "alert-dialog",
  "drawer",
  "sheet",
  "input-group",
  "input-otp",
  "autocomplete",
  "combobox",
  "popover",
  "menu",
  "toast",
  "preview-card",
  "calendar",
  "date-picker",
  "command",
  "form",
  "copy-button",
  "code-block",
  "context-menu",
  "timeline",
  "stepper",
  "color-picker",
  "carousel",
  "navigation-menu",
  "resizable",
  "chart",
  "data-table",
  "file-upload",
  "sidebar",
])
