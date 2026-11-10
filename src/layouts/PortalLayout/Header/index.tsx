import styles from './index.module.scss'
import logo from '@/assets/images/common/logo.jpeg'
import Menus from '@/layouts/components/Menus'
import { useNavigate } from 'react-router-dom'
import { Dropdown } from 'antd'
import { navMenus } from './db'
import classnames from 'classnames'
import useModal from '@/hooks/useModal'
interface HeaderProps {
  isFixed?: boolean
  isScroll?: boolean
}
const Header = ({ isFixed = false, isScroll = false }: HeaderProps) => {
  const { siteName } = useModal('global')
  const navigate = useNavigate()
  const onDropdownClick = async ({ key }: { key: string }) => {
    switch (key) {
      case 'logout':
        window.location.href = '/'
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
      className={classnames(styles.headerWrapper, {
        [styles.fixedHeader]: isFixed,
        [styles.scrollHeader]: isScroll
      })}
    >
      <div className={styles.logoSpace}>
        <span>{siteName}</span>
      </div>
      <div className={styles.navMenuContainer}>
        <Menus list={navMenus} />
      </div>
      <div className={styles.rightAction}>
        {true ? (
          <>
            <div className={styles.username}>{'WDM'}</div>
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
