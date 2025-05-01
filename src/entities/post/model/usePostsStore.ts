import { create } from "zustand"
import type { Post } from "../model/type"

interface State {
  posts: Post[]
  isLoading: boolean
  total: number
}

interface Action {
  addPost: (post: Post) => void
  setPosts: (posts: State["posts"]) => void
  updatePost: (newPost: Post) => void
  deletePost: (postId: number) => void
  setIsLoading: (isLoading: boolean) => void
}

export const usePostsStore = create<State & Action>((set) => ({
  posts: [],
  isLoading: false,
  total: 0,
  addPost: (post) => set((state) => ({ ...state, posts: [post, ...state.posts] })),
  setPosts: (posts) => set(() => ({ posts, total: posts.length })),
  updatePost: (newPost) =>
    set((state) => ({ ...state, posts: state.posts.map((post) => (post.id === newPost.id ? newPost : post)) })),
  deletePost: (postId) =>
    set((state) => ({ posts: state.posts.filter((post) => post.id !== postId), total: state.total - 1 })),
  setIsLoading: (isLoading) => set((state) => ({ ...state, isLoading })),
}))
