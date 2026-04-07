import { FileText } from 'lucide-react'
import { PanelWrapper } from '../../panels/PanelWrapper'
import { useLocalStorage } from '../../../hooks/useLocalStorage'

export function QuickNotes() {
  const [notes, setNotes] = useLocalStorage<string>('forge-os-notes', '')

  return (
    <PanelWrapper id="quick-notes" label="Quick Notes" icon={FileText}>
      <div className="h-full flex flex-col">
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          className="flex-1 w-full bg-transparent outline-none resize-none p-3
                     text-sm leading-6 font-sans"
          style={{ color: '#E2E8F0' }}
          placeholder="Start typing your notes…"
          spellCheck={false}
        />
        <div
          className="flex items-center justify-between px-3 py-1.5 border-t"
          style={{ borderColor: '#1E293B', color: '#64748B' }}
        >
          <span style={{ fontSize: '10px' }}>
            {notes.length} chars · {notes.split(/\s+/).filter(Boolean).length} words
          </span>
          <span style={{ fontSize: '10px' }}>Shared across modes</span>
        </div>
      </div>
    </PanelWrapper>
  )
}
