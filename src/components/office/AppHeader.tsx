import { Bell, Search, User, ChevronDown } from 'lucide-react'
import type { AppId } from './AppDock'
import { APPS } from './AppDock'

const ACCENT = '#3B82F6'

interface Props {
  activeApp: AppId
}

export function AppHeader({ activeApp }: Props) {
  const app = APPS.find(a => a.id === activeApp)!
  const Icon = app.icon

  return (
    <header
      className="flex items-center justify-between px-5 shrink-0 border-b"
      style={{ height: '52px', backgroundColor: '#07101E', borderColor: '#1E293B' }}
    >
      {/* App title */}
      <div className="flex items-center gap-2.5">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${ACCENT}20`, color: ACCENT }}
        >
          <Icon size={14} />
        </div>
        <span className="font-semibold text-sm" style={{ color: '#E2E8F0' }}>{app.label}</span>
      </div>

      {/* Search */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
        style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', width: '240px' }}
      >
        <Search size={13} style={{ color: '#475569' }} />
        <span className="text-sm" style={{ color: '#334155' }}>Search {app.label.toLowerCase()}…</span>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <button
          className="relative w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-white/5"
          style={{ color: '#64748B' }}
        >
          <Bell size={16} />
          <div
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ backgroundColor: '#EF4444' }}
          />
        </button>
        <button
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-colors hover:bg-white/5"
          style={{ color: '#94A3B8' }}
        >
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center font-semibold text-xs"
            style={{ backgroundColor: `hsl(210, 65%, 35%)`, color: '#fff' }}
          >
            ME
          </div>
          <span className="text-xs font-medium">You</span>
          <ChevronDown size={12} style={{ color: '#475569' }} />
        </button>
      </div>
    </header>
  )
}
