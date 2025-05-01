import { useMutation, useQuery } from "@tanstack/react-query"

import { getComments, addComment, updateComment, deleteComment } from "@/entities/comment/api/commentsApi"
import type { Comment } from "@/entities/comment/model/type"

export const useGetComments = () => {
  return useMutation({
    mutationFn: getComments,
    onError: (e) => {
      console.error("댓글 가져오기 오류:", e)
    },
  })
}

export const useAddComment = () => {
  return useMutation({
    mutationFn: addComment,
    onError: (e) => {
      console.error("댓글 추가 오류:", e)
    },
  })
}

export const useUpdateComment = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: Comment["id"]; body: Partial<Comment> }) => updateComment(id, body),
    onError: (e) => {
      console.error("댓글 업데이트 오류:", e)
    },
  })
}

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: deleteComment,
    onError: (e) => {
      console.error("댓글 삭제 오류:", e)
    },
  })
}
