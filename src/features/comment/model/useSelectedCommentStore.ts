import { create } from "zustand"
import type { Comment } from "@/entities/comment/model/type"

interface State {
  selectedComment: Comment | null
}

interface Action {
  setSelectedComment: (comment: Comment) => void
  updateSelectedCommentField: <K extends keyof Comment>(key: K, value: Comment[K]) => void
}

export const useSelectedCommentStore = create<State & Action>((set) => ({
  selectedComment: null,
  setSelectedComment: (comment) => set(() => ({ selectedComment: comment })),
  updateSelectedCommentField: (key, value) =>
    set((state) => {
      if (!state.selectedComment) return state
      return {
        selectedComment: {
          ...state.selectedComment,
          [key]: value,
        },
      }
    }),
}))
