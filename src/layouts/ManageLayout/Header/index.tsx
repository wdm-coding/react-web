import { Dropdown, Popover, Tag } from 'antd'
import styles from './index.module.scss'
import useModal from '@/hooks/useModal'
import logo from '@/assets/images/portal/user-logo.png'
import { useNavigate } from 'react-router-dom'
import InsSelect from './modules/InsSelect'
import { BellOutlined, SwapOutlined } from '@ant-design/icons'

const ManageHeader = () => {
  const { siteName } = useModal('global')
  const {userInfo,useLogout} = useModal('user')
  const navigate = useNavigate()
  const onDropdownClick = async ({ key }: { key: string }) => {
    switch (key) {
      case 'logout':
        useLogout().then(()=>{
          navigate('/portal')
        })
        break
      default:
        break
    }
  }
  return (
    <div className={styles.manageHeaderWrapper}>
      {/* logo */}
      <div className={styles.logoSpace}>
        <span>{siteName}</span>
        <Tag
          color='#108ee9'
          style={{ fontSize: 12, marginLeft: 10, padding: '5px 10px' }}
        >
          用户端
        </Tag>
      </div>
      {/* 右侧用户中心 */}
      <div className={styles.rightSpace}>
        <BellOutlined style={{marginRight:15,fontSize:18,cursor:'pointer'}}/>
        <Popover content={<InsSelect />}>
          <div className={styles.currentIns}>
            <SwapOutlined style={{marginRight:10,fontSize:18}} />
            当前登记主体：{userInfo?.currentIns?.institutionName}
          </div>
        </Popover>
        <Dropdown
          menu={{
            items: [{ label: '退出登录', key: 'logout' }],
            onClick: onDropdownClick
          }}
        >
          <div
            className='flex items-center cursor-pointer'
            onClick={() => navigate('/portal')}
          >
            <img
              src={logo}
              alt='logo'
              style={{ width: 30, height: 30, borderRadius: 50 }}
            />
            <span className={styles.userName}>{userInfo?.userName}</span>
          </div>
        </Dropdown>
      </div>
    </div>
  )
}
export default ManageHeader
