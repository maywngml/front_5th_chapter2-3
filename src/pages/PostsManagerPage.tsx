import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { AddPostDialog, PostDetailDialog, EditPostDialog, PostFilterSection, PostTableRow } from "@/features/post/ui"
import { AddCommentDialog, EditCommentDialog } from "@/features/comment/ui"
import { UserDialog } from "@/features/user/ui"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/Select"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/shared/ui/Table"
import { Button, Loading } from "@/shared/ui"
import { usePostDialog } from "@/features/post/model/PostDialogContext"
import { useUrlParams } from "@/features/post/lib"
import { getPostsWithUser, getPostsByTagWithUser } from "@/features/post/api/postsApi"
import { usePostsStore } from "@/entities/post/model/usePostsStore"

const PostsManager = () => {
  // 상태 관리
  const { posts, total, setPosts } = usePostsStore()
  const { openAddPostDialog } = usePostDialog()

  const { skip, limit, tag: selectedTag, sortBy, sortOrder, updateParams } = useUrlParams()

  const [loading, setLoading] = useState(false)

  const [showUserDialog, setShowUserDialog] = useState(false)

  // 사용자 대화상자 보기 설정
  const changeShowUserDialog = () => {
    setShowUserDialog((prevShowUserDialog) => !prevShowUserDialog)
  }

  // 게시물 가져오기
  const fetchPosts = async () => {
    setLoading(true)
    try {
      const posts = await getPostsWithUser(`?limit=${limit}&skip=${skip}`, "?limit=0&select=username,image")
      setPosts(posts)
    } catch (e) {
      console.error("게시물 가져오기 오류:", e)
    } finally {
      setLoading(false)
    }
  }

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const postsWithUsers = await getPostsByTagWithUser(tag, "?limit=0&select=username,image")
      setPosts(postsWithUsers)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
    }
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  // 게시물 테이블 렌더링
  const renderPostTable = () => (
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

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={openAddPostDialog}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <PostFilterSection
            changePostsLoading={setLoading}
            fetchPosts={fetchPosts}
            fetchPostsByTag={fetchPostsByTag}
          />
          {/* 게시물 테이블 */}
          {loading ? <Loading /> : renderPostTable()}

          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <Select value={limit.toString()} onValueChange={(value) => updateParams({ limit: Number(value) })}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                </SelectContent>
              </Select>
              <span>항목</span>
            </div>
            <div className="flex gap-2">
              <Button disabled={skip === 0} onClick={() => updateParams({ skip: Math.max(0, skip - limit) })}>
                이전
              </Button>
              <Button disabled={skip + limit >= total} onClick={() => updateParams({ skip: skip + limit })}>
                다음
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* 게시글 추가 대화상자 */}
      <AddPostDialog />
      {/* 게시글 수정 대화상자 */}
      <EditPostDialog />
      {/* 댓글 추가 대화상자 */}
      <AddCommentDialog />
      {/* 댓글 수정 대화상자 */}
      <EditCommentDialog />
      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog />
      {/* 사용자 정보 대화상자 */}
      <UserDialog isOpen={showUserDialog} onChangeOpen={changeShowUserDialog} />
    </Card>
  )
}

export default PostsManager
