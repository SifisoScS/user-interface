import type { LucideIcon } from 'lucide-react'
import { PanelControls } from './PanelControls'

interface Props {
  icon: LucideIcon
  label: string
  minimized: boolean
  maximized: boolean
  onMinimize: () => void
  onMaximize: () => void
  onClose: () => void
}

export function PanelTitleBar({ icon: Icon, label, minimized, maximized, onMinimize, onMaximize, onClose }: Props) {
  return (
    <div
      className="panel-drag-handle flex items-center gap-2 px-3 py-2 border-b
                 cursor-grab active:cursor-grabbing select-none shrink-0"
      style={{ borderColor: '#1E293B' }}
      onDoubleClick={onMaximize}
    >
      <div
        className="flex items-center justify-center w-5 h-5 rounded"
        style={{ color: '#3B82F6' }}
      >
        <Icon size={13} />
      </div>
      <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: '#64748B' }}>
        {label}
      </span>
      <PanelControls
        minimized={minimized}
        maximized={maximized}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onClose={onClose}
      />
    </div>
  )
}
