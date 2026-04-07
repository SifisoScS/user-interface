import { useState, useCallback, useRef, useEffect } from 'react'
import { Terminal as TerminalIcon, GitBranch, Zap, AlertTriangle, ChevronDown, ChevronUp, CheckSquare, Search, X, Globe } from 'lucide-react'
import { RunBar } from './RunBar'
import { ResizableSplitter } from './ResizableSplitter'
import { ProblemsPanel } from './ProblemsPanel'
import { SearchPanel } from './SearchPanel'

// Lazy-load existing widgets (strip PanelWrapper; use inner content)
import { Terminal } from '../widgets/dev/Terminal'
import { CodeEditor } from '../widgets/dev/CodeEditor'
import { GitStatus } from '../widgets/dev/GitStatus'
import { ApiTester } from '../widgets/dev/ApiTester'
import { DevTasks } from '../widgets/dev/DevTasks'

type BottomTab = 'terminal' | 'git' | 'api' | 'problems'
type RightTab  = 'tasks' | 'search'
type RunStatus = 'stopped' | 'building' | 'running'

const BOTTOM_TABS: { id: BottomTab; label: string; icon: React.ReactNode }[] = [
  { id: 'terminal', label: 'Terminal', icon: <TerminalIcon size={12} /> },
  { id: 'git',      label: 'Git',      icon: <GitBranch size={12} /> },
  { id: 'api',      label: 'API',      icon: <Zap size={12} /> },
  { id: 'problems', label: 'Problems', icon: <AlertTriangle size={12} /> },
]

const RIGHT_TABS: { id: RightTab; label: string; icon: React.ReactNode }[] = [
  { id: 'tasks',  label: 'Tasks',  icon: <CheckSquare size={12} /> },
  { id: 'search', label: 'Search', icon: <Search size={12} /> },
]

const VITE_OUTPUT = [
  { type: 'output' as const, text: '> forge-os@0.1.0 dev' },
  { type: 'output' as const, text: '> vite' },
  { type: 'output' as const, text: '' },
  { type: 'output' as const, text: '  VITE v5.4.21  ready in 312 ms' },
  { type: 'output' as const, text: '' },
  { type: 'output' as const, text: '  ➜  Local:   http://localhost:5173/' },
  { type: 'output' as const, text: '  ➜  Network: http://192.168.1.42:5173/' },
  { type: 'output' as const, text: '  ➜  press h + enter to show help' },
]

export function DevWorkspace() {
  // Pane sizes
  const [leftWidth, setLeftWidth]     = useState(190)
  const [rightWidth, setRightWidth]   = useState(230)
  const [bottomHeight, setBottomHeight] = useState(200)
  const [bottomOpen, setBottomOpen]   = useState(true)
  const [rightOpen, setRightOpen]     = useState(true)

  // Bottom / right tabs
  const [bottomTab, setBottomTab] = useState<BottomTab>('terminal')
  const [rightTab, setRightTab]   = useState<RightTab>('tasks')

  // Run state
  const [runStatus, setRunStatus]   = useState<RunStatus>('stopped')
  const [browserOpen, setBrowserOpen] = useState(false)
  const terminalRef = useRef<{ appendLines?: (lines: { type: string; text: string }[]) => void }>(null)

  const handleRun = useCallback(() => {
    setRunStatus('building')
    setBottomTab('terminal')
    setBottomOpen(true)
    setTimeout(() => {
      setRunStatus('running')
      // The terminal will auto-display via its own mechanism; we trigger via a custom event
      window.dispatchEvent(new CustomEvent('forge-run-dev', { detail: VITE_OUTPUT }))
      setTimeout(() => setBrowserOpen(true), 1500)
    }, 900)
  }, [])

  const handleStop = useCallback(() => {
    setRunStatus('stopped')
    setBrowserOpen(false)
  }, [])

  // Splitter drag handlers
  const onLeftDrag  = useCallback((d: number) => setLeftWidth(w  => Math.max(120, Math.min(320, w + d))), [])
  const onRightDrag = useCallback((d: number) => setRightWidth(w => Math.max(120, Math.min(360, w - d))), [])
  const onBottomDrag = useCallback((d: number) => setBottomHeight(h => Math.max(80, Math.min(420, h - d))), [])

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{ backgroundColor: '#05070A', fontFamily: "'JetBrains Mono', monospace" }}
    >
      {/* Run bar */}
      <RunBar
        status={runStatus}
        onRun={handleRun}
        onStop={handleStop}
        onOpenBrowser={() => setBrowserOpen(true)}
      />

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">

        {/* File tree / editor area */}
        <div style={{ width: leftWidth, flexShrink: 0, overflow: 'hidden', borderRight: '1px solid #1E293B' }}>
          <LeftFileTree />
        </div>

        <ResizableSplitter direction="horizontal" onDrag={onLeftDrag} />

        {/* Editor + bottom drawer */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Code editor */}
          <div className="flex-1 overflow-hidden">
            <EditorPane />
          </div>

          {/* Bottom drawer splitter */}
          {bottomOpen && (
            <>
              <ResizableSplitter direction="vertical" onDrag={onBottomDrag} />
              <div style={{ height: bottomHeight, flexShrink: 0, overflow: 'hidden', borderTop: '1px solid #1E293B' }}>
                <BottomDrawer
                  activeTab={bottomTab}
                  onTabChange={setBottomTab}
                  onClose={() => setBottomOpen(false)}
                />
              </div>
            </>
          )}

          {/* Collapsed bottom bar */}
          {!bottomOpen && (
            <div
              className="flex items-center gap-3 px-3 border-t shrink-0 cursor-pointer hover:bg-white/5 transition-colors"
              style={{ height: '28px', borderColor: '#1E293B' }}
              onClick={() => setBottomOpen(true)}
            >
              <ChevronUp size={12} style={{ color: '#475569' }} />
              <span style={{ color: '#475569', fontSize: '11px' }}>Terminal / Git / API / Problems</span>
            </div>
          )}
        </div>

        {/* Right panel splitter */}
        {rightOpen && (
          <>
            <ResizableSplitter direction="horizontal" onDrag={onRightDrag} />
            <div style={{ width: rightWidth, flexShrink: 0, overflow: 'hidden', borderLeft: '1px solid #1E293B' }}>
              <RightPanel
                activeTab={rightTab}
                onTabChange={setRightTab}
                onClose={() => setRightOpen(false)}
              />
            </div>
          </>
        )}

        {/* Collapsed right panel button */}
        {!rightOpen && (
          <div
            className="flex flex-col items-center justify-center gap-2 border-l cursor-pointer hover:bg-white/5 transition-colors"
            style={{ width: '24px', borderColor: '#1E293B' }}
            onClick={() => setRightOpen(true)}
          >
            <CheckSquare size={11} style={{ color: '#475569' }} />
          </div>
        )}
      </div>

      {/* Browser overlay */}
      {browserOpen && (
        <BrowserOverlay onClose={() => setBrowserOpen(false)} />
      )}
    </div>
  )
}

// ── Left file tree (thin wrapper, CodeEditor already has tree built in) ───────

function LeftFileTree() {
  return (
    <div className="h-full overflow-auto" style={{ backgroundColor: '#0A1628' }}>
      <div
        className="px-3 py-2 text-xs font-semibold uppercase tracking-wider border-b"
        style={{ color: '#334155', borderColor: '#1E293B' }}
      >
        Explorer
      </div>
      <FileTreeMini />
    </div>
  )
}

const TREE = [
  { name: 'src/', depth: 0, isFolder: true },
  { name: 'components/', depth: 1, isFolder: true },
  { name: 'dev/', depth: 2, isFolder: true },
  { name: 'DevWorkspace.tsx', depth: 3, isFolder: false },
  { name: 'RunBar.tsx', depth: 3, isFolder: false },
  { name: 'office/', depth: 2, isFolder: true },
  { name: 'home/', depth: 2, isFolder: true },
  { name: 'widgets/', depth: 2, isFolder: true },
  { name: 'layout/', depth: 2, isFolder: true },
  { name: 'panels/', depth: 2, isFolder: true },
  { name: 'pages/', depth: 1, isFolder: true },
  { name: 'Index.tsx', depth: 2, isFolder: false, active: true },
  { name: 'hooks/', depth: 1, isFolder: true },
  { name: 'data/', depth: 1, isFolder: true },
  { name: 'types/', depth: 1, isFolder: true },
  { name: 'index.css', depth: 1, isFolder: false },
  { name: 'main.tsx', depth: 1, isFolder: false },
  { name: 'package.json', depth: 0, isFolder: false },
  { name: 'vite.config.ts', depth: 0, isFolder: false },
]

function FileTreeMini() {
  const [active, setActive] = useState('Index.tsx')
  return (
    <div className="py-1">
      {TREE.map((item, i) => (
        <div
          key={i}
          onClick={() => !item.isFolder && setActive(item.name)}
          className="flex items-center gap-1 py-0.5 px-2 cursor-pointer hover:bg-white/5 transition-colors text-xs"
          style={{
            paddingLeft: `${8 + item.depth * 12}px`,
            color: item.name === active ? '#E2E8F0' : item.isFolder ? '#64748B' : '#94A3B8',
            backgroundColor: item.name === active ? '#22C55E12' : 'transparent',
            borderLeft: item.name === active ? '2px solid #22C55E' : '2px solid transparent',
          }}
        >
          {item.isFolder ? '📁' : '📄'} {item.name}
        </div>
      ))}
    </div>
  )
}

// ── Editor pane: embeds CodeEditor widget content ─────────────────────────────

function EditorPane() {
  return (
    <div className="h-full overflow-hidden" style={{ backgroundColor: '#0D1117' }}>
      <CodeEditor />
    </div>
  )
}

// ── Bottom drawer ─────────────────────────────────────────────────────────────

function BottomDrawer({
  activeTab,
  onTabChange,
  onClose,
}: {
  activeTab: BottomTab
  onTabChange: (t: BottomTab) => void
  onClose: () => void
}) {
  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ backgroundColor: '#07101E' }}>
      {/* Tab bar */}
      <div
        className="flex items-center gap-1 px-2 border-b shrink-0"
        style={{ height: '32px', borderColor: '#1E293B' }}
      >
        {BOTTOM_TABS.map(t => (
          <button
            key={t.id}
            onClick={() => onTabChange(t.id)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
            style={{
              backgroundColor: activeTab === t.id ? '#22C55E18' : 'transparent',
              color: activeTab === t.id ? '#22C55E' : '#475569',
              borderBottom: activeTab === t.id ? '1px solid #22C55E' : '1px solid transparent',
            }}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
        <div className="flex-1" />
        <button onClick={onClose} className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/10" style={{ color: '#475569' }}>
          <ChevronDown size={12} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'terminal' && <TerminalPane />}
        {activeTab === 'git'      && <GitPane />}
        {activeTab === 'api'      && <ApiPane />}
        {activeTab === 'problems' && <ProblemsPanel />}
      </div>
    </div>
  )
}

function TerminalPane() {
  return <div className="h-full overflow-hidden"><Terminal /></div>
}
function GitPane() {
  return <div className="h-full overflow-hidden"><GitStatus /></div>
}
function ApiPane() {
  return <div className="h-full overflow-hidden"><ApiTester /></div>
}

// ── Right panel ───────────────────────────────────────────────────────────────

function RightPanel({
  activeTab,
  onTabChange,
  onClose,
}: {
  activeTab: RightTab
  onTabChange: (t: RightTab) => void
  onClose: () => void
}) {
  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ backgroundColor: '#080F1A' }}>
      {/* Tab bar */}
      <div
        className="flex items-center gap-1 px-2 border-b shrink-0"
        style={{ height: '32px', borderColor: '#1E293B' }}
      >
        {RIGHT_TABS.map(t => (
          <button
            key={t.id}
            onClick={() => onTabChange(t.id)}
            className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-all"
            style={{
              backgroundColor: activeTab === t.id ? '#22C55E18' : 'transparent',
              color: activeTab === t.id ? '#22C55E' : '#475569',
            }}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
        <div className="flex-1" />
        <button onClick={onClose} className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/10" style={{ color: '#475569' }}>
          <X size={11} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'tasks'  && <div className="h-full overflow-hidden"><DevTasks /></div>}
        {activeTab === 'search' && <SearchPanel />}
      </div>
    </div>
  )
}

// ── Browser overlay ───────────────────────────────────────────────────────────

function BrowserOverlay({ onClose }: { onClose: () => void }) {
  const [url, setUrl] = useState('http://localhost:5173')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 600)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="absolute inset-3 z-50 flex flex-col rounded-2xl overflow-hidden shadow-2xl"
      style={{ border: '1px solid #1E293B', backgroundColor: '#0F172A' }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-2 px-3 shrink-0 border-b"
        style={{ height: '40px', backgroundColor: '#0A1628', borderColor: '#1E293B' }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <button onClick={onClose} className="w-3 h-3 rounded-full" style={{ backgroundColor: '#EF4444' }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F59E0B' }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#22C55E' }} />
        </div>

        {/* URL bar */}
        <div
          className="flex-1 flex items-center gap-2 px-2 py-1 rounded-lg mx-2"
          style={{ backgroundColor: '#1E293B' }}
        >
          <Globe size={11} style={{ color: '#22C55E' }} />
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            className="flex-1 bg-transparent outline-none text-xs"
            style={{ color: '#94A3B8', fontFamily: "'JetBrains Mono', monospace" }}
          />
        </div>
      </div>

      {/* Page content */}
      <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: '#05070A' }}>
        {!loaded ? (
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: '#22C55E40', borderTopColor: '#22C55E' }}
            />
            <span style={{ color: '#475569', fontSize: '12px', fontFamily: "'JetBrains Mono', monospace" }}>
              Connecting to localhost:5173…
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 p-8 text-center max-w-sm">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: '#22C55E18', border: '1px solid #22C55E30' }}
            >
              <Globe size={24} style={{ color: '#22C55E' }} />
            </div>
            <div>
              <div className="font-semibold text-sm mb-1" style={{ color: '#E2E8F0' }}>Forge OS Dev Server</div>
              <div className="text-xs" style={{ color: '#475569' }}>
                Running at <span style={{ color: '#22C55E', fontFamily: "'JetBrains Mono', monospace" }}>localhost:5173</span>
              </div>
            </div>
            <div
              className="px-3 py-1.5 rounded-lg text-xs"
              style={{ backgroundColor: '#22C55E12', color: '#22C55E', border: '1px solid #22C55E20' }}
            >
              ● Server is live — Hot Module Replacement active
            </div>
            <p className="text-xs" style={{ color: '#334155' }}>
              In a real deployment, your app would render here inside a sandboxed iframe.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
