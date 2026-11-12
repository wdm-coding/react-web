import { useLocation, Navigate } from 'react-router-dom'
import { ReactNode } from 'react'
import { whitePaths } from '@/router'
import useAuth from '@/hooks/useAuth'
const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuth()
  const location = useLocation()
  const path = location.pathname.split('?')[0]
  if (!isLoggedIn && !whitePaths.includes(path)) {
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
        replace
      />
    )
  }
  return children
}
export default AuthGuard
