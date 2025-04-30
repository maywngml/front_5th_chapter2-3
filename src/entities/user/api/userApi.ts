import { fetchApi } from "@/shared/api/fetchApi"
import type { User, GetUserResponse } from "../model/type"

export const getUser = async (id: User["id"]) => {
  const data = await fetchApi<GetUserResponse>({ method: "GET", url: `/users/${id}` })
  return data
}
