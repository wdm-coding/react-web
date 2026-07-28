import styles from './index.module.scss'
import { useUserStore } from '@/store/userStore'
import logo from '@/assets/images/common/logo.jpeg'
import NavMenus from './NavMenus'
import { useNavigate } from 'react-router-dom'
import { Dropdown } from 'antd'
const Header = () => {
  const { userInfo, userLogout } = useUserStore()
  const navigate = useNavigate()
  const onLogout = async ({ key }: { key: string }) => {
    switch (key) {
      case 'logout':
        const isLogout = await userLogout()
        if (isLogout) {
          window.location.href = '/'
        }
        break
      case 'admin':
        navigate('/manage')
        break
      default:
        break
    }
  }
  return (
    <div className={styles.headerContainer}>
      <div className={styles.logo}>
        <img src={logo} alt='logo' />
        <span>AI 问答系统</span>
      </div>
      <div className={styles.navMenuContainer}>
        <NavMenus />
      </div>
      <div className={styles.rightAction}>
        {userInfo ? (
          <>
            {/* 
            <div className={styles.logoutBtn} onClick={onLogout}>
              退出登录
            </div> */}
            <div className={styles.username}>{userInfo.username}</div>
            <Dropdown
              menu={{
                items: [
                  { label: '退出登录', key: 'logout' },
                  { label: '后台管理', key: 'admin' }
                ],
                onClick: onLogout
              }}
            >
              <img
                src={logo}
                alt='logo'
                style={{ width: 40, height: 40, borderRadius: 50 }}
              />
            </Dropdown>
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
