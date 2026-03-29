import { notFound } from "next/navigation"
import { VALID_COMPONENT_SLUGS } from "@/editor/shell/nav-data"
import { Placeholder } from "@/editor/shell/Placeholder"
import { ButtonPage } from "@/editor/pages/ButtonPage"
import { InputPage } from "@/editor/pages/InputPage"
import { BadgePage } from "@/editor/pages/BadgePage"
import { CardPage } from "@/editor/pages/CardPage"
import { TogglePage } from "@/editor/pages/TogglePage"
import { SelectPage } from "@/editor/pages/SelectPage"
import { TooltipPage } from "@/editor/pages/TooltipPage"
import { DividerPage } from "@/editor/pages/DividerPage"
import { ModalPage } from "@/editor/pages/ModalPage"
import { AlertPage } from "@/editor/pages/AlertPage"
import { NavbarPage } from "@/editor/pages/NavbarPage"
import { TablePage } from "@/editor/pages/TablePage"
import { SkeletonPage } from "@/editor/pages/SkeletonPage"

function unslug(s: string): string {
  return s
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

const PAGE_MAP: Record<string, React.ComponentType> = {
  button: ButtonPage,
  input: InputPage,
  badge: BadgePage,
  card: CardPage,
  toggle: TogglePage,
  select: SelectPage,
  tooltip: TooltipPage,
  divider: DividerPage,
  modal: ModalPage,
  alert: AlertPage,
  navbar: NavbarPage,
  table: TablePage,
  skeleton: SkeletonPage,
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  if (!VALID_COMPONENT_SLUGS.has(name)) notFound()

  const PageComponent = PAGE_MAP[name]
  if (PageComponent) {
    return <PageComponent />
  }

  return <Placeholder title={unslug(name)} section="Components" />
}
