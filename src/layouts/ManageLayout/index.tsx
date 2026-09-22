import { useNavigate } from 'react-router-dom'
import OutletPage from '@/layouts/components/OutletPage'
import { Button, Dropdown, Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import SimpleBar from 'simplebar-react'
import { useEffect, useRef, useState } from 'react'
import logo from '@/assets/images/common/logo.jpeg'
import 'simplebar-react/dist/simplebar.min.css'
import styles from './index.module.scss'
import { useUserStore } from '@/store/userStore'
import Menus from '@/layouts/components/Menus'
const { Sider } = Layout
const ManageLayout = () => {
  const navigate = useNavigate()
  const { userInfo, userLogout } = useUserStore()
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
          <Menus
            mode='inline'
            list={[
              {
                label: '数据看板',
                key: '/manage/dashboard'
              },
              {
                label: '系统管理',
                key: '/manage/systemManage',
                children: [
                  {
                    label: '用户管理',
                    key: '/manage/systemManage/userManage'
                  },
                  {
                    label: '菜单管理',
                    key: '/manage/systemManage/menuManage'
                  }
                ]
              }
            ]}
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
              <div className={styles.username}>{userInfo?.username}</div>
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
              <OutletPage />
            </div>
          </SimpleBar>
        </Layout>
      </Layout>
    </div>
  )
}
export default ManageLayout
