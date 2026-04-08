import { createContext, useContext, useState } from 'react'
import type { Mode } from '../types'

interface ModeContextValue {
  mode: Mode
  setMode: (m: Mode) => void
}

const ModeContext = createContext<ModeContextValue | null>(null)

function getInitialMode(): Mode {
  try {
    const saved = localStorage.getItem('forge-os-mode')
    if (saved === 'office' || saved === 'home') return saved
  } catch { /* ignore */ }
  return 'home'
}

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>(getInitialMode)

  const setMode = (m: Mode) => {
    setModeState(m)
    try { localStorage.setItem('forge-os-mode', m) } catch { /* ignore */ }
  }

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  )
}

export function useModeContext() {
  const ctx = useContext(ModeContext)
  if (!ctx) throw new Error('useModeContext must be used within ModeProvider')
  return ctx
}
