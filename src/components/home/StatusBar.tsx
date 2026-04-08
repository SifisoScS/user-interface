import { useEffect, useState } from 'react'
import { Settings, Home } from 'lucide-react'
import { AlertsBadge } from './HomeAlerts'

const ACCENT = '#14B8A6'

interface Props {
  alertCount: number
}

export function StatusBar({ alertCount }: Props) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const dayStr = now.toLocaleDateString('en', { weekday: 'long', month: 'short', day: 'numeric' })
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <div
      className="flex items-center gap-4 px-5 shrink-0 border-b"
      style={{ height: '44px', backgroundColor: '#0F172A', borderColor: '#334155' }}
    >
      {/* Date & time */}
      <div className="flex items-center gap-3 text-xs">
        <span style={{ color: '#64748B' }}>{dayStr}</span>
        <span className="font-semibold" style={{ color: '#E2E8F0', fontVariantNumeric: 'tabular-nums' }}>{timeStr}</span>
      </div>

      {/* Separator */}
      <div className="w-px h-4" style={{ backgroundColor: '#334155' }} />

      {/* Weather */}
      <div className="flex items-center gap-1.5 text-xs" style={{ color: '#64748B' }}>
        <span>☁</span>
        <span>22°C</span>
        <span style={{ color: '#334155' }}>Johannesburg</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Alerts */}
      <AlertsBadge count={alertCount} />

      {/* Home status */}
      <div className="flex items-center gap-1.5 text-xs" style={{ color: '#64748B' }}>
        <Home size={12} style={{ color: ACCENT }} />
        <span>Home</span>
      </div>

      {/* Settings */}
      <button
        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
        style={{ color: '#475569' }}
      >
        <Settings size={14} />
      </button>
    </div>
  )
}
