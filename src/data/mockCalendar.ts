import type { CalendarEvent } from '../types'

const today = new Date()
const fmt = (d: Date) => d.toISOString().split('T')[0]
const addDays = (d: Date, n: number) => {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r
}

export const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Design Review',
    date: fmt(today),
    startTime: '11:00',
    endTime: '12:00',
    color: '#3B82F6',
    description: 'Q2 component library review with design team',
  },
  {
    id: '2',
    title: 'Sprint Planning',
    date: fmt(today),
    startTime: '14:00',
    endTime: '15:30',
    color: '#8B5CF6',
    description: 'Sprint 24 planning session',
  },
  {
    id: '3',
    title: '1:1 with Sarah',
    date: fmt(addDays(today, 1)),
    startTime: '10:00',
    endTime: '10:30',
    color: '#10B981',
    description: 'Weekly sync',
  },
  {
    id: '4',
    title: 'API Integration',
    date: fmt(addDays(today, 1)),
    startTime: '13:00',
    endTime: '17:00',
    color: '#F59E0B',
    description: 'Backend API integration work session',
  },
  {
    id: '5',
    title: 'Team Standup',
    date: fmt(addDays(today, 2)),
    startTime: '09:00',
    endTime: '09:15',
    color: '#3B82F6',
    description: 'Daily standup',
  },
  {
    id: '6',
    title: 'Product Demo',
    date: fmt(addDays(today, 3)),
    startTime: '15:00',
    endTime: '16:00',
    color: '#EF4444',
    description: 'Q2 progress demo for stakeholders',
  },
  {
    id: '7',
    title: 'Offsite Planning',
    date: fmt(addDays(today, 5)),
    startTime: '10:00',
    endTime: '16:00',
    color: '#EC4899',
    description: 'Quarterly offsite planning day',
  },
  {
    id: '8',
    title: 'Code Review',
    date: fmt(addDays(today, -1)),
    startTime: '14:00',
    endTime: '15:00',
    color: '#6366F1',
    description: 'Panel system PR review',
  },
]
