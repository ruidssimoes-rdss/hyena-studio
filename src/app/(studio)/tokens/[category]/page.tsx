import { notFound } from "next/navigation"
import { VALID_TOKEN_CATEGORIES } from "@/editor/shell/nav-data"
import { Placeholder } from "@/editor/shell/Placeholder"

// Token editor pages are temporarily locked — engine code in src/tokens/ is intact.
// Uncomment imports below when ready to re-enable:
// import { ColourPage } from "@/editor/pages/tokens/ColourPage"
// import { ShapesPage } from "@/editor/pages/tokens/ShapesPage"
// import { SpacingPage } from "@/editor/pages/tokens/SpacingPage"
// import { StylesPage } from "@/editor/pages/tokens/StylesPage"
// import { TypographyPage } from "@/editor/pages/tokens/TypographyPage"

const TITLE_MAP: Record<string, string> = {
  colour: "Colour",
  shapes: "Shapes",
  spacing: "Spacing",
  styles: "Styles",
  typography: "Typography",
}

export default async function TokenPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  if (!VALID_TOKEN_CATEGORIES.has(category)) notFound()

  return <Placeholder title={TITLE_MAP[category] ?? category} section="Tokens" />
}
