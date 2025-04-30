import type { Comment } from "@/entities/comment/model/type"

export type NewComment = Omit<Comment, "id" | "likes">
