export interface TimeEntry {
  id: string
  task: string
  project: string
  duration: number   // minutes
  date: string       // YYYY-MM-DD
}

export const mockTimeLog: TimeEntry[] = [
  { id: 'te1', task: 'Sprint planning session',   project: 'Forge OS',    duration: 90,  date: '2026-04-07' },
  { id: 'te2', task: 'Design review prep',        project: 'Forge OS',    duration: 45,  date: '2026-04-07' },
  { id: 'te3', task: 'Code review — PR #142',     project: 'Forge OS',    duration: 30,  date: '2026-04-07' },
  { id: 'te4', task: 'Onboarding docs update',    project: 'Internal',    duration: 60,  date: '2026-04-06' },
  { id: 'te5', task: 'API integration testing',   project: 'Forge OS',    duration: 120, date: '2026-04-06' },
  { id: 'te6', task: 'Weekly team sync',          project: 'Internal',    duration: 60,  date: '2026-04-05' },
  { id: 'te7', task: 'Bug fixes — IoT widgets',   project: 'Forge OS',    duration: 150, date: '2026-04-05' },
  { id: 'te8', task: 'Client call — Q2 scope',    project: 'Client Work', duration: 45,  date: '2026-04-04' },
  { id: 'te9', task: 'Performance profiling',     project: 'Forge OS',    duration: 90,  date: '2026-04-04' },
]
