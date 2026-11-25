import styles from './index.module.scss'
import PageContainer from '@/layouts/ManageLayout/PageContainer'
const ApplyRecord = () => {
  return (
    <PageContainer title='用户申请记录' showBack={false}>
      <div className={styles.applyRecord}>申请记录</div>
    </PageContainer>
  )
}
export default ApplyRecord
