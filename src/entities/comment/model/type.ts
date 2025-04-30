import type { User } from "@/entities/user/model/type"
import type { Post } from "@/entities/post/model/type"

export interface Comment {
  body: string
  id: number
  postId: Post["id"] | null
  likes?: number
  userId?: User["id"]
  user?: User
}

export interface Comments {
  [key: Post["id"]]: Comment[]
}

export interface AddCommentResponse {
  body: string
  id: number
  postId: Post["id"]
  user: User
}

export interface GetCommentsResponse {
  comments: Comment[]
  limit: number
  skip: number
  total: number
}

export interface UpdateCommentResponse {
  id: number
  body: string
  likes: number
  postId: Post["id"]
  user: User
}

export interface DeleteCommentResponse {
  id: number
  body: string
  likes: number
  postId: number
  deletedOn: Date
  isDeleted: boolean
  user: User
}
