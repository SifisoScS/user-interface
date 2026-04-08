import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HomeDock } from './HomeDock'
import { HomeHeader } from './HomeHeader'
import { HomeTab }        from './tabs/HomeTab'
import { RoomsTab }       from './tabs/RoomsTab'
import { AutomationsTab } from './tabs/AutomationsTab'
import { ActivityTab }    from './tabs/ActivityTab'
import { FamilyTab }      from './tabs/FamilyTab'
import { MusicPlayer }    from './MusicPlayer'
import { defaultIoTState } from '../../data'
import type { HomeTabId } from './HomeDock'
import type { IoTState, SmartLight, DoorLock, ThermostatState } from '../../data/mockIoT'

const FADE = {
  initial:    { opacity: 0, y: 6 },
  animate:    { opacity: 1, y: 0 },
  exit:       { opacity: 0, y: -4 },
  transition: { duration: 0.18 },
}

export function HomeWorkspace() {
  const [activeTab, setActiveTab]   = useState<HomeTabId>('home')
  const [iotState, setIoTState]     = useState<IoTState>(defaultIoTState)
  const [alertCount, setAlertCount] = useState(3)

  const updateLight = (light: SmartLight) =>
    setIoTState(s => ({ ...s, lights: s.lights.map(l => l.id === light.id ? light : l) }))

  const updateLock = (lock: DoorLock) =>
    setIoTState(s => ({ ...s, locks: s.locks.map(lk => lk.id === lock.id ? lock : lk) }))

  const updateThermostat = (t: ThermostatState) =>
    setIoTState(s => ({ ...s, thermostat: t }))

  return (
    <div
      className="flex h-full overflow-hidden"
      style={{ backgroundColor: '#0F172A' }}
    >
      {/* Left dock */}
      <HomeDock active={activeTab} onSelect={setActiveTab} />

      {/* Right column */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <HomeHeader activeTab={activeTab} alertCount={alertCount} />

        {/* Tab content */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              className="absolute inset-0"
              {...FADE}
            >
              {activeTab === 'home' && (
                <HomeTab
                  iotState={iotState}
                  onApply={setIoTState}
                  onAlertCountChange={setAlertCount}
                />
              )}
              {activeTab === 'rooms' && (
                <RoomsTab
                  iotState={iotState}
                  onLightChange={updateLight}
                  onThermostat={updateThermostat}
                  onLockChange={updateLock}
                />
              )}
              {activeTab === 'automations' && <AutomationsTab />}
              {activeTab === 'activity'    && <ActivityTab />}
              {activeTab === 'family'      && <FamilyTab />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Music player — always visible in Home */}
        <MusicPlayer />
      </div>
    </div>
  )
}
