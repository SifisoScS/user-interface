import type { GitBranch, GitFile, GitCommit } from '../types'

export const mockBranch: GitBranch = {
  name: 'feat/forge-os-dashboard',
  upstream: 'origin/feat/forge-os-dashboard',
  ahead: 3,
  behind: 0,
}

export const mockChangedFiles: GitFile[] = [
  { status: 'M', path: 'src/components/layout/PanelGrid.tsx' },
  { status: 'M', path: 'src/components/panels/PanelWrapper.tsx' },
  { status: 'A', path: 'src/hooks/usePanelState.ts' },
  { status: 'A', path: 'src/data/defaultLayouts.ts' },
  { status: 'M', path: 'src/types/widget.ts' },
  { status: 'M', path: 'src/index.css' },
  { status: '?', path: 'src/components/widgets/dev/Terminal.tsx' },
  { status: 'D', path: 'src/components/OldPanel.tsx' },
]

export const mockCommits: GitCommit[] = [
  {
    hash: 'a3f9e2c',
    message: 'feat: add panel minimize/maximize/close controls',
    author: 'You',
    time: '2 hours ago',
  },
  {
    hash: '7b1d84a',
    message: 'feat: implement mode-aware sidebar with collapse animation',
    author: 'You',
    time: '5 hours ago',
  },
  {
    hash: 'c92f3b1',
    message: 'chore: set up react-grid-layout with localStorage persistence',
    author: 'You',
    time: 'yesterday',
  },
  {
    hash: 'e4a87f6',
    message: 'feat: add mode switcher with Framer Motion pill animation',
    author: 'You',
    time: 'yesterday',
  },
  {
    hash: '2d15c90',
    message: 'init: scaffold Forge OS with Vite + React + TypeScript',
    author: 'You',
    time: '2 days ago',
  },
]
