import { useEffect } from 'react'
import Banner from './modules/Banner'
import RegisterProcess from './modules/RegisterProcess'
import DataOverview from './modules/DataOverview'
import RegisterPublicity from './modules/RegisterPublicity'
import RegisterPolicy from './modules/RegisterPolicy'
import useModal from '@/hooks/useModal'
import styles from './index.module.scss'

const PortalHome = () => {
  // 系统配置
  const { fetchSystemConfig, platformTitle } = useModal('system')

  useEffect(() => {
    fetchSystemConfig()
  }, [fetchSystemConfig])

  // 设置平台标题（浏览器页签名称）
  useEffect(() => {
    if (platformTitle) {
      document.title = platformTitle
    }
  }, [platformTitle])

  return (
    <div className={styles.portalHomeWrapper}>
      <Banner />
      <RegisterProcess />
      <DataOverview />
      <RegisterPublicity />
      <RegisterPolicy />
    </div>
  )
}

export default PortalHome
