import { Paper, Typography } from '@mui/material'

const Posts = () => {
  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        Posts
      </Typography>
      <Typography color="text.secondary">Posts listing will be implemented here.</Typography>
    </Paper>
  )
}

export default Posts
