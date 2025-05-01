import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/shared/ui/Table"
import { PostTableRow } from "@/features/post/ui"
import { usePostsStore } from "@/entities/post/model/usePostsStore"

export const PostTable = () => {
  const { posts } = usePostsStore()

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
