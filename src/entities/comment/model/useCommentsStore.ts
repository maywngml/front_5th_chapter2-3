import { create } from "zustand"
import type { Comment, Comments } from "../model/type"
import type { Post } from "@/entities/post/model/type"

interface State {
  comments: Comments
}

interface Action {
  addComment: (postId: Post["id"], comment: Comment) => void
  setComments: (postId: Post["id"], comments: Comment[]) => void
  updateComment: (postId: Post["id"], newComment: Comment) => void
  deleteComment: (postId: Post["id"], commentId: Comment["id"]) => void
}

export const useCommentsStore = create<State & Action>((set) => ({
  comments: {},
  addComment: (postId, comment) =>
    set((state) => ({ comments: { ...state.comments, [postId]: [...(state.comments[postId] || []), comment] } })),
  setComments: (postId, comments) => set((state) => ({ comments: { ...state.comments, [postId]: comments } })),
  updateComment: (postId, newComment) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: state.comments[postId].map((comment) => (comment.id === newComment.id ? newComment : comment)),
      },
    })),
  deleteComment: (postId, commentId) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: state.comments[postId].filter((comment) => comment.id !== commentId),
      },
    })),
}))
