import { useNavigate } from 'react-router-dom'
import OutletPage from '@/layouts/components/OutletPage'
import { Button, Dropdown, Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { useState } from 'react'
import logo from '@/assets/images/common/logo.jpeg'
import styles from './index.module.scss'
import { useUserStore } from '@/store/userStore'
import Menus from '@/layouts/components/Menus'
import { siderMenusItems } from './db.tsx'
const { Sider } = Layout
const ManageLayout = () => {
  const navigate = useNavigate()
  const { userInfo, userLogout } = useUserStore()
  const [collapsed, setCollapsed] = useState(false)
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
          <Menus className='siderMenu' mode='inline' list={siderMenusItems} />
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
          <OutletPage maxHeight='calc(100vh - 64px)' />
        </Layout>
      </Layout>
    </div>
  )
}
export default ManageLayout
