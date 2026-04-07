import { useState } from 'react'
import { Bell, X, AlertTriangle, Thermometer, BatteryLow, Lock } from 'lucide-react'
import { defaultAlerts } from '../../data'
import type { HomeAlert, AlertType } from '../../data/mockAlerts'

const ACCENT = '#A78BFA'

const ALERT_ICONS: Record<AlertType, React.ReactNode> = {
  motion:  <AlertTriangle size={12} style={{ color: '#F59E0B' }} />,
  climate: <Thermometer  size={12} style={{ color: '#3B82F6' }} />,
  battery: <BatteryLow   size={12} style={{ color: '#EF4444' }} />,
  lock:    <Lock         size={12} style={{ color: '#22C55E' }} />,
  info:    <Bell         size={12} style={{ color: '#A78BFA' }} />,
}

const ALERT_COLORS: Record<AlertType, string> = {
  motion:  '#F59E0B',
  climate: '#3B82F6',
  battery: '#EF4444',
  lock:    '#22C55E',
  info:    '#A78BFA',
}

interface Props {
  onCountChange?: (n: number) => void
}

export function HomeAlerts({ onCountChange }: Props) {
  const [alerts, setAlerts] = useState<HomeAlert[]>(defaultAlerts)

  const dismiss = (id: string) => {
    const next = alerts.map(a => a.id === id ? { ...a, dismissed: true } : a)
    setAlerts(next)
    onCountChange?.(next.filter(a => !a.dismissed).length)
  }

  const active = alerts.filter(a => !a.dismissed)

  if (active.length === 0) {
    return (
      <div className="flex items-center gap-2 text-xs" style={{ color: '#334155' }}>
        <Bell size={12} />
        No alerts
      </div>
    )
  }

  return (
    <div className="space-y-1.5">
      {active.map(alert => (
        <div
          key={alert.id}
          className="flex items-start gap-2 px-3 py-2 rounded-xl"
          style={{
            backgroundColor: `${ALERT_COLORS[alert.type]}10`,
            border: `1px solid ${ALERT_COLORS[alert.type]}25`,
          }}
        >
          <div className="mt-0.5 shrink-0">{ALERT_ICONS[alert.type]}</div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium" style={{ color: '#E2E8F0' }}>{alert.title}</div>
            <div className="text-xs mt-0.5" style={{ color: '#475569' }}>{alert.detail}</div>
          </div>
          <button
            onClick={() => dismiss(alert.id)}
            className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 transition-colors shrink-0"
            style={{ color: '#475569' }}
          >
            <X size={10} />
          </button>
        </div>
      ))}
    </div>
  )
}

export function AlertsBadge({ count }: { count: number }) {
  if (count === 0) return null
  return (
    <div
      className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs cursor-pointer"
      style={{ backgroundColor: '#EF444418', color: '#EF4444' }}
    >
      <Bell size={10} />
      {count} alert{count !== 1 ? 's' : ''}
    </div>
  )
}
