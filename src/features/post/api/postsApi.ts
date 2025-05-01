import { getPosts, getPostsByTag } from "@/entities/post/api/postsApi"
import { getUsers } from "@/entities/user/api/usersApi"

export const getPostsWithUser = async (postParams: string, userParams: string) => {
  const postsData = await getPosts(postParams)
  const usersData = await getUsers(userParams)

  const postsWithUser = postsData.posts.map((post) => ({
    ...post,
    author: usersData.users.find((user) => user.id === post.userId),
  }))

  return postsWithUser
}

export const getPostsByTagWithUser = async (tag: string, userParams: string) => {
  const postsData = await getPostsByTag(tag)
  const usersData = await getUsers(userParams)

  const postsWithUser = postsData.posts.map((post) => ({
    ...post,
    author: usersData.users.find((user) => user.id === post.userId),
  }))

  return postsWithUser
}
