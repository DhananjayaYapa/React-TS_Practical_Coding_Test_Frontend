import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Alert, Box, Collapse, LinearProgress } from '@mui/material'

import { PageHeader, UserTable } from '../../components'
import type { UserListItem } from '../../utilities/models'
import { APP_ROUTES } from '../../utilities/constants'
import { userActions } from '../../redux/actions'
import type { AppDispatch, RootState } from '../../redux/store'

const Users = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const fetchUsersState = useSelector((state: RootState) => state.user.fetchUsers)
  const searchTerm = useSelector((state: RootState) => state.search.term)

  const rows = useMemo<UserListItem[]>(() => fetchUsersState.data || [], [fetchUsersState.data])
  const isLoading = fetchUsersState.isLoading
  const error = fetchUsersState.error

  useEffect(() => {
    dispatch(userActions.fetchUsers())
  }, [dispatch])

  const filteredRows = useMemo(() => {
    if (!searchTerm) return rows

    const term = searchTerm.toLowerCase()
    return rows.filter((row) => {
      const searchable = [row.name, row.email, row.companyName, row.city].join(' ').toLowerCase()
      return searchable.includes(term)
    })
  }, [rows, searchTerm])

  const handleRowClick = (user: UserListItem) => {
    navigate(APP_ROUTES.USER_DETAIL.replace(':id', String(user.id)))
  }

  return (
    <Box>
      <PageHeader title="Users" subtitle="Browse and manage user directory" />

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
