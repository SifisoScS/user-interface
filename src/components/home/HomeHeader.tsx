import { Home, DoorOpen, Settings, Bell, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { HomeTabId } from './HomeDock'
import { AlertsBadge } from './HomeAlerts'
import { USER_CONFIG } from '../../config/user'

const ACCENT = '#2563EB'

interface TabMeta {
  label: string
  emoji: string
  icon: LucideIcon
}

const TAB_META: Record<HomeTabId, TabMeta> = {
  home:        { label: 'Home',        emoji: '🏠', icon: Home },
  rooms:       { label: 'Rooms',       emoji: '🚪', icon: DoorOpen },
  automations: { label: 'Automations', emoji: '⚙️', icon: Settings },
  activity:    { label: 'Activity',    emoji: '🔔', icon: Bell },
  family:      { label: 'Family',      emoji: '👨‍👩‍👧', icon: Users },
}

interface Props {
  activeTab: HomeTabId
  alertCount: number
}

export function HomeHeader({ activeTab, alertCount }: Props) {
  const meta = TAB_META[activeTab]
  const Icon = meta.icon

  return (
    <header
      className="flex items-center justify-between px-5 shrink-0 border-b"
      style={{ height: '52px', backgroundColor: '#0F172A', borderColor: '#334155' }}
    >
      {/* Tab title */}
      <div className="flex items-center gap-2.5">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${ACCENT}20`, color: ACCENT }}
        >
          <Icon size={14} />
        </div>
        <span className="font-semibold text-sm" style={{ color: '#E2E8F0' }}>
          {meta.emoji} {meta.label}
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <AlertsBadge count={alertCount} />

        {/* Owner avatar */}
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center font-semibold text-xs"
          style={{ backgroundColor: `hsl(${USER_CONFIG.hue}, 55%, 30%)`, color: '#fff' }}
        >
          {USER_CONFIG.initials}
        </div>
      </div>
    </header>
  )
}
