export interface Document {
  id: string
  title: string
  lastEdited: string
  icon: string
  content: string
}

export const mockDocuments: Document[] = [
  {
    id: 'd1',
    title: 'Q2 Product Roadmap',
    lastEdited: 'Apr 7, 2026',
    icon: '📋',
    content: `# Q2 Product Roadmap

## Overview
This document outlines our key priorities and deliverables for Q2 2026.

## Goals
1. Launch Forge OS v2.0 with dedicated mode UIs
2. Increase DAU by 25%
3. Reduce onboarding time from 10min to 3min

## Key Initiatives

### Dev Mode Overhaul
- Full IDE experience with resizable panes
- Real project runner with browser preview
- Integrated API testing and debugging

### Office Suite
- App-switching productivity interface
- Document editor with real-time collaboration (Phase 3)
- Meeting room integration

### Home OS
- IoT device control dashboard
- Smart scene management
- Energy monitoring

## Timeline
- Week 1-2: Design specs & prototypes
- Week 3-6: Development sprints
- Week 7-8: QA & user testing
- Week 9: Soft launch to beta users
- Week 10: Full release

## Success Metrics
- User satisfaction score > 4.5/5
- Feature adoption > 60% within first month
- Zero critical bugs in production`,
  },
  {
    id: 'd2',
    title: 'Design System Guidelines',
    lastEdited: 'Apr 5, 2026',
    icon: '🎨',
    content: `# Forge OS Design System

## Color Tokens

### Base Palette
- Background: #05070A (near-black)
- Surface: #0F172A (dark slate)
- Border: #1E293B
- Text: #E2E8F0 (light slate)
- Muted: #64748B

### Mode Accents
- Dev mode: #22C55E (green) — productive, focused
- Office mode: #3B82F6 (blue) — professional, calm
- Home mode: #A78BFA (purple) — ambient, warm

## Typography
- UI font: Inter (300, 400, 500, 600, 700)
- Code font: JetBrains Mono (400, 500)
- Base size: 14px
- Scale: 10, 11, 12, 14, 16, 18, 24, 32px

## Spacing
Base unit: 4px
Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48px

## Border Radius
- Small: 8px (inputs, badges)
- Medium: 12px (cards)
- Large: 16px (panels)
- Full: 9999px (pills, avatars)

## Component Standards
All interactive elements must have:
- Hover state with bg-white/5 or color shift
- Focus ring using accent color
- Disabled state at 50% opacity
- Transition duration: 150ms`,
  },
  {
    id: 'd3',
    title: 'API Integration Spec',
    lastEdited: 'Apr 3, 2026',
    icon: '⚡',
    content: `# API Integration Specification

## Authentication
All endpoints require Bearer token authentication.

\`\`\`
Authorization: Bearer <token>
Content-Type: application/json
\`\`\`

## Base URL
Production: https://api.forgeos.io/v1
Staging: https://staging-api.forgeos.io/v1

## Endpoints

### Users
GET    /users          - List all users
GET    /users/:id      - Get user by ID
POST   /users          - Create user
PUT    /users/:id      - Update user
DELETE /users/:id      - Delete user

### Workspaces
GET    /workspaces     - List workspaces
POST   /workspaces     - Create workspace
GET    /workspaces/:id - Get workspace details

### IoT Devices
GET    /devices                    - List all devices
GET    /devices/:id                - Get device state
PUT    /devices/:id/state          - Update device state
POST   /devices/:id/commands       - Send command

## Error Responses
\`\`\`json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token",
    "status": 401
  }
}
\`\`\`

## Rate Limiting
- 1000 requests/hour per API key
- 429 status returned when exceeded`,
  },
  {
    id: 'd4',
    title: 'Team Meeting Notes — Apr 7',
    lastEdited: 'Apr 7, 2026',
    icon: '📝',
    content: `# Team Meeting Notes
Date: April 7, 2026
Attendees: Sarah, Marcus, Priya, Jordan, Ava

## Agenda
1. Sprint 23 retrospective
2. Sprint 24 planning
3. Forge OS Phase 2 scope

## Sprint 23 Retro

### What went well
- Mode switching animations are smooth
- Panel resize/drag system works reliably
- Mock data is realistic and comprehensive

### What needs improvement
- Each mode still feels like the same app
- IoT features were missing from Home mode
- Office mode lacked document editing

## Sprint 24 Plan
Priority items for this sprint:
1. ✅ Dev workspace — full IDE layout
2. ✅ Office workspace — app-switcher
3. ✅ Home workspace — smart home + IoT
4. 🔲 Unit tests for new workspace components
5. 🔲 Performance profiling on animation

## Action Items
- Marcus: Set up performance benchmarking
- Priya: Finalize IoT device interaction designs
- Sarah: Update design tokens for mode accents
- Jordan: Research WebSocket approach for future real IoT
- Ava: Schedule user testing sessions for Phase 2`,
  },
  {
    id: 'd5',
    title: 'Onboarding Guide',
    lastEdited: 'Mar 28, 2026',
    icon: '👋',
    content: `# Forge OS Onboarding Guide

Welcome to Forge OS! This guide will help you get started.

## First Steps

### 1. Choose Your Mode
Forge OS has three modes, each purpose-built for a different context:

**Dev Mode** (green accent)
- Your full IDE experience
- Code editor with file tree and syntax highlighting
- Integrated terminal, git status, and API tester
- Click "Run" to start your dev server and preview in-app

**Office Mode** (blue accent)
- Your complete productivity suite
- Switch between Email, Chat, Calendar, Documents, and more
- Everything you need for a productive workday, in one place

**Home Mode** (purple accent)
- Your smart home control center
- Manage IoT devices: lights, thermostat, locks, cameras
- Track energy, manage groceries, and control scenes

### 2. Customize Your Layout
- In Dev mode: drag the pane dividers to resize panels
- All preferences are saved automatically to your browser

### 3. Getting Help
- Keyboard shortcut: Ctrl+? to show shortcuts
- Click ⚙️ in the header for settings
- File issues at github.com/forge-os/issues`,
  },
]
