import styles from './index.module.scss'
import { useUserStore } from '@/store/userStore'
import logo from '@/assets/images/common/logo.jpeg'
import NavMenus from './NavMenus'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const { userInfo, userLogout } = useUserStore()
  const navigate = useNavigate()
  const onLogout = async () => {
    const isLogout = await userLogout()
    if (isLogout) {
      window.location.href = '/'
    }
  }
  return (
    <div className={styles.headerContainer}>
      <div className={styles.logo}>
        <img src={logo} alt='logo' />
        <span>AINative</span>
      </div>
      <div className={styles.navMenuContainer}>
        <NavMenus />
      </div>
      <div className={styles.rightAction}>
        {userInfo ? (
          <>
            <div className={styles.username}>{userInfo.username}</div>
            <div className={styles.logoutBtn} onClick={onLogout}>
              退出登录
            </div>
          </>
        ) : (
          <div onClick={() => navigate('/login')} className={styles.loginBtn}>
            登录
          </div>
        )}
      </div>
    </div>
  )
}
export default Header
