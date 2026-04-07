export interface MeetingParticipant {
  id: string
  name: string
  initials: string
  avatarHue: number
  isSpeaking: boolean
  isMuted: boolean
  cameraOff: boolean
}

export interface Meeting {
  id: string
  title: string
  time: string
  duration: string
  participants: MeetingParticipant[]
  status: 'upcoming' | 'live' | 'ended'
  link: string
}

export const mockMeetings: Meeting[] = [
  {
    id: 'm1',
    title: 'Sprint 24 Planning',
    time: 'Today, 2:00 PM',
    duration: '90 min',
    status: 'live',
    link: 'meet.forgeos.io/sprint-24',
    participants: [
      { id: 'p1', name: 'You',          initials: 'ME', avatarHue: 210, isSpeaking: false, isMuted: false, cameraOff: false },
      { id: 'p2', name: 'Sarah Chen',   initials: 'SC', avatarHue: 210, isSpeaking: true,  isMuted: false, cameraOff: false },
      { id: 'p3', name: 'Marcus Webb',  initials: 'MW', avatarHue: 140, isSpeaking: false, isMuted: true,  cameraOff: false },
      { id: 'p4', name: 'Ava Nkosi',    initials: 'AN', avatarHue: 0,   isSpeaking: false, isMuted: false, cameraOff: true  },
    ],
  },
  {
    id: 'm2',
    title: 'Design Review — Q2 Components',
    time: 'Today, 4:00 PM',
    duration: '60 min',
    status: 'upcoming',
    link: 'meet.forgeos.io/design-review',
    participants: [
      { id: 'p1', name: 'You',           initials: 'ME', avatarHue: 210, isSpeaking: false, isMuted: false, cameraOff: false },
      { id: 'p2', name: 'Priya Sharma',  initials: 'PS', avatarHue: 300, isSpeaking: false, isMuted: false, cameraOff: false },
      { id: 'p3', name: 'Sarah Chen',    initials: 'SC', avatarHue: 210, isSpeaking: false, isMuted: false, cameraOff: false },
    ],
  },
  {
    id: 'm3',
    title: '1:1 with Ava (Product)',
    time: 'Tomorrow, 10:00 AM',
    duration: '30 min',
    status: 'upcoming',
    link: 'meet.forgeos.io/1on1-ava',
    participants: [
      { id: 'p1', name: 'You',       initials: 'ME', avatarHue: 210, isSpeaking: false, isMuted: false, cameraOff: false },
      { id: 'p2', name: 'Ava Nkosi', initials: 'AN', avatarHue: 0,   isSpeaking: false, isMuted: false, cameraOff: false },
    ],
  },
  {
    id: 'm4',
    title: 'All Hands — April Update',
    time: 'Apr 10, 9:00 AM',
    duration: '45 min',
    status: 'upcoming',
    link: 'meet.forgeos.io/all-hands-april',
    participants: [
      { id: 'p1', name: 'You',            initials: 'ME', avatarHue: 210, isSpeaking: false, isMuted: false, cameraOff: false },
      { id: 'p2', name: 'Aiden Coetzee',  initials: 'AC', avatarHue: 220, isSpeaking: false, isMuted: false, cameraOff: false },
      { id: 'p3', name: 'Sarah Chen',     initials: 'SC', avatarHue: 210, isSpeaking: false, isMuted: false, cameraOff: false },
      { id: 'p4', name: 'Marcus Webb',    initials: 'MW', avatarHue: 140, isSpeaking: false, isMuted: false, cameraOff: false },
    ],
  },
]
