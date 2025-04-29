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
  userId: number
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
  userId: number
  views: number
}
