import { Play, Square, Globe, Zap, ChevronRight } from 'lucide-react'

type RunStatus = 'stopped' | 'building' | 'running'

interface Props {
  status: RunStatus
  onRun: () => void
  onStop: () => void
  onOpenBrowser: () => void
}

const STATUS_CHIP: Record<RunStatus, { label: string; color: string; bg: string }> = {
  stopped:  { label: 'Stopped',  color: '#64748B', bg: '#1E293B' },
  building: { label: 'Building', color: '#F59E0B', bg: '#F59E0B18' },
  running:  { label: 'Running',  color: '#22C55E', bg: '#22C55E18' },
}

export function RunBar({ status, onRun, onStop, onOpenBrowser }: Props) {
  const chip = STATUS_CHIP[status]

  return (
    <div
      className="flex items-center gap-3 px-3 shrink-0 border-b"
      style={{ height: '36px', backgroundColor: '#0A1628', borderColor: '#1E293B' }}
    >
      {/* Run / Stop */}
      {status === 'running' || status === 'building' ? (
        <button
          onClick={onStop}
          disabled={status === 'building'}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
          style={{
            backgroundColor: '#EF444418',
            color: '#EF4444',
            border: '1px solid #EF444430',
            opacity: status === 'building' ? 0.5 : 1,
          }}
        >
          <Square size={10} />
          Stop
        </button>
      ) : (
        <button
          onClick={onRun}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all hover:brightness-110"
          style={{
            backgroundColor: '#22C55E18',
            color: '#22C55E',
            border: '1px solid #22C55E30',
          }}
        >
          <Play size={10} />
          Run
        </button>
      )}

      {/* Divider */}
      <div className="w-px h-4" style={{ backgroundColor: '#1E293B' }} />

      {/* Project path */}
      <div className="flex items-center gap-1 text-xs" style={{ color: '#475569', fontFamily: "'JetBrains Mono', monospace" }}>
        <Zap size={11} style={{ color: '#22C55E' }} />
        <span style={{ color: '#64748B' }}>forge-os</span>
        <ChevronRight size={11} />
        <span style={{ color: '#94A3B8' }}>src/pages/Index.tsx</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Status chip */}
      <div
        className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium"
        style={{ backgroundColor: chip.bg, color: chip.color }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: chip.color,
            boxShadow: status === 'running' ? `0 0 6px ${chip.color}` : 'none',
            animation: status === 'running' ? 'pulse 2s infinite' : 'none',
          }}
        />
        {chip.label}
      </div>

      {/* Browser button */}
      {status === 'running' && (
        <button
          onClick={onOpenBrowser}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all hover:brightness-110"
          style={{
            backgroundColor: '#3B82F618',
            color: '#3B82F6',
            border: '1px solid #3B82F630',
          }}
        >
          <Globe size={10} />
          localhost:5173
        </button>
      )}
    </div>
  )
}
