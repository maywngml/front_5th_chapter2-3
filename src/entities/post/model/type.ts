import type { User } from "@/entities/user/model/type"

export interface Reactions {
  dislikes: number
  likes: number
}

export interface Post {
  id: number
  body: string
  title: string
  userId: User["id"]
  reactions?: Reactions
  tags?: string[]
  views?: number
}

export interface NewPost {
  userId: User["id"]
  title: string
  body: string
}

export interface GetPostsResponse {
  limit: number
  posts: Post[]
  skip: number
  total: number
}

export interface AddPostResponse {
  id: number
  body: string
  title: string
  userId: User["id"]
}

export type UpdatePostResponse = Omit<"Post", "views">

export interface DeletePostResponse {
  body: string
  deletedOn: string
  id: number
  isDeleted: true
  reactions: Reactions
  tags: string[]
  title: string
  userId: User["id"]
  views: number
}
