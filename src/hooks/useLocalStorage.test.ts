import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from './useLocalStorage'

beforeEach(() => {
  localStorage.clear()
  vi.restoreAllMocks()
})

describe('useLocalStorage', () => {
  it('returns initial value when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 42))
    expect(result.current[0]).toBe(42)
  })

  it('persists a value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 0))
    act(() => { result.current[1](99) })
    expect(result.current[0]).toBe(99)
    expect(JSON.parse(localStorage.getItem('test-key')!)).toBe(99)
  })

  it('reads an existing value from localStorage on mount', () => {
    localStorage.setItem('test-key', JSON.stringify('hello'))
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
    expect(result.current[0]).toBe('hello')
  })

  it('clears the value back to initial', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
    act(() => { result.current[1]('changed') })
    act(() => { result.current[2]() })
    expect(result.current[0]).toBe('initial')
    expect(localStorage.getItem('test-key')).toBeNull()
  })

  it('supports functional updater', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 10))
    act(() => { result.current[1](n => n + 5) })
    expect(result.current[0]).toBe(15)
  })

  it('falls back to initial value when localStorage contains invalid JSON', () => {
    localStorage.setItem('bad-key', 'not-json{')
    const { result } = renderHook(() => useLocalStorage('bad-key', 'fallback'))
    expect(result.current[0]).toBe('fallback')
  })
})
