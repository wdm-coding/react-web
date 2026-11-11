import { useEffect } from 'react'
import styles from './index.module.scss'
import useModal from '@/hooks/useModal'

const Login = () => {
  const { userLogin } = useModal('user')
  useEffect(() => {
    userLogin()
  }, [])
  return (
    <div className={styles.loginWrapper}>
      <h1>Login</h1>
    </div>
  )
}

export default Login
