import { useMutation, useQuery } from "@tanstack/react-query"
import {
  addPost,
  updatePost,
  deletePost,
  getTags,
  getPostsByTag,
  fetchSearchedPosts,
} from "@/entities/post/api/postsApi"

const tagQueryKeys = {
  all: ["tag"] as const,
  search: () => [...tagQueryKeys.all, "search"] as const,
}
// 게시물 추가
export const useAddPost = () => {
  return useMutation({
    mutationFn: addPost,
    onError: (e) => {
      console.error("게시물 추가 오류:", e)
    },
  })
}
// 게시물 업데이트
export const useUpdatePost = () => {
  return useMutation({
    mutationFn: updatePost,
    onError: (e) => {
      console.error("게시물 업데이트 오류:", e)
    },
  })
}
// 게시물 삭제
export const useDeletePost = () => {
  return useMutation({
    mutationFn: deletePost,
    onError: (e) => {
      console.error("게시물 삭제 오류:", e)
    },
  })
}
// 게시물 검색 결과 조회
export const useFetchSearchedPosts = () => {
  return useMutation({
    mutationFn: fetchSearchedPosts,
    onError: (e) => {
      console.error("게시물 검색 오류:", e)
    },
  })
}
// 태그 조회
export const useGetTags = () => {
  return useQuery({
    queryKey: [...tagQueryKeys.all],
    queryFn: () => getTags(),
  })
}
// 태그로 게시물 조회
export const useGetPostsTags = (tag: string) => {
  return useQuery({
    queryKey: [tagQueryKeys.search(), tag],
    queryFn: () => getPostsByTag(tag),
    enabled: tag !== "all" && !!tag,
  })
}
