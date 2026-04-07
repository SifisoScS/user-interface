import { useState } from 'react'
import { Kanban, Plus } from 'lucide-react'
import { PanelWrapper } from '../../panels/PanelWrapper'
import { mockKanbanCards } from '../../../data'
import type { KanbanCard, KanbanStatus, Priority } from '../../../types'

const COLUMNS: { id: KanbanStatus; label: string; color: string }[] = [
  { id: 'todo',        label: 'To Do',       color: '#64748B' },
  { id: 'in-progress', label: 'In Progress',  color: '#F59E0B' },
  { id: 'done',        label: 'Done',         color: '#10B981' },
]

const PRIORITY_COLORS: Record<Priority, string> = {
  high:   '#EF4444',
  medium: '#F59E0B',
  low:    '#64748B',
}

export function TaskBoard() {
  const [cards, setCards] = useState<KanbanCard[]>(mockKanbanCards)
  const [dragging, setDragging] = useState<string | null>(null)

  const moveCard = (id: string, status: KanbanStatus) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, status } : c))
    setDragging(null)
  }

  return (
    <PanelWrapper id="task-board" label="Task Board" icon={Kanban}>
      <div className="h-full flex gap-2 p-3 overflow-x-auto text-xs">
        {COLUMNS.map(col => {
          const colCards = cards.filter(c => c.status === col.id)
          return (
            <div
              key={col.id}
              className="flex flex-col gap-2 min-w-48 flex-1"
              onDragOver={e => e.preventDefault()}
              onDrop={() => dragging && moveCard(dragging, col.id)}
            >
              {/* Column header */}
              <div className="flex items-center justify-between shrink-0 px-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: col.color }} />
                  <span className="font-semibold" style={{ color: '#E2E8F0' }}>{col.label}</span>
                  <span
                    className="px-1.5 py-0.5 rounded-full font-bold"
                    style={{ backgroundColor: '#1E293B', color: '#64748B', fontSize: '10px' }}
                  >
                    {colCards.length}
                  </span>
                </div>
                <button
                  className="w-5 h-5 flex items-center justify-center rounded transition-colors hover:bg-white/10"
                  style={{ color: '#64748B' }}
                >
                  <Plus size={12} />
                </button>
              </div>

              {/* Cards */}
              <div
                className="flex flex-col gap-2 flex-1 rounded-xl p-2 min-h-16 overflow-y-auto"
                style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
              >
                {colCards.map(card => (
                  <div
                    key={card.id}
                    draggable
                    onDragStart={() => setDragging(card.id)}
                    onDragEnd={() => setDragging(null)}
                    className="p-2.5 rounded-xl cursor-grab active:cursor-grabbing
                               transition-all hover:scale-[1.01]"
                    style={{
                      backgroundColor: '#0F172A',
                      border: '1px solid #1E293B',
                      opacity: dragging === card.id ? 0.5 : 1,
                    }}
                  >
                    <p className="font-medium mb-1 leading-4" style={{ color: '#E2E8F0' }}>{card.title}</p>
                    <p className="mb-2 leading-4" style={{ color: '#64748B', fontSize: '10px' }}>{card.description}</p>
                    <div className="flex items-center justify-between">
                      <span
                        className="px-1.5 py-0.5 rounded text-xs"
                        style={{ backgroundColor: `${PRIORITY_COLORS[card.priority]}20`, color: PRIORITY_COLORS[card.priority] }}
                      >
                        {card.priority}
                      </span>
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center font-bold"
                        style={{ backgroundColor: '#1E293B', color: '#64748B', fontSize: '9px' }}
                      >
                        {card.assignee[0]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </PanelWrapper>
  )
}
