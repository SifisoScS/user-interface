import { Index } from './pages/Index'
import { ModeProvider } from './context/ModeContext'

export default function App() {
  return (
    <ModeProvider>
      <Index />
    </ModeProvider>
  )
}
