import { userService } from '../../services'
import { USER_ACTION_TYPES, COMMON_ACTION_TYPES } from '../../utilities/constants'
import { toUserListItem } from '../../utilities/helpers/user.helpers'
import type { AppDispatch } from '../store'

const fetchUsersRequest = () => async (dispatch: AppDispatch) => {
  dispatch({ type: USER_ACTION_TYPES.FETCH_USERS + COMMON_ACTION_TYPES.REQUEST })
  try {
    const users = await userService.getUsers()
    const mapped = users.map(toUserListItem)
    dispatch({
      type: USER_ACTION_TYPES.FETCH_USERS + COMMON_ACTION_TYPES.SUCCESS,
      data: mapped,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch users'
    dispatch({
      type: USER_ACTION_TYPES.FETCH_USERS + COMMON_ACTION_TYPES.ERROR,
      error: message,
    })
  }
}

const fetchUserByIdRequest = (id: number) => async (dispatch: AppDispatch) => {
  dispatch({ type: USER_ACTION_TYPES.FETCH_USER_BY_ID + COMMON_ACTION_TYPES.REQUEST })
  try {
    const user = await userService.getUserById(id)
    dispatch({
      type: USER_ACTION_TYPES.FETCH_USER_BY_ID + COMMON_ACTION_TYPES.SUCCESS,
      data: user,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch user details'
    dispatch({
      type: USER_ACTION_TYPES.FETCH_USER_BY_ID + COMMON_ACTION_TYPES.ERROR,
      error: message,
    })
  }
}

const fetchUserPostsRequest = (userId: number) => async (dispatch: AppDispatch) => {
  dispatch({ type: USER_ACTION_TYPES.FETCH_USER_POSTS + COMMON_ACTION_TYPES.REQUEST })
  try {
    const posts = await userService.getUserPosts(userId)
    dispatch({
      type: USER_ACTION_TYPES.FETCH_USER_POSTS + COMMON_ACTION_TYPES.SUCCESS,
      data: posts,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch user posts'
    dispatch({
      type: USER_ACTION_TYPES.FETCH_USER_POSTS + COMMON_ACTION_TYPES.ERROR,
      error: message,
    })
  }
}

export const userActions = {
  fetchUsersRequest,
  fetchUserByIdRequest,
  fetchUserPostsRequest,
}
