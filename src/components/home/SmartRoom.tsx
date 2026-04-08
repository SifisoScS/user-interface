import { useState } from 'react'
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react'
import { SmartLightPanel } from './devices/SmartLight'
import type { IoTState, SmartLight } from '../../data/mockIoT'

const ACCENT = '#14B8A6'

const ROOM_ICONS: Record<string, string> = {
  'Living Room': '🛋️',
  'Bedroom':     '🛏️',
  'Kitchen':     '🍳',
  'Office':      '💻',
}

interface Props {
  room: string
  iotState: IoTState
  onLightChange: (light: SmartLight) => void
}

export function SmartRoom({ room, iotState, onLightChange }: Props) {
  const [expanded, setExpanded] = useState(false)
  const lights = iotState.lights.filter(l => l.room === room)
  const onCount = lights.filter(l => l.on).length
  const totalW  = lights.filter(l => l.on).reduce((s, l) => s + l.watts, 0)

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all"
      style={{ backgroundColor: '#1E293B', border: `1px solid ${expanded ? ACCENT + '40' : '#334155'}` }}
    >
      {/* Header */}
      <button
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{ROOM_ICONS[room] ?? '🏠'}</span>
          <div className="text-left">
            <div className="text-sm font-semibold" style={{ color: '#E2E8F0' }}>{room}</div>
            <div className="text-xs mt-0.5 flex items-center gap-2" style={{ color: '#475569' }}>
              <span className="flex items-center gap-1">
                <Lightbulb size={10} />
                {onCount}/{lights.length} on
                {totalW > 0 && <span style={{ color: '#334155' }}> · {totalW}W</span>}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onCount > 0 && (
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#22C55E', boxShadow: '0 0 6px #22C55E' }}
            />
          )}
          {expanded
            ? <ChevronUp size={14} style={{ color: '#475569' }} />
            : <ChevronDown size={14} style={{ color: '#475569' }} />
          }
        </div>
      </button>

      {/* Expanded device list */}
      {expanded && (
        <div className="px-4 pb-4 border-t" style={{ borderColor: '#334155' }}>
          <div className="pt-3">
            <div className="text-xs font-semibold mb-2" style={{ color: '#475569' }}>Lights</div>
            <SmartLightPanel lights={lights} onChange={onLightChange} />
          </div>
        </div>
      )}
    </div>
  )
}
