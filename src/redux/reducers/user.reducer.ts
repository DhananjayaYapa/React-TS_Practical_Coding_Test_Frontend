import { COMMON_ACTION_TYPES, USER_ACTION_TYPES } from '../../utilities/constants'
import {
  FETCH_USERS_INITIAL_STATE,
  FETCH_USER_BY_ID_INITIAL_STATE,
  FETCH_USER_POSTS_INITIAL_STATE,
} from '../../utilities/constants/user.constants'

const INITIAL_STATE = {
  fetchUsers: { ...FETCH_USERS_INITIAL_STATE },
  fetchUserById: { ...FETCH_USER_BY_ID_INITIAL_STATE },
  fetchUserPosts: { ...FETCH_USER_POSTS_INITIAL_STATE },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const userReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    // FETCH USERS
    case USER_ACTION_TYPES.FETCH_USERS + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        fetchUsers: {
          ...state.fetchUsers,
          isLoading: true,
          error: null,
        },
      }
    case USER_ACTION_TYPES.FETCH_USERS + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        fetchUsers: {
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case USER_ACTION_TYPES.FETCH_USERS + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        fetchUsers: {
          isLoading: false,
          data: [],
          error: action.error,
        },
      }

    // FETCH USER BY ID
    case USER_ACTION_TYPES.FETCH_USER_BY_ID + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        fetchUserById: {
          isLoading: true,
          data: null,
          error: null,
        },
      }
    case USER_ACTION_TYPES.FETCH_USER_BY_ID + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        fetchUserById: {
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case USER_ACTION_TYPES.FETCH_USER_BY_ID + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        fetchUserById: {
          isLoading: false,
          data: null,
          error: action.error,
        },
      }

    // FETCH USER POSTS
    case USER_ACTION_TYPES.FETCH_USER_POSTS + COMMON_ACTION_TYPES.REQUEST:
      return {
        ...state,
        fetchUserPosts: {
          ...state.fetchUserPosts,
          isLoading: true,
          error: null,
        },
      }
    case USER_ACTION_TYPES.FETCH_USER_POSTS + COMMON_ACTION_TYPES.SUCCESS:
      return {
        ...state,
        fetchUserPosts: {
          isLoading: false,
          data: action.data,
          error: null,
        },
      }
    case USER_ACTION_TYPES.FETCH_USER_POSTS + COMMON_ACTION_TYPES.ERROR:
      return {
        ...state,
        fetchUserPosts: {
          isLoading: false,
          data: [],
          error: action.error,
        },
      }

    default:
      return state
  }
}

export default userReducer
