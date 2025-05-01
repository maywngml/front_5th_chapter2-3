import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { TableRow, TableCell } from "@/shared/ui/Table"
import { Button, HighlightedText } from "@/shared/ui"
import { useUrlParams } from "../lib"
import { usePostDialog } from "../model/PostDialogContext"
import { useUserDialog } from "@/features/user/model/UserDialogContext"
import { useSelectedPostStore } from "../model/useSelectedPostStore"
import { useDeletePost } from "../model/usePostsQuery"
import { useGetComments } from "@/features/comment/model/useCommentsQuery"
import { useSelectedUserStore } from "@/features/user/model"
import { usePostsStore } from "@/entities/post/model/usePostsStore"
import { useCommentsStore } from "@/entities/comment/model/useCommentsStore"
import { getUser } from "@/entities/user/api/usersApi"
import type { Post } from "@/entities/post/model/type"
import type { GetCommentsResponse } from "@/entities/comment/model/type"

interface PostTableRowProps {
  post: Post
}

export const PostTableRow = ({ post }: PostTableRowProps) => {
  const { mutate: deletePostMutate } = useDeletePost()
  const { mutate: getCommentsMutate } = useGetComments()
  const { deletePost } = usePostsStore()
  const { comments, setComments } = useCommentsStore()
  const { openPostDetailDialog, openEditPostDialog } = usePostDialog()
  const { openUserDialog } = useUserDialog()
  const { setSelectedPost } = useSelectedPostStore()
  const { setSelectedUser } = useSelectedUserStore()
  const { search: searchQuery, tag: selectedTag, updateParams } = useUrlParams()
  const { id, title, tags, author, reactions } = post

  // 댓글 불러오기
  const fetchComments = () => {
    if (comments[id]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음

    getCommentsMutate(id, {
      onSuccess: (data: GetCommentsResponse) => {
        setComments(id, data.comments)
      },
    })
  }

  // 제목의 태그 클릭
  const handleClickTag = (tag: string) => {
    updateParams({ tag })
  }

  // 사용자 모달 열기
  const handleClickAuthor = async () => {
    try {
      const response = await getUser(id)
      setSelectedUser(response)
      openUserDialog()
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  // 게시글 오픈
  const handleClickOpen = () => {
    setSelectedPost(post)
    fetchComments()
    openPostDetailDialog()
  }

  // 게시글 수정
  const handleClickEdit = () => {
    setSelectedPost(post)
    openEditPostDialog()
  }

  // 게시물 삭제
  const handleClickDelete = async () => {
    deletePostMutate(id, {
      onSuccess: () => {
        deletePost(id)
      },
    })
  }

  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>
            <HighlightedText text={title} highlight={searchQuery} />
          </div>

          <div className="flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <span
                key={tag}
                className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                  selectedTag === tag
                    ? "text-white bg-blue-500 hover:bg-blue-600"
                    : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                }`}
                onClick={() => handleClickTag(tag)}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-2 cursor-pointer" onClick={handleClickAuthor}>
          <img src={author?.image} alt={author?.username} className="w-8 h-8 rounded-full" />
          <span>{author?.username}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4" />
          <span>{reactions?.likes || 0}</span>
          <ThumbsDown className="w-4 h-4" />
          <span>{reactions?.dislikes || 0}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleClickOpen}>
            <MessageSquare className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleClickEdit}>
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleClickDelete}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
