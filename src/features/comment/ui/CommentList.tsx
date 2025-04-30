import { Plus } from "lucide-react"
import { Button } from "@/shared/ui"
import { CommentItem } from "./CommentItem"
import { useNewCommentStore } from "@/features/comment/model/useNewCommentStore"
import { useCommentsStore } from "@/entities/comment/model/useCommentsStore"
import type { Post } from "@/entities/post/model/type"
import type { Comment } from "@/entities/comment/model/type"

interface CommentListProps {
  postId: Post["id"]
  changeShowAddCommentDialog: () => void
  changeShowEditCommentDialog: () => void
}

export const CommentList = ({ postId, changeShowAddCommentDialog, changeShowEditCommentDialog }: CommentListProps) => {
  const { comments } = useCommentsStore()
  const { updateNewCommentField } = useNewCommentStore()

  // 댓글 추가 버튼 클릭 핸들러
  const handleClickAddComment = () => {
    updateNewCommentField("postId", postId)
    changeShowAddCommentDialog()
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={handleClickAddComment}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment: Comment) => (
          <CommentItem comment={comment} postId={postId} changeShowEditCommentDialog={changeShowEditCommentDialog} />
        ))}
      </div>
    </div>
  )
}
