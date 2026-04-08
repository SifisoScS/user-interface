export type FamilyRole = 'owner' | 'family' | 'child' | 'guest'
export type Presence   = 'home' | 'away' | 'school'

export interface FamilyMember {
  id: string
  name: string
  role: FamilyRole
  presence: Presence
  initials: string
  hue: number
  lastSeen: string
  phone: string
  timeLimitMinutes?: number  // kids only
}

export const mockFamily: FamilyMember[] = [
  { id: 'f1', name: 'Sifiso',  role: 'owner',  presence: 'home',   initials: 'SI', hue: 220, lastSeen: 'Just now',   phone: '+27 82 000 0001' },
  { id: 'f2', name: 'Partner', role: 'family', presence: 'away',   initials: 'PA', hue: 340, lastSeen: '2 hrs ago',  phone: '+27 82 000 0002' },
  { id: 'f3', name: 'Child 1', role: 'child',  presence: 'school', initials: 'C1', hue: 140, lastSeen: '8:15 AM',    phone: '+27 82 000 0003', timeLimitMinutes: 120 },
  { id: 'f4', name: 'Child 2', role: 'child',  presence: 'home',   initials: 'C2', hue: 40,  lastSeen: '5 mins ago', phone: '+27 82 000 0004', timeLimitMinutes: 90  },
  { id: 'f5', name: 'Guest',   role: 'guest',  presence: 'away',   initials: 'GU', hue: 280, lastSeen: 'Yesterday',  phone: '+27 82 000 0005' },
]
