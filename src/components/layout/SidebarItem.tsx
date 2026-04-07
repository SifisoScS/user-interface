import { motion, AnimatePresence } from 'framer-motion'
import type { WidgetConfig, WidgetId } from '../../types'

interface Props {
  item: WidgetConfig
  collapsed: boolean
  active: boolean
  onClick: (id: WidgetId) => void
}

export function SidebarItem({ item, collapsed, active, onClick }: Props) {
  return (
    <button
      onClick={() => onClick(item.id)}
      title={collapsed ? item.label : undefined}
      className="flex items-center gap-2.5 px-2 py-2 rounded-xl w-full text-left
                 transition-all duration-150 group focus:outline-none"
      style={{
        backgroundColor: active ? 'rgba(59,130,246,0.15)' : 'transparent',
        color: active ? '#3B82F6' : '#64748B',
      }}
      onMouseEnter={e => {
        if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.04)'
        if (!active) (e.currentTarget as HTMLElement).style.color = '#E2E8F0'
      }}
      onMouseLeave={e => {
        if (!active) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
        if (!active) (e.currentTarget as HTMLElement).style.color = '#64748B'
      }}
    >
      <item.icon size={17} className="shrink-0" />
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.15 }}
            className="text-sm font-medium whitespace-nowrap overflow-hidden"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
