import { Dropdown, Tag } from 'antd'
import styles from './index.module.scss'
import useModal from '@/hooks/useModal'
import logo from '@/assets/images/portal/user-logo.png'
import { useNavigate } from 'react-router-dom'

const ManageHeader = () => {
  const { siteName } = useModal('global')
  const navigate = useNavigate()
  const item = {
    key: 'userName',
    label: '用户中心',
    items: [
      {
        key: 'userName',
        label: '用户中心'
      },
      {
        key: 'logout',
        label: '退出登录'
      }
    ]
  }
  const onDropdownClick = async ({ key }: { key: string }) => {
    switch (key) {
      case 'logout':
        window.location.href = '/'
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
        <Dropdown
          key={item.key}
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
            <span className={styles.userName}>用户用户用户用户用户用户</span>
          </div>
        </Dropdown>
      </div>
    </div>
  )
}
export default ManageHeader
