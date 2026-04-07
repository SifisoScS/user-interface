import { useState } from 'react'
import { Zap, Send } from 'lucide-react'
import { PanelWrapper } from '../../panels/PanelWrapper'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

const METHOD_COLORS: Record<Method, string> = {
  GET:    '#10B981',
  POST:   '#3B82F6',
  PUT:    '#F59E0B',
  DELETE: '#EF4444',
  PATCH:  '#8B5CF6',
}

interface MockResponse {
  status: number
  data: unknown
  latency: string
}

const MOCK_RESPONSES: Record<string, MockResponse> = {
  default: {
    status: 200,
    data: {
      id: 1,
      name: 'Forge OS Widget',
      version: '1.0.0',
      features: ['drag', 'resize', 'persist'],
    },
    latency: '42ms',
  },
}

export function ApiTester() {
  const [method, setMethod] = useState<Method>('GET')
  const [url, setUrl] = useState('https://api.example.com/v1/widgets')
  const [body, setBody] = useState('{\n  "name": "New Widget"\n}')
  const [headers, setHeaders] = useState('Authorization: Bearer <token>\nContent-Type: application/json')
  const [response, setResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'body' | 'headers'>('body')
  const [status, setStatus] = useState<number | null>(null)
  const [latency, setLatency] = useState<string | null>(null)

  const sendRequest = () => {
    setLoading(true)
    setResponse(null)
    setTimeout(() => {
      const mock = MOCK_RESPONSES.default
      setResponse(JSON.stringify(mock.data as Record<string, unknown>, null, 2))
      setStatus(200)
      setLatency('42ms')
      setLoading(false)
    }, 600 + Math.random() * 400)
  }

  return (
    <PanelWrapper id="api-tester" label="API Tester" icon={Zap}>
      <div className="h-full flex flex-col gap-0 text-xs overflow-hidden">
        {/* URL bar */}
        <div
          className="flex items-center gap-2 p-2.5 border-b"
          style={{ borderColor: '#1E293B' }}
        >
          <select
            value={method}
            onChange={e => setMethod(e.target.value as Method)}
            className="bg-transparent border rounded-lg px-2 py-1.5 text-xs font-bold
                       outline-none cursor-pointer"
            style={{
              borderColor: '#1E293B',
              color: METHOD_COLORS[method],
              backgroundColor: '#0F172A',
            }}
          >
            {(['GET','POST','PUT','DELETE','PATCH'] as Method[]).map(m => (
              <option key={m} value={m} style={{ color: METHOD_COLORS[m], backgroundColor: '#0F172A' }}>{m}</option>
            ))}
          </select>
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            className="flex-1 bg-transparent border rounded-lg px-2.5 py-1.5 text-xs
                       outline-none font-mono"
            style={{ borderColor: '#1E293B', color: '#E2E8F0' }}
            placeholder="https://api.example.com/endpoint"
          />
          <button
            onClick={sendRequest}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                       transition-colors disabled:opacity-50"
            style={{ backgroundColor: '#3B82F6', color: '#fff' }}
          >
            <Send size={11} />
            {loading ? 'Sending…' : 'Send'}
          </button>
        </div>

        {/* Tabs */}
        <div
          className="flex border-b"
          style={{ borderColor: '#1E293B' }}
        >
          {(['body', 'headers'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 text-xs font-medium capitalize border-b-2 transition-colors"
              style={{
                borderColor: activeTab === tab ? '#3B82F6' : 'transparent',
                color: activeTab === tab ? '#3B82F6' : '#64748B',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Body / Headers */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ minHeight: 0 }}>
          <textarea
            value={activeTab === 'body' ? body : headers}
            onChange={e => activeTab === 'body' ? setBody(e.target.value) : setHeaders(e.target.value)}
            className="flex-1 bg-transparent outline-none resize-none p-3 font-mono text-xs leading-5"
            style={{ color: '#94A3B8', minHeight: 0 }}
            spellCheck={false}
          />
        </div>

        {/* Response */}
        {(response || loading) && (
          <div
            className="border-t flex flex-col"
            style={{ borderColor: '#1E293B', maxHeight: '45%' }}
          >
            <div
              className="flex items-center justify-between px-3 py-1.5 border-b"
              style={{ borderColor: '#1E293B', backgroundColor: 'rgba(255,255,255,0.02)' }}
            >
              <span className="font-semibold uppercase tracking-wide" style={{ color: '#64748B' }}>
                Response
              </span>
              {status && (
                <div className="flex items-center gap-3">
                  <span style={{ color: '#10B981' }}>{status} OK</span>
                  <span style={{ color: '#64748B' }}>{latency}</span>
                </div>
              )}
            </div>
            <div className="overflow-auto p-3 font-mono" style={{ color: '#94A3B8' }}>
              {loading ? (
                <span style={{ color: '#64748B' }}>Waiting for response…</span>
              ) : (
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{response}</pre>
              )}
            </div>
          </div>
        )}
      </div>
    </PanelWrapper>
  )
}
