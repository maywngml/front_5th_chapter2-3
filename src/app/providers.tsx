import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { CommentDialogProvider } from "@/features/comment/model/CommentDialogContext"
import { PostDialogProvider } from "@/features/post/model/PostDialogContext"
import { UserDialogProvider } from "@/features/user/model/UserDialogContext"

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <CommentDialogProvider>
        <PostDialogProvider>
          <UserDialogProvider>{children}</UserDialogProvider>
        </PostDialogProvider>
      </CommentDialogProvider>
    </QueryClientProvider>
  )
}
