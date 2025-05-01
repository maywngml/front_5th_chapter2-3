import { Input, Textarea, Button } from "@/shared/ui"
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/shared/ui/Dialog"
import { useSelectedPostStore } from "../model/useSelectedPostStore"
import { usePostDialog } from "../model/PostDialogContext"
import { usePostsStore } from "@/entities/post/model/usePostsStore"
import { updatePost as updatePostApi } from "@/entities/post/api/postsApi"
import { ChangeEvent } from "react"
import type { Post } from "@/entities/post/model/type"

// 게시물 수정 대화상자
export const EditPostDialog = () => {
  const { selectedPost, updateSelectedPostField } = useSelectedPostStore()
  const { isEditPostDialogOpen, closeEditPostDialog } = usePostDialog()
  const { updatePost } = usePostsStore()

  // input, textarea 수정 핸들러 함수
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!selectedPost) return

    const { name, value } = e.target
    updateSelectedPostField(name as keyof Post, value)
  }

  // 게시물 업데이트
  const handleClick = async () => {
    if (!selectedPost) return

    try {
      const response = await updatePostApi(selectedPost)
      updatePost(response)
      closeEditPostDialog()
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  return (
    <Dialog open={isEditPostDialogOpen} onOpenChange={closeEditPostDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="제목" name="title" value={selectedPost?.title || ""} onChange={handleChange} />
          <Textarea rows={15} placeholder="내용" name="body" value={selectedPost?.body || ""} onChange={handleChange} />
          <Button onClick={handleClick}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
