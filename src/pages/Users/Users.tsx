import { Paper, Typography } from '@mui/material'

const Users = () => {
  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        Users
      </Typography>
      <Typography color="text.secondary">
        User management features will be implemented here.
      </Typography>
    </Paper>
  )
}

export default Users
