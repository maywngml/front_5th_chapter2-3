import { fetchApi } from "@/shared/api/fetchApi"
import type { AddPostResponse, GetPostsResponse, UpdatePostResponse, DeletePostResponse, Post } from "../model/type"

export const getPosts = async (params: string) => {
  const data = await fetchApi<GetPostsResponse>({ method: "GET", url: `/posts${params}` })
  return data
}

export const addPost = async (newPost: Post) => {
  const data = await fetchApi<AddPostResponse>({ method: "POST", url: `/posts/add`, body: newPost })
  return data
}

export const updatePost = async (selectedPost: Post) => {
  const data = await fetchApi<UpdatePostResponse>({
    method: "PATCH",
    url: `/api/posts/${selectedPost.id}`,
    body: selectedPost,
  })
  return data
}

export const deletePost = async (postId: Post["id"]) => {
  const data = await fetchApi<DeletePostResponse>({ method: "DELETE", url: `/posts${postId}` })
  return data
}
