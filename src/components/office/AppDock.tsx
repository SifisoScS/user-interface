import type { LucideIcon } from 'lucide-react'
import { Mail, MessageSquare, Calendar, FileText, Users, Video, CheckSquare, Timer } from 'lucide-react'

export type AppId = 'mail' | 'chat' | 'calendar' | 'documents' | 'people' | 'meetings' | 'tasks' | 'time'

interface AppEntry {
  id: AppId
  label: string
  icon: LucideIcon
  badge?: number
}

export const APPS: AppEntry[] = [
  { id: 'mail',      label: 'Mail',      icon: Mail,          badge: 3 },
  { id: 'chat',      label: 'Chat',      icon: MessageSquare, badge: 5 },
  { id: 'calendar',  label: 'Calendar',  icon: Calendar },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'people',    label: 'People',    icon: Users },
  { id: 'meetings',  label: 'Meetings',  icon: Video,         badge: 1 },
  { id: 'tasks',     label: 'Tasks',     icon: CheckSquare },
  { id: 'time',      label: 'Time',      icon: Timer },
]

const ACCENT = '#3B82F6'

interface Props {
  active: AppId
  onSelect: (id: AppId) => void
}

export function AppDock({ active, onSelect }: Props) {
  return (
    <div
      className="flex flex-col items-center py-4 gap-1 shrink-0 border-r"
      style={{ width: '56px', backgroundColor: '#07101E', borderColor: '#1E293B' }}
    >
      {APPS.map(app => {
        const Icon = app.icon
        const isActive = app.id === active
        return (
          <div key={app.id} className="relative group">
            <button
              onClick={() => onSelect(app.id)}
              title={app.label}
              className="w-10 h-10 flex items-center justify-center rounded-xl transition-all"
              style={{
                backgroundColor: isActive ? `${ACCENT}20` : 'transparent',
                color: isActive ? ACCENT : '#475569',
                border: isActive ? `1px solid ${ACCENT}40` : '1px solid transparent',
              }}
            >
              <Icon size={18} />
            </button>

            {/* Active indicator */}
            {isActive && (
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-r-full"
                style={{ height: '20px', backgroundColor: ACCENT, left: '-1px' }}
              />
            )}

            {/* Badge */}
            {app.badge && app.badge > 0 && (
              <div
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: '#EF4444', fontSize: '9px' }}
              >
                {app.badge}
              </div>
            )}

            {/* Tooltip */}
            <div
              className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded-lg text-xs font-medium pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
              style={{ backgroundColor: '#1E293B', color: '#E2E8F0', zIndex: 50 }}
            >
              {app.label}
            </div>
          </div>
        )
      })}
    </div>
  )
}
