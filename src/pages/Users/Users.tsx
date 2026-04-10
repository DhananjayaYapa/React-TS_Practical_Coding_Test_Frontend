import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Alert, Box, Collapse, LinearProgress } from '@mui/material'

import { PageHeader, SearchInput, UserTable } from '../../components'
import type { UserListItem } from '../../utilities/models'
import { APP_ROUTES, DEBOUNCE_DELAY } from '../../utilities/constants'
import { useDebounce, useFavourites } from '../../utilities/hooks'
import { userActions } from '../../redux/actions'
import type { AppDispatch, RootState } from '../../redux/store'

const Users = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const fetchUsersState = useSelector((state: RootState) => state.user.fetchUsers)

  const rows = useMemo<UserListItem[]>(() => fetchUsersState.data || [], [fetchUsersState.data])
  const isLoading = fetchUsersState.isLoading
  const error = fetchUsersState.error

  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, DEBOUNCE_DELAY)

  const { favouriteIds, toggleFavourite } = useFavourites()

  useEffect(() => {
    dispatch(userActions.fetchUsersRequest())
  }, [dispatch])

  // Client-side search filtering across name and email (debounced)
  // Then sort favourited users to the top while preserving original order within each group
  const filteredRows = useMemo(() => {
    let result = rows

    if (debouncedSearch) {
      const term = debouncedSearch.toLowerCase()
      result = result.filter((row) => {
        const searchable = [row.name, row.email].join(' ').toLowerCase()
        return searchable.includes(term)
      })
    }

    // Sort: favourites first, then non-favourites (stable sort preserves original order)
    return [...result].sort((a, b) => {
      const aFav = favouriteIds.has(a.id) ? 0 : 1
      const bFav = favouriteIds.has(b.id) ? 0 : 1
      return aFav - bFav
    })
  }, [rows, debouncedSearch, favouriteIds])

  const handleRowClick = (user: UserListItem) => {
    navigate(APP_ROUTES.USER_DETAIL.replace(':id', String(user.id)))
  }

  return (
    <Box>
      <PageHeader title="Users" subtitle="Browse and manage user directory" />

      <Box sx={{ mb: 2 }}>
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by name or email..."
        />
      </Box>

      <Collapse in={!!error}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
      </Collapse>

      {isLoading && <LinearProgress sx={{ mb: 1 }} />}

      <UserTable
        rows={filteredRows}
        onRowClick={handleRowClick}
        favouriteIds={favouriteIds}
        onToggleFavourite={toggleFavourite}
      />
    </Box>
  )
}

export default Users
