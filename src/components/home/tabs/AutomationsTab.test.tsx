import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AutomationsTab } from './AutomationsTab'

describe('AutomationsTab', () => {
  it('renders automation rules', () => {
    render(<AutomationsTab />)
    expect(screen.getByText('Your Home Rules ⚡')).toBeInTheDocument()
  })

  it('shows grouped rule headings', () => {
    render(<AutomationsTab />)
    expect(screen.getByText('Morning')).toBeInTheDocument()
    expect(screen.getByText('Bedtime')).toBeInTheDocument()
  })

  it('toggle changes enabled state', async () => {
    render(<AutomationsTab />)
    // Security rule starts disabled — find its toggle
    const securityToggle = screen.getByRole('button', {
      name: /enable.*motion detected outside/i,
    })
    expect(securityToggle).toHaveAttribute('aria-pressed', 'false')
    await userEvent.click(securityToggle)
    expect(securityToggle).toHaveAttribute('aria-pressed', 'true')
  })

  it('an enabled rule can be disabled', async () => {
    render(<AutomationsTab />)
    const morningToggle = screen.getByRole('button', {
      name: /disable.*at 06:00/i,
    })
    expect(morningToggle).toHaveAttribute('aria-pressed', 'true')
    await userEvent.click(morningToggle)
    expect(morningToggle).toHaveAttribute('aria-pressed', 'false')
  })
})
