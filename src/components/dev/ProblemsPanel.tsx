import { AlertCircle, AlertTriangle, Info } from 'lucide-react'

interface Problem {
  type: 'error' | 'warning' | 'info'
  file: string
  line: number
  col: number
  message: string
  source: string
}

const PROBLEMS: Problem[] = [
  { type: 'warning', file: 'src/components/layout/PanelGrid.tsx', line: 42,  col: 7,  message: "React Hook useEffect has a missing dependency: 'mode'", source: 'eslint' },
  { type: 'warning', file: 'src/hooks/useLayout.ts',              line: 18,  col: 3,  message: "Prefer 'const' over 'let' for variable 'saved'",           source: 'eslint' },
  { type: 'info',    file: 'src/types/widget.ts',                 line: 5,   col: 1,  message: "Exported type 'WidgetId' is used in 3 files",               source: 'ts'    },
  { type: 'warning', file: 'src/components/widgets/dev/CodeEditor.tsx', line: 88, col: 12, message: "Function exceeds 40 lines, consider extracting", source: 'eslint' },
  { type: 'info',    file: 'vite.config.ts',                      line: 1,   col: 1,  message: 'Config is minimal — aliasing disabled',                   source: 'ts'    },
]

const ICONS = {
  error:   <AlertCircle   size={12} style={{ color: '#EF4444' }} />,
  warning: <AlertTriangle size={12} style={{ color: '#F59E0B' }} />,
  info:    <Info          size={12} style={{ color: '#3B82F6' }} />,
}

const COUNT = {
  error:   PROBLEMS.filter(p => p.type === 'error').length,
  warning: PROBLEMS.filter(p => p.type === 'warning').length,
  info:    PROBLEMS.filter(p => p.type === 'info').length,
}

export function ProblemsPanel() {
  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      {/* Summary bar */}
      <div
        className="flex items-center gap-4 px-3 py-1.5 shrink-0 border-b text-xs"
        style={{ borderColor: '#1E293B', color: '#64748B' }}
      >
        <span className="flex items-center gap-1">
          <AlertCircle size={11} style={{ color: '#EF4444' }} /> {COUNT.error} errors
        </span>
        <span className="flex items-center gap-1">
          <AlertTriangle size={11} style={{ color: '#F59E0B' }} /> {COUNT.warning} warnings
        </span>
        <span className="flex items-center gap-1">
          <Info size={11} style={{ color: '#3B82F6' }} /> {COUNT.info} info
        </span>
      </div>

      {/* Problem list */}
      <div className="flex-1 overflow-auto">
        {PROBLEMS.map((p, i) => (
          <div
            key={i}
            className="flex items-start gap-2 px-3 py-1.5 hover:bg-white/5 cursor-pointer border-b"
            style={{ borderColor: '#1E293B0A', fontSize: '11px' }}
          >
            <div className="mt-0.5 shrink-0">{ICONS[p.type]}</div>
            <div className="flex-1 min-w-0">
              <div style={{ color: '#E2E8F0' }} className="truncate">{p.message}</div>
              <div style={{ color: '#475569' }}>
                {p.file}:{p.line}:{p.col}
                <span
                  className="ml-2 px-1 rounded"
                  style={{ backgroundColor: '#1E293B', color: '#64748B', fontSize: '9px' }}
                >
                  {p.source}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
