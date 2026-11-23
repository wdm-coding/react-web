import PageContainer from '@/layouts/ManageLayout/PageContainer'
import styles from './index.module.scss'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const RegApplyDetail = () => {
  const { dataRegistId } = useParams()
  const [detail, setDetail] = useState<any>({})
  return (
    <PageContainer title='登记详情'>
      <div className={styles.regApplyDetailWrapper}>
        <h1>登记申请详情</h1>
      </div>
    </PageContainer>
  )
}
