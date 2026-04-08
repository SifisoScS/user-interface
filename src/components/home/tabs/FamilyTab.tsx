import { useState } from 'react'
import { Send } from 'lucide-react'
import { mockFamily } from '../../../data/mockFamily'
import { mockActivity } from '../../../data/mockActivity'
import type { FamilyMember, FamilyRole, Presence } from '../../../data/mockFamily'

const ACCENT = '#2563EB'

const PRESENCE_COLOR: Record<Presence, string> = {
  home:   '#14B8A6',
  away:   '#94A3B8',
  school: '#F59E0B',
}

const PRESENCE_LABEL: Record<Presence, string> = {
  home:   'At Home',
  away:   'Away',
  school: 'At School',
}

const ROLE_COLOR: Record<FamilyRole, string> = {
  owner:  '#2563EB',
  family: '#14B8A6',
  child:  '#F59E0B',
  guest:  '#94A3B8',
}

const ROLE_LABEL: Record<FamilyRole, string> = {
  owner:  'Owner',
  family: 'Family',
  child:  'Child',
  guest:  'Guest',
}

export function FamilyTab() {
  const [message, setMessage] = useState('')

  const send = () => {
    if (!message.trim()) return
    setMessage('')
  }

  return (
    <div className="h-full overflow-auto">
      <div className="p-6 space-y-6 max-w-2xl">

        {/* Header */}
        <div>
          <h2 className="text-xl font-bold" style={{ color: '#E2E8F0' }}>Family 👨‍👩‍👧</h2>
          <p className="text-sm mt-1" style={{ color: '#64748B' }}>See who's home and stay connected.</p>
        </div>

        {/* Member cards */}
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
          {mockFamily.map(m => (
            <FamilyMemberCard key={m.id} member={m} />
          ))}
        </div>

        {/* Quick message */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#475569' }}>
            Send a message to the family 💬
          </div>
          <div
            className="rounded-2xl p-4"
            style={{ backgroundColor: '#1E293B', border: '1px solid #334155' }}
          >
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send())}
              placeholder="Hey family, don't forget dinner at 7 🍽️"
              rows={2}
              className="w-full bg-transparent outline-none resize-none text-sm"
              style={{ color: '#CBD5E1' }}
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={send}
                disabled={!message.trim()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
                style={{
                  backgroundColor: message.trim() ? `${ACCENT}20` : '#334155',
                  color:           message.trim() ? ACCENT : '#334155',
                }}
              >
                <Send size={12} />
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Family activity feed */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#475569' }}>
            Family Activity
          </div>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid #334155' }}
          >
            {mockActivity.map((event, i) => (
              <div
                key={event.id}
                className="flex items-start gap-4 px-4 py-3 border-l-4"
                style={{
                  borderLeftColor: event.color,
                  backgroundColor: i % 2 === 0 ? '#1E293B' : '#0F172A',
                  borderBottom: i < mockActivity.length - 1 ? '1px solid #3341550A' : 'none',
                }}
              >
                <span style={{ fontSize: '16px', lineHeight: '1.5' }}>{event.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm" style={{ color: '#CBD5E1' }}>{event.message}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#475569' }}>{event.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

function FamilyMemberCard({ member }: { member: FamilyMember }) {
  const presenceColor = PRESENCE_COLOR[member.presence]
  const roleColor     = ROLE_COLOR[member.role]
  const avatarBg      = `hsl(${member.hue}, 55%, 30%)`

  return (
    <div
      className="flex flex-col items-center gap-3 p-4 rounded-3xl"
      style={{ backgroundColor: '#1E293B', border: '1px solid #334155' }}
    >
      {/* Avatar with presence dot */}
      <div className="relative">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-base"
          style={{ backgroundColor: avatarBg, color: '#fff' }}
        >
          {member.initials}
        </div>
        <div
          className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2"
          style={{ backgroundColor: presenceColor, borderColor: '#1E293B' }}
        />
      </div>

      {/* Name */}
      <div className="text-center">
        <div className="font-semibold text-sm" style={{ color: '#E2E8F0' }}>{member.name}</div>
        <div className="text-xs mt-0.5" style={{ color: presenceColor }}>{PRESENCE_LABEL[member.presence]}</div>
      </div>

      {/* Role badge */}
      <div
        className="px-2.5 py-0.5 rounded-full text-xs font-medium"
        style={{ backgroundColor: `${roleColor}20`, color: roleColor }}
      >
        {ROLE_LABEL[member.role]}
      </div>

      {/* Screen time for kids */}
      {member.timeLimitMinutes !== undefined && (
        <div className="text-xs text-center" style={{ color: '#334155' }}>
          Screen time: {Math.floor(member.timeLimitMinutes / 60)}h / day
        </div>
      )}

      {/* Last seen */}
      <div className="text-xs" style={{ color: '#334155' }}>Last seen: {member.lastSeen}</div>
    </div>
  )
}
