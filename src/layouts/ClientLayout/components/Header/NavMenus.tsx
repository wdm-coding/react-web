import styles from './index.module.scss'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { staticRoutes } from '@/router'
import { formattedMenus } from '@/utils/menu'
import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
type MenuItem = Required<MenuProps>['items'][number]
const NavMenus = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const items: MenuItem[] = useMemo(() => {
    const staticNav = staticRoutes.find((item) => item.path === '/client').children
    return formattedMenus(staticNav)
  }, [staticRoutes])
  const current = useMemo(() => location.pathname.split('?').pop() || '/client/home', [location.pathname])
  const onClick: MenuProps['onClick'] = (item) => {
    navigate(item.key)
  }
  return (
    <div className={styles.navMenuWrapper}>
      <Menu mode='horizontal' items={items} onClick={onClick} selectedKeys={[current]} />
    </div>
  )
}
export default NavMenus
