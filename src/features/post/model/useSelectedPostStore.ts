import { create } from "zustand"
import type { Post } from "@/entities/post/model/type"

interface State {
  selectedPost: Post | null
}

interface Action {
  setSelectedPost: (post: Post) => void
}

export const useSelectedPostStore = create<State & Action>((set) => ({
  selectedPost: null,
  setSelectedPost: (post) => set(() => ({ selectedPost: post })),
}))
