export type GitFileStatus = 'M' | 'A' | 'D' | 'R' | '?'

export interface GitFile {
  status: GitFileStatus
  path: string
}

export interface GitCommit {
  hash: string
  message: string
  author: string
  time: string
}

export interface GitBranch {
  name: string
  upstream: string
  ahead: number
  behind: number
}
