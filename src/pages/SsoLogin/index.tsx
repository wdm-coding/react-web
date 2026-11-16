import { useEffect } from 'react'
import useModal from '@/hooks/useModal'
import { useNavigate } from 'react-router-dom'
const SsoLogin = () => {
  const navigate = useNavigate()
  const { userLogin } = useModal('user')
  const searchParams = new URLSearchParams(window.location.search)
  const authCode = searchParams.get('authCode')
  const thirdLogin = async (authCode: string) => {
    try {
      const redirectUrl = await userLogin({ authCode })
      navigate(redirectUrl, { replace: true })
      window.$message.success('登录成功')
    } catch (error) {
      console.log('SSO-登录失败', error)
    }
  }
  useEffect(() => {
    thirdLogin(authCode)
  }, [authCode])
  return (
    <div>
      <h1>SsoLogin</h1>
    </div>
  )
}
export default SsoLogin