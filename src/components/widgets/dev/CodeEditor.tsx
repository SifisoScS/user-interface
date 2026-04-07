import { useState } from 'react'
import { Code2, Plus, X, ChevronRight, ChevronDown, Folder, FolderOpen, FileCode, FileText, File } from 'lucide-react'
import { PanelWrapper } from '../../panels/PanelWrapper'

// ─── Types ───────────────────────────────────────────────────────────────────

interface FileNode {
  id: string
  name: string
  type: 'file' | 'folder'
  language?: string
  children?: FileNode[]
  content?: string
}

interface Tab {
  id: string
  name: string
  language: string
  content: string
  modified: boolean
}

// ─── File tree data ───────────────────────────────────────────────────────────

const FILE_TREE: FileNode[] = [
  {
    id: 'src', name: 'src', type: 'folder', children: [
      {
        id: 'components', name: 'components', type: 'folder', children: [
          {
            id: 'layout', name: 'layout', type: 'folder', children: [
              { id: 'Header', name: 'Header.tsx', type: 'file', language: 'tsx', content: `import { Settings, Cpu } from 'lucide-react'\nimport { ModeSwitcher } from './ModeSwitcher'\n\nexport function Header() {\n  return (\n    <header className="flex items-center justify-between px-5 h-14 border-b">\n      <div className="flex items-center gap-2.5">\n        <Cpu size={15} color="#fff" />\n        <span>ForgeOS</span>\n      </div>\n      <ModeSwitcher />\n      <Settings size={16} />\n    </header>\n  )\n}` },
              { id: 'ModeSwitcher', name: 'ModeSwitcher.tsx', type: 'file', language: 'tsx', content: `import { motion } from 'framer-motion'\nimport { useMode } from '../../hooks/useMode'\nimport type { Mode } from '../../types'\n\nconst MODES: { id: Mode; label: string }[] = [\n  { id: 'dev',    label: 'Dev'    },\n  { id: 'office', label: 'Office' },\n  { id: 'home',   label: 'Home'   },\n]\n\nexport function ModeSwitcher() {\n  const { mode, setMode } = useMode()\n  return (\n    <div className="flex items-center gap-0.5 bg-surface rounded-full p-1">\n      {MODES.map(m => (\n        <button key={m.id} onClick={() => setMode(m.id)}>\n          {mode === m.id && <motion.span layoutId="mode-pill" />}\n          {m.label}\n        </button>\n      ))}\n    </div>\n  )\n}` },
              { id: 'Sidebar', name: 'Sidebar.tsx', type: 'file', language: 'tsx', content: `import { motion } from 'framer-motion'\nimport { ChevronRight } from 'lucide-react'\nimport { useSidebar } from '../../hooks/useSidebar'\n\nexport function Sidebar() {\n  const { collapsed, toggleCollapse, getItemsForMode } = useSidebar()\n  return (\n    <motion.aside animate={{ width: collapsed ? 52 : 192 }}>\n      <button onClick={toggleCollapse}>\n        <ChevronRight size={15} />\n      </button>\n    </motion.aside>\n  )\n}` },
            ],
          },
          {
            id: 'panels', name: 'panels', type: 'folder', children: [
              { id: 'PanelWrapper', name: 'PanelWrapper.tsx', type: 'file', language: 'tsx', content: `import type { ReactNode } from 'react'\nimport type { LucideIcon } from 'lucide-react'\nimport { PanelTitleBar } from './PanelTitleBar'\nimport { usePanelState } from '../../hooks/usePanelState'\nimport type { WidgetId } from '../../types'\n\ninterface Props {\n  id: WidgetId\n  label: string\n  icon: LucideIcon\n  children: ReactNode\n}\n\nexport function PanelWrapper({ id, label, icon, children }: Props) {\n  const { getState, toggleMinimize, toggleMaximize, closePanel } = usePanelState()\n  const state = getState(id)\n  if (state.closed) return null\n  return (\n    <div className="h-full flex flex-col rounded-panel overflow-hidden"\n         style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B' }}>\n      <PanelTitleBar\n        icon={icon} label={label}\n        minimized={state.minimized} maximized={state.maximized}\n        onMinimize={() => toggleMinimize(id)}\n        onMaximize={() => toggleMaximize(id)}\n        onClose={() => closePanel(id)}\n      />\n      {!state.minimized && (\n        <div className="flex-1 overflow-auto select-text min-h-0">{children}</div>\n      )}\n    </div>\n  )\n}` },
            ],
          },
        ],
      },
      {
        id: 'hooks', name: 'hooks', type: 'folder', children: [
          { id: 'useMode', name: 'useMode.ts', type: 'file', language: 'ts', content: `import { useLocalStorage } from './useLocalStorage'\nimport type { Mode } from '../types'\n\nexport function useMode() {\n  const [mode, setMode] = useLocalStorage<Mode>('forge-os-mode', 'dev')\n  return { mode, setMode }\n}` },
          { id: 'useLayout', name: 'useLayout.ts', type: 'file', language: 'ts', content: `import { useCallback } from 'react'\nimport type { Layout } from 'react-grid-layout'\nimport { useLocalStorage } from './useLocalStorage'\nimport { defaultLayouts } from '../data'\nimport type { Mode, LayoutMap } from '../types'\n\nexport function useLayout(mode: Mode) {\n  const [layouts, setLayouts] = useLocalStorage<LayoutMap>('forge-os-layouts', defaultLayouts)\n  const onLayoutChange = useCallback(\n    (newLayout: Layout[]) => setLayouts(prev => ({ ...prev, [mode]: newLayout })),\n    [mode, setLayouts]\n  )\n  return { layout: layouts[mode], onLayoutChange }\n}` },
          { id: 'useLocalStorage', name: 'useLocalStorage.ts', type: 'file', language: 'ts', content: `import { useState, useCallback } from 'react'\n\nexport function useLocalStorage<T>(key: string, initialValue: T) {\n  const [storedValue, setStoredValue] = useState<T>(() => {\n    try {\n      const item = localStorage.getItem(key)\n      return item ? (JSON.parse(item) as T) : initialValue\n    } catch {\n      return initialValue\n    }\n  })\n  const setValue = useCallback(\n    (value: T | ((prev: T) => T)) => {\n      try {\n        setStoredValue(prev => {\n          const next = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value\n          localStorage.setItem(key, JSON.stringify(next))\n          return next\n        })\n      } catch { /* ignore */ }\n    },\n    [key]\n  )\n  return [storedValue, setValue] as const\n}` },
        ],
      },
      {
        id: 'data', name: 'data', type: 'folder', children: [
          { id: 'defaultLayouts', name: 'defaultLayouts.ts', type: 'file', language: 'ts', content: `import type { LayoutMap } from '../types'\n\nexport const defaultLayouts: LayoutMap = {\n  dev: [\n    { i: 'terminal',     x: 0,  y: 0,  w: 12, h: 11 },\n    { i: 'code-editor',  x: 12, y: 0,  w: 12, h: 11 },\n    { i: 'git-status',   x: 0,  y: 11, w: 7,  h: 9  },\n    { i: 'api-tester',   x: 7,  y: 11, w: 10, h: 9  },\n    { i: 'dev-tasks',    x: 17, y: 11, w: 7,  h: 9  },\n  ],\n  office: [\n    { i: 'email-inbox',  x: 0,  y: 0,  w: 8,  h: 13 },\n    { i: 'team-chat',    x: 8,  y: 0,  w: 10, h: 13 },\n    { i: 'calendar',     x: 18, y: 0,  w: 6,  h: 13 },\n    { i: 'task-board',   x: 0,  y: 13, w: 16, h: 12 },\n    { i: 'quick-notes',  x: 16, y: 13, w: 8,  h: 12 },\n  ],\n  home: [\n    { i: 'clock',        x: 0,  y: 0,  w: 8,  h: 9  },\n    { i: 'weather',      x: 8,  y: 0,  w: 8,  h: 9  },\n    { i: 'pomodoro',     x: 16, y: 0,  w: 8,  h: 9  },\n  ],\n}` },
          { id: 'mockGit', name: 'mockGit.ts', type: 'file', language: 'ts', content: `import type { GitBranch, GitFile, GitCommit } from '../types'\n\nexport const mockBranch: GitBranch = {\n  name: 'feat/forge-os-dashboard',\n  upstream: 'origin/feat/forge-os-dashboard',\n  ahead: 3,\n  behind: 0,\n}` },
        ],
      },
      { id: 'App', name: 'App.tsx', type: 'file', language: 'tsx', content: `import { Index } from './pages/Index'\n\nexport default function App() {\n  return <Index />\n}` },
      { id: 'main', name: 'main.tsx', type: 'file', language: 'tsx', content: `import { StrictMode } from 'react'\nimport { createRoot } from 'react-dom/client'\nimport './index.css'\nimport App from './App'\n\ncreateRoot(document.getElementById('root')!).render(\n  <StrictMode>\n    <App />\n  </StrictMode>\n)` },
      { id: 'index_css', name: 'index.css', type: 'file', language: 'css', content: `@import 'react-grid-layout/css/styles.css';\n@import 'react-resizable/css/styles.css';\n\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@layer base {\n  html, body, #root {\n    height: 100%;\n    background-color: #05070A;\n    color: #E2E8F0;\n  }\n}` },
    ],
  },
  { id: 'vite_config', name: 'vite.config.ts', type: 'file', language: 'ts', content: `import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\nexport default defineConfig({\n  plugins: [react()],\n})` },
  { id: 'package_json', name: 'package.json', type: 'file', language: 'json', content: `{\n  "name": "forge-os",\n  "version": "0.1.0",\n  "type": "module",\n  "scripts": {\n    "dev": "vite",\n    "build": "tsc -b && vite build",\n    "preview": "vite preview"\n  }\n}` },
  { id: 'tailwind_config', name: 'tailwind.config.js', type: 'file', language: 'js', content: `export default {\n  content: ['./index.html', './src/**/*.{ts,tsx}'],\n  theme: {\n    extend: {\n      colors: {\n        bg: '#05070A',\n        surface: '#0F172A',\n        border: '#1E293B',\n        accent: '#3B82F6',\n      },\n    },\n  },\n}` },
]

const INITIAL_TABS: Tab[] = [
  {
    id: 'Header',
    name: 'Header.tsx',
    language: 'tsx',
    modified: false,
    content: FILE_TREE[0].children![0].children![0].children![0].content!,
  },
  {
    id: 'useMode',
    name: 'useMode.ts',
    language: 'ts',
    modified: false,
    content: FILE_TREE[0].children![1].children![0].content!,
  },
]

// ─── Language colours ─────────────────────────────────────────────────────────

const LANG_COLORS: Record<string, string> = {
  tsx: '#3B82F6',
  ts:  '#2563EB',
  css: '#EC4899',
  js:  '#F59E0B',
  json:'#10B981',
}

// ─── Simple tokeniser ─────────────────────────────────────────────────────────

const TOKENS: [RegExp, string][] = [
  [/(\/\/[^\n]*)|(\/\*[\s\S]*?\*\/)/g,                    '#64748B'],  // comments
  [/\b(import|export|from|const|let|var|function|return|interface|type|if|else|extends|default|class|new|async|await|void)\b/g, '#C084FC'],
  [/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/g, '#34D399'],
  [/\b(true|false|null|undefined)\b/g,                    '#FB923C'],
  [/\b(\d+(?:\.\d+)?)\b/g,                               '#F472B6'],
  [/(&lt;\/?[\w.]+)/g,                                   '#60A5FA'],  // JSX tags
]

function highlight(code: string): string {
  let s = code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  TOKENS.forEach(([re, color]) => {
    s = s.replace(re, m => `<span style="color:${color}">${m}</span>`)
  })
  return s
}

// ─── File icon ────────────────────────────────────────────────────────────────

function FileIcon({ name }: { name: string }) {
  const ext = name.split('.').pop() ?? ''
  const color = LANG_COLORS[ext] ?? '#64748B'
  if (['tsx','ts','js'].includes(ext)) return <FileCode size={12} style={{ color }} />
  if (ext === 'css') return <FileText size={12} style={{ color }} />
  if (ext === 'json') return <File size={12} style={{ color: '#10B981' }} />
  return <File size={12} style={{ color: '#64748B' }} />
}

// ─── Tree node ───────────────────────────────────────────────────────────────

function TreeNode({
  node,
  depth,
  expanded,
  selected,
  onToggle,
  onSelect,
}: {
  node: FileNode
  depth: number
  expanded: Set<string>
  selected: string | null
  onToggle: (id: string) => void
  onSelect: (node: FileNode) => void
}) {
  const isExpanded = expanded.has(node.id)
  const isSelected = selected === node.id

  return (
    <>
      <button
        onClick={() => node.type === 'folder' ? onToggle(node.id) : onSelect(node)}
        className="flex items-center gap-1 w-full text-left py-[3px] pr-2 rounded transition-colors hover:bg-white/5 focus:outline-none"
        style={{
          paddingLeft: `${depth * 12 + 8}px`,
          backgroundColor: isSelected ? 'rgba(59,130,246,0.15)' : undefined,
          color: isSelected ? '#E2E8F0' : '#94A3B8',
        }}
      >
        {node.type === 'folder' ? (
          <>
            <span className="shrink-0" style={{ color: '#64748B' }}>
              {isExpanded ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
            </span>
            {isExpanded
              ? <FolderOpen size={12} style={{ color: '#F59E0B', flexShrink: 0 }} />
              : <Folder size={12} style={{ color: '#F59E0B', flexShrink: 0 }} />
            }
          </>
        ) : (
          <>
            <span style={{ width: 11, display: 'inline-block', flexShrink: 0 }} />
            <FileIcon name={node.name} />
          </>
        )}
        <span className="truncate text-xs ml-1">{node.name}</span>
      </button>

      {node.type === 'folder' && isExpanded && node.children?.map(child => (
        <TreeNode
          key={child.id}
          node={child}
          depth={depth + 1}
          expanded={expanded}
          selected={selected}
          onToggle={onToggle}
          onSelect={onSelect}
        />
      ))}
    </>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function CodeEditor() {
  const [tabs, setTabs] = useState<Tab[]>(INITIAL_TABS)
  const [activeTab, setActiveTab] = useState(INITIAL_TABS[0].id)
  const [editing, setEditing] = useState(false)
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(['src', 'components', 'layout', 'panels', 'hooks', 'data'])
  )
  const [selectedFile, setSelectedFile] = useState<string | null>('Header')
  const [treeCollapsed, setTreeCollapsed] = useState(false)

  const current = tabs.find(t => t.id === activeTab) ?? tabs[0]

  // ── Tab actions ──

  const updateContent = (content: string) => {
    setTabs(prev => prev.map(t => t.id === activeTab ? { ...t, content, modified: true } : t))
  }

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (tabs.length === 1) return
    const remaining = tabs.filter(t => t.id !== id)
    setTabs(remaining)
    if (activeTab === id) setActiveTab(remaining[remaining.length - 1].id)
  }

  // ── File tree actions ──

  const toggleFolder = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const openFile = (node: FileNode) => {
    if (!node.content) return
    setSelectedFile(node.id)
    const existing = tabs.find(t => t.id === node.id)
    if (existing) {
      setActiveTab(node.id)
    } else {
      const newTab: Tab = {
        id: node.id,
        name: node.name,
        language: node.language ?? 'txt',
        content: node.content,
        modified: false,
      }
      setTabs(prev => [...prev, newTab])
      setActiveTab(node.id)
    }
    setEditing(false)
  }

  const lines = current.content.split('\n')

  return (
    <PanelWrapper id="code-editor" label="Code Editor" icon={Code2}>
      <div className="h-full flex font-mono text-xs" style={{ backgroundColor: '#020817' }}>

        {/* ── File tree ── */}
        {!treeCollapsed && (
          <div
            className="flex flex-col border-r overflow-hidden"
            style={{ width: 170, minWidth: 170, borderColor: '#1E293B', backgroundColor: '#05070A' }}
          >
            <div
              className="flex items-center justify-between px-2 py-1.5 border-b select-none"
              style={{ borderColor: '#1E293B' }}
            >
              <span className="uppercase tracking-widest font-semibold" style={{ color: '#64748B', fontSize: '9px' }}>
                Explorer
              </span>
              <button
                onClick={() => setTreeCollapsed(true)}
                className="hover:text-text transition-colors"
                style={{ color: '#64748B' }}
                title="Collapse"
              >
                <ChevronRight size={11} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-hidden py-1">
              {FILE_TREE.map(node => (
                <TreeNode
                  key={node.id}
                  node={node}
                  depth={0}
                  expanded={expanded}
                  selected={selectedFile}
                  onToggle={toggleFolder}
                  onSelect={openFile}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Editor pane ── */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">

          {/* Tabs */}
          <div
            className="flex items-center border-b overflow-x-auto"
            style={{ borderColor: '#1E293B', backgroundColor: '#0B1120' }}
          >
            {treeCollapsed && (
              <button
                onClick={() => setTreeCollapsed(false)}
                className="px-2 py-2 border-r shrink-0 transition-colors hover:text-text"
                style={{ borderColor: '#1E293B', color: '#64748B' }}
                title="Show explorer"
              >
                <Folder size={12} />
              </button>
            )}
            {tabs.map(tab => (
              <div
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setEditing(false) }}
                className="flex items-center gap-1.5 px-3 py-2 border-r cursor-pointer shrink-0 select-none"
                style={{
                  borderColor: '#1E293B',
                  backgroundColor: tab.id === activeTab ? '#020817' : 'transparent',
                  color: tab.id === activeTab ? '#E2E8F0' : '#64748B',
                  borderTop: tab.id === activeTab ? '1px solid #3B82F6' : '1px solid transparent',
                }}
              >
                <FileIcon name={tab.name} />
                <span style={{ fontSize: '11px' }}>{tab.name}</span>
                {tab.modified && (
                  <span style={{ color: '#F59E0B', fontSize: '8px', lineHeight: 1 }}>●</span>
                )}
                <button
                  onClick={e => closeTab(tab.id, e)}
                  className="ml-0.5 rounded transition-colors hover:text-red-400"
                  style={{ color: 'inherit' }}
                >
                  <X size={9} />
                </button>
              </div>
            ))}
            <button
              className="px-2.5 py-2 shrink-0 transition-colors hover:text-text"
              style={{ color: '#64748B' }}
              title="New file"
            >
              <Plus size={11} />
            </button>
          </div>

          {/* Breadcrumb */}
          <div
            className="flex items-center gap-1 px-3 py-1 border-b text-xs select-none"
            style={{ borderColor: '#1E293B', color: '#475569', fontSize: '10px' }}
          >
            <span style={{ color: '#64748B' }}>forge-os</span>
            <ChevronRight size={10} />
            <span style={{ color: '#64748B' }}>src</span>
            <ChevronRight size={10} />
            <span style={{ color: '#E2E8F0' }}>{current.name}</span>
          </div>

          {/* Code area */}
          <div className="flex flex-1 overflow-hidden">
            {/* Line numbers */}
            <div
              className="flex flex-col text-right px-3 py-3 select-none shrink-0"
              style={{ color: '#2D3F55', minWidth: '42px', lineHeight: '20px', userSelect: 'none' }}
            >
              {lines.map((_, i) => (
                <div key={i} style={{ fontSize: '11px', lineHeight: '20px' }}>{i + 1}</div>
              ))}
            </div>

            {/* Code / textarea */}
            <div className="flex-1 overflow-auto relative border-l" style={{ borderColor: '#1E293B' }}>
              {editing ? (
                <textarea
                  className="absolute inset-0 w-full h-full bg-transparent outline-none resize-none p-3 font-mono"
                  style={{
                    color: '#E2E8F0',
                    caretColor: '#3B82F6',
                    fontSize: '11px',
                    lineHeight: '20px',
                    tabSize: 2,
                  }}
                  value={current.content}
                  onChange={e => updateContent(e.target.value)}
                  onBlur={() => setEditing(false)}
                  autoFocus
                  spellCheck={false}
                />
              ) : (
                <pre
                  className="p-3 cursor-text min-h-full"
                  onClick={() => setEditing(true)}
                  style={{
                    color: '#94A3B8',
                    whiteSpace: 'pre',
                    fontSize: '11px',
                    lineHeight: '20px',
                    overflowWrap: 'normal',
                  }}
                  dangerouslySetInnerHTML={{ __html: highlight(current.content) }}
                />
              )}
            </div>
          </div>

          {/* Status bar */}
          <div
            className="flex items-center justify-between px-3 py-1 border-t select-none"
            style={{ borderColor: '#1E293B', backgroundColor: '#3B82F6', fontSize: '10px', color: '#fff' }}
          >
            <div className="flex items-center gap-3">
              <span>⎇ feat/forge-os-dashboard</span>
              <span>{current.language.toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Ln {lines.length}, Col 1</span>
              <span>{current.content.length} chars</span>
              <span>UTF-8</span>
            </div>
          </div>
        </div>
      </div>
    </PanelWrapper>
  )
}
