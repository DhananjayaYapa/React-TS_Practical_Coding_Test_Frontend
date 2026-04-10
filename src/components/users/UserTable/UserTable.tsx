import { Box, IconButton, Paper, Typography } from '@mui/material'
import { Star, StarBorder } from '@mui/icons-material'
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid'
import { useMemo } from 'react'
import type { UserListItem } from '../../../utilities/models'

interface UserTableProps {
  rows: UserListItem[]
  onRowClick?: (user: UserListItem) => void
  favouriteIds?: Set<number>
  onToggleFavourite?: (id: number) => void
}

const UserTable = ({
  rows,
  onRowClick,
  favouriteIds = new Set(),
  onToggleFavourite,
}: UserTableProps) => {
  const columns = useMemo<GridColDef<UserListItem>[]>(
    () => [
      {
        field: 'favourite',
        headerName: '',
        width: 56,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        renderCell: (params: GridRenderCellParams<UserListItem>) => {
          const isFav = favouriteIds.has(params.row.id)
          return (
            <IconButton
              size="small"
              aria-label={isFav ? `Unfavourite ${params.row.name}` : `Favourite ${params.row.name}`}
              onClick={(e) => {
                e.stopPropagation()
                onToggleFavourite?.(params.row.id)
              }}
              sx={{ color: isFav ? 'warning.main' : 'action.disabled' }}
            >
              {isFav ? <Star /> : <StarBorder />}
            </IconButton>
          )
        },
      },
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
    [favouriteIds, onToggleFavourite]
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
