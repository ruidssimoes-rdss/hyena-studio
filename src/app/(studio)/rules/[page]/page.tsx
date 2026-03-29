import { notFound } from "next/navigation"
import { VALID_RULES_PAGES } from "@/editor/shell/nav-data"
import { Placeholder } from "@/editor/shell/Placeholder"

function unslug(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default async function RulesPage({
  params,
}: {
  params: Promise<{ page: string }>
}) {
  const { page } = await params
  if (!VALID_RULES_PAGES.has(page)) notFound()

  return <Placeholder title={unslug(page)} section="Rules" />
}
