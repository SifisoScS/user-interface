import { mockScenes } from '../../data'
import type { IoTState } from '../../data/mockIoT'

interface Props {
  iotState: IoTState
  onApply: (state: IoTState) => void
}

export function SceneSelector({ iotState, onApply }: Props) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#475569' }}>
        Scenes
      </div>
      <div className="flex flex-wrap gap-2">
        {mockScenes.map(scene => (
          <button
            key={scene.id}
            onClick={() => onApply(scene.apply(iotState))}
            title={scene.description}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all hover:brightness-110"
            style={{
              backgroundColor: '#1E293B',
              color: '#94A3B8',
              border: '1px solid #334155',
            }}
          >
            <span>{scene.icon}</span>
            <span>{scene.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
