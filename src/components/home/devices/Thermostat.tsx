import { Flame, Wind, RefreshCw, Power } from 'lucide-react'
import type { ThermostatState, ThermostatMode } from '../../../data/mockIoT'

const ACCENT = '#2563EB'

const MODE_CONFIG: Record<ThermostatMode, { icon: React.ReactNode; label: string; color: string }> = {
  heat: { icon: <Flame size={12} />,      label: 'Heat', color: '#F59E0B' },
  cool: { icon: <Wind size={12} />,       label: 'Cool', color: '#93C5FD' },
  auto: { icon: <RefreshCw size={12} />,  label: 'Auto', color: '#2563EB' },
  off:  { icon: <Power size={12} />,      label: 'Off',  color: '#475569' },
}

interface Props {
  state: ThermostatState
  onChange: (s: ThermostatState) => void
}

export function ThermostatPanel({ state, onChange }: Props) {
  const modeConfig = MODE_CONFIG[state.mode]
  const isActive = state.mode !== 'off'
  const diff = state.targetTemp - state.currentTemp

  return (
    <div className="p-4 rounded-2xl space-y-4" style={{ backgroundColor: '#1E293B', border: '1px solid #334155' }}>
      {/* Current / Target */}
      <div className="flex items-end justify-between">
        <div>
          <div style={{ color: '#475569', fontSize: '10px', marginBottom: '2px' }}>Current</div>
          <div className="font-bold" style={{ fontSize: '36px', color: '#E2E8F0', lineHeight: 1 }}>
            {state.currentTemp}°<span style={{ fontSize: '18px', color: '#64748B' }}>C</span>
          </div>
        </div>
        <div className="text-right">
          <div style={{ color: '#475569', fontSize: '10px', marginBottom: '2px' }}>Target</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onChange({ ...state, targetTemp: state.targetTemp - 1 })}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-lg font-bold transition-colors hover:bg-white/10"
              style={{ color: '#64748B', backgroundColor: '#334155' }}
            >−</button>
            <span className="font-semibold text-xl w-10 text-center" style={{ color: ACCENT }}>
              {state.targetTemp}°
            </span>
            <button
              onClick={() => onChange({ ...state, targetTemp: state.targetTemp + 1 })}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-lg font-bold transition-colors hover:bg-white/10"
              style={{ color: '#64748B', backgroundColor: '#334155' }}
            >+</button>
          </div>
        </div>
      </div>

      {/* Status */}
      {isActive && (
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
          style={{ backgroundColor: `${modeConfig.color}15`, color: modeConfig.color }}
        >
          {modeConfig.icon}
          {diff > 0 ? 'Heating…' : diff < 0 ? 'Cooling…' : 'At target temperature'}
          <span className="ml-auto" style={{ color: '#475569' }}>
            Humidity: {state.humidity}%
          </span>
        </div>
      )}

      {/* Mode selector */}
      <div className="grid grid-cols-4 gap-1.5">
        {(Object.entries(MODE_CONFIG) as [ThermostatMode, typeof MODE_CONFIG[ThermostatMode]][]).map(([mode, cfg]) => (
          <button
            key={mode}
            onClick={() => onChange({ ...state, mode })}
            className="flex flex-col items-center gap-1 py-2 rounded-xl transition-all"
            style={{
              backgroundColor: state.mode === mode ? `${cfg.color}20` : '#334155',
              color: state.mode === mode ? cfg.color : '#475569',
              border: `1px solid ${state.mode === mode ? cfg.color + '50' : 'transparent'}`,
            }}
          >
            {cfg.icon}
            <span style={{ fontSize: '10px' }}>{cfg.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
