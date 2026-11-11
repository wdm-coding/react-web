import styles from './index.module.scss'
import logo from '@/assets/images/portal/user-logo.png'
import Menus from '@/layouts/components/Menus'
import { useNavigate } from 'react-router-dom'
import { Button, Dropdown } from 'antd'
import { navMenus, rightActions } from './db'
import classnames from 'classnames'
import useModal from '@/hooks/useModal'
import useAuth from '@/hooks/useAuth'
import { useEffect, useMemo, useState } from 'react'
import AuthApi from '@/api/auth'
interface HeaderProps {
  isFixed?: boolean
  isScroll?: boolean
}

const Header = ({ isFixed = false, isScroll = false }: HeaderProps) => {
  const { isLoggedIn } = useAuth()
  const { siteName,env } = useModal('global')
  const {userInfo} = useModal('user')
  const navigate = useNavigate()
  const [registerData, setRegisterData] = useState<{
    naturalRegisterUrl: string
    corpRegisterUrl: string
  } | null>(null)
  const getRegister = async () => {
    const { code, data } = await AuthApi.getRegister()
    if (code === 20000) {
      setRegisterData(data)
    }
  }
  useEffect(() => {
    getRegister()
  }, [])
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
  const thirdLogin = async () => {
    const { code, data } = await AuthApi.getThirdLoginUrl()
    if (code === 20000 && data?.loginAfter) {
      if(env === 'dev'){
        window.location.href = ' /register-client/ssoLogin?authCode=' + '0620000000620'
      }else{
        window.location.href = data?.loginAfter
      }
    }
  }
  // 下拉菜单点击事件
  const onDropdownClick = async ({ key }: { key: string }) => {
    switch (key) {
      case 'login':
        // thirdLogin()
        env !== 'prod' ? navigate('/login') : thirdLogin()
        break
      case 'logout':
        window.location.href = '/'
        break
      case 'personalRegister':
        registerData?.naturalRegisterUrl &&
          window.open(registerData?.naturalRegisterUrl || '', '_blank')
        break
      case 'legalRegister':
        registerData?.corpRegisterUrl &&
          window.open(registerData?.corpRegisterUrl || '', '_blank')
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
              <Button key={item.key} type='text' onClick={() => onDropdownClick(item)}>
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
                  <div
                    className='flex items-center cursor-pointer'
                    onClick={() => navigate('/manage')}
                  >
                    <img
                      src={logo}
                      alt='logo'
                      style={{ width: 30, height: 30, borderRadius: 50 }}
                    />
                    <span className={styles.userName}>
                      {userInfo?.userName || '用户'}
                    </span>
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
