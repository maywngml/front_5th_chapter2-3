import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/shared/ui"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/Select"
import { usePostsFetcher } from "../model/usePostsFetcher"
import { useUrlParams } from "../lib"
import { usePostsStore } from "@/entities/post/model/usePostsStore"
import { getTags, fetchSearchedPosts } from "@/entities/post/api/postsApi"
import type { Tag } from "@/entities/post/model/type"

export const PostFilterSection = () => {
  const { setIsLoading, setPosts } = usePostsStore()
  const { fetchPostsWithUser, fetchPostsByTagWithUser } = usePostsFetcher()
  const { tag: selectedTag, sortBy, sortOrder, search: searchQuery, updateParams } = useUrlParams()
  const [tags, setTags] = useState<Tag[]>([])

  // 태그 가져오기
  const fetchTags = async () => {
    try {
      const data = await getTags()
      setTags(data)
    } catch (e) {
      console.error("태그 가져오기 오류:", e)
    }
  }

  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      fetchPostsWithUser()
      return
    }
    setIsLoading(true)
    try {
      const data = await fetchSearchedPosts(searchQuery)
      setPosts(data.posts)
    } catch (e) {
      console.error("게시물 검색 오류:", e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    updateParams({ search: e.target.value })
  }

  const handleKeyDownSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchPosts()
    }
  }

  const handleChangeTag = (value: string) => {
    fetchPostsByTagWithUser(value)
    updateParams({ tag: value })
  }

  const handleChangeSortBy = (value: string) => {
    updateParams({ sortBy: value })
  }

  const handleChangeSortOrder = (value: string) => {
    if (value === "asc" || value === "desc") {
      updateParams({ sortOrder: value })
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

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
          {tags.map((tag) => (
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
