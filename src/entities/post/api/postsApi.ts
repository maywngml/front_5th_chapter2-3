import { fetchApi } from "@/shared/api/fetchApi"
import type { GetPostsResponse, UpdatePostResponse, DeletePostResponse, Post, NewPost } from "../model/type"

export const getPosts = async (params: string) => {
  const data = await fetchApi<GetPostsResponse>({ method: "GET", url: `/posts${params}` })
  return data
}

export const addPost = async (newPost: NewPost) => {
  const data = await fetchApi<Post>({ method: "POST", url: `/posts/add`, body: newPost })
  return data
}

export const updatePost = async (selectedPost: Post) => {
  const data = await fetchApi<UpdatePostResponse>({
    method: "PATCH",
    url: `/posts/${selectedPost.id}`,
    body: selectedPost,
  })
  return data
}

export const deletePost = async (id: Post["id"]) => {
  const data = await fetchApi<DeletePostResponse>({ method: "DELETE", url: `/posts${id}` })
  return data
}
