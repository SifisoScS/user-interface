export type AlertType = 'motion' | 'climate' | 'battery' | 'lock' | 'info'

export interface HomeAlert {
  id: string
  type: AlertType
  title: string
  detail: string
  time: string
  dismissed: boolean
}

export const defaultAlerts: HomeAlert[] = [
  { id: 'a1', type: 'motion',  title: 'Motion detected',       detail: 'Front Door camera — 8:42 AM',         time: '8:42 AM',  dismissed: false },
  { id: 'a2', type: 'climate', title: 'Target temp reached',   detail: 'Thermostat: 22°C achieved',           time: '7:55 AM',  dismissed: false },
  { id: 'a3', type: 'battery', title: 'Low battery',           detail: 'Bedroom door sensor — 12% remaining', time: '7:10 AM',  dismissed: false },
]
