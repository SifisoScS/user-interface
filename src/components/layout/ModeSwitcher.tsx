import { motion } from 'framer-motion'
import { Terminal, Briefcase, Home } from 'lucide-react'
import { useModeContext } from '../../context/ModeContext'
import type { LucideIcon } from 'lucide-react'
import type { Mode } from '../../types'

const MODES: { id: Mode; label: string; icon: LucideIcon; color: string }[] = [
  { id: 'dev',    label: 'Dev',    icon: Terminal,  color: '#22C55E' },
  { id: 'office', label: 'Office', icon: Briefcase, color: '#3B82F6' },
  { id: 'home',   label: 'Home',   icon: Home,      color: '#A78BFA' },
]

export function ModeSwitcher() {
  const { mode, setMode } = useModeContext()

  return (
    <div className="flex items-center gap-0.5 bg-surface rounded-full p-1 border border-border">
      {MODES.map(m => (
        <button
          key={m.id}
          onClick={() => setMode(m.id)}
          className="relative px-4 py-1.5 text-sm font-medium rounded-full z-10
                     transition-colors duration-150 focus:outline-none"
          style={{ color: mode === m.id ? '#ffffff' : '#64748B' }}
        >
          {mode === m.id && (
            <motion.span
              layoutId="mode-pill"
              className="absolute inset-0 rounded-full -z-10"
              style={{ backgroundColor: m.color }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            />
          )}
          <span className="relative flex items-center gap-1.5">
            <m.icon size={13} />
            {m.label}
          </span>
        </button>
      ))}
    </div>
  )
}
