export interface Email {
  id: string
  sender: string
  senderEmail: string
  subject: string
  preview: string
  body: string
  time: string
  read: boolean
  starred: boolean
  tags: string[]
}
