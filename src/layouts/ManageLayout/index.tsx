import { matchRoutes, Outlet, useLocation, useNavigate } from 'react-router'
import { Button, Dropdown, Layout, Menu } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import SimpleBar from 'simplebar-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import logo from '@/assets/images/common/logo.jpeg'
import 'simplebar-react/dist/simplebar.min.css'
import styles from './index.module.scss'
import { useUserStore } from '@/store/userStore'
import type { MenuProps } from 'antd'
import { formattedBreadcrumbs, formattedMenus } from '@/utils/menu'
type MenuItem = Required<MenuProps>['items'][number]
const { Sider } = Layout
const ManageLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { userInfo, userLogout, menuTree } = useUserStore()
  const sideItems: MenuItem[] = useMemo(
    () => formattedMenus(menuTree, '/manage'),
    [menuTree]
  )
  const breadcrumbItems: any[] = useMemo(
    () => formattedBreadcrumbs(menuTree),
    [menuTree]
  )
  const matchedRoutes = matchRoutes(breadcrumbItems, '/systemManage/menuManage')
  console.log(breadcrumbItems, matchedRoutes)
  const [collapsed, setCollapsed] = useState(false)
  const scrollableNodeRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = scrollableNodeRef.current
    if (node) {
      // 定义滚动处理函数
      const handleScroll = () => {}
      // 绑定滚动事件
      node.addEventListener('scroll', handleScroll)
      // 清理函数：组件卸载时移除监听，避免内存泄漏
      return () => {
        node.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])
  const current = useMemo(
    () => location.pathname.split('?').pop() || '/manage/dashboard',
    [location.pathname]
  )
  const onClick: MenuProps['onClick'] = (item) => {
    navigate(item.key)
  }
  const onLogout = async () => {
    const isLogout = await userLogout()
    if (isLogout) {
      window.location.href = '/'
    }
  }
  return (
    <div className={styles.manageLayout}>
      <Layout style={{ height: '100%' }}>
        <Sider trigger={null} collapsible collapsed={collapsed} theme='light'>
          <div className={styles.siderTitle}>
            <img src={logo} alt='logo' />
            {!collapsed && <span>AI 问答后台管理系统</span>}
          </div>
          <Menu
            mode='inline'
            selectedKeys={[current]}
            items={sideItems}
            onClick={onClick}
          />
        </Sider>
        <Layout className={styles.rightWrapper}>
          <div className={styles.headerWrapper}>
            <Button
              type='text'
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64
              }}
            />
            <div className={styles.rightAction}>
              <Button
                type='text'
                onClick={() => navigate('/')}
                style={{ marginRight: '16px' }}
              >
                返回客户端
              </Button>
              <div className={styles.username}>{userInfo.username}</div>
              <Dropdown
                menu={{
                  items: [{ label: '退出登录', key: 'logout' }],
                  onClick: onLogout
                }}
              >
                <img
                  src={logo}
                  alt='logo'
                  style={{ width: 40, height: 40, borderRadius: 50 }}
                />
              </Dropdown>
            </div>
          </div>
          <SimpleBar
            style={{ maxHeight: 'calc(100vh - 64px)' }}
            scrollableNodeProps={{ ref: scrollableNodeRef }}
          >
            <div className={styles.contentContainer}>
              <Outlet />
            </div>
          </SimpleBar>
        </Layout>
      </Layout>
    </div>
  )
}
export default ManageLayout
