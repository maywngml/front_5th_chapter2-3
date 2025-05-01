import { useCallback } from "react"
import { useGetPostsWithUser, useGetPostsByTagWithUser } from "./usePostsQuery"
import { usePostsStore } from "@/entities/post/model/usePostsStore"
import { useUrlParams } from "../lib"

export const usePostsFetcher = () => {
  const { mutate: getPostsWithUserMutate } = useGetPostsWithUser()
  const { mutate: getPostsByTagWithUserMutate } = useGetPostsByTagWithUser()
  const { setIsLoading, setPosts } = usePostsStore()
  const { limit, skip } = useUrlParams()

  // 게시물 가져오기
  const fetchPostsWithUser = useCallback(() => {
    setIsLoading(true)

    getPostsWithUserMutate(
      {
        postParams: `?limit=${limit}&skip=${skip}`,
        userParams: "?limit=0&select=username,image",
      },
      {
        onSuccess: (data) => {
          setPosts(data)
        },
        onSettled: () => {
          setIsLoading(false)
        },
      },
    )
  }, [limit, skip, setIsLoading, setPosts])

  // 태그별 게시물 가져오기
  const fetchPostsByTagWithUser = useCallback(
    (tag: string) => {
      if (!tag || tag === "all") {
        fetchPostsWithUser()
        return
      }

      setIsLoading(true)
      getPostsByTagWithUserMutate(
        {
          tag,
          userParams: "?limit=0&select=username,image",
        },
        {
          onSuccess: (data) => {
            setPosts(data)
          },
          onSettled: () => {
            setIsLoading(false)
          },
        },
      )
    },
    [fetchPostsWithUser, setIsLoading, setPosts],
  )

  return {
    fetchPostsWithUser,
    fetchPostsByTagWithUser,
  }
}
