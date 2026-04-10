import { COMMON_ACTION_TYPES, USER_ACTION_TYPES } from '../../utilities/constants'
import type { UserListItem } from '../../utilities/models'

interface UserState {
  fetchUsers: {
    isLoading: boolean
    data: UserListItem[]
    error: string | null
  }
}

const INITIAL_STATE: UserState = {
  fetchUsers: {
    isLoading: false,
    data: [],
    error: null,
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const userReducer = (state = INITIAL_STATE, action: any): UserState => {
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

    default:
      return state
  }
}

export default userReducer
