import { useState, useEffect } from 'react'
import { Zap, TrendingDown } from 'lucide-react'

const ACCENT = '#14B8A6'

const CONSUMERS = [
  { name: 'HVAC',    watts: 2400, color: '#F59E0B' },
  { name: 'Washer',  watts: 1100, color: '#3B82F6' },
  { name: 'Fridge',  watts: 180,  color: '#22C55E' },
  { name: 'Lights',  watts: 54,   color: '#14B8A6' },
  { name: 'Other',   watts: 320,  color: '#475569' },
]

const TOTAL_WATTS = CONSUMERS.reduce((s, c) => s + c.watts, 0)

export function EnergyMonitor() {
  const [kWh, setKWh] = useState(4.2)

  useEffect(() => {
    const t = setInterval(() => {
      setKWh(v => Math.round((v + (Math.random() * 0.02 - 0.005)) * 100) / 100)
    }, 3000)
    return () => clearInterval(t)
  }, [])

  const pct = Math.min((kWh / 12) * 100, 100)

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Zap size={13} style={{ color: ACCENT }} />
        <span className="text-xs font-semibold" style={{ color: '#E2E8F0' }}>Energy Monitor</span>
      </div>

      {/* Current consumption */}
      <div
        className="p-3 rounded-xl"
        style={{ backgroundColor: '#1E293B', border: '1px solid #334155' }}
      >
        <div className="flex items-end justify-between mb-2">
          <div>
            <div style={{ color: '#475569', fontSize: '10px' }}>Current draw</div>
            <div className="font-bold" style={{ fontSize: '22px', color: ACCENT, lineHeight: 1 }}>
              {(TOTAL_WATTS / 1000).toFixed(2)}
              <span style={{ fontSize: '12px', color: '#64748B' }}> kW</span>
            </div>
          </div>
          <div className="text-right">
            <div style={{ color: '#475569', fontSize: '10px' }}>Today</div>
            <div className="font-semibold text-sm" style={{ color: '#E2E8F0' }}>{kWh} kWh</div>
            <div className="flex items-center gap-1 justify-end" style={{ color: '#22C55E', fontSize: '10px' }}>
              <TrendingDown size={10} /> 8% vs yesterday
            </div>
          </div>
        </div>

        {/* Gauge bar */}
        <div className="rounded-full overflow-hidden" style={{ height: '6px', backgroundColor: '#334155' }}>
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${pct}%`,
              background: `linear-gradient(to right, #14B8A6, #2563EB)`,
            }}
          />
        </div>
        <div className="flex justify-between mt-1" style={{ color: '#334155', fontSize: '9px' }}>
          <span>0</span><span>Daily limit: 12 kWh</span>
        </div>
      </div>

      {/* Top consumers */}
      <div className="space-y-1.5">
        <div style={{ color: '#475569', fontSize: '10px', fontWeight: 600 }}>Top consumers</div>
        {CONSUMERS.map(c => (
          <div key={c.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
            <span className="text-xs flex-1" style={{ color: '#94A3B8' }}>{c.name}</span>
            <span className="text-xs font-medium" style={{ color: '#E2E8F0' }}>{c.watts}W</span>
            <div className="w-20 rounded-full overflow-hidden" style={{ height: '4px', backgroundColor: '#334155' }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${(c.watts / TOTAL_WATTS) * 100}%`, backgroundColor: c.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
