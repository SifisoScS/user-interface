import { useCallback } from 'react'
import type { Layout } from 'react-grid-layout'
import { useLocalStorage } from './useLocalStorage'
import { defaultLayouts } from '../data'
import type { Mode, LayoutMap } from '../types'

export function useLayout(mode: Mode) {
  const [layouts, setLayouts] = useLocalStorage<LayoutMap>('forge-os-layouts', defaultLayouts)

  const onLayoutChange = useCallback(
    (newLayout: Layout[]) => {
      setLayouts(prev => ({ ...prev, [mode]: newLayout }))
    },
    [mode, setLayouts]
  )

  const resetLayout = useCallback(() => {
    setLayouts(prev => ({ ...prev, [mode]: defaultLayouts[mode] }))
  }, [mode, setLayouts])

  return { layout: layouts[mode], onLayoutChange, resetLayout }
}
