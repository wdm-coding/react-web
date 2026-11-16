import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import useAuth from '@/hooks/useAuth'
const LoginGuard = ({ children }) => {
  const navigate = useNavigate()
  const {isLoggedIn} = useAuth()
  useEffect(() => {
    if (isLoggedIn) {
      navigate(-1)
    }
  }, [isLoggedIn])
  if (isLoggedIn) {
    return null
  }
  return children
}
export default LoginGuard
