import { useRef, useState, useEffect, lazy, Suspense } from 'react'
import GridLayout from 'react-grid-layout'
import { useLayout } from '../../hooks/useLayout'
import { usePanelState } from '../../hooks/usePanelState'
import type { Mode } from '../../types'

// Dev widgets
const Terminal = lazy(() => import('../widgets/dev/Terminal').then(m => ({ default: m.Terminal })))
const CodeEditor = lazy(() => import('../widgets/dev/CodeEditor').then(m => ({ default: m.CodeEditor })))
const GitStatus = lazy(() => import('../widgets/dev/GitStatus').then(m => ({ default: m.GitStatus })))
const ApiTester = lazy(() => import('../widgets/dev/ApiTester').then(m => ({ default: m.ApiTester })))
const DevTasks = lazy(() => import('../widgets/dev/DevTasks').then(m => ({ default: m.DevTasks })))
const BrowserPreviewDev = lazy(() => import('../widgets/dev/BrowserPreview').then(m => ({ default: m.BrowserPreview })))

// Office widgets
const EmailInbox = lazy(() => import('../widgets/office/EmailInbox').then(m => ({ default: m.EmailInbox })))
const TeamChat = lazy(() => import('../widgets/office/TeamChat').then(m => ({ default: m.TeamChat })))
const CalendarWidget = lazy(() => import('../widgets/office/Calendar').then(m => ({ default: m.CalendarWidget })))
const TaskBoard = lazy(() => import('../widgets/office/TaskBoard').then(m => ({ default: m.TaskBoard })))
const QuickNotes = lazy(() => import('../widgets/office/QuickNotes').then(m => ({ default: m.QuickNotes })))

// Home widgets
const Clock = lazy(() => import('../widgets/home/Clock').then(m => ({ default: m.Clock })))
const Weather = lazy(() => import('../widgets/home/Weather').then(m => ({ default: m.Weather })))
const PomodoroTimer = lazy(() => import('../widgets/home/PomodoroTimer').then(m => ({ default: m.PomodoroTimer })))
const SystemStats = lazy(() => import('../widgets/home/SystemStats').then(m => ({ default: m.SystemStats })))
const BrowserPreviewHome = lazy(() => import('../widgets/dev/BrowserPreview').then(m => ({ default: m.BrowserPreview })))

const WidgetFallback = () => (
  <div className="h-full flex items-center justify-center" style={{ color: '#64748B' }}>
    <span className="text-xs">Loading…</span>
  </div>
)

interface Props {
  mode: Mode
}

export function PanelGrid({ mode }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(1200)
  const { layout, onLayoutChange } = useLayout(mode)
  const { getState } = usePanelState()

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(entries => {
      setWidth(entries[0].contentRect.width)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const visibleLayout = layout.filter(item => !getState(item.i as any).closed)

  return (
    <div ref={containerRef} className="w-full">
      <GridLayout
        key={mode}
        layout={visibleLayout}
        cols={24}
        rowHeight={30}
        width={width}
        onLayoutChange={onLayoutChange}
        draggableHandle=".panel-drag-handle"
        margin={[10, 10]}
        containerPadding={[10, 10]}
        resizeHandles={['se']}
        isResizable
        isDraggable
      >
        {mode === 'dev' && (
          <>
            <div key="terminal">
              <Suspense fallback={<WidgetFallback />}><Terminal /></Suspense>
            </div>
            <div key="code-editor">
              <Suspense fallback={<WidgetFallback />}><CodeEditor /></Suspense>
            </div>
            <div key="git-status">
              <Suspense fallback={<WidgetFallback />}><GitStatus /></Suspense>
            </div>
            <div key="api-tester">
              <Suspense fallback={<WidgetFallback />}><ApiTester /></Suspense>
            </div>
            <div key="dev-tasks">
              <Suspense fallback={<WidgetFallback />}><DevTasks /></Suspense>
            </div>
            <div key="browser-preview-dev">
              <Suspense fallback={<WidgetFallback />}><BrowserPreviewDev widgetId="browser-preview-dev" /></Suspense>
            </div>
          </>
        )}
        {mode === 'office' && (
          <>
            <div key="email-inbox">
              <Suspense fallback={<WidgetFallback />}><EmailInbox /></Suspense>
            </div>
            <div key="team-chat">
              <Suspense fallback={<WidgetFallback />}><TeamChat /></Suspense>
            </div>
            <div key="calendar">
              <Suspense fallback={<WidgetFallback />}><CalendarWidget /></Suspense>
            </div>
            <div key="task-board">
              <Suspense fallback={<WidgetFallback />}><TaskBoard /></Suspense>
            </div>
            <div key="quick-notes">
              <Suspense fallback={<WidgetFallback />}><QuickNotes /></Suspense>
            </div>
          </>
        )}
        {mode === 'home' && (
          <>
            <div key="clock">
              <Suspense fallback={<WidgetFallback />}><Clock /></Suspense>
            </div>
            <div key="weather">
              <Suspense fallback={<WidgetFallback />}><Weather /></Suspense>
            </div>
            <div key="pomodoro">
              <Suspense fallback={<WidgetFallback />}><PomodoroTimer /></Suspense>
            </div>
            <div key="quick-notes">
              <Suspense fallback={<WidgetFallback />}><QuickNotes /></Suspense>
            </div>
            <div key="system-stats">
              <Suspense fallback={<WidgetFallback />}><SystemStats /></Suspense>
            </div>
            <div key="browser-preview-home">
              <Suspense fallback={<WidgetFallback />}><BrowserPreviewHome widgetId="browser-preview-home" /></Suspense>
            </div>
          </>
        )}
      </GridLayout>
    </div>
  )
}
