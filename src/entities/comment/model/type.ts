import type { User } from "@/entities/user/model/type"
import type { Post } from "@/entities/post/model/type"

export interface Comment {
  body: string
  id: number
  likes: number
  postId: Post["id"]
  userId: User["id"]
  user?: User
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
