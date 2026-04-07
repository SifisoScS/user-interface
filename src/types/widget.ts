import type { LucideIcon } from 'lucide-react'
import type { Mode } from './mode'

export type WidgetId =
  | 'terminal'
  | 'code-editor'
  | 'git-status'
  | 'api-tester'
  | 'dev-tasks'
  | 'browser-preview-dev'
  | 'email-inbox'
  | 'team-chat'
  | 'calendar'
  | 'task-board'
  | 'quick-notes'
  | 'clock'
  | 'weather'
  | 'pomodoro'
  | 'system-stats'
  | 'browser-preview-home'

export interface WidgetConfig {
  id: WidgetId
  label: string
  icon: LucideIcon
  modes: Mode[]
}

export interface PanelState {
  minimized: boolean
  maximized: boolean
  closed: boolean
}
