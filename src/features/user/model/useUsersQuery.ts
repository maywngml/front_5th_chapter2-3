import { useMutation } from "@tanstack/react-query"
import { getUser } from "@/entities/user/api/usersApi"

export const useUser = () => {
  return useMutation({
    mutationFn: getUser,
    onError: (e) => {
      console.error("사용자 조회 오류:", e)
    },
  })
}
