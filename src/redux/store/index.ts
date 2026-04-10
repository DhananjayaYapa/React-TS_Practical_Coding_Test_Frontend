import { configureStore } from '@reduxjs/toolkit'
import searchReducer from '../slices/search.slice'
import { userReducer } from '../reducers'

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
  },
  devTools: import.meta.env.DEV,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
