import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { PanelTitleBar } from './PanelTitleBar'
import { usePanelState } from '../../hooks/usePanelState'
import type { WidgetId } from '../../types'

interface Props {
  id: WidgetId
  label: string
  icon: LucideIcon
  children: ReactNode
}

export function PanelWrapper({ id, label, icon, children }: Props) {
  const { getState, toggleMinimize, toggleMaximize, closePanel } = usePanelState()
  const state = getState(id)

  if (state.closed) return null

  const titleBar = (
    <PanelTitleBar
      icon={icon}
      label={label}
      minimized={state.minimized}
      maximized={state.maximized}
      onMinimize={() => toggleMinimize(id)}
      onMaximize={() => toggleMaximize(id)}
      onClose={() => closePanel(id)}
    />
  )

  if (state.maximized) {
    return (
      <div
        className="fixed inset-3 z-50 flex flex-col rounded-panel shadow-2xl overflow-hidden"
        style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B' }}
      >
        {titleBar}
        <div className="flex-1 overflow-auto p-3 select-text" style={{ color: '#E2E8F0' }}>
          {children}
        </div>
      </div>
    )
  }

  return (
    <div
      className="h-full flex flex-col rounded-panel overflow-hidden"
      style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B' }}
    >
      {titleBar}
      {!state.minimized && (
        <div className="flex-1 overflow-auto select-text min-h-0" style={{ color: '#E2E8F0' }}>
          {children}
        </div>
      )}
    </div>
  )
}
