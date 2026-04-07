import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AppDock, type AppId } from './AppDock'
import { AppHeader } from './AppHeader'
import { DocumentEditor } from './apps/DocumentEditor'
import { PeopleDirectory } from './apps/PeopleDirectory'
import { MeetingRoom } from './apps/MeetingRoom'
import { TimeTracker } from './apps/TimeTracker'
import { EmailInbox } from '../widgets/office/EmailInbox'
import { TeamChat } from '../widgets/office/TeamChat'
import { CalendarWidget } from '../widgets/office/Calendar'
import { TaskBoard } from '../widgets/office/TaskBoard'

const FADE = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -4 },
  transition: { duration: 0.18 },
}

export function OfficeWorkspace() {
  const [activeApp, setActiveApp] = useState<AppId>('mail')

  return (
    <div
      className="flex h-full overflow-hidden"
      style={{ backgroundColor: '#05070A' }}
    >
      {/* Left dock */}
      <AppDock active={activeApp} onSelect={setActiveApp} />

      {/* Main area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* App header */}
        <AppHeader activeApp={activeApp} />

        {/* App content */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeApp}
              className="absolute inset-0"
              {...FADE}
            >
              {activeApp === 'mail'      && <EmailInbox />}
              {activeApp === 'chat'      && <TeamChat />}
              {activeApp === 'calendar'  && <CalendarWrapper />}
              {activeApp === 'documents' && <DocumentEditor />}
              {activeApp === 'people'    && <PeopleDirectory />}
              {activeApp === 'meetings'  && <MeetingRoom />}
              {activeApp === 'tasks'     && <TaskBoard />}
              {activeApp === 'time'      && <TimeTracker />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// Wrap CalendarWidget to fill container (strip PanelWrapper chrome)
function CalendarWrapper() {
  return (
    <div className="h-full p-4 overflow-hidden" style={{ backgroundColor: '#0A1525' }}>
      <CalendarWidget />
    </div>
  )
}
