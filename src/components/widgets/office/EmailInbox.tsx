import { useState } from 'react'
import { Mail, Star, Trash2, Reply, Forward, Archive, Search, RefreshCw, MoreHorizontal } from 'lucide-react'
import { PanelWrapper } from '../../panels/PanelWrapper'
import { mockEmails } from '../../../data'
import type { Email } from '../../../types'

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  urgent:  { bg: 'rgba(239,68,68,0.15)',   text: '#EF4444' },
  design:  { bg: 'rgba(139,92,246,0.15)',  text: '#8B5CF6' },
  devops:  { bg: 'rgba(16,185,129,0.15)',  text: '#10B981' },
  backend: { bg: 'rgba(59,130,246,0.15)',  text: '#3B82F6' },
  github:  { bg: 'rgba(100,116,139,0.15)', text: '#64748B' },
  finance: { bg: 'rgba(245,158,11,0.15)',  text: '#F59E0B' },
  hr:      { bg: 'rgba(236,72,153,0.15)',  text: '#EC4899' },
}

function AvatarCircle({ name, size = 28 }: { name: string; size?: number }) {
  const hue = name.charCodeAt(0) * 17 % 360
  return (
    <div
      className="flex items-center justify-center rounded-full shrink-0 font-bold select-none"
      style={{
        width: size,
        height: size,
        backgroundColor: `hsl(${hue} 60% 25%)`,
        color: `hsl(${hue} 60% 70%)`,
        fontSize: size * 0.4,
      }}
    >
      {name[0]}
    </div>
  )
}

export function EmailInbox() {
  const [emails, setEmails] = useState<Email[]>(mockEmails)
  const [selected, setSelected] = useState<Email>(mockEmails[0])
  const [search, setSearch] = useState('')
  const [activeFolder, setActiveFolder] = useState<'inbox' | 'starred'>('inbox')

  const filtered = emails.filter(e => {
    const matchFolder = activeFolder === 'starred' ? e.starred : true
    const matchSearch = !search || [e.sender, e.subject, e.preview].some(s =>
      s.toLowerCase().includes(search.toLowerCase())
    )
    return matchFolder && matchSearch
  })

  const unreadCount = emails.filter(e => !e.read).length

  const selectEmail = (email: Email) => {
    setSelected(email)
    setEmails(prev => prev.map(e => e.id === email.id ? { ...e, read: true } : e))
  }

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setEmails(prev => prev.map(em => em.id === id ? { ...em, starred: !em.starred } : em))
  }

  const deleteEmail = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const remaining = emails.filter(em => em.id !== id)
    setEmails(remaining)
    if (selected.id === id && remaining.length) setSelected(remaining[0])
  }

  return (
    <PanelWrapper id="email-inbox" label="Email" icon={Mail}>
      <div className="h-full flex overflow-hidden text-xs">

        {/* ── Left: folder nav ─────────────────────────────────────────── */}
        <div
          className="flex flex-col border-r shrink-0"
          style={{ width: 110, borderColor: '#1E293B', backgroundColor: '#05070A' }}
        >
          {/* Compose */}
          <button
            className="mx-2 mt-2 mb-1 py-1.5 rounded-xl text-xs font-semibold transition-colors"
            style={{ backgroundColor: '#3B82F6', color: '#fff' }}
          >
            + Compose
          </button>

          <nav className="flex flex-col gap-0.5 px-1.5 py-1">
            {[
              { id: 'inbox',   label: 'Inbox',   badge: unreadCount },
              { id: 'starred', label: 'Starred',  badge: emails.filter(e=>e.starred).length },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFolder(f.id as typeof activeFolder)}
                className="flex items-center justify-between gap-1.5 px-2.5 py-1.5 rounded-xl w-full text-left transition-colors"
                style={{
                  backgroundColor: activeFolder === f.id ? 'rgba(59,130,246,0.12)' : 'transparent',
                  color: activeFolder === f.id ? '#3B82F6' : '#64748B',
                }}
              >
                <span className="font-medium">{f.label}</span>
                {f.badge > 0 && (
                  <span
                    className="rounded-full px-1.5 font-bold"
                    style={{
                      backgroundColor: activeFolder === f.id ? '#3B82F6' : '#1E293B',
                      color: activeFolder === f.id ? '#fff' : '#64748B',
                      fontSize: '9px',
                    }}
                  >
                    {f.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="mt-1 mx-2 border-t" style={{ borderColor: '#1E293B' }} />

          <nav className="flex flex-col gap-0.5 px-1.5 py-1">
            {['Sent', 'Drafts', 'Archive', 'Spam', 'Trash'].map(f => (
              <button
                key={f}
                className="px-2.5 py-1.5 rounded-xl text-left transition-colors hover:bg-white/5"
                style={{ color: '#64748B' }}
              >
                {f}
              </button>
            ))}
          </nav>
        </div>

        {/* ── Middle: email list ────────────────────────────────────────── */}
        <div
          className="flex flex-col border-r overflow-hidden shrink-0"
          style={{ width: 220, borderColor: '#1E293B' }}
        >
          {/* Search */}
          <div className="flex items-center gap-1.5 px-2 py-2 border-b" style={{ borderColor: '#1E293B' }}>
            <Search size={11} style={{ color: '#64748B', flexShrink: 0 }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search…"
              className="flex-1 bg-transparent outline-none text-xs min-w-0"
              style={{ color: '#E2E8F0' }}
            />
            <button style={{ color: '#64748B' }}>
              <RefreshCw size={11} />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {filtered.length === 0 && (
              <div className="flex items-center justify-center h-full" style={{ color: '#64748B' }}>
                No emails
              </div>
            )}
            {filtered.map(email => (
              <div
                key={email.id}
                onClick={() => selectEmail(email)}
                className="flex flex-col px-2.5 py-2.5 border-b cursor-pointer transition-colors group"
                style={{
                  borderColor: '#0F172A',
                  backgroundColor: selected?.id === email.id
                    ? 'rgba(59,130,246,0.1)'
                    : !email.read
                      ? 'rgba(255,255,255,0.025)'
                      : 'transparent',
                  borderLeft: selected?.id === email.id ? '2px solid #3B82F6' : '2px solid transparent',
                }}
              >
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span
                    className="truncate font-medium"
                    style={{ color: !email.read ? '#E2E8F0' : '#94A3B8', maxWidth: '120px' }}
                  >
                    {email.sender}
                  </span>
                  <span style={{ color: '#475569', fontSize: '10px', flexShrink: 0 }}>{email.time}</span>
                </div>
                <div className="flex items-center gap-1 mb-0.5">
                  {!email.read && (
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#3B82F6' }} />
                  )}
                  <p className="truncate font-medium" style={{ color: !email.read ? '#CBD5E1' : '#64748B' }}>
                    {email.subject}
                  </p>
                </div>
                <p className="truncate" style={{ color: '#475569', fontSize: '10px' }}>{email.preview}</p>
                {/* Row actions on hover */}
                <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={e => toggleStar(email.id, e)}
                    className="transition-colors"
                    style={{ color: email.starred ? '#F59E0B' : '#475569' }}
                  >
                    <Star size={11} fill={email.starred ? '#F59E0B' : 'none'} />
                  </button>
                  <button
                    onClick={e => deleteEmail(email.id, e)}
                    className="ml-auto transition-colors hover:text-red-400"
                    style={{ color: '#475569' }}
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: preview pane ───────────────────────────────────────── */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {selected ? (
            <>
              {/* Toolbar */}
              <div
                className="flex items-center gap-1 px-3 py-2 border-b shrink-0"
                style={{ borderColor: '#1E293B' }}
              >
                <button
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-colors hover:bg-white/10"
                  style={{ color: '#64748B' }}
                  title="Reply"
                >
                  <Reply size={12} /> <span className="hidden xl:inline">Reply</span>
                </button>
                <button
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-colors hover:bg-white/10"
                  style={{ color: '#64748B' }}
                  title="Forward"
                >
                  <Forward size={12} /> <span className="hidden xl:inline">Forward</span>
                </button>
                <button
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-colors hover:bg-white/10"
                  style={{ color: '#64748B' }}
                  title="Archive"
                >
                  <Archive size={12} /> <span className="hidden xl:inline">Archive</span>
                </button>
                <button
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-colors hover:text-red-400"
                  style={{ color: '#64748B' }}
                  title="Delete"
                >
                  <Trash2 size={12} />
                </button>
                <button
                  onClick={e => toggleStar(selected.id, e)}
                  className="ml-auto flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-colors"
                  style={{ color: selected.starred ? '#F59E0B' : '#64748B' }}
                  title={selected.starred ? 'Unstar' : 'Star'}
                >
                  <Star size={12} fill={selected.starred ? '#F59E0B' : 'none'} />
                </button>
                <button
                  className="flex items-center gap-1 px-2 py-1 rounded-lg transition-colors hover:bg-white/10"
                  style={{ color: '#64748B' }}
                >
                  <MoreHorizontal size={12} />
                </button>
              </div>

              {/* Email content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Subject */}
                <h2 className="font-semibold leading-snug" style={{ color: '#E2E8F0', fontSize: '13px' }}>
                  {selected.subject}
                </h2>

                {/* Sender meta */}
                <div className="flex items-start gap-3">
                  <AvatarCircle name={selected.sender} size={32} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold" style={{ color: '#E2E8F0' }}>{selected.sender}</span>
                      <span style={{ color: '#475569', fontSize: '10px', flexShrink: 0 }}>{selected.time}</span>
                    </div>
                    <p style={{ color: '#64748B', fontSize: '10px' }}>
                      &lt;{selected.senderEmail}&gt; → me
                    </p>
                  </div>
                </div>

                {/* Tags */}
                {selected.tags.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap">
                    {selected.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full font-medium capitalize"
                        style={{
                          ...(TAG_COLORS[tag] ?? { bg: '#1E293B', text: '#64748B' }),
                          backgroundColor: TAG_COLORS[tag]?.bg ?? '#1E293B',
                          color: TAG_COLORS[tag]?.text ?? '#64748B',
                          fontSize: '10px',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Divider */}
                <div className="border-t" style={{ borderColor: '#1E293B' }} />

                {/* Body */}
                <pre
                  className="leading-7 whitespace-pre-wrap"
                  style={{ color: '#CBD5E1', fontFamily: 'inherit', fontSize: '12px' }}
                >
                  {selected.body}
                </pre>

                {/* Reply box */}
                <div
                  className="mt-4 rounded-xl border p-3"
                  style={{ borderColor: '#1E293B', backgroundColor: 'rgba(255,255,255,0.02)' }}
                >
                  <textarea
                    rows={3}
                    placeholder={`Reply to ${selected.sender}…`}
                    className="w-full bg-transparent outline-none resize-none text-xs leading-5"
                    style={{ color: '#94A3B8' }}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                      style={{ backgroundColor: '#3B82F6', color: '#fff' }}
                    >
                      <Reply size={11} /> Send Reply
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center" style={{ color: '#334155' }}>
              <div className="text-center space-y-2">
                <Mail size={32} style={{ margin: '0 auto', opacity: 0.3 }} />
                <p className="text-sm">Select an email to read</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </PanelWrapper>
  )
}
