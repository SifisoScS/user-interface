import { Lightbulb } from 'lucide-react'
import type { SmartLight as SmartLightType, LightTemp } from '../../../data/mockIoT'

const ACCENT = '#14B8A6'

const TEMP_COLORS: Record<LightTemp, string> = {
  warm:    '#F59E0B',
  neutral: '#E2E8F0',
  cool:    '#93C5FD',
}

interface Props {
  lights: SmartLightType[]
  onChange: (updated: SmartLightType) => void
}

export function SmartLightPanel({ lights, onChange }: Props) {
  return (
    <div className="space-y-2">
      {lights.map(light => (
        <div
          key={light.id}
          className="p-3 rounded-xl"
          style={{ backgroundColor: '#1E293B', border: '1px solid #334155' }}
        >
          {/* Row 1: name + toggle */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Lightbulb
                size={14}
                style={{ color: light.on ? TEMP_COLORS[light.temperature] : '#334155' }}
              />
              <span className="text-xs font-medium" style={{ color: light.on ? '#E2E8F0' : '#475569' }}>
                {light.name}
              </span>
              <span className="text-xs" style={{ color: '#334155' }}>
                {light.watts}W
              </span>
            </div>
            <ToggleSwitch on={light.on} onChange={on => onChange({ ...light, on })} accent={ACCENT} />
          </div>

          {/* Row 2: brightness + temp (only if on) */}
          {light.on && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span style={{ color: '#475569', fontSize: '10px', width: '20px' }}>
                  {light.brightness}%
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={light.brightness}
                  onChange={e => onChange({ ...light, brightness: Number(e.target.value) })}
                  className="flex-1 accent-purple-400"
                  style={{ accentColor: ACCENT }}
                />
              </div>
              <div className="flex items-center gap-1.5">
                {(['warm', 'neutral', 'cool'] as LightTemp[]).map(t => (
                  <button
                    key={t}
                    onClick={() => onChange({ ...light, temperature: t })}
                    className="flex-1 py-0.5 rounded-lg text-center transition-all capitalize"
                    style={{
                      backgroundColor: light.temperature === t ? `${TEMP_COLORS[t]}25` : 'transparent',
                      color: light.temperature === t ? TEMP_COLORS[t] : '#334155',
                      border: `1px solid ${light.temperature === t ? TEMP_COLORS[t] + '50' : '#334155'}`,
                      fontSize: '10px',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function ToggleSwitch({ on, onChange, accent }: { on: boolean; onChange: (v: boolean) => void; accent: string }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="relative rounded-full transition-all duration-200"
      style={{
        width: '32px',
        height: '18px',
        backgroundColor: on ? accent : '#334155',
        border: `1px solid ${on ? accent + '80' : '#334155'}`,
      }}
    >
      <div
        className="absolute top-0.5 rounded-full transition-all duration-200"
        style={{
          width: '14px',
          height: '14px',
          backgroundColor: '#fff',
          left: on ? '15px' : '1px',
        }}
      />
    </button>
  )
}
