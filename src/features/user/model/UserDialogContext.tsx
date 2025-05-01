import { createContext, useState, useCallback, useContext, useMemo, ReactNode } from "react"

interface UserDialogContextType {
  isUserDialogOpen: boolean
  openUserDialog: () => void
  closeUserDialog: () => void
}

const UserDialogContext = createContext<UserDialogContextType | undefined>(undefined)

export const UserDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isUserDialogOpen, setIsUserDialogOpen] = useState<boolean>(false)

  const openUserDialog = useCallback(() => {
    setIsUserDialogOpen(true)
  }, [setIsUserDialogOpen])

  const closeUserDialog = useCallback(() => {
    setIsUserDialogOpen(false)
  }, [setIsUserDialogOpen])

  const contextValue: UserDialogContextType = useMemo(
    () => ({
      isUserDialogOpen,

      openUserDialog,
      closeUserDialog,
    }),
    [isUserDialogOpen, openUserDialog, closeUserDialog],
  )

  return <UserDialogContext.Provider value={contextValue}>{children}</UserDialogContext.Provider>
}

export const useUserDialog = () => {
  const context = useContext(UserDialogContext)
  if (context === undefined) {
    throw new Error("useUserDialogContext must be used within an UserDialogProvider")
  }
  return context
}
