import { Plus } from "lucide-react"
import { PostTable } from "@/widgets/post/ui"
import { PostFilterSection, PostPagination } from "@/features/post/ui"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card"
import { usePostDialog } from "@/features/post/model/PostDialogContext"

import { Button } from "@/shared/ui"

export const PostListSection = () => {
  const { openAddPostDialog } = usePostDialog()

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={openAddPostDialog}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 게시글 검색, 필터 영역 */}
          <PostFilterSection />
          {/* 게시물 테이블 */}
          <PostTable />
          {/* 페이지네이션 */}
          <PostPagination />
        </div>
      </CardContent>
    </Card>
  )
}
