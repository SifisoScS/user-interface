export type ActivityType = 'lock' | 'motion' | 'arrival' | 'appliance' | 'scene' | 'alert' | 'message'

export interface ActivityEvent {
  id: string
  type: ActivityType
  message: string
  time: string
  icon: string
  color: string
}

export const mockActivity: ActivityEvent[] = [
  { id: 'ac1',  type: 'lock',      message: 'Front door locked',                 time: '5 mins ago',  icon: '🔒', color: '#22C55E' },
  { id: 'ac2',  type: 'motion',    message: 'Motion in backyard',                time: '10 mins ago', icon: '👁️', color: '#F59E0B' },
  { id: 'ac3',  type: 'appliance', message: 'Laundry finished ✅',               time: '25 mins ago', icon: '🧺', color: '#A78BFA' },
  { id: 'ac4',  type: 'arrival',   message: 'Child 2 arrived home 🏠',          time: '32 mins ago', icon: '🏠', color: '#3B82F6' },
  { id: 'ac5',  type: 'scene',     message: 'Movie Night scene activated',       time: '1 hr ago',    icon: '🎬', color: '#A78BFA' },
  { id: 'ac6',  type: 'lock',      message: 'Garage unlocked by Sifiso',         time: '1.5 hrs ago', icon: '🔓', color: '#EF4444' },
  { id: 'ac7',  type: 'arrival',   message: 'Child 1 left for school',           time: '7:50 AM',     icon: '🎒', color: '#F59E0B' },
  { id: 'ac8',  type: 'appliance', message: 'Dishwasher started',                time: '7:30 AM',     icon: '🍽️', color: '#3B82F6' },
  { id: 'ac9',  type: 'scene',     message: 'Morning scene activated',           time: '6:45 AM',     icon: '🌅', color: '#F59E0B' },
  { id: 'ac10', type: 'motion',    message: 'Driveway camera: car detected',     time: '6:40 AM',     icon: '🚗', color: '#F59E0B' },
  { id: 'ac11', type: 'alert',     message: 'Front door battery low ⚠️',        time: 'Yesterday',   icon: '⚡', color: '#EF4444' },
  { id: 'ac12', type: 'message',   message: 'Partner: Running late, home by 8', time: 'Yesterday',   icon: '💬', color: '#A78BFA' },
]
