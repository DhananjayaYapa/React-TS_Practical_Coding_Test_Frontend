import { Alert, Box, Card, CardContent, Collapse, LinearProgress, Typography } from '@mui/material'
import type { Post } from '../../../utilities/models'

interface UserPostsProps {
  posts: Post[]
  isLoading: boolean
  error: string | null
}

const UserPosts = ({ posts, isLoading, error }: UserPostsProps) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Posts ({posts.length})
      </Typography>

      <Collapse in={!!error}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
      </Collapse>

      {isLoading && <LinearProgress sx={{ mb: 2 }} />}

      {!isLoading && !error && posts.length === 0 && (
        <Typography color="text.secondary">No posts found.</Typography>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {posts.map((post) => (
          <Card key={post.id} variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.body}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

export default UserPosts
