import { Edit2, ThumbsUp, Trash2 } from "lucide-react"
import { Button, HighlightedText } from "@/shared/ui"
import { useUrlParams } from "../../post/lib"
import { useSelectedCommentStore } from "../model/useSelectedCommentStore"
import { useCommentDialog } from "../model/CommentDialogContext"
import { useUpdateComment, useDeleteComment } from "../model/useCommentsQuery"
import { useCommentsStore } from "@/entities/comment/model/useCommentsStore"
import type { Comment, UpdateCommentResponse } from "@/entities/comment/model/type"
import type { Post } from "@/entities/post/model/type"

interface CommentItemProps {
  comment: Comment
  postId: Post["id"]
}

export const CommentItem = ({ comment, postId }: CommentItemProps) => {
  const { mutate: updateCommentMutate } = useUpdateComment()
  const { mutate: deleteCommentMutate } = useDeleteComment()
  const { openEditCommentDialog } = useCommentDialog()
  const { updateComment, deleteComment } = useCommentsStore()
  const { setSelectedComment } = useSelectedCommentStore()
  const searchQuery = useUrlParams().search
  const { id, user, body, likes } = comment

  const handleClickLike = async () => {
    const body = { likes: (likes || 0) + 1 }

    updateCommentMutate(
      { id, body },
      {
        onSuccess: (data: UpdateCommentResponse) => {
          const newComment = { ...data, likes: (likes || 0) + 1 }
          updateComment(postId, newComment)
        },
      },
    )
  }

  const handleClickEdit = () => {
    setSelectedComment(comment)
    openEditCommentDialog()
  }

  const handleClickDelete = () => {
    deleteCommentMutate(id, {
      onSuccess: () => {
        deleteComment(postId, id)
      },
    })
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
