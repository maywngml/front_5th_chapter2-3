import { Button, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui"
import { useUrlParams } from "../lib"
import { usePostsStore } from "@/entities/post/model/usePostsStore"

export const PostPagination = () => {
  const { limit, skip, updateParams } = useUrlParams()
  const { total } = usePostsStore()

  const handleChangeLimit = (value: string) => {
    updateParams({ limit: Number(value) })
  }

  const handleClickPrev = () => {
    updateParams({ skip: Math.max(0, skip - limit) })
  }

  const handleClickNext = () => {
    updateParams({ skip: skip + limit })
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={handleChangeLimit}>
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
        <Button disabled={skip === 0} onClick={handleClickPrev}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={handleClickNext}>
          다음
        </Button>
      </div>
    </div>
  )
}
