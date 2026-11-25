import { useState } from 'react'
import styles from './index.module.scss'
import PageContainer from '@/layouts/ManageLayout/PageContainer'
import { Tabs } from 'antd'
import ApplyJoinList from './modules/ApplyJoinList'
import InviteList from './modules/InviteList'
import UnbindList from './modules/UnbindList'
const InstUserList = () => {
  const [activeKey, setActiveKey] = useState('0')
  const onChangeTab = (key: string) => {
    setActiveKey(key)
  }
  const tabItems = [
    {
      label: <span style={{ padding: '0 10px' }}>申请加入机构</span>,
      key: '0',
      children: <ApplyJoinList />
    },
    {
      label: <span style={{ padding: '0 10px' }}>机构邀请加入</span>,
      key: '1',
      children: <InviteList />
    },
    {
      label: <span style={{ padding: '0 10px' }}>解绑记录</span>,
      key: '-3',
      children: <UnbindList />
    }
  ]
  return (
    <PageContainer title='机构用户管理' showBack={false}>
      <div className={styles.instUserList}>
        <Tabs activeKey={activeKey} items={tabItems} onChange={onChangeTab} />
      </div>
    </PageContainer>
  )
}
export default InstUserList
