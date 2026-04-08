import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ModeProvider, useModeContext } from './ModeContext'

beforeEach(() => localStorage.clear())

function ModeDisplay() {
  const { mode, setMode } = useModeContext()
  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <button onClick={() => setMode('office')}>Office</button>
      <button onClick={() => setMode('home')}>Home</button>
    </div>
  )
}

describe('ModeContext', () => {
  it('defaults to home mode', () => {
    render(<ModeProvider><ModeDisplay /></ModeProvider>)
    expect(screen.getByTestId('mode').textContent).toBe('home')
  })

  it('switches to office mode when requested', async () => {
    render(<ModeProvider><ModeDisplay /></ModeProvider>)
    await userEvent.click(screen.getByText('Office'))
    expect(screen.getByTestId('mode').textContent).toBe('office')
  })

  it('persists mode to localStorage', async () => {
    render(<ModeProvider><ModeDisplay /></ModeProvider>)
    await userEvent.click(screen.getByText('Office'))
    // ModeContext stores raw string (not JSON-encoded)
    expect(localStorage.getItem('forge-os-mode')).toBe('office')
  })

  it('restores persisted mode on remount', () => {
    // ModeContext reads raw string directly
    localStorage.setItem('forge-os-mode', 'office')
    render(<ModeProvider><ModeDisplay /></ModeProvider>)
    expect(screen.getByTestId('mode').textContent).toBe('office')
  })

  it('throws when used outside ModeProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<ModeDisplay />)).toThrow()
    spy.mockRestore()
  })
})
