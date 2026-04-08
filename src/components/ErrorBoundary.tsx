import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  message: string
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, message: '' }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Forge OS] Unhandled render error:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="h-screen w-screen flex flex-col items-center justify-center gap-6"
          style={{ backgroundColor: '#0F172A', color: '#F8FAFC' }}
        >
          <div style={{ fontSize: '48px' }}>⚠️</div>
          <div className="text-center">
            <div className="text-xl font-bold mb-2">Something went wrong</div>
            <div className="text-sm" style={{ color: '#94A3B8', maxWidth: '360px' }}>
              {this.state.message || 'An unexpected error occurred.'}
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-xl font-medium text-sm transition-all hover:brightness-110"
            style={{ backgroundColor: '#2563EB', color: '#fff' }}
          >
            Refresh
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
