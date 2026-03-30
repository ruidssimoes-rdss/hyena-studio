"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react"
import {
  ComponentPageLayout,
  ComponentCAP,
  PreviewSection,
  StandardCodeTab,
  StandardApiTab,
  type CAPData,
  type PropDef,
} from "@/editor/components/PageShell"

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

function getMonthGrid(year: number, month: number): Date[][] {
  const firstDay = new Date(year, month, 1)
  let startDay = firstDay.getDay() - 1 // Monday=0
  if (startDay < 0) startDay = 6

  const daysInMonth = getDaysInMonth(year, month)
  const daysInPrevMonth = month === 0 ? getDaysInMonth(year - 1, 11) : getDaysInMonth(year, month - 1)

  const grid: Date[][] = []
  let day = 1
  let prevDay = daysInPrevMonth - startDay + 1
  let nextDay = 1

  for (let row = 0; row < 6; row++) {
    const week: Date[] = []
    for (let col = 0; col < 7; col++) {
      const cellIndex = row * 7 + col
      if (cellIndex < startDay) {
        const prevMonth = month === 0 ? 11 : month - 1
        const prevYear = month === 0 ? year - 1 : year
        week.push(new Date(prevYear, prevMonth, prevDay++))
      } else if (day > daysInMonth) {
        const nextMonth = month === 11 ? 0 : month + 1
        const nextYear = month === 11 ? year + 1 : year
        week.push(new Date(nextYear, nextMonth, nextDay++))
      } else {
        week.push(new Date(year, month, day++))
      }
    }
    grid.push(week)
  }
  return grid
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function inRange(date: Date, start: Date, end: Date): boolean {
  return date.getTime() > start.getTime() && date.getTime() < end.getTime()
}

function formatDate(date: Date): string {
  return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

function formatShortDate(date: Date): string {
  return `${MONTH_NAMES[date.getMonth()].slice(0, 3)} ${date.getDate()}, ${date.getFullYear()}`
}

// ================================================================== //
// SHARED STYLES                                                        //
// ================================================================== //

const triggerStyle: React.CSSProperties = {
  width: 280,
  height: 28,
  border: "0.8px solid #F0F0F0",
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "0 10px",
  background: "white",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 400,
  color: "#262626",
}

const calendarBox: React.CSSProperties = {
  width: 280,
  border: "0.8px solid #F0F0F0",
  borderRadius: 10,
  padding: 12,
  background: "#FFFFFF",
  marginTop: 6,
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

const dayBase: React.CSSProperties = {
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
// MINI CALENDAR                                                        //
// ================================================================== //

interface MiniCalendarProps {
  year: number
  month: number
  selected?: Date | null
  rangeStart?: Date | null
  rangeEnd?: Date | null
  todayDate?: Date
  onDayClick?: (date: Date) => void
  showNav?: boolean
  captionLayout?: "label" | "dropdown"
  onPrevMonth?: () => void
  onNextMonth?: () => void
}

function MiniCalendar({
  year,
  month,
  selected = null,
  rangeStart = null,
  rangeEnd = null,
  todayDate,
  onDayClick,
  showNav = false,
  captionLayout = "label",
  onPrevMonth,
  onNextMonth,
}: MiniCalendarProps) {
  const grid = getMonthGrid(year, month)

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        {showNav ? (
          <button style={navBtn} onClick={onPrevMonth}>
            <ChevronLeft style={{ width: 14, height: 14, color: "#838383" }} />
          </button>
        ) : (
          <div style={{ width: 28 }} />
        )}

        {captionLayout === "dropdown" ? (
          <div style={{ display: "flex", gap: 4 }}>
            <select
              style={{
                width: 90,
                height: 24,
                borderRadius: 6,
                fontSize: 12,
                border: "0.8px solid #F0F0F0",
                background: "white",
                padding: "0 4px",
                color: "#262626",
              }}
              defaultValue={month}
            >
              {MONTH_NAMES.map((m, i) => (
                <option key={m} value={i}>{m}</option>
              ))}
            </select>
            <select
              style={{
                width: 64,
                height: 24,
                borderRadius: 6,
                fontSize: 12,
                border: "0.8px solid #F0F0F0",
                background: "white",
                padding: "0 4px",
                color: "#262626",
              }}
              defaultValue={year}
            >
              {Array.from({ length: 100 }, (_, i) => 1950 + i).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        ) : (
          <div style={{ fontWeight: 500, fontSize: 13, color: "#262626" }}>
            {MONTH_NAMES[month]} {year}
          </div>
        )}

        {showNav ? (
          <button style={navBtn} onClick={onNextMonth}>
            <ChevronRight style={{ width: 14, height: 14, color: "#838383" }} />
          </button>
        ) : (
          <div style={{ width: 28 }} />
        )}
      </div>

      {/* Day headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 36px)", justifyContent: "center" }}>
        {DAY_HEADERS.map((d) => (
          <div
            key={d}
            style={{
              width: 36,
              height: 28,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 500,
              color: "#A1A1A1",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      {grid.map((week, wi) => (
        <div key={wi} style={{ display: "grid", gridTemplateColumns: "repeat(7, 36px)", justifyContent: "center" }}>
          {week.map((date, di) => {
            const isCurrentMonth = date.getMonth() === month
            const isSelected = selected && sameDay(date, selected)
            const isToday = todayDate && sameDay(date, todayDate)
            const isRangeStart = rangeStart && sameDay(date, rangeStart)
            const isRangeEnd = rangeEnd && sameDay(date, rangeEnd)
            const isInRange = rangeStart && rangeEnd && inRange(date, rangeStart, rangeEnd)

            let bg = "transparent"
            let color = isCurrentMonth ? "#262626" : "#D4D4D4"
            let fontWeight = 400
            let borderRadius = 8

            if (isSelected && !rangeStart) {
              bg = "#262626"
              color = "#FFFFFF"
              fontWeight = 500
            } else if (isRangeStart) {
              bg = "#262626"
              color = "#FFFFFF"
              fontWeight = 500
              borderRadius = 8
            } else if (isRangeEnd) {
              bg = "#262626"
              color = "#FFFFFF"
              fontWeight = 500
              borderRadius = 8
            } else if (isInRange) {
              bg = "#F0F0F0"
              borderRadius = 0
            }

            const todayDot = isToday && !isSelected && !isRangeStart && !isRangeEnd

            return (
              <div
                key={di}
                style={{
                  ...dayBase,
                  background: bg,
                  color,
                  fontWeight,
                  borderRadius,
                }}
                onClick={() => onDayClick?.(date)}
              >
                <span>{date.getDate()}</span>
                {todayDot && (
                  <div
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: 2,
                      background: "#262626",
                      marginTop: 1,
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

// ================================================================== //
// PREVIEW SECTIONS                                                     //
// ================================================================== //

const TODAY = new Date(2026, 2, 30) // March 30, 2026

function DefaultSection() {
  return (
    <PreviewSection label="Default">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={triggerStyle}>
          <CalendarDays style={{ width: 14, height: 14, color: "#838383" }} />
          <span>{formatDate(TODAY)}</span>
        </div>
        <div style={calendarBox}>
          <MiniCalendar
            year={2026}
            month={2}
            selected={TODAY}
            todayDate={TODAY}
            showNav
          />
        </div>
      </div>
    </PreviewSection>
  )
}

function RangeSection() {
  const rangeStart = new Date(2026, 2, 15)
  const rangeEnd = new Date(2026, 2, 22)

  return (
    <PreviewSection label="Range Picker">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ ...triggerStyle, width: 360 }}>
          <CalendarDays style={{ width: 14, height: 14, color: "#838383" }} />
          <span>{formatShortDate(rangeStart)} — {formatShortDate(rangeEnd)}</span>
        </div>
        <div style={{ ...calendarBox, marginTop: 6 }}>
          <MiniCalendar
            year={2026}
            month={2}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            todayDate={TODAY}
            showNav
          />
        </div>
      </div>
    </PreviewSection>
  )
}

function PresetsSection() {
  const presets = ["Today", "Tomorrow", "In 3 days", "In a week", "In 2 weeks", "In a month"]

  return (
    <PreviewSection label="With Presets">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={triggerStyle}>
          <CalendarDays style={{ width: 14, height: 14, color: "#838383" }} />
          <span>{formatDate(TODAY)}</span>
        </div>
        <div
          style={{
            width: 420,
            border: "0.8px solid #F0F0F0",
            borderRadius: 10,
            overflow: "hidden",
            background: "white",
            marginTop: 6,
            display: "flex",
          }}
        >
          {/* Presets sidebar */}
          <div
            style={{
              width: 140,
              borderRight: "0.8px solid #F0F0F0",
              padding: 8,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {presets.map((p, i) => (
              <div
                key={p}
                style={{
                  height: 28,
                  padding: "0 8px",
                  borderRadius: 6,
                  fontSize: 12.3,
                  fontWeight: i === 0 ? 500 : 400,
                  color: "#262626",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  background: i === 0 ? "#F0F0F0" : "transparent",
                }}
              >
                {p}
              </div>
            ))}
          </div>
          {/* Calendar */}
          <div style={{ padding: 12 }}>
            <MiniCalendar
              year={2026}
              month={2}
              selected={TODAY}
              todayDate={TODAY}
              showNav
            />
          </div>
        </div>
      </div>
    </PreviewSection>
  )
}

function DateOfBirthSection() {
  const dob = new Date(1992, 5, 15) // June 15, 1992

  return (
    <PreviewSection label="Date of Birth">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={triggerStyle}>
          <CalendarDays style={{ width: 14, height: 14, color: "#838383" }} />
          <span>{formatDate(dob)}</span>
        </div>
        <div style={calendarBox}>
          <MiniCalendar
            year={1992}
            month={5}
            selected={dob}
            captionLayout="dropdown"
          />
        </div>
      </div>
    </PreviewSection>
  )
}

function WithTimeSection() {
  return (
    <PreviewSection label="With Time">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ ...triggerStyle, width: 320 }}>
          <CalendarDays style={{ width: 14, height: 14, color: "#838383" }} />
          <span>March 30, 2026 at 14:30</span>
        </div>
        <div style={calendarBox}>
          <MiniCalendar
            year={2026}
            month={2}
            selected={TODAY}
            todayDate={TODAY}
            showNav
          />
          {/* Separator */}
          <div style={{ height: "0.8px", background: "#F0F0F0", margin: "8px 0" }} />
          {/* Time row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
            <input
              type="text"
              readOnly
              value="14"
              style={{
                width: 40,
                height: 28,
                textAlign: "center",
                border: "0.8px solid #F0F0F0",
                borderRadius: 6,
                fontSize: 13,
                fontFamily: "monospace",
                color: "#262626",
                outline: "none",
                background: "white",
              }}
            />
            <span style={{ fontWeight: 500, fontSize: 13, color: "#838383" }}>:</span>
            <input
              type="text"
              readOnly
              value="30"
              style={{
                width: 40,
                height: 28,
                textAlign: "center",
                border: "0.8px solid #F0F0F0",
                borderRadius: 6,
                fontSize: 13,
                fontFamily: "monospace",
                color: "#262626",
                outline: "none",
                background: "white",
              }}
            />
          </div>
        </div>
      </div>
    </PreviewSection>
  )
}

function InteractiveSection() {
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [viewMonth, setViewMonth] = useState(2) // March
  const [viewYear, setViewYear] = useState(2026)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  function handleDayClick(date: Date) {
    setSelectedDate(date)
    setOpen(false)
  }

  function handlePrev() {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  function handleNext() {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  return (
    <PreviewSection label="Interactive">
      <div
        ref={containerRef}
        style={{ position: "relative", display: "inline-block" }}
      >
        <div
          style={{
            ...triggerStyle,
            color: selectedDate ? "#262626" : "#A1A1A1",
          }}
          onClick={() => setOpen(!open)}
        >
          <CalendarDays style={{ width: 14, height: 14, color: "#838383" }} />
          <span>{selectedDate ? formatDate(selectedDate) : "Pick a date"}</span>
        </div>

        {open && (
          <div
            style={{
              ...calendarBox,
              position: "absolute",
              top: "100%",
              left: 0,
              zIndex: 10,
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            }}
          >
            <MiniCalendar
              year={viewYear}
              month={viewMonth}
              selected={selectedDate}
              todayDate={TODAY}
              showNav
              onDayClick={handleDayClick}
              onPrevMonth={handlePrev}
              onNextMonth={handleNext}
            />
          </div>
        )}
      </div>
    </PreviewSection>
  )
}

// ================================================================== //
// PREVIEW TAB                                                          //
// ================================================================== //

function PreviewTab() {
  return (
    <div className="flex flex-col" style={{ gap: "28px" }}>
      <DefaultSection />
      <RangeSection />
      <PresetsSection />
      <DateOfBirthSection />
      <WithTimeSection />
      <InteractiveSection />
    </div>
  )
}

// ================================================================== //
// CODE TAB                                                             //
// ================================================================== //

function CodeTab() {
  return (
    <StandardCodeTab
      packageName="@hyena/calendar @hyena/popover @hyena/button"
      importCode={`import { DatePicker } from "@/components/ui/date-picker"`}
      usageCode={`const [date, setDate] = useState<Date>()\n\n<DatePicker\n  selected={date}\n  onSelect={setDate}\n  placeholder="Pick a date"\n/>`}
    />
  )
}

// ================================================================== //
// API TAB                                                              //
// ================================================================== //

const DATE_PICKER_PROPS: PropDef[] = [
  { prop: "selected", type: "Date | { from: Date; to: Date }", defaultVal: "\u2014" },
  { prop: "onSelect", type: "(date) => void", defaultVal: "\u2014" },
  { prop: "mode", type: '"single" | "range"', defaultVal: '"single"' },
  { prop: "placeholder", type: "string", defaultVal: '"Pick a date"' },
  { prop: "format", type: "string", defaultVal: '"PPP" (date-fns)' },
  { prop: "presets", type: "{ label: string; date: Date }[]", defaultVal: "\u2014" },
  { prop: "captionLayout", type: '"label" | "dropdown"', defaultVal: '"label"' },
  { prop: "disabled", type: "boolean", defaultVal: "false" },
]

function ApiTab() {
  return (
    <StandardApiTab
      name="Date Picker"
      description="A date selection input that opens a Calendar in a Popover."
      props={DATE_PICKER_PROPS}
    />
  )
}

// ================================================================== //
// CAP DATA                                                             //
// ================================================================== //

const CAP_DATA: CAPData = {
  type: "Composite",
  variants: "6",
  sizes: "1",
  deps: "cn",
  related: [
    { label: "Calendar", href: "/components/calendar" },
    { label: "Popover", href: "/components/popover" },
  ],
  tokens: [
    { name: "--border", color: "#F0F0F0", border: true },
    { name: "--foreground", color: "#262626" },
    { name: "--muted-fg", color: "#838383" },
  ],
}

// ================================================================== //
// MAIN                                                                 //
// ================================================================== //

export function DatePickerPage() {
  return (
    <ComponentPageLayout
      name="Date Picker"
      previewContent={<PreviewTab />}
      codeContent={<CodeTab />}
      apiContent={<ApiTab />}
      capContent={<ComponentCAP data={CAP_DATA} />}
    />
  )
}
