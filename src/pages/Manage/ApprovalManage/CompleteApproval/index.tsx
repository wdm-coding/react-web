import PageContainer from '@/layouts/ManageLayout/PageContainer'
import styles from './index.module.scss'
import { Tabs } from 'antd'
import { useState } from 'react'
import ApprovaList from '../modules/ApprovaList'
import JoinList from '../modules/JoinList'

const CompleteApproval = () => {
  const [activeKey, setActiveKey] = useState('0')
  const onChangeTab = (key: string) => {
    setActiveKey(key)
  }
  const tabItems = [
    {
      label: <span style={{ padding: '0 10px' }}>登记审批</span>,
      key: '0',
      children: (
        <div className={styles.content}>
          <ApprovaList type='complete' />
        </div>
      )
    },
    {
      label: <span style={{ padding: '0 10px' }}>申请加入处理</span>,
      key: '1',
      children: (
        <div className={styles.content}>
          <JoinList type='complete' />
        </div>
      )
    }
  ]
  return (
    <PageContainer title='我的已办'>
      <div className={styles.completeApprovalWrapper}>
        <Tabs activeKey={activeKey} items={tabItems} onChange={onChangeTab} />
      </div>
    </PageContainer>
  )
}
export default CompleteApproval
