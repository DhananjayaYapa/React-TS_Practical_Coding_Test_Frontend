import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Alert, Box, Collapse, LinearProgress } from '@mui/material'

import { PageHeader, SearchInput, UserTable } from '../../components'
import type { UserListItem } from '../../utilities/models'
import { APP_ROUTES, DEBOUNCE_DELAY } from '../../utilities/constants'
import { useDebounce } from '../../utilities/hooks'
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

  useEffect(() => {
    dispatch(userActions.fetchUsersRequest())
  }, [dispatch])

  // Client-side search filtering across name and email (debounced)
  const filteredRows = useMemo(() => {
    if (!debouncedSearch) return rows

    const term = debouncedSearch.toLowerCase()
    return rows.filter((row) => {
      const searchable = [row.name, row.email].join(' ').toLowerCase()
      return searchable.includes(term)
    })
  }, [rows, debouncedSearch])

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

      <UserTable rows={filteredRows} onRowClick={handleRowClick} />
    </Box>
  )
}

export default Users
