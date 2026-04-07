import { useEffect, useState } from 'react'
import { Clock as ClockIcon } from 'lucide-react'
import { PanelWrapper } from '../../panels/PanelWrapper'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export function Clock() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const h = String(now.getHours()).padStart(2, '0')
  const m = String(now.getMinutes()).padStart(2, '0')
  const s = String(now.getSeconds()).padStart(2, '0')
  const dayName = DAYS[now.getDay()]
  const dateStr = `${dayName}, ${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`

  // Analog clock
  const sec = now.getSeconds()
  const min = now.getMinutes()
  const hr = now.getHours() % 12

  const secDeg = sec * 6
  const minDeg = min * 6 + sec * 0.1
  const hrDeg = hr * 30 + min * 0.5

  const toXY = (deg: number, r: number) => {
    const rad = (deg - 90) * (Math.PI / 180)
    return { x: 50 + r * Math.cos(rad), y: 50 + r * Math.sin(rad) }
  }

  const secEnd = toXY(secDeg, 38)
  const minEnd = toXY(minDeg, 32)
  const hrEnd = toXY(hrDeg, 22)

  return (
    <PanelWrapper id="clock" label="Clock" icon={ClockIcon}>
      <div className="h-full flex flex-col items-center justify-center gap-4 p-4">
        {/* Analog clock */}
        <svg width="120" height="120" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="none" stroke="#1E293B" strokeWidth="2" />
          {/* Hour marks */}
          {Array.from({ length: 12 }, (_, i) => {
            const p = toXY(i * 30, 42)
            const p2 = toXY(i * 30, 46)
            return <line key={i} x1={p.x} y1={p.y} x2={p2.x} y2={p2.y} stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
          })}
          {/* Hour hand */}
          <line x1="50" y1="50" x2={hrEnd.x} y2={hrEnd.y} stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
          {/* Minute hand */}
          <line x1="50" y1="50" x2={minEnd.x} y2={minEnd.y} stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />
          {/* Second hand */}
          <line x1="50" y1="50" x2={secEnd.x} y2={secEnd.y} stroke="#3B82F6" strokeWidth="1" strokeLinecap="round" />
          {/* Center dot */}
          <circle cx="50" cy="50" r="2.5" fill="#3B82F6" />
        </svg>

        {/* Digital time */}
        <div className="text-center">
          <div
            className="font-mono font-bold tracking-tight"
            style={{ fontSize: '2rem', color: '#E2E8F0', letterSpacing: '-0.02em' }}
          >
            {h}
            <span style={{ color: '#3B82F6', animation: 'pulse 1s infinite' }}>:</span>
            {m}
            <span className="text-2xl" style={{ color: '#64748B' }}>:{s}</span>
          </div>
          <p className="text-xs mt-1" style={{ color: '#64748B' }}>{dateStr}</p>
        </div>
      </div>
    </PanelWrapper>
  )
}
