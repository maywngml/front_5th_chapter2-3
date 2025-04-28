import type { User } from "./user"

export interface Reactions {
  dislikes: number
  likes: number
}

export interface Post {
  id: number
  body: string
  reactions: Reactions
  tags: string[]
  title: string
  userId: number
  views: number
  author: User
}
