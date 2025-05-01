import { ChangeEvent, KeyboardEvent } from "react"
import { Search } from "lucide-react"
import { Input } from "@/shared/ui"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/Select"
import { usePostsFetcher } from "../model/usePostsFetcher"
import { useGetTags, useFetchSearchedPosts } from "../model/usePostsQuery"
import { useUrlParams } from "../lib"
import { usePostsStore } from "@/entities/post/model/usePostsStore"
import type { GetPostsResponse } from "@/entities/post/model/type"

export const PostFilterSection = () => {
  const { data: tags } = useGetTags()
  const { mutate: fetchSearchedPosts } = useFetchSearchedPosts()
  const { setIsLoading, setPosts } = usePostsStore()
  const { fetchPostsWithUser, fetchPostsByTagWithUser } = usePostsFetcher()
  const { tag: selectedTag, sortBy, sortOrder, search: searchQuery, updateParams } = useUrlParams()

  // 게시물 검색
  const searchPosts = () => {
    if (!searchQuery) {
      fetchPostsWithUser()
      return
    }
    setIsLoading(true)

    fetchSearchedPosts(searchQuery, {
      onSuccess: (data: GetPostsResponse) => {
        setPosts(data.posts)
      },
      onSettled: () => {
        setIsLoading(false)
      },
    })
  }

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    updateParams({ search: e.target.value })
  }

  const handleChangeTag = (value: string) => {
    updateParams({ tag: value })
    fetchPostsByTagWithUser(value)
  }

  const handleKeyDownSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchPosts()
    }
  }

  const handleChangeSortBy = (value: string) => {
    updateParams({ sortBy: value })
  }

  const handleChangeSortOrder = (value: string) => {
    if (value === "asc" || value === "desc") {
      updateParams({ sortOrder: value })
    }
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={searchQuery}
            onChange={handleChangeSearch}
            onKeyDown={handleKeyDownSearch}
          />
        </div>
      </div>
      <Select value={selectedTag} onValueChange={handleChangeTag}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tags?.map((tag) => (
            <SelectItem key={tag.url} value={tag.slug}>
              {tag.slug}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={sortBy} onValueChange={handleChangeSortBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">없음</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="reactions">반응</SelectItem>
        </SelectContent>
      </Select>
      <Select value={sortOrder} onValueChange={handleChangeSortOrder}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">오름차순</SelectItem>
          <SelectItem value="desc">내림차순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
