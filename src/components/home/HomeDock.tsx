import type { LucideIcon } from 'lucide-react'
import { Home, DoorOpen, Settings, Bell, Users } from 'lucide-react'

export type HomeTabId = 'home' | 'rooms' | 'automations' | 'activity' | 'family'

interface TabEntry {
  id: HomeTabId
  label: string
  icon: LucideIcon
}

const HOME_TABS: TabEntry[] = [
  { id: 'home',        label: 'Home',        icon: Home },
  { id: 'rooms',       label: 'Rooms',       icon: DoorOpen },
  { id: 'automations', label: 'Automations', icon: Settings },
  { id: 'activity',    label: 'Activity',    icon: Bell },
  { id: 'family',      label: 'Family',      icon: Users },
]

const ACCENT = '#2563EB'

interface Props {
  active: HomeTabId
  onSelect: (id: HomeTabId) => void
}

export function HomeDock({ active, onSelect }: Props) {
  return (
    <div
      className="flex flex-col items-center py-4 gap-1 shrink-0 border-r"
      style={{ width: '56px', backgroundColor: '#0F172A', borderColor: '#334155' }}
    >
      {HOME_TABS.map(tab => {
        const Icon = tab.icon
        const isActive = tab.id === active
        return (
          <div key={tab.id} className="relative group">
            <button
              onClick={() => onSelect(tab.id)}
              title={tab.label}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
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
                className="absolute top-1/2 -translate-y-1/2 w-0.5 rounded-r-full"
                style={{ height: '20px', backgroundColor: ACCENT, left: '-1px' }}
              />
            )}

            {/* Tooltip */}
            <div
              className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded-lg text-xs font-medium pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
              style={{ backgroundColor: '#334155', color: '#E2E8F0', zIndex: 50 }}
            >
              {tab.label}
            </div>
          </div>
        )
      })}
    </div>
  )
}
