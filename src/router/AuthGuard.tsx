import { useLocation, Navigate } from 'react-router-dom'
import { getToken } from '@/utils/storage'
import { ReactNode } from 'react'
import { whitePaths } from '@/router'

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const location = useLocation()
  const isLogin = !!getToken()
  const path = location.pathname.split('?')[0]

  if (!isLogin && !whitePaths.includes(path)) {
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
