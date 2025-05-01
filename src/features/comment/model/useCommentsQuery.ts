import { useMutation, useQuery } from "@tanstack/react-query"

import {
  addComment as addCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "@/entities/comment/api/commentsApi"
import type { Comment } from "@/entities/comment/model/type"

export const useAddComment = () => {
  return useMutation({
    mutationFn: addCommentApi,
    onError: (e) => {
      console.error("댓글 추가 오류:", e)
    },
  })
}

export const useUpdateComment = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: Comment["id"]; body: Partial<Comment> }) => updateCommentApi(id, body),
    onError: (e) => {
      console.error("댓글 업데이트 오류:", e)
    },
  })
}

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: deleteCommentApi,
    onError: (e) => {
      console.error("댓글 삭제 오류:", e)
    },
  })
}
