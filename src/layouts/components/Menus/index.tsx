import styles from './index.module.scss'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
type MenuItem = Required<MenuProps>['items'][number]
interface MenusProps {
  list: MenuItem[]
  mode?: MenuProps['mode']
}
const Menus = ({ list, mode = 'horizontal' }: MenusProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const items: MenuItem[] = useMemo(() => list, [list])
  const current = useMemo(
    () => location.pathname.split('?').pop() || '/client/home',
    [location.pathname]
  )
  const onClick: MenuProps['onClick'] = (item) => {
    navigate(item.key)
  }
  return (
    <div className={styles.menuContainer}>
      <Menu
        mode={mode}
        items={items}
        onClick={onClick}
        selectedKeys={[current]}
      />
    </div>
  )
}
export default Menus
