import styles from './index.module.scss'
import { useUserStore } from '@/store/userStore'
import logo from '@/assets/images/common/logo.jpeg'
import Menus from '@/layouts/components/Menus'
import { useNavigate } from 'react-router-dom'
import { Dropdown } from 'antd'
import { navMenus } from './db'
import classnames from 'classnames'
interface HeaderProps {
  isFixed?: boolean
  isScroll?: boolean
}
const Header = ({ isFixed = false, isScroll = false }: HeaderProps) => {
  const { userInfo, userLogout } = useUserStore()
  const navigate = useNavigate()
  const onDropdownClick = async ({ key }: { key: string }) => {
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
    <div
      className={classnames(styles.headerContainer, {
        [styles.fixedHeader]: isFixed,
        [styles.scrollHeader]: isScroll
      })}
    >
      <div className={styles.logo}>
        <img src={logo} alt='logo' />
        <span>React 门户平台</span>
      </div>
      <div className={styles.navMenuContainer}>
        <Menus list={navMenus} />
      </div>
      <div className={styles.rightAction}>
        {userInfo ? (
          <>
            <div className={styles.username}>{userInfo.username}</div>
            <Dropdown
              menu={{
                items: [
                  { label: '后台管理', key: 'admin' },
                  { label: '退出登录', key: 'logout' }
                ],
                onClick: onDropdownClick
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
