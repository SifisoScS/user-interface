import { Settings, Cpu } from 'lucide-react'
import { ModeSwitcher } from './ModeSwitcher'

export function Header() {
  return (
    <header
      className="flex items-center justify-between px-5 h-14 border-b shrink-0"
      style={{ backgroundColor: '#0F172A', borderColor: '#1E293B' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div
          className="flex items-center justify-center w-7 h-7 rounded-lg"
          style={{ backgroundColor: '#3B82F6' }}
        >
          <Cpu size={15} color="#fff" />
        </div>
        <span className="text-sm font-semibold tracking-wide" style={{ color: '#E2E8F0' }}>
          Forge<span style={{ color: '#3B82F6' }}>OS</span>
        </span>
      </div>

      {/* Mode switcher */}
      <ModeSwitcher />

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <button
          className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors
                     hover:bg-border/40"
          style={{ color: '#64748B' }}
          title="Settings"
        >
          <Settings size={16} />
        </button>
      </div>
    </header>
  )
}
