import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DoorLockPanel } from './DoorLock'
import type { DoorLock } from '../../../data/mockIoT'

const LOCKS: DoorLock[] = [
  { id: 'd1', name: 'Front Door',  locked: true,  lastChanged: '8:00 AM', changedBy: 'Auto' },
  { id: 'd2', name: 'Back Gate',   locked: false, lastChanged: '9:00 AM', changedBy: 'You' },
]

describe('DoorLockPanel', () => {
  it('renders all lock names', () => {
    render(<DoorLockPanel locks={LOCKS} onChange={() => {}} />)
    expect(screen.getByText('Front Door')).toBeInTheDocument()
    expect(screen.getByText('Back Gate')).toBeInTheDocument()
  })

  it('locked door shows Unlock button with correct aria-label', () => {
    render(<DoorLockPanel locks={LOCKS} onChange={() => {}} />)
    const btn = screen.getByRole('button', { name: 'Unlock Front Door' })
    expect(btn).toBeInTheDocument()
  })

  it('unlocked door shows Lock button with correct aria-label', () => {
    render(<DoorLockPanel locks={LOCKS} onChange={() => {}} />)
    const btn = screen.getByRole('button', { name: 'Lock Back Gate' })
    expect(btn).toBeInTheDocument()
  })

  it('calls onChange with toggled state when button clicked', async () => {
    const onChange = vi.fn()
    render(<DoorLockPanel locks={LOCKS} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Unlock Front Door' }))
    expect(onChange).toHaveBeenCalledOnce()
    expect(onChange.mock.calls[0][0].locked).toBe(false)
    expect(onChange.mock.calls[0][0].id).toBe('d1')
  })
})
