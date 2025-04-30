import { fetchApi } from "@/shared/api/fetchApi"
import type { Post } from "@/entities/post/model/type"
import type {
  Comment,
  AddCommentResponse,
  DeleteCommentResponse,
  GetCommentsResponse,
  UpdateCommentResponse,
} from "../model/type"

export const getComments = async (postId: Post["id"]) => {
  const data = await fetchApi<GetCommentsResponse>({ method: "GET", url: `/comments/post/${postId}` })
  return data
}

export const addComment = async (comment: Omit<Comment, "id" | "likes">) => {
  const data = await fetchApi<AddCommentResponse>({ method: "POST", url: "/comments/add", body: comment })
  return data
}

export const updateComment = async (comment: Comment) => {
  const body = { body: comment.body }
  const data = await fetchApi<UpdateCommentResponse>({
    method: "PUT",
    url: `/comments/${comment.id}`,
    body,
  })
  return data
}

export const deleteComment = async (id: Comment["id"]) => {
  const data = await fetchApi<DeleteCommentResponse>({ method: "DELETE", url: `/comments/${id}` })
  return data
}
