import PageContainer from '@/layouts/ManageLayout/PageContainer'
import styles from './index.module.scss'
import { Tabs } from 'antd'
import { useState } from 'react'
import ApprovaList from '../modules/ApprovaList'
import JoinList from '../modules/JoinList'

const TodoApproval = () => {
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
          <ApprovaList type='todo' />
        </div>
      )
    },
    {
      label: <span style={{ padding: '0 10px' }}>申请加入处理</span>,
      key: '1',
      children: (
        <div className={styles.content}>
          <JoinList type='todo' />
        </div>
      )
    }
  ]
  return (
    <PageContainer title='我的待办'>
      <div className={styles.todoApprovalWrapper}>
        <Tabs activeKey={activeKey} items={tabItems} onChange={onChangeTab} />
      </div>
    </PageContainer>
  )
}
export default TodoApproval
