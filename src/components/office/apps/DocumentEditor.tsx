import { useState } from 'react'
import { Bold, Italic, Underline, AlignLeft, Type } from 'lucide-react'
import { mockDocuments } from '../../../data'
import type { Document } from '../../../data/mockDocuments'

const ACCENT = '#3B82F6'

export function DocumentEditor() {
  const [docs, setDocs]     = useState<Document[]>(mockDocuments)
  const [activeId, setActiveId] = useState(docs[0].id)
  const activeDoc = docs.find(d => d.id === activeId)!

  const updateContent = (content: string) => {
    setDocs(ds => ds.map(d => d.id === activeId ? { ...d, content } : d))
  }

  return (
    <div className="h-full flex overflow-hidden">
      {/* Document list */}
      <div
        className="flex flex-col overflow-hidden shrink-0 border-r"
        style={{ width: '220px', borderColor: '#1E293B', backgroundColor: '#080F1A' }}
      >
        <div
          className="px-4 py-3 border-b shrink-0"
          style={{ borderColor: '#1E293B' }}
        >
          <div className="font-semibold text-sm" style={{ color: '#E2E8F0' }}>Documents</div>
          <div className="text-xs mt-0.5" style={{ color: '#475569' }}>{docs.length} files</div>
        </div>
        <div className="flex-1 overflow-auto py-2">
          {docs.map(doc => (
            <div
              key={doc.id}
              onClick={() => setActiveId(doc.id)}
              className="flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors"
              style={{
                backgroundColor: doc.id === activeId ? `${ACCENT}12` : 'transparent',
                borderLeft: doc.id === activeId ? `2px solid ${ACCENT}` : '2px solid transparent',
              }}
            >
              <span className="text-lg mt-0.5">{doc.icon}</span>
              <div className="min-w-0">
                <div
                  className="text-xs font-medium truncate"
                  style={{ color: doc.id === activeId ? '#E2E8F0' : '#94A3B8' }}
                >
                  {doc.title}
                </div>
                <div className="text-xs mt-0.5" style={{ color: '#334155' }}>{doc.lastEdited}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: '#0A1525' }}>
        {/* Formatting toolbar */}
        <div
          className="flex items-center gap-1 px-4 py-2 border-b shrink-0"
          style={{ borderColor: '#1E293B' }}
        >
          <ToolbarBtn icon={<Bold size={13} />} title="Bold" />
          <ToolbarBtn icon={<Italic size={13} />} title="Italic" />
          <ToolbarBtn icon={<Underline size={13} />} title="Underline" />
          <div className="w-px h-4 mx-1" style={{ backgroundColor: '#1E293B' }} />
          <ToolbarBtn icon={<Type size={13} />} title="Heading" />
          <ToolbarBtn icon={<AlignLeft size={13} />} title="Align Left" />
          <div className="flex-1" />
          <div className="text-xs" style={{ color: '#334155' }}>
            {activeDoc.title} · {activeDoc.lastEdited}
          </div>
        </div>

        {/* Textarea */}
        <div className="flex-1 overflow-auto p-6">
          <textarea
            value={activeDoc.content}
            onChange={e => updateContent(e.target.value)}
            className="w-full h-full bg-transparent outline-none resize-none text-sm leading-relaxed"
            style={{
              color: '#CBD5E1',
              fontFamily: 'Inter, sans-serif',
              minHeight: '400px',
            }}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  )
}

function ToolbarBtn({ icon, title }: { icon: React.ReactNode; title: string }) {
  const [active, setActive] = useState(false)
  return (
    <button
      title={title}
      onClick={() => setActive(a => !a)}
      className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
      style={{
        backgroundColor: active ? `${ACCENT}20` : 'transparent',
        color: active ? ACCENT : '#475569',
      }}
    >
      {icon}
    </button>
  )
}
