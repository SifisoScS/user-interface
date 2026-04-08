import { useEffect, useRef } from 'react'
import { Wifi, WifiOff, AlertCircle } from 'lucide-react'
import type { SecurityCamera as SecurityCameraType } from '../../../data/mockIoT'

interface Props {
  cameras: SecurityCameraType[]
}

export function SecurityCameraPanel({ cameras }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {cameras.map(cam => <CameraFeed key={cam.id} camera={cam} />)}
    </div>
  )
}

function CameraFeed({ camera }: { camera: SecurityCameraType }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!camera.online) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame = 0
    const interval = setInterval(() => {
      frame++
      const w = canvas.width
      const h = canvas.height

      // Dark background
      ctx.fillStyle = '#050A14'
      ctx.fillRect(0, 0, w, h)

      // Scan line
      const scanY = ((frame * 2) % (h + 20)) - 10
      const grad = ctx.createLinearGradient(0, scanY - 6, 0, scanY + 6)
      grad.addColorStop(0, 'transparent')
      grad.addColorStop(0.5, 'rgba(20, 184, 166, 0.15)')
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(0, scanY - 6, w, 12)

      // Grid overlay
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.05)'
      ctx.lineWidth = 0.5
      for (let x = 0; x < w; x += 20) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke()
      }
      for (let y = 0; y < h; y += 20) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
      }

      // Corner brackets
      const bs = 10
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.4)'
      ctx.lineWidth = 1.5
      ;[[4, 4], [w - 4, 4], [4, h - 4], [w - 4, h - 4]].forEach(([cx, cy]) => {
        const sx = cx === 4 ? 1 : -1
        const sy = cy === 4 ? 1 : -1
        ctx.beginPath()
        ctx.moveTo(cx, cy + sy * bs)
        ctx.lineTo(cx, cy)
        ctx.lineTo(cx + sx * bs, cy)
        ctx.stroke()
      })

      // REC dot (blink every 30 frames)
      if (Math.floor(frame / 30) % 2 === 0) {
        ctx.beginPath()
        ctx.arc(w - 10, 10, 3, 0, Math.PI * 2)
        ctx.fillStyle = '#EF4444'
        ctx.fill()
      }
    }, 50)

    return () => clearInterval(interval)
  }, [camera.online])

  return (
    <div
      className="rounded-xl overflow-hidden relative"
      style={{ backgroundColor: '#0F172A', border: '1px solid #334155', aspectRatio: '16/10' }}
    >
      {camera.online ? (
        <canvas
          ref={canvasRef}
          width={240}
          height={150}
          className="w-full h-full"
          style={{ display: 'block' }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center flex-col gap-2"
          style={{ color: '#334155' }}>
          <WifiOff size={20} />
          <span style={{ fontSize: '10px' }}>Offline</span>
        </div>
      )}

      {/* Labels */}
      <div className="absolute bottom-0 left-0 right-0 px-2 py-1 flex items-center justify-between"
        style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
        <span style={{ color: '#CBD5E1', fontSize: '10px', fontWeight: 600 }}>{camera.name}</span>
        <div className="flex items-center gap-1">
          {camera.online
            ? <Wifi size={9} style={{ color: '#22C55E' }} />
            : <WifiOff size={9} style={{ color: '#EF4444' }} />
          }
        </div>
      </div>

      <div className="absolute top-1 left-2">
        <span style={{ color: '#64748B', fontSize: '9px' }}>
          Motion: {camera.lastMotion}
        </span>
      </div>
    </div>
  )
}
