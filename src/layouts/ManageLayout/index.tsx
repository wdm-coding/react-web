import { useNavigate } from 'react-router-dom'
import OutletPage from '@/layouts/components/OutletPage'
import { Layout } from 'antd'
import { useState } from 'react'
import styles from './index.module.scss'
import Menus from '@/layouts/components/Menus'
import { siderMenusItems } from './db.tsx'
import ManageHeader from './Header'
const { Sider } = Layout
const ManageLayout = () => {
  return (
    <div className={styles.manageLayout}>
      <ManageHeader />
      <div className={styles.manageWrapper}>
        <Layout style={{ height: '100%' }}>
          <Sider trigger={null} collapsible collapsed={false} theme='light'>
            <Menus className='siderMenu' mode='inline' list={siderMenusItems} />
          </Sider>
          <Layout className={styles.rightWrapper}>
            <OutletPage maxHeight='calc(100vh - 72px)' />
          </Layout>
        </Layout>
      </div>
    </div>
  )
}
export default ManageLayout
