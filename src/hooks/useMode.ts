import { useLocalStorage } from './useLocalStorage'
import type { Mode } from '../types'

export function useMode() {
  const [mode, setMode] = useLocalStorage<Mode>('forge-os-mode', 'home')
  return { mode, setMode }
}
