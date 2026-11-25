import { Button } from 'antd'
import styles from '../index.module.scss'
import { useState } from 'react'
const RegGuide = () => {
  const [collapsed, setCollapsed] = useState(false)
  const onCollapse = () => {
    setCollapsed(!collapsed)
  }
  return (
    <div
      className={`${styles.manageGuide} ${collapsed ? styles.collapsed : ''}`}
    >
      <div className={styles.manageGuideTitle}>
        <div>登记指引</div>
        <Button type='text' onClick={onCollapse}>
          {collapsed ? '展开' : '收起'}
        </Button>
      </div>
      <div className={styles.manageGuideContent}>登记指引内容</div>
    </div>
  )
}
export default RegGuide
