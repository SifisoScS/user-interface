import type { LayoutMap } from '../types'

export const defaultLayouts: LayoutMap = {
  dev: [
    { i: 'terminal',            x: 0,  y: 0,  w: 12, h: 11, minW: 5, minH: 6 },
    { i: 'code-editor',         x: 12, y: 0,  w: 12, h: 11, minW: 6, minH: 6 },
    { i: 'git-status',          x: 0,  y: 11, w: 7,  h: 9,  minW: 4, minH: 5 },
    { i: 'api-tester',          x: 7,  y: 11, w: 10, h: 9,  minW: 6, minH: 6 },
    { i: 'dev-tasks',           x: 17, y: 11, w: 7,  h: 9,  minW: 4, minH: 5 },
    { i: 'browser-preview-dev', x: 0,  y: 20, w: 24, h: 11, minW: 8, minH: 6 },
  ],
  office: [
    { i: 'email-inbox', x: 0,  y: 0,  w: 8,  h: 13, minW: 5, minH: 7 },
    { i: 'team-chat',   x: 8,  y: 0,  w: 10, h: 13, minW: 6, minH: 7 },
    { i: 'calendar',    x: 18, y: 0,  w: 6,  h: 13, minW: 4, minH: 7 },
    { i: 'task-board',  x: 0,  y: 13, w: 16, h: 12, minW: 8, minH: 6 },
    { i: 'quick-notes', x: 16, y: 13, w: 8,  h: 12, minW: 4, minH: 5 },
  ],
  home: [
    { i: 'clock',                x: 0,  y: 0,  w: 8,  h: 9,  minW: 5, minH: 6 },
    { i: 'weather',              x: 8,  y: 0,  w: 8,  h: 9,  minW: 5, minH: 6 },
    { i: 'pomodoro',             x: 16, y: 0,  w: 8,  h: 9,  minW: 5, minH: 6 },
    { i: 'quick-notes',          x: 0,  y: 9,  w: 10, h: 11, minW: 4, minH: 5 },
    { i: 'system-stats',         x: 10, y: 9,  w: 7,  h: 11, minW: 4, minH: 5 },
    { i: 'browser-preview-home', x: 17, y: 9,  w: 7,  h: 11, minW: 5, minH: 6 },
  ],
}
