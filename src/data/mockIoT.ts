export type LightTemp = 'warm' | 'neutral' | 'cool'
export type ThermostatMode = 'heat' | 'cool' | 'auto' | 'off'

export interface SmartLight {
  id: string
  name: string
  room: string
  on: boolean
  brightness: number      // 0–100
  temperature: LightTemp
  watts: number
}

export interface ThermostatState {
  currentTemp: number
  targetTemp: number
  mode: ThermostatMode
  humidity: number
}

export interface DoorLock {
  id: string
  name: string
  locked: boolean
  lastChanged: string
  changedBy: string
}

export interface SecurityCamera {
  id: string
  name: string
  location: string
  online: boolean
  lastMotion: string
}

export interface IoTState {
  lights: SmartLight[]
  thermostat: ThermostatState
  locks: DoorLock[]
  cameras: SecurityCamera[]
}

export const defaultIoTState: IoTState = {
  lights: [
    { id: 'l1', name: 'Ceiling',     room: 'Living Room', on: true,  brightness: 80, temperature: 'warm',    watts: 9  },
    { id: 'l2', name: 'Floor Lamp',  room: 'Living Room', on: true,  brightness: 50, temperature: 'warm',    watts: 5  },
    { id: 'l3', name: 'TV Backlight',room: 'Living Room', on: false, brightness: 30, temperature: 'cool',    watts: 3  },
    { id: 'l4', name: 'Ceiling',     room: 'Main Bedroom', on: false, brightness: 60, temperature: 'warm',    watts: 8  },
    { id: 'l5', name: 'Bedside',     room: 'Main Bedroom', on: true,  brightness: 25, temperature: 'warm',    watts: 4  },
    { id: 'l6', name: 'Ceiling',     room: 'Kitchen',     on: true,  brightness: 100, temperature: 'neutral', watts: 12 },
    { id: 'l7', name: 'Under-cabinet',room:'Kitchen',     on: false, brightness: 70, temperature: 'neutral', watts: 6  },
    { id: 'l8', name: 'Desk Lamp',   room: 'Kids Room',   on: true,  brightness: 90, temperature: 'cool',    watts: 7  },
  ],
  thermostat: {
    currentTemp: 21,
    targetTemp: 22,
    mode: 'heat',
    humidity: 52,
  },
  locks: [
    { id: 'lk1', name: 'Front Door', locked: true,  lastChanged: '7:42 AM', changedBy: 'You via app' },
    { id: 'lk2', name: 'Back Door',  locked: true,  lastChanged: '8:15 AM', changedBy: 'Auto-lock' },
    { id: 'lk3', name: 'Garage',     locked: false, lastChanged: '9:30 AM', changedBy: 'You via app' },
  ],
  cameras: [
    { id: 'c1', name: 'Living Room',  location: 'indoor',  online: true,  lastMotion: '2 mins ago'  },
    { id: 'c2', name: 'Front Door',   location: 'outdoor', online: true,  lastMotion: '12 mins ago' },
    { id: 'c3', name: 'Backyard',     location: 'outdoor', online: true,  lastMotion: '1 hour ago'  },
    { id: 'c4', name: 'Driveway',     location: 'outdoor', online: false, lastMotion: '3 hours ago' },
  ],
}
