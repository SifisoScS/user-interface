import { useState } from 'react'
import { Mic, MicOff, Video, VideoOff, Monitor, PhoneOff, MessageSquare, Calendar, Clock, Users } from 'lucide-react'
import { mockMeetings } from '../../../data'
import type { Meeting, MeetingParticipant } from '../../../data/mockMeetings'

const ACCENT = '#3B82F6'

export function MeetingRoom() {
  const [activeMeeting, setActiveMeeting] = useState<Meeting | null>(
    mockMeetings.find(m => m.status === 'live') ?? null
  )
  const [muted, setMuted]     = useState(false)
  const [camOff, setCamOff]   = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMsg, setChatMsg]  = useState('')
  const [chatLog, setChatLog]  = useState<{ user: string; text: string }[]>([
    { user: 'Sarah Chen', text: 'Can everyone see the screen share?' },
    { user: 'Marcus Webb', text: 'Yes, looks good!' },
  ])

  if (!activeMeeting) {
    return (
      <MeetingList
        meetings={mockMeetings}
        onJoin={m => setActiveMeeting(m)}
      />
    )
  }

  const sendChat = () => {
    if (!chatMsg.trim()) return
    setChatLog(l => [...l, { user: 'You', text: chatMsg.trim() }])
    setChatMsg('')
  }

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ backgroundColor: '#05070A' }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-3 border-b shrink-0"
        style={{ borderColor: '#1E293B', backgroundColor: '#0A1525' }}
      >
        <div>
          <div className="font-semibold text-sm" style={{ color: '#E2E8F0' }}>{activeMeeting.title}</div>
          <div className="text-xs flex items-center gap-3 mt-0.5" style={{ color: '#475569' }}>
            <span className="flex items-center gap-1"><Clock size={10} /> {activeMeeting.time}</span>
            <span className="flex items-center gap-1"><Users size={10} /> {activeMeeting.participants.length} participants</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs"
            style={{ backgroundColor: '#22C55E18', color: '#22C55E' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live
          </div>
        </div>
      </div>

      {/* Video grid + chat */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video grid */}
        <div className="flex-1 p-4 overflow-hidden">
          <div
            className="grid h-full gap-3"
            style={{
              gridTemplateColumns: activeMeeting.participants.length <= 2 ? '1fr 1fr' : 'repeat(2, 1fr)',
              gridTemplateRows: activeMeeting.participants.length <= 2 ? '1fr' : 'repeat(2, 1fr)',
            }}
          >
            {activeMeeting.participants.map(p => (
              <ParticipantTile
                key={p.id}
                participant={p}
                isSelf={p.id === 'p1'}
                selfMuted={p.id === 'p1' ? muted : undefined}
                selfCamOff={p.id === 'p1' ? camOff : undefined}
              />
            ))}
          </div>
        </div>

        {/* Chat panel */}
        {chatOpen && (
          <div
            className="flex flex-col border-l overflow-hidden shrink-0"
            style={{ width: '260px', borderColor: '#1E293B', backgroundColor: '#080F1A' }}
          >
            <div className="px-4 py-3 border-b shrink-0" style={{ borderColor: '#1E293B' }}>
              <div className="font-medium text-sm" style={{ color: '#E2E8F0' }}>Meeting Chat</div>
            </div>
            <div className="flex-1 overflow-auto p-3 space-y-3">
              {chatLog.map((m, i) => (
                <div key={i}>
                  <div className="text-xs font-medium" style={{ color: ACCENT }}>{m.user}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>{m.text}</div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t flex gap-2" style={{ borderColor: '#1E293B' }}>
              <input
                value={chatMsg}
                onChange={e => setChatMsg(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendChat()}
                placeholder="Message…"
                className="flex-1 bg-transparent outline-none text-xs px-2 py-1.5 rounded-lg"
                style={{ backgroundColor: '#1E293B', color: '#E2E8F0' }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div
        className="flex items-center justify-center gap-3 py-4 border-t shrink-0"
        style={{ borderColor: '#1E293B', backgroundColor: '#07101E' }}
      >
        <ControlBtn
          active={!muted}
          onClick={() => setMuted(m => !m)}
          icon={muted ? <MicOff size={16} /> : <Mic size={16} />}
          label={muted ? 'Unmute' : 'Mute'}
          danger={muted}
        />
        <ControlBtn
          active={!camOff}
          onClick={() => setCamOff(c => !c)}
          icon={camOff ? <VideoOff size={16} /> : <Video size={16} />}
          label={camOff ? 'Start video' : 'Stop video'}
          danger={camOff}
        />
        <ControlBtn active={false} onClick={() => {}} icon={<Monitor size={16} />} label="Share screen" />
        <ControlBtn
          active={chatOpen}
          onClick={() => setChatOpen(c => !c)}
          icon={<MessageSquare size={16} />}
          label="Chat"
        />
        <button
          onClick={() => setActiveMeeting(null)}
          className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all"
          style={{ backgroundColor: '#EF4444', color: '#fff' }}
        >
          <PhoneOff size={16} />
          <span style={{ fontSize: '10px' }}>Leave</span>
        </button>
      </div>
    </div>
  )
}

function ParticipantTile({
  participant,
  isSelf,
  selfMuted,
  selfCamOff,
}: {
  participant: MeetingParticipant
  isSelf: boolean
  selfMuted?: boolean
  selfCamOff?: boolean
}) {
  const isMuted   = isSelf ? (selfMuted   ?? participant.isMuted)   : participant.isMuted
  const isCamOff  = isSelf ? (selfCamOff  ?? participant.cameraOff) : participant.cameraOff
  const isSpeaking = participant.isSpeaking && !isMuted
  const bg = `hsl(${participant.avatarHue}, 60%, 30%)`

  return (
    <div
      className="relative rounded-2xl overflow-hidden flex items-center justify-center"
      style={{
        backgroundColor: '#0F172A',
        border: isSpeaking ? '2px solid #22C55E' : '2px solid #1E293B',
        boxShadow: isSpeaking ? '0 0 16px #22C55E30' : 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Avatar / cam-off state */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl"
        style={{ backgroundColor: bg, color: '#fff', opacity: isCamOff ? 1 : 0.3 }}
      >
        {participant.initials}
      </div>

      {/* Name tag */}
      <div
        className="absolute bottom-2 left-2 right-2 flex items-center justify-between"
      >
        <span
          className="px-2 py-0.5 rounded-lg text-xs font-medium"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: '#E2E8F0' }}
        >
          {participant.name} {isSelf ? '(You)' : ''}
        </span>
        <div className="flex items-center gap-1">
          {isMuted && (
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(239,68,68,0.8)' }}
            >
              <MicOff size={10} color="#fff" />
            </div>
          )}
          {isCamOff && (
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
            >
              <VideoOff size={10} color="#94A3B8" />
            </div>
          )}
        </div>
      </div>

      {/* Speaking indicator */}
      {isSpeaking && (
        <div className="absolute top-2 left-2 flex items-center gap-1">
          {[1,2,3].map(b => (
            <div
              key={b}
              className="w-1 rounded-full"
              style={{
                backgroundColor: '#22C55E',
                height: `${8 + b * 4}px`,
                animation: `bounce ${0.5 + b * 0.1}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ControlBtn({
  icon, label, active, onClick, danger,
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
  danger?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all"
      style={{
        backgroundColor: danger ? '#EF444418' : active ? '#3B82F618' : '#1E293B',
        color: danger ? '#EF4444' : active ? '#3B82F6' : '#64748B',
      }}
    >
      {icon}
      <span style={{ fontSize: '10px' }}>{label}</span>
    </button>
  )
}

function MeetingList({ meetings, onJoin }: { meetings: Meeting[]; onJoin: (m: Meeting) => void }) {
  const STATUS_COLORS: Record<Meeting['status'], string> = {
    live:     '#22C55E',
    upcoming: '#3B82F6',
    ended:    '#475569',
  }

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ backgroundColor: '#0A1525' }}>
      <div className="px-6 pt-6 pb-4 shrink-0">
        <h2 className="text-lg font-semibold" style={{ color: '#E2E8F0' }}>Meetings</h2>
        <p className="text-xs mt-1" style={{ color: '#475569' }}>Join or view upcoming meetings</p>
      </div>
      <div className="flex-1 overflow-auto px-6 pb-6 space-y-3">
        {meetings.map(m => (
          <div
            key={m.id}
            className="p-4 rounded-2xl flex items-center justify-between gap-4"
            style={{ backgroundColor: '#0F172A', border: '1px solid #1E293B' }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: STATUS_COLORS[m.status] }}
                />
                <span className="font-medium text-sm" style={{ color: '#E2E8F0' }}>{m.title}</span>
              </div>
              <div className="flex items-center gap-3 text-xs" style={{ color: '#475569' }}>
                <span className="flex items-center gap-1"><Clock size={10} /> {m.time}</span>
                <span className="flex items-center gap-1"><Users size={10} /> {m.participants.length} people</span>
                <span className="flex items-center gap-1"><Calendar size={10} /> {m.duration}</span>
              </div>
            </div>
            <button
              onClick={() => onJoin(m)}
              disabled={m.status === 'ended'}
              className="px-4 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0"
              style={{
                backgroundColor: m.status === 'live' ? '#22C55E' : m.status === 'upcoming' ? `${ACCENT}18` : '#1E293B',
                color: m.status === 'live' ? '#fff' : m.status === 'upcoming' ? ACCENT : '#334155',
                opacity: m.status === 'ended' ? 0.5 : 1,
              }}
            >
              {m.status === 'live' ? '● Join Now' : m.status === 'upcoming' ? 'Join' : 'Ended'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
