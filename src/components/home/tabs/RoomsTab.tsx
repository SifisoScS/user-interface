import { SmartRoom } from '../SmartRoom'
import { ThermostatPanel } from '../devices/Thermostat'
import { DoorLockPanel } from '../devices/DoorLock'
import { SecurityCameraPanel } from '../devices/SecurityCamera'
import { GroceryList } from '../GroceryList'
import { EnergyMonitor } from '../EnergyMonitor'
import { PomodoroTimer } from '../../widgets/home/PomodoroTimer'
import type { IoTState, SmartLight, ThermostatState, DoorLock } from '../../../data/mockIoT'

const FAMILY_ROOMS = ['Living Room', 'Kitchen', 'Main Bedroom', 'Kids Room', 'Bathroom', 'Outside']

const ACCENT = '#A78BFA'

interface Props {
  iotState: IoTState
  onLightChange: (l: SmartLight) => void
  onThermostat: (t: ThermostatState) => void
  onLockChange: (l: DoorLock) => void
}

export function RoomsTab({ iotState, onLightChange, onThermostat, onLockChange }: Props) {
  return (
    <div className="h-full overflow-auto">
      <div className="p-6 space-y-6">

        {/* Room cards */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#475569' }}>Rooms</div>
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
            {FAMILY_ROOMS.map(room => (
              <SmartRoom key={room} room={room} iotState={iotState} onLightChange={onLightChange} />
            ))}
          </div>
        </div>

        {/* Climate */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#475569' }}>Climate Control</div>
          <ThermostatPanel state={iotState.thermostat} onChange={onThermostat} />
        </div>

        {/* Security in Rooms */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#475569' }}>Door Locks</div>
          <DoorLockPanel locks={iotState.locks} onChange={onLockChange} />
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#475569' }}>Cameras</div>
          <SecurityCameraPanel cameras={iotState.cameras} />
        </div>

        {/* Personal / household */}
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {/* Grocery */}
          <div
            className="rounded-2xl p-4"
            style={{ backgroundColor: '#1E293B', border: '1px solid #334155', minHeight: '240px' }}
          >
            <GroceryList />
          </div>

          {/* Energy */}
          <div
            className="rounded-2xl p-4"
            style={{ backgroundColor: '#1E293B', border: '1px solid #334155' }}
          >
            <EnergyMonitor />
          </div>

          {/* Pomodoro */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: '#1E293B', border: '1px solid #334155', minHeight: '200px' }}
          >
            <PomodoroTimer />
          </div>
        </div>

      </div>
    </div>
  )
}
