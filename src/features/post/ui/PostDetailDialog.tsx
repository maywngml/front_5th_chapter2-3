import { HighlightedText } from "@/shared/ui"
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/shared/ui/Dialog"
import { CommentList } from "@/features/comment/ui"
import { usePostDialog } from "../model/PostDialogContext"
import { useUrlParams } from "../lib"
import { useSelectedPostStore } from "../model/useSelectedPostStore"

export const PostDetailDialog = () => {
  const { selectedPost } = useSelectedPostStore()
  const { isPostDetailDialogOpen, closePostDetailDialog } = usePostDialog()
  const searchQuery = useUrlParams().search

  return (
    <Dialog open={isPostDetailDialogOpen} onOpenChange={closePostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            <HighlightedText text={selectedPost?.title} highlight={searchQuery} />
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <HighlightedText text={selectedPost?.body} highlight={searchQuery} />
          </p>
          {selectedPost && <CommentList postId={selectedPost.id} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
