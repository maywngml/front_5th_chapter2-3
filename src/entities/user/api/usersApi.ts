import { fetchApi } from "@/shared/api/fetchApi"
import type { User, GetUserResponse, GetUsersResponse } from "../model/type"

export const getUsers = async (params: string) => {
  const data = await fetchApi<GetUsersResponse>({ method: "GET", url: `/users${params}` })
  return data
}

export const getUser = async (id: User["id"]) => {
  const data = await fetchApi<GetUserResponse>({ method: "GET", url: `/users/${id}` })
  return data
}
