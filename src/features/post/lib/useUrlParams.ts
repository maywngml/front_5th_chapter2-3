/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useCallback, useMemo } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { PostsUrlParams } from "@/entities/post/model/type"

// URL 쿼리 파라미터를 처리하는 훅
export const useUrlParams = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const getParams = useCallback(() => {
    const queryParams = new URLSearchParams(location.search)

    const params = {
      skip: parseInt(queryParams.get("skip") || "0"),
      limit: parseInt(queryParams.get("limit") || "10"),
      search: queryParams.get("search") || "",
      sortBy: queryParams.get("sortBy") || "",
      sortOrder: queryParams.get("sortOrder") || "asc",
      tag: queryParams.get("tag") || "",
    }

    return params
  }, [location.search])

  const updateParams = useCallback(
    (newParams: Partial<PostsUrlParams>) => {
      const params = new URLSearchParams(location.search)
      for (const [key, value] of Object.entries(newParams)) {
        value ? params.set(key, value.toString()) : params.delete(key)
      }
      navigate(`?${params.toString()}`)
    },
    [navigate, location.search],
  )

  const currentParams = useMemo(() => getParams(), [getParams])

  return { ...currentParams, updateParams }
}
