import { Edit2, ThumbsUp, Trash2 } from "lucide-react"
import { Button, HighlightedText } from "@/shared/ui"
import { useUrlParams } from "../../post/lib"
import {
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "@/entities/comment/api/commentsApi"
import { useCommentsStore } from "@/entities/comment/model/useCommentsStore"
import { useSelectedCommentStore } from "../model/useSelectedCommentStore"
import type { Comment } from "@/entities/comment/model/type"
import type { Post } from "@/entities/post/model/type"

interface CommentItemProps {
  comment: Comment
  postId: Post["id"]
  changeShowEditCommentDialog: () => void
}

export const CommentItem = ({ comment, postId, changeShowEditCommentDialog }: CommentItemProps) => {
  const searchQuery = useUrlParams().search
  const { updateComment, deleteComment } = useCommentsStore()
  const { setSelectedComment } = useSelectedCommentStore()
  const { id, user, body, likes } = comment

  const handleClickLike = async () => {
    try {
      const body = { likes: (likes || 0) + 1 }
      const response = await updateCommentApi(id, body)
      const newComment = { ...response, likes: (likes || 0) + 1 }
      updateComment(postId, newComment)
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  const handleClickEdit = () => {
    setSelectedComment(comment)
    changeShowEditCommentDialog()
  }

  const handleClickDelete = async () => {
    try {
      await deleteCommentApi(id)
      deleteComment(postId, id)
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  return (
    <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{user?.username}:</span>
        <span className="truncate">
          <HighlightedText text={body} highlight={searchQuery} />
        </span>
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={handleClickLike}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={handleClickEdit}>
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleClickDelete}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}
