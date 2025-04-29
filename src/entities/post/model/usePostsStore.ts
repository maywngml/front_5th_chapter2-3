import { create } from "zustand"
import type { Post } from "@/types/post"

interface State {
  posts: Post[]
  total: number
}

interface Action {
  addPost: (post: Post) => void
  setPosts: (posts: State["posts"], total: State["total"]) => void
  updatePost: (newPost: Post) => void
  deletePost: (postId: number) => void
}

export const usePostsStore = create<State & Action>((set) => ({
  posts: [],
  total: 0,
  addPost: (post) => set((state) => ({ ...state, posts: [...state.posts, post] })),
  setPosts: (posts, total) => set(() => ({ posts, total })),
  updatePost: (newPost) =>
    set((state) => ({ ...state, posts: state.posts.map((post) => (post.id === newPost.id ? newPost : post)) })),
  deletePost: (postId) => set((state) => ({ ...state, posts: state.posts.filter((post) => post.id !== postId) })),
}))
