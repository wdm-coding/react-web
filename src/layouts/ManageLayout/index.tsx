import OutletPage from '@/layouts/components/OutletPage'
import { Divider, Layout } from 'antd'
import styles from './index.module.scss'
import Menus from '@/layouts/components/Menus'
import { siderMenusItems } from './db.tsx'
import ManageHeader from './Header'
import { ArrowRightOutlined, FormOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
const { Sider } = Layout
const ManageLayout = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.manageLayout}>
      <ManageHeader />
      <div className={styles.manageWrapper}>
        <Layout style={{ height: '100%' }}>
          <Sider trigger={null} collapsible collapsed={false} theme='light'>
            <div className={styles.firstRegBtn} onClick={() => navigate('/manage/firstReg')}>
              <FormOutlined />
              <span style={{ padding: '0 15px 0 5px' }}>首次登记</span>
              <ArrowRightOutlined />
            </div>
            <Divider style={{ margin: '5px 0' }} />
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
