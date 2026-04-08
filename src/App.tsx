import { Index } from './pages/Index'
import { ModeProvider } from './context/ModeContext'
import { ErrorBoundary } from './components/ErrorBoundary'

export default function App() {
  return (
    <ErrorBoundary>
      <ModeProvider>
        <Index />
      </ModeProvider>
    </ErrorBoundary>
  )
}
