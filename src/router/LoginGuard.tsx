import { useNavigate } from 'react-router-dom'
import { getToken } from '@/utils/storage'
import { useEffect } from 'react'
const LoginGuard = ({ children }) => {
  const navigate = useNavigate()
  const isLogin = !!getToken()
  useEffect(() => {
    if (isLogin) {
      navigate(-1)
    }
  }, [isLogin])
  if (isLogin) {
    return null
  }
  return children
}
export default LoginGuard
