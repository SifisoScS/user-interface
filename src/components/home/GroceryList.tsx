import { useState } from 'react'
import { Plus, X, ShoppingCart } from 'lucide-react'
import { defaultGroceryItems } from '../../data'
import type { GroceryItem, GroceryCategory } from '../../data/mockGrocery'

const ACCENT = '#2563EB'

const CATEGORY_COLORS: Record<GroceryCategory, string> = {
  Produce:   '#22C55E',
  Dairy:     '#3B82F6',
  Pantry:    '#F59E0B',
  Meat:      '#EF4444',
  Frozen:    '#93C5FD',
  Beverages: '#2563EB',
  Household: '#64748B',
}

export function GroceryList() {
  const [items, setItems]   = useState<GroceryItem[]>(defaultGroceryItems)
  const [newItem, setNewItem] = useState('')

  const toggle = (id: string) =>
    setItems(it => it.map(i => i.id === id ? { ...i, checked: !i.checked } : i))

  const remove = (id: string) =>
    setItems(it => it.filter(i => i.id !== id))

  const add = () => {
    const name = newItem.trim()
    if (!name) return
    setItems(it => [...it, { id: `g${Date.now()}`, name, category: 'Pantry', checked: false, qty: '' }])
    setNewItem('')
  }

  const pending  = items.filter(i => !i.checked)
  const checked  = items.filter(i => i.checked)

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 shrink-0">
        <ShoppingCart size={14} style={{ color: ACCENT }} />
        <span className="text-xs font-semibold" style={{ color: '#E2E8F0' }}>
          Grocery List
        </span>
        <span
          className="ml-auto px-1.5 py-0.5 rounded-full text-xs"
          style={{ backgroundColor: `${ACCENT}20`, color: ACCENT }}
        >
          {pending.length} left
        </span>
      </div>

      {/* Add input */}
      <div className="flex gap-2 mb-3 shrink-0">
        <input
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="Add item…"
          className="flex-1 px-2.5 py-1.5 rounded-lg text-xs outline-none"
          style={{ backgroundColor: '#1E293B', color: '#E2E8F0', border: '1px solid #334155' }}
        />
        <button
          onClick={add}
          className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
          style={{ backgroundColor: `${ACCENT}20`, color: ACCENT }}
        >
          <Plus size={14} />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-auto space-y-1 min-h-0">
        {pending.map(item => (
          <GroceryRow key={item.id} item={item} onToggle={toggle} onRemove={remove} />
        ))}
        {checked.length > 0 && (
          <>
            <div className="text-xs pt-2 pb-1" style={{ color: '#334155' }}>
              Checked ({checked.length})
            </div>
            {checked.map(item => (
              <GroceryRow key={item.id} item={item} onToggle={toggle} onRemove={remove} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

function GroceryRow({ item, onToggle, onRemove }: { item: GroceryItem; onToggle: (id: string) => void; onRemove: (id: string) => void }) {
  const catColor = CATEGORY_COLORS[item.category] ?? '#64748B'
  return (
    <div
      className="flex items-center gap-2 px-2 py-1.5 rounded-lg group hover:bg-white/5 transition-colors"
    >
      <button
        onClick={() => onToggle(item.id)}
        className="w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors"
        style={{
          backgroundColor: item.checked ? '#2563EB' : 'transparent',
          border: `1.5px solid ${item.checked ? '#2563EB' : '#334155'}`,
        }}
      >
        {item.checked && <span style={{ color: '#fff', fontSize: '9px', lineHeight: 1 }}>✓</span>}
      </button>
      <span
        className="flex-1 text-xs truncate"
        style={{
          color: item.checked ? '#334155' : '#CBD5E1',
          textDecoration: item.checked ? 'line-through' : 'none',
        }}
      >
        {item.name}
        {item.qty && <span style={{ color: '#475569', marginLeft: '4px' }}>({item.qty})</span>}
      </span>
      <div
        className="px-1.5 py-0.5 rounded text-xs shrink-0"
        style={{ backgroundColor: `${catColor}20`, color: catColor, fontSize: '9px' }}
      >
        {item.category}
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="opacity-0 group-hover:opacity-100 w-4 h-4 flex items-center justify-center rounded transition-all"
        style={{ color: '#475569' }}
      >
        <X size={10} />
      </button>
    </div>
  )
}
