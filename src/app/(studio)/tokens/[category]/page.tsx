import { notFound } from "next/navigation"
import { VALID_TOKEN_CATEGORIES } from "@/editor/shell/nav-data"
import { Placeholder } from "@/editor/shell/Placeholder"

function unslug(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default async function TokenPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  if (!VALID_TOKEN_CATEGORIES.has(category)) notFound()

  return <Placeholder title={unslug(category)} section="Tokens" />
}
