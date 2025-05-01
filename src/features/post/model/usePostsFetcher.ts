import { useCallback } from "react"
import { usePostsStore } from "@/entities/post/model/usePostsStore"
import { useUrlParams } from "../lib"
import { getPostsByTagWithUser, getPostsWithUser } from "../api/postsApi"

export const usePostsFetcher = () => {
  const { setIsLoading, setPosts } = usePostsStore()
  const { limit, skip } = useUrlParams()

  // 게시물 가져오기
  const fetchPostsWithUser = useCallback(async () => {
    setIsLoading(true)
    try {
      const posts = await getPostsWithUser(`?limit=${limit}&skip=${skip}`, "?limit=0&select=username,image")
      setPosts(posts)
    } catch (e) {
      console.error("게시물 가져오기 오류:", e)
    } finally {
      setIsLoading(false)
    }
  }, [limit, skip, setIsLoading, setPosts])

  // 태그별 게시물 가져오기
  const fetchPostsByTagWithUser = useCallback(
    async (tag: string) => {
      if (!tag || tag === "all") {
        fetchPostsWithUser()
        return
      }
      setIsLoading(true)
      try {
        const postsWithUsers = await getPostsByTagWithUser(tag, "?limit=0&select=username,image")
        setPosts(postsWithUsers)
      } catch (error) {
        console.error("태그별 게시물 가져오기 오류:", error)
      }
      setIsLoading(false)
    },
    [fetchPostsWithUser, setIsLoading, setPosts],
  )

  return {
    fetchPostsWithUser,
    fetchPostsByTagWithUser,
  }
}
