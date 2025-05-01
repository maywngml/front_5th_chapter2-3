import { Loading } from "@/shared/ui"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/shared/ui/Table"
import { PostTableRow } from "@/features/post/ui"
import { usePostsFetcher } from "../model/usePostsFetcher"
import { usePostsStore } from "@/entities/post/model/usePostsStore"
import { useUrlParams } from "@/features/post/lib"
import { useEffect } from "react"

export const PostTable = () => {
  const { posts, isLoading } = usePostsStore()
  const { fetchPostsWithUser, fetchPostsByTagWithUser } = usePostsFetcher()
  const { skip, limit, tag: selectedTag, sortBy, sortOrder } = useUrlParams()

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTagWithUser(selectedTag)
    } else {
      fetchPostsWithUser()
    }
  }, [skip, limit, sortBy, sortOrder, selectedTag, fetchPostsWithUser, fetchPostsByTagWithUser])

  if (isLoading) return <Loading />

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <PostTableRow post={post} key={`post-table-row-${post.id}`} />
        ))}
      </TableBody>
    </Table>
  )
}
