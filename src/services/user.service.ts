import apiClient from './api'
import type { User } from '../utilities/models/user.model'
import type { Post } from '../utilities/models/post.model'

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/users')
    return response.data
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}`)
    return response.data
  },

  getUserPosts: async (userId: number): Promise<Post[]> => {
    const response = await apiClient.get<Post[]>('/posts', {
      params: { userId },
    })
    return response.data
  },
}
