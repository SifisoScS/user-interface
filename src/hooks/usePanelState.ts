import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import type { PanelState, WidgetId } from '../types'

type PanelStateMap = Record<string, PanelState>

const defaultState: PanelState = { minimized: false, maximized: false, closed: false }

export function usePanelState() {
  const [panelStates, setPanelStates] = useLocalStorage<PanelStateMap>(
    'forge-os-panel-states',
    {}
  )

  const getState = useCallback(
    (id: WidgetId): PanelState => panelStates[id] ?? defaultState,
    [panelStates]
  )

  const toggleMinimize = useCallback(
    (id: WidgetId) => {
      setPanelStates(prev => ({
        ...prev,
        [id]: { ...defaultState, ...prev[id], minimized: !(prev[id]?.minimized ?? false), maximized: false },
      }))
    },
    [setPanelStates]
  )

  const toggleMaximize = useCallback(
    (id: WidgetId) => {
      setPanelStates(prev => ({
        ...prev,
        [id]: { ...defaultState, ...prev[id], maximized: !(prev[id]?.maximized ?? false), minimized: false },
      }))
    },
    [setPanelStates]
  )

  const closePanel = useCallback(
    (id: WidgetId) => {
      setPanelStates(prev => ({
        ...prev,
        [id]: { minimized: false, maximized: false, closed: true },
      }))
    },
    [setPanelStates]
  )

  const openPanel = useCallback(
    (id: WidgetId) => {
      setPanelStates(prev => ({
        ...prev,
        [id]: { minimized: false, maximized: false, closed: false },
      }))
    },
    [setPanelStates]
  )

  return { panelStates, getState, toggleMinimize, toggleMaximize, closePanel, openPanel }
}
