import { useState, useEffect } from 'react'
import { Activity } from 'lucide-react'
import { PanelWrapper } from '../../panels/PanelWrapper'

interface Stat {
  label: string
  value: number
  unit: string
  color: string
  detail: string
}

function generateStats(): Stat[] {
  return [
    {
      label: 'CPU',
      value: 20 + Math.random() * 50,
      unit: '%',
      color: '#3B82F6',
      detail: '8 cores · 3.2 GHz',
    },
    {
      label: 'RAM',
      value: 55 + Math.random() * 20,
      unit: '%',
      color: '#8B5CF6',
      detail: '11.8 GB / 16 GB',
    },
    {
      label: 'GPU',
      value: 10 + Math.random() * 40,
      unit: '%',
      color: '#10B981',
      detail: 'RTX 4060 · 8 GB VRAM',
    },
    {
      label: 'Disk',
      value: 67,
      unit: '%',
      color: '#F59E0B',
      detail: '335 GB / 512 GB',
    },
    {
      label: 'Network',
      value: 5 + Math.random() * 30,
      unit: 'Mbps',
      color: '#EC4899',
      detail: 'Down · 1 Gbps link',
    },
  ]
}

export function SystemStats() {
  const [stats, setStats] = useState<Stat[]>(generateStats)

  useEffect(() => {
    const interval = setInterval(() => setStats(generateStats()), 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <PanelWrapper id="system-stats" label="System" icon={Activity}>
      <div className="h-full flex flex-col p-3 gap-3 overflow-auto text-xs">
        {stats.map(stat => (
          <div key={stat.label} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold" style={{ color: '#E2E8F0' }}>{stat.label}</span>
                <span className="ml-2" style={{ color: '#64748B', fontSize: '10px' }}>{stat.detail}</span>
              </div>
              <span className="font-mono font-bold" style={{ color: stat.color }}>
                {Math.round(stat.value)}{stat.unit}
              </span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#1E293B' }}>
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${Math.min(stat.value, 100)}%`,
                  backgroundColor: stat.color,
                  boxShadow: `0 0 8px ${stat.color}60`,
                }}
              />
            </div>
          </div>
        ))}

        {/* Uptime */}
        <div
          className="mt-auto pt-2 border-t flex items-center justify-between"
          style={{ borderColor: '#1E293B', color: '#64748B' }}
        >
          <span>Uptime</span>
          <span style={{ color: '#94A3B8' }}>3d 7h 42m</span>
        </div>
      </div>
    </PanelWrapper>
  )
}
