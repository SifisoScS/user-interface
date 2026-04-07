import { useState, useRef, useEffect } from 'react'
import { MessageSquare, Send, Hash } from 'lucide-react'
import { PanelWrapper } from '../../panels/PanelWrapper'
import { mockChannels, mockMessages } from '../../../data'
import type { ChatMessage } from '../../../types'

export function TeamChat() {
  const [activeChannel, setActiveChannel] = useState('general')
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages)
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const channelMessages = messages.filter(m => m.channelId === activeChannel)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [channelMessages.length, activeChannel])

  const sendMessage = () => {
    if (!input.trim()) return
    const msg: ChatMessage = {
      id: Date.now().toString(),
      channelId: activeChannel,
      author: 'You',
      avatar: 'ME',
      content: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    }
    setMessages(prev => [...prev, msg])
    setInput('')
  }

  return (
    <PanelWrapper id="team-chat" label="Team Chat" icon={MessageSquare}>
      <div className="h-full flex overflow-hidden text-xs">
        {/* Channels sidebar */}
        <div
          className="flex flex-col border-r w-28 shrink-0"
          style={{ borderColor: '#1E293B', backgroundColor: '#080E1A' }}
        >
          <p
            className="px-3 py-2 font-semibold uppercase tracking-wide border-b"
            style={{ color: '#64748B', borderColor: '#1E293B', fontSize: '10px' }}
          >
            Channels
          </p>
          {mockChannels.map(ch => (
            <button
              key={ch.id}
              onClick={() => setActiveChannel(ch.id)}
              className="flex items-center justify-between gap-1 px-2.5 py-1.5 transition-colors
                         text-left hover:bg-white/5 w-full"
              style={{
                backgroundColor: ch.id === activeChannel ? 'rgba(59,130,246,0.1)' : 'transparent',
                color: ch.id === activeChannel ? '#E2E8F0' : '#64748B',
              }}
            >
              <span className="flex items-center gap-1 truncate">
                <Hash size={11} />
                {ch.name}
              </span>
              {ch.unread > 0 && (
                <span
                  className="rounded-full px-1.5 py-0.5 font-bold shrink-0"
                  style={{ backgroundColor: '#3B82F6', color: '#fff', fontSize: '9px' }}
                >
                  {ch.unread}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Messages area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Channel header */}
          <div
            className="flex items-center gap-1.5 px-3 py-2 border-b shrink-0"
            style={{ borderColor: '#1E293B' }}
          >
            <Hash size={13} style={{ color: '#64748B' }} />
            <span className="font-semibold" style={{ color: '#E2E8F0' }}>{activeChannel}</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-3 space-y-2">
            {channelMessages.map(msg => (
              <div key={msg.id} className={`flex gap-2 ${msg.isOwn ? 'flex-row-reverse' : ''}`}>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    backgroundColor: msg.isOwn ? '#3B82F6' : '#1E293B',
                    color: msg.isOwn ? '#fff' : '#64748B',
                    fontSize: '9px',
                  }}
                >
                  {msg.avatar}
                </div>
                <div className={`flex flex-col gap-0.5 max-w-[75%] ${msg.isOwn ? 'items-end' : ''}`}>
                  <div className="flex items-center gap-2">
                    {!msg.isOwn && <span className="font-semibold" style={{ color: '#94A3B8' }}>{msg.author}</span>}
                    <span style={{ color: '#334155', fontSize: '10px' }}>{msg.time}</span>
                  </div>
                  <div
                    className="px-2.5 py-1.5 rounded-2xl leading-5"
                    style={{
                      backgroundColor: msg.isOwn ? '#3B82F6' : '#1E293B',
                      color: msg.isOwn ? '#fff' : '#E2E8F0',
                      borderRadius: msg.isOwn ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            className="flex items-center gap-2 px-3 py-2 border-t"
            style={{ borderColor: '#1E293B' }}
          >
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder={`Message #${activeChannel}`}
              className="flex-1 bg-transparent outline-none text-xs"
              style={{ color: '#E2E8F0' }}
            />
            <button
              onClick={sendMessage}
              className="flex items-center justify-center w-6 h-6 rounded-lg transition-colors"
              style={{ backgroundColor: '#3B82F6', color: '#fff' }}
            >
              <Send size={11} />
            </button>
          </div>
        </div>
      </div>
    </PanelWrapper>
  )
}
