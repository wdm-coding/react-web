import styles from './index.module.scss'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { staticRoutes } from '@/router'
import { formattedMenus } from '@/utils/menu'
import { useMemo } from 'react'
type MenuItem = Required<MenuProps>['items'][number]
const NavMenus = () => {
  const items: MenuItem[] = useMemo(() => {
    const staticNav = staticRoutes.find(
      (item) => item.path === '/client'
    ).children
    return formattedMenus(staticNav)
  }, [staticRoutes])
  return (
    <div className={styles.navMenuWrapper}>
      <Menu mode='horizontal' items={items} />
    </div>
  )
}
export default NavMenus
