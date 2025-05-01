import { useState } from "react"
import { PostListSection } from "@/widgets/post/ui"
import { AddPostDialog, PostDetailDialog, EditPostDialog } from "@/features/post/ui"
import { AddCommentDialog, EditCommentDialog } from "@/features/comment/ui"
import { UserDialog } from "@/features/user/ui"

const PostsManager = () => {
  // 상태 관리
  const [showUserDialog, setShowUserDialog] = useState(false)

  // 사용자 대화상자 보기 설정
  const changeShowUserDialog = () => {
    setShowUserDialog((prevShowUserDialog) => !prevShowUserDialog)
  }

  return (
    <div>
      <PostListSection />
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
    </div>
  )
}

export default PostsManager
