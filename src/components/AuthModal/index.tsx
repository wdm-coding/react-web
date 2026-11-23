import { Modal } from 'antd'
import useModal from '@/hooks/useModal'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

const AuthModal = () => {
  const navigate = useNavigate()
  const { authModal } = useModal('global')
  const handleOk = () => {
    navigate('/login')
    authModal.close()
  }
  const handleCancel = () => {
    authModal.close()
  }
  return (
    <Modal
      className={styles.authModal}
      closable={false}
      open={authModal.isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnHidden={true}
      okText='去登录'
      cancelText='取消'
    >
      {authModal.content ?? <p>当前未登录，登录后才能继续操作。</p>}
    </Modal>
  )
}
export default AuthModal
