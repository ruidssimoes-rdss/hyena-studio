"use client"

import { useState } from "react"
import {
  ComponentPageLayout,
  ComponentCAP,
  PreviewSection,
  StandardCodeTab,
  StandardApiTab,
  type CAPData,
  type PropDef,
} from "@/editor/components/PageShell"
import { ChevronLeft, ChevronRight } from "lucide-react"

// ================================================================== //
// HELPERS                                                              //
// ================================================================== //

const DAY_HEADERS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getMonthGrid(year: number, month: number, weekStartsOn: number = 1): Date[][] {
  const firstDay = new Date(year, month, 1)
  let startDow = firstDay.getDay() - weekStartsOn
  if (startDow < 0) startDow += 7

  const grid: Date[][] = []
  const startDate = new Date(year, month, 1 - startDow)

  for (let row = 0; row < 6; row++) {
    const week: Date[] = []
    for (let col = 0; col < 7; col++) {
      const d = new Date(startDate)
      d.setDate(startDate.getDate() + row * 7 + col)
      week.push(d)
    }
    grid.push(week)
  }

  return grid
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function inRange(date: Date, start: Date, end: Date): boolean {
  return date > start && date < end
}

// ================================================================== //
// SHARED STYLES                                                        //
// ================================================================== //

const calendarContainer: React.CSSProperties = {
  width: 280,
  border: "0.8px solid #F0F0F0",
  borderRadius: 10,
  padding: 12,
  background: "#FFFFFF",
}

const navBtn: React.CSSProperties = {
  width: 28,
  height: 28,
  borderRadius: 8,
  border: "0.8px solid #F0F0F0",
  background: "white",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

const dayCell: React.CSSProperties = {
  width: 36,
  height: 36,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 400,
  color: "#262626",
  cursor: "pointer",
  flexDirection: "column",
}

// ================================================================== //
// STATIC CALENDAR COMPONENT                                            //
// ================================================================== //

interface StaticCalendarProps {
  year: number
  month: number
  selected?: Date | null
  rangeStart?: Date | null
  rangeEnd?: Date | null
  disabledDates?: (date: Date) => false | "weekend" | "booked"
  todayDate?: Date
  captionLayout?: "label" | "dropdown"
  showNavButtons?: boolean
  onPrev?: () => void
  onNext?: () => void
  onDayClick?: (date: Date) => void
  containerStyle?: React.CSSProperties
}

function StaticCalendar({
  year,
  month,
  selected,
  rangeStart,
  rangeEnd,
  disabledDates,
  todayDate,
  captionLayout = "label",
  showNavButtons,
  onPrev,
  onNext,
  onDayClick,
  containerStyle,
}: StaticCalendarProps) {
  const grid = getMonthGrid(year, month)

  const dropdownSelect: React.CSSProperties = {
    height: 24,
    borderRadius: 6,
    fontSize: 12,
    border: "0.8px solid #F0F0F0",
    appearance: "none" as const,
    padding: "0 8px",
    background: "white",
    cursor: "pointer",
    outline: "none",
  }

  return (
    <div style={containerStyle ?? calendarContainer}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        {captionLayout === "dropdown" ? (
          <div style={{ display: "flex", gap: 4 }}>
            <select style={{ ...dropdownSelect, width: 90 }} defaultValue={month}>
              {MONTH_NAMES.map((name, i) => (
                <option key={name} value={i}>{name}</option>
              ))}
            </select>
            <select style={{ ...dropdownSelect, width: 64 }} defaultValue={year}>
              {[2024, 2025, 2026, 2027, 2028].map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        ) : (
          <span style={{ fontWeight: 500, fontSize: 13, color: "#262626" }}>
            {MONTH_NAMES[month]} {year}
          </span>
        )}
        {showNavButtons && (
          <div style={{ display: "flex", gap: 4 }}>
            <button style={navBtn} onClick={onPrev}>
              <ChevronLeft size={14} color="#262626" />
            </button>
            <button style={navBtn} onClick={onNext}>
              <ChevronRight size={14} color="#262626" />
            </button>
          </div>
        )}
      </div>

      {/* Day headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
        {DAY_HEADERS.map((d) => (
          <div
            key={d}
            style={{
              fontWeight: 500,
              fontSize: 11,
              color: "#A1A1A1",
              textAlign: "center",
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
        {grid.flat().map((date, i) => {
          const isOutside = date.getMonth() !== month
          const isToday = todayDate ? sameDay(date, todayDate) : false
          const isSelected = selected ? sameDay(date, selected) : false
          const isRangeStart = rangeStart ? sameDay(date, rangeStart) : false
          const isRangeEnd = rangeEnd ? sameDay(date, rangeEnd) : false
          const isInRange = rangeStart && rangeEnd ? inRange(date, rangeStart, rangeEnd) : false
          const disabledResult = disabledDates ? disabledDates(date) : false
          const isDisabled = disabledResult !== false
          const isBooked = disabledResult === "booked"

          let cellStyle: React.CSSProperties = { ...dayCell }

          if (isOutside) {
            cellStyle.color = "#D4D4D4"
          }

          if (isDisabled) {
            cellStyle.color = "#D4D4D4"
            cellStyle.cursor = "not-allowed"
          }

          if (isToday && !isSelected && !isRangeStart && !isRangeEnd) {
            cellStyle.fontWeight = 600
          }

          if (isInRange && !isRangeStart && !isRangeEnd) {
            cellStyle.background = "#F0F0F0"
            cellStyle.color = "#262626"
            cellStyle.borderRadius = 0
          }

          if (isRangeStart) {
            cellStyle.background = "#262626"
            cellStyle.color = "#FFFFFF"
            cellStyle.borderRadius = "8px 0 0 8px"
          }

          if (isRangeEnd) {
            cellStyle.background = "#262626"
            cellStyle.color = "#FFFFFF"
            cellStyle.borderRadius = "0 8px 8px 0"
          }

          if (isSelected) {
            cellStyle.background = "#262626"
            cellStyle.color = "#FFFFFF"
            cellStyle.fontWeight = 500
          }

          if (isBooked) {
            cellStyle.position = "relative"
          }

          return (
            <div
              key={i}
              style={cellStyle}
              onClick={() => {
                if (!isDisabled && onDayClick) onDayClick(date)
              }}
            >
              {date.getDate()}
              {isToday && !isSelected && !isRangeStart && !isRangeEnd && (
                <div
                  style={{
                    width: 2,
                    height: 2,
                    borderRadius: 1,
                    background: "#262626",
                    marginTop: 1,
                  }}
                />
              )}
              {isBooked && (
                <div
                  style={{
                    position: "absolute",
                    width: "70%",
                    height: 1,
                    background: "#D4D4D4",
                    transform: "rotate(-45deg)",
                    top: "50%",
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ================================================================== //
// PREVIEW SECTIONS                                                     //
// ================================================================== //

function SingleSelectSection() {
  return (
    <PreviewSection label="Single Select" wrapClassName="flex flex-col items-center">
      <StaticCalendar
        year={2026}
        month={2}
        selected={new Date(2026, 2, 30)}
        todayDate={new Date(2026, 2, 30)}
        showNavButtons
      />
    </PreviewSection>
  )
}

function RangeSelectSection() {
  return (
    <PreviewSection label="Range Select" wrapClassName="flex flex-col items-center">
      <StaticCalendar
        year={2026}
        month={2}
        rangeStart={new Date(2026, 2, 15)}
        rangeEnd={new Date(2026, 2, 22)}
        todayDate={new Date(2026, 2, 30)}
        showNavButtons
      />
    </PreviewSection>
  )
}

function DropdownNavigationSection() {
  return (
    <PreviewSection label="With Dropdown Navigation" wrapClassName="flex flex-col items-center">
      <StaticCalendar
        year={2026}
        month={2}
        selected={new Date(2026, 2, 30)}
        captionLayout="dropdown"
      />
    </PreviewSection>
  )
}

function PresetsSection() {
  const presets = [
    { label: "Today", active: true },
    { label: "Tomorrow", active: false },
    { label: "In 3 days", active: false },
    { label: "In a week", active: false },
    { label: "In 2 weeks", active: false },
    { label: "In a month", active: false },
  ]

  return (
    <PreviewSection label="With Presets" wrapClassName="flex flex-col items-center">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: 420,
          border: "0.8px solid #F0F0F0",
          borderRadius: 10,
          overflow: "hidden",
          background: "white",
        }}
      >
        {/* Presets list */}
        <div style={{ width: 140, borderRight: "0.8px solid #F0F0F0", padding: 8 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {presets.map((preset) => (
              <div
                key={preset.label}
                style={{
                  height: 28,
                  padding: "0 8px",
                  borderRadius: 6,
                  fontSize: 12.3,
                  fontWeight: preset.active ? 500 : 400,
                  color: "#262626",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  background: preset.active ? "#F0F0F0" : "transparent",
                }}
              >
                {preset.label}
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <StaticCalendar
          year={2026}
          month={2}
          selected={new Date(2026, 2, 30)}
          todayDate={new Date(2026, 2, 30)}
          showNavButtons
          containerStyle={{
            padding: 12,
            background: "#FFFFFF",
            flex: 1,
          }}
        />
      </div>
    </PreviewSection>
  )
}

function DisabledDatesSection() {
  const disabledDates = (date: Date): false | "weekend" | "booked" => {
    const day = date.getDay()
    if (day === 0 || day === 6) return "weekend"
    if (date.getFullYear() === 2026 && date.getMonth() === 2 && (date.getDate() === 17 || date.getDate() === 24)) {
      return "booked"
    }
    return false
  }

  return (
    <PreviewSection label="With Disabled Dates" wrapClassName="flex flex-col items-center">
      <StaticCalendar
        year={2026}
        month={2}
        selected={new Date(2026, 2, 18)}
        todayDate={new Date(2026, 2, 30)}
        disabledDates={disabledDates}
        showNavButtons
      />
    </PreviewSection>
  )
}

function InteractiveSection() {
  const [month, setMonth] = useState(2)
  const [year, setYear] = useState(2026)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  function handlePrev() {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  function handleNext() {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  return (
    <PreviewSection label="Interactive" wrapClassName="flex flex-col items-center">
      <StaticCalendar
        year={year}
        month={month}
        selected={selectedDate}
        todayDate={new Date(2026, 2, 30)}
        showNavButtons
        onPrev={handlePrev}
        onNext={handleNext}
        onDayClick={(date) => setSelectedDate(date)}
      />
    </PreviewSection>
  )
}

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <SingleSelectSection />
      <RangeSelectSection />
      <DropdownNavigationSection />
      <PresetsSection />
      <DisabledDatesSection />
      <InteractiveSection />
    </div>
  )
}

// ================================================================== //
// CODE                                                                 //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/calendar"
      importCode={`import { Calendar } from "@/components/ui/calendar"`}
      usageCode={`const [date, setDate] = useState<Date | undefined>(new Date())\n\n<Calendar\n  mode="single"\n  selected={date}\n  onSelect={setDate}\n/>`}
    />
  )
}

// ================================================================== //
// API                                                                  //
// ================================================================== //

const CALENDAR_PROPS: PropDef[] = [
  { prop: "mode", type: '"single" | "multiple" | "range"', defaultVal: '"single"' },
  { prop: "selected", type: 'Date | Date[] | { from: Date; to: Date }', defaultVal: "\u2014" },
  { prop: "onSelect", type: "(date) => void", defaultVal: "\u2014" },
  { prop: "captionLayout", type: '"label" | "dropdown"', defaultVal: '"label"' },
  { prop: "weekStartsOn", type: "0\u20136 (0=Sunday)", defaultVal: "1 (Monday)" },
  { prop: "showOutsideDays", type: "boolean", defaultVal: "true" },
  { prop: "disabled", type: 'Date[] | ((date: Date) => boolean)', defaultVal: "\u2014" },
  { prop: "className", type: "string", defaultVal: "\u2014" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Calendar"
      description="A month grid component for selecting single dates, multiple dates, or date ranges."
      props={CALENDAR_PROPS}
    />
  )
}

// ================================================================== //
// CAP                                                                  //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Composite",
  variants: "6",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Date Picker", href: "/components/date-picker" },
  ],
  tokens: [
    { name: "--primary", color: "#262626" },
    { name: "--primary-fg", color: "#FFFFFF", border: true },
    { name: "--border", color: "#F0F0F0", border: true },
    { name: "--muted-fg", color: "#A1A1A1" },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function CalendarPage() {
  return (
    <ComponentPageLayout
      name="Calendar"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
