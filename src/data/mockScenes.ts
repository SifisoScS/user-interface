import type { IoTState } from './mockIoT'

export interface Scene {
  id: string
  name: string
  icon: string
  description: string
  apply: (state: IoTState) => IoTState
}

export const mockScenes: Scene[] = [
  {
    id: 'sc1',
    name: 'Morning',
    icon: '🌅',
    description: 'Bright lights, comfortable temp',
    apply: (s) => ({
      ...s,
      lights: s.lights.map(l =>
        l.room === 'Kitchen' || l.room === 'Living Room'
          ? { ...l, on: true, brightness: 90, temperature: 'neutral' as const }
          : { ...l, on: false }
      ),
      thermostat: { ...s.thermostat, targetTemp: 22, mode: 'heat' as const },
    }),
  },
  {
    id: 'sc2',
    name: 'Evening',
    icon: '🌆',
    description: 'Warm dim lights, relaxed temp',
    apply: (s) => ({
      ...s,
      lights: s.lights.map(l =>
        l.room === 'Living Room'
          ? { ...l, on: true, brightness: 40, temperature: 'warm' as const }
          : l.room === 'Bedroom'
          ? { ...l, on: true, brightness: 20, temperature: 'warm' as const }
          : { ...l, on: false }
      ),
      thermostat: { ...s.thermostat, targetTemp: 21, mode: 'auto' as const },
    }),
  },
  {
    id: 'sc3',
    name: 'Movie Night',
    icon: '🎬',
    description: 'Dim lights, cool backlight',
    apply: (s) => ({
      ...s,
      lights: s.lights.map(l =>
        l.name === 'TV Backlight'
          ? { ...l, on: true, brightness: 30, temperature: 'cool' as const }
          : l.room === 'Living Room'
          ? { ...l, on: true, brightness: 10, temperature: 'warm' as const }
          : { ...l, on: false }
      ),
      thermostat: { ...s.thermostat, targetTemp: 20, mode: 'cool' as const },
    }),
  },
  {
    id: 'sc4',
    name: 'Away',
    icon: '🚶',
    description: 'All lights off, locks on',
    apply: (s) => ({
      ...s,
      lights: s.lights.map(l => ({ ...l, on: false })),
      locks: s.locks.map(lk => ({ ...lk, locked: true, lastChanged: 'Just now', changedBy: 'Away scene' })),
      thermostat: { ...s.thermostat, targetTemp: 18, mode: 'off' as const },
    }),
  },
  {
    id: 'sc5',
    name: 'Sleep',
    icon: '🌙',
    description: 'Night lights only, low temp',
    apply: (s) => ({
      ...s,
      lights: s.lights.map(l =>
        l.name === 'Bedside'
          ? { ...l, on: true, brightness: 5, temperature: 'warm' as const }
          : { ...l, on: false }
      ),
      thermostat: { ...s.thermostat, targetTemp: 19, mode: 'cool' as const },
    }),
  },
]
