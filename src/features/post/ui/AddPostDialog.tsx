import { ChangeEvent, useState } from "react"
import { usePostDialog } from "@/features/post/model/PostDialogContext"
import { Input, Textarea, Button } from "@/shared/ui"
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/shared/ui/Dialog"
import { usePostsStore } from "@/entities/post/model/usePostsStore"
import { addPost as addPostApi } from "@/entities/post/api/postsApi"
import { NewPost } from "@/entities/post/model/type"

const initialNewPost = { title: "", body: "", userId: 1 }

export const AddPostDialog = () => {
  const { isAddPostDialogOpen, closeAddPostDialog } = usePostDialog()
  const { addPost } = usePostsStore()
  const [newPost, setNewPost] = useState<NewPost>(initialNewPost)

  // 게시물 추가
  const handleClick = async () => {
    try {
      const response = await addPostApi(newPost)
      addPost(response)
      setNewPost(initialNewPost)
      closeAddPostDialog()
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setNewPost((prevNewPost) => {
      return { ...prevNewPost, [name]: value }
    })
  }

  /* 게시물 추가 대화상자 */
  return (
    <Dialog open={isAddPostDialogOpen} onOpenChange={closeAddPostDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="제목" name="title" value={newPost.title} onChange={handleChange} />
          <Textarea rows={30} placeholder="내용" name="body" value={newPost.body} onChange={handleChange} />
          <Input type="number" placeholder="사용자 ID" name="userId" value={newPost.userId} onChange={handleChange} />
          <Button onClick={handleClick}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
