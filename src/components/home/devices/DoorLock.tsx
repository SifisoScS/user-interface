import { Lock, Unlock, Clock, User } from 'lucide-react'
import type { DoorLock as DoorLockType } from '../../../data/mockIoT'

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
            backgroundColor: '#1E293B',
            border: `1px solid ${lock.locked ? '#14B8A630' : '#F59E0B30'}`,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{
                backgroundColor: lock.locked ? '#14B8A618' : '#F59E0B18',
                color: lock.locked ? '#14B8A6' : '#F59E0B',
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
              backgroundColor: lock.locked ? '#F59E0B15' : '#14B8A615',
              color: lock.locked ? '#F59E0B' : '#14B8A6',
              border: `1px solid ${lock.locked ? '#F59E0B30' : '#14B8A630'}`,
            }}
          >
            {lock.locked ? 'Unlock' : 'Lock'}
          </button>
        </div>
      ))}
    </div>
  )
}
