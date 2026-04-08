import { useState, useEffect, useRef } from 'react'
import { Play, Square, Clock, BarChart2 } from 'lucide-react'
import { mockTimeLog } from '../../../data'
import type { TimeEntry } from '../../../data/mockTimeLog'

const ACCENT = '#3B82F6'
const PROJECTS = ['Forge OS', 'Internal', 'Client Work']

function fmt(secs: number) {
  const h = Math.floor(secs / 3600)
  const m = Math.floor((secs % 3600) / 60)
  const s = secs % 60
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
}

function fmtMin(min: number) {
  if (min < 60) return `${min}m`
  return `${Math.floor(min / 60)}h ${min % 60 > 0 ? `${min % 60}m` : ''}`
}

export function TimeTracker() {
  const [running, setRunning]   = useState(false)
  const [elapsed, setElapsed]   = useState(0)
  const [task, setTask]         = useState('')
  const [project, setProject]   = useState(PROJECTS[0])
  const [log, setLog]           = useState<TimeEntry[]>(mockTimeLog)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const todayStr = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setElapsed(e => e + 1), 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running])

  const startStop = () => {
    if (!running) {
      setRunning(true)
    } else {
      setRunning(false)
      if (elapsed > 0) {
        setLog(l => [
          {
            id: `te${Date.now()}`,
            task: task || 'Untitled task',
            project,
            duration: Math.ceil(elapsed / 60),
            date: todayStr,
          },
          ...l,
        ])
        setElapsed(0)
        setTask('')
      }
    }
  }

  const todayEntries = log.filter(e => e.date === todayStr)
  const todayTotal   = todayEntries.reduce((s, e) => s + e.duration, 0)

  // Weekly totals
  const week = ['2026-04-01','2026-04-02','2026-04-03','2026-04-04','2026-04-05','2026-04-06','2026-04-07']
  const weeklyTotals = week.map(d => ({
    label: new Date(d).toLocaleDateString('en', { weekday: 'short' }),
    total: log.filter(e => e.date === d).reduce((s, e) => s + e.duration, 0),
  }))
  const maxWeekly = Math.max(...weeklyTotals.map(w => w.total), 1)

  return (
    <div className="h-full flex flex-col overflow-auto" style={{ backgroundColor: '#0A1525' }}>
      <div className="p-6 max-w-2xl mx-auto w-full space-y-6">

        {/* Timer */}
        <div
          className="p-6 rounded-2xl"
          style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B' }}
        >
          <div
            className="text-center font-bold mb-6"
            style={{ fontSize: '52px', color: running ? ACCENT : '#E2E8F0', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.05em' }}
          >
            {fmt(elapsed)}
          </div>

          <div className="flex gap-3 mb-4">
            <input
              value={task}
              onChange={e => setTask(e.target.value)}
              placeholder="What are you working on?"
              className="flex-1 px-3 py-2 rounded-xl text-sm outline-none"
              style={{ backgroundColor: '#1E293B', color: '#E2E8F0', border: '1px solid #334155' }}
            />
            <select
              value={project}
              onChange={e => setProject(e.target.value)}
              className="px-3 py-2 rounded-xl text-sm outline-none"
              style={{ backgroundColor: '#1E293B', color: '#94A3B8', border: '1px solid #334155' }}
            >
              {PROJECTS.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>

          <button
            onClick={startStop}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all"
            style={{
              backgroundColor: running ? '#EF444418' : `${ACCENT}18`,
              color: running ? '#EF4444' : ACCENT,
              border: `1px solid ${running ? '#EF444430' : ACCENT + '30'}`,
            }}
          >
            {running ? <><Square size={16} /> Stop & Log</> : <><Play size={16} /> Start Timer</>}
          </button>
        </div>

        {/* Today summary */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#E2E8F0' }}>
              <Clock size={14} style={{ color: ACCENT }} />
              Today's Log
            </div>
            <div className="text-xs font-medium px-2 py-1 rounded-lg" style={{ backgroundColor: `${ACCENT}18`, color: ACCENT }}>
              {fmtMin(todayTotal)} total
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #1E293B' }}>
            {todayEntries.length === 0 ? (
              <div className="p-6 text-center text-sm" style={{ color: '#334155' }}>No entries yet today</div>
            ) : (
              todayEntries.map((e, i) => (
                <div
                  key={e.id}
                  className="flex items-center justify-between px-4 py-3 border-b last:border-0"
                  style={{ borderColor: '#1E293B', backgroundColor: i % 2 === 0 ? '#0F172A' : '#080F1A' }}
                >
                  <div>
                    <div className="text-sm font-medium" style={{ color: '#E2E8F0' }}>{e.task}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#475569' }}>{e.project}</div>
                  </div>
                  <div className="text-sm font-semibold" style={{ color: ACCENT }}>{fmtMin(e.duration)}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Weekly chart */}
        <div>
          <div className="flex items-center gap-2 mb-3 text-sm font-semibold" style={{ color: '#E2E8F0' }}>
            <BarChart2 size={14} style={{ color: ACCENT }} />
            This Week
          </div>
          <div
            className="p-4 rounded-2xl flex items-end justify-between gap-2"
            style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', height: '120px' }}
          >
            {weeklyTotals.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <div className="flex-1 flex items-end w-full">
                  <div
                    className="w-full rounded-t-md transition-all duration-500"
                    style={{
                      height: `${(d.total / maxWeekly) * 64}px`,
                      minHeight: d.total > 0 ? '4px' : '0',
                      backgroundColor: d.label === 'Tue' ? ACCENT : `${ACCENT}50`,
                    }}
                  />
                </div>
                <div style={{ fontSize: '10px', color: '#475569' }}>{d.label}</div>
                {d.total > 0 && <div style={{ fontSize: '9px', color: '#334155' }}>{fmtMin(d.total)}</div>}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
