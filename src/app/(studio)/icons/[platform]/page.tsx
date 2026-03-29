import { notFound } from "next/navigation"
import { VALID_ICON_PLATFORMS } from "@/editor/shell/nav-data"
import { Placeholder } from "@/editor/shell/Placeholder"

function unslug(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default async function IconsPage({
  params,
}: {
  params: Promise<{ platform: string }>
}) {
  const { platform } = await params
  if (!VALID_ICON_PLATFORMS.has(platform)) notFound()

  return <Placeholder title={unslug(platform)} section="Icons" />
}
