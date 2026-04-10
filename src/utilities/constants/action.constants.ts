// Common action types (suffixes) — same pattern as Retails
export const COMMON_ACTION_TYPES = {
  REQUEST: '_REQUEST',
  SUCCESS: '_SUCCESS',
  ERROR: '_ERROR',
  CLEAR: '_CLEAR',
} as const

export const USER_ACTION_TYPES = {
  FETCH_USERS: 'USER_FETCH_USERS',
  FETCH_USER_BY_ID: 'USER_FETCH_USER_BY_ID',
  FETCH_USER_POSTS: 'USER_FETCH_USER_POSTS',
} as const
