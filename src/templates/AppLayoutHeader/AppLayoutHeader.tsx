import { Link, Typography, Box, Breadcrumbs, Stack, IconButton } from '@mui/material'
import { useLocation, Link as RouterLink } from 'react-router-dom'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SettingsIcon from '@mui/icons-material/Settings'
import { APP_ROUTES } from '../../utilities/constants'

const ROUTE_META: Record<string, { title: string; breadcrumb: string }> = {
  [APP_ROUTES.DASHBOARD]: { title: 'Dashboard', breadcrumb: 'Dashboard' },
  [APP_ROUTES.USERS]: { title: 'Users', breadcrumb: 'Users' },
  [APP_ROUTES.POSTS]: { title: 'Posts', breadcrumb: 'Posts' },
}

const AppLayoutHeader = () => {
  const location = useLocation()
  const pathname = location.pathname

  // Match /users/:id pattern
  const isUserDetail = /^\/users\/\d+$/.test(pathname)
  const meta = isUserDetail
    ? { title: 'User Detail', breadcrumb: 'User Detail' }
    : ROUTE_META[pathname] || { title: '', breadcrumb: '' }

  const isDashboard = pathname === APP_ROUTES.DASHBOARD

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: { xs: 'flex-start', sm: 'center' },
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        gap: 1,
        flexGrow: 1,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, fontSize: '18px', color: '#ffffff', lineHeight: 1.2 }}
        >
          {meta.title}
        </Typography>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'stretch', md: 'center' }}
          spacing={1}
          sx={{ mt: 0.5 }}
        >
          {!isDashboard && (
            <Breadcrumbs
              separator={<NavigateNextIcon sx={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }} />}
              aria-label="breadcrumb"
            >
              <Link
                component={RouterLink}
                to={APP_ROUTES.DASHBOARD}
                underline="hover"
                sx={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}
              >
                Dashboard
              </Link>
              {isUserDetail && (
                <Link
                  component={RouterLink}
                  to={APP_ROUTES.USERS}
                  underline="hover"
                  sx={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}
                >
                  Users
                </Link>
              )}
              <Typography sx={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)' }}>
                {meta.breadcrumb}
              </Typography>
            </Breadcrumbs>
          )}
        </Stack>
      </Box>

      <Stack direction="row" spacing={1} alignItems="center" sx={{ mr: { sm: 2 } }}>
        <IconButton
          size="small"
          sx={{ color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 1 }}
        >
          <NotificationsNoneIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          sx={{ color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 1 }}
        >
          <SettingsIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  )
}

export default AppLayoutHeader
