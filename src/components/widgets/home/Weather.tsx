import { Cloud, Sun, CloudRain, CloudLightning, Wind, CloudSun, Droplets } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PanelWrapper } from '../../panels/PanelWrapper'
import { mockWeather } from '../../../data'
import type { WeatherCondition } from '../../../types'

const ICONS: Record<WeatherCondition, LucideIcon> = {
  sunny:         Sun,
  cloudy:        Cloud,
  rainy:         CloudRain,
  stormy:        CloudLightning,
  windy:         Wind,
  'partly-cloudy': CloudSun,
}

const CONDITION_LABELS: Record<WeatherCondition, string> = {
  sunny:         'Sunny',
  cloudy:        'Cloudy',
  rainy:         'Rainy',
  stormy:        'Stormy',
  windy:         'Windy',
  'partly-cloudy': 'Partly Cloudy',
}

export function Weather() {
  const w = mockWeather
  const Icon = ICONS[w.condition]

  return (
    <PanelWrapper id="weather" label="Weather" icon={Cloud}>
      <div className="h-full flex flex-col p-4 gap-4 overflow-auto text-xs">
        {/* Current */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-base" style={{ color: '#E2E8F0' }}>{w.city}</p>
            <p style={{ color: '#64748B' }}>{CONDITION_LABELS[w.condition]}</p>
          </div>
          <div className="flex items-center gap-3">
            <Icon size={36} color="#3B82F6" />
            <span
              className="font-bold"
              style={{ fontSize: '2.2rem', color: '#E2E8F0', lineHeight: 1 }}
            >
              {w.temperature}°
            </span>
          </div>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-2 gap-2"
        >
          <div
            className="flex items-center gap-2 p-2 rounded-xl"
            style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid #1E293B' }}
          >
            <Droplets size={14} style={{ color: '#3B82F6' }} />
            <div>
              <p style={{ color: '#64748B', fontSize: '10px' }}>Humidity</p>
              <p className="font-semibold" style={{ color: '#E2E8F0' }}>{w.humidity}%</p>
            </div>
          </div>
          <div
            className="flex items-center gap-2 p-2 rounded-xl"
            style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid #1E293B' }}
          >
            <Wind size={14} style={{ color: '#64748B' }} />
            <div>
              <p style={{ color: '#64748B', fontSize: '10px' }}>Wind</p>
              <p className="font-semibold" style={{ color: '#E2E8F0' }}>{w.wind} km/h</p>
            </div>
          </div>
        </div>

        {/* Forecast */}
        <div>
          <p
            className="font-semibold uppercase tracking-wide mb-2"
            style={{ color: '#64748B', fontSize: '10px' }}
          >
            5-Day Forecast
          </p>
          <div className="space-y-1.5">
            {w.forecast.map((day, i) => {
              const DayIcon = ICONS[day.condition]
              return (
                <div key={i} className="flex items-center justify-between">
                  <span className="w-8" style={{ color: '#94A3B8' }}>{day.day}</span>
                  <DayIcon size={13} color="#64748B" />
                  <div className="flex items-center gap-2 ml-auto">
                    <span style={{ color: '#64748B' }}>{day.low}°</span>
                    <div className="w-12 h-1 rounded-full overflow-hidden" style={{ backgroundColor: '#1E293B' }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${((day.high - day.low) / 15) * 100}%`,
                          backgroundColor: '#3B82F6',
                          marginLeft: `${((day.low - 5) / 25) * 100}%`,
                        }}
                      />
                    </div>
                    <span style={{ color: '#E2E8F0' }}>{day.high}°</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </PanelWrapper>
  )
}
