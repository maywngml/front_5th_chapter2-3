import { ChangeEvent } from "react"
import { Textarea, Button } from "@/shared/ui"
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/shared/ui/Dialog"
import { useSelectedCommentStore } from "../model/useSelectedCommentStore"
import { useCommentDialog } from "../model/CommentDialogContext"
import { useCommentsStore } from "@/entities/comment/model/useCommentsStore"
import { updateComment as updateCommentApi } from "@/entities/comment/api/commentsApi"
import type { Comment } from "@/entities/comment/model/type"

// 댓글 수정 대화 상자
export const EditCommentDialog = () => {
  const { isEditCommentDialogOpen, closeEditCommentDialog } = useCommentDialog()
  const { selectedComment, updateSelectedCommentField } = useSelectedCommentStore()
  const { updateComment } = useCommentsStore()

  // textarea 수정 핸들러 함수
  // 선택된 댓글의 특정 필드 수정
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!selectedComment) return

    const { name, value } = e.target
    updateSelectedCommentField(name as keyof Comment, value)
  }

  // 댓글 업데이트
  const handleClick = async () => {
    if (!selectedComment) return

    try {
      const response = await updateCommentApi(selectedComment.id, { body: selectedComment.body })
      updateComment(response.postId, selectedComment)
      closeEditCommentDialog()
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  return (
    <Dialog open={isEditCommentDialogOpen} onOpenChange={closeEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" name="body" value={selectedComment?.body || ""} onChange={handleChange} />
          <Button onClick={handleClick}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
