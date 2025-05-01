import { createContext, useState, useCallback, useContext, useMemo, ReactNode } from "react"

interface PostDialogContextType {
  isAddPostDialogOpen: boolean
  isEditPostDialogOpen: boolean
  isPostDetailDialogOpen: boolean
  openAddPostDialog: () => void
  closeAddPostDialog: () => void
  openEditPostDialog: () => void
  closeEditPostDialog: () => void
  openPostDetailDialog: () => void
  closePostDetailDialog: () => void
}

const PostDialogContext = createContext<PostDialogContextType | undefined>(undefined)

export const PostDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isAddPostDialogOpen, setIsAddPostDialogOpen] = useState<boolean>(false)
  const [isEditPostDialogOpen, setIsEditPostDialogOpen] = useState<boolean>(false)
  const [isPostDetailDialogOpen, setIsPostDetailDialogOpen] = useState<boolean>(false)

  const openAddPostDialog = useCallback(() => {
    setIsAddPostDialogOpen(true)
  }, [setIsAddPostDialogOpen])

  const closeAddPostDialog = useCallback(() => {
    setIsAddPostDialogOpen(false)
  }, [setIsAddPostDialogOpen])

  const openEditPostDialog = useCallback(() => {
    setIsEditPostDialogOpen(true)
  }, [setIsEditPostDialogOpen])

  const closeEditPostDialog = useCallback(() => {
    setIsEditPostDialogOpen(false)
  }, [setIsEditPostDialogOpen])

  const openPostDetailDialog = useCallback(() => {
    setIsPostDetailDialogOpen(true)
  }, [setIsPostDetailDialogOpen])

  const closePostDetailDialog = useCallback(() => {
    setIsPostDetailDialogOpen(false)
  }, [setIsPostDetailDialogOpen])

  const contextValue: PostDialogContextType = useMemo(
    () => ({
      isAddPostDialogOpen,
      isEditPostDialogOpen,
      isPostDetailDialogOpen,
      openAddPostDialog,
      closeAddPostDialog,
      openEditPostDialog,
      closeEditPostDialog,
      openPostDetailDialog,
      closePostDetailDialog,
    }),
    [
      isAddPostDialogOpen,
      isEditPostDialogOpen,
      isPostDetailDialogOpen,
      openAddPostDialog,
      closeAddPostDialog,
      openEditPostDialog,
      closeEditPostDialog,
      openPostDetailDialog,
      closePostDetailDialog,
    ],
  )

  return <PostDialogContext.Provider value={contextValue}>{children}</PostDialogContext.Provider>
}

export const usePostDialog = () => {
  const context = useContext(PostDialogContext)
  if (context === undefined) {
    throw new Error("usePostDialogContext must be used within a PostDialogProvider")
  }
  return context
}
