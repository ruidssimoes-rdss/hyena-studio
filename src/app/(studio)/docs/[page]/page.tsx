import { notFound } from "next/navigation"
import { VALID_DOCS_PAGES } from "@/editor/shell/nav-data"
import { Placeholder } from "@/editor/shell/Placeholder"
import { InstallationPage } from "@/editor/pages/InstallationPage"

const PAGE_MAP: Record<string, React.ComponentType> = {
  installation: InstallationPage,
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ page: string }>
}) {
  const { page } = await params
  if (!VALID_DOCS_PAGES.has(page)) notFound()

  const PageComponent = PAGE_MAP[page]
  if (PageComponent) {
    return <PageComponent />
  }

  return <Placeholder title={page} section="Docs" />
}
