import { GitBranch, ArrowUp, ArrowDown, RefreshCw } from 'lucide-react'
import { PanelWrapper } from '../../panels/PanelWrapper'
import { mockBranch, mockChangedFiles, mockCommits } from '../../../data'
import type { GitFileStatus } from '../../../types'

const statusColors: Record<GitFileStatus, { bg: string; text: string; label: string }> = {
  M: { bg: 'rgba(245,158,11,0.15)', text: '#F59E0B', label: 'M' },
  A: { bg: 'rgba(16,185,129,0.15)', text: '#10B981', label: 'A' },
  D: { bg: 'rgba(239,68,68,0.15)',  text: '#EF4444', label: 'D' },
  R: { bg: 'rgba(139,92,246,0.15)', text: '#8B5CF6', label: 'R' },
  '?': { bg: 'rgba(100,116,139,0.15)', text: '#64748B', label: '?' },
}

export function GitStatus() {
  return (
    <PanelWrapper id="git-status" label="Git Status" icon={GitBranch}>
      <div className="h-full flex flex-col gap-0 overflow-auto p-3 space-y-3 text-xs">
        {/* Branch info */}
        <div
          className="flex items-center justify-between p-2.5 rounded-xl"
          style={{ backgroundColor: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}
        >
          <div className="flex items-center gap-2">
            <GitBranch size={13} style={{ color: '#3B82F6' }} />
            <span className="font-mono font-medium" style={{ color: '#E2E8F0' }}>
              {mockBranch.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {mockBranch.ahead > 0 && (
              <span className="flex items-center gap-1" style={{ color: '#10B981' }}>
                <ArrowUp size={11} /> {mockBranch.ahead}
              </span>
            )}
            {mockBranch.behind > 0 && (
              <span className="flex items-center gap-1" style={{ color: '#EF4444' }}>
                <ArrowDown size={11} /> {mockBranch.behind}
              </span>
            )}
            <button
              className="flex items-center justify-center w-6 h-6 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: '#64748B' }}
              title="Fetch"
            >
              <RefreshCw size={11} />
            </button>
          </div>
        </div>

        {/* Changed files */}
        <div>
          <p className="text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: '#64748B' }}>
            Changes ({mockChangedFiles.length})
          </p>
          <div className="space-y-0.5">
            {mockChangedFiles.map((file, i) => {
              const s = statusColors[file.status]
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 px-2 py-1 rounded-lg"
                  style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                >
                  <span
                    className="text-xs font-bold rounded px-1"
                    style={{ backgroundColor: s.bg, color: s.text }}
                  >
                    {s.label}
                  </span>
                  <span className="font-mono truncate" style={{ color: '#94A3B8' }}>
                    {file.path}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Commit log */}
        <div>
          <p className="text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: '#64748B' }}>
            Recent Commits
          </p>
          <div className="space-y-1">
            {mockCommits.map((commit, i) => (
              <div
                key={i}
                className="flex items-start gap-2 px-2 py-1.5 rounded-lg"
                style={{ backgroundColor: i === 0 ? 'rgba(255,255,255,0.03)' : 'transparent' }}
              >
                <span className="font-mono shrink-0 mt-0.5" style={{ color: '#3B82F6', fontSize: '10px' }}>
                  {commit.hash}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="truncate" style={{ color: '#E2E8F0' }}>{commit.message}</p>
                  <p style={{ color: '#64748B', fontSize: '10px' }}>{commit.author} · {commit.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PanelWrapper>
  )
}
