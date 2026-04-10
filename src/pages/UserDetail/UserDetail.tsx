import { Paper, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

const UserDetail = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        User Detail
      </Typography>
      <Typography color="text.secondary">Details for user #{id} will be displayed here.</Typography>
    </Paper>
  )
}

export default UserDetail
