import { useState } from 'react'
import { mockActivity } from '../../../data/mockActivity'
import type { ActivityType } from '../../../data/mockActivity'

type FilterLabel = 'All' | 'Locks' | 'Motion' | 'Arrivals' | 'Appliances'

const FILTERS: FilterLabel[] = ['All', 'Locks', 'Motion', 'Arrivals', 'Appliances']

const FILTER_TYPE: Partial<Record<FilterLabel, ActivityType>> = {
  Locks:      'lock',
  Motion:     'motion',
  Arrivals:   'arrival',
  Appliances: 'appliance',
}

const ACCENT = '#2563EB'

export function ActivityTab() {
  const [filter, setFilter] = useState<FilterLabel>('All')

  const filtered = filter === 'All'
    ? mockActivity
    : mockActivity.filter(e => e.type === FILTER_TYPE[filter])

  return (
    <div className="h-full overflow-auto">
      <div className="p-6 max-w-xl">

        {/* Header */}
        <div className="mb-5">
          <h2 className="text-xl font-bold" style={{ color: '#E2E8F0' }}>Recent Activity 🔔</h2>
          <p className="text-sm mt-1" style={{ color: '#64748B' }}>Everything that's happened at home today.</p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                backgroundColor: filter === f ? `${ACCENT}20` : '#334155',
                color:           filter === f ? ACCENT : '#475569',
                border:          `1px solid ${filter === f ? ACCENT + '50' : 'transparent'}`,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Activity list */}
        <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #334155' }}>
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm" style={{ color: '#334155', backgroundColor: '#1E293B' }}>
              No {filter.toLowerCase()} events recorded.
            </div>
          ) : (
            filtered.map((event, i) => (
              <div
                key={event.id}
                className="flex items-start gap-4 px-4 py-3 border-l-4"
                style={{
                  borderLeftColor: event.color,
                  backgroundColor: i % 2 === 0 ? '#1E293B' : '#0F172A',
                  borderBottom: i < filtered.length - 1 ? '1px solid #3341550A' : 'none',
                }}
              >
                <span style={{ fontSize: '18px', lineHeight: '1.5', marginTop: '1px' }}>{event.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium" style={{ color: '#CBD5E1' }}>{event.message}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#475569' }}>{event.time}</div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}
