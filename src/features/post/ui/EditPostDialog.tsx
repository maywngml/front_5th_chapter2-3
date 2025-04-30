import { Input, Textarea, Button } from "@/shared/ui"
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/shared/ui/Dialog"
import { useSelectedPostStore } from "../model/useSelectedPostStore"
import { usePostsStore } from "@/entities/post/model/usePostsStore"
import { updatePost as updatePostApi } from "@/entities/post/api/postsApi"
import { ChangeEvent } from "react"
import type { Post } from "@/entities/post/model/type"

export interface EditPostDialogProps {
  isOpen: boolean
  onChangeOpen: () => void
}

// 게시물 수정 대화상자
export const EditPostDialog = ({ isOpen, onChangeOpen }: EditPostDialogProps) => {
  const { selectedPost, updateSelectedPostField } = useSelectedPostStore()
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
      onChangeOpen()
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onChangeOpen}>
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
