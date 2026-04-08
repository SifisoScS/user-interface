import { useState } from 'react'
import { HomeAlerts } from '../HomeAlerts'
import { mockScenes } from '../../../data/mockScenes'
import { mockActivity } from '../../../data/mockActivity'
import type { IoTState } from '../../../data/mockIoT'

const AMBER  = '#F59E0B'
const GREEN  = '#22C55E'
const BLUE   = '#3B82F6'
const RED    = '#EF4444'
const ACCENT = '#2563EB'

type SecurityMode = 'home' | 'night' | 'away'

interface Props {
  iotState: IoTState
  onApply: (s: IoTState) => void
  onAlertCountChange?: (n: number) => void
}

function getGreeting(hour: number): { salutation: string; status: string } {
  if (hour >= 5  && hour < 12) return { salutation: 'Good morning, Sifiso ☀️',  status: 'Everyone is up and about.' }
  if (hour >= 12 && hour < 18) return { salutation: 'Good afternoon, Sifiso 👋', status: 'Everything looks good at home.' }
  if (hour >= 18 && hour < 22) return { salutation: 'Good evening, Sifiso 🌆',   status: 'Everyone is home and safe.' }
  return { salutation: 'Good night, Sifiso 🌙', status: 'Home is secure and quiet.' }
}

const SCENE_BUTTONS = [
  { emoji: '🏠', label: 'Home',     sceneId: 'sc1' },
  { emoji: '🚗', label: 'Away',     sceneId: 'sc4' },
  { emoji: '🎬', label: 'Movie',    sceneId: 'sc3' },
  { emoji: '🌙', label: 'Bedtime',  sceneId: 'sc5' },
]

export function HomeTab({ iotState, onApply, onAlertCountChange }: Props) {
  const [tvOn, setTvOn]             = useState(false)
  const [secMode, setSecMode]       = useState<SecurityMode>('night')
  const { salutation, status }      = getGreeting(new Date().getHours())

  const lockedCount = iotState.locks.filter(l => l.locked).length
  const lightsOn    = iotState.lights.filter(l => l.on).length
  const temp        = iotState.thermostat.currentTemp

  const tempChip =
    temp < 19  ? { label: 'Cool 🥶',        color: BLUE   } :
    temp <= 23 ? { label: 'Comfortable 😊', color: GREEN  } :
                 { label: 'Warm 🥵',         color: AMBER  }

  const doorsColor = lockedCount === iotState.locks.length ? GREEN : AMBER
  const secColors: Record<SecurityMode, string> = { home: GREEN, night: ACCENT, away: AMBER }

  const applyScene = (sceneId: string) => {
    const scene = mockScenes.find(s => s.id === sceneId)
    if (scene) onApply(scene.apply(iotState))
  }

  const applyEmergency = () =>
    onApply({
      ...iotState,
      lights: iotState.lights.map(l => ({ ...l, on: true, brightness: 100, temperature: 'neutral' as const })),
      locks:  iotState.locks.map(lk => ({ ...lk, locked: true, lastChanged: 'Just now', changedBy: 'Emergency mode' })),
    })

  return (
    <div className="h-full overflow-auto">
      <div className="p-6 flex flex-col gap-6 max-w-2xl">

        {/* Greeting */}
        <div>
          <div className="text-2xl font-bold" style={{ color: '#E2E8F0' }}>{salutation}</div>
          <div className="text-sm mt-1" style={{ color: '#64748B' }}>{status}</div>
        </div>

        {/* Status row */}
        <div className="flex flex-wrap gap-3">
          <StatusChip emoji="🔒" label={`Doors: ${lockedCount}/${iotState.locks.length} locked`} color={doorsColor} />
          <StatusChip emoji="💡" label={`Lights: ${lightsOn} on`}                               color={lightsOn > 0 ? AMBER : '#475569'} />
          <button
            onClick={() => setTvOn(v => !v)}
            style={{ all: 'unset', cursor: 'pointer' }}
          >
            <StatusChip emoji="📺" label={`TV: ${tvOn ? 'On' : 'Off'}`} color={tvOn ? BLUE : '#475569'} />
          </button>
          <StatusChip emoji="🌡" label={`Temp: ${tempChip.label}`}     color={tempChip.color} />
          <button
            onClick={() => setSecMode(m => m === 'home' ? 'night' : m === 'night' ? 'away' : 'home')}
            style={{ all: 'unset', cursor: 'pointer' }}
          >
            <StatusChip
              emoji="🚨"
              label={`Security: ${secMode === 'home' ? 'Home' : secMode === 'night' ? 'Night Mode' : 'Away'}`}
              color={secColors[secMode]}
            />
          </button>
        </div>

        {/* Scene buttons */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#475569' }}>
            Quick Actions
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            {SCENE_BUTTONS.map(btn => (
              <button
                key={btn.sceneId}
                onClick={() => applyScene(btn.sceneId)}
                className="flex flex-col items-center gap-2 rounded-3xl p-5 transition-all hover:brightness-110 active:scale-95"
                style={{ backgroundColor: `${AMBER}18`, border: `1px solid ${AMBER}30` }}
              >
                <span style={{ fontSize: '28px' }}>{btn.emoji}</span>
                <span className="font-semibold text-sm" style={{ color: AMBER }}>{btn.label}</span>
              </button>
            ))}
          </div>
          <button
            onClick={applyEmergency}
            className="w-full flex items-center justify-center gap-3 rounded-3xl p-4 transition-all hover:brightness-110 active:scale-95"
            style={{ backgroundColor: `${RED}18`, border: `1px solid ${RED}30` }}
          >
            <span style={{ fontSize: '24px' }}>🚨</span>
            <span className="font-semibold" style={{ color: RED }}>Emergency Mode</span>
          </button>
        </div>

        {/* Live Highlights */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#475569' }}>
            Live Highlights
          </div>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: '#1E293B', border: '1px solid #334155' }}
          >
            {mockActivity.slice(0, 8).map((event, i) => (
              <div
                key={event.id}
                className="flex items-start gap-3 py-3 px-4 border-l-2"
                style={{
                  borderLeftColor: event.color + '80',
                  borderBottom: i < 7 ? '1px solid #3341550A' : 'none',
                }}
              >
                <span style={{ fontSize: '16px', lineHeight: '1.4' }}>{event.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm" style={{ color: '#CBD5E1' }}>{event.message}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#475569' }}>{event.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#475569' }}>
            Alerts
          </div>
          <div className="rounded-2xl p-4" style={{ backgroundColor: '#1E293B', border: '1px solid #334155' }}>
            <HomeAlerts onCountChange={onAlertCountChange} />
          </div>
        </div>

      </div>
    </div>
  )
}

function StatusChip({ emoji, label, color }: { emoji: string; label: string; color: string }) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-3 rounded-2xl"
      style={{ backgroundColor: `${color}18`, border: `1px solid ${color}30` }}
    >
      <span style={{ fontSize: '14px' }}>{emoji}</span>
      <span className="text-sm font-medium" style={{ color }}>{label}</span>
    </div>
  )
}
