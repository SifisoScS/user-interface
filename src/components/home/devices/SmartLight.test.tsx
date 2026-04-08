import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SmartLightPanel } from './SmartLight'
import type { SmartLight } from '../../../data/mockIoT'

const LIGHTS: SmartLight[] = [
  { id: 'l1', name: 'Ceiling',    room: 'Living Room', on: true,  brightness: 80, temperature: 'warm',    watts: 9 },
  { id: 'l2', name: 'Floor Lamp', room: 'Living Room', on: false, brightness: 50, temperature: 'neutral', watts: 7 },
]

describe('SmartLightPanel', () => {
  it('renders light names', () => {
    render(<SmartLightPanel lights={LIGHTS} onChange={() => {}} />)
    expect(screen.getByText('Ceiling')).toBeInTheDocument()
    expect(screen.getByText('Floor Lamp')).toBeInTheDocument()
  })

  it('toggle for an ON light has aria-pressed=true', () => {
    render(<SmartLightPanel lights={LIGHTS} onChange={() => {}} />)
    const toggle = screen.getByRole('button', { name: 'Toggle Ceiling' })
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
  })

  it('toggle for an OFF light has aria-pressed=false', () => {
    render(<SmartLightPanel lights={LIGHTS} onChange={() => {}} />)
    const toggle = screen.getByRole('button', { name: 'Toggle Floor Lamp' })
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
  })

  it('clicking toggle calls onChange with inverted on state', async () => {
    const onChange = vi.fn()
    render(<SmartLightPanel lights={LIGHTS} onChange={onChange} />)
    await userEvent.click(screen.getByRole('button', { name: 'Toggle Ceiling' }))
    expect(onChange).toHaveBeenCalledOnce()
    expect(onChange.mock.calls[0][0].on).toBe(false)
  })

  it('brightness slider is visible only when light is on', () => {
    render(<SmartLightPanel lights={LIGHTS} onChange={() => {}} />)
    const sliders = screen.getAllByRole('slider')
    // Only Ceiling (on=true) should show a brightness slider
    expect(sliders).toHaveLength(1)
  })
})
