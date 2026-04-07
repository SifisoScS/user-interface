import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { Terminal as TerminalIcon } from 'lucide-react'
import { PanelWrapper } from '../../panels/PanelWrapper'

interface HistoryEntry {
  type: 'input' | 'output' | 'error'
  text: string
}

const MOCK_RESPONSES: Record<string, string> = {
  ls: 'src/  node_modules/  package.json  vite.config.ts  index.html  tsconfig.json',
  pwd: '/home/user/projects/forge-os',
  whoami: 'forge-user',
  'git status': 'On branch feat/forge-os-dashboard\nChanges not staged:\n  modified: src/components/layout/PanelGrid.tsx\n  modified: src/hooks/usePanelState.ts',
  'git log --oneline -5': 'a3f9e2c feat: add panel minimize/maximize/close\n7b1d84a feat: sidebar collapse animation\nc92f3b1 chore: set up react-grid-layout\ne4a87f6 feat: mode switcher animation\n2d15c90 init: scaffold project',
  'npm run dev': '  VITE v5.2.0  ready in 312 ms\n  ➜  Local:   http://localhost:5173/\n  ➜  Network: http://192.168.1.42:5173/',
  clear: '__CLEAR__',
  help: 'Available commands: ls, pwd, whoami, git status, git log --oneline -5, npm run dev, clear, help',
  date: new Date().toLocaleString(),
  node: 'v20.11.0',
  'node -v': 'v20.11.0',
  'npm -v': '10.2.4',
}

const INITIAL: HistoryEntry[] = [
  { type: 'output', text: 'Forge OS Terminal v1.0.0' },
  { type: 'output', text: 'Type "help" for available commands.' },
]

export function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>(INITIAL)
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim()
    if (!trimmed) return

    const newHistory: HistoryEntry[] = [...history, { type: 'input', text: `$ ${trimmed}` }]
    const response = MOCK_RESPONSES[trimmed]

    if (response === '__CLEAR__') {
      setHistory(INITIAL)
    } else if (response) {
      newHistory.push({ type: 'output', text: response })
      setHistory(newHistory)
    } else {
      newHistory.push({ type: 'error', text: `bash: ${trimmed}: command not found` })
      setHistory(newHistory)
    }

    setCmdHistory(prev => [trimmed, ...prev].slice(0, 50))
    setHistoryIdx(-1)
    setInput('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1)
      setHistoryIdx(next)
      setInput(cmdHistory[next] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(historyIdx - 1, -1)
      setHistoryIdx(next)
      setInput(next === -1 ? '' : cmdHistory[next])
    }
  }

  return (
    <PanelWrapper id="terminal" label="Terminal" icon={TerminalIcon}>
      <div
        className="h-full flex flex-col font-mono text-xs"
        style={{ backgroundColor: '#030712', color: '#E2E8F0' }}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex-1 overflow-auto p-3 space-y-0.5">
          {history.map((entry, i) => (
            <div
              key={i}
              style={{
                color: entry.type === 'input' ? '#3B82F6'
                     : entry.type === 'error' ? '#EF4444'
                     : '#94A3B8',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
              }}
            >
              {entry.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div
          className="flex items-center gap-2 px-3 py-2 border-t"
          style={{ borderColor: '#1E293B' }}
        >
          <span style={{ color: '#3B82F6' }}>$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-xs font-mono"
            style={{ color: '#E2E8F0' }}
            placeholder="type a command…"
            autoFocus
            spellCheck={false}
          />
        </div>
      </div>
    </PanelWrapper>
  )
}
