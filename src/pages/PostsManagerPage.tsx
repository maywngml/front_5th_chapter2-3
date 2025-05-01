import { useEffect, useState } from "react"
import { Edit2, MessageSquare, Plus, Search, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { AddPostDialog, PostDetailDialog, EditPostDialog, PostTableRow } from "@/features/post/ui"
import { AddCommentDialog, EditCommentDialog } from "@/features/comment/ui"
import { UserDialog } from "@/features/user/ui"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/Select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/Table"
import { Button, Input, Loading } from "@/shared/ui"
import { useSelectedPostStore } from "@/features/post/model/useSelectedPostStore"
import { usePostDialog } from "@/features/post/model/PostDialogContext"
import { useSelectedUserStore } from "@/features/user/model"
import { useUrlParams } from "@/features/post/lib"
import { getPostsWithUser, getPostsByTagWithUser } from "@/features/post/api/postsApi"
import { usePostsStore } from "@/entities/post/model/usePostsStore"
import { useCommentsStore } from "@/entities/comment/model/useCommentsStore"
import { getUser } from "@/entities/user/api/usersApi"
import { deletePost as deletePostApi, getTags, fetchSearchedPosts } from "@/entities/post/api/postsApi"
import { getComments } from "@/entities/comment/api/commentsApi"

const PostsManager = () => {
  // 상태 관리
  const { posts, total, setPosts, deletePost } = usePostsStore()
  const { setSelectedPost } = useSelectedPostStore()
  const { comments, setComments } = useCommentsStore()
  const { setSelectedUser } = useSelectedUserStore()
  const { openAddPostDialog, openEditPostDialog, openPostDetailDialog } = usePostDialog()

  const { skip, limit, search: searchQuery, tag: selectedTag, sortBy, sortOrder, updateParams } = useUrlParams()

  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [showUserDialog, setShowUserDialog] = useState(false)

  // 댓글 추가 대화상자 보기 설정
  const changeShowAddCommentDialog = () => {
    setShowAddCommentDialog((prevShowAddCommentDialog) => !prevShowAddCommentDialog)
  }

  // 댓글 수정 대화상자 보기 설정
  const changeShowEditCommentDialog = () => {
    setShowEditCommentDialog((prevShowEditCommentDialog) => !prevShowEditCommentDialog)
  }

  // 사용자 대화상자 보기 설정
  const changeShowUserDialog = () => {
    setShowUserDialog((prevShowUserDialog) => !prevShowUserDialog)
  }

  // 게시물 가져오기
  const fetchPosts = async () => {
    setLoading(true)
    try {
      const posts = await getPostsWithUser(`?limit=${limit}&skip=${skip}`, "?limit=0&select=username,image")
      setPosts(posts)
    } catch (e) {
      console.error("게시물 가져오기 오류:", e)
    } finally {
      setLoading(false)
    }
  }

  // 태그 가져오기
  const fetchTags = async () => {
    try {
      const data = await getTags()
      console.log(data)
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const data = await fetchSearchedPosts(searchQuery)
      setPosts(data.posts)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
    setLoading(false)
  }

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const postsWithUsers = await getPostsByTagWithUser(tag, "?limit=0&select=username,image")
      setPosts(postsWithUsers)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setLoading(false)
  }

  // 게시물 삭제
  const handleClickDelete = async (id) => {
    try {
      await deletePostApi(id)
      deletePost(id)
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  // 댓글 가져오기
  const fetchComments = async (postId) => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const data = await getComments(postId)
      setComments(postId, data.comments)
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }

  // 게시물 상세 보기
  const openPostDetail = (post) => {
    setSelectedPost(post)
    fetchComments(post.id)
    openPostDetailDialog()
  }

  // 사용자 모달 열기
  const openUserModal = async (user) => {
    try {
      const response = await getUser(user.id)
      setSelectedUser(response)
      changeShowUserDialog()
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
    }

    // updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  // 하이라이트 함수 추가
  const highlightText = (text: string, highlight: string) => {
    if (!text) return null
    if (!highlight.trim()) {
      return <span>{text}</span>
    }
    const regex = new RegExp(`(${highlight})`, "gi")
    const parts = text.split(regex)
    return (
      <span>
        {parts.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
      </span>
    )
  }

  // 게시물 테이블 렌더링
  const renderPostTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <PostTableRow post={post} key={`post-table-row-${post.id}`} />
        ))}
      </TableBody>
    </Table>
  )

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
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="게시물 검색..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => updateParams({ search: e.target.value })}
                  onKeyPress={(e) => e.key === "Enter" && searchPosts()}
                />
              </div>
            </div>
            <Select
              value={selectedTag}
              onValueChange={(value) => {
                fetchPostsByTag(value)
                updateParams({ tag: value })
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="태그 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 태그</SelectItem>
                {tags.map((tag) => (
                  <SelectItem key={tag.url} value={tag.slug}>
                    {tag.slug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(value) => updateParams({ sortBy: value })}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">없음</SelectItem>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="title">제목</SelectItem>
                <SelectItem value="reactions">반응</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={(value) => updateParams({ sortOrder: value })}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 순서" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">오름차순</SelectItem>
                <SelectItem value="desc">내림차순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 게시물 테이블 */}
          {loading ? <Loading /> : renderPostTable()}

          {/* 페이지네이션 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <Select value={limit.toString()} onValueChange={(value) => updateParams({ limit: Number(value) })}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                </SelectContent>
              </Select>
              <span>항목</span>
            </div>
            <div className="flex gap-2">
              <Button disabled={skip === 0} onClick={() => updateParams({ skip: Math.max(0, skip - limit) })}>
                이전
              </Button>
              <Button disabled={skip + limit >= total} onClick={() => updateParams({ skip: skip + limit })}>
                다음
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* 게시글 추가 대화상자 */}
      <AddPostDialog />
      {/* 게시글 수정 대화상자 */}
      <EditPostDialog />
      {/* 댓글 추가 대화상자 */}
      <AddCommentDialog isOpen={showAddCommentDialog} onChangeOpen={changeShowAddCommentDialog} />
      {/* 댓글 수정 대화상자 */}
      <EditCommentDialog isOpen={showEditCommentDialog} onChangeOpen={changeShowEditCommentDialog} />
      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog
        changeShowAddCommentDialog={changeShowAddCommentDialog}
        changeShowEditCommentDialog={changeShowEditCommentDialog}
      />
      {/* 사용자 정보 대화상자 */}
      <UserDialog isOpen={showUserDialog} onChangeOpen={changeShowUserDialog} />
    </Card>
  )
}

export default PostsManager
