import { useState } from 'react'
import { Lightbulb, Thermometer, Lock, Camera, Zap, ShoppingCart, StickyNote } from 'lucide-react'
import { StatusBar } from './StatusBar'
import { SmartRoom } from './SmartRoom'
import { SceneSelector } from './SceneSelector'
import { MusicPlayer } from './MusicPlayer'
import { GroceryList } from './GroceryList'
import { EnergyMonitor } from './EnergyMonitor'
import { HomeAlerts } from './HomeAlerts'
import { ThermostatPanel } from './devices/Thermostat'
import { DoorLockPanel } from './devices/DoorLock'
import { SecurityCameraPanel } from './devices/SecurityCamera'
import { defaultIoTState } from '../../data'
import type { IoTState, SmartLight } from '../../data/mockIoT'
import { Clock } from '../widgets/home/Clock'
import { PomodoroTimer } from '../widgets/home/PomodoroTimer'
import { QuickNotes } from '../widgets/office/QuickNotes'

const ACCENT = '#A78BFA'

type Tab = 'rooms' | 'climate' | 'security' | 'cameras'

const ROOMS = ['Living Room', 'Bedroom', 'Kitchen', 'Office']

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'rooms',    label: 'Rooms',    icon: <Lightbulb size={14} /> },
  { id: 'climate',  label: 'Climate',  icon: <Thermometer size={14} /> },
  { id: 'security', label: 'Security', icon: <Lock size={14} /> },
  { id: 'cameras',  label: 'Cameras',  icon: <Camera size={14} /> },
]

export function HomeWorkspace() {
  const [iotState, setIoTState] = useState<IoTState>(defaultIoTState)
  const [alertCount, setAlertCount] = useState(3)
  const [activeTab, setActiveTab] = useState<Tab>('rooms')

  const updateLight = (light: SmartLight) =>
    setIoTState(s => ({ ...s, lights: s.lights.map(l => l.id === light.id ? light : l) }))

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{ backgroundColor: '#05070A' }}
    >
      {/* Status bar */}
      <StatusBar alertCount={alertCount} />

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left: IoT control panel */}
        <div
          className="flex flex-col overflow-hidden border-r"
          style={{ width: '340px', borderColor: '#1E293B', backgroundColor: '#080F1A' }}
        >
          {/* Tab bar */}
          <div
            className="flex items-center gap-1 px-3 py-2 border-b shrink-0"
            style={{ borderColor: '#1E293B' }}
          >
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
                style={{
                  backgroundColor: activeTab === t.id ? `${ACCENT}20` : 'transparent',
                  color: activeTab === t.id ? ACCENT : '#475569',
                }}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-auto p-4 space-y-3">
            {activeTab === 'rooms' && (
              <>
                <SceneSelector iotState={iotState} onApply={setIoTState} />
                <div className="pt-2 space-y-2">
                  {ROOMS.map(room => (
                    <SmartRoom
                      key={room}
                      room={room}
                      iotState={iotState}
                      onLightChange={updateLight}
                    />
                  ))}
                </div>
              </>
            )}

            {activeTab === 'climate' && (
              <ThermostatPanel
                state={iotState.thermostat}
                onChange={t => setIoTState(s => ({ ...s, thermostat: t }))}
              />
            )}

            {activeTab === 'security' && (
              <>
                <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#475569' }}>
                  Door Locks
                </div>
                <DoorLockPanel
                  locks={iotState.locks}
                  onChange={lock =>
                    setIoTState(s => ({ ...s, locks: s.locks.map(l => l.id === lock.id ? lock : l) }))
                  }
                />
                <div className="pt-3">
                  <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#475569' }}>
                    Alerts
                  </div>
                  <HomeAlerts onCountChange={setAlertCount} />
                </div>
              </>
            )}

            {activeTab === 'cameras' && (
              <SecurityCameraPanel cameras={iotState.cameras} />
            )}
          </div>
        </div>

        {/* Right: Personal widgets */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto p-4">
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>

              {/* Clock */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ backgroundColor: '#0A1525', border: '1px solid #1E293B', minHeight: '200px' }}
              >
                <Clock />
              </div>

              {/* Pomodoro */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ backgroundColor: '#0A1525', border: '1px solid #1E293B', minHeight: '200px' }}
              >
                <PomodoroTimer />
              </div>

              {/* Energy */}
              <div
                className="rounded-2xl p-4"
                style={{ backgroundColor: '#0A1525', border: '1px solid #1E293B' }}
              >
                <EnergyMonitor />
              </div>

              {/* Grocery */}
              <div
                className="rounded-2xl p-4"
                style={{ backgroundColor: '#0A1525', border: '1px solid #1E293B', minHeight: '240px' }}
              >
                <GroceryList />
              </div>

              {/* Quick Notes */}
              <div
                className="rounded-2xl overflow-hidden col-span-full"
                style={{ backgroundColor: '#0A1525', border: '1px solid #1E293B', minHeight: '160px' }}
              >
                <QuickNotes />
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Music player — fixed bottom */}
      <MusicPlayer />
    </div>
  )
}
