import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HomeTab } from './HomeTab'
import { defaultIoTState } from '../../../data'
import { USER_CONFIG } from '../../../config/user'

function renderHomeTab() {
  return render(
    <HomeTab
      iotState={defaultIoTState}
      onApply={() => {}}
      onAlertCountChange={() => {}}
    />
  )
}

describe('HomeTab', () => {
  afterEach(() => vi.restoreAllMocks())

  it('shows the owner name in the greeting', () => {
    renderHomeTab()
    // Name appears in greeting + activity feed — check at least one match exists
    const matches = screen.getAllByText(new RegExp(USER_CONFIG.name))
    expect(matches.length).toBeGreaterThan(0)
  })

  it('shows morning greeting between 5–11', () => {
    vi.spyOn(Date.prototype, 'getHours').mockReturnValue(8)
    renderHomeTab()
    expect(screen.getByText(/good morning/i)).toBeInTheDocument()
  })

  it('shows afternoon greeting between 12–17', () => {
    vi.spyOn(Date.prototype, 'getHours').mockReturnValue(14)
    renderHomeTab()
    expect(screen.getByText(/good afternoon/i)).toBeInTheDocument()
  })

  it('shows evening greeting between 18–21', () => {
    vi.spyOn(Date.prototype, 'getHours').mockReturnValue(19)
    renderHomeTab()
    expect(screen.getByText(/good evening/i)).toBeInTheDocument()
  })

  it('shows night greeting for late hours', () => {
    vi.spyOn(Date.prototype, 'getHours').mockReturnValue(23)
    renderHomeTab()
    expect(screen.getByText(/good night/i)).toBeInTheDocument()
  })

  it('renders door lock status chip', () => {
    renderHomeTab()
    expect(screen.getByText(/Doors:/)).toBeInTheDocument()
  })

  it('renders Quick Actions section', () => {
    renderHomeTab()
    expect(screen.getByText('Quick Actions')).toBeInTheDocument()
    expect(screen.getByText('Emergency Mode')).toBeInTheDocument()
  })
})
