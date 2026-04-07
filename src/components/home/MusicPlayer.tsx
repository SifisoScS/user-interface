import { useState, useEffect, useRef } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react'
import { mockPlaylist } from '../../data'

const ACCENT = '#A78BFA'

export function MusicPlayer() {
  const [trackIdx, setTrackIdx] = useState(0)
  const [playing, setPlaying]   = useState(false)
  const [progress, setProgress] = useState(0)  // seconds
  const [volume, setVolume]     = useState(70)
  const [muted, setMuted]       = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const track = mockPlaylist[trackIdx]

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= track.duration) {
            next(); return 0
          }
          return p + 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [playing, track.duration])

  const prev = () => { setTrackIdx(i => (i - 1 + mockPlaylist.length) % mockPlaylist.length); setProgress(0) }
  const next = () => { setTrackIdx(i => (i + 1) % mockPlaylist.length); setProgress(0) }

  const pct = (progress / track.duration) * 100
  const albumBg = `linear-gradient(135deg, hsl(${track.hue}, 60%, 20%), hsl(${track.hue + 40}, 70%, 15%))`

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <div
      className="flex items-center gap-4 px-5 shrink-0 border-t"
      style={{ height: '60px', backgroundColor: '#07101E', borderColor: '#1E293B' }}
    >
      {/* Album art */}
      <div
        className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs"
        style={{ background: albumBg, color: 'rgba(255,255,255,0.7)' }}
      >
        ♪
      </div>

      {/* Track info */}
      <div className="min-w-0" style={{ width: '140px' }}>
        <div className="text-xs font-medium truncate" style={{ color: '#E2E8F0' }}>{track.title}</div>
        <div className="text-xs truncate" style={{ color: '#475569' }}>{track.artist}</div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button onClick={prev} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors" style={{ color: '#64748B' }}>
          <SkipBack size={14} />
        </button>
        <button
          onClick={() => setPlaying(p => !p)}
          className="w-8 h-8 flex items-center justify-center rounded-full transition-all"
          style={{ backgroundColor: ACCENT, color: '#fff' }}
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <button onClick={next} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors" style={{ color: '#64748B' }}>
          <SkipForward size={14} />
        </button>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 flex-1">
        <span style={{ color: '#475569', fontSize: '10px', width: '28px', textAlign: 'right' }}>{fmt(progress)}</span>
        <div
          className="flex-1 relative rounded-full overflow-hidden cursor-pointer"
          style={{ height: '4px', backgroundColor: '#1E293B' }}
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect()
            const ratio = (e.clientX - rect.left) / rect.width
            setProgress(Math.round(ratio * track.duration))
          }}
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, backgroundColor: ACCENT }}
          />
        </div>
        <span style={{ color: '#475569', fontSize: '10px', width: '28px' }}>{fmt(track.duration)}</span>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2 shrink-0">
        <button onClick={() => setMuted(m => !m)} className="text-muted hover:text-text transition-colors" style={{ color: '#64748B' }}>
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={muted ? 0 : volume}
          onChange={e => { setVolume(Number(e.target.value)); setMuted(false) }}
          className="w-20"
          style={{ accentColor: ACCENT }}
        />
      </div>
    </div>
  )
}
