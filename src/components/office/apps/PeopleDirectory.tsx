import { useState } from 'react'
import { Search, MessageSquare, Phone, Mail } from 'lucide-react'
import { mockTeam } from '../../../data'
import type { TeamMember } from '../../../data/mockTeam'

const ACCENT = '#3B82F6'

const STATUS_COLORS: Record<TeamMember['status'], string> = {
  online:  '#22C55E',
  away:    '#F59E0B',
  busy:    '#EF4444',
  offline: '#475569',
}

const STATUS_LABELS: Record<TeamMember['status'], string> = {
  online:  'Online',
  away:    'Away',
  busy:    'Busy',
  offline: 'Offline',
}

function Avatar({ member, size = 40 }: { member: TeamMember; size?: number }) {
  const bg = `hsl(${member.avatarHue}, 65%, 35%)`
  return (
    <div
      className="rounded-full flex items-center justify-center font-semibold relative shrink-0"
      style={{ width: size, height: size, backgroundColor: bg, fontSize: size * 0.3, color: '#fff' }}
    >
      {member.name.split(' ').map(n => n[0]).join('')}
      <div
        className="absolute rounded-full border-2"
        style={{
          width: 10, height: 10,
          bottom: 0, right: 0,
          backgroundColor: STATUS_COLORS[member.status],
          borderColor: '#0A1525',
        }}
      />
    </div>
  )
}

export function PeopleDirectory() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | TeamMember['status']>('all')

  const filtered = mockTeam.filter(m => {
    const q = query.toLowerCase()
    const matchQ = !q || m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) || m.department.toLowerCase().includes(q)
    const matchF = filter === 'all' || m.status === filter
    return matchQ && matchF
  })

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ backgroundColor: '#0A1525' }}>
      {/* Header */}
      <div className="px-6 pt-6 pb-4 shrink-0">
        <h2 className="text-lg font-semibold mb-4" style={{ color: '#E2E8F0' }}>
          People Directory
          <span className="ml-2 text-sm font-normal" style={{ color: '#475569' }}>
            {mockTeam.filter(m => m.status === 'online').length} online
          </span>
        </h2>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1"
            style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B' }}
          >
            <Search size={14} style={{ color: '#475569' }} />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by name, role, or department…"
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: '#E2E8F0' }}
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1">
            {(['all', 'online', 'away', 'busy', 'offline'] as const).map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
                style={{
                  backgroundColor: filter === s ? `${ACCENT}20` : 'transparent',
                  color: filter === s ? ACCENT : '#475569',
                  border: `1px solid ${filter === s ? ACCENT + '40' : '#1E293B'}`,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto px-6 pb-6">
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
          {filtered.map(m => (
            <MemberCard key={m.id} member={m} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center mt-20" style={{ color: '#334155' }}>No team members match your search.</div>
        )}
      </div>
    </div>
  )
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div
      className="flex flex-col gap-3 p-4 rounded-2xl transition-all hover:scale-[1.01]"
      style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B' }}
    >
      <div className="flex items-center gap-3">
        <Avatar member={member} size={44} />
        <div className="min-w-0">
          <div className="font-semibold text-sm truncate" style={{ color: '#E2E8F0' }}>{member.name}</div>
          <div className="text-xs truncate" style={{ color: '#64748B' }}>{member.role}</div>
          <div className="flex items-center gap-1 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: STATUS_COLORS[member.status] }} />
            <span style={{ color: STATUS_COLORS[member.status], fontSize: '10px' }}>{STATUS_LABELS[member.status]}</span>
            <span style={{ color: '#334155', fontSize: '10px' }}>· {member.department}</span>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-xs" style={{ color: '#475569' }}>
          <Mail size={11} /> <span className="truncate">{member.email}</span>
        </div>
        <div className="flex items-center gap-2 text-xs" style={{ color: '#475569' }}>
          <Phone size={11} /> <span>{member.phone}</span>
        </div>
      </div>

      <button
        className="flex items-center justify-center gap-2 py-1.5 rounded-xl text-xs font-medium transition-colors w-full"
        style={{ backgroundColor: `${ACCENT}18`, color: ACCENT, border: `1px solid ${ACCENT}30` }}
      >
        <MessageSquare size={12} /> Message
      </button>
    </div>
  )
}
