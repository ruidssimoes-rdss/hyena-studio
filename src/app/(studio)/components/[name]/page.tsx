import { notFound } from "next/navigation"
import { VALID_COMPONENT_SLUGS } from "@/editor/shell/nav-data"
import { Placeholder } from "@/editor/shell/Placeholder"
import { AccordionPage } from "@/editor/pages/AccordionPage"
import { AvatarPage } from "@/editor/pages/AvatarPage"
import { BreadcrumbPage } from "@/editor/pages/BreadcrumbPage"
import { ButtonPage } from "@/editor/pages/ButtonPage"
import { CheckboxPage } from "@/editor/pages/CheckboxPage"
import { CheckboxGroupPage } from "@/editor/pages/CheckboxGroupPage"
import { CollapsiblePage } from "@/editor/pages/CollapsiblePage"
import { EmptyPage } from "@/editor/pages/EmptyPage"
import { FieldPage } from "@/editor/pages/FieldPage"
import { FieldsetPage } from "@/editor/pages/FieldsetPage"
import { FramePage } from "@/editor/pages/FramePage"
import { GroupPage } from "@/editor/pages/GroupPage"
import { InputPage } from "@/editor/pages/InputPage"
import { KbdPage } from "@/editor/pages/KbdPage"
import { LabelPage } from "@/editor/pages/LabelPage"
import { MeterPage } from "@/editor/pages/MeterPage"
import { NumberFieldPage } from "@/editor/pages/NumberFieldPage"
import { PaginationPage } from "@/editor/pages/PaginationPage"
import { ProgressPage } from "@/editor/pages/ProgressPage"
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
import { RadioGroupPage } from "@/editor/pages/RadioGroupPage"
import { ScrollAreaPage } from "@/editor/pages/ScrollAreaPage"
import { SeparatorPage } from "@/editor/pages/SeparatorPage"
import { SliderPage } from "@/editor/pages/SliderPage"
import { SpinnerPage } from "@/editor/pages/SpinnerPage"
import { SwitchPage } from "@/editor/pages/SwitchPage"
import { TabsPage } from "@/editor/pages/TabsPage"
import { TextareaPage } from "@/editor/pages/TextareaPage"
import { ToggleGroupPage } from "@/editor/pages/ToggleGroupPage"
import { ToolbarPage } from "@/editor/pages/ToolbarPage"
import { DialogPage } from "@/editor/pages/DialogPage"
import { AlertDialogPage } from "@/editor/pages/AlertDialogPage"
import { DrawerPage } from "@/editor/pages/DrawerPage"
import { SheetPage } from "@/editor/pages/SheetPage"
import { InputGroupPage } from "@/editor/pages/InputGroupPage"
import { InputOTPPage } from "@/editor/pages/InputOTPPage"
import { AutocompletePage } from "@/editor/pages/AutocompletePage"
import { ComboboxPage } from "@/editor/pages/ComboboxPage"
import { PopoverPage } from "@/editor/pages/PopoverPage"
import { MenuPage } from "@/editor/pages/MenuPage"
import { ToastPage } from "@/editor/pages/ToastPage"
import { PreviewCardPage } from "@/editor/pages/PreviewCardPage"
import { CalendarPage } from "@/editor/pages/CalendarPage"
import { DatePickerPage } from "@/editor/pages/DatePickerPage"
import { CommandPage } from "@/editor/pages/CommandPage"
import { FormPage } from "@/editor/pages/FormPage"
import { CopyButtonPage } from "@/editor/pages/CopyButtonPage"
import { CodeBlockPage } from "@/editor/pages/CodeBlockPage"
import { ContextMenuPage } from "@/editor/pages/ContextMenuPage"
import { TimelinePage } from "@/editor/pages/TimelinePage"
import { StepperPage } from "@/editor/pages/StepperPage"
import { ColorPickerPage } from "@/editor/pages/ColorPickerPage"
import { CarouselPage } from "@/editor/pages/CarouselPage"
import { NavigationMenuPage } from "@/editor/pages/NavigationMenuPage"
import { ResizablePage } from "@/editor/pages/ResizablePage"
import { ChartPage } from "@/editor/pages/ChartPage"
import { DataTablePage } from "@/editor/pages/DataTablePage"
import { FileUploadPage } from "@/editor/pages/FileUploadPage"
import { SidebarPage } from "@/editor/pages/SidebarPage"

function unslug(s: string): string {
  return s
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

const PAGE_MAP: Record<string, React.ComponentType> = {
  accordion: AccordionPage,
  avatar: AvatarPage,
  breadcrumb: BreadcrumbPage,
  button: ButtonPage,
  checkbox: CheckboxPage,
  "checkbox-group": CheckboxGroupPage,
  collapsible: CollapsiblePage,
  empty: EmptyPage,
  field: FieldPage,
  fieldset: FieldsetPage,
  frame: FramePage,
  group: GroupPage,
  input: InputPage,
  kbd: KbdPage,
  label: LabelPage,
  meter: MeterPage,
  "number-field": NumberFieldPage,
  pagination: PaginationPage,
  progress: ProgressPage,
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
  "radio-group": RadioGroupPage,
  "scroll-area": ScrollAreaPage,
  separator: SeparatorPage,
  slider: SliderPage,
  spinner: SpinnerPage,
  switch: SwitchPage,
  tabs: TabsPage,
  textarea: TextareaPage,
  "toggle-group": ToggleGroupPage,
  toolbar: ToolbarPage,
  dialog: DialogPage,
  "alert-dialog": AlertDialogPage,
  drawer: DrawerPage,
  sheet: SheetPage,
  "input-group": InputGroupPage,
  "input-otp": InputOTPPage,
  autocomplete: AutocompletePage,
  combobox: ComboboxPage,
  popover: PopoverPage,
  menu: MenuPage,
  toast: ToastPage,
  "preview-card": PreviewCardPage,
  calendar: CalendarPage,
  "date-picker": DatePickerPage,
  command: CommandPage,
  form: FormPage,
  "copy-button": CopyButtonPage,
  "code-block": CodeBlockPage,
  "context-menu": ContextMenuPage,
  timeline: TimelinePage,
  stepper: StepperPage,
  "color-picker": ColorPickerPage,
  carousel: CarouselPage,
  "navigation-menu": NavigationMenuPage,
  resizable: ResizablePage,
  chart: ChartPage,
  "data-table": DataTablePage,
  "file-upload": FileUploadPage,
  sidebar: SidebarPage,
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
