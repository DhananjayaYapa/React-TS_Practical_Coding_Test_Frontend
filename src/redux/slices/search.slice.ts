import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface SearchState {
  term: string
}

const initialState: SearchState = {
  term: '',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.term = action.payload
    },
    clearSearch(state) {
      state.term = ''
    },
  },
})

export const searchActions = searchSlice.actions
export default searchSlice.reducer
