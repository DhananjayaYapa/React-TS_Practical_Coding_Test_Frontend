import { Box, Paper, Typography } from '@mui/material'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useMemo } from 'react'
import type { UserListItem } from '../../../utilities/models'

interface UserTableProps {
  rows: UserListItem[]
  onRowClick?: (user: UserListItem) => void
}

const UserTable = ({ rows, onRowClick }: UserTableProps) => {
  const columns = useMemo<GridColDef<UserListItem>[]>(
    () => [
      {
        field: 'name',
        headerName: 'Name',
        minWidth: 180,
        flex: 1.3,
      },
      {
        field: 'email',
        headerName: 'Email',
        minWidth: 220,
        flex: 1.5,
      },
      {
        field: 'companyName',
        headerName: 'Company',
        minWidth: 180,
        flex: 1.2,
      },
      {
        field: 'city',
        headerName: 'City',
        minWidth: 130,
        flex: 0.9,
      },
    ],
    []
  )

  return (
    <Paper sx={{ borderRadius: 2 }}>
      <Box sx={{ p: 2, pb: 0 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          User List
        </Typography>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        autoHeight
        onRowClick={(params) => {
          onRowClick?.(params.row as UserListItem)
        }}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        sx={{
          border: 'none',
          '& .MuiDataGrid-columnHeaders': {
            bgcolor: 'rgba(2, 6, 23, 0.04)',
          },
          '& .MuiDataGrid-row': {
            cursor: 'pointer',
          },
        }}
      />
    </Paper>
  )
}

export default UserTable
