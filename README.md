# Forge OS

A dark-themed multi-mode dashboard built with React, TypeScript, and Vite. Three completely distinct workspace UIs — Dev, Office, and Home — each purpose-built for its context.

## Modes

### Dev — Full IDE Experience
VS Code-style layout with resizable panes.

- **Run bar** — Start/stop the dev server, open browser preview at `localhost:5173`
- **File explorer** — Project tree with active file highlight
- **Code editor** — Syntax-highlighted editor with tabs, file icons, and a status bar
- **Bottom drawer** — Terminal, Git status, API tester, and Problems panel (all tabbed)
- **Right panel** — Dev tasks checklist and project-wide search
- All pane dividers are **draggable** to resize

### Office — Productivity Suite
App-switcher paradigm with an always-visible icon dock.

| App | Description |
|-----|-------------|
| Mail | 3-pane inbox — folder nav, message list, preview with inline reply |
| Chat | Channel sidebar, DMs, message bubbles |
| Calendar | Month and week views, clickable event detail modal |
| Documents | Document list + rich textarea editor with formatting toolbar |
| People | Team directory — search, status filter, member cards |
| Meetings | Join meetings, 2×2 video grid, in-meeting chat, mic/cam/share controls |
| Tasks | Kanban board with drag-and-drop columns |
| Time | Running timer, today's log table, weekly bar chart |

### Home — Smart Home OS
IoT control dashboard with a persistent music player bar.

- **Rooms tab** — Expand any room to control lights (on/off, brightness, colour temperature)
- **Climate tab** — Thermostat with target temp +/−, mode selector (Heat/Cool/Auto/Off)
- **Security tab** — Door lock toggles with timestamps, dismissable home alerts
- **Cameras tab** — Animated scan-line feeds for 4 cameras
- **Scenes** — One-click presets (Morning, Evening, Movie Night, Away, Sleep) that set multiple devices at once
- **Personal widgets** — Analog/digital clock, Pomodoro timer, energy monitor, grocery list, quick notes
- **Music player** — Persistent bottom bar with play/pause/skip, scrubable progress, volume control

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18 | UI framework |
| TypeScript | 5 | Type safety |
| Vite | 5 | Dev server & bundler |
| Tailwind CSS | 3 | Utility-first styling |
| Framer Motion | 11 | Mode-switch animations |
| Lucide React | 0.378 | Icon library |
| react-grid-layout | 1.4 | Legacy panel grid (retained) |

## Design System

| Token | Value |
|-------|-------|
| Background | `#05070A` |
| Surface | `#0F172A` |
| Border | `#1E293B` |
| Text | `#E2E8F0` |
| Muted | `#64748B` |
| Dev accent | `#22C55E` (green) |
| Office accent | `#3B82F6` (blue) |
| Home accent | `#A78BFA` (purple) |
| UI font | Inter |
| Code font | JetBrains Mono |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
npm run build    # production build
npm run preview  # preview production build locally
```

## Project Structure

```
src/
├── context/
│   └── ModeContext.tsx       # Shared mode state (Dev/Office/Home)
├── components/
│   ├── layout/               # Header, ModeSwitcher
│   ├── panels/               # PanelWrapper chrome
│   ├── dev/                  # DevWorkspace, RunBar, splitters, panels
│   ├── office/               # OfficeWorkspace, AppDock, AppHeader, apps/
│   ├── home/                 # HomeWorkspace, StatusBar, devices/, widgets
│   └── widgets/              # Standalone widgets (dev / office / home)
├── data/                     # All mock data (no backend required)
├── hooks/                    # useLocalStorage, useLayout, usePanelState
├── types/                    # Shared TypeScript interfaces
└── pages/
    └── Index.tsx             # Top-level workspace router
```

All state is mock/local — no backend, no authentication required.
