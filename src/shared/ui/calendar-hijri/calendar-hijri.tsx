// src/shared/components/CalendarHijri/calendar-hijri.tsx
"use client"

import * as React from "react"
import { getDefaultClassNames, type DayButton } from "@daypicker/react"
import { DayPicker, faIR, getDateLib } from "@daypicker/persian"
import { CalendarIcon } from "../../constants/icons/calendar-icon"
import { DropleftArrowIcon } from "../../constants/icons"

function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ")
}

// Single shared Persian DateLib instance.
// All month/year arithmetic MUST go through this — never through native
// Date.getMonth/setMonth/getFullYear/setFullYear, which operate on the
// Gregorian calendar and silently desync from the Persian calendar.
const dateLib = getDateLib()

type SimpleButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "ghost" | "outline"
  size?: "icon" | "default"
}

const SimpleButton = React.forwardRef<HTMLButtonElement, SimpleButtonProps>(
  ({ className, variant = "ghost", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center justify-center rounded-xs text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-danger/40 disabled:pointer-events-none disabled:opacity-50",
          variant === "ghost" && "hover:bg-accent",
          variant === "outline" && "border border-gray hover:bg-accent",
          size === "icon" && "h-8 w-8 p-0",
          size === "default" && "h-8 px-3",
          className
        )}
        {...props}
      />
    )
  }
)
SimpleButton.displayName = "SimpleButton"

interface DatePickerFieldProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  variant?: "popover" | "inline"
}

export function DatePickerField({
  value,
  onChange,
  placeholder,
  className,
  variant = "popover",
}: DatePickerFieldProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(value)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => { setDate(value) }, [value])

  React.useEffect(() => {
    if (!open || variant !== "popover") return
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open, variant])

  const displayValue = date
    ? new Intl.DateTimeFormat("fa-IR-u-ca-persian", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date)
    : ""

  return (
    <div ref={containerRef} className={cn("relative flex-1", className)}>
      <div onClick={() => setOpen((prev) => !prev)} className="relative cursor-pointer">
        <input
          type="text"
          readOnly
          value={displayValue}
          placeholder={placeholder}
className="h-10 w-full cursor-pointer rounded-sm border border-gray px-3 pl-8 text-sm text-primary outline-none"        />
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          <CalendarIcon size="md" color="text-secondary" />
        </span>
      </div>

      {open && (
        <div className={cn(
          "font-primary rounded-xs border border-gray bg-pure-white shadow-lg",
          variant === "popover" ? "absolute z-50 mt-1" : "relative mt-2 w-full"
        )}>
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date ?? new Date()}
            onSelect={(d) => {
              setDate(d)
              onChange?.(d)
              setOpen(false)
            }}
          />
        </div>
      )}
    </div>
  )
}

const PERSIAN_MONTHS = ["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"] as const

// Presentational-only helpers. These never feed back into date arithmetic —
// they only produce the Farsi-numeral strings shown in the header.
function getPersianYearLabel(date: Date): string {
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", { year: "numeric" }).format(date)
}

function getPersianMonthLabel(date: Date): string {
  return PERSIAN_MONTHS[dateLib.getMonth(date)] ?? ""
}

interface CalendarModeHeaderProps {
  currentMonth: Date
  onPrevMonth: () => void
  onNextMonth: () => void
  onOpenMonths: () => void
}

function CalendarModeHeader({ currentMonth, onPrevMonth, onNextMonth, onOpenMonths }: CalendarModeHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-1 px-1 pt-1">
      <div className="flex w-full flex-row items-center justify-between">
        <SimpleButton type="button" variant="ghost" size="icon" onClick={onPrevMonth} aria-label="ماه قبل">
          <div className="rotate-180">
            <DropleftArrowIcon size="sm" />
          </div>
        </SimpleButton>
        <button type="button" onClick={onOpenMonths} className="rounded-xs px-2 py-0.5 text-sm font-medium text-primary hover:bg-accent select-none">
          {getPersianYearLabel(currentMonth)}
        </button>
        <SimpleButton type="button" variant="ghost" size="icon" onClick={onNextMonth} aria-label="ماه بعد">
          <DropleftArrowIcon size="sm" />
        </SimpleButton>
      </div>
      <button type="button" onClick={onOpenMonths} className="rounded-xs px-2 py-0.5 text-sm font-medium text-primary hover:bg-accent select-none">
        {getPersianMonthLabel(currentMonth)}
      </button>
    </div>
  )
}

interface MonthsModeHeaderProps {
  currentMonth: Date
  onPrevYear: () => void
  onNextYear: () => void
}

function MonthsModeHeader({ currentMonth, onPrevYear, onNextYear }: MonthsModeHeaderProps) {
  return (
    <div className="flex flex-row items-center justify-between px-1 pt-1">
      <SimpleButton type="button" variant="ghost" size="icon" onClick={onPrevYear} aria-label="سال قبل">
        <div className="rotate-180">
          <DropleftArrowIcon size="sm" />
        </div>
      </SimpleButton>
      <span className="text-sm font-medium text-primary select-none">
        {getPersianYearLabel(currentMonth)}
      </span>
      <SimpleButton type="button" variant="ghost" size="icon" onClick={onNextYear} aria-label="سال بعد">
        <DropleftArrowIcon size="sm" />
      </SimpleButton>
    </div>
  )
}

interface MonthGridProps {
  currentMonth: Date
  onSelectMonth: (index: number) => void
}

function MonthGrid({ currentMonth, onSelectMonth }: MonthGridProps) {
  // Selected month index comes directly from the Persian DateLib.
  // No formatting, no string matching, no Gregorian getMonth().
  const selectedMonthIndex = dateLib.getMonth(currentMonth)

  return (
    <div className="grid grid-cols-3 gap-1.5 px-1 pb-1">
      {PERSIAN_MONTHS.map((monthLabel, index) => {
        const isSelected = index === selectedMonthIndex
        return (
          <SimpleButton
            key={monthLabel}
            type="button"
            size="default"
            onClick={() => onSelectMonth(index)}
            className={cn("w-full justify-center", isSelected ? "bg-danger text-pure-white" : "border border-gray hover:bg-accent")}
          >
            {monthLabel}
          </SimpleButton>
        )
      })}
    </div>
  )
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  formatters,
  components,
  locale = faIR,
  month,
  defaultMonth,
  onMonthChange,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const defaultClassNames = getDefaultClassNames()
  const [view, setView] = React.useState<"calendar" | "months">("calendar")
  const [currentMonth, setCurrentMonth] = React.useState<Date>(month ?? defaultMonth ?? new Date())

  React.useEffect(() => { if (month) setCurrentMonth(month) }, [month])

  const applyMonthChange = React.useCallback((date: Date) => {
    setCurrentMonth(date)
    onMonthChange?.(date)
  }, [onMonthChange])

  // All navigation goes through dateLib's calendar-aware arithmetic.
  // dateLib.addMonths / addYears operate on Persian month/year boundaries,
  // unlike Date.setMonth/setFullYear which are Gregorian-only.
  const handlePrevMonth = () => applyMonthChange(dateLib.addMonths(currentMonth, -1))
  const handleNextMonth = () => applyMonthChange(dateLib.addMonths(currentMonth, 1))
  const handlePrevYear  = () => applyMonthChange(dateLib.addYears(currentMonth, -1))
  const handleNextYear  = () => applyMonthChange(dateLib.addYears(currentMonth, 1))

  const handleSelectMonth = (index: number) => {
    // Persian year read via dateLib.getYear — NOT via Intl + Number(),
    // which returns Farsi-numeral strings (e.g. "۱۴۰۳") that Number()
    // cannot parse, and NOT via native getFullYear(), which returns the
    // Gregorian year.
    const persianYear = dateLib.getYear(currentMonth)
    const date = dateLib.newDate(persianYear, index, 1)
    applyMonthChange(date)
    setView("calendar")
  }

  return (
    <div className="w-72 flex flex-col gap-2 p-2">
      {view === "calendar"
        ? <CalendarModeHeader currentMonth={currentMonth} onPrevMonth={handlePrevMonth} onNextMonth={handleNextMonth} onOpenMonths={() => setView("months")} />
        : <MonthsModeHeader currentMonth={currentMonth} onPrevYear={handlePrevYear} onNextYear={handleNextYear} />
      }
      {view === "calendar" ? (
        <DayPicker
          dir="rtl"
          locale={locale}
          showOutsideDays={showOutsideDays}
          month={currentMonth}
          onMonthChange={applyMonthChange}
          className={cn("group/calendar bg-pure-white [--cell-size:--spacing(8)]", className)}
          formatters={formatters ?? {}}
          classNames={{
            root: cn("w-full", defaultClassNames.root),
            months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
            month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
            nav: cn("hidden", defaultClassNames.nav),
            month_caption: cn("hidden", defaultClassNames.month_caption),
            month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
            weekdays: cn("flex", defaultClassNames.weekdays),
            weekday: cn("flex-1 rounded-xs text-[0.8rem] font-normal text-secondary select-none", defaultClassNames.weekday),
            week: cn(" flex w-full", defaultClassNames.week),
            day: cn("group/day relative  h-full w-full p-0 text-center select-none", defaultClassNames.day),
            range_start: cn("rounded-xs bg-accent", defaultClassNames.range_start),
            range_middle: cn("rounded-none", defaultClassNames.range_middle),
            range_end: cn("rounded-xs bg-accent", defaultClassNames.range_end),
            today: cn("rounded-xs bg-accent text-primary data-[selected=true]:rounded-xs", defaultClassNames.today),
            outside: cn("text-secondary aria-selected:text-secondary", defaultClassNames.outside),
            disabled: cn("text-secondary opacity-50", defaultClassNames.disabled),
            hidden: cn("invisible", defaultClassNames.hidden),
            ...classNames,
          }}
          components={{
            Root: ({ className, rootRef, ...props }) => <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />,
            DayButton: CalendarDayButton,
            WeekNumber: ({ children, ...props }) => <td {...props}><div className="flex size-(--cell-size) items-center justify-center text-center">{children}</div></td>,
            ...components,
          }}
          {...props}
        />
      ) : (
        <MonthGrid currentMonth={currentMonth} onSelectMonth={handleSelectMonth} />
      )}
    </div>
  )
}

function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()
  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => { if (modifiers.focused) ref.current?.focus() }, [modifiers.focused])

  return (
    <SimpleButton
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "flex aspect-square size-auto w-full min-w-(--cell-size) items-center justify-center rounded-xs leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 data-[range-end=true]:bg-danger data-[range-end=true]:text-pure-white data-[range-middle=true]:bg-accent data-[range-start=true]:bg-danger data-[range-start=true]:text-pure-white data-[selected-single=true]:rounded-xs data-[selected-single=true]:bg-danger data-[selected-single=true]:text-pure-white",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}