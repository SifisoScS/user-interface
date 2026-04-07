export interface ChatMessage {
  id: string
  channelId: string
  author: string
  avatar: string
  content: string
  time: string
  isOwn: boolean
}

export interface Channel {
  id: string
  name: string
  unread: number
}
