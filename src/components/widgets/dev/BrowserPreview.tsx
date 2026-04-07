import { useState } from 'react'
import { Globe, RefreshCw, ArrowLeft, ArrowRight, Lock } from 'lucide-react'
import { PanelWrapper } from '../../panels/PanelWrapper'
import type { WidgetId } from '../../../types'

const SAFE_URLS = [
  'https://example.com',
  'http://localhost:5173',
  'https://developer.mozilla.org/en-US/docs/Web',
]

interface Props {
  widgetId: WidgetId
}

export function BrowserPreview({ widgetId }: Props) {
  const [url, setUrl] = useState('https://example.com')
  const [inputUrl, setInputUrl] = useState('https://example.com')
  const [key, setKey] = useState(0)
  const [blocked, setBlocked] = useState(false)

  const navigate = () => {
    const isSafe = SAFE_URLS.some(s => inputUrl.startsWith(s))
    if (!isSafe) {
      setBlocked(true)
      return
    }
    setBlocked(false)
    setUrl(inputUrl)
    setKey(k => k + 1)
  }

  const reload = () => {
    setBlocked(false)
    setKey(k => k + 1)
  }

  return (
    <PanelWrapper id={widgetId} label="Browser" icon={Globe}>
      <div className="h-full flex flex-col" style={{ backgroundColor: '#020817' }}>
        {/* URL bar */}
        <div
          className="flex items-center gap-2 px-2 py-2 border-b"
          style={{ borderColor: '#1E293B' }}
        >
          <button className="text-muted hover:text-text transition-colors p-1" style={{ color: '#64748B' }}>
            <ArrowLeft size={13} />
          </button>
          <button className="text-muted hover:text-text transition-colors p-1" style={{ color: '#64748B' }}>
            <ArrowRight size={13} />
          </button>
          <button onClick={reload} className="p-1 transition-colors hover:text-text" style={{ color: '#64748B' }}>
            <RefreshCw size={13} />
          </button>
          <div
            className="flex-1 flex items-center gap-2 rounded-lg px-2.5 py-1.5 border"
            style={{ backgroundColor: '#0F172A', borderColor: '#1E293B' }}
          >
            <Lock size={11} style={{ color: '#64748B' }} />
            <input
              value={inputUrl}
              onChange={e => setInputUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && navigate()}
              className="flex-1 bg-transparent outline-none text-xs font-mono"
              style={{ color: '#E2E8F0' }}
            />
          </div>
          <button
            onClick={navigate}
            className="text-xs px-2.5 py-1.5 rounded-lg transition-colors"
            style={{ backgroundColor: '#3B82F6', color: '#fff' }}
          >
            Go
          </button>
        </div>

        {/* Content */}
        {blocked ? (
          <div
            className="flex-1 flex flex-col items-center justify-center gap-3 text-center p-6"
            style={{ color: '#64748B' }}
          >
            <Globe size={36} style={{ opacity: 0.3 }} />
            <p className="text-sm font-medium" style={{ color: '#E2E8F0' }}>Blocked by browser policy</p>
            <p className="text-xs max-w-xs">
              This URL cannot be loaded in an iframe due to <code>X-Frame-Options</code>.
              Try <code>example.com</code> or <code>localhost</code>.
            </p>
          </div>
        ) : (
          <iframe
            key={key}
            src={url}
            className="flex-1 w-full border-0"
            sandbox="allow-scripts allow-same-origin"
            title="Browser preview"
            onError={() => setBlocked(true)}
          />
        )}
      </div>
    </PanelWrapper>
  )
}
