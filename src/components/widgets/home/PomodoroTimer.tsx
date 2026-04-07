import { useState, useEffect, useRef } from 'react'
import { Timer, Play, Pause, RotateCcw, SkipForward } from 'lucide-react'
import { PanelWrapper } from '../../panels/PanelWrapper'

type Phase = 'work' | 'short-break' | 'long-break'

const DURATIONS: Record<Phase, number> = {
  'work':        25 * 60,
  'short-break':  5 * 60,
  'long-break':  15 * 60,
}

const PHASE_LABELS: Record<Phase, string> = {
  'work':        'Focus',
  'short-break': 'Short Break',
  'long-break':  'Long Break',
}

const PHASE_COLORS: Record<Phase, string> = {
  'work':        '#3B82F6',
  'short-break': '#10B981',
  'long-break':  '#8B5CF6',
}

export function PomodoroTimer() {
  const [phase, setPhase] = useState<Phase>('work')
  const [timeLeft, setTimeLeft] = useState(DURATIONS['work'])
  const [running, setRunning] = useState(false)
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current!)
            setRunning(false)
            if (phase === 'work') setSessions(s => s + 1)
            return 0
          }
          return t - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, phase])

  const reset = () => {
    setRunning(false)
    setTimeLeft(DURATIONS[phase])
  }

  const switchPhase = (p: Phase) => {
    setRunning(false)
    setPhase(p)
    setTimeLeft(DURATIONS[p])
  }

  const skip = () => {
    setRunning(false)
    const next: Phase = phase === 'work'
      ? (sessions > 0 && sessions % 4 === 0 ? 'long-break' : 'short-break')
      : 'work'
    setPhase(next)
    setTimeLeft(DURATIONS[next])
  }

  const total = DURATIONS[phase]
  const progress = (total - timeLeft) / total
  const color = PHASE_COLORS[phase]

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const secs = String(timeLeft % 60).padStart(2, '0')

  // SVG ring
  const R = 54
  const C = 2 * Math.PI * R
  const dash = C * (1 - progress)

  return (
    <PanelWrapper id="pomodoro" label="Pomodoro" icon={Timer}>
      <div className="h-full flex flex-col items-center justify-center gap-4 p-4 text-xs">
        {/* Phase selector */}
        <div className="flex gap-1">
          {(['work', 'short-break', 'long-break'] as Phase[]).map(p => (
            <button
              key={p}
              onClick={() => switchPhase(p)}
              className="px-2.5 py-1 rounded-full text-xs font-medium transition-all"
              style={{
                backgroundColor: phase === p ? color : '#1E293B',
                color: phase === p ? '#fff' : '#64748B',
              }}
            >
              {PHASE_LABELS[p]}
            </button>
          ))}
        </div>

        {/* Ring */}
        <div className="relative flex items-center justify-center">
          <svg width="140" height="140" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="60" cy="60" r={R} fill="none" stroke="#1E293B" strokeWidth="6" />
            <circle
              cx="60" cy="60" r={R}
              fill="none"
              stroke={color}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={dash}
              style={{ transition: 'stroke-dashoffset 0.9s linear' }}
            />
          </svg>
          <div className="absolute text-center">
            <div
              className="font-mono font-bold"
              style={{ fontSize: '1.7rem', color: '#E2E8F0', lineHeight: 1 }}
            >
              {mins}:{secs}
            </div>
            <p className="mt-1 font-medium" style={{ color: color, fontSize: '11px' }}>
              {PHASE_LABELS[phase]}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={reset}
            className="flex items-center justify-center w-9 h-9 rounded-full
                       transition-colors hover:bg-white/10"
            style={{ color: '#64748B' }}
          >
            <RotateCcw size={15} />
          </button>
          <button
            onClick={() => setRunning(r => !r)}
            className="flex items-center justify-center w-12 h-12 rounded-full
                       transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: color, color: '#fff' }}
          >
            {running ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button
            onClick={skip}
            className="flex items-center justify-center w-9 h-9 rounded-full
                       transition-colors hover:bg-white/10"
            style={{ color: '#64748B' }}
          >
            <SkipForward size={15} />
          </button>
        </div>

        {/* Session counter */}
        <div className="flex items-center gap-2">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all"
              style={{ backgroundColor: i < (sessions % 4) ? color : '#1E293B' }}
            />
          ))}
          <span style={{ color: '#64748B', fontSize: '10px', marginLeft: '4px' }}>
            {sessions} session{sessions !== 1 ? 's' : ''} today
          </span>
        </div>
      </div>
    </PanelWrapper>
  )
}
