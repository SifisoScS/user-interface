import { useState } from 'react'
import { mockAutomations } from '../../../data/mockAutomations'
import type { AutomationRule } from '../../../data/mockAutomations'

const ACCENT = '#2563EB'

export function AutomationsTab() {
  const [rules, setRules] = useState<AutomationRule[]>(mockAutomations)

  const toggle = (id: string) =>
    setRules(rs => rs.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r))

  // Group rules by group label
  const groups = rules.reduce<Record<string, AutomationRule[]>>((acc, r) => {
    if (!acc[r.group]) acc[r.group] = []
    acc[r.group].push(r)
    return acc
  }, {})

  return (
    <div className="h-full overflow-auto">
      <div className="p-6 max-w-2xl">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold" style={{ color: '#E2E8F0' }}>Your Home Rules ⚡</h2>
          <p className="text-sm mt-1" style={{ color: '#64748B' }}>Tap the toggle to enable or disable any automation.</p>
        </div>

        {/* Groups */}
        <div className="space-y-6">
          {Object.entries(groups).map(([group, groupRules]) => (
            <div key={group}>
              <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#475569' }}>
                {group}
              </div>
              <div className="space-y-2">
                {groupRules.map(rule => (
                  <AutomationRuleCard key={rule.id} rule={rule} onToggle={toggle} />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

function AutomationRuleCard({ rule, onToggle }: { rule: AutomationRule; onToggle: (id: string) => void }) {
  return (
    <div
      className="flex items-center gap-4 rounded-2xl p-4 transition-all"
      style={{
        backgroundColor: '#1E293B',
        border: '1px solid #334155',
        opacity: rule.enabled ? 1 : 0.55,
      }}
    >
      {/* Emoji icon */}
      <div
        className="flex items-center justify-center rounded-2xl shrink-0"
        style={{
          width: '44px',
          height: '44px',
          backgroundColor: rule.enabled ? `${ACCENT}18` : '#334155',
          fontSize: '20px',
        }}
      >
        {rule.icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium" style={{ color: '#E2E8F0' }}>
          {rule.trigger}
          <span style={{ color: '#475569' }}> →</span>
        </div>
        <div className="text-xs mt-0.5 truncate" style={{ color: '#64748B' }}>{rule.action}</div>
        <div className="text-xs mt-1" style={{ color: '#334155' }}>Last ran: {rule.lastRan}</div>
      </div>

      {/* Toggle */}
      <ToggleSwitch on={rule.enabled} onChange={() => onToggle(rule.id)} />
    </div>
  )
}

function ToggleSwitch({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="relative rounded-full transition-all duration-200 shrink-0"
      style={{
        width: '36px',
        height: '20px',
        backgroundColor: on ? ACCENT : '#334155',
        border: `1px solid ${on ? ACCENT + '80' : '#334155'}`,
      }}
    >
      <div
        className="absolute top-0.5 rounded-full transition-all duration-200 bg-white"
        style={{ width: '16px', height: '16px', left: on ? '17px' : '1px' }}
      />
    </button>
  )
}
