import { create } from "zustand"
import type { NewComment } from "./type"

interface State {
  newComment: NewComment
}

interface Action {
  setNewComment: (post: NewComment) => void
  resetNewComment: () => void
  updateNewCommentField: <K extends keyof NewComment>(key: K, value: NewComment[K]) => void
}

const initialNewComment = { body: "", postId: null, userId: 1 }

export const useNewCommentStore = create<State & Action>((set) => ({
  newComment: initialNewComment,
  setNewComment: (comment) => set(() => ({ newComment: comment })),
  resetNewComment: () => set(() => ({ newComment: initialNewComment })),
  updateNewCommentField: (key, value) =>
    set((state) => ({
      newComment: {
        ...state.newComment,
        [key]: value,
      },
    })),
}))
