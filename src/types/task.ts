export type Priority = 'high' | 'medium' | 'low'
export type KanbanStatus = 'todo' | 'in-progress' | 'done'

export interface Task {
  id: string
  title: string
  done: boolean
  priority: Priority
}

export interface KanbanCard {
  id: string
  title: string
  description: string
  priority: Priority
  status: KanbanStatus
  assignee: string
}
