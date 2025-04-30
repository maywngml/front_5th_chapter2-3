import { create } from "zustand"
import type { Post } from "@/entities/post/model/type"

interface State {
  selectedPost: Post | null
}

interface Action {
  setSelectedPost: (post: Post) => void
  updateSelectedPostField: <K extends keyof Post>(key: K, value: Post[K]) => void
}

export const useSelectedPostStore = create<State & Action>((set) => ({
  selectedPost: null,
  setSelectedPost: (post) => set(() => ({ selectedPost: post })),
  updateSelectedPostField: (key, value) =>
    set((state) => {
      if (!state.selectedPost) return state
      return {
        selectedPost: {
          ...state.selectedPost,
          [key]: value,
        },
      }
    }),
}))
