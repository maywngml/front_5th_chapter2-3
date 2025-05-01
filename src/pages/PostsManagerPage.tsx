import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { PostTable } from "@/widgets/post/ui"
import { AddPostDialog, PostDetailDialog, EditPostDialog, PostFilterSection, PostPagination } from "@/features/post/ui"
import { AddCommentDialog, EditCommentDialog } from "@/features/comment/ui"
import { UserDialog } from "@/features/user/ui"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card"

import { Button, Loading } from "@/shared/ui"
import { usePostDialog } from "@/features/post/model/PostDialogContext"
import { useUrlParams } from "@/features/post/lib"
import { getPostsWithUser, getPostsByTagWithUser } from "@/features/post/api/postsApi"
import { usePostsStore } from "@/entities/post/model/usePostsStore"

const PostsManager = () => {
  // 상태 관리
  const { setPosts } = usePostsStore()
  const { openAddPostDialog } = usePostDialog()

  const { skip, limit, tag: selectedTag, sortBy, sortOrder } = useUrlParams()

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
          {/* 게시글 검색, 필터 영역 */}
          <PostFilterSection
            changePostsLoading={setLoading}
            fetchPosts={fetchPosts}
            fetchPostsByTag={fetchPostsByTag}
          />
          {/* 게시물 테이블 */}
          {loading ? <Loading /> : <PostTable />}

          {/* 페이지네이션 */}
          <PostPagination />
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
