export interface AutomationRule {
  id: string
  enabled: boolean
  group: string
  trigger: string
  action: string
  icon: string
  lastRan: string
}

export const mockAutomations: AutomationRule[] = [
  // Daily Routines
  {
    id: 'a1', enabled: true, group: 'Morning',
    trigger: 'At 06:00 on weekdays',
    action:  'Turn on kitchen lights · Heat geyser · Disable kids TV',
    icon: '☀️', lastRan: 'Today 06:00',
  },
  {
    id: 'a2', enabled: true, group: 'Bedtime',
    trigger: 'At 21:00 every day',
    action:  'Turn off all TVs · Lock doors · Arm Night security · Turn on night lights',
    icon: '🌙', lastRan: 'Last night',
  },
  // Presence
  {
    id: 'a3', enabled: true, group: 'Presence',
    trigger: 'When everyone leaves',
    action:  'Turn off lights · Turn off TV · Lock doors · Arm Away',
    icon: '🚗', lastRan: '8:45 AM today',
  },
  {
    id: 'a4', enabled: true, group: 'Presence',
    trigger: 'When first person arrives home',
    action:  'Disarm alarm · Turn on hallway lights · Set comfortable temp',
    icon: '🏠', lastRan: '3:20 PM today',
  },
  // Kids
  {
    id: 'a5', enabled: true, group: 'Kids',
    trigger: 'When a child arrives home',
    action:  'Notify parents · Save front door snapshot',
    icon: '🎒', lastRan: '3:18 PM today',
  },
  // Security
  {
    id: 'a6', enabled: false, group: 'Security',
    trigger: 'Motion detected outside after sunset',
    action:  'Turn on outside lights · Send notification · Record clip',
    icon: '🚨', lastRan: 'Never',
  },
  // Safety
  {
    id: 'a7', enabled: true, group: 'Safety',
    trigger: 'If oven is on for more than 60 minutes',
    action:  'Send reminder notification to Sifiso',
    icon: '🍳', lastRan: '3 days ago',
  },
  {
    id: 'a8', enabled: true, group: 'Safety',
    trigger: 'If power goes off',
    action:  'Notify owner · Save system state',
    icon: '⚡', lastRan: 'Never',
  },
]
