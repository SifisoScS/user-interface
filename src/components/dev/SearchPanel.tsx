import { useState } from 'react'
import { Search } from 'lucide-react'

interface SearchResult {
  file: string
  line: number
  preview: string
  matchStart: number
  matchEnd: number
}

const SEARCH_INDEX: Record<string, SearchResult[]> = {
  useMode: [
    { file: 'src/hooks/useMode.ts',           line: 3,  preview: "export function useMode() {",                  matchStart: 16, matchEnd: 23 },
    { file: 'src/pages/Index.tsx',            line: 8,  preview: "  const { mode } = useMode()",                matchStart: 20, matchEnd: 27 },
    { file: 'src/components/layout/Header.tsx', line: 5, preview: 'import { ModeSwitcher } from',              matchStart: 0,  matchEnd: 0  },
  ],
  PanelWrapper: [
    { file: 'src/components/panels/PanelWrapper.tsx', line: 1, preview: 'export function PanelWrapper(', matchStart: 16, matchEnd: 28 },
    { file: 'src/components/widgets/dev/Terminal.tsx', line: 4, preview: "import { PanelWrapper } from", matchStart: 9, matchEnd: 21 },
  ],
  useState: [
    { file: 'src/components/widgets/dev/Terminal.tsx',   line: 1, preview: "import { useState, useRef, useEffect", matchStart: 9, matchEnd: 17 },
    { file: 'src/components/widgets/office/Calendar.tsx', line: 1, preview: "import { useState } from 'react'",    matchStart: 9, matchEnd: 17 },
    { file: 'src/components/widgets/dev/CodeEditor.tsx',  line: 1, preview: "import { useState, useCallback } from", matchStart: 9, matchEnd: 17 },
  ],
}

export function SearchPanel() {
  const [query, setQuery] = useState('')
  const results = query.length >= 2 ? (SEARCH_INDEX[query] ?? []) : []

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      {/* Search input */}
      <div className="p-2 shrink-0">
        <div
          className="flex items-center gap-2 px-2 py-1.5 rounded-lg"
          style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B' }}
        >
          <Search size={12} style={{ color: '#475569' }} />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search in project…"
            className="flex-1 bg-transparent outline-none text-xs"
            style={{ color: '#E2E8F0', caretColor: '#22C55E' }}
          />
          {query && (
            <span style={{ color: '#475569', fontSize: '10px' }}>{results.length} results</span>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-auto px-2 pb-2">
        {query.length < 2 && (
          <p className="text-center mt-8" style={{ color: '#334155', fontSize: '11px' }}>
            Type at least 2 characters to search
          </p>
        )}
        {query.length >= 2 && results.length === 0 && (
          <p className="text-center mt-8" style={{ color: '#334155', fontSize: '11px' }}>
            No results for "{query}"
          </p>
        )}
        {results.map((r, i) => (
          <div
            key={i}
            className="rounded-lg px-2 py-1.5 mb-1 hover:bg-white/5 cursor-pointer"
            style={{ fontSize: '11px' }}
          >
            <div style={{ color: '#22C55E' }} className="truncate">{r.file}:{r.line}</div>
            <div style={{ color: '#64748B' }} className="truncate mt-0.5">{r.preview}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
