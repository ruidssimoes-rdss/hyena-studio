export interface ComponentMeta {
  name: string;
  description: string;
  dependencies: string[];
  peerDependencies: string[];
  internalDependencies: string[];
  files: { src: string; dest: string }[];
}

export const components: ComponentMeta[] = [
  {
    name: "button",
    description: "Primary interactive element with multiple variants and sizes.",
    dependencies: [],
    peerDependencies: [],
    internalDependencies: [],
    files: [{ src: "src/components/primitives/Button.tsx", dest: "button.tsx" }],
  },
  {
    name: "input",
    description: "Text input field with label, validation, and icon support.",
    dependencies: [],
    peerDependencies: [],
    internalDependencies: [],
    files: [{ src: "src/components/primitives/Input.tsx", dest: "input.tsx" }],
  },
  {
    name: "badge",
    description: "Small status indicator with semantic color variants.",
    dependencies: [],
    peerDependencies: [],
    internalDependencies: [],
    files: [{ src: "src/components/primitives/Badge.tsx", dest: "badge.tsx" }],
  },
  {
    name: "toggle",
    description: "Boolean on/off switch with label support.",
    dependencies: [],
    peerDependencies: [],
    internalDependencies: [],
    files: [{ src: "src/components/primitives/Toggle.tsx", dest: "toggle.tsx" }],
  },
  {
    name: "select",
    description:
      "Dropdown selection with search, keyboard navigation, and custom options.",
    dependencies: [],
    peerDependencies: [],
    internalDependencies: [],
    files: [{ src: "src/components/primitives/Select.tsx", dest: "select.tsx" }],
  },
  {
    name: "tooltip",
    description: "Contextual hint displayed on hover or focus.",
    dependencies: [],
    peerDependencies: [],
    internalDependencies: [],
    files: [
      { src: "src/components/primitives/Tooltip.tsx", dest: "tooltip.tsx" },
    ],
  },
  {
    name: "divider",
    description: "Visual separator for content sections.",
    dependencies: [],
    peerDependencies: [],
    internalDependencies: [],
    files: [
      { src: "src/components/primitives/Divider.tsx", dest: "divider.tsx" },
    ],
  },
  {
    name: "card",
    description:
      "Container with variants for elevated, outlined, and filled styles.",
    dependencies: [],
    peerDependencies: [],
    internalDependencies: [],
    files: [{ src: "src/components/composite/Card.tsx", dest: "card.tsx" }],
  },
  {
    name: "alert",
    description:
      "Contextual feedback messages with semantic types and dismiss support.",
    dependencies: [],
    peerDependencies: [],
    internalDependencies: [],
    files: [{ src: "src/components/composite/Alert.tsx", dest: "alert.tsx" }],
  },
  {
    name: "modal",
    description:
      "Overlay dialog with focus trapping, keyboard dismiss, and scroll lock.",
    dependencies: [],
    peerDependencies: [],
    internalDependencies: [],
    files: [{ src: "src/components/composite/Modal.tsx", dest: "modal.tsx" }],
  },
  {
    name: "navbar",
    description: "Application navigation bar with solid and glass variants.",
    dependencies: [],
    peerDependencies: [],
    internalDependencies: [],
    files: [{ src: "src/components/composite/Navbar.tsx", dest: "navbar.tsx" }],
  },
  {
    name: "table",
    description:
      "Data table with sorting, selection, and density-aware sizing.",
    dependencies: [],
    peerDependencies: [],
    internalDependencies: [],
    files: [{ src: "src/components/composite/Table.tsx", dest: "table.tsx" }],
  },
  {
    name: "skeleton",
    description:
      "Loading placeholder matching content shape with pulse animation.",
    dependencies: [],
    peerDependencies: [],
    internalDependencies: [],
    files: [
      { src: "src/components/composite/Skeleton.tsx", dest: "skeleton.tsx" },
    ],
  },
];
