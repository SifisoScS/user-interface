import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { SidebarItem } from './SidebarItem'
import { useSidebar } from '../../hooks/useSidebar'
import { usePanelState } from '../../hooks/usePanelState'
import { useMode } from '../../hooks/useMode'
import type { WidgetId } from '../../types'

const EXPANDED = 192
const COLLAPSED = 52

export function Sidebar() {
  const { collapsed, toggleCollapse, getItemsForMode } = useSidebar()
  const { mode } = useMode()
  const { getState, openPanel } = usePanelState()

  const items = getItemsForMode(mode)

  const handleItemClick = (id: WidgetId) => {
    openPanel(id)
  }

  return (
    <motion.aside
      animate={{ width: collapsed ? COLLAPSED : EXPANDED }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="flex flex-col border-r shrink-0 overflow-hidden"
      style={{ backgroundColor: '#0F172A', borderColor: '#1E293B' }}
    >
      {/* Collapse toggle */}
      <button
        onClick={toggleCollapse}
        className="flex items-center justify-center h-11 border-b shrink-0
                   transition-colors hover:bg-white/5 focus:outline-none"
        style={{ borderColor: '#1E293B', color: '#64748B' }}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <motion.div animate={{ rotate: collapsed ? 0 : 180 }} transition={{ duration: 0.2 }}>
          <ChevronRight size={15} />
        </motion.div>
      </button>

      {/* Nav items */}
      <nav className="flex flex-col gap-0.5 p-2 flex-1 overflow-y-auto overflow-x-hidden">
        {items.map(item => (
          <SidebarItem
            key={item.id}
            item={item}
            collapsed={collapsed}
            active={!getState(item.id).closed}
            onClick={handleItemClick}
          />
        ))}
      </nav>
    </motion.aside>
  )
}
