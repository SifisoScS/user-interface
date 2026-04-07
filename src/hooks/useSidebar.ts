import { useLocalStorage } from './useLocalStorage'
import {
  Terminal, Code2, GitBranch, Zap, CheckSquare, Globe,
  Mail, MessageSquare, Calendar, Kanban, FileText,
  Clock, Cloud, Timer, Activity,
} from 'lucide-react'
import type { WidgetConfig, Mode } from '../types'

const ALL_WIDGETS: WidgetConfig[] = [
  // Dev
  { id: 'terminal',            label: 'Terminal',       icon: Terminal,       modes: ['dev'] },
  { id: 'code-editor',         label: 'Code Editor',    icon: Code2,          modes: ['dev'] },
  { id: 'git-status',          label: 'Git Status',     icon: GitBranch,      modes: ['dev'] },
  { id: 'api-tester',          label: 'API Tester',     icon: Zap,            modes: ['dev'] },
  { id: 'dev-tasks',           label: 'Tasks',          icon: CheckSquare,    modes: ['dev'] },
  { id: 'browser-preview-dev', label: 'Browser',        icon: Globe,          modes: ['dev'] },
  // Office
  { id: 'email-inbox',         label: 'Email',          icon: Mail,           modes: ['office'] },
  { id: 'team-chat',           label: 'Team Chat',      icon: MessageSquare,  modes: ['office'] },
  { id: 'calendar',            label: 'Calendar',       icon: Calendar,       modes: ['office'] },
  { id: 'task-board',          label: 'Task Board',     icon: Kanban,         modes: ['office'] },
  { id: 'quick-notes',         label: 'Notes',          icon: FileText,       modes: ['office', 'home'] },
  // Home
  { id: 'clock',               label: 'Clock',          icon: Clock,          modes: ['home'] },
  { id: 'weather',             label: 'Weather',        icon: Cloud,          modes: ['home'] },
  { id: 'pomodoro',            label: 'Pomodoro',       icon: Timer,          modes: ['home'] },
  { id: 'system-stats',        label: 'System',         icon: Activity,       modes: ['home'] },
  { id: 'browser-preview-home',label: 'Browser',        icon: Globe,          modes: ['home'] },
]

export function useSidebar() {
  const [collapsed, setCollapsed] = useLocalStorage<boolean>('forge-os-sidebar-collapsed', false)

  const toggleCollapse = () => setCollapsed(v => !v)

  const getItemsForMode = (mode: Mode): WidgetConfig[] =>
    ALL_WIDGETS.filter(w => w.modes.includes(mode))

  return { collapsed, toggleCollapse, getItemsForMode, ALL_WIDGETS }
}
