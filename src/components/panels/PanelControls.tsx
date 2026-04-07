import { Minus, Square, X, Maximize2 } from 'lucide-react'

interface Props {
  minimized: boolean
  maximized: boolean
  onMinimize: () => void
  onMaximize: () => void
  onClose: () => void
}

export function PanelControls({ minimized, maximized, onMinimize, onMaximize, onClose }: Props) {
  return (
    <div className="flex items-center gap-1 ml-auto shrink-0">
      <button
        onClick={e => { e.stopPropagation(); onMinimize() }}
        title={minimized ? 'Restore' : 'Minimize'}
        className="flex items-center justify-center w-5 h-5 rounded transition-colors
                   hover:bg-white/10 focus:outline-none"
        style={{ color: '#64748B' }}
      >
        <Minus size={11} />
      </button>
      <button
        onClick={e => { e.stopPropagation(); onMaximize() }}
        title={maximized ? 'Restore' : 'Maximize'}
        className="flex items-center justify-center w-5 h-5 rounded transition-colors
                   hover:bg-white/10 focus:outline-none"
        style={{ color: '#64748B' }}
      >
        {maximized ? <Square size={10} /> : <Maximize2 size={10} />}
      </button>
      <button
        onClick={e => { e.stopPropagation(); onClose() }}
        title="Close"
        className="flex items-center justify-center w-5 h-5 rounded transition-colors
                   hover:bg-red-500/20 focus:outline-none"
        style={{ color: '#64748B' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#EF4444')}
        onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}
      >
        <X size={11} />
      </button>
    </div>
  )
}
