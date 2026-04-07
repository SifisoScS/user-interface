import { useState } from 'react'
import { CheckSquare, Plus } from 'lucide-react'
import { PanelWrapper } from '../../panels/PanelWrapper'
import { mockTasks } from '../../../data'
import type { Task, Priority } from '../../../types'

const PRIORITY_STYLES: Record<Priority, { backgroundColor: string; color: string }> = {
  high:   { backgroundColor: 'rgba(239,68,68,0.15)',   color: '#EF4444' },
  medium: { backgroundColor: 'rgba(245,158,11,0.15)',  color: '#F59E0B' },
  low:    { backgroundColor: 'rgba(100,116,139,0.15)', color: '#64748B' },
}

export function DevTasks() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [newTask, setNewTask] = useState('')

  const toggle = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const addTask = () => {
    if (!newTask.trim()) return
    setTasks(prev => [...prev, {
      id: Date.now().toString(),
      title: newTask.trim(),
      done: false,
      priority: 'medium',
    }])
    setNewTask('')
  }

  const done = tasks.filter(t => t.done).length
  const progress = tasks.length ? (done / tasks.length) * 100 : 0

  return (
    <PanelWrapper id="dev-tasks" label="Tasks" icon={CheckSquare}>
      <div className="h-full flex flex-col p-3 gap-3 text-xs overflow-hidden">
        {/* Progress */}
        <div>
          <div className="flex justify-between mb-1.5" style={{ color: '#64748B' }}>
            <span>{done}/{tasks.length} completed</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#1E293B' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, backgroundColor: '#3B82F6' }}
            />
          </div>
        </div>

        {/* Tasks list */}
        <div className="flex-1 overflow-auto space-y-1 min-h-0">
          {tasks.map(task => (
            <div
              key={task.id}
              className="flex items-start gap-2 px-2 py-1.5 rounded-xl cursor-pointer
                         transition-colors hover:bg-white/5"
              onClick={() => toggle(task.id)}
            >
              <div
                className="flex items-center justify-center w-4 h-4 rounded-md border shrink-0 mt-0.5 transition-all"
                style={{
                  borderColor: task.done ? '#3B82F6' : '#1E293B',
                  backgroundColor: task.done ? '#3B82F6' : 'transparent',
                }}
              >
                {task.done && (
                  <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                    <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span
                className="flex-1 leading-5"
                style={{
                  color: task.done ? '#64748B' : '#E2E8F0',
                  textDecoration: task.done ? 'line-through' : 'none',
                }}
              >
                {task.title}
              </span>
              <span
                className="shrink-0 px-1.5 py-0.5 rounded-md text-xs"
                style={PRIORITY_STYLES[task.priority]}
              >
                {task.priority}
              </span>
            </div>
          ))}
        </div>

        {/* Add task */}
        <div
          className="flex items-center gap-2 border-t pt-2"
          style={{ borderColor: '#1E293B' }}
        >
          <input
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTask()}
            placeholder="Add a task…"
            className="flex-1 bg-transparent outline-none text-xs"
            style={{ color: '#E2E8F0' }}
          />
          <button
            onClick={addTask}
            className="flex items-center justify-center w-6 h-6 rounded-lg transition-colors
                       hover:bg-white/10"
            style={{ color: '#3B82F6' }}
          >
            <Plus size={13} />
          </button>
        </div>
      </div>
    </PanelWrapper>
  )
}
