import { ReactNode } from "react"
import { CommentDialogProvider } from "@/features/comment/model/CommentDialogContext"
import { PostDialogProvider } from "@/features/post/model/PostDialogContext"
import { UserDialogProvider } from "@/features/user/model/UserDialogContext"

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <CommentDialogProvider>
      <PostDialogProvider>
        <UserDialogProvider>{children}</UserDialogProvider>
      </PostDialogProvider>
    </CommentDialogProvider>
  )
}
