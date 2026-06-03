import { useLocation, Navigate } from 'react-router-dom'
import { getToken } from '@/utils/storage'

const whitePath = ['/', '/login', '/client', '/client/home']
const AuthGuard = ({ children }) => {
  const location = useLocation()
  const isLogin = !!getToken()
  // 去除参数
  const path = location.pathname.split('?')[0]
  if (!isLogin && !whitePath.includes(path)) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />
  }
  return children
}
export default AuthGuard
