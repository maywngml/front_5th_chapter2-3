import { ChangeEvent } from "react"
import { Textarea, Button } from "@/shared/ui"
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/shared/ui/Dialog"
import { useNewCommentStore } from "../model/useNewCommentStore"
import { useCommentDialog } from "../model/CommentDialogContext"
import { useCommentsStore } from "@/entities/comment/model/useCommentsStore"
import { addComment as addCommentApi } from "@/entities/comment/api/commentsApi"

export const AddCommentDialog = () => {
  const { isAddCommentDialogOpen, closeAddCommentDialog } = useCommentDialog()
  const { newComment, resetNewComment, updateNewCommentField } = useNewCommentStore()
  const { addComment } = useCommentsStore()

  // 댓글 내용 수정
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    updateNewCommentField("body", value)
  }

  // 댓글 추가
  const handleClick = async () => {
    try {
      const response = await addCommentApi(newComment)
      addComment(response.postId, response)
      closeAddCommentDialog()
      resetNewComment()
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  return (
    <Dialog open={isAddCommentDialogOpen} onOpenChange={closeAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={newComment.body} onChange={handleChange} />
          <Button onClick={handleClick}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
