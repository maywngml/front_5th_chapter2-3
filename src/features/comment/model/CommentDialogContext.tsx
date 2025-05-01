import { createContext, useState, useCallback, useContext, useMemo, ReactNode } from "react"

interface CommentDialogContextType {
  isAddCommentDialogOpen: boolean
  openAddCommentDialog: () => void
  closeAddCommentDialog: () => void
  isEditCommentDialogOpen: boolean
  openEditCommentDialog: () => void
  closeEditCommentDialog: () => void
}

const CommentDialogContext = createContext<CommentDialogContextType | undefined>(undefined)

export const CommentDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isAddCommentDialogOpen, setIsAddCommentDialogOpen] = useState<boolean>(false)
  const [isEditCommentDialogOpen, setIsEditCommentDialogOpen] = useState<boolean>(false)

  const openAddCommentDialog = useCallback(() => {
    setIsAddCommentDialogOpen(true)
  }, [setIsAddCommentDialogOpen])

  const closeAddCommentDialog = useCallback(() => {
    setIsAddCommentDialogOpen(false)
  }, [setIsAddCommentDialogOpen])

  const openEditCommentDialog = useCallback(() => {
    setIsEditCommentDialogOpen(true)
  }, [setIsEditCommentDialogOpen])

  const closeEditCommentDialog = useCallback(() => {
    setIsEditCommentDialogOpen(false)
  }, [setIsEditCommentDialogOpen])

  const contextValue: CommentDialogContextType = useMemo(
    () => ({
      isAddCommentDialogOpen,
      isEditCommentDialogOpen,
      openAddCommentDialog,
      closeAddCommentDialog,
      openEditCommentDialog,
      closeEditCommentDialog,
    }),
    [
      isAddCommentDialogOpen,
      isEditCommentDialogOpen,
      openAddCommentDialog,
      closeAddCommentDialog,
      openEditCommentDialog,
      closeEditCommentDialog,
    ],
  )

  return <CommentDialogContext.Provider value={contextValue}>{children}</CommentDialogContext.Provider>
}

export const useCommentDialog = () => {
  const context = useContext(CommentDialogContext)
  if (context === undefined) {
    throw new Error("useCommentDialogContext must be used within an NotificationProvider")
  }
  return context
}
