import { useState, useCallback } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        setStoredValue(prev => {
          const next = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value
          localStorage.setItem(key, JSON.stringify(next))
          return next
        })
      } catch (e) {
        console.warn('[useLocalStorage] Write failed for key:', key, e)
      }
    },
    [key]
  )

  const clearValue = useCallback(() => {
    try {
      localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (e) {
      console.warn('[useLocalStorage] Clear failed for key:', key, e)
    }
  }, [key, initialValue])

  return [storedValue, setValue, clearValue] as const
}
