import { useLocalStorage } from './useLocalStorage'
import type { Mode } from '../types'

export function useMode() {
  const [mode, setMode] = useLocalStorage<Mode>('forge-os-mode', 'dev')
  return { mode, setMode }
}
