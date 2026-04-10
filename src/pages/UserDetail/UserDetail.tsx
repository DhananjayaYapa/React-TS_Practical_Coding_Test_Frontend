import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Divider,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material'

import { PageHeader, UserPosts } from '../../components'
import { APP_ROUTES } from '../../utilities/constants'
import { userActions } from '../../redux/actions'
import type { AppDispatch, RootState } from '../../redux/store'

const UserDetail = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const fetchUserByIdState = useSelector((state: RootState) => state.user.fetchUserById)
  const fetchUserPostsState = useSelector((state: RootState) => state.user.fetchUserPosts)

  const user = fetchUserByIdState.data
  const isLoading = fetchUserByIdState.isLoading
  const error = fetchUserByIdState.error

  // Fetch user detail and posts on mount / id change
  useEffect(() => {
    if (!id) return
    const userId = Number(id)
    dispatch(userActions.fetchUserByIdRequest(userId))
    dispatch(userActions.fetchUserPostsRequest(userId))
  }, [dispatch, id])

  const handleBack = () => {
    navigate(APP_ROUTES.USERS)
  }

  return (
    <Box>
      <PageHeader title="User Detail" subtitle={user ? user.name : 'Loading...'} />

      <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mb: 2 }} size="small">
        Back to Users
      </Button>

      <Collapse in={!!error}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
      </Collapse>

      {isLoading && <LinearProgress sx={{ mb: 2 }} />}

      {user && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Personal Info */}
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography variant="caption" color="text.secondary">
                    Full Name
                  </Typography>
                  <Typography variant="body1">{user.name}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography variant="caption" color="text.secondary">
                    Username
                  </Typography>
                  <Typography variant="body1">@{user.username}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography variant="caption" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">{user.email}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography variant="caption" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body1">{user.phone}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography variant="caption" color="text.secondary">
                    Website
                  </Typography>
                  <Typography variant="body1">{user.website}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Address */}
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Address
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography variant="caption" color="text.secondary">
                    Street
                  </Typography>
                  <Typography variant="body1">{user.address.street}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography variant="caption" color="text.secondary">
                    Suite
                  </Typography>
                  <Typography variant="body1">{user.address.suite}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography variant="caption" color="text.secondary">
                    City
                  </Typography>
                  <Typography variant="body1">{user.address.city}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography variant="caption" color="text.secondary">
                    Zipcode
                  </Typography>
                  <Typography variant="body1">{user.address.zipcode}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography variant="caption" color="text.secondary">
                    Coordinates
                  </Typography>
                  <Typography variant="body1">
                    {user.address.geo.lat}, {user.address.geo.lng}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Company */}
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Company
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography variant="caption" color="text.secondary">
                    Company Name
                  </Typography>
                  <Typography variant="body1">{user.company.name}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography variant="caption" color="text.secondary">
                    Catch Phrase
                  </Typography>
                  <Typography variant="body1">{user.company.catchPhrase}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography variant="caption" color="text.secondary">
                    Business
                  </Typography>
                  <Typography variant="body1">{user.company.bs}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Divider />

          {/* User Posts */}
          <UserPosts
            posts={fetchUserPostsState.data}
            isLoading={fetchUserPostsState.isLoading}
            error={fetchUserPostsState.error}
          />
        </Box>
      )}
    </Box>
  )
}

export default UserDetail
