import { useState } from 'react'
import { Calendar, ChevronLeft, ChevronRight, X, Clock } from 'lucide-react'
import { PanelWrapper } from '../../panels/PanelWrapper'
import { mockEvents } from '../../../data'
import type { CalendarEvent } from '../../../types'

type View = 'month' | 'week'

const DAY_SHORT  = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const MONTH_FULL = ['January','February','March','April','May','June','July','August','September','October','November','December']

const HOURS = Array.from({ length: 13 }, (_, i) => i + 8) // 8am – 8pm

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmt(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

function addDays(d: Date, n: number) {
  const r = new Date(d); r.setDate(r.getDate() + n); return r
}

function startOfWeek(d: Date) {
  const r = new Date(d); r.setDate(r.getDate() - r.getDay()); return r
}

function parseTime(t: string) {
  const [h, m] = t.split(':').map(Number); return h + m / 60
}

// ── Event pill ────────────────────────────────────────────────────────────────

function EventPill({ event, onClick }: { event: CalendarEvent; onClick: (e: CalendarEvent) => void }) {
  return (
    <div
      onClick={e => { e.stopPropagation(); onClick(event) }}
      className="px-1.5 py-0.5 rounded text-xs cursor-pointer truncate select-none"
      style={{
        backgroundColor: `${event.color}25`,
        color: event.color,
        border: `1px solid ${event.color}40`,
        fontSize: '10px',
      }}
      title={`${event.title} ${event.startTime}–${event.endTime}`}
    >
      {event.title}
    </div>
  )
}

// ── Event detail modal ────────────────────────────────────────────────────────

function EventDetail({ event, onClose }: { event: CalendarEvent; onClose: () => void }) {
  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <div
        className="w-64 rounded-2xl p-4 space-y-3 shadow-2xl"
        style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: event.color }} />
            <h3 className="font-semibold text-sm" style={{ color: '#E2E8F0' }}>{event.title}</h3>
          </div>
          <button onClick={onClose} style={{ color: '#64748B' }} className="hover:text-text transition-colors">
            <X size={14} />
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs" style={{ color: '#94A3B8' }}>
          <Clock size={12} />
          <span>{event.startTime} – {event.endTime}</span>
        </div>
        <p className="text-xs" style={{ color: '#64748B' }}>{event.description}</p>
        <div className="flex gap-2 pt-1">
          <button
            className="flex-1 py-1.5 rounded-xl text-xs font-medium transition-colors"
            style={{ backgroundColor: event.color, color: '#fff' }}
          >
            Join Meeting
          </button>
          <button
            className="flex-1 py-1.5 rounded-xl text-xs font-medium transition-colors"
            style={{ backgroundColor: '#1E293B', color: '#94A3B8' }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Month view ────────────────────────────────────────────────────────────────

function MonthView({
  viewDate,
  onPrev,
  onNext,
  onEventClick,
}: {
  viewDate: Date
  onPrev: () => void
  onNext: () => void
  onEventClick: (e: CalendarEvent) => void
}) {
  const today = new Date()
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDow = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  const isToday = (d: number) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear()

  const getEvents = (d: number) => {
    const s = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
    return mockEvents.filter(e => e.date === s)
  }

  return (
    <div className="flex flex-col gap-2 h-full overflow-hidden">
      {/* Nav */}
      <div className="flex items-center justify-between shrink-0 px-1">
        <button onClick={onPrev} className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors" style={{ color: '#64748B' }}>
          <ChevronLeft size={14} />
        </button>
        <span className="font-semibold text-sm" style={{ color: '#E2E8F0' }}>{MONTH_FULL[month]} {year}</span>
        <button onClick={onNext} className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors" style={{ color: '#64748B' }}>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 shrink-0">
        {DAY_SHORT.map(d => (
          <div key={d} className="text-center font-semibold" style={{ color: '#475569', fontSize: '10px' }}>{d}</div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 flex-1 overflow-auto" style={{ gridAutoRows: 'minmax(0, 1fr)' }}>
        {cells.map((day, i) => {
          if (!day) return <div key={`e${i}`} />
          const events = getEvents(day)
          return (
            <div
              key={day}
              className="flex flex-col gap-0.5 px-0.5 py-1 rounded-lg hover:bg-white/5 transition-colors cursor-default"
            >
              <div
                className="w-5 h-5 flex items-center justify-center rounded-full mx-auto text-xs font-medium"
                style={{
                  backgroundColor: isToday(day) ? '#3B82F6' : 'transparent',
                  color: isToday(day) ? '#fff' : '#94A3B8',
                }}
              >
                {day}
              </div>
              <div className="flex flex-col gap-0.5 overflow-hidden">
                {events.slice(0, 2).map(ev => (
                  <EventPill key={ev.id} event={ev} onClick={onEventClick} />
                ))}
                {events.length > 2 && (
                  <span style={{ color: '#64748B', fontSize: '9px', paddingLeft: '2px' }}>
                    +{events.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Week view ─────────────────────────────────────────────────────────────────

function WeekView({
  weekStart,
  onPrev,
  onNext,
  onEventClick,
}: {
  weekStart: Date
  onPrev: () => void
  onNext: () => void
  onEventClick: (e: CalendarEvent) => void
}) {
  const today = new Date()
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  const getEvents = (d: Date): CalendarEvent[] => mockEvents.filter(e => e.date === fmt(d))

  const isToday = (d: Date) =>
    d.toDateString() === today.toDateString()

  const weekLabel = () => {
    const s = days[0]; const e = days[6]
    return `${MONTH_FULL[s.getMonth()].slice(0,3)} ${s.getDate()} – ${MONTH_FULL[e.getMonth()].slice(0,3)} ${e.getDate()}, ${e.getFullYear()}`
  }

  // Position event in the time grid
  const eventTop = (ev: CalendarEvent) => {
    const start = parseTime(ev.startTime) - 8  // 8am = offset 0
    return `${(start / 12) * 100}%`
  }
  const eventHeight = (ev: CalendarEvent) => {
    const dur = parseTime(ev.endTime) - parseTime(ev.startTime)
    return `${Math.max((dur / 12) * 100, 3)}%`
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Nav */}
      <div className="flex items-center justify-between shrink-0 px-1 mb-2">
        <button onClick={onPrev} className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors" style={{ color: '#64748B' }}>
          <ChevronLeft size={14} />
        </button>
        <span className="font-semibold text-xs" style={{ color: '#E2E8F0' }}>{weekLabel()}</span>
        <button onClick={onNext} className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors" style={{ color: '#64748B' }}>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Day column headers */}
      <div className="grid shrink-0" style={{ gridTemplateColumns: '36px repeat(7, 1fr)' }}>
        <div />
        {days.map(d => (
          <div key={d.toString()} className="text-center pb-1">
            <div style={{ color: '#64748B', fontSize: '10px' }}>{DAY_SHORT[d.getDay()]}</div>
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center mx-auto font-semibold"
              style={{
                backgroundColor: isToday(d) ? '#3B82F6' : 'transparent',
                color: isToday(d) ? '#fff' : '#94A3B8',
                fontSize: '11px',
              }}
            >
              {d.getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div className="flex-1 overflow-auto relative">
        <div className="grid" style={{ gridTemplateColumns: '36px repeat(7, 1fr)', minHeight: '100%' }}>
          {/* Hour labels */}
          <div className="flex flex-col">
            {HOURS.map(h => (
              <div
                key={h}
                className="flex-1 text-right pr-2 pt-0"
                style={{ color: '#334155', fontSize: '9px', minHeight: '40px' }}
              >
                {h > 12 ? `${h-12}pm` : h === 12 ? '12pm' : `${h}am`}
              </div>
            ))}
          </div>

          {/* Day columns */}
          {days.map(d => {
            const evs = getEvents(d)
            return (
              <div
                key={d.toString()}
                className="relative border-l"
                style={{ borderColor: '#1E293B', minHeight: `${HOURS.length * 40}px` }}
              >
                {/* Hour lines */}
                {HOURS.map(h => (
                  <div
                    key={h}
                    className="absolute w-full border-b"
                    style={{
                      borderColor: '#1E293B',
                      top: `${((h - 8) / 12) * 100}%`,
                    }}
                  />
                ))}
                {/* Events */}
                {evs.map(ev => (
                  <div
                    key={ev.id}
                    onClick={() => onEventClick(ev)}
                    className="absolute left-0.5 right-0.5 rounded px-1 cursor-pointer overflow-hidden"
                    style={{
                      top: eventTop(ev),
                      height: eventHeight(ev),
                      backgroundColor: `${ev.color}20`,
                      borderLeft: `2px solid ${ev.color}`,
                      color: ev.color,
                      fontSize: '9px',
                      zIndex: 1,
                    }}
                    title={`${ev.title} ${ev.startTime}–${ev.endTime}`}
                  >
                    <div className="font-semibold leading-tight truncate">{ev.title}</div>
                    <div style={{ color: `${ev.color}bb` }}>{ev.startTime}</div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function CalendarWidget() {
  const today = new Date()
  const [view, setView]         = useState<View>('month')
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [weekStart, setWeekStart] = useState(startOfWeek(today))
  const [activeEvent, setActiveEvent] = useState<CalendarEvent | null>(null)

  // Month navigation
  const prevMonth = () => setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))
  const nextMonth = () => setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))

  // Week navigation
  const prevWeek = () => setWeekStart(d => addDays(d, -7))
  const nextWeek = () => setWeekStart(d => addDays(d, 7))

  return (
    <PanelWrapper id="calendar" label="Calendar" icon={Calendar}>
      <div className="h-full flex flex-col p-3 gap-2 overflow-hidden relative text-xs">
        {/* Toolbar */}
        <div className="flex items-center justify-between shrink-0">
          {/* View toggle */}
          <div
            className="flex rounded-xl p-0.5"
            style={{ backgroundColor: '#1E293B' }}
          >
            {(['month', 'week'] as View[]).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="px-3 py-1 rounded-xl text-xs font-medium capitalize transition-all"
                style={{
                  backgroundColor: view === v ? '#3B82F6' : 'transparent',
                  color: view === v ? '#fff' : '#64748B',
                }}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Today button */}
          <button
            onClick={() => {
              setViewDate(new Date(today.getFullYear(), today.getMonth(), 1))
              setWeekStart(startOfWeek(today))
            }}
            className="px-2.5 py-1 rounded-xl text-xs font-medium transition-colors hover:bg-white/10"
            style={{ color: '#64748B', border: '1px solid #1E293B' }}
          >
            Today
          </button>
        </div>

        {/* View */}
        <div className="flex-1 overflow-hidden">
          {view === 'month' ? (
            <MonthView
              viewDate={viewDate}
              onPrev={prevMonth}
              onNext={nextMonth}
              onEventClick={setActiveEvent}
            />
          ) : (
            <WeekView
              weekStart={weekStart}
              onPrev={prevWeek}
              onNext={nextWeek}
              onEventClick={setActiveEvent}
            />
          )}
        </div>

        {/* Event detail overlay */}
        {activeEvent && (
          <EventDetail event={activeEvent} onClose={() => setActiveEvent(null)} />
        )}
      </div>
    </PanelWrapper>
  )
}
