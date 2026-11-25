import styles from './index.module.scss'
import PageContainer from '@/layouts/ManageLayout/PageContainer'
const RegSubjectInfo = () => {
  return (
    <PageContainer title='账号信息' showBack={false}>
      <div className={styles.regSubjectInfo}>登记主体信息</div>
    </PageContainer>
  )
}
export default RegSubjectInfo
