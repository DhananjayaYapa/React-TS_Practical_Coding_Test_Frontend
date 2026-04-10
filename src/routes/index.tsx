import { Routes, Route, Navigate } from 'react-router-dom'
import { APP_ROUTES } from '../utilities/constants'
import { AppLayout } from '../templates'
import { Dashboard, Users, UserDetail, Posts } from '../pages'

function AppRoutes() {
  return (
    <AppLayout>
      <Routes>
        <Route path={APP_ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={APP_ROUTES.USERS} element={<Users />} />
        <Route path={APP_ROUTES.USER_DETAIL} element={<UserDetail />} />
        <Route path={APP_ROUTES.POSTS} element={<Posts />} />
        <Route path="*" element={<Navigate to={APP_ROUTES.DASHBOARD} replace />} />
      </Routes>
    </AppLayout>
  )
}

export default AppRoutes
