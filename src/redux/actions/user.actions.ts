import { userService } from '../../services'
import { USER_ACTION_TYPES, COMMON_ACTION_TYPES } from '../../utilities/constants'
import { toUserListItem } from '../../utilities/helpers/user.helpers'
import type { AppDispatch } from '../store'

// ──────────────── FETCH USERS ────────────────

const fetchUsersRequest = () => ({
  type: USER_ACTION_TYPES.FETCH_USERS + COMMON_ACTION_TYPES.REQUEST,
})

const fetchUsersSuccess = (data: ReturnType<typeof toUserListItem>[]) => ({
  type: USER_ACTION_TYPES.FETCH_USERS + COMMON_ACTION_TYPES.SUCCESS,
  data,
})

const fetchUsersError = (error: string) => ({
  type: USER_ACTION_TYPES.FETCH_USERS + COMMON_ACTION_TYPES.ERROR,
  error,
})

// Thunk: replaces fetchPatientsSaga
const fetchUsers = () => async (dispatch: AppDispatch) => {
  dispatch(fetchUsersRequest())
  try {
    const users = await userService.getUsers()
    const mapped = users.map(toUserListItem)
    dispatch(fetchUsersSuccess(mapped))
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch users'
    dispatch(fetchUsersError(message))
  }
}

export const userActions = {
  fetchUsers,
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersError,
}
