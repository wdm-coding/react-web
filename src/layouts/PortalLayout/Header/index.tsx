import styles from './index.module.scss'
import logo from '@/assets/images/portal/user-logo.png'
import Menus from '@/layouts/components/Menus'
import { useNavigate } from 'react-router-dom'
import { Button, Dropdown } from 'antd'
import { navMenus } from './db'
import classnames from 'classnames'
import useModal from '@/hooks/useModal'
import useAuth from '@/hooks/useAuth'
import { useMemo } from 'react'
interface HeaderProps {
  isFixed?: boolean
  isScroll?: boolean
}
const rightActions = [
  {
    label: '联系客服',
    key: 'contact',
    type: 'button',
    show: 'all'
  },
  {
    label: '用户手册',
    key: 'manual',
    type: 'button',
    show: 'all'
  },
  {
    label: '用户',
    key: 'userName',
    type: 'dropdown',
    show: 'login',
    items: [
      { label: '退出登录', key: 'logout' }
    ]
  },
  {
    label: '注册',
    key: 'register',
    type: 'dropdown',
    show: 'noLogin',
    items: [
      { label: '个人注册', key: 'personalRegister' },
      { label: '法人注册', key: 'legalRegister' }
    ]
  },
  {
    label: '登录',
    key: 'login',
    type: 'button',
    show: 'noLogin'
  }
]
const Header = ({ isFixed = false, isScroll = false }: HeaderProps) => {
  const { isLoggedIn } = useAuth()
  const { siteName } = useModal('global')
  const navigate = useNavigate()

  // 过滤出需要显示的rightActions
  const rightActionsFilter = useMemo(
    () =>
      rightActions.filter(
        (item) =>
          item.show === 'all' ||
          (item.show === 'login' && isLoggedIn) ||
          (item.show === 'noLogin' && !isLoggedIn)
      ),
    [rightActions, isLoggedIn]
  )

  const onDropdownClick = async ({ key }: { key: string }) => {
    switch (key) {
      case 'logout':
        window.location.href = '/'
        break
      case 'personalRegister':
        console.log('个人注册')
        break
      case 'legalRegister':
        console.log('法人注册')
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
      {/* logo */}
      <div className={styles.logoSpace}>
        <span>{siteName}</span>
      </div>
      {/* 导航菜单 */}
      <div className={styles.navMenuContainer}>
        <Menus list={navMenus} />
      </div>
      {/* 右侧操作 */}
      <div className={styles.rightAction}>
        {rightActionsFilter.map((item) => {
          if (item.type === 'button') {
            return (
              <Button key={item.key} type='text'>
                {item.label}
              </Button>
            )
          } else if (item.type === 'dropdown') {
            return (
              <Dropdown
                key={item.key}
                menu={{
                  items: item.items,
                  onClick: onDropdownClick
                }}
              >
                {item.key === 'userName' ? (
                  <div className='flex items-center cursor-pointer' onClick={() => navigate('/manage')}>
                    <img
                      src={logo}
                      alt='logo'
                      style={{ width: 30, height: 30, borderRadius: 50 }}
                    />
                    <span className={styles.userName}>用户用户用户用户用户用户</span>
                  </div>
                ) : (
                  <div style={{ cursor: 'pointer', margin: '0 10px' }}>
                    {item.label}
                  </div>
                )}
              </Dropdown>
            )
          }
        })}
      </div>
    </div>
  )
}
export default Header
