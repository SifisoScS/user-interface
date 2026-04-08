import { AnimatePresence, motion } from 'framer-motion'
import { Header } from '../components/layout/Header'
import { OfficeWorkspace } from '../components/office/OfficeWorkspace'
import { HomeWorkspace } from '../components/home/HomeWorkspace'
import { useModeContext } from '../context/ModeContext'

const FADE = {
  initial:    { opacity: 0, y: 6 },
  animate:    { opacity: 1, y: 0 },
  exit:       { opacity: 0, y: -6 },
  transition: { duration: 0.2, ease: 'easeInOut' },
}

export function Index() {
  const { mode } = useModeContext()

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#05070A' }}>
      <Header />

      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait" initial={false}>
          {mode === 'office' && (
            <motion.div key="office" className="absolute inset-0" {...FADE}>
              <OfficeWorkspace />
            </motion.div>
          )}
          {mode === 'home' && (
            <motion.div key="home" className="absolute inset-0" {...FADE}>
              <HomeWorkspace />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
