import { Lock, Unlock, Clock, User } from 'lucide-react'
import type { DoorLock as DoorLockType } from '../../../data/mockIoT'

const ACCENT = '#A78BFA'

interface Props {
  locks: DoorLockType[]
  onChange: (updated: DoorLockType) => void
}

export function DoorLockPanel({ locks, onChange }: Props) {
  const toggle = (lock: DoorLockType) => {
    onChange({
      ...lock,
      locked: !lock.locked,
      lastChanged: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      changedBy: 'You via app',
    })
  }

  return (
    <div className="space-y-2">
      {locks.map(lock => (
        <div
          key={lock.id}
          className="p-3 rounded-xl flex items-center justify-between gap-3"
          style={{
            backgroundColor: '#0A1525',
            border: `1px solid ${lock.locked ? '#22C55E30' : '#EF444430'}`,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{
                backgroundColor: lock.locked ? '#22C55E18' : '#EF444418',
                color: lock.locked ? '#22C55E' : '#EF4444',
              }}
            >
              {lock.locked ? <Lock size={16} /> : <Unlock size={16} />}
            </div>
            <div>
              <div className="text-xs font-medium" style={{ color: '#E2E8F0' }}>{lock.name}</div>
              <div className="flex items-center gap-2 mt-0.5" style={{ color: '#475569', fontSize: '10px' }}>
                <span className="flex items-center gap-0.5"><Clock size={9} /> {lock.lastChanged}</span>
                <span className="flex items-center gap-0.5"><User size={9} /> {lock.changedBy}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => toggle(lock)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0"
            style={{
              backgroundColor: lock.locked ? '#EF444415' : '#22C55E15',
              color: lock.locked ? '#EF4444' : '#22C55E',
              border: `1px solid ${lock.locked ? '#EF444430' : '#22C55E30'}`,
            }}
          >
            {lock.locked ? 'Unlock' : 'Lock'}
          </button>
        </div>
      ))}
    </div>
  )
}
