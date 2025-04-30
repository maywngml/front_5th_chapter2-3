import { create } from "zustand"
import type { SelectedUser } from "@/features/user/model/type"

interface State {
  selectedUser: SelectedUser | null
}

interface Action {
  setSelectedUser: (user: SelectedUser) => void
}

export const useSelectedUserStore = create<State & Action>((set) => ({
  selectedUser: null,
  setSelectedUser: (user) => set(() => ({ selectedUser: user })),
}))
